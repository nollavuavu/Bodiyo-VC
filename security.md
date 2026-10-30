# Project Carlsen: Security

Owner: **Laurent** (security). Written 2026-10-29, ~18:30 EET (UTC+2).
"Carlsen" is the internal code name only. It must never appear in the shipped UI (see §8).

Scope and ground rules for this document:
- **Part 1** is an audit of `prototype-v2/` as of the 18:21 EET snapshot. All `file:line` references point to that snapshot.
- **Part 2** is the security plan for accounts, the database and subscriptions.
- Fixes are recommendations only. **Xander owns `prototype-v2/`.** Every patch below was applied to a *copy* and tested there; no prototype file was edited.
- `evidence.md` was not edited. Nothing was pushed or deployed. No secrets were printed.

**How the fixes were verified.** The complete patch (§10) was applied to a copy of the live tree. The copy then passed:
- `NO_SHOTS=1 node tools/test-flows.js`: 95/95.
- `node tools/test-logic.js`: 22/22.
- A crafted-localStorage XSS probe, with no payload executing.
- A crash probe over crafted URLs and data, with no blank screens.
- A strict-CSP load on both `file://` and `http://localhost`, with 0 violations.
- A bar-width check on `#/week` and `#/summary`, where the widths render correctly.

---

# Part 1: prototype-v2 audit

## 0. Summary by severity

The app is static. It has no backend, no network calls, no third-party scripts, fonts or CDNs, no `eval`, no service worker and no manifest. It renders through template strings into `innerHTML`, protected by an `esc()` helper (app.js:13).

Xander has already fixed most of the sinks I found earlier today: the code name, `esc()` on uid/sets/days/c.id, and `safeUrl` on DOI links. What remains:

