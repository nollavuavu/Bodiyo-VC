// Security + naming checks, headless Chrome over file://.
// 1) User-entered text (custom exercise name/notes, split + day names) renders as text: no element injected, no handler fires.
// 2) Local-first: the page makes no request that isn't file:// (everything vendored).
// 3) The code name "Carlsen" never reaches document.title or document.body.innerText on any screen or Why? sheet.
// 4) security.md §9/§10: prototype-named routes, corrupted storage boot, zero CSP violations, the XSS test in en/vi/pseudo.
// Run: node tools/test-security.js
const path = require("path"), fs = require("fs");
const puppeteer = require(process.env.PUPPETEER || "/workspace/carlsen-tools/node_modules/puppeteer-core");
const ROOT = path.join(__dirname, ".."), URL = "file://" + path.join(ROOT, "index.html");
const XSS = "<img src=x onerror=alert(1)>", XSS2 = `<img src=x onerror="window.__pwned=1"><script>window.__pwned=2</script>"'&`;
(async () => {
  const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args: ["--no-sandbox"] });
  const pg = await b.newPage(); await pg.emulateTimezone("Europe/Helsinki"); await pg.setViewport({ width: 390, height: 844 });
  const errs = [], nets = [], dialogs = [], cspv = [];
  // CSP violations are counted from the DOM event (and Chrome's console message) on every document.
  await pg.evaluateOnNewDocument(() => { document.addEventListener("securitypolicyviolation", (e) => console.warn("CSPV " + e.violatedDirective + " " + e.blockedURI)); });
  pg.on("console", (m) => { if (/^CSPV |Content Security Policy|Refused to/.test(m.text())) cspv.push(m.text().slice(0, 160)); });
  pg.on("pageerror", (e) => errs.push(e.message)); pg.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  pg.on("dialog", (d) => { dialogs.push(d.message()); d.dismiss(); });
  await pg.setRequestInterception(true);
  pg.on("request", (r) => { if (!r.url().startsWith("file:")) { nets.push(r.url()); r.abort(); } else r.continue(); });
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let pass = 0, fail = 0; const check = (n, ok, info) => { ok ? pass++ : fail++; console.log(ok ? "PASS" : "FAIL", n, ok ? "" : info || ""); };
  const go = async (h) => { await pg.evaluate((h) => (location.hash = h), h); await wait(250); };
  const click = (sel, i = 0) => pg.evaluate((s, i) => { const e = document.querySelectorAll(s)[i]; if (!e) throw new Error("no " + s); e.click(); }, sel, i).then(() => wait(200));
  const type = async (sel, v) => { await pg.evaluate((s) => { const e = document.querySelector(s); e.focus(); e.value = ""; }, sel); await pg.type(sel, v); await wait(80); };
  const injected = () => pg.evaluate(() => ({ imgs: document.querySelectorAll("#app img, #sheet img, #dialog img, img[src='x']").length, scripts: [...document.querySelectorAll("script")].filter((s) => !s.src).length, pwned: window.__pwned || 0 }));
  const clean = async (where) => { const r = await injected(); check(`${where}: payload rendered as text (no <img>/<script> injected, no handler fired)`, r.imgs === 0 && r.scripts === 0 && !r.pwned && !dialogs.length, JSON.stringify({ ...r, dialogs })); };
  const BAD = /carlsen/i;
  const noName = async (where) => { const t = await pg.evaluate(() => ({ title: document.title, body: document.body.innerText })); check(`${where}: no "Carlsen" in title or visible text`, !BAD.test(t.title) && !BAD.test(t.body), (t.title + " | " + (t.body.match(/.{0,40}carlsen.{0,40}/i) || [""])[0])); };
  try {
    await pg.goto(URL); await pg.evaluate(() => localStorage.clear()); await pg.goto(URL + "#/onboarding"); await pg.reload(); await wait(400);
    await noName("onboarding");
    await click("[data-act=ob-done]"); await wait(300); await noName("split");
    // custom exercise with a hostile name + notes
    await go("#/exercise-new"); await type("[data-cf-name]", XSS); await click('[data-cf=primary][data-v="Chest"]'); await type("[data-cf-notes]", XSS2);
    await click("[data-act=cf-save]"); await wait(400);
    const cu = await pg.evaluate(() => JSON.parse(localStorage.getItem("carlsen2.customExercises") || "{}"));
    const id = Object.keys(cu).find((k) => cu[k].name === XSS);
    check("hostile custom exercise name saved verbatim", !!id, JSON.stringify(cu));
    await go("#/library"); await clean("library list");
    check("library shows the name as literal text", (await pg.evaluate(() => document.body.innerText)).includes(XSS));
    await type("[data-lib-q]", "onerror"); await clean("library search");
    await go("#/exercise/" + id); await clean("exercise detail");
    const det = await pg.evaluate(() => document.body.innerText);
    check("exercise detail shows name and notes as literal text", det.includes(XSS) && det.includes(XSS2), det.slice(0, 300));
    // workout with it
    await go("#/train"); await click("[data-act=start-empty]"); await wait(300); await click("[data-act=add-ex]");
    await type("[data-pick-q]", "onerror"); await click(".pick-row[data-act=pick]"); await wait(300); await clean("workout + picker");
    await pg.evaluate(() => { document.querySelector(".cell-in[data-f=kg]").value = "<b>9</b>"; document.querySelector(".cell-in[data-f=kg]").dispatchEvent(new Event("input", { bubbles: true })); });
    await clean("workout with markup in a weight field");
    await click("[data-act=menu]").catch(() => {}); await clean("exercise menu");
    // split builder with hostile split + day names
    await go("#/builder/new"); await type("[data-b=name]", XSS); await type("[data-b=day]", XSS2); await wait(200);
    await click("[data-act=b-add-ex]"); await type("[data-pick-q]", "onerror"); await click(".pick-row[data-act=pick]"); await wait(300); await clean("builder");
    await click("[data-act=b-save]"); await wait(400); await clean("plan after saving hostile split");
    for (const h of ["#/plan", "#/home", "#/week", "#/you", "#/community", "#/library"]) { await go(h); await clean(h); }
    // name sweep over every screen + Why? sheets (including verbatim evidence text that uses the code name)
    for (const h of ["#/home", "#/plan", "#/train", "#/week", "#/week/-1", "#/library", "#/you", "#/community", "#/community/c-bro5", "#/exercise/barbell-bench-press", "#/exercise/" + id, "#/builder/new", "#/exercise-new", "#/workout", "#/onboarding"]) { await go(h); await noName(h); }
    // every Why? button on the main screens, research expanded (verbatim evidence text is where the code name lives)
    const seen = new Set(); let bad = [], sawBrand = false;
    const sweepWhy = async () => {
      const keys = await pg.evaluate(() => [...new Set([...document.querySelectorAll("[data-why]")].map((b) => b.dataset.why))]);
      for (const k of keys) { if (seen.has(k)) continue; seen.add(k);
        await pg.evaluate((k) => { const t = document.createElement("button"); t.dataset.why = k; t.hidden = true; document.querySelector("#screen").appendChild(t); t.click(); t.remove(); }, k); await wait(150);
        await pg.evaluate(() => { const r = document.querySelector("#sheet [data-research]"); if (r) r.click(); }); await wait(60);
        const t = await pg.evaluate(() => ({ title: document.title, body: document.body.innerText }));
        if (BAD.test(t.title + t.body)) bad.push(k); if (/so Lift only counts sets/.test(t.body)) sawBrand = true;
        await pg.evaluate(() => { const c = document.querySelector("[data-sheet-close]"); if (c) c.click(); }); await wait(60); }
    };
    for (const h of ["#/split", "#/home", "#/plan", "#/week", "#/you", "#/exercise/barbell-bench-press", "#/community/c-bro5"]) { await go(h); await sweepWhy(); }
    await go("#/train"); await click("[data-act=start-empty]").catch(() => {}); await go("#/workout"); await sweepWhy();
    const nScreen = seen.size;
    // then every remaining evidence entry, opened the same way (exercise.*, lengthened.*, rx rows, ...)
    await go("#/home"); await pg.evaluate(() => { const s = document.createElement("div"); s.id = "allwhy"; s.innerHTML = Object.keys(window.EVIDENCE.entries).map((k) => `<i data-why="${k}"></i>`).join(""); document.querySelector("#screen").appendChild(s); });
    await sweepWhy();
    check(`all ${seen.size} Why? sheets (${nScreen} reached from screens; research expanded): no "Carlsen"`, seen.size >= 270 && !bad.length, seen.size + " " + bad.join(", "));
    check("evidence text that names the product shows the app name instead", sawBrand);
    // tampered storage: hostile ids / muscles / numbers from localStorage still render as text
    await pg.evaluate((x) => { const h = [{ id: x, name: x, date: new Date().toISOString(), startedAt: new Date().toISOString(), durationMin: 5, source: { splitName: x }, items: [{ exId: x, sets: [{ kg: x, reps: x, rir: x, done: true }] }] }]; localStorage.setItem("carlsen2.history", JSON.stringify(h)); const c = JSON.parse(localStorage.getItem("carlsen2.customExercises")); Object.values(c)[0].primary = [x]; localStorage.setItem("carlsen2.customExercises", JSON.stringify(c)); }, XSS2);
    for (const h of ["#/home", "#/week", "#/library", "#/summary/latest"]) { await pg.goto(URL + h); if (h === "#/home") await pg.reload(); await wait(350); await clean("tampered storage " + h); }
    // ---- prototype-named / hostile routes must neither crash nor blank the app (own-property lookups) ----
    const PROTO = ["#/exercise/constructor", "#/exercise/__proto__", "#/exercise/toString", "#/exercise-edit/__proto__", "#/exercise-edit/constructor", "#/community/__proto__", "#/community/constructor", "#/builder/__proto__", "#/builder/constructor", "#/summary/__proto__", "#/summary/constructor", "#/__proto__", "#/constructor", "#/hasOwnProperty", "#/week/constructor", "#/exercise/%E0%A4%A", "#/exercise/" + encodeURIComponent(XSS)];
    for (const h of PROTO) { const n0 = errs.length; await pg.goto(URL + h); await wait(300);
      const r = await pg.evaluate(() => ({ len: document.querySelector("#screen").innerText.trim().length, polluted: ({}).polluted, h: location.hash }));
      check(`route ${h}: renders (not blank), no error, no pollution`, r.len > 10 && errs.length === n0 && r.polluted === undefined, JSON.stringify(r) + errs.slice(n0).join(" | ")); await clean("route " + h); }
    // ---- corrupted storage: every stored shape wrong; boot must fall back, not crash ----
    const CORRUPT = {
      "profile=[]": { profile: [] }, "profile=string": { profile: '"x"' }, "profile bad enums": { profile: { goal: XSS, experience: "__proto__", days: "x", sessionLength: -1, equipment: {}, activeSplitId: "constructor" } },
      "history={}": { history: {} }, "history=[null,1,'x']": { history: [null, 1, "x"] }, "history bad items": { history: [{ id: "h", date: "nope", items: [{ exId: "__proto__", sets: "x" }] }] },
      "splits=string": { splits: '"x"' }, "splits bad": { splits: [null, { id: "__proto__", days: "x" }, { id: "s", name: 5, days: [null, { name: XSS, exercises: [{ exId: "constructor", sets: "9e99" }] }] }] },
      "customExercises=[]": { customExercises: [] }, "customExercises proto": { customExercises: '{"__proto__":{"polluted":1},"constructor":{"name":"x"}}' },
      "active bad": { active: { items: "x", startedAt: "never" } }, "active items null": { active: { id: "a", items: [null, { exId: "__proto__", sets: [null] }] } },
      "lang=__proto__": { lang: '"__proto__"' }, "lang=object": { lang: { x: 1 } }, "ui/draft/pending junk": { ui: 5, builderDraft: "x", pendingAdd: [1], splitProgress: "x" },
      "invalid JSON everywhere": { profile: "{", history: "[", splits: "{{", customExercises: "}", active: "nul", lang: "'" },
    };
    const prof = { goal: "hypertrophy", experience: "intermediate", days: 4, sessionLength: 60, equipment: "gym", activeSplitId: "rec" };
    for (const [name, store] of Object.entries(CORRUPT)) {
      await pg.goto(URL); await pg.evaluate((s, p) => { localStorage.clear(); if (!("profile" in s)) localStorage.setItem("carlsen2.profile", JSON.stringify(p)); for (const [k, v] of Object.entries(s)) localStorage.setItem("carlsen2." + k, typeof v === "string" ? v : JSON.stringify(v)); }, store, prof);
      const n0 = errs.length; const lens = [];
      for (const h of ["#/home", "#/plan", "#/week", "#/library", "#/you", "#/workout", "#/train"]) { await pg.goto(URL + h); if (h === "#/home") await pg.reload(); /* reload: a hash-only goto would keep the pre-corruption state in memory */ await wait(200); lens.push(await pg.evaluate(() => document.querySelector("#screen").innerText.trim().length)); }
      const pol = await pg.evaluate(() => ({}).polluted);
      check(`corrupted storage boot (${name}): every screen renders, no error`, lens.every((l) => l > 10) && errs.length === n0 && pol === undefined, lens.join(",") + " " + errs.slice(n0).join(" | ")); await clean("corrupted " + name); }
    // ---- the XSS custom-exercise test again in Vietnamese (en fallback) and the pseudo-locale ----
    for (const lang of ["vi", "pseudo"]) {
      await pg.goto(URL); await pg.evaluate((p) => { localStorage.clear(); localStorage.setItem("carlsen2.profile", JSON.stringify(p)); }, prof);
      await pg.goto(URL + "?lang=" + lang + "#/exercise-new"); await wait(400);
      await type("[data-cf-name]", XSS); await click('[data-cf=primary][data-v="Chest"]'); await click("[data-act=cf-save]"); await wait(400);
      const cu = await pg.evaluate(() => JSON.parse(localStorage.getItem("carlsen2.customExercises") || "{}"));
      const id2 = Object.keys(cu).find((k) => cu[k].name === XSS);
      check(`[${lang}] hostile custom exercise saved`, !!id2, JSON.stringify(cu));
      await go("#/library"); await clean(`[${lang}] library`);
      await go("#/exercise/" + id2); await clean(`[${lang}] exercise detail`);
      check(`[${lang}] name shows as literal text`, (await pg.evaluate(() => document.body.innerText)).includes(XSS));
      await go("#/exercise-edit/" + id2); await clean(`[${lang}] edit form`);
      check(`[${lang}] edit form keeps the name verbatim in the input`, (await pg.evaluate(() => document.querySelector("[data-cf-name]").value)) === XSS);
    }
  } catch (e) { check("script error: " + e.message, false); }
  check("no Content-Security-Policy violations on any screen, sheet or locale", cspv.length === 0, [...new Set(cspv)].slice(0, 5).join(" | "));
  const head = fs.readFileSync(path.join(ROOT, "index.html"), "utf8").replace(/<!--[\s\S]*?-->/g, "");
  check("CSP meta present before any script, matching security.md (script-src 'self', default-src 'none')", /<meta charset[^>]*>\s*<meta http-equiv="Content-Security-Policy"[^>]*script-src 'self'[^>]*>/.test(head) && /default-src 'none'/.test(head) && head.indexOf("Content-Security-Policy") < head.indexOf("<script"));
  check("<title>Lift</title>", /<title>Lift<\/title>/.test(head));
  check("no network requests (local-first, all vendored)", nets.length === 0, nets.join(" "));
  check("no page errors", errs.length === 0, errs.join(" | "));
  // static: no code name in the user-facing shell files (comments excluded)
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8").replace(/<!--[\s\S]*?-->/g, "");
  check("index.html has no 'Carlsen' outside comments", !BAD.test(html));
  check("no manifest.json, or it has no 'Carlsen'", !fs.existsSync(path.join(ROOT, "manifest.json")) || !BAD.test(fs.readFileSync(path.join(ROOT, "manifest.json"), "utf8")));
  console.log(`\n${pass}/${pass + fail} checks passed`); await b.close(); process.exit(fail ? 1 : 0);
})();