| Sev | Finding | Where (18:21 snapshot) | Exploitable today? |
|---|---|---|---|
| **P0** | Stored value rendered unescaped: `${h.durationMin}` (confirmed: an `<img onerror>` payload executes) | app.js:576 | Only with crafted localStorage (self-XSS). It becomes **stored XSS** as soon as import, sync or community data exists. |
| **P1** | URL-reachable crash (blank app) from prototype-chain lookups: `#/exercise/constructor`, `#/exercise/__proto__`, `#/exercise-edit/__proto__`, `#/exercise-edit/constructor` | logic.js:15, 18–19; app.js:766 | **Yes.** Anyone can send the link. Denial of service only, no code runs. |
| **P1** | No shape validation of stored data. A bad `history[].items[].sets` blanks Today (`it.sets.filter is not a function`, logic.js:158–162). A bad `profile.equipment` crashes `#/split` (app.js:501). | app.js:29–40 | Crafted or old-version storage. Becomes real once import or sync exists. |
| **P1** | No CSP. Inline `style="width:…"` on bars (app.js:579, 608) is the only thing blocking a strict CSP. | index.html, app.js | Defense in depth |
| **P1** | `safeUrl` allows `http:`. Links use `rel="noopener"` without `noreferrer`. `pmid` is not checked as numeric. | app.js:15, 158 | Low (all 1,051 citation URLs are `https://doi.org/…`, built at import-evidence.js:58) |
| **P2** | HTML `esc()` used inside CSS selectors where `CSS.escape` is needed | app.js:365, 379, 400, 968 | No (the ids are app-generated) |
| **P2** | `LS.del` has no try/catch, unlike get/set | app.js:26 | Throws when storage is blocked |
| **P2** | History grows without bound in one localStorage key (~5 MB origin quota) | app.js:36 | Quota toast after many workouts |
| **P2** | `window.__carlsen` test hook is exposed in production | app.js:978 | Info only (also leaks the code name in devtools) |
| **P2** | Code name remains in data (`evidence.md:141`, `:495`; `tools/import-evidence.js:190`), masked at display by `brand()` (app.js:9) | see §8 | Not visible in UI (verified) |
| Info | Absolute `/workspace/...` paths in docs and tools; Puppeteer runs with `--no-sandbox` (dev only); tools use `vm.runInContext` and `execFileSync` on trusted local files only | tools/* | Dev only |

There is no current XSS from content. Evidence text, exercise names, custom names and notes are all escaped. `md()` escapes first and then adds only `<b>`/`<i>`. Hash-route payloads are escaped (probe: `#/exercise/"><img onerror>` renders "Unknown exercise").

---

## 1. localStorage

The prefix is `carlsen2.` (app.js:22). `LS.get` wraps `JSON.parse` in try/catch and falls back to a default, so corrupt JSON is handled (tested at test-flows.js "corrupted storage"). `LS.set` catches quota errors and shows a toast. `LS.del` (app.js:26) has **no** try.

| Key | Stores | Read at | Sensitive? | Validation today |
|---|---|---|---|---|
| `profile` | goal, experience, days, sessionLength, equipment, activeSplitId, splitKey | app.js:29 | Fitness preferences (personal data under GDPR once tied to an account) | Object only; values unchecked → crash on bad `equipment` |
| `splits` | user-built splits (days → `{exId, sets}`) | app.js:32 | No | `id` and `days` array only |
| `customExercises` | `{id: {name, primary[], secondary[], type, notes, gear}}` | app.js:34 | No (free text) | Object only; inherited keys reachable |
| `history` | completed workouts (items, sets of kg/reps/RIR, date, durationMin) | app.js:36 | **Health-adjacent** training log | `items` array plus `date` only; unbounded |
| `active` | in-progress workout including the rest-timer state | app.js:38 | Same as history | `items` array only |
| `splitProgress` | `{splitId: nextDayIndex}` | app.js:40 | No | None |
| `ui` | trainTab | app.js (UI state) | No | n/a |
| `builderDraft` | unsaved builder state | app.js (builder) | No | n/a |
| `pendingAdd` | exercise queued for adding | app.js (library → workout) | No | n/a |

No credentials, tokens or identifiers are stored. Reset (app.js:936) removes only keys with the `carlsen2.` prefix, which is correct. The storage event listener (app.js:972) re-renders on changes from other tabs, which is fine.

**Size.** Browsers give roughly 5 MB per origin for localStorage, and the exact quota varies. A history entry is about 1–3 KB, so a few thousand workouts fit. Before that point, recommend a cap (for example, keep the last 1,000 workouts) or a move to IndexedDB in the account phase.

**Corrupted or hostile JSON.** Parse errors are handled. *Wrong shapes* are not, and the next section shows this matters. Treat localStorage as **untrusted input**: later it will be filled by import, sync, an older app version or a browser extension. The fix is in §3 and patch §10.

---

## 2. XSS and other code-execution sinks

I searched all files for: `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function`, `setTimeout`/`setInterval` with a string argument, `srcdoc`, and `href`/`src` built from data.

**Not present:** `outerHTML`, `insertAdjacentHTML`, `document.write`, `eval`, `new Function`, string timers (`setInterval` at app.js:304 takes a function), and `srcdoc`.

**`innerHTML` sinks** (app.js snapshot lines):

| Line | Renders | Escaped? | Sev |
|---|---|---|---|
| 90 | toast message and action label | yes, `esc()` | ok |
| 100 | dialog title and body | yes | ok |
| 122, 137 | sheet content (Why sheets, pickers) | yes; evidence via `esc`/`md` | ok |
| 295 | rest bar (numbers, icons) | constant and numeric | ok |
| **853** | **every screen**, which is where the template output goes. Unescaped interpolation inside it: **576 `${h.durationMin}`** | **no** | **P0** |
| 863 | mini "workout in progress" bar | yes | ok |
| 951, 952, 959 | picker and library list re-render | yes | ok |
| 975 | `ICONS[name]` SVG paths (vendored Lucide, trusted, no handlers) | constant | ok |

**Interpolations already fixed by Xander** (verified in the 18:21 snapshot): `data-uid` and `er-…` ids (workout), `${it.sets}` (builder, community), `${p.days}` (You), `${c.id}` (community), muscle names in bars and the body map, `icon(cls)`, option keys, weekday names, and row labels.

**href built from data:** app.js:158, the citation DOI and PubMed links. `safeUrl` allows `http(s)`. I recommend allowing **https only**, adding `rel="noopener noreferrer"`, and building the PubMed URL only when `pmid` is digits. Fix is in patch §10.

**CSS selector injection** (app.js:365, 379, 400, 968): the code builds selectors from `uid` with `esc()`. HTML escaping is the wrong encoder for a selector. A crafted uid could throw a `SyntaxError` in `querySelector`. Use `CSS.escape()`.

**Prototype-chain lookups** (DoS, reachable by link):
- logic.js:15 `canon`: `D.exercises[id] ? id : …`. With `id = "constructor"` this returns `Object`, and the exercise screen then crashes on `.join`.
- logic.js:18–19 `ex()`: the same pattern for exercises and customs.
- app.js:766: `customs()[id]` on `#/exercise-edit/__proto__` returns `Object.prototype`, and the screen crashes.
- Fix: use own-property checks (`Object.prototype.hasOwnProperty.call`). After the patch, all four URLs render "Unknown exercise" or an empty editor.

**Fix code for the P0** (one line, app.js:576):
```js
// before
<b class="num">${h.durationMin}<small> min</small>
// after
<b class="num">${esc(h.durationMin)}<small> min</small>
```
The rule for Xander going forward: **every `${…}` inside an HTML template is `esc()`'d unless it is a number the code just computed.** Values read back from storage count as untrusted even if the code originally wrote them.

### 2a. i18n (new at 18:27 EET, in progress)

`i18n-runtime.js` (i18n-runtime.js:1–57) and `i18n/en.json` appeared while I was writing this. I reviewed the runtime itself and it is sound:
- The language comes from `?lang=` or `carlsen2.lang` and is **whitelisted** against `LANGS` (line 19).
- Placeholder fill uses `hasOwnProperty` (line 35).
- Lookups accept only string values (line 22), so keys such as `__proto__` cannot return objects.

The new risk is **how callers use the output**:
- `T()` returns **plain text**, and its `{vars}` include user-controlled strings: day names, split names, custom exercise names via `exName()`, and muscle names from custom exercises.
- **Rule: every `T(...)` result that goes into an HTML template must be wrapped in `esc()`, exactly like any other string.** Never put HTML markup in translation strings. If emphasis is needed, use the existing `md()` (escape first, then `**b**`) on the translated string.
- Translator files (`vi.json`) are trusted at build time but should still be treated as text, never as HTML.
- Add a test: render with a custom exercise named `<img src=x onerror=…>` in every language, including `pseudo`, and assert nothing executes. My probe script `/tmp/sec/t/probe.js` does this for `en` and can be extended.
- logic.js moved to `T()` at 18:28 EET. The logic.js patch in §10 still applies (fuzz 2, offset +3). app.js has not been converted yet, so **the app.js diff will need rebasing after the i18n change lands**; the intent of every hunk is listed in §9.

---

## 3. Imported JSON: schema check (for backup/import, sync, community splits)

There is **no import or export feature today**, and community splits are static sample data in data.js. The moment one of those ships, anything that reaches `LS.set` or rendering must pass a validator like the one below first. The same checks (already in patch §10) also run on every `LS.get`, so old or corrupt local data cannot crash screens.

```js
// validate-import.js: pure, no DOM. Run on parsed JSON before anything touches storage or HTML.
const MAX_IMPORT_BYTES = 2 * 1024 * 1024;              // reject the raw text first
const BAD_KEYS = new Set(["__proto__", "constructor", "prototype"]);
const ID_RE = /^[A-Za-z0-9_.:-]{1,64}$/;

function safeParse(text) {
  if (typeof text !== "string" || text.length > MAX_IMPORT_BYTES) throw new Error("File too large");
  // Reviver drops prototype-pollution keys at every depth.
  return JSON.parse(text, (k, v) => (BAD_KEYS.has(k) ? undefined : v));
}
const own = (o, k) => o != null && Object.prototype.hasOwnProperty.call(o, k);
const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const onlyKeys = (o, allowed) => Object.keys(o).every((k) => allowed.includes(k));
const str = (v, max) => typeof v === "string" && v.length <= max;
const id = (v) => typeof v === "string" && ID_RE.test(v) && !BAD_KEYS.has(v);
const int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;
const num = (v, lo, hi) => typeof v === "number" && Number.isFinite(v) && v >= lo && v <= hi;

function validateImport(data, D /* window.CARLSEN_DATA */, customs = {}) {
  const errs = [];
  const knownEx = (x) => own(D.exercises, x) || own(D.aliases || {}, x) || own(customs, x);  // ids must exist in exercises.json or be the user's own custom ids
  const muscles = new Set(D.trackedMuscles.concat(D.extraMuscles));

  if (!isObj(data) || !onlyKeys(data, ["version", "splits", "customExercises", "history"])) return ["Unknown top-level keys"];
  if (data.version !== 1) errs.push("Unsupported version");

  const cx = data.customExercises ?? {};
  if (!isObj(cx) || Object.keys(cx).length > 200) errs.push("customExercises: object, max 200");
  else for (const [k, c] of Object.entries(cx)) {
    if (!id(k) || own(D.exercises, k)) { errs.push(`custom id ${k}`); continue; }   // cannot shadow a built-in id
    if (!isObj(c) || !onlyKeys(c, ["name", "primary", "secondary", "type", "notes", "gear"])) errs.push(`custom ${k}: keys`);
    else if (!str(c.name, 60) || !c.name.trim()
      || !Array.isArray(c.primary) || c.primary.length < 1 || c.primary.length > 5 || !c.primary.every((m) => muscles.has(m))
      || !(Array.isArray(c.secondary ?? []) && (c.secondary ?? []).every((m) => muscles.has(m)))
      || !["compound", "isolation"].includes(c.type)
      || (c.notes != null && !str(c.notes, 300))) errs.push(`custom ${k}: fields`);
  }
  const allCustoms = isObj(cx) ? cx : {};
  const knownAll = (x) => knownEx(x) || own(allCustoms, x);

  const splits = data.splits ?? [];
  if (!Array.isArray(splits) || splits.length > 50) errs.push("splits: array, max 50");
  else splits.forEach((s, i) => {
    if (!isObj(s) || !onlyKeys(s, ["id", "name", "days"]) || !id(s.id) || !str(s.name, 80)
      || !Array.isArray(s.days) || s.days.length < 1 || s.days.length > 7) return errs.push(`split ${i}`);
    s.days.forEach((d, j) => {
      if (!isObj(d) || !onlyKeys(d, ["name", "exercises", "weekday"]) || (d.name != null && !str(d.name, 40))
        || !Array.isArray(d.exercises) || d.exercises.length > 30) return errs.push(`split ${i} day ${j}`);
      d.exercises.forEach((x, n) => {
        if (!isObj(x) || !onlyKeys(x, ["exId", "sets"]) || !id(x.exId) || !knownAll(x.exId) || !int(x.sets, 1, 10))
          errs.push(`split ${i} day ${j} ex ${n}`);
      });
    });
  });

  const hist = data.history ?? [];
  if (!Array.isArray(hist) || hist.length > 5000) errs.push("history: array, max 5000");
  else hist.forEach((w, i) => {
    if (!isObj(w) || !id(w.id) || !str(w.name, 80) || !str(w.date, 40) || isNaN(Date.parse(w.date))
      || (w.durationMin != null && !num(w.durationMin, 0, 600)) || !Array.isArray(w.items) || w.items.length > 50) return errs.push(`workout ${i}`);
    w.items.forEach((it, n) => {
      if (!isObj(it) || !id(it.exId) || !knownAll(it.exId) || (it.uid != null && !id(it.uid))
        || !Array.isArray(it.sets) || it.sets.length > 10) return errs.push(`workout ${i} item ${n}`);
      it.sets.forEach((s, k) => {
        if (!isObj(s) || !onlyKeys(s, ["kg", "reps", "rir", "done"])
          || (s.kg != null && s.kg !== "" && !num(Number(s.kg), 0, 1000))
          || (s.reps != null && s.reps !== "" && !int(Number(s.reps), 0, 100))
          || (s.rir != null && s.rir !== "" && !int(Number(s.rir), 0, 10))
          || (s.done != null && typeof s.done !== "boolean")) errs.push(`workout ${i} item ${n} set ${k}`);
      });
    });
  });
  return errs;   // [] = valid. Reject the whole file on any error; never merge partial data.
}
```

Notes:
- Validate *then* rebuild new plain objects from the allowed fields; don't store the parsed object as-is.
- Keep the importer's errors generic in the UI ("This file isn't a valid backup").
- The limits match the app: sets 1–10 (`D.rules`), at most 7 days, and names of 60–80 characters. Align them with Xander's own limits if his differ.

---

## 4. Content Security Policy

What the app loads:
- Scripts: `index.html` loads only same-origin files: data.js, exercises.js, evidence.js, icons.js, logic.js and app.js.
- CSS: styles.css, with no `url()` and no `@import`.
- Fonts: system fonts only.
- No images except inline SVG.
- No fetch or XHR.
- No inline `<script>` and no inline event handlers.

**Recommended meta tag** (first element in `<head>`, right after `<meta charset>`):
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; base-uri 'none'; form-action 'none'; object-src 'none'">
```
- `manifest-src` and `worker-src` are included now so Emrys's PWA work (manifest and service worker, both same-origin) is already allowed.
- Tested on both `file://` and `http://localhost`. The app works and reports **0 violations** once the bar fix below is in. Without the bar fix, the inline `style="width:…"` attributes at app.js:579 and app.js:608 cause 32 violations on Week and Summary, and the bars render at 0 width.

**What has to change for a strict CSP:**
1. **Bars** (app.js:579, 608): render `data-w="62.5"` instead of `style="width:62.5%"`, then set the width through CSSOM after render. `el.style.width = …` is not blocked by `style-src 'self'`; only style attributes in parsed HTML are. Code is in patch §10.
2. Keep **no inline scripts or handlers**, which is true today. Never add `onclick=` in templates; keep using delegated listeners.
3. Some directives are **ignored in a `<meta>` CSP**: `frame-ancestors`, `report-uri`/`report-to` and `sandbox`. When the app is hosted, send the policy as an **HTTP header** instead, and add:
   - `frame-ancestors 'none'` (anti-clickjacking).
   - `upgrade-insecure-requests`.
   - A `report-to` endpoint.
   - The other headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and HSTS.
4. **Trusted Types**, once hosted (P2): `require-trusted-types-for 'script'` makes every `innerHTML` assignment go through a policy. The policy would wrap the existing template output. It is a bigger refactor, so do it in the account phase.
5. **Later, with accounts and payments**, add exactly what you use:
   - Supabase: `connect-src https://<project-ref>.supabase.co wss://<project-ref>.supabase.co`.
   - Stripe Checkout as a redirect needs **no** CSP change, because the browser navigates away. Embedded Stripe would need Stripe's published list: `script-src https://checkout.stripe.com`, `frame-src https://checkout.stripe.com`, `connect-src https://checkout.stripe.com`, `img-src https://*.stripe.com` (source: [Stripe integration security guide](https://docs.stripe.com/security/guide)). This is a reason to prefer the redirect.
   - Never add `'unsafe-inline'` or `'unsafe-eval'` to `script-src`.

---

## 5. Service worker

**There is no service worker or manifest in v2 today.** Emrys will add the PWA. Here is the security checklist for that work:

- **Scope:**
  - Serve `sw.js` from the app folder so its default scope is the app only (for example `/app/`).
  - Do not widen the scope with `Service-Worker-Allowed`.
  - Service workers need HTTPS (or `localhost`) and do **not** run on `file://`, so the current `file://` test harness cannot test the service worker.
- **Cache name:**
  - Versioned, and without the code name, for example `app-v2-2026-10-29-1`.
  - Bump it on every release.
  - Delete old caches in `activate`.
- **Precache list:**
  - An explicit list of same-origin files: index.html, styles.css, app.js, logic.js, data.js, exercises.js, evidence.js, icons.js, plus the manifest and icons.
  - Never cache `tools/`, `screenshots/`, `evidence-approved/` or anything outside the app folder.
- **Fetch handler risks:**
  - Handle only `GET` requests from the **same origin**. Return early for everything else, so it falls through to the network, and never cache third-party or opaque responses. Opaque responses can't be checked and can poison the cache.
  - Cache only `response.ok && response.type === "basic"`.
  - Use network-first (or stale-while-revalidate) for `index.html`, so a fixed security bug reaches users on their next load. Use cache-first only for the versioned static files.
  - **Once accounts exist, never cache authenticated API responses** (Supabase REST/Auth calls, `/functions/v1/*`) or anything with an `Authorization` header. Otherwise one user's data can be served to the next user on a shared device.
- **Updates:**
  - The browser re-checks `sw.js` on navigation, at most every 24 hours (byte-for-byte compare).
  - Show an "Update available, reload" prompt. Call `skipWaiting()` only after the user accepts, so a page is never running old JS against new cached files.
  - Serve `sw.js` with `Cache-Control: no-cache`.
  - Keep the CSP `worker-src 'self'`.

Minimal handler:
```js
const CACHE = "app-v2-2026-10-29-1";
const PRECACHE = ["./", "index.html", "styles.css", "app.js", "logic.js", "data.js", "exercises.js", "evidence.js", "icons.js"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE))));
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))));
self.addEventListener("message", (e) => { if (e.data === "skipWaiting") self.skipWaiting(); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;           // network only for everything else
  if (e.request.mode === "navigate") {                                               // network-first for HTML
    e.respondWith(fetch(e.request).catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((r) => {
    if (r.ok && r.type === "basic") { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
    return r;
  })));
});
```

---

## 6. Secrets scan (all of /workspace/carlsen)

I ran `rg` with `--hidden` over every file, including dotfiles, and also extracted and scanned `carlsen-prototype.zip` (the v1 prototype, 39 files). The patterns covered:
- Google API keys (`AIza…`), OpenAI-style keys (`sk-…`), Stripe keys (`sk_live_`/`sk_test_`) and webhook secrets (`whsec_`).
- GitHub tokens (`ghp_`/`gho_`/`ghu_`/`ghs_`/`ghr_`/`github_pat_`) and Slack tokens (`xox?-`).
- `PRIVATE KEY` blocks, AWS access key ids (`AKIA…`), JWTs (`eyJ….eyJ`) and database URLs (postgres/mysql/mongodb).
- Credentials embedded in URLs (`://user:pass@`), `password`/`secret`/`api_key`/`token` assignments and `Bearer` tokens.
- `GEMINI_`/`OPENAI_`/`SUPABASE_`/`FIREBASE_`/`STRIPE_` env assignments.

**Result: no secrets found.** The only hit in the earlier loose pass was `design-notes.md:113`, a false positive: the word "side-stripe" matched `STRIPE`. A re-run at ~18:25 EET, including the new `i18n/` and `prototype/` folders, found no matches.

Other things to keep out of a public repo:
- `lyfta-screens/`: competitor screenshots, which are third-party copyright.
- `.emrys/`: agent scratch.
- `evidence.backup-before-phase2-*.md` and `contradictions-for-vinci.md`: internal working documents.
- The 4.98 MB `carlsen-prototype.zip`.
- Many files contain absolute `/workspace/...` paths, which is informational only.

---

## 7. .gitignore draft

This is saved as **`/workspace/carlsen/gitignore.draft`**. It is deliberately *not* a real `.gitignore`; Shrader applies it when pushing.

```gitignore
# DRAFT for Project Carlsen. Rename to .gitignore only after Shrader/Luxanna review.
# Written by Laurent (security), 2026-10-29. Nothing here is a real .gitignore yet.

# --- Secrets and local config (never commit) ---
.env
.env.*
!.env.example
*.pem
*.key
*.p12
*.pfx
*.keystore
.gemini_key
supabase/.temp/
.vercel/
.netlify/

# --- OS / editor noise ---
.DS_Store
Thumbs.db
*.swp
*~
.vscode/
.idea/

# --- Node / tooling output ---
node_modules/
npm-debug.log*
yarn-error.log*
*.log
prototype-v2/tools/last-test-results.json
prototype/tools/last-test-results.json

# --- Archives and bulky generated files ---
*.zip
# evidence.js / evidence.json are build outputs of tools/import-evidence.js (~1 MB each).
# Keep them committed while the app is served as static files; ignore once a build step exists:
# prototype-v2/evidence.js
# prototype-v2/evidence.json

# --- Third-party material we must not publish ---
# Competitor app screenshots (copyright belongs to the competitor).
lyfta-screens/

# --- Agent scratch and internal working files ---
.emrys/
evidence.backup-*.md
contradictions-for-vinci.md
# Decide before the first public push (internal QA notes, absolute /workspace paths inside):
# qa-*.md
# qa-screens/
# prototype-v2/screenshots/
```

---

## 8. Code name check: where "Carlsen" can reach the user

**Rendered UI, checked live** (headless Chrome at ~18:24 EET over onboarding, Today, Week, Split, Library, You and Plans):
- **0 occurrences** in visible text.
- Titles read "Set up Lift · Lift", "Today · Lift" and so on.
- Xander's fix: `APP_NAME = "Lift"` (data.js:6) → `D.appName` → `APP` (app.js:7). `brand()` (app.js:9–10) rewrites "Carlsen" → APP in all evidence text at display time.

**Fixed since my first pass** (lines from the 18:15 snapshot, for the record):
- index.html:8 `<title>Carlsen</title>`.
- app.js:860 the title suffix.
- app.js:483 "Set up Carlsen".
- app.js:144 "How Carlsen applies it".
- app.js:817 and :819 the "How Carlsen counts" and "Carlsen is a rules-based model…" text.
- app.js:821, which showed the storage prefix `carlsen2.`.
- data.js:189–190 "a Carlsen choice".

**Still present at the source.** These are masked by `brand()`; clean them up so the mask isn't load-bearing:
| Where | Text | Owner |
|---|---|---|
| evidence.md:141 | App justification "…so Carlsen only counts sets…" (feeds `plan.exercise_sets`, `reminder.session_sets`, `sets.*`, `volume.hard_sets`, `weekly.hard_sets`) | Silas (route via Luxanna; I did not edit evidence.md) |
| evidence.md:495 | Recommendation "Carlsen suggests a deload week…" | Silas |
| tools/import-evidence.js:190 | Entry title "How Carlsen decides: mechanical tension" | Xander |
| index.html:8 | `<title>Loading…</title>`; with JS off or before load, the tab says "Loading…". Better to hard-code the public name | Xander |

**Not user-visible, but visible in devtools or the repo:**
- The localStorage prefix `carlsen2.` (app.js:22).
- `window.CARLSEN_DATA` and `window.CarlsenLogic` (app.js:6, logic.js:6).
- The `window.__carlsen` test hook (app.js:978).
- File header comments and README.

Renaming the storage prefix needs a one-time migration (copy `carlsen2.*` to the new prefix, then delete the old keys), so leave it until the public name is final.

---

## 9. Prioritized fix list for Xander

Line numbers are from the 18:21 snapshot. The complete tested diff is in §10.

**P0: before any import, sync, community or public hosting**
1. app.js:576: `${h.durationMin}` → `${esc(h.durationMin)}`.

**P1: soon**
2. logic.js:15, 18–19 and app.js:766: own-property lookups (`own(o,k)`) so `#/exercise/constructor`, `#/exercise/__proto__` and `#/exercise-edit/__proto__` don't blank the app.
3. app.js:29–40: validate stored shapes on read. That means `okSplit`, `okHistory`, `okWorkout`, `okCustom`, an enum-checked `profile()` and a cleaned `progress()`. This removes the Today crash (logic.js:158) and the Split crash (app.js:501).
4. index.html: add the CSP meta.
5. app.js:579, 608, 853: switch the bars to `data-w` plus `applyWidths(screen)` so the CSP has 0 violations.
6. app.js:15, 158: `safeUrl` https-only, `rel="noopener noreferrer"`, digits-only `pmid`.
7. i18n: `esc()` every `T(...)` result interpolated into HTML (user names flow through `{vars}`); no markup in translation strings (§2a).
8. tools/import-evidence.js:190: remove "Carlsen" from the entry title. Hard-code the public name in index.html:8 `<title>`.

**P2: hygiene**
9. app.js:365, 379, 400, 968: `CSS.escape()` instead of `esc()` in selectors.
10. app.js:26: try/catch in `LS.del`.
11. app.js:36: cap history (for example, the last 1,000 workouts) or plan the move to IndexedDB.
12. app.js:978: expose `window.__carlsen` only under a test flag, for example `if (location.hash.includes("test") || window.__TEST__)`.
13. Before hosting: send the security headers and `frame-ancestors 'none'` via HTTP; consider Trusted Types.

---

## 10. Exact patches (tested)

Apply with `cd /workspace/carlsen && patch -p1 < file.diff`. The paths are `a/prototype-v2/…`. The diffs are against the 18:21 EET tree, so if Xander has edited since then, `patch` will report fuzz or rejects.

### index.html: CSP meta

```diff
--- a/prototype-v2/index.html
+++ b/prototype-v2/index.html
@@ -2,6 +2,7 @@
 <html lang="en">
 <head>
   <meta charset="utf-8">
+  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; base-uri 'none'; form-action 'none'; object-src 'none'">
   <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
   <meta name="theme-color" content="#000000">
   <meta name="color-scheme" content="dark">
```

### logic.js: own-property lookups

```diff
--- a/prototype-v2/logic.js
+++ b/prototype-v2/logic.js
@@ -12,11 +12,13 @@
   // ---------- exercises ----------
   // Built-in or custom. Unknown ids (e.g. a custom exercise from another device) render as a neutral stub.
   // Legacy v1 ids resolve through D.aliases (tools/exercise-app-overrides.json).
-  const canon = (id) => D.exercises[id] ? id : (D.aliases && D.aliases[id] && D.exercises[D.aliases[id]] ? D.aliases[id] : id);
+  // Own-property checks only: ids such as "constructor" or "__proto__" must not resolve to Object.prototype members.
+  const own = (o, k) => o != null && Object.prototype.hasOwnProperty.call(o, k);
+  const canon = (id) => own(D.exercises, id) ? id : (own(D.aliases, id) && own(D.exercises, D.aliases[id]) ? D.aliases[id] : id);
   function ex(id, customs) {
     id = canon(id);
-    if (D.exercises[id]) return Object.assign({ id }, D.exercises[id]);
-    const c = customs && customs[id];
+    if (own(D.exercises, id)) return Object.assign({ id }, D.exercises[id]);
+    const c = own(customs, id) ? customs[id] : null;
     if (c) return Object.assign({ id, custom: true, pattern: "custom:" + id, secondary: [] }, c);
     return { id, name: "Unknown exercise", primary: [], secondary: [], equip: [], type: "isolation", missing: true };
   }
```

### app.js: escape, validators, CSP-safe bars, safe links, CSS.escape, LS.del

```diff
--- a/prototype-v2/app.js
+++ b/prototype-v2/app.js
@@ -12,10 +12,12 @@
   const screen = $("#screen"), tabbar = $("#tabbar"), restbar = $("#restbar");
   const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
   // Only http(s) links from imported data become hrefs (blocks javascript:/data: URLs in evidence.json).
-  const safeUrl = (u) => (/^https?:\/\/[^\s"'<>]+$/i.test(String(u || "")) ? String(u) : "");
+  const safeUrl = (u) => { try { const x = new URL(String(u || "")); return x.protocol === "https:" ? x.href : ""; } catch (e) { return ""; } };
   const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
   const icon = (n, cls = "") => `<svg class="ic ${esc(cls)}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;
   const lc = (s) => String(s).toLowerCase();
+  // CSP-safe bar widths: style="" attributes in HTML strings are blocked by style-src 'self'; CSSOM writes are allowed.
+  const applyWidths = (root) => $$("[data-w]", root).forEach((el) => { const n = Number(el.dataset.w); el.style.width = (Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0) + "%"; });
   const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
 
   // ---------- storage ----------
@@ -23,21 +25,46 @@
   const LS = {
     get(k, d) { try { const v = localStorage.getItem(PFX + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
     set(k, v) { try { localStorage.setItem(PFX + k, JSON.stringify(v)); } catch (e) { toast("Couldn't save: browser storage is full or blocked."); } },
-    del(k) { localStorage.removeItem(PFX + k); }
+    del(k) { try { localStorage.removeItem(PFX + k); } catch (e) { /* storage blocked */ } }
   };
   const DEFAULT_PROFILE = { goal: "hypertrophy", experience: "intermediate", days: 4, sessionLength: 60, equipment: "gym", activeSplitId: "rec" };
-  const profile = () => { const p = LS.get("profile", null); return p && typeof p === "object" ? Object.assign({}, DEFAULT_PROFILE, p) : null; };
+  const profile = () => {
+    const p = LS.get("profile", null); if (!p || typeof p !== "object" || Array.isArray(p)) return null;
+    const out = Object.assign({}, DEFAULT_PROFILE);
+    ["goal", "experience", "days", "sessionLength", "equipment"].forEach((k) => { if (own(p, k) && okOpt(k, p[k])) out[k] = p[k]; });
+    if (okId(p.activeSplitId)) out.activeSplitId = p.activeSplitId;
+    if (p.splitKey != null && own(D.splits, p.splitKey)) out.splitKey = p.splitKey;
+    return out;
+  };
   const setProfile = (p) => LS.set("profile", p);
   const arr = (v) => Array.isArray(v) ? v : [];
-  const mySplits = () => arr(LS.get("splits", [])).filter((s) => s && s.id && Array.isArray(s.days));
+  // ---------- stored-data checks: localStorage (and any future import/sync) is untrusted input ----------
+  const own = (o, k) => o != null && Object.prototype.hasOwnProperty.call(o, k);
+  const BAD_KEYS = ["__proto__", "constructor", "prototype"];
+  const okId = (v) => typeof v === "string" && /^[A-Za-z0-9_.:-]{1,64}$/.test(v) && !BAD_KEYS.includes(v);
+  const okStr = (v, max) => typeof v === "string" && v.length <= max;
+  const okDate = (v) => typeof v === "string" && v.length <= 40 && !isNaN(Date.parse(v));
+  const okSets = (n) => Number.isInteger(n) && n >= 1 && n <= 10;
+  const okLoggedSet = (x) => x && typeof x === "object" && ["kg", "reps", "rir"].every((f) => x[f] == null || okStr(String(x[f]), 12));
+  const ALL_MUSCLES = () => D.trackedMuscles.concat(D.extraMuscles);
+  const okMuscles = (a) => Array.isArray(a) && a.length <= 20 && a.every((m) => ALL_MUSCLES().includes(m));
+  const okPlanEx = (x) => x && okId(x.exId) && okSets(x.sets);
+  const okDay = (d) => d && (d.name == null || okStr(d.name, 40)) && Array.isArray(d.exercises) && d.exercises.length <= 30 && d.exercises.every(okPlanEx);
+  const okSplit = (sp) => sp && okId(sp.id) && okStr(sp.name, 80) && Array.isArray(sp.days) && sp.days.length <= 14 && sp.days.every(okDay);
+  const okItem = (it) => it && okId(it.exId) && (it.uid == null || okId(it.uid)) && Array.isArray(it.sets) && it.sets.length <= 10 && it.sets.every(okLoggedSet);
+  const okWorkout = (w) => w && okId(w.id) && okStr(w.name, 80) && Array.isArray(w.items) && w.items.length <= 50 && w.items.every(okItem);
+  const okHistory = (w) => okWorkout(w) && okDate(w.date) && (w.durationMin == null || Number.isFinite(w.durationMin));
+  const okCustom = (c) => !!c && okStr(c.name, 60) && !!c.name.trim() && okMuscles(c.primary) && okMuscles(c.secondary || []) && ["compound", "isolation"].includes(c.type) && (c.notes == null || okStr(c.notes, 300));
+  const okOpt = (k, v) => D.options[k].some((o) => String(o.id) === String(v));
+  const mySplits = () => arr(LS.get("splits", [])).filter(okSplit);
   const saveSplits = (v) => LS.set("splits", v);
-  const customs = () => { const c = LS.get("customExercises", {}); return c && typeof c === "object" ? c : {}; };
+  const customs = () => { const c = LS.get("customExercises", {}); return c && typeof c === "object" && !Array.isArray(c) ? Object.fromEntries(Object.entries(c).filter(([k, v]) => okId(k) && okCustom(v))) : {}; };
   const saveCustoms = (c) => LS.set("customExercises", c);
-  const history = () => arr(LS.get("history", [])).filter((w) => w && Array.isArray(w.items) && w.date);
+  const history = () => arr(LS.get("history", [])).filter(okHistory);
   const saveHistory = (h) => LS.set("history", h);
-  const activeW = () => { const w = LS.get("active", null); return w && Array.isArray(w.items) ? w : null; };
+  const activeW = () => { const w = LS.get("active", null); return okWorkout(w) && okDate(w.startedAt) ? w : null; };
   const saveActive = (w) => w ? LS.set("active", w) : LS.del("active");
-  const progress = () => LS.get("splitProgress", {}) || {};
+  const progress = () => { const p = LS.get("splitProgress", {}); return p && typeof p === "object" && !Array.isArray(p) ? Object.fromEntries(Object.entries(p).filter(([k, v]) => okId(k) && Number.isInteger(v) && v >= 0)) : {}; };
   const ui = (k, v) => { const u = LS.get("ui", {}) || {}; if (v === undefined) return u[k]; u[k] = v; LS.set("ui", u); };
 
   const X = (id) => L.ex(id, customs());
@@ -155,7 +182,7 @@
         <h3>Studies</h3>
         <ol class="cites">${cites.map((c) => `<li><p class="cite-main"><b>${esc(c.authors)} (${esc(c.year)}).</b> ${esc(c.title)} <i>${esc(c.journal)}</i>${c.volume ? " " + esc(c.volume) : ""}.</p>
           ${c.detail ? `<p class="cite-detail">${esc(c.detail)}</p>` : ""}${c.note ? `<p class="cite-note">${icon("info")}${esc(c.note)}</p>` : ""}
-          <p class="cite-links">${safeUrl(c.url) ? `<a href="${esc(safeUrl(c.url))}" target="_blank" rel="noopener">DOI ${icon("external-link")}</a>` : ""}${c.pmid ? `<a href="https://pubmed.ncbi.nlm.nih.gov/${esc(c.pmid)}/" target="_blank" rel="noopener">PubMed ${esc(c.pmid)} ${icon("external-link")}</a>` : ""}${c.optional ? `<span class="muted">Supporting extra</span>` : ""}</p></li>`).join("")}</ol>
+          <p class="cite-links">${safeUrl(c.url) ? `<a href="${esc(safeUrl(c.url))}" target="_blank" rel="noopener noreferrer">DOI ${icon("external-link")}</a>` : ""}${/^\d{1,9}$/.test(String(c.pmid || "")) ? `<a href="https://pubmed.ncbi.nlm.nih.gov/${esc(c.pmid)}/" target="_blank" rel="noopener noreferrer">PubMed ${esc(c.pmid)} ${icon("external-link")}</a>` : ""}${c.optional ? `<span class="muted">Supporting extra</span>` : ""}</p></li>`).join("")}</ol>
         <p class="src">${esc(e.source || "")}${e.fallbackFrom ? " · " + esc(e.fallbackFrom) : ""} · key ${esc(key)}</p>
       </div>`}`;
   }
@@ -362,7 +389,7 @@
   }
   function rerender() { const st = screen.scrollTop, ae = document.activeElement, key = ae && ae.dataset && ae.dataset.uid ? [ae.dataset.uid, ae.dataset.i, ae.dataset.f, ae.dataset.act] : null;
     render(true); screen.scrollTop = st;
-    if (key) { const el = $(`[data-uid="${esc(key[0])}"]${key[1] != null ? `[data-i="${esc(key[1])}"]` : ""}${key[2] ? `[data-f="${esc(key[2])}"]` : key[3] ? `[data-act="${esc(key[3])}"]` : ""}`, screen); if (el) el.focus({ preventScroll: true }); } }
+    if (key) { const el = $(`[data-uid="${CSS.escape(String(key[0]))}"]${key[1] != null ? `[data-i="${CSS.escape(String(key[1]))}"]` : ""}${key[2] ? `[data-f="${CSS.escape(String(key[2]))}"]` : key[3] ? `[data-act="${CSS.escape(String(key[3]))}"]` : ""}`, screen); if (el) el.focus({ preventScroll: true }); } }
   function updateStats() { const w = activeW(); if (!w) return; const a = $("[data-stat=done]"), b = $("[data-stat=hard]"); if (a) a.textContent = L.doneSets(w); if (b) b.textContent = L.hardSets(w); }
 
   function tickSet(uid, i) {
@@ -376,7 +403,7 @@
     const er = L.validateSet(filled);
     // A loaded exercise with no weight and no history: ask, rather than silently logging bodyweight. 0 = bodyweight on purpose.
     if (!er.kg && filled.kg === "" && ph.kg === "kg") er.kg = "Enter the weight in kg (0 for bodyweight)";
-    if (Object.keys(er).length) { errs[uid + ":" + i] = er; saveActive(w); rerender(); const bad = $(`.cell-in.bad[data-uid="${esc(uid)}"][data-i="${i}"]`, screen); if (bad) bad.focus(); return; }
+    if (Object.keys(er).length) { errs[uid + ":" + i] = er; saveActive(w); rerender(); const bad = $(`.cell-in.bad[data-uid="${CSS.escape(uid)}"][data-i="${i}"]`, screen); if (bad) bad.focus(); return; }
     delete errs[uid + ":" + i];
     Object.assign(s, filled, { kg: filled.kg.replace(",", "."), rir: filled.rir.replace(",", "."), done: true });
     saveActive(w);
@@ -397,7 +424,7 @@
     if (i < 0 || j < 0 || j >= w.items.length) return;
     [w.items[i], w.items[j]] = [w.items[j], w.items[i]]; w.changes.reorder = (w.changes.reorder || 0) + 1; saveActive(w);
     closeSheet(); rerender();
-    const el = $(`.exb[data-uid="${esc(uid)}"]`, screen); if (el) el.scrollIntoView({ block: "nearest" });
+    const el = $(`.exb[data-uid="${CSS.escape(uid)}"]`, screen); if (el) el.scrollIntoView({ block: "nearest" });
   }
   function removeItem(uid) {
     flushInputs();
@@ -573,10 +600,10 @@
     const vol = L.volumeKg(h);
     return `${topbar(back("#/home", "Done"), "")}
       ${largeTitle(esc(h.name), `${dfmt(h.date, { weekday: "long", day: "numeric", month: "long" })} · ${timeLabel(h.date)}`)}
-      <div class="stats3"><div><b class="num">${h.durationMin}<small> min</small></b><span>duration</span></div><div><b class="num">${L.doneSets(h)}</b><span>sets</span></div><div><b class="num">${L.hardSets(h)}</b><span>hard sets</span></div></div>
+      <div class="stats3"><div><b class="num">${esc(h.durationMin)}<small> min</small></b><span>duration</span></div><div><b class="num">${L.doneSets(h)}</b><span>sets</span></div><div><b class="num">${L.hardSets(h)}</b><span>hard sets</span></div></div>
       ${remHTML(sess.concat(wk))}
       <h2 class="sec sec-why"><span>Hard sets by muscle</span>${why("weekly.hard_sets")}</h2>
-      ${ms.length ? `<div class="bars">${ms.map((m) => `<div class="bar"><span class="bar-l">${esc(m)}</span><span class="bar-t"><i style="width:${(100 * per[m].sets / max).toFixed(1)}%" class="${per[m].direct ? "" : "ind"}"></i></span><b class="num">${L.fmtN(per[m].sets)}</b></div>`).join("")}</div>
+      ${ms.length ? `<div class="bars">${ms.map((m) => `<div class="bar"><span class="bar-l">${esc(m)}</span><span class="bar-t"><i data-w="${(100 * per[m].sets / max).toFixed(1)}" class="${per[m].direct ? "" : "ind"}"></i></span><b class="num">${L.fmtN(per[m].sets)}</b></div>`).join("")}</div>
         <p class="fine">Helper-muscle sets count ½ (lighter bars). Hard = RIR ${D.rules.hardSetMaxRIR} or less.</p>` : `<p class="empty-inline">No sets at RIR ${D.rules.hardSetMaxRIR} or less in this workout, so nothing counts toward the week.</p>`}
       ${nexts.length ? `<h2 class="sec sec-why"><span>Next time</span>${why("progression.suggestion")}</h2><div class="rows">${nexts.map(({ e, s }) => `<div class="row"><span class="row-main"><span class="row-t">${esc(e.name)}</span><span class="row-s">${esc(s.reason)}</span></span><b class="num row-v">${esc(s.target)}</b></div>`).join("")}</div>` : ""}
       <h2 class="sec">Logged</h2>
@@ -605,7 +632,7 @@
       ${remHTML(rem)}
       <h2 class="sec sec-why"><span>Hard sets per muscle</span>${why("weekly.hard_sets")}</h2>
       <div class="bars">${D.trackedMuscles.map((m) => { const v = st.muscles[m] || { hard: 0, sessions: 0 };
-        return `<div class="bar${v.hard ? "" : " zero"}"><span class="bar-l">${esc(m)}<small>${v.sessions ? plural(v.sessions, "session") : v.hard ? "helper only" : "–"}</small></span><span class="bar-t"><i style="width:${(100 * v.hard / max).toFixed(1)}%"></i></span><b class="num">${v.hard ? L.fmtN(v.hard) : "0"}</b></div>`; }).join("")}</div>
+        return `<div class="bar${v.hard ? "" : " zero"}"><span class="bar-l">${esc(m)}<small>${v.sessions ? plural(v.sessions, "session") : v.hard ? "helper only" : "–"}</small></span><span class="bar-t"><i data-w="${(100 * v.hard / max).toFixed(1)}"></i></span><b class="num">${v.hard ? L.fmtN(v.hard) : "0"}</b></div>`; }).join("")}</div>
       ${extra.length ? `<p class="fine">Also trained: ${extra.map((m) => `${lc(m)} ${L.fmtN(st.muscles[m].hard)}`).join(", ")}.</p>` : ""}
       <p class="fine">Direct sets count 1, helper-muscle sets ½. Hard = RIR ${D.rules.hardSetMaxRIR} or less. There's no fixed weekly target: more hard sets help, each adds a little less.</p>
       <h2 class="sec">Workouts</h2><div class="rows">${st.workouts.slice().reverse().map(histRow).join("")}</div>`
@@ -763,7 +790,7 @@
   }
   let cf = null;   // custom exercise form state
   function S_exerciseForm(id) {
-    const editing = id && customs()[id];
+    const editing = id && own(customs(), id) ? customs()[id] : null;
     if (!cf || cf.forId !== (id || "new")) cf = editing ? Object.assign({ forId: id, errors: {} }, JSON.parse(JSON.stringify(customs()[id]))) : { forId: "new", name: "", primary: [], secondary: [], equip: [(profile() || DEFAULT_PROFILE).equipment], type: "compound", profile: "", notes: "", errors: {} };
     const muscles = D.trackedMuscles.concat(D.extraMuscles), er = cf.errors || {};
     const chips = (field, dis) => `<div class="chips" role="group">${muscles.map((m) => `<button type="button" class="chip" data-cf="${esc(field)}" data-v="${esc(m)}" aria-pressed="${cf[field].includes(m)}" ${dis.includes(m) ? "disabled" : ""}>${esc(m)}</button>`).join("")}</div>`;
@@ -851,6 +878,7 @@
     const html = SCREENS[r.name](...r.args);
     if (redirected) return;
     screen.innerHTML = html;
+    applyWidths(screen);
     screen.dataset.route = r.name;
     const key = location.hash;
     if (!keepScroll && key !== lastRoute) { screen.scrollTop = 0; window.scrollTo(0, 0); const h1 = $("h1", screen) || $(".tb-title", screen); if (h1 && lastRoute) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); } }
@@ -965,7 +993,7 @@
     if (ev.key === "Enter" && ev.target.classList.contains("cell-in")) {
       ev.preventDefault();
       const el = ev.target, order = ["kg", "reps", "rir"], k = order.indexOf(el.dataset.f);
-      if (k < 2) { const n = $(`.cell-in[data-uid="${esc(el.dataset.uid)}"][data-i="${esc(el.dataset.i)}"][data-f="${esc(order[k + 1])}"]`); if (n) n.focus(); }
+      if (k < 2) { const n = $(`.cell-in[data-uid="${CSS.escape(el.dataset.uid)}"][data-i="${CSS.escape(el.dataset.i)}"][data-f="${CSS.escape(order[k + 1])}"]`); if (n) n.focus(); }
       else tickSet(el.dataset.uid, +el.dataset.i);
     }
   });
```

---

# Part 2: Accounts, user database, subscriptions (plan)

The owner wants email, Google and Facebook sign-in, a user database and, above all, subscriptions, working quickly, with cost dealt with later. Facts about third parties below were checked on the vendor's own pages on 2026-10-29; links are inline. Prices and limits change, so recheck before committing. Where I'm not sure, I say so.

## 11. Recommended stack

**Supabase (Auth + Postgres with Row Level Security, EU region) + Stripe (Checkout + Billing + Customer Portal), with entitlements written only by a webhook-driven server function.**

Why:
- **Fastest path to everything the owner asked for.** Supabase Auth includes email (magic link or OTP, optionally password), Google and Facebook OAuth. The Postgres database comes with **RLS**, so the static front end can talk to the database directly and the rules live in one place.
- **Account linking is built in.** Supabase automatically links an OAuth identity to an existing user with the same email. It refuses to link to an unverified email, and it removes other unconfirmed identities to prevent pre-account-takeover. Manual `linkIdentity()` exists but is beta. Source: [Supabase Identity Linking](https://supabase.com/docs/guides/auth/auth-identity-linking).
- **EU data residency.**
  - You pick a specific region: Frankfurt `eu-central-1`, Ireland `eu-west-1`, Paris `eu-west-3` or Stockholm `eu-north-1`.
  - The Postgres database, Auth and Storage origin stay in that region. Edge Functions run globally unless you pin them, and pinning is not available in Stockholm or Ohio. The Storage CDN cache is global.
  - Supabase notes that the generic "Europe" grouping can land in London or Zurich, which are not EU member states, so **choose a specific region, not the general group.**
  - Sources: [Supabase regions](https://supabase.com/regions), [Available regions docs](https://supabase.com/docs/guides/platform/regions).
  - Recommendation: **Frankfurt or Stockholm** (Stockholm is closest to Helsinki; Frankfurt also supports pinned Edge Functions).
- **Cost later.** As listed on [supabase.com/pricing](https://supabase.com/pricing) on 2026-10-29:
  - Free plan: 50,000 MAU and a 500 MB database. Projects pause after 1 week of inactivity, with at most 2 active projects. Fine for a beta.
  - Pro: from $25/month with 100k MAU included. It has a spend cap that is on by default, daily backups kept 7 days, no pausing, and leaked-password protection.
  - **Move to Pro before real paying users**, because pausing and the lack of backups on Free are not acceptable once people pay.
- **Stripe** for subscriptions:
  - Hosted Checkout means card data never touches our servers. Billing handles recurring charges, proration, dunning and invoices. The hosted Customer Portal lets users cancel, update cards and download invoices without us building UI.
  - Stripe's EEA pricing page on 2026-10-29 shows standard EEA cards at 1.5% + €0.25 and Billing pay-as-you-go at 0.7% of billing volume, with no monthly fee ([stripe.com/fi/pricing](https://stripe.com/fi/pricing)).
  - Stripe is a PCI Service Provider Level 1. For Checkout and Elements integrations, Stripe's Dashboard tells you which PCI self-assessment form applies and helps you fill it in ([Security at Stripe](https://docs.stripe.com/security)).

**Main alternative: Firebase Auth + Firestore Security Rules + Stripe**, using the "Run Payments with Stripe" extension or our own Cloud Function.
- Comparable speed, plus a strong mobile SDK.
- Downsides for us:
  - The data model is a document store, so workout analytics and joins are harder than in SQL.
  - Security Rules are a separate language to learn and test.
  - EU residency is per-database location, but Auth itself is a Google global service. I have not verified Firebase's current EU-residency terms for Auth, so check that before choosing it.
- Second alternative: Clerk (auth) + Neon or Supabase (DB) + Stripe. Polished auth UI, but more vendors, more DPAs and more cost.

## 12. Hosted auth

**Methods for v1:**
- Email magic link or 6-digit OTP (no passwords to store).
- Google.
- Facebook.
- Apple only becomes required if we ship an iOS app that offers other third-party logins (App Store rule). That is out of scope for the web.

**Redirect URI hygiene:**
- In Supabase Auth → URL Configuration:
  - Set the **Site URL** to the production origin.
  - Add only **exact** redirect URLs, for example `https://app.example.com/auth/callback` and `http://localhost:5173/auth/callback` for development.
  - Avoid broad wildcards such as `https://*.vercel.app/**` in production. Preview deployments get their own project or their own exact list.
- In the Google Cloud and Meta consoles, register only the Supabase callback `https://<ref>.supabase.co/auth/v1/callback`.
- Use the **PKCE** flow (the default in supabase-js for browser apps). Never put tokens in URLs we log.
- After login, redirect only to **relative paths** we validate (`next=/week`). Never redirect to a full URL taken from the query string (open redirect).

**Account linking:**
- Rely on Supabase's automatic same-verified-email linking.
- Turn on **"Confirm email"**, so email sign-ups must verify before they can be linked to.
- Offer "Connect Google" in Settings via `linkIdentity()` only once it leaves beta, or accept the beta label.
- Unlinking needs at least 2 identities on the account (per the Supabase docs).

**Facebook specifics** (Meta docs, 2026):
- Requesting only `public_profile` and `email` needs **no App Review** ([Login Review](https://developers.facebook.com/docs/facebook-login/guides/permissions/review/)).
- Meta still requires that we **honor data deletion requests and explain in the privacy policy how to request deletion**. That means either a Data Deletion Request **callback** (HTTPS; it returns `{url, confirmation_code}`) or a deletion-instructions URL ([Data Deletion Callback](https://developers.facebook.com/documentation/development/create-an-app/app-dashboard/data-deletion-callback), [Platform FAQ](https://developers.facebook.com/documentation/development/terms-and-policies/faqs)).
- The app must be switched to Live mode with a privacy-policy URL. Business verification may be needed depending on use. I'm not certain of the current trigger, so check in the Meta App Dashboard.
- Facebook may not return an email for some users (phone-only accounts), so handle a missing email.

**Other settings:**
- **Email sending.** Supabase's built-in email sender is meant for testing and is heavily rate-limited (exact limits per their docs; not re-verified today). Configure **custom SMTP** (for example Postmark, Resend or SES EU) before launch. Set SPF, DKIM and DMARC on the sending domain.
- **Session and keys.**
  - The front end gets only the **publishable/anon key**. That key is safe to ship, but only because RLS is on for every table.
  - The **service-role / secret key** lives only in Edge Function secrets. Never put it in the repo, the front end or the CI logs.
  - Turn on leaked-password protection if passwords are ever enabled (Pro plan).
  - Add CAPTCHA (hCaptcha or Turnstile, supported by Supabase Auth) on sign-up and OTP when abuse appears.

## 13. Database and RLS examples

The rules: **RLS on every table in `public`**, deny by default, and policies use `(select auth.uid())`. Clients may write only their own rows. **Entitlements and moderation fields are never client-writable.**

```sql
-- Profiles: 1 row per auth user
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(display_name) between 1 and 40),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "own profile read"   on public.profiles for select using (id = (select auth.uid()));
create policy "own profile update" on public.profiles for update using (id = (select auth.uid())) with check (id = (select auth.uid()));
-- insert happens in a trigger on auth.users (security definer), not from the client.

-- Workouts: private per user
create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  performed_at timestamptz not null,
  data jsonb not null check (pg_column_size(data) < 65536),
  created_at timestamptz not null default now()
);
create index on public.workouts (user_id, performed_at desc);
alter table public.workouts enable row level security;
create policy "own workouts" on public.workouts for all
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- Community splits: owner full access to own; everyone (incl. anon) reads only approved
create type split_status as enum ('pending', 'approved', 'rejected', 'removed');
create table public.community_splits (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 80),
  body jsonb not null check (pg_column_size(body) < 32768),
  status split_status not null default 'pending',
  created_at timestamptz not null default now()
);
alter table public.community_splits enable row level security;
create policy "public reads approved" on public.community_splits for select to anon, authenticated using (status = 'approved');
create policy "owner reads own"       on public.community_splits for select to authenticated using (owner_id = (select auth.uid()));
create policy "owner inserts pending" on public.community_splits for insert to authenticated
  with check (owner_id = (select auth.uid()) and status = 'pending');
create policy "owner edits -> back to pending" on public.community_splits for update to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()) and status = 'pending');
create policy "owner deletes own"     on public.community_splits for delete to authenticated using (owner_id = (select auth.uid()));
-- Moderators change status through a security-definer function / service role, never via a client policy.

-- Entitlements: readable by owner, writable ONLY by the webhook (service role bypasses RLS)
create table public.entitlements (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text unique,
  plan text not null default 'free',
  status text not null default 'none',          -- mirrors Stripe subscription.status
  current_period_end timestamptz,
  updated_from_event_created bigint not null default 0   -- for ordering, see §15
);
alter table public.entitlements enable row level security;
create policy "own entitlement read" on public.entitlements for select using (user_id = (select auth.uid()));
-- no insert/update/delete policies => clients cannot write.

create table public.stripe_events (             -- idempotency ledger
  id text primary key,                          -- Stripe event id (evt_...)
  type text not null,
  received_at timestamptz not null default now()
);
alter table public.stripe_events enable row level security;  -- no policies: service role only
```

Test the policies with two real test users plus `anon` in CI. Assert that user B cannot select, update or delete user A's rows, and that a user cannot set their own `status = 'approved'` or write `entitlements`. Run Supabase's Security Advisor before every release; it flags tables with RLS off.

## 14. Payments

- **Use hosted Stripe Checkout in `mode: "subscription"` as a redirect.**
  - Card data never touches our pages, and the CSP needs no Stripe entries.
  - The Checkout Session is created **server-side** (Edge Function) for the *logged-in* user. Set `client_reference_id = user.id` and reuse or create a `customer` mapped in `entitlements.stripe_customer_id`.
  - Prices come from Stripe Price IDs on the server. The client never sends an amount.
- **PCI.** With Checkout or Payment Links, we never handle card numbers. This is the lowest-burden integration type, and is commonly SAQ A. Stripe determines the exact form from the integration and shows it in the Dashboard, so **confirm the assigned SAQ in the Stripe Dashboard** rather than assuming. Serve every page over HTTPS (TLS ≥ 1.2).
- **Customer Portal** (hosted) for cancel, change plan, update card and invoices. Create portal sessions server-side for the current user's customer id only.
- **Never grant access from the success redirect.** The success page only says "Processing…" and then reads `entitlements`. Access comes only from the webhook (§15).
- **Other requirements:**
  - Stripe Tax, or a VAT decision: B2C digital subscriptions in the EU owe VAT at the customer's rate.
  - SCA/3DS is handled by Checkout.
  - Free trials are set in Checkout (`subscription_data.trial_period_days`).
  - EU consumer law gives a 14-day withdrawal right for digital services unless the user expressly consents to immediate performance and acknowledges losing the right. Show that checkbox or wording. Get legal review on the exact text.

## 15. Webhooks

Stripe facts, from [docs.stripe.com/webhooks](https://docs.stripe.com/webhooks), 2026-10-29:
- Signatures use the `Stripe-Signature` header with HMAC-SHA256 over `timestamp.rawBody`, and they need the **raw body**.
- The libraries default to a **5-minute timestamp tolerance**. Don't set the tolerance to 0, because that disables the check.
- **Delivery order is not guaranteed.** Duplicates can happen, so track event IDs.
- Live-mode retries continue for up to **3 days** with backoff.
- Return 2xx quickly.
- Secrets can be rolled with up to 24 hours of overlap.

Supabase Edge Function (Deno) sketch:
```ts
// supabase/functions/stripe-webhook/index.ts   (deploy with --no-verify-jwt: Stripe has no Supabase JWT)
import Stripe from "npm:stripe";
import { createClient } from "npm:@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);           // restricted key where possible
const whsec  = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;                    // whsec_..., from secrets, never in code
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const cryptoProvider = Stripe.createSubtleCryptoProvider();

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();                                           // RAW body: do not JSON.parse first
  if (!sig || raw.length > 512 * 1024) return new Response("Bad request", { status: 400 });

  let event: Stripe.Event;
  try {
    // Verifies HMAC + timestamp (default tolerance 300 s = replay protection)
    event = await stripe.webhooks.constructEventAsync(raw, sig, whsec, undefined, cryptoProvider);
  } catch {
    return new Response("Invalid signature", { status: 400 });           // don't echo details
  }

  // Idempotency: first writer wins; duplicates are acknowledged and skipped
  const { error: dup } = await db.from("stripe_events").insert({ id: event.id, type: event.type });
  if (dup) return new Response("ok (duplicate)", { status: 200 });

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
      case "invoice.paid":
      case "invoice.payment_failed": {
        // Ordering-safe: don't trust the payload's snapshot; re-fetch the CURRENT subscription from Stripe.
        const obj: any = event.data.object;
        const subId = obj.object === "subscription" ? obj.id : obj.subscription;
        const customerId = obj.customer as string;
        if (!subId || !customerId) break;
        const sub = await stripe.subscriptions.retrieve(subId);
        const { data: ent } = await db.from("entitlements").select("user_id").eq("stripe_customer_id", customerId).single();
        if (!ent) throw new Error("unknown customer");                    // customer must have been mapped at Checkout creation
        await db.from("entitlements").update({
          plan: sub.items.data[0]?.price.lookup_key ?? "pro",
          status: sub.status,                                             // active | trialing | past_due | canceled | ...
          current_period_end: new Date(sub.items.data[0].current_period_end * 1000).toISOString(),
          updated_from_event_created: event.created,
        }).eq("user_id", ent.user_id);
        break;
      }
      default: break;                                                     // subscribe only to the events above
    }
  } catch (e) {
    await db.from("stripe_events").delete().eq("id", event.id);           // allow Stripe's retry to reprocess
    return new Response("retry", { status: 500 });
  }
  return new Response("ok", { status: 200 });
});
```

Notes:
- **Ordering.** Re-fetching the subscription makes the handler order-independent. The `updated_from_event_created` column helps debugging, but Stripe warns that `created` has one-second resolution, so don't use it alone for ordering.
- **Server-side entitlement.** The app checks `entitlements.status in ('active','trialing')` and `current_period_end > now()`.
  - For premium **data**, enforce it in RLS. Example: `using (exists (select 1 from entitlements e where e.user_id = (select auth.uid()) and e.status in ('active','trialing')))`.
  - For premium **features computed client-side**, accept that a determined user can unlock UI locally. Anything of value must come from the server.
- **Replay.** Signature plus tolerance, plus the event-id ledger.
- **Secrets.** Rotate `whsec_` on suspicion. Test endpoints have a different secret from live ones. Optionally also allowlist Stripe's webhook IPs.
- **Events and testing.** Subscribe only to the events the handler uses. Test locally with `stripe listen --forward-to` and `stripe trigger`.
- **Stripe API version.** The `current_period_end` field location has moved between API versions (subscription versus subscription item). Pin the API version and adjust the code accordingly; I have not verified which version will be pinned.

## 16. GDPR basics (EU users; the team is in Finland)

This is not legal advice. Have counsel review the privacy notice and DPAs before launch.
- **Lawful basis:**
  - Account and workout sync: *contract* (Art. 6(1)(b)).
  - Billing and tax records: *legal obligation* (6(1)(c)).
  - Security and abuse logs: *legitimate interests* (6(1)(f)).
  - Marketing email and non-essential analytics: *consent*.
- **Health data caution.** Training logs and bodyweight can be argued to be **health data** (Art. 9 special category) when they reveal someone's health or fitness. The conservative choice is explicit consent at sign-up for syncing training data ("Store my workouts in my account"). Keep a local-only mode as the alternative. Ask counsel.
- **Privacy notice** before sign-up, covering:
  - Controller identity and contact.
  - Purposes and legal bases.
  - Processors (Supabase, Stripe, email provider, Google and Meta for login).
  - Transfers and safeguards. Supabase, Stripe and Meta are US companies; check their DPAs, SCCs and Data Privacy Framework status. Stripe states EU-US DPF certification ([Security at Stripe](https://docs.stripe.com/security)).
  - Retention periods, user rights and how to complain (Finland: Data Protection Ombudsman, tietosuoja.fi).
  - How to delete Facebook-derived data (required by Meta, §12).
- **Minimization:**
  - Collect email and display name only. No date of birth, gender or photos unless a feature needs them.
  - Don't send workout data to analytics.
  - Keep IP addresses out of app tables.
- **EU region:** a specific EU region (§11). Note that Edge Functions and the CDN are global by default.
- **DPAs:** accept the processor agreements of Supabase, Stripe (where Stripe acts as processor; for some payment data it is an independent controller) and the email provider. Keep a list of processors (record of processing, Art. 30).
- **Export and delete (Art. 15, 17, 20):**
  - A "Download my data" button that exports the user's rows as JSON.
  - A "Delete account" flow: a server function deletes `auth.users`, which cascades to user rows, and cancels the Stripe subscription. **Invoices and payment records must be kept for accounting.** Finnish bookkeeping law requires several years; the exact period is to be confirmed with the accountant.
- **Cookies and storage consent.** Auth session storage and localStorage strictly needed for the service are exempt from consent. Analytics, ads pixels and the Facebook SDK on page load are not. Prefer no third-party trackers; if any are added, use a consent banner that blocks them until accepted.
- **Breach notification.** Notify the supervisory authority **within 72 hours** of becoming aware of a breach (Art. 33), and notify users without undue delay if the risk is high (Art. 34). Write a one-page incident runbook: who decides, where logs are, how to rotate keys.
- **Retention:**
  - Delete unverified sign-ups after 30 days.
  - Delete inactive accounts after a stated period (for example 24 months, with an email warning first).
  - Keep webhook ledger rows for 90 days, logs per the provider's defaults, and moderation reports for 12 months.

## 17. Moderation (community splits and any user text)

- **Limits:**
  - Title 3–80 characters, notes ≤ 1,000 characters, and a split body ≤ 32 KB (the DB `check`s in §13).
  - At most 7 days and 30 exercises per day, and exercise ids must exist in exercises.json. Validate server-side with the same rules as §3, in a Postgres function or Edge Function.
- **Rate limits:**
  - At most 5 submissions per user per day and 1 report per user per item. Enforce with a DB function or trigger counting recent rows.
  - Use auth CAPTCHA and OTP rate limits for sign-up abuse.
- **Account-age and trust gates:**
  - Verified email plus an account at least 7 days old (or a paying account) to publish.
  - New accounts' submissions always go to review. Trusted users can be auto-approved later.
- **Review queue:** `status = 'pending'` by default, and only approved rows are public (RLS §13). Moderators act through an admin-only function that is logged, recording who changed what and when.
- **Reporting:** a "Report" button creates a `reports` row (reporter, item, reason enum, note ≤ 500 characters). At N reports, the item auto-hides back to pending.
- **Filters:**
  - Profanity and slur list (for example a maintained wordlist in each supported language; check `i18n/` plans).
  - **No URLs** in titles and notes for new accounts. Reject `https?://`, `www.` and obfuscated variants.
  - Normalize Unicode (NFKC) before matching, and strip zero-width and bidirectional control characters.
- **Safe rendering:** user text is always rendered as text: `esc()` today, `textContent` or framework escaping later. No Markdown or HTML from users. If Markdown is ever allowed, sanitize the output with DOMPurify under Trusted Types. Exercise ids from submissions are mapped to the local library, never rendered as raw HTML.
- **Legal:** under the EU **Digital Services Act**, hosting services need a notice-and-action mechanism and statements of reasons for removals. The reporting button and moderation log cover the basics. Check which obligations apply at our size with counsel.

## 18. Phased rollout

| Phase | Ship | Security gate before moving on |
|---|---|---|
| **0. Now (prototype)** | P0/P1 fixes from §9, CSP, gitignore, no code name in UI | Probes from this doc re-run clean; test-flows green |
| **1. Accounts (private beta)** | Supabase project in an EU region; magic link plus Google (Facebook after the privacy policy and data-deletion URL exist); `profiles` and `workouts` tables; local → cloud import through the §3 validator; privacy notice | RLS on every table and cross-user tests pass; exact redirect URLs; custom SMTP; service key only in function secrets; export and delete work |
| **2. Subscriptions** | Stripe in test mode first: Checkout, Customer Portal, webhook function, `entitlements`; then live keys | Signature verification, idempotency ledger, re-fetch on events; replayed and out-of-order events tested with `stripe trigger`; VAT and withdrawal-right wording reviewed; Supabase on Pro (no pausing, backups) |
| **3. Community** | Submissions to the review queue, reporting, filters, account-age gate | Moderation function logged; rate limits; DSA notice-and-action; Trusted Types or sanitizer if any rich text |
| **4. Hardening** | HTTP security headers and CSP, service worker per §5, monitoring and alerts on webhook failures, incident runbook, key rotation calendar | External pen test or at least an OWASP ASVS L1 self-check before a public launch |

