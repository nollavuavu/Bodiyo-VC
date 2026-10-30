/* Carlsen prototype v2 – UI. Plain JS, hash routing, localStorage (prefix "carlsen2."). No backend, no AI.
 * All "Why?" text and citations come from window.EVIDENCE (generated from evidence.md via evidence.json).
 * Programme logic lives in logic.js; numbers in data.js `rules` (traced to evidence.md) and `conventions`. */
(function () {
  "use strict";
  const D = window.CARLSEN_DATA, L = window.CarlsenLogic, ICONS = window.ICONS || {}, I = window.I18N;
  // i18n: every visible string is a key in /workspace/carlsen/i18n/en.json (see i18n/KEYS.md). T() returns PLAIN TEXT:
  // anything that goes into an HTML template must go through TE() (= esc(T())) or esc(); never put markup in translations.
  const T = (k, v, f) => I.t(k, v, f);
  const APP = D.appName;   // user-facing name; defined once in data.js
  // Imported evidence text is kept verbatim in evidence.json; the code name in it is swapped for APP at load (display only).
  const brand = (v) => typeof v === "string" ? v.replace(/\bCarlsen\b/g, APP) : Array.isArray(v) ? v.map(brand) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, brand(x)])) : v;
  const EV = brand((window.EVIDENCE && window.EVIDENCE.entries) || {});
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const screen = $("#screen"), tabbar = $("#tabbar"), restbar = $("#restbar");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Only http(s) links from imported data become hrefs (blocks javascript:/data: URLs in evidence.json).
  const TE = (k, v, f) => esc(T(k, v, f));
  // Only https links from imported data become hrefs (blocks http:, javascript:, data: URLs in evidence.json). security.md §2.
  const safeUrl = (u) => { try { const x = new URL(String(u || "")); return x.protocol === "https:" ? x.href : ""; } catch (e) { return ""; } };
  const okPmid = (p) => /^\d{1,9}$/.test(String(p == null ? "" : p));
  // CSS.escape for values inside selectors (esc() is the HTML encoder, not a selector encoder).
  const cssq = (v) => (window.CSS && CSS.escape ? CSS.escape(String(v)) : String(v).replace(/[^\w-]/g, "\\$&"));
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");
  const icon = (n, cls = "") => `<svg class="ic ${esc(cls)}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;
  const lc = (s) => I.lower(s);
  const cap = (s) => I.cap(s);
  // Muscles are stored by English name; M() gives the display name, ML() the lower-case form for running text.
  const M = (m) => I.muscle(m), ML = (m) => I.lower(M(m));
  const mjoin = (ms, lower) => ms.map(lower ? ML : M).join(T("common.listSep"));
  // Counted phrases ("3 sets"): plural forms are flat keys <key>.one / <key>.other picked by Intl.PluralRules.
  const count = (key, n) => T(key, { n, count: n });
  const perDays = (n) => T("common.perWeek", { days: count("common.plural.day", n) });
  // CSP-safe bar widths: style="" in HTML strings is blocked by style-src 'self'; CSSOM writes are allowed (security.md §4).
  const applyWidths = (root) => $$("[data-w]", root).forEach((el) => { const n = Number(el.dataset.w); el.style.width = (Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 0) + "%"; });

  // ---------- storage ----------
  const PFX = "carlsen2.";
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(PFX + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(PFX + k, JSON.stringify(v)); } catch (e) { toast(T("common.storageError")); } },
    del(k) { try { localStorage.removeItem(PFX + k); } catch (e) { /* storage blocked */ } }
  };
  // ---------- stored-data checks: localStorage (and any future import/sync) is untrusted input (security.md §1, §3) ----------
  const own = (o, k) => o != null && Object.prototype.hasOwnProperty.call(o, k);
  const BAD_KEYS = ["__proto__", "constructor", "prototype"];
  const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
  const okId = (v) => typeof v === "string" && /^[A-Za-z0-9_.:-]{1,64}$/.test(v) && !BAD_KEYS.includes(v);
  const okStr = (v, max) => typeof v === "string" && v.length <= max;
  const okDate = (v) => typeof v === "string" && v.length <= 40 && !isNaN(Date.parse(v));
  const okSets = (n) => Number.isInteger(n) && n >= 1 && n <= 10;
  const okField = (v) => v == null || ((typeof v === "string" || typeof v === "number") && String(v).length <= 12);
  const okLoggedSet = (x) => isObj(x) && ["kg", "reps", "rir"].every((f) => okField(x[f])) && (x.done == null || typeof x.done === "boolean");
  const ALL_MUSCLES = () => D.trackedMuscles.concat(D.extraMuscles);
  const okMuscles = (a) => Array.isArray(a) && a.length <= 20 && a.every((m) => ALL_MUSCLES().includes(m));
  const okPlanEx = (x) => isObj(x) && okId(x.exId) && okSets(x.sets);
  const okDay = (d) => isObj(d) && (d.name == null || okStr(d.name, 60)) && Array.isArray(d.exercises) && d.exercises.length <= 30 && d.exercises.every(okPlanEx);
  const okSplit = (sp) => isObj(sp) && okId(sp.id) && okStr(sp.name, 120) && Array.isArray(sp.days) && sp.days.length <= 14 && sp.days.every(okDay);
  const okItem = (it) => isObj(it) && okId(it.exId) && (it.uid == null || okId(it.uid)) && Array.isArray(it.sets) && it.sets.length <= 10 && it.sets.every(okLoggedSet);
  const okSource = (s) => s == null || (isObj(s) && okId(s.splitId) && Number.isInteger(s.dayIndex) && s.dayIndex >= 0 && s.dayIndex < 14 && (s.splitName == null || okStr(s.splitName, 120)));
  const okRest = (r) => r == null || (isObj(r) && Number.isFinite(r.endsAt) && Number.isFinite(r.total) && r.total > 0);
  const okWorkout = (w) => isObj(w) && okId(w.id) && okStr(w.name, 120) && Array.isArray(w.items) && w.items.length <= 50 && w.items.every(okItem) && okSource(w.source) && okRest(w.rest);
  const okHistory = (w) => okWorkout(w) && okDate(w.date) && (w.durationMin == null || (Number.isFinite(w.durationMin) && w.durationMin >= 0 && w.durationMin <= 100000));
  const okCustom = (c) => isObj(c) && okStr(c.name, 60) && !!c.name.trim() && okMuscles(c.primary) && okMuscles(c.secondary || []) && ["compound", "isolation"].includes(c.type) && (c.notes == null || okStr(c.notes, 300));
  const okOpt = (k, v) => D.options[k].some((o) => String(o.id) === String(v));
  const MAX_HISTORY = 1000;   // keeps one localStorage key well under the ~5 MB origin quota (security.md §1)
  const DEFAULT_PROFILE = { goal: "hypertrophy", experience: "intermediate", days: 4, sessionLength: 60, equipment: "gym", activeSplitId: "rec" };
  const profile = () => {
    const p = LS.get("profile", null); if (!isObj(p)) return null;
    const out = Object.assign({}, DEFAULT_PROFILE);
    ["goal", "experience", "days", "sessionLength", "equipment"].forEach((k) => { if (own(p, k) && okOpt(k, p[k])) out[k] = k === "days" || k === "sessionLength" ? +p[k] : p[k]; });
    if (okId(p.activeSplitId)) out.activeSplitId = p.activeSplitId;
    if (p.splitKey != null && own(D.splits, p.splitKey)) out.splitKey = p.splitKey;
    return out;
  };
  const setProfile = (p) => LS.set("profile", p);
  const arr = (v) => Array.isArray(v) ? v : [];
  const mySplits = () => arr(LS.get("splits", [])).filter(okSplit);
  const saveSplits = (v) => LS.set("splits", v);
  const customs = () => { const c = LS.get("customExercises", {}); return isObj(c) ? Object.fromEntries(Object.entries(c).filter(([k, v]) => okId(k) && okCustom(v))) : {}; };
  const saveCustoms = (c) => LS.set("customExercises", c);
  const history = () => arr(LS.get("history", [])).filter(okHistory);
  const saveHistory = (h) => LS.set("history", h.length > MAX_HISTORY ? h.slice().sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-MAX_HISTORY) : h);
  const activeW = () => { const w = LS.get("active", null); return okWorkout(w) && okDate(w.startedAt) ? w : null; };
  const saveActive = (w) => w ? LS.set("active", w) : LS.del("active");
  const progress = () => { const p = LS.get("splitProgress", {}); return isObj(p) ? Object.fromEntries(Object.entries(p).filter(([k, v]) => okId(k) && Number.isInteger(v) && v >= 0)) : {}; };
  const ui = (k, v) => { let u = LS.get("ui", {}); if (!isObj(u)) u = {}; if (v === undefined) return u[k]; u[k] = v; LS.set("ui", u); };

  // Library exercises show their name and stretch-position text in the current language (exercise.<id>.name / .position,
  // generated into en.json from exercises.json). Custom exercises keep the name the user typed.
  const X = (id) => { const e = L.ex(id, customs()); if (e.custom || e.missing) return e;
    return Object.assign(e, { name: T("exercise." + e.id + ".name", null, e.name), lengthened: e.lengthened ? T("exercise." + e.id + ".position", null, e.lengthened) : e.lengthened }); };
  // One-time id migration: v1-style ids (data.js) -> exercises.json ids (D.aliases), so saved plans and history keep working.
  function migrateIds() {
    const A = D.aliases || {}; if (!Object.keys(A).length) return;   // cheap; runs on every load so imported/old data is always normalised
    const fix = (id) => (own(A, id) && own(D.exercises, A[id]) ? A[id] : id);
    const items = (list) => (list || []).forEach((it) => { if (it && it.exId) { it.exId = fix(it.exId); if (it.swappedFrom) it.swappedFrom = fix(it.swappedFrom); } });
    const legacy = (list) => (list || []).some((it) => it && (own(A, it.exId) || own(A, it.swappedFrom)));
    const h = history(); if (h.some((w) => legacy(w.items))) { h.forEach((w) => items(w.items)); saveHistory(h); }
    const sp = mySplits(); if (sp.some((s) => s.days.some((d) => legacy(d.exercises)))) { sp.forEach((s) => s.days.forEach((d) => items(d.exercises))); saveSplits(sp); }
    const w = activeW(); if (w && legacy(w.items)) { items(w.items); saveActive(w); }
  }
  const rxFor = (id) => L.rx(id, profile() || DEFAULT_PROFILE, customs());
  function getSplit(id) {
    const p = profile() || DEFAULT_PROFILE;
    if (!id || id === "rec") return L.recommended(p);
    const mine = mySplits().find((s) => s.id === id); if (mine) return mine;
    const c = D.communitySplits.find((s) => s.id === id); if (c) return Object.assign({ readOnly: true, community: true }, c);
    return null;
  }
  function activePlan() { const p = profile() || DEFAULT_PROFILE; return getSplit(p.activeSplitId) || getSplit("rec"); }
  const nextIndex = (split) => split && split.days.length ? ((progress()[split.id] || 0) % split.days.length) : 0;
  function lastSetsFor(exId) {
    const h = history().slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    for (const w of h) { const it = w.items.find((x) => x.exId === exId && x.sets.some((s) => s.done)); if (it) return it.sets.filter((s) => s.done); }
    return [];
  }
  const musclesOfDay = (day) => { const s = new Set(); day.exercises.forEach((it) => X(it.exId).primary.forEach((m) => s.add(m))); return [...s]; };

  // ---------- formatting (dates and numbers follow the current language) ----------
  const dfmt = (d, o) => new Date(d).toLocaleDateString(I.locale(), o);
  const dayLabel = (d) => dfmt(d, { weekday: "short", day: "numeric", month: "short" });
  const timeLabel = (d) => new Date(d).toLocaleTimeString(I.locale(), { hour: "2-digit", minute: "2-digit" });
  // 0 = Monday. 2024-01-01 was a Monday.
  const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];   // index 0 = Monday (data.js weekdays)
  const weekdayShort = (i) => Number.isInteger(i) && i >= 0 && i < 7 ? T("common.weekday." + WEEKDAYS[i]) : "";
  const minutes = (n) => T("common.minutes", { n });
  const mmss = (sec) => { sec = Math.max(0, Math.round(sec)); const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(s).padStart(2, "0"); };
  const kgTxt = (v) => { const n = L.num(v); return n ? L.fmtKg(n) : T("logger.bwShort"); };

  // ---------- small UI pieces ----------
  // One "Why?" per exercise or metric. Plain text affordance in the accent colour with a full 44px hit area.
  const why = (key, label) => { label = label || T("common.why"); return own(EV, key) ? `<button type="button" class="why" data-why="${esc(key)}" aria-label="${TE("common.whyLabel", { label, title: EV[key].title })}">${esc(label)}</button>` : ""; };
  const note = (n) => `<li class="note"><span class="note-text">${esc(n.text)}</span>${n.whyKey ? why(n.whyKey) : ""}</li>`;
  const topbar = (left, title, right) => `<header class="topbar">${left || "<span class='tb-sp'></span>"}<div class="tb-title">${title || ""}</div>${right || "<span class='tb-sp'></span>"}</header>`;
  const back = (href, label) => `<a class="iconbtn" href="${esc(href)}" aria-label="${esc(label || T("common.back"))}">${icon("chevron-left")}</a>`;
  // largeTitle: `t` and `sub` are HTML; callers pass esc()/TE() output.
  const largeTitle = (t, sub, right) => `<div class="lt"><div><h1>${t}</h1>${sub ? `<p class="lt-sub">${sub}</p>` : ""}</div>${right || ""}</div>`;
  let toastT;
  function toast(msg, action) {
    const t = $("#toast");
    t.innerHTML = `<span>${esc(msg)}</span>${action ? `<button type="button" class="toast-act">${icon("undo-2")}${esc(action.label)}</button>` : ""}`;
    t.hidden = false; clearTimeout(toastT);
    if (action) $(".toast-act", t).onclick = () => { t.hidden = true; action.fn(); };
    toastT = setTimeout(() => (t.hidden = true), action ? 5000 : 2200);
  }

  // ---------- dialog (in-app confirm; never window.confirm) ----------
  function dialog({ title, body, actions }) {
    return new Promise((resolve) => {
      const dl = $("#dialog"), scrim = $("#scrim");
      dl.innerHTML = `<div class="dlg"><h2 id="dialog-title">${esc(title)}</h2>${body ? `<p>${esc(body)}</p>` : ""}
        <div class="dlg-actions">${actions.map((a, i) => `<button type="button" class="btn ${a.kind === "primary" ? "btn-primary" : a.kind === "danger" ? "btn-danger" : "btn-quiet"}" data-i="${i}">${esc(a.label)}</button>`).join("")}</div></div>`;
      dl.hidden = false; scrim.hidden = false; scrim.dataset.for = "dialog";
      const done = (v) => { dl.hidden = true; if (!$("#sheet").hidden) scrim.dataset.for = "sheet"; else scrim.hidden = true; document.removeEventListener("keydown", onKey); resolve(v); };
      const onKey = (e) => { if (e.key === "Escape") done(null); };
      document.addEventListener("keydown", onKey);
      $$("button", dl).forEach((b) => (b.onclick = () => done(actions[+b.dataset.i].value)));
      ($(".btn-primary", dl) || $("button", dl)).focus();
    });
  }

  // ---------- bottom sheet with a small stack (Why? panels, pickers, menus) ----------
  const sheetStack = [];
  function openSheet(render, opts) {
    sheetStack.push({ render, opts: opts || {} });
    drawSheet();
  }
  function drawSheet() {
    const sheet = $("#sheet"), scrim = $("#scrim"), top = sheetStack[sheetStack.length - 1];
    if (!top) return closeSheet();
    const canBack = sheetStack.length > 1;
    sheet.className = "sheet" + (top.opts.tall ? " tall" : "");
    sheet.innerHTML = `<div class="grab" aria-hidden="true"></div><div class="sheet-head">${canBack ? `<button type="button" class="iconbtn" data-sheet-back aria-label="${TE("common.back")}">${icon("chevron-left")}</button>` : "<span class='tb-sp'></span>"}
      <span class="tb-sp"></span><button type="button" class="iconbtn" data-sheet-close aria-label="${TE("common.close")}">${icon("x")}</button></div><div class="sheet-body">${top.render()}</div>`;
    applyWidths(sheet);
    sheet.hidden = false; scrim.hidden = false; scrim.dataset.for = "sheet";
    sheet.scrollTop = 0;
    requestAnimationFrame(() => sheet.classList.add("show"));
    if (top.opts.onOpen) top.opts.onOpen(sheet);
    const f = $("[autofocus]", sheet) || $("h2", sheet); if (f) { if (!f.hasAttribute("tabindex") && f.tagName === "H2") f.setAttribute("tabindex", "-1"); f.focus({ preventScroll: true }); }
  }
  function sheetBack() { sheetStack.pop(); drawSheet(); }
  function closeSheet() {
    sheetStack.length = 0;
    const sheet = $("#sheet"), scrim = $("#scrim");
    sheet.classList.remove("show"); sheet.hidden = true; sheet.innerHTML = "";
    if ($("#dialog").hidden) scrim.hidden = true;
  }
  const refreshSheet = () => { if (sheetStack.length) { const b = $(".sheet-body"); const st = $("#sheet").scrollTop; b.innerHTML = sheetStack[sheetStack.length - 1].render(); applyWidths(b); $("#sheet").scrollTop = st; } };

  // ---------- Why? panel: punchy one-liner first, research on demand ----------
  function whyHTML(key) {
    const e = own(EV, key) ? EV[key] : null;
    if (!e) return `<h2 id="sheet-title">${TE("common.noEvidence")}</h2><p class="muted">${TE("common.noEvidenceKey", { key })}</p>`;
    const ph = e.status !== "evidence";
    const conv = D.conventions.filter((c) => c.whyKey === key || (Array.isArray(c.alsoFor) && c.alsoFor.includes(key)));
    const cites = e.citations || [];
    // Evidence copy (title, one-liner, research, citations) stays English by design; only the UI around it is translated.
    // Evidence-copy elements carry lang="en" + data-ev (screen readers; the pseudo-locale test skips them).
    return `<h2 id="sheet-title" class="why-title" lang="en" data-ev>${esc(e.title)}</h2>
      <p class="oneliner${ph ? " pending" : ""}"${ph ? "" : ` lang="en" data-ev`}>${ph ? (e.status === "pending" ? TE("common.pendingApproval") : TE("why.placeholder", { what: "evidence.md" })) : md(e.oneLiner)}</p>
      ${ph ? `<p class="fine muted">${e.awaiting ? TE("common.waitingFor", { what: e.awaiting }).replace(esc(e.awaiting), `<span lang="en" data-ev>${esc(e.awaiting)}</span>`) : ""}</p>` : ""}
      ${conv.length ? `<div class="conv"><h3>${TE("common.howAppApplies", { app: APP })}</h3><ul>${conv.map((c) => `<li>${esc(c.text)}</li>`).join("")}</ul></div>` : ""}
      ${ph ? "" : `<button type="button" class="disclose" data-research aria-expanded="false" aria-controls="research">${icon("flask-conical")}<span>${TE("common.seeResearch")}</span><span class="disclose-n">${esc(count("common.count.studies", cites.length))}</span>${icon("chevron-down", "chev")}</button>
      <div class="research" id="research" hidden>
        ${e.summary ? `<h3>${TE("common.research.why")}</h3><p lang="en" data-ev>${md(e.summary)}</p>` : ""}
        ${e.recommendation ? `<h3>${TE("common.research.recommendation")}</h3><p lang="en" data-ev>${md(e.recommendation)}</p>` : ""}
        ${e.evidenceStrength ? `<h3>${TE("common.research.strength")}</h3><p lang="en" data-ev>${md(e.evidenceStrength)}</p>` : ""}
        <h3>${TE("common.research.studies")}</h3>
        <ol class="cites">${cites.map((c) => `<li><p class="cite-main" lang="en" data-ev><b>${esc(c.authors)} (${esc(c.year)}).</b> ${esc(c.title)} <i>${esc(c.journal)}</i>${c.volume ? " " + esc(c.volume) : ""}.</p>
          ${c.detail ? `<p class="cite-detail" lang="en" data-ev>${esc(c.detail)}</p>` : ""}${c.note ? `<p class="cite-note" lang="en" data-ev>${icon("info")}${esc(c.note)}</p>` : ""}
          <p class="cite-links">${safeUrl(c.url) ? `<a href="${esc(safeUrl(c.url))}" target="_blank" rel="noopener noreferrer">${TE("common.research.doi")} ${icon("external-link")}</a>` : ""}${okPmid(c.pmid) ? `<a href="https://pubmed.ncbi.nlm.nih.gov/${esc(c.pmid)}/" target="_blank" rel="noopener noreferrer">${TE("common.research.pubmed", { pmid: c.pmid })} ${icon("external-link")}</a>` : ""}${c.optional ? `<span class="muted">${TE("common.research.optional")}</span>` : ""}</p></li>`).join("")}</ol>
        <p class="src">${TE("why.sourceKey", { source: (e.source || "") + (e.fallbackFrom ? " · " + e.fallbackFrom : ""), key })}</p>
      </div>`}`;
  }
  const openWhy = (key) => openSheet(() => whyHTML(key));

  // Prescription sheet: the single Why? for an exercise; each number links to its own evidence.
  function rxHTML(exId) {
    const e = X(exId), r = rxFor(exId);
    const one = (key) => own(EV, key) ? (EV[key].status === "evidence" ? EV[key].oneLiner : T("common.pendingApproval")) : "";
    const row = (label, val, key) => `<button type="button" class="rx-row" data-why-push="${esc(key)}"><span class="rx-k">${esc(label)}</span><span class="rx-v num">${esc(val)}</span><span class="rx-1"${own(EV, key) && EV[key].status === "evidence" ? ` lang="en" data-ev` : ""}>${esc(one(key))}</span>${icon("chevron-right", "chev")}</button>`;
    return `<h2 id="sheet-title">${esc(e.name)}</h2><p class="muted sheet-sub">${TE("exercise.rx.intro")}</p>
      <div class="rx-list">${row(T("exercise.rx.sets"), count("common.count.hardSets", r.sets), r.why.sets)}${row(T("exercise.rx.reps"), r.reps, r.why.reps)}${row(T("exercise.rx.rir"), r.rir, r.why.rir)}${row(T("exercise.rx.rest"), minutes(r.rest), r.why.rest)}
      ${row(T("exercise.rx.loggingRir"), T("exercise.rx.estimate"), "rir.input")}${row(e.custom ? T("exercise.rx.custom") : T("exercise.rx.this"), e.custom ? T("exercise.rx.yourPick") : e.profile ? T("common.profile." + e.profile) : "", r.why.exercise)}
      ${r.why.lengthened ? row(T("exercise.rx.stretch"), "", r.why.lengthened) : ""}</div>`;
  }

  // ---------- muscle map (the only illustration). Primary = red, secondary = muted blue, each with a text legend ----------
  function bodySVG(e, side, label) {
    const col = (m) => e.primary.includes(m) ? "var(--m1)" : e.secondary.includes(m) ? "var(--m2)" : "var(--m0)";
    const B = "var(--body)";
    const base = `<circle cx="50" cy="14" r="10" fill="${B}"/><rect x="45" y="22" width="10" height="8" fill="${B}"/><rect x="29" y="29" width="42" height="64" rx="10" fill="${B}"/>
      <rect x="16" y="32" width="11" height="72" rx="5.5" fill="${B}"/><rect x="73" y="32" width="11" height="72" rx="5.5" fill="${B}"/>
      <rect x="32" y="88" width="17" height="104" rx="8" fill="${B}"/><rect x="51" y="88" width="17" height="104" rx="8" fill="${B}"/>`;
    const E = (m, cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${col(m)}"><title>${esc(M(m))}</title></ellipse>`;
    const Rr = (m, x, y, w, h, r) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${col(m)}"><title>${esc(M(m))}</title></rect>`;
    const front = E("Front delts", 30, 36, 6, 6) + E("Front delts", 70, 36, 6, 6) + E("Side delts", 22, 38, 4, 6) + E("Side delts", 78, 38, 4, 6)
      + E("Chest", 41, 46, 9, 7) + E("Chest", 59, 46, 9, 7) + E("Biceps", 21.5, 58, 4.5, 11) + E("Biceps", 78.5, 58, 4.5, 11) + E("Forearms", 21.5, 84, 4, 12) + E("Forearms", 78.5, 84, 4, 12)
      + Rr("Abs", 43, 56, 14, 30, 4) + E("Quads", 40, 122, 7.5, 22) + E("Quads", 60, 122, 7.5, 22) + E("Adductors", 47, 108, 2.5, 11) + E("Adductors", 53, 108, 2.5, 11)
      + E("Calves", 40, 166, 5, 13) + E("Calves", 60, 166, 5, 13);
    const backv = E("Rear delts", 30, 36, 6, 6) + E("Rear delts", 70, 36, 6, 6) + E("Side delts", 22, 38, 4, 6) + E("Side delts", 78, 38, 4, 6)
      + E("Upper back", 50, 42, 16, 9) + E("Lats", 38, 63, 8, 14) + E("Lats", 62, 63, 8, 14) + E("Triceps", 21.5, 58, 4.5, 11) + E("Triceps", 78.5, 58, 4.5, 11)
      + Rr("Spinal erectors", 46, 52, 8, 34, 4) + E("Glutes", 41, 98, 9, 9) + E("Glutes", 59, 98, 9, 9)
      + E("Hamstrings", 40, 128, 7.5, 18) + E("Hamstrings", 60, 128, 7.5, 18) + E("Calves", 40, 166, 6, 13) + E("Calves", 60, 166, 6, 13);
    return `<svg viewBox="0 0 100 200" role="img" aria-label="${esc(label)}">${base}${side === "front" ? front : backv}</svg>`;
  }
  const BACK_FIRST = ["Rear delts", "Upper back", "Lats", "Triceps", "Spinal erectors", "Glutes", "Hamstrings"];
  function miniMap(e) {
    const side = e.primary[0] && BACK_FIRST.includes(e.primary[0]) ? "back" : "front";
    return `<span class="mini" aria-hidden="true">${bodySVG(e, side, "")}</span>`;
  }
  function muscleMap(e) {
    return `<div class="mmap"><figure>${bodySVG(e, "front", T("exercise.map.frontLabel", { muscles: mjoin(e.primary) }))}<figcaption>${TE("exercise.map.front")}</figcaption></figure>
      <figure>${bodySVG(e, "back", T("exercise.map.back"))}<figcaption>${TE("exercise.map.back")}</figcaption></figure></div>
      <dl class="legend"><div><dt><i class="sw sw1"></i>${TE("exercise.map.primary")}</dt><dd>${esc(mjoin(e.primary) || T("common.none"))}</dd></div><div><dt><i class="sw sw2"></i>${TE("exercise.map.secondary")}</dt><dd>${esc(mjoin(e.secondary) || T("common.none"))}</dd></div></dl>`;
  }

  // ---------- workouts ----------
  const newSet = () => ({ kg: "", reps: "", rir: "", done: false });
  const mkItem = (exId, n) => ({ uid: L.uid("i"), exId, sets: Array.from({ length: Math.max(1, Math.min(10, n || 3)) }, newSet) });
  async function startWorkout(src) {
    const cur = activeW();
    if (cur) {
      const v = await dialog({ title: T("logger.dialog.inProgress.title"), body: T("logger.dialog.inProgress.body", { name: cur.name, time: timeLabel(cur.startedAt), sets: count("common.count.tickedSets", L.doneSets(cur)) }),
        actions: [{ label: T("logger.dialog.inProgress.resume"), kind: "primary", value: "resume" }, { label: T("logger.dialog.inProgress.new"), kind: "danger", value: "new" }, { label: T("common.cancel"), value: null }] });
      if (v === "resume") return go("#/workout");
      if (v !== "new") return;
    }
    let w;
    if (!src) w = { id: L.uid("w"), name: T("logger.defaultName"), startedAt: new Date().toISOString(), source: null, items: [], changes: { add: 0, remove: 0, reorder: 0 } };
    else {
      const split = getSplit(src.splitId), day = split && split.days[src.dayIndex];
      if (!day) return toast(T("logger.dayGone"));
      w = { id: L.uid("w"), name: day.name, startedAt: new Date().toISOString(), source: { splitId: split.id, splitName: split.name, dayIndex: src.dayIndex, dayId: day.id || null },
        items: day.exercises.map((it) => mkItem(it.exId, it.sets)), changes: { add: 0, remove: 0, reorder: 0 } };
    }
    saveActive(w); closeSheet(); go("#/workout");
  }
  const editablePlan = (w) => w && w.source && (w.source.splitId === "rec" || mySplits().some((s) => s.id === w.source.splitId));
  // Copy the recommended split into "My splits" so it can be edited (first "Update plan" on the recommended plan).
  function ensureEditable(splitId) {
    if (splitId !== "rec") return mySplits().find((s) => s.id === splitId);
    const rec = getSplit("rec"), sp = mySplits();
    const copy = { id: L.uid("s"), name: T("split.myVersion", { name: rec.name }), source: { type: "recommended", splitKey: rec.source.splitKey }, updatedAt: new Date().toISOString(),
      days: rec.days.map((d, i) => ({ id: L.uid("d"), name: d.name, exercises: d.exercises.map((x) => ({ exId: x.exId, sets: x.sets })) })) };
    sp.push(copy); saveSplits(sp);
    const p = profile(); p.activeSplitId = copy.id; setProfile(p);
    const pr = progress(); pr[copy.id] = pr.rec || 0; LS.set("splitProgress", pr);
    const w = activeW(); if (w && w.source && w.source.splitId === "rec") { w.source.splitId = copy.id; w.source.splitName = copy.name; saveActive(w); }
    toast(T("split.savedAs", { name: copy.name }));
    return copy;
  }
  function updatePlanDay(w, fn) {
    const sp = ensureEditable(w.source.splitId); if (!sp) return;
    const all = mySplits(), s = all.find((x) => x.id === sp.id), d = s && s.days[w.source.dayIndex];
    if (!d) return; fn(d); s.updatedAt = new Date().toISOString(); saveSplits(all);
  }
  function finishSave(w) {
    const end = new Date();
    const items = w.items.map((it) => ({ exId: it.exId, sets: it.sets.filter((s) => s.done).map((s) => ({ kg: String(s.kg).trim(), reps: String(s.reps).trim(), rir: String(s.rir).trim(), done: true })) })).filter((it) => it.sets.length);
    const rec = { id: w.id, name: w.name, date: end.toISOString(), startedAt: w.startedAt, durationMin: Math.max(1, Math.round((end - new Date(w.startedAt)) / 60000)), source: w.source, items };
    const h = history(); h.push(rec); saveHistory(h);
    if (w.source) { const pr = progress(); const split = getSplit(w.source.splitId); if (split) { pr[split.id] = (w.source.dayIndex + 1) % split.days.length; LS.set("splitProgress", pr); } }
    saveActive(null); stopRest();
    go("#/summary/" + rec.id);
  }
  async function finishWorkout() {
    const w = activeW(); if (!w) return;
    flushInputs();
    if (!L.doneSets(w)) {
      const v = await dialog({ title: T("logger.dialog.noSets.title"), body: T("logger.dialog.noSets.body"), actions: [{ label: T("logger.keepGoing"), kind: "primary", value: "keep" }, { label: T("logger.discardWorkout"), kind: "danger", value: "discard" }] });
      if (v === "discard") return discardWorkout(true);
      return;
    }
    const open = w.items.reduce((n, it) => n + it.sets.filter((s) => !s.done).length, 0);
    if (open) {
      const v = await dialog({ title: count("logger.dialog.unticked.title", open), body: T("logger.dialog.unticked.body"), actions: [{ label: T("logger.keepGoing"), value: null }, { label: T("logger.finishWorkout"), kind: "primary", value: "finish" }] });
      if (v !== "finish") return;
    }
    const c = w.changes || {};
    if (editablePlan(w) && (c.add || c.remove || c.reorder)) {
      const parts = [c.add && count("logger.change.added", c.add), c.remove && count("logger.change.removed", c.remove), c.reorder && T("logger.change.reordered")].filter(Boolean);
      const v = await dialog({ title: T("logger.dialog.updatePlan.title", { name: w.name }), body: T("logger.dialog.updatePlan.body", { changes: I.list(parts) }),
        actions: [{ label: T("logger.dialog.updatePlan.keep"), value: "keep" }, { label: T("logger.dialog.updatePlan.update"), kind: "primary", value: "update" }] });
      if (v === null) return;
      if (v === "update") updatePlanDay(activeW(), (d) => { d.exercises = activeW().items.map((it) => ({ exId: it.exId, sets: it.sets.length })); });
    }
    finishSave(activeW());
  }
  async function discardWorkout(skipAsk) {
    const w = activeW(); if (!w) return;
    if (!skipAsk) {
      const v = await dialog({ title: T("logger.dialog.discard.title"), body: T("logger.dialog.discard.body", { sets: count("common.count.tickedSets", L.doneSets(w)) }), actions: [{ label: T("logger.dialog.discard.keep"), kind: "primary", value: null }, { label: T("logger.dialog.discard.confirm"), kind: "danger", value: "discard" }] });
      if (v !== "discard") return;
    }
    saveActive(null); stopRest(); go("#/home"); toast(T("logger.discarded"));
  }

  // ---------- rest timer (persisted: survives refresh) ----------
  function startRest(sec, uid) { const w = activeW(); if (!w) return; w.rest = { endsAt: Date.now() + sec * 1000, total: sec, uid }; saveActive(w); drawRest(); }
  function stopRest() { const w = activeW(); if (w && w.rest) { delete w.rest; saveActive(w); } restbar.hidden = true; restbar.innerHTML = ""; document.body.classList.remove("has-rest"); }
  function drawRest() {
    const w = activeW(), onWorkout = route().name === "workout";
    if (!w || !w.rest || !onWorkout) { restbar.hidden = true; document.body.classList.remove("has-rest"); return; }
    const left = (w.rest.endsAt - Date.now()) / 1000;
    if (left <= -4) return stopRest();
    const pct = Math.max(0, Math.min(100, 100 * left / w.rest.total));
    if (!restbar.firstChild || !$("[data-rest-left]", restbar)) {
      restbar.innerHTML = `<div class="rest-track"><i data-rest-pct></i></div><div class="rest-row">${icon("timer")}<span class="rest-label"><span data-rest-label>${TE("logger.rest.label")}</span> <b class="num" data-rest-left></b></span>
        <button type="button" class="btn-sm" data-act="rest-minus" aria-label="${TE("logger.rest.less")}">−15</button><button type="button" class="btn-sm" data-act="rest-plus" aria-label="${TE("logger.rest.more")}">+15</button><button type="button" class="btn-sm" data-act="rest-skip">${TE("logger.rest.skip")}</button></div>`;
    }
    $("[data-rest-left]", restbar).textContent = left > 0 ? mmss(left) : T("logger.rest.done");
    $("[data-rest-pct]", restbar).style.width = pct + "%";
    restbar.classList.toggle("over", left <= 0);
    restbar.hidden = false; document.body.classList.add("has-rest");
  }
  setInterval(() => {
    drawRest();
    const w = activeW();
    if (w) $$("[data-elapsed]").forEach((el) => (el.textContent = mmss((Date.now() - new Date(w.startedAt)) / 1000)));
  }, 1000);

  // ---------- workout logger ----------
  const errs = {};   // uid:setIndex -> {kg, reps, rir} validation messages (UI only)
  const isBW = (exId) => { const e = X(exId); return !e.equip || !e.equip.length || e.equip.includes("bw"); };
  function placeholderFor(it, i, sug, prev) {
    // kgKind: "bw" / "ask" / "value" so tickSet never compares translated placeholder text.
    const r = rxFor(it.exId), rr = L.range(r.reps), BW = T("logger.bwShort");
    const p = prev[i] || prev[prev.length - 1];
    const kgKind = sug ? (sug.kg ? "value" : "bw") : p ? (L.num(p.kg) ? "value" : "bw") : isBW(it.exId) ? "bw" : "ask";
    return { kgKind,
      kg: sug ? (sug.kg || BW) : p ? (L.num(p.kg) ? L.fmtKg(L.num(p.kg)) : BW) : kgKind === "bw" ? BW : T("logger.kgUnit"),
      reps: sug ? sug.reps : p ? String(p.reps) : rr ? String(rr[0]) : "",
      rir: r.rir
    };
  }
  function exerciseBlock(it, idx, w) {
    const e = X(it.exId), r = rxFor(it.exId), prev = lastSetsFor(it.exId), sug = L.suggestion(it.exId, prev, r);
    const done = it.sets.filter((s) => s.done).length;
    const rows = it.sets.map((s, i) => {
      const ph = placeholderFor(it, i, sug, prev), er = errs[it.uid + ":" + i] || {}, p = prev[i];
      const inp = (f, mode, label) => `<input class="cell-in num${er[f] ? " bad" : ""}" data-f="${f}" data-uid="${esc(it.uid)}" data-i="${i}" inputmode="${mode}" enterkeyhint="next" autocomplete="off"
        value="${esc(s[f])}" placeholder="${esc(ph[f])}" aria-label="${TE("logger.cellLabel", { n: i + 1, field: label })}" ${er[f] ? `aria-invalid="true" aria-describedby="er-${esc(it.uid)}-${i}"` : ""} ${s.done ? "readonly" : ""}>`;
      return `<tr class="${s.done ? "done" : ""}"><td class="c-set num">${i + 1}</td><td class="c-prev num">${p ? `${kgTxt(p.kg)} × ${esc(p.reps)}` : "–"}</td>
        <td>${inp("kg", "decimal", T("logger.field.kg"))}</td><td>${inp("reps", "numeric", T("logger.field.reps"))}</td><td>${inp("rir", "decimal", T("logger.field.rir"))}</td>
        <td class="c-tick"><button type="button" class="tick" data-act="tick" data-uid="${esc(it.uid)}" data-i="${i}" aria-pressed="${s.done}" aria-label="${TE(s.done ? "logger.untickSet" : "logger.completeSet", { n: i + 1 })}">${icon("check")}</button></td></tr>
        ${Object.keys(er).length ? `<tr class="err-row"><td colspan="6" id="er-${esc(it.uid)}-${i}">${Object.values(er).map((m) => `<span class="err-msg">${esc(m)}</span>`).join(" ")}</td></tr>` : ""}`;
    }).join("");
    return `<section class="exb" data-uid="${esc(it.uid)}" aria-label="${esc(e.name)}">
      <div class="exb-head">${miniMap(e)}<div class="exb-title"><a class="exname" href="#/exercise/${esc(it.exId)}">${esc(e.name)}</a>
        <div class="rxline num"><span>${TE("logger.rxLine", { sets: it.sets.length, reps: r.reps, rir: r.rir, rest: minutes(r.rest) })}</span><button type="button" class="why" data-act="rx" data-ex="${esc(it.exId)}" aria-label="${TE("logger.whyRx", { name: e.name })}">${TE("common.why")}</button></div></div>
        <span class="exb-count num" aria-label="${TE("logger.setsDoneLabel", { done, total: it.sets.length })}">${done}/${it.sets.length}</span>
        <button type="button" class="iconbtn" data-act="ex-menu" data-uid="${esc(it.uid)}" aria-label="${TE("logger.moreFor", { name: e.name })}">${icon("ellipsis-vertical")}</button></div>
      ${sug ? `<div class="sugg">${icon(sug.hold ? "minus" : "trending-up")}<div><b class="num">${TE(sug.hold ? "logger.hold" : "logger.next", { target: sug.target })}</b><span>${esc(sug.reason)}</span></div>${why("progression.suggestion")}</div>`
        : e.missing ? `<p class="hint">${TE("logger.deletedHint")}</p>` : `<p class="hint">${TE("logger.firstTime", { reps: r.reps, rir: r.rir })}</p>`}
      <table class="sets"><thead><tr><th scope="col">${TE("logger.col.set")}</th><th scope="col">${TE("logger.col.previous")}</th><th scope="col">${TE("logger.col.kg")}</th><th scope="col">${TE("logger.col.reps")}</th><th scope="col">${TE("logger.col.rir")}</th><th scope="col"><span class="vh">${TE("logger.col.done")}</span></th></tr></thead><tbody>${rows}</tbody></table>
      <div class="exb-foot"><button type="button" class="btn-text" data-act="add-set" data-uid="${esc(it.uid)}">${icon("plus")}${TE("logger.addSet")}</button>
        ${it.sets.length > 1 && !it.sets[it.sets.length - 1].done ? `<button type="button" class="btn-text quiet" data-act="del-set" data-uid="${esc(it.uid)}">${icon("minus")}${TE("logger.removeSet")}</button>` : ""}</div>
    </section>`;
  }
  function S_workout() {
    const w = activeW();
    if (!w) return `${topbar(back("#/train"), TE("logger.title"))}<div class="empty"><h2>${TE("logger.none.title")}</h2><p>${TE("logger.none.body")}</p><a class="btn btn-primary" href="#/train">${TE("logger.none.start")}</a></div>`;
    const ds = L.doneSets(w), hs = L.hardSets(w);
    // Stat labels sit after a <b> number; each is its own key so word order stays with the number ({n} is styled separately).
    return `${topbar(`<a class="iconbtn" href="#/home" aria-label="${TE("logger.minimise")}">${icon("chevron-down")}</a>`, `<span class="tb-name">${esc(w.name)}</span>`, `<button type="button" class="btn btn-primary btn-sm-h" data-act="finish">${TE("logger.finish")}</button>`)}
      <div class="wstats num" aria-live="off"><span><b data-elapsed>${mmss((Date.now() - new Date(w.startedAt)) / 1000)}</b> ${TE("logger.stat.elapsed")}</span><span><b data-stat="done">${ds}</b> ${TE("logger.stat.sets")}</span><span><b data-stat="hard">${hs}</b> ${TE("logger.stat.hard")}</span>
        ${w.source ? `<span class="wsrc">${esc(w.source.splitName)}</span>` : `<span class="wsrc">${TE("logger.empty.title")}</span>`}</div>
      ${w.items.length ? w.items.map((it, i) => exerciseBlock(it, i, w)).join("") : `<div class="empty"><h2>${TE("logger.empty.title")}</h2><p>${TE("logger.empty.body", { rir: D.rules.hardSetMaxRIR })}</p></div>`}
      <div class="wfoot"><button type="button" class="btn btn-secondary" data-act="add-ex">${icon("plus")}${TE("logger.addExercise")}</button>
        <button type="button" class="btn-text danger" data-act="discard">${icon("trash-2")}${TE("logger.discardWorkout")}</button></div>`;
  }
  // Read every input into state (inputs save on each keystroke too; this is a safety net before ticks and finish).
  function flushInputs() {
    const w = activeW(); if (!w) return;
    $$(".cell-in", screen).forEach((el) => { const it = w.items.find((x) => x.uid === el.dataset.uid); if (it && it.sets[+el.dataset.i] && !it.sets[+el.dataset.i].done) it.sets[+el.dataset.i][el.dataset.f] = el.value; });
    saveActive(w);
  }
  function rerender() { const st = screen.scrollTop, ae = document.activeElement, key = ae && ae.dataset && ae.dataset.uid ? [ae.dataset.uid, ae.dataset.i, ae.dataset.f, ae.dataset.act] : null;
    render(true); screen.scrollTop = st;
    if (key) { const el = $(`[data-uid="${cssq(key[0])}"]${key[1] != null ? `[data-i="${cssq(key[1])}"]` : ""}${key[2] ? `[data-f="${cssq(key[2])}"]` : key[3] ? `[data-act="${cssq(key[3])}"]` : ""}`, screen); if (el) el.focus({ preventScroll: true }); } }
  function updateStats() { const w = activeW(); if (!w) return; const a = $("[data-stat=done]"), b = $("[data-stat=hard]"); if (a) a.textContent = L.doneSets(w); if (b) b.textContent = L.hardSets(w); }

  function tickSet(uid, i) {
    flushInputs();
    const w = activeW(), it = w.items.find((x) => x.uid === uid); if (!it) return;
    const s = it.sets[i];
    if (s.done) { s.done = false; saveActive(w); rerender(); updateStats(); return; }
    // Blank fields fill from the shown placeholder (last session / suggestion). Blank kg with no history = bodyweight.
    const prev = lastSetsFor(it.exId), sug = L.suggestion(it.exId, prev, rxFor(it.exId)), ph = placeholderFor(it, i, sug, prev);
    const filled = { kg: String(s.kg).trim() === "" ? (ph.kgKind === "value" ? ph.kg : "") : String(s.kg).trim(), reps: String(s.reps).trim() === "" ? ph.reps : String(s.reps).trim(), rir: String(s.rir).trim() };
    const er = L.validateSet(filled);
    // A loaded exercise with no weight and no history: ask, rather than silently logging bodyweight. 0 = bodyweight on purpose.
    if (!er.kg && filled.kg === "" && ph.kgKind === "ask") er.kg = T("logger.error.kgNeeded");
    if (Object.keys(er).length) { errs[uid + ":" + i] = er; saveActive(w); rerender(); const bad = $(`.cell-in.bad[data-uid="${cssq(uid)}"][data-i="${cssq(i)}"]`, screen); if (bad) bad.focus(); return; }
    delete errs[uid + ":" + i];
    Object.assign(s, filled, { kg: filled.kg.replace(",", "."), rir: filled.rir.replace(",", "."), done: true });
    saveActive(w);
    startRest(rxFor(it.exId).restSec, uid);
    rerender(); updateStats();
  }
  function exMenu(uid) {
    const w = activeW(), idx = w.items.findIndex((x) => x.uid === uid), it = w.items[idx], e = X(it.exId);
    openSheet(() => `<h2 id="sheet-title">${esc(e.name)}</h2><div class="menu">
      <button type="button" class="menu-row" data-act="m-swap" data-uid="${esc(uid)}">${icon("repeat")}<span>${TE("workout.menu.replace")}</span></button>
      <button type="button" class="menu-row" data-act="m-up" data-uid="${esc(uid)}" ${idx === 0 ? "disabled" : ""}>${icon("arrow-up")}<span>${TE("workout.menu.up")}</span></button>
      <button type="button" class="menu-row" data-act="m-down" data-uid="${esc(uid)}" ${idx === w.items.length - 1 ? "disabled" : ""}>${icon("arrow-down")}<span>${TE("workout.menu.down")}</span></button>
      <a class="menu-row" href="#/exercise/${esc(it.exId)}" data-close>${icon("info")}<span>${TE("workout.menu.details")}</span></a>
      <button type="button" class="menu-row danger" data-act="m-remove" data-uid="${esc(uid)}">${icon("trash-2")}<span>${TE("workout.menu.remove")}</span></button></div>`);
  }
  function moveItem(uid, d) {
    const w = activeW(), i = w.items.findIndex((x) => x.uid === uid), j = i + d;
    if (i < 0 || j < 0 || j >= w.items.length) return;
    [w.items[i], w.items[j]] = [w.items[j], w.items[i]]; w.changes.reorder = (w.changes.reorder || 0) + 1; saveActive(w);
    closeSheet(); rerender();
    const el = $(`.exb[data-uid="${cssq(uid)}"]`, screen); if (el) el.scrollIntoView({ block: "nearest" });
  }
  function removeItem(uid) {
    flushInputs();
    const w = activeW(), i = w.items.findIndex((x) => x.uid === uid); if (i < 0) return;
    const [it] = w.items.splice(i, 1); w.changes.remove = (w.changes.remove || 0) + 1;
    if (w.rest && w.rest.uid === uid) delete w.rest;
    saveActive(w); closeSheet(); rerender(); updateStats();
    toast(T("workout.removed", { name: X(it.exId).name }), { label: T("common.undo"), fn: () => { const w2 = activeW(); if (!w2) return; w2.items.splice(Math.min(i, w2.items.length), 0, it); w2.changes.remove = Math.max(0, w2.changes.remove - 1); saveActive(w2); rerender(); updateStats(); } });
  }

  // ---------- replace: best match first, then "Just today" / "Update plan" ----------
  function swapHTML(uid) {
    const w = activeW(), it = w && w.items.find((x) => x.uid === uid); if (!it) return `<p>${TE("exercise.notFound")}</p>`;
    const e = X(it.exId), inW = w.items.map((x) => x.exId);
    const cands = L.swapCandidates(it.exId, profile(), customs(), inW).slice(0, 8);
    const row = (c, best) => `<button type="button" class="pick-row${best ? " best" : ""}" data-act="swap-pick" data-uid="${esc(uid)}" data-ex="${esc(c.id)}">${miniMap(c.ex)}<span class="pr-main"><span class="pr-name">${esc(X(c.id).name)}${c.ex.custom ? ` <span class="tag">${TE("exercise.tagCustom")}</span>` : ""}</span>
      <span class="pr-sub">${esc(c.reasons.join(" · "))}</span></span>${icon("chevron-right", "chev")}</button>`;
    return `<h2 id="sheet-title">${TE("swap.title", { name: e.name })}</h2>
      <p class="sheet-sub muted">${TE("swap.ranked", { muscle: e.primary[0] ? ML(e.primary[0]) : T("swap.noMuscle") })} ${why("swap.similar")}</p>
      ${cands.length ? `<h3 class="sec">${TE("swap.bestMatch")}</h3>${row(cands[0], true)}${cands.length > 1 ? `<h3 class="sec">${TE("swap.otherOptions")}</h3>${cands.slice(1).map((c) => row(c)).join("")}` : ""}`
        : `<p class="empty-inline">${TE("swap.noAlternatives", { muscle: e.primary[0] ? ML(e.primary[0]) : T("swap.thisMuscle") })}</p>`}
      <button type="button" class="btn btn-quiet" data-act="swap-search" data-uid="${esc(uid)}">${icon("search")}${TE("swap.searchAll")}</button>`;
  }
  function swapConfirmHTML(uid, newId) {
    const w = activeW(), it = w.items.find((x) => x.uid === uid), a = X(it.exId), b = X(newId), doneN = it.sets.filter((s) => s.done).length;
    return `<h2 id="sheet-title">${TE("swap.to", { name: b.name })}</h2>
      <p class="sheet-sub">${doneN ? TE("swap.loggedStay", { sets: count("common.plural.loggedSet", doneN), old: a.name, new: b.name }) : TE("swap.replaces", { new: b.name, old: a.name })} ${TE("swap.restartSuggestions")}</p>
      ${editablePlan(w) ? `<div class="choice"><button type="button" class="btn btn-secondary" data-act="swap-apply" data-uid="${esc(uid)}" data-ex="${esc(newId)}" data-plan="0">${TE("swap.justToday")}</button>
        <button type="button" class="btn btn-primary" data-act="swap-apply" data-uid="${esc(uid)}" data-ex="${esc(newId)}" data-plan="1">${TE("swap.updatePlanToo")}</button></div>
        <p class="fine">${TE("swap.updatePlanNote", { day: w.name, plan: w.source.splitName, copyNote: w.source.splitId === "rec" ? T("swap.copyNote") : "" })}</p>`
        : `<button type="button" class="btn btn-primary" data-act="swap-apply" data-uid="${esc(uid)}" data-ex="${esc(newId)}" data-plan="0">${TE("swap.forThisWorkout")}</button>`}`;
  }
  function applySwap(uid, newId, toPlan) {
    flushInputs();
    const w = activeW(), i = w.items.findIndex((x) => x.uid === uid); if (i < 0) return;
    const it = w.items[i], oldId = it.exId, doneSets = it.sets.filter((s) => s.done), openN = it.sets.length - doneSets.length;
    const fresh = mkItem(newId, Math.max(1, openN || it.sets.length)); fresh.swappedFrom = oldId;
    if (doneSets.length) { it.sets = doneSets; w.items.splice(i + 1, 0, fresh); } else w.items[i] = fresh;
    Object.keys(errs).filter((k) => k.startsWith(uid + ":")).forEach((k) => delete errs[k]);
    saveActive(w);
    if (toPlan) updatePlanDay(w, (d) => { const k = d.exercises.findIndex((x) => x.exId === oldId); if (k >= 0) d.exercises[k].exId = newId; else d.exercises.push({ exId: newId, sets: fresh.sets.length }); });
    closeSheet(); rerender(); updateStats();
    if (!toPlan || w.source.splitId !== "rec") toast(T("swap.swappedTo", { name: X(newId).name, suffix: toPlan ? T("swap.planUpdated") : "" }));
  }

  // ---------- exercise picker (workout add, builder add, replace search) ----------
  let pickQ = "", pickM = "";
  function pickerHTML(ctx) {
    const c = customs(), ids = Object.keys(D.exercises).concat(Object.keys(c).filter((k) => !c[k].archived));
    const w = activeW(), inUse = ctx.kind === "builder" ? [] : (w ? w.items.map((x) => x.exId) : []);
    const q = lc(pickQ.trim());
    // Search matches the shown (translated) names and muscle names, plus the English ones so either works.
    const list = ids.map((id) => X(id)).filter((e) => (!q || lc(e.name).includes(q) || e.primary.some((m) => ML(m).includes(q) || lc(m).includes(q))) && (!pickM || e.primary.includes(pickM)))
      .sort((a, b) => a.name.localeCompare(b.name, I.locale()));
    const muscles = D.trackedMuscles.concat(D.extraMuscles);
    return `<h2 id="sheet-title">${TE(ctx.kind === "replace" ? "picker.replaceWith" : "logger.addExercise")}</h2>
      <div class="search">${icon("search")}<input type="search" data-pick-q value="${esc(pickQ)}" placeholder="${TE("picker.searchPlaceholder")}" aria-label="${TE("picker.searchLabel")}"></div>
      <label class="selectrow"><span>${TE("picker.muscle")}</span><select data-pick-m aria-label="${TE("picker.filterLabel")}"><option value="">${TE("picker.allMuscles")}</option>${muscles.map((m) => `<option value="${esc(m)}" ${m === pickM ? "selected" : ""}>${esc(M(m))}</option>`).join("")}</select></label>
      <button type="button" class="pick-row create" data-act="new-custom" data-ctx='${esc(JSON.stringify(ctx))}'>${icon("plus")}<span class="pr-main"><span class="pr-name">${TE("picker.createCustom")}</span><span class="pr-sub">${TE("picker.createCustomSub")}</span></span></button>
      <div class="pick-list" data-pick-list>${list.length ? list.map((e) => {
        const used = inUse.includes(e.id);
        return `<button type="button" class="pick-row" data-act="pick" data-ex="${esc(e.id)}" data-ctx='${esc(JSON.stringify(ctx))}' ${used ? "disabled" : ""}>${miniMap(e)}<span class="pr-main"><span class="pr-name">${esc(e.name)}${e.custom ? ` <span class="tag">${TE("exercise.tagCustom")}</span>` : ""}</span>
          <span class="pr-sub">${esc(mjoin(e.primary))}${used ? " · " + TE("picker.alreadyIn") : ""}</span></span></button>`; }).join("")
        : `<p class="empty-inline">${TE("picker.noMatch", { q: pickQ })}</p>`}</div>`;
  }
  function openPicker(ctx) {
    pickQ = ""; pickM = "";
    openSheet(() => pickerHTML(ctx), { tall: true });
  }
  function pickExercise(id, ctx) {
    if (ctx.kind === "workout") {
      flushInputs(); const w = activeW(); if (!w) return;
      w.items.push(mkItem(id, D.prescription.sets[(profile() || DEFAULT_PROFILE).experience])); w.changes.add = (w.changes.add || 0) + 1; saveActive(w);
      closeSheet(); rerender(); const last = $$(".exb", screen).pop(); if (last) last.scrollIntoView({ block: "center" });
      toast(T("picker.added", { name: X(id).name }));
    } else if (ctx.kind === "replace") { sheetStack.length = 0; openSheet(() => swapConfirmHTML(ctx.uid, id)); }
    else if (ctx.kind === "builder") { const d = draft(); if (!d || !d.days[ctx.day]) return; d.days[ctx.day].exercises.push({ exId: id, sets: D.prescription.sets[(profile() || DEFAULT_PROFILE).experience] }); saveDraft(d); closeSheet(); render(true); toast(T("picker.addedTo", { name: X(id).name, day: d.days[ctx.day].name || T("common.dayN", { n: ctx.day + 1 }) })); }
  }

  // ---------- onboarding + split reveal ----------
  let ob = null;
  function S_onboarding() {
    ob = ob || Object.assign({}, profile() || DEFAULT_PROFILE);
    const O = D.options, isEdit = !!profile();
    // Onboarding Why? chips stay hidden until their evidence is QA-approved (qa-report.md step 3, problem 1).
    // Option labels: onboarding.goal.<id>, onboarding.experience.<id>, common.equipment.<id> (+ ".sub"); session length = common.minutes.
    const L1 = { goal: (o) => [T("onboarding.goal." + o.id), T("onboarding.goal." + o.id + ".sub")], experience: (o) => [T("onboarding.experience." + o.id), T("onboarding.experience." + o.id + ".sub")],
      equipment: (o) => [T("common.equipment." + o.id), T("common.equipment." + o.id + ".sub")], sessionLength: (o) => [minutes(o.id), ""], days: (o) => [String(o.id), ""] };
    const q = (key, whyKey, opts) => `<fieldset class="q"><legend><span>${TE("onboarding." + key + ".title")}</span>${own(EV, whyKey) && EV[whyKey].status === "evidence" ? why(whyKey) : ""}</legend><div class="opts${opts.length > 3 ? " opts-row" : ""}">${opts.map((o) => { const [l, s] = L1[key](o);
      return `<button type="button" class="opt" data-ob="${esc(key)}" data-v="${esc(o.id)}" aria-pressed="${String(ob[key]) === String(o.id)}"><span class="opt-l num">${esc(l)}</span>${s ? `<span class="opt-s">${esc(s)}</span>` : ""}</button>`; }).join("")}</div></fieldset>`;
    return `${isEdit ? topbar(back("#/you"), TE("onboarding.answersTitle")) : ""}
      ${largeTitle(isEdit ? TE("onboarding.changeTitle") : TE("onboarding.setUp", { app: APP }), TE("onboarding.intro"))}
      ${q("goal", "onboarding.goal", O.goal)}
      ${q("experience", "onboarding.experience", O.experience)}
      ${q("days", "onboarding.days", O.days.map((d) => ({ id: d })))}
      ${q("sessionLength", "onboarding.session_length", O.sessionLength)}
      ${q("equipment", "onboarding.equipment", O.equipment)}
      <div class="sticky-cta"><button type="button" class="btn btn-primary btn-block" data-act="ob-done">${TE("onboarding.seeSplit")}</button></div>`;
  }
  function S_split() {
    const p = profile(); if (!p) return go("#/onboarding", true);
    const rec = L.recommended(p), key = rec.source.splitKey, pm = L.planMuscles(rec, customs());
    const uniq = [...new Set([String(p.days)].concat((D.alternatives[p.days] || []).map(String)))].filter((k) => k !== String(key) && own(D.splits, k));
    const lead = own(EV, rec.whyKey) ? (EV[rec.whyKey].status === "evidence" ? `<span lang="en" data-ev>${md(EV[rec.whyKey].oneLiner)}</span>` : TE("common.pendingApproval")) : "";
    return `${topbar(back("#/onboarding", T("split.backToQuestions")), "")}
      ${largeTitle(esc(rec.name), TE("split.recommendedFor", { days: count("common.plural.day", rec.days.length), equipment: lc(T("common.equipment." + p.equipment)) }))}
      <div class="lead"><p>${lead}</p>${why(rec.whyKey)}</div>
      <h2 class="sec">${TE("split.sessions")}</h2>
      <ol class="rows">${rec.days.map((d) => `<li class="row"><span class="row-wd">${esc(weekdayShort(d.weekday))}</span><span class="row-main"><span class="row-t">${esc(d.name)}</span><span class="row-s">${esc(count("common.plural.exercise", d.exercises.length))} · ${esc(mjoin(musclesOfDay(d).slice(0, 4), true))}${musclesOfDay(d).length > 4 ? "…" : ""}</span></span></li>`).join("")}</ol>
      <h2 class="sec sec-why"><span>${TE("split.plannedHardSets")}</span>${why("weekly.band")}</h2>
      <p class="fine">${TE("split.countingNote")}</p>
      <div class="grid2">${D.trackedMuscles.map((m) => `<div class="kv"><span>${esc(M(m))}</span><b class="num">${esc(L.fmtN(pm.weekly[m] || 0))}</b></div>`).join("")}</div>
      ${uniq.length ? `<h2 class="sec">${TE("split.otherFits")}</h2><div class="rows">${uniq.map((k) => `<button type="button" class="row row-btn" data-act="alt" data-k="${esc(k)}"><span class="row-main"><span class="row-t">${TE("split.name." + D.splits[k].id)}</span><span class="row-s">${esc(perDays(D.splits[k].sessions.length))}</span></span>${icon("chevron-right", "chev")}</button>`).join("")}</div>` : ""}
      <div class="sticky-cta"><button type="button" class="btn btn-primary btn-block" data-act="use-rec">${TE("split.useThisPlan")}</button></div>`;
  }

  // ---------- Today ----------
  function weekBlock(compact) {
    const r = L.weekRange(0), st = L.weekStats(history(), r.start, r.end, customs()), plan = activePlan();
    const rem = L.weeklyReminders(st, plan, customs(), { nextIndex: nextIndex(plan), max: compact ? 1 : 3 });
    return { st, rem, r };
  }
  const remHTML = (rs) => rs.length ? `<ul class="notes">${rs.map(note).join("")}</ul>` : "";
  function S_home() {
    const p = profile(), plan = activePlan(), w = activeW(), ni = nextIndex(plan), day = plan.days[ni];
    const { st, rem } = weekBlock(true), recent = history().slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    return `${largeTitle(TE("home.title"), esc(dfmt(new Date(), { weekday: "long", day: "numeric", month: "long" })), `<a class="iconbtn avatar" href="#/you" aria-label="${TE("home.youLabel")}">${icon("circle-user-round")}</a>`)}
      ${w ? `<a class="resume" href="#/workout">${icon("play")}<span class="row-main"><span class="row-t">${TE("home.resume", { name: w.name })}</span><span class="row-s num"><span data-elapsed>${mmss((Date.now() - new Date(w.startedAt)) / 1000)}</span> · ${esc(count("common.count.tickedSets", L.doneSets(w)))}</span></span>${icon("chevron-right", "chev")}</a>` : ""}
      <section class="card next">
        ${day ? `<h2 class="next-t">${esc(day.name)}</h2><p class="row-s">${TE("home.nextIn", { plan: plan.name, exercises: count("common.plural.exercise", day.exercises.length) })}</p><p class="row-s">${esc(cap(mjoin(musclesOfDay(day), true)))}</p>
          <button type="button" class="btn btn-primary btn-block" data-act="start-day" data-split="${esc(plan.id)}" data-day="${ni}">${icon("play")}${TE("home.start", { name: day.name })}</button>`
          : `<h2 class="next-t">${TE("home.noDays")}</h2><a class="btn btn-secondary btn-block" href="#/plan">${TE("home.openPlan")}</a>`}
        <button type="button" class="btn btn-quiet btn-block" data-act="start-empty">${icon("plus")}${TE("logger.empty.title")}</button>
      </section>
      <a class="sec sec-link" href="#/week"><span>${TE("home.thisWeek")}</span>${icon("chevron-right", "chev")}</a>
      <div class="stats3"><div><b class="num">${st.workouts.length}</b><span>${TE("home.workouts")}</span></div><div><b class="num">${st.hard}</b><span>${TE("summary.hardSets")}</span></div>
        <div><b class="num">${D.trackedMuscles.filter((m) => st.muscles[m] && st.muscles[m].sessions >= D.rules.frequencyTarget).length}<small>/${D.trackedMuscles.length}</small></b><span>${TE("home.musclesAt", { n: D.rules.frequencyTarget })}</span></div></div>
      ${remHTML(rem)}
      <h2 class="sec">${TE("home.recent")}</h2>
      ${recent.length ? `<div class="rows">${recent.map(histRow).join("")}</div>` : `<p class="empty-inline">${TE("home.emptyHistory")}</p>`}`;
  }
  const histRow = (h) => `<a class="row row-btn" href="#/summary/${esc(h.id)}"><span class="row-main"><span class="row-t">${esc(h.name)}</span><span class="row-s num">${TE("home.historyRow", { date: dayLabel(h.date), sets: count("common.plural.set", L.doneSets(h)), hard: L.hardSets(h) })}</span></span>${icon("chevron-right", "chev")}</a>`;

  // ---------- Workout tab: choose what to start ----------
  function dayRow(split, d, i, opts = {}) {
    const ms = musclesOfDay(d);
    return `<button type="button" class="row row-btn" data-act="start-day" data-split="${esc(split.id)}" data-day="${i}"><span class="row-main"><span class="row-t">${esc(d.name || T("common.dayN", { n: i + 1 }))}${opts.next ? ` <span class="tag tag-accent">${TE("plan.nextTag")}</span>` : ""}</span>
      <span class="row-s">${d.exercises.length ? `${esc(count("common.plural.exercise", d.exercises.length))} · ${esc(mjoin(ms.slice(0, 4), true))}${ms.length > 4 ? "…" : ""}` : TE("plan.noExercises")}</span></span>${icon("play", "chev")}</button>`;
  }
  function S_train() {
    if (activeW()) return go("#/workout", true);
    const tab = ui("trainTab") || "rec", plan = activePlan();
    const seg = [["rec", T("plan.tab.recommended")], ["mine", T("plan.tab.mine")], ["community", T("plan.tab.community")]];
    let body = "";
    if (tab === "rec") { const rec = getSplit("rec"), ni = plan.id === "rec" ? nextIndex(rec) : -1; body = `<p class="fine">${TE("plan.fromAnswers", { name: rec.name })}</p><div class="rows">${rec.days.map((d, i) => dayRow(rec, d, i, { next: i === ni })).join("")}</div>`; }
    if (tab === "mine") {
      const sp = mySplits();
      body = sp.length ? sp.map((s) => `<h3 class="sub">${esc(s.name)}${s.id === plan.id ? ` <span class="tag tag-accent">${TE("plan.active")}</span>` : ""}</h3><div class="rows">${s.days.map((d, i) => dayRow(s, d, i, { next: s.id === plan.id && i === nextIndex(s) })).join("") || `<p class="empty-inline">${TE("plan.noDaysYet")}</p>`}</div>`).join("")
        : `<div class="empty"><h2>${TE("plan.noOwnTitle")}</h2><p>${TE("plan.noOwnBody")}</p><a class="btn btn-secondary" href="#/builder/new">${icon("plus")}${TE("plan.newSplit")}</a></div>`;
    }
    if (tab === "community") body = `<p class="fine"><span class="tag">${TE("plan.sampleData")}</span> ${TE("plan.sampleNote")}</p><div class="rows">${D.communitySplits.map((c) => `<a class="row row-btn" href="#/community/${esc(c.id)}"><span class="row-main"><span class="row-t">${esc(c.name)}</span><span class="row-s">${TE("plan.communityMeta", { days: count("common.plural.day", c.days.length), author: c.author })}</span></span>${icon("chevron-right", "chev")}</a>`).join("")}</div>`;
    return `${largeTitle(TE("plan.startTitle"))}
      <div class="rows"><button type="button" class="row row-btn" data-act="start-empty"><span class="row-ic">${icon("plus")}</span><span class="row-main"><span class="row-t">${TE("logger.empty.title")}</span><span class="row-s">${TE("plan.addAsYouGo")}</span></span>${icon("chevron-right", "chev")}</button></div>
      <div class="seg" role="tablist" aria-label="${TE("plan.choose")}">${seg.map(([k, l]) => `<button type="button" role="tab" aria-selected="${k === tab}" data-act="train-tab" data-k="${esc(k)}">${esc(l)}</button>`).join("")}</div>
      ${body}`;
  }

  // ---------- Summary ----------
  function S_summary(id) {
    const h = history().find((x) => x.id === id);
    if (!h) return `${topbar(back("#/home"), TE("summary.title"))}<div class="empty"><h2>${TE("summary.notFound")}</h2><p>${TE("summary.maybeReset")}</p></div>`;
    const per = L.workoutMuscles(h, customs()), ms = Object.keys(per).filter((m) => per[m].sets > 0).sort((a, b) => per[b].sets - per[a].sets);
    const max = Math.max(1, ...ms.map((m) => per[m].sets));
    const r = L.weekRange(0), inThisWeek = new Date(h.date) >= r.start && new Date(h.date) < r.end;
    const sess = L.sessionReminders(h, customs());
    const wk = inThisWeek ? (() => { const st = L.weekStats(history(), r.start, r.end, customs()), plan = activePlan(); return L.weeklyReminders(st, plan, customs(), { nextIndex: nextIndex(plan), max: 2 }); })() : [];
    const nexts = h.items.map((it) => ({ e: X(it.exId), s: L.suggestion(it.exId, it.sets, rxFor(it.exId)) })).filter((x) => x.s);
    const vol = L.volumeKg(h);
    const RIR = D.rules.hardSetMaxRIR;   // the single hard-set threshold (data.js rules)
    return `${topbar(back("#/home", T("common.done")), "")}
      ${largeTitle(esc(h.name), esc(`${dfmt(h.date, { weekday: "long", day: "numeric", month: "long" })} · ${timeLabel(h.date)}`))}
      <div class="stats3"><div><b class="num">${esc(h.durationMin)}<small> ${TE("summary.min")}</small></b><span>${TE("summary.duration")}</span></div><div><b class="num">${L.doneSets(h)}</b><span>${TE("summary.sets")}</span></div><div><b class="num">${L.hardSets(h)}</b><span>${TE("summary.hardSets")}</span></div></div>
      ${remHTML(sess.concat(wk))}
      <h2 class="sec sec-why"><span>${TE("summary.hardByMuscle")}</span>${why("weekly.hard_sets")}</h2>
      ${ms.length ? `<div class="bars">${ms.map((m) => `<div class="bar"><span class="bar-l">${esc(M(m))}</span><span class="bar-t"><i data-w="${(100 * per[m].sets / max).toFixed(1)}" class="${per[m].direct ? "" : "ind"}"></i></span><b class="num">${esc(L.fmtN(per[m].sets))}</b></div>`).join("")}</div>
        <p class="fine">${TE("summary.helperNote", { rir: RIR })}</p>` : `<p class="empty-inline">${TE("summary.noneHard", { rir: RIR })}</p>`}
      ${nexts.length ? `<h2 class="sec sec-why"><span>${TE("summary.nextTime")}</span>${why("progression.suggestion")}</h2><div class="rows">${nexts.map(({ e, s }) => `<div class="row"><span class="row-main"><span class="row-t">${esc(e.name)}</span><span class="row-s">${esc(s.reason)}</span></span><b class="num row-v">${esc(s.target)}</b></div>`).join("")}</div>` : ""}
      <h2 class="sec">${TE("summary.logged")}</h2>
      <div class="rows">${h.items.map((it) => `<div class="row"><span class="row-main"><span class="row-t">${esc(X(it.exId).name)}</span><span class="row-s num">${it.sets.map((s) => esc(`${kgTxt(s.kg)}×${s.reps}${String(s.rir).trim() !== "" ? " @" + L.fmtN(L.num(s.rir)) : ""}`)).join("  ·  ")}</span></span></div>`).join("")}</div>
      ${vol ? `<p class="fine num">${TE("summary.totalLoad", { kg: new Intl.NumberFormat(I.locale(), { maximumFractionDigits: 0 }).format(Math.round(vol)) })}</p>` : ""}
      <div class="cta-pair"><a class="btn btn-secondary" href="#/week">${TE("summary.seeWeek")}</a><a class="btn btn-primary" href="#/home">${TE("common.done")}</a></div>`;
  }

  // ---------- Week ----------
  function S_week(off) {
    off = Math.min(0, parseInt(off || "0", 10) || 0);
    const r = L.weekRange(off), endIncl = new Date(r.end); endIncl.setDate(endIncl.getDate() - 1);
    const st = L.weekStats(history(), r.start, r.end, customs()), plan = activePlan();
    const rem = off === 0 ? L.weeklyReminders(st, plan, customs(), { nextIndex: nextIndex(plan), max: 3 }) : [];
    const max = Math.max(1, ...Object.values(st.muscles).map((v) => v.hard));
    const title = off === 0 ? T("home.thisWeek") : off === -1 ? T("week.lastWeek") : T("week.weeksAgo", { n: -off });
    const range = T("week.range", { from: dfmt(r.start, { day: "numeric", month: "short" }), to: dfmt(endIncl, { day: "numeric", month: "short", year: "numeric" }) });
    const extra = D.extraMuscles.filter((m) => st.muscles[m] && st.muscles[m].hard > 0);
    const RIR = D.rules.hardSetMaxRIR;
    return `${largeTitle(TE("week.title"))}
      <div class="weeknav"><a class="iconbtn" href="#/week/${off - 1}" aria-label="${TE("week.prev")}">${icon("chevron-left")}</a>
        <div class="wn-mid"><b>${esc(title)}</b><span class="num">${esc(range)}</span></div>
        ${off < 0 ? `<a class="iconbtn" href="#/week/${off + 1}" aria-label="${TE("week.next")}">${icon("chevron-right")}</a>` : `<span class="iconbtn" aria-hidden="true"></span>`}</div>
      ${st.workouts.length ? `
      <div class="stats3"><div><b class="num">${st.workouts.length}</b><span>${TE("home.workouts")}</span></div><div><b class="num">${st.hard}</b><span>${TE("summary.hardSets")}</span></div>
        <div><b class="num">${D.trackedMuscles.filter((m) => st.muscles[m] && st.muscles[m].sessions >= D.rules.frequencyTarget).length}<small>/${D.trackedMuscles.length}</small></b><span>${TE("home.musclesAt", { n: D.rules.frequencyTarget })}</span></div></div>
      ${remHTML(rem)}
      <h2 class="sec sec-why"><span>${TE("week.hardPerMuscle")}</span>${why("weekly.hard_sets")}</h2>
      <div class="bars">${D.trackedMuscles.map((m) => { const v = st.muscles[m] || { hard: 0, sessions: 0 };
        return `<div class="bar${v.hard ? "" : " zero"}"><span class="bar-l">${esc(M(m))}<small>${v.sessions ? esc(count("common.plural.session", v.sessions)) : v.hard ? TE("week.helperOnly") : "–"}</small></span><span class="bar-t"><i data-w="${(100 * v.hard / max).toFixed(1)}"></i></span><b class="num">${v.hard ? esc(L.fmtN(v.hard)) : "0"}</b></div>`; }).join("")}</div>
      ${extra.length ? `<p class="fine">${TE("week.alsoTrained", { muscles: extra.map((m) => T("common.muscleCount", { muscle: ML(m), n: L.fmtN(st.muscles[m].hard) })).join(T("common.listSep")) })}</p>` : ""}
      <p class="fine">${TE("week.countingNote", { rir: RIR })}</p>
      <h2 class="sec">${TE("week.workouts")}</h2><div class="rows">${st.workouts.slice().reverse().map(histRow).join("")}</div>`
      : `<div class="empty"><h2>${TE(off === 0 ? "week.emptyThis" : "week.emptyOther")}</h2><p>${off === 0 ? TE("week.emptyThisBody", { rir: RIR }) : TE("week.runsMonSun")}</p>
        ${off === 0 ? `<a class="btn btn-primary" href="#/train">${TE("logger.none.start")}</a>` : `<a class="btn btn-secondary" href="#/week">${TE("week.backToThis")}</a>`}</div>`}`;
  }

  // ---------- Plan ----------
  function S_plan() {
    const plan = activePlan(), sp = mySplits(), notes = L.analysePlan(plan, customs()).filter((n) => n.kind !== "empty" || plan.id !== "rec");
    const src = plan.id === "rec" ? T("plan.recFromAnswers") : plan.source && plan.source.type === "community" ? T("plan.copiedFrom", { name: plan.source.name || T("plan.aCommunitySplit") }) : plan.source && plan.source.type === "recommended" ? T("plan.yourCopy") : T("plan.builtByYou");
    const deload = own(EV, "deload.optional") ? (EV["deload.optional"].status === "evidence" ? `<span lang="en" data-ev>${md(EV["deload.optional"].oneLiner)}</span>` : TE("common.pendingApproval")) : "";
    return `${largeTitle(TE("plan.title"))}
      <section class="card">
        <h2 class="card-t">${esc(plan.name)}</h2><p class="row-s">${TE("plan.metaDays", { source: src, days: count("common.plural.day", plan.days.length) })}</p>
        <ol class="rows rows-flat">${plan.days.map((d, i) => `<li class="row"><span class="row-wd num">${i + 1}</span><span class="row-main"><span class="row-t">${esc(d.name || T("common.dayN", { n: i + 1 }))}${i === nextIndex(plan) ? ` <span class="tag tag-accent">${TE("plan.nextTag")}</span>` : ""}</span><span class="row-s">${esc(count("common.plural.exercise", d.exercises.length))}</span></span></li>`).join("")}</ol>
        <div class="cta-pair">${plan.id === "rec" ? `<button type="button" class="btn btn-secondary" data-act="customise-rec">${icon("pencil")}${TE("plan.customise")}</button><a class="btn btn-quiet" href="#/onboarding">${TE("plan.changeAnswers")}</a>`
          : `<a class="btn btn-secondary" href="#/builder/${esc(plan.id)}">${icon("pencil")}${TE("common.edit")}</a><button type="button" class="btn btn-quiet" data-act="use-split" data-id="rec">${TE("plan.useRecommended")}</button>`}</div>
      </section>
      ${notes.length ? `<h2 class="sec">${TE("plan.coachingNotes")}</h2><ul class="notes">${notes.map(note).join("")}</ul>` : ""}
      <h2 class="sec">${TE("plan.tab.mine")}</h2>
      ${sp.length ? `<div class="rows">${sp.map((s) => `<div class="row"><span class="row-main"><a class="row-t link" href="#/builder/${esc(s.id)}">${esc(s.name)}</a><span class="row-s">${esc(count("common.plural.day", s.days.length))}${s.id === plan.id ? TE("plan.activeSuffix") : ""}</span></span>
        ${s.id === plan.id ? `<span class="tag tag-accent">${TE("plan.active")}</span>` : `<button type="button" class="btn-sm" data-act="use-split" data-id="${esc(s.id)}">${TE("common.use")}</button>`}</div>`).join("")}</div>` : `<p class="empty-inline">${TE("plan.ownEmpty")}</p>`}
      <div class="cta-pair"><a class="btn btn-secondary" href="#/builder/new">${icon("plus")}${TE("plan.newSplit")}</a><a class="btn btn-quiet" href="#/community">${TE("plan.communitySplits")}</a></div>
      <div class="row deload"><span class="row-main"><span class="row-t">${TE("plan.deloadWeeks")}</span><span class="row-s">${deload}</span></span>${why("deload.optional")}</div>
      <p class="fine">${TE("plan.editNote")}</p>`;
  }
  function useSplit(id) { const p = profile(); p.activeSplitId = id; setProfile(p); render(true); toast(T("plan.activePlan", { name: getSplit(id).name })); }

  // ---------- Split builder (gentle notes, never blocks saving) ----------
  const draft = () => LS.get("builderDraft", null);
  const saveDraft = (d) => LS.set("builderDraft", d);
  function loadDraft(id) {
    const d = draft();
    if (d && d.forId === id) return d;
    let nd;
    if (id === "new") nd = { forId: "new", id: L.uid("s"), name: "", source: { type: "custom" }, days: [{ id: L.uid("d"), name: T("common.dayN", { n: 1 }), exercises: [] }], makeActive: true, dirty: false };
    else { const s = mySplits().find((x) => x.id === id); if (!s) return null; nd = Object.assign(JSON.parse(JSON.stringify(s)), { forId: id, dirty: false }); }
    saveDraft(nd); return nd;
  }
  function S_builder(id) {
    const d = loadDraft(id);
    if (!d) return `${topbar(back("#/plan"), TE("builder.split"))}<div class="empty"><h2>${TE("builder.notFound")}</h2><p>${TE("builder.maybeDeleted")}</p><a class="btn btn-secondary" href="#/plan">${TE("builder.backToPlan")}</a></div>`;
    const notes = L.analysePlan(d, customs()).filter((n) => n.kind !== "empty");
    return `${topbar(`<button type="button" class="iconbtn" data-act="b-cancel" aria-label="${TE("common.cancel")}">${icon("x")}</button>`, TE(id === "new" ? "plan.newSplit" : "builder.edit"), `<button type="button" class="btn btn-primary btn-sm-h" data-act="b-save">${TE("common.save")}</button>`)}
      <label class="field"><span>${TE("builder.name")}</span><input data-b="name" value="${esc(d.name)}" placeholder="${TE("builder.namePlaceholder")}" maxlength="60" autocomplete="off"></label>
      ${d.days.map((day, i) => `<section class="bday" aria-label="${esc(day.name || T("common.dayN", { n: i + 1 }))}">
        <div class="bday-head"><input class="bday-name" data-b="day" data-i="${i}" value="${esc(day.name)}" placeholder="${TE("common.dayN", { n: i + 1 })}" maxlength="40" aria-label="${TE("builder.dayName", { n: i + 1 })}">
          <button type="button" class="iconbtn" data-act="b-day-up" data-i="${i}" ${i === 0 ? "disabled" : ""} aria-label="${TE("builder.moveDayUp")}">${icon("arrow-up")}</button>
          <button type="button" class="iconbtn" data-act="b-day-del" data-i="${i}" aria-label="${TE("builder.remove", { name: day.name || T("builder.thisDay") })}">${icon("trash-2")}</button></div>
        ${day.exercises.length ? `<ul class="bex">${day.exercises.map((it, j) => { const e = X(it.exId); return `<li><span class="row-main"><span class="row-t">${esc(e.name)}${e.custom ? ` <span class="tag">${TE("exercise.tagCustom")}</span>` : ""}</span><span class="row-s">${esc(mjoin(e.primary))}</span></span>
          <span class="stepper" role="group" aria-label="${TE("logger.setsFor", { name: e.name })}"><button type="button" data-act="b-sets" data-i="${i}" data-j="${j}" data-d="-1" aria-label="${TE("logger.fewerSets")}" ${it.sets <= 1 ? "disabled" : ""}>${icon("minus")}</button><b class="num" aria-live="polite">${esc(it.sets)}</b><button type="button" data-act="b-sets" data-i="${i}" data-j="${j}" data-d="1" aria-label="${TE("logger.moreSets")}" ${it.sets >= 10 ? "disabled" : ""}>${icon("plus")}</button></span>
          <button type="button" class="iconbtn" data-act="b-ex-up" data-i="${i}" data-j="${j}" ${j === 0 ? "disabled" : ""} aria-label="${TE("builder.moveUp", { name: e.name })}">${icon("arrow-up")}</button>
          <button type="button" class="iconbtn" data-act="b-ex-del" data-i="${i}" data-j="${j}" aria-label="${TE("builder.remove", { name: e.name })}">${icon("x")}</button></li>`; }).join("")}</ul>` : `<p class="empty-inline">${TE("builder.noExercises")}</p>`}
        <button type="button" class="btn-text" data-act="b-add-ex" data-i="${i}">${icon("plus")}${TE("logger.addExercise")}</button></section>`).join("")}
      <button type="button" class="btn btn-secondary btn-block" data-act="b-add-day">${icon("plus")}${TE("builder.addDay")}</button>
      <h2 class="sec">${TE("plan.coachingNotes")}</h2>
      ${notes.length ? `<ul class="notes">${notes.map(note).join("")}</ul>` : `<p class="empty-inline">${TE("builder.nothingToFlag")}</p>`}
      <p class="fine">${TE("builder.notesHint")}</p>
      ${id === "new" ? `<label class="check"><input type="checkbox" data-b="active" ${d.makeActive ? "checked" : ""}><span>${TE("builder.useAsPlan")}</span></label>` : `<button type="button" class="btn-text danger" data-act="b-delete">${icon("trash-2")}${TE("builder.deleteSplit")}</button>`}`;
  }
  function bMutate(fn) { const d = draft(); fn(d); d.dirty = true; saveDraft(d); rerender(); }
  async function bSave() {
    const d = draft(); if (!d) return;
    const name = (d.name || "").trim() || T("builder.namePlaceholder");
    const clean = { id: d.id, name, source: d.source || { type: "custom" }, updatedAt: new Date().toISOString(), days: d.days.map((x, i) => ({ id: x.id || L.uid("d"), name: (x.name || "").trim() || T("common.dayN", { n: i + 1 }), exercises: x.exercises })) };
    const sp = mySplits(), k = sp.findIndex((s) => s.id === d.id);
    if (k >= 0) sp[k] = clean; else sp.push(clean);
    saveSplits(sp);
    if (d.forId === "new" && d.makeActive) { const p = profile(); p.activeSplitId = clean.id; setProfile(p); }
    const pr = progress(); if (pr[clean.id] >= clean.days.length) { pr[clean.id] = 0; LS.set("splitProgress", pr); }
    LS.del("builderDraft"); go("#/plan"); toast(T("builder.saved", { name }));
  }
  async function bCancel() {
    const d = draft();
    if (d && d.dirty) { const v = await dialog({ title: T("builder.discardTitle"), body: T("builder.discardBody"), actions: [{ label: T("builder.keepEditing"), kind: "primary", value: null }, { label: T("logger.dialog.discard.confirm"), kind: "danger", value: "x" }] }); if (!v) return; }
    LS.del("builderDraft"); go("#/plan");
  }
  async function bDelete() {
    const d = draft(); const v = await dialog({ title: T("builder.deleteTitle", { name: d.name || T("builder.thisSplit") }), body: T("builder.deleteBody"), actions: [{ label: T("common.cancel"), value: null }, { label: T("builder.deleteSplit"), kind: "danger", value: "x" }] });
    if (!v) return;
    saveSplits(mySplits().filter((s) => s.id !== d.id));
    const p = profile(); if (p.activeSplitId === d.id) { p.activeSplitId = "rec"; setProfile(p); }
    LS.del("builderDraft"); go("#/plan"); toast(T("builder.deleted"));
  }

  // ---------- Community (sample data) ----------
  function S_community(id) {
    const meta = (c) => T("plan.communityMeta", { days: count("common.plural.day", c.days.length), author: c.author });
    if (!id) return `${topbar(back("#/plan"), "")}${largeTitle(TE("plan.communitySplits"), `<span class="tag">${TE("plan.sampleData")}</span> ${TE("plan.sampleNote")}`)}
      <div class="rows">${D.communitySplits.map((c) => { const n = L.analysePlan(c, customs()).length; return `<a class="row row-btn" href="#/community/${esc(c.id)}"><span class="row-main"><span class="row-t">${esc(c.name)}</span><span class="row-s">${esc(meta(c))} · ${n ? esc(count("common.plural.coachingNote", n)) : TE("community.noNotes")}</span></span>${icon("chevron-right", "chev")}</a>`; }).join("")}</div>`;
    const c = D.communitySplits.find((x) => x.id === id);
    if (!c) return `${topbar(back("#/community"), "")}<div class="empty"><h2>${TE("community.notFound")}</h2></div>`;
    const notes = L.analysePlan(c, customs()), copies = mySplits().filter((s) => s.source && s.source.communityId === c.id).length;
    return `${topbar(back("#/community"), "")}
      ${largeTitle(esc(c.name), `<span class="tag">${TE("plan.sampleData")}</span> ${TE("community.meta", { author: c.author, days: count("common.plural.day", c.days.length) })}`)}
      <p class="lead-p">${esc(c.blurb)}</p>
      <h2 class="sec">${TE("plan.coachingNotes")}</h2>${notes.length ? `<ul class="notes">${notes.map(note).join("")}</ul>` : `<p class="empty-inline">${TE("community.nothingToFlag")}</p>`}
      <h2 class="sec">${TE("community.days")}</h2>
      <div class="rows">${c.days.map((d, i) => `<details class="row-d"><summary><span class="row-main"><span class="row-t">${esc(d.name)}</span><span class="row-s">${esc(count("common.plural.exercise", d.exercises.length))} · ${esc(mjoin(musclesOfDay(d).slice(0, 4), true))}</span></span>${icon("chevron-down", "chev")}</summary>
        <ul class="plain">${d.exercises.map((it) => `<li><span>${esc(X(it.exId).name)}</span><span class="num muted">${esc(count("community.nSets", Number(it.sets) || 0))}</span></li>`).join("")}</ul>
        <button type="button" class="btn btn-secondary btn-block" data-act="start-day" data-split="${esc(c.id)}" data-day="${i}">${icon("play")}${TE("home.start", { name: d.name })}</button></details>`).join("")}</div>
      <div class="sticky-cta"><button type="button" class="btn btn-primary btn-block" data-act="copy-community" data-id="${esc(c.id)}">${icon("copy")}${TE(copies ? "community.copyAgain" : "community.copy")}</button>
      ${copies ? `<p class="fine center">${TE("community.copiesAlready", { copies: count("common.plural.copy", copies) })}</p>` : ""}</div>`;
  }
  function copyCommunity(id) {
    const c = D.communitySplits.find((x) => x.id === id), sp = mySplits();
    const n = sp.filter((s) => s.source && s.source.communityId === id).length;
    const base = T("community.copyName", { name: c.name }), names = new Set(sp.map((s) => s.name));
    let k = n + 1, name = n === 0 && !names.has(base) ? base : T("community.copyN", { name: c.name, n: k });
    while (names.has(name)) name = T("community.copyN", { name: c.name, n: ++k });
    const copy = { id: L.uid("s"), name, source: { type: "community", communityId: id, name: c.name }, updatedAt: new Date().toISOString(),
      days: c.days.map((d) => ({ id: L.uid("d"), name: d.name, exercises: d.exercises.map((x) => ({ exId: x.exId, sets: x.sets })) })) };
    sp.push(copy); saveSplits(sp); render(true);
    toast(T("community.copiedAs", { name }), { label: T("common.undo"), fn: () => { saveSplits(mySplits().filter((s) => s.id !== copy.id)); render(true); } });
  }

  // ---------- Library + exercise detail + custom exercises ----------
  let libQ = "", libM = "";
  function libList() {
    const c = customs(), ids = Object.keys(D.exercises).concat(Object.keys(c).filter((k) => !c[k].archived)), q = lc(libQ.trim());
    // Search matches the shown (translated) name, the English library name and the shown muscle names.
    const hit = (e) => !q || lc(e.name).includes(q) || (!e.custom && own(D.exercises, e.id) && lc(D.exercises[e.id].name).includes(q)) || e.primary.some((m) => lc(M(m)).includes(q) || lc(m).includes(q));
    const list = ids.map(X).filter((e) => hit(e) && (!libM || e.primary.includes(libM))).sort((a, b) => a.name.localeCompare(b.name, I.locale()));
    return list.length ? list.map((e) => `<a class="pick-row" href="#/exercise/${esc(e.id)}">${miniMap(e)}<span class="pr-main"><span class="pr-name">${esc(e.name)}${e.custom ? ` <span class="tag">${TE("exercise.tagCustom")}</span>` : ""}</span><span class="pr-sub">${esc(mjoin(e.primary))}</span></span>${icon("chevron-right", "chev")}</a>`).join("")
      : `<p class="empty-inline">${TE("library.noMatch", { example: ML("Lats") })}</p>`;
  }
  function S_library() {
    const muscles = D.trackedMuscles.concat(D.extraMuscles), nLib = Object.keys(D.exercises).length, nCustom = Object.values(customs()).filter((x) => !x.archived).length;
    const sub = nCustom ? T("library.customCount", { count: count("library.count", nLib), n: nCustom }) : count("library.count", nLib);
    return `${largeTitle(TE("library.title"), esc(sub), `<a class="iconbtn" href="#/exercise-new" aria-label="${TE("library.newCustom")}">${icon("plus")}</a>`)}
      <div class="search">${icon("search")}<input type="search" data-lib-q value="${esc(libQ)}" placeholder="${TE("picker.searchPlaceholder")}" aria-label="${TE("picker.searchLabel")}"></div>
      <label class="selectrow"><span>${TE("picker.muscle")}</span><select data-lib-m aria-label="${TE("picker.filterLabel")}"><option value="">${TE("picker.allMuscles")}</option>${muscles.map((m) => `<option value="${esc(m)}" ${m === libM ? "selected" : ""}>${esc(M(m))}</option>`).join("")}</select></label>
      <div class="pick-list" data-lib-list>${libList()}</div>`;
  }
  // "Evidence: 8 topics QA-approved (topics 1, …, 8), 10 pending QA approval, built …" from evidence.js _meta (approval gate).
  function evidenceStatusLine() {
    const m = window.EVIDENCE && window.EVIDENCE._meta, t = (m && isObj(m.topics) && m.topics) || {};
    // Parent headings (13 = its sub-topics 13a/b/c) are not topics of their own.
    const ids = Object.keys(t).filter((k) => isObj(t[k]) && !/^parent/.test(String(t[k].status)))
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10) || a.localeCompare(b));   // 12, 13a, 13b, 13c, 14 (object key order puts integer keys first)
    const ok = ids.filter((k) => /^approved/.test(String(t[k].status))), pend = ids.length - ok.length;
    const date = m && m.imported && okDate(m.imported) ? dfmt(m.imported, { day: "numeric", month: "short", year: "numeric" }) : "—";
    return ids.length ? T(pend ? "library.evidenceStatus" : "library.evidenceStatusAll", { ok: ok.length, list: I.list(ok), pending: pend, date }) : "";
  }
  function exSubtitle(e) {
    const kind = T(e.type === "compound" ? "exercise.compound" : "exercise.isolation");
    const gear = e.gear ? T("exercise.gear." + e.gear, null, cap(e.gear))
      : e.equip && e.equip.length ? e.equip.map((q) => lc(T("common.equipment." + q, null, q))).join(T("common.listSep")) : "";
    return `${e.custom ? T("exercise.customPrefix") : ""}${kind}${gear ? " · " + gear : ""}${e.archived ? T("exercise.deletedSuffix") : ""}`;
  }
  function S_exercise(id) {
    id = L.canon(id);
    const e = X(id), r = rxFor(id), hist = history().filter((h) => h.items.some((x) => x.exId === id)).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
    const sug = L.suggestion(id, lastSetsFor(id), r);
    const profLabel = (p) => (p && I.exists("common.profile." + p) ? T("common.profile." + p) : "");
    const cues = (e.cues || []).map((c, n) => (e.custom ? c : T("exercise." + id + ".cue." + (n + 1), null, c)));
    const access = e.accessKey && I.exists("exercise.access." + e.accessKey) ? T("exercise.access." + e.accessKey) : e.accessNote;
    return `${topbar(`<button type="button" class="iconbtn" data-act="hist-back" aria-label="${TE("common.back")}">${icon("chevron-left")}</button>`, "", e.custom && !e.archived ? `<a class="btn-sm" href="#/exercise-edit/${esc(id)}">${TE("common.edit")}</a>` : "")}
      ${largeTitle(esc(e.name), esc(exSubtitle(e)))}
      ${e.missing ? `<p class="empty-inline">${TE("exercise.gone")}</p>` : muscleMap(e)}
      <button type="button" class="rx-card" data-act="rx" data-ex="${esc(id)}"><span class="row-main"><span class="row-t num">${TE("logger.rxLine", { sets: r.sets, reps: r.reps, rir: r.rir, rest: r.rest })}</span><span class="row-s">${TE("rx.yourPrescription")}</span></span><span class="why as-text">${TE("common.why")}</span></button>
      ${e.lengthened ? `<div class="row"><span class="row-main"><span class="row-t">${esc(profLabel(e.profile) || T("exercise.rx.stretch"))}</span><span class="row-s">${esc(e.lengthened)}</span></span></div>` : profLabel(e.profile) ? `<div class="row"><span class="row-main"><span class="row-t">${esc(profLabel(e.profile))}</span><span class="row-s">${TE("exercise.yourChoice")}</span></span></div>` : ""}
      ${access ? `<p class="fine muted">${TE("exercise.accessLine", { note: cap(access) })}</p>` : ""}
      ${e.evidenceNote ? `<h2 class="sec">${TE("exercise.researchNote")}</h2><p lang="en" data-ev>${esc(e.evidenceNote)}</p>` : ""}
      ${cues.length ? `<h2 class="sec">${TE("exercise.cues")}</h2><ul class="plain cues">${cues.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
      ${e.notes ? `<h2 class="sec">${TE("exercise.notes")}</h2><p>${esc(e.notes)}</p>` : ""}
      <h2 class="sec">${TE("exercise.history")}</h2>
      ${sug ? `<p class="row-s">${TE("exercise.next")} <b class="num">${esc(sug.target)}</b>. ${esc(sug.reason)}</p>` : ""}
      ${hist.length ? `<div class="rows">${hist.map((h) => { const it = h.items.find((x) => x.exId === id); return `<a class="row row-btn" href="#/summary/${esc(h.id)}"><span class="row-main"><span class="row-t">${esc(dayLabel(h.date))}</span><span class="row-s num">${it.sets.map((s) => esc(`${kgTxt(s.kg)}×${s.reps}`)).join(" · ")}</span></span>${icon("chevron-right", "chev")}</a>`; }).join("")}</div>` : `<p class="empty-inline">${TE("exercise.notLogged")}</p>`}
      ${e.custom && !e.archived ? `<button type="button" class="btn-text danger" data-act="ex-delete" data-id="${esc(id)}">${icon("trash-2")}${TE("exercise.deleteCustom")}</button>` : ""}`;
  }
  let cf = null;   // custom exercise form state; cf.errors holds i18n keys, rendered at display time
  function S_exerciseForm(id) {
    const editing = id && own(customs(), id);
    if (!cf || cf.forId !== (id || "new")) cf = editing ? Object.assign({ forId: id, errors: {} }, JSON.parse(JSON.stringify(customs()[id]))) : { forId: "new", name: "", primary: [], secondary: [], equip: [(profile() || DEFAULT_PROFILE).equipment], type: "compound", profile: "", notes: "", errors: {} };
    if (!Array.isArray(cf.equip)) cf.equip = [];
    if (!Array.isArray(cf.secondary)) cf.secondary = [];
    const muscles = D.trackedMuscles.concat(D.extraMuscles), er = cf.errors || {}, goal = (profile() || DEFAULT_PROFILE).goal;
    const chips = (field, dis) => `<div class="chips" role="group">${muscles.map((m) => `<button type="button" class="chip" data-cf="${esc(field)}" data-v="${esc(m)}" aria-pressed="${cf[field].includes(m)}" ${dis.includes(m) ? "disabled" : ""}>${esc(M(m))}</button>`).join("")}</div>`;
    const seg = (field, opts) => `<div class="seg seg-sm">${opts.map(([v, k]) => `<button type="button" data-cf="${esc(field)}" data-v="${esc(v)}" aria-pressed="${cf[field] === v}">${TE(k)}</button>`).join("")}</div>`;
    const err = (k, idAttr) => (k ? `<small class="err"${idAttr ? ` id="${idAttr}"` : ""}>${TE(k)}</small>` : "");
    return `${topbar(`<button type="button" class="iconbtn" data-act="cf-cancel" aria-label="${TE("common.cancel")}">${icon("x")}</button>`, TE(editing ? "custom.editTitle" : "custom.newTitle"), `<button type="button" class="btn btn-primary btn-sm-h" data-act="cf-save">${TE("common.save")}</button>`)}
      <p class="fine">${TE("custom.intro")} ${why("exercise.custom")}</p>
      <label class="field"><span>${TE("custom.name")}</span><input data-cf-name value="${esc(cf.name)}" maxlength="60" placeholder="${TE("custom.namePlaceholder")}" autocomplete="off" ${er.name ? `aria-invalid="true" aria-describedby="cf-er-name"` : ""}>${err(er.name, "cf-er-name")}</label>
      <fieldset class="field"><legend>${TE("custom.primary")} <small>${TE("custom.primaryHint")}</small></legend>${chips("primary", [])}${err(er.primary)}</fieldset>
      <fieldset class="field"><legend>${TE("custom.secondary")} <small>${TE("custom.secondaryHint")}</small></legend>${chips("secondary", cf.primary)}</fieldset>
      <fieldset class="field"><legend>${TE("custom.type")}</legend>${seg("type", [["compound", "exercise.compound"], ["isolation", "exercise.isolation"]])}<small class="hint">${TE("custom.typeHint", { compound: D.prescription.reps[goal].compound, isolation: D.prescription.reps[goal].isolation })}</small></fieldset>
      <fieldset class="field"><legend>${TE("onboarding.equipment.title")}</legend><div class="chips">${D.options.equipment.map((o) => `<button type="button" class="chip" data-cf="equip" data-v="${esc(o.id)}" aria-pressed="${cf.equip.includes(o.id)}">${TE("common.equipment." + o.id)}</button>`).join("")}</div></fieldset>
      <fieldset class="field"><legend>${TE("custom.hardest")} <small>${TE("custom.hardestHint")}</small></legend>${seg("profile", [["", "common.notSure"], ["lengthened", "custom.profile.stretch"], ["mid", "custom.profile.middle"], ["shortened", "custom.profile.squeeze"]])}</fieldset>
      <label class="field"><span>${TE("exercise.notes")} <small>${TE("common.optional")}</small></span><textarea data-cf-notes rows="2" maxlength="300" placeholder="${TE("custom.notesPlaceholder")}">${esc(cf.notes || "")}</textarea></label>
      ${cfCoach()}`;
  }
  function cfCoach() {
    const tips = [];
    if (cf.primary.length > 3) tips.push("custom.tip.tooManyPrimary");
    if (cf.type === "isolation" && cf.primary.length > 1) tips.push("custom.tip.isolationMany");
    if (!cf.secondary.length && cf.type === "compound" && cf.primary.length) tips.push("custom.tip.compoundNoHelpers");
    return `<div data-cf-coach>${tips.length ? `<h2 class="sec">${TE("plan.coachingNotes")}</h2><ul class="notes">${tips.map((k) => `<li class="note"><span class="note-text">${TE(k)}</span></li>`).join("")}</ul><p class="fine">${TE("custom.tip.footer")}</p>` : ""}</div>`;
  }
  function cfSave() {
    const name = cf.name.trim(), er = {};
    // A duplicate is any library exercise (English or shown name) or other live custom exercise with the same name.
    const taken = Object.keys(D.exercises).flatMap((k) => [D.exercises[k].name, X(k).name]).concat(Object.entries(customs()).filter(([k, v]) => k !== cf.forId && !v.archived).map(([, v]) => v.name));
    if (!name) er.name = "custom.err.name";
    else if (taken.some((n) => lc(n) === lc(name))) er.name = "custom.err.duplicate";
    if (!cf.primary.length) er.primary = "custom.err.primary";
    cf.errors = er;
    if (Object.keys(er).length) { rerender(); const f = $("[aria-invalid=true]", screen) || $(".err", screen); if (f) f.focus ? f.focus() : 0; return; }
    const c = customs(), id = cf.forId !== "new" ? cf.forId : "c_" + L.uid();
    c[id] = { name, primary: cf.primary, secondary: cf.secondary.filter((m) => !cf.primary.includes(m)), equip: cf.equip.length ? cf.equip : ["gym", "db", "bw"], type: cf.type, profile: cf.profile || null, notes: (cf.notes || "").trim(), createdAt: own(c, id) ? c[id].createdAt : new Date().toISOString() };
    saveCustoms(c); cf = null;
    const pend = LS.get("pendingAdd", null); LS.del("pendingAdd");
    if (isObj(pend) && isObj(pend.ctx)) {
      location.hash = typeof pend.ret === "string" && pend.ret.startsWith("#/") ? pend.ret : "#/home";
      setTimeout(() => pickExercise(id, pend.ctx), 0);
    } else { go("#/exercise/" + id, true); }
    toast(T("builder.saved", { name }));
  }
  async function deleteCustom(id) {
    const e = X(id);
    const v = await dialog({ title: T("custom.deleteTitle", { name: e.name }), body: T("custom.deleteBody"), actions: [{ label: T("common.cancel"), value: null }, { label: T("common.delete"), kind: "danger", value: "x" }] });
    if (!v) return;
    const c = customs(); if (!own(c, id)) return;
    c[id].archived = true; saveCustoms(c); go("#/library");
    toast(T("custom.deleted", { name: e.name }), { label: T("common.undo"), fn: () => { const c2 = customs(); if (own(c2, id)) { delete c2[id].archived; saveCustoms(c2); } render(true); } });
  }

  // ---------- You ----------
  function S_you() {
    const p = profile();
    const lab = { goal: T("onboarding.goal." + p.goal), experience: T("onboarding.experience." + p.experience), sessionLength: minutes(p.sessionLength), equipment: T("common.equipment." + p.equipment) };
    const langBtn = (l) => `<button type="button" data-act="lang" data-v="${esc(l)}" aria-pressed="${I.lang === l}" lang="${esc(l)}">${TE("settings.languageName." + l)}</button>`;
    return `${topbar(back("#/home"), "")}${largeTitle(TE("you.title"))}
      <section class="card"><dl class="kvs">
        <div><dt>${TE("you.goal")}</dt><dd>${esc(lab.goal)}</dd></div><div><dt>${TE("you.experience")}</dt><dd>${esc(lab.experience)}</dd></div>
        <div><dt>${TE("onboarding.days.title")}</dt><dd class="num">${esc(p.days)}</dd></div><div><dt>${TE("onboarding.sessionLength.title")}</dt><dd>${esc(lab.sessionLength)}</dd></div><div><dt>${TE("onboarding.equipment.title")}</dt><dd>${esc(lab.equipment)}</dd></div></dl>
        <a class="btn btn-secondary btn-block" href="#/onboarding">${TE("plan.changeAnswers")}</a></section>
      <h2 class="sec">${TE("settings.language")}</h2>
      <div class="seg lang-seg" role="group" aria-label="${TE("settings.language")}">${I.langs.map(langBtn).join("")}</div>
      <p class="fine">${TE("settings.languageNote")}</p>
      <h2 class="sec">${TE("you.howCounts", { app: APP })}</h2>
      <ul class="plain">${D.conventions.map((c) => `<li class="conv-li"><span>${esc(c.text)}</span>${why(c.whyKey)}</li>`).join("")}</ul>
      <p class="fine">${TE("you.disclaimer", { app: APP })}</p>
      <h2 class="sec">${TE("you.data")}</h2>
      <p class="fine">${TE("you.dataNote")} ${esc(evidenceStatusLine())}</p>
      <button type="button" class="btn-text danger" data-act="reset">${icon("trash-2")}${TE("you.reset")}</button>`;
  }

  // ---------- router ----------
  function route() {
    const h = (location.hash || "#/home").replace(/^#\/?/, ""), [path] = h.split("?"), parts = path.split("/").filter(Boolean);
    const dec = (x) => { try { return decodeURIComponent(x); } catch (e) { return ""; } };
    return { name: parts[0] || "home", args: parts.slice(1).map(dec) };
  }
  const TAB_OF = { home: "home", summary: "home", you: "home", plan: "plan", builder: "plan", community: "plan", train: "train", week: "week", library: "library", exercise: "library", "exercise-new": "library", "exercise-edit": "library" };
  const NO_TABS = ["onboarding", "split", "workout", "builder", "exercise-new", "exercise-edit"];
  let redirected = false;
  function go(h, replace) { if (replace) { history_replace(h); render(); } else if (location.hash === h) render(); else location.hash = h; redirected = true; return ""; }
  function history_replace(h) { window.history.replaceState(null, "", h); }
  const SCREENS = { onboarding: S_onboarding, split: S_split, home: S_home, train: S_train, workout: S_workout, summary: S_summary, week: S_week, plan: S_plan, builder: S_builder,
    community: S_community, library: S_library, exercise: S_exercise, "exercise-new": () => S_exerciseForm(null), "exercise-edit": (id) => S_exerciseForm(id), you: S_you };
  let lastRoute = "";
  function render(keepScroll) {
    let r = route();
    if (!profile() && r.name !== "onboarding") { history_replace("#/onboarding"); r = route(); }
    if (!own(SCREENS, r.name)) { history_replace("#/home"); r = route(); }
    if (r.name !== "onboarding") ob = null;
    if (!["exercise-new", "exercise-edit"].includes(r.name)) cf = null;
    if (r.name !== "builder" && draft() && !draft().dirty) LS.del("builderDraft");
    redirected = false;
    const html = SCREENS[r.name](...r.args);
    if (redirected) return;
    screen.innerHTML = html;
    applyWidths(screen);
    screen.dataset.route = r.name;
    const key = location.hash;
    if (!keepScroll && key !== lastRoute) { screen.scrollTop = 0; window.scrollTo(0, 0); const h1 = $("h1", screen) || $(".tb-title", screen); if (h1 && lastRoute) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); } }
    lastRoute = key;
    const tab = TAB_OF[r.name];
    tabbar.hidden = NO_TABS.includes(r.name);
    document.body.classList.toggle("no-tabs", tabbar.hidden);
    $$("a", tabbar).forEach((a) => { const on = a.dataset.tab === tab; a.classList.toggle("on", on); on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"); });
    const w = activeW(), mini = $("#minibar");
    if (mini) { const show = w && !NO_TABS.includes(r.name) && r.name !== "summary"; mini.hidden = !show; if (show) mini.innerHTML = `<a href="#/workout">${icon("play")}<span class="row-main"><span class="row-t">${esc(w.name)}</span><span class="row-s num"><span data-elapsed>${esc(mmss((Date.now() - new Date(w.startedAt)) / 1000))}</span> · ${TE("home.ticked", { sets: count("common.plural.set", L.doneSets(w)) })}</span></span><span class="mini-cta">${TE("common.resume")}</span></a>`; document.body.classList.toggle("has-mini", !!show); }
    drawRest();
    document.title = T("common.docTitle", { screen: r.name === "home" ? T("nav.today") : (($("h1", screen) || {}).textContent || T("nav.today")).trim(), app: APP });
  }
  window.addEventListener("hashchange", () => { closeSheet(); render(); });

  // ---------- events (delegated) ----------
  document.addEventListener("click", async (ev) => {
    const t = ev.target.closest("[data-why],[data-why-push],[data-act],[data-ob],[data-cf],[data-research],[data-sheet-close],[data-sheet-back],[data-close]");
    if (ev.target.id === "scrim") { if (ev.target.dataset.for === "sheet") closeSheet(); return; }
    if (!t) return;
    if (t.hasAttribute("data-close")) { closeSheet(); return; }
    if (t.hasAttribute("data-sheet-close")) return closeSheet();
    if (t.hasAttribute("data-sheet-back")) return sheetBack();
    if (t.hasAttribute("data-research")) { const r = $("#research"), open = t.getAttribute("aria-expanded") !== "true"; t.setAttribute("aria-expanded", open); r.hidden = !open; if (open) r.scrollIntoView({ block: "nearest", behavior: "smooth" }); return; }
    if (t.dataset.why) { ev.preventDefault(); return openWhy(t.dataset.why); }
    if (t.dataset.whyPush) return openSheet(() => whyHTML(t.dataset.whyPush));
    if (t.dataset.ob) { const k = t.dataset.ob; if (!own(D.options, k) || !ob) return; ob[k] = k === "days" || k === "sessionLength" ? +t.dataset.v : t.dataset.v; $$(`[data-ob="${cssq(k)}"]`).forEach((b) => b.setAttribute("aria-pressed", b === t)); return; }
    if (t.dataset.cf) {
      const f = t.dataset.cf, v = t.dataset.v;
      if (!cf || !["primary", "secondary", "equip", "type", "profile"].includes(f)) return;
      if (Array.isArray(cf[f])) { cf[f] = cf[f].includes(v) ? cf[f].filter((x) => x !== v) : cf[f].concat(v); if (f === "primary") { cf.secondary = cf.secondary.filter((m) => !cf.primary.includes(m)); if (cf.errors) delete cf.errors.primary; } }
      else cf[f] = v;
      cf.name = ($("[data-cf-name]") || { value: cf.name }).value; cf.notes = ($("[data-cf-notes]") || { value: cf.notes }).value;
      return rerender();
    }
    const a = t.dataset.act, uid = t.dataset.uid;
    switch (a) {
      case "ob-done": { const p = Object.assign({}, profile() || {}, ob); const changed = !profile() || ["days", "equipment", "sessionLength", "experience", "goal"].some((k) => String(profile()[k]) !== String(ob[k])); if (changed) delete p.splitKey; if (!p.activeSplitId) p.activeSplitId = "rec"; setProfile(p); ob = null; return go("#/split"); }
      case "alt": { const p = profile(); p.splitKey = +t.dataset.k; setProfile(p); return render(); }
      case "use-rec": { const p = profile(); p.activeSplitId = "rec"; setProfile(p); return go("#/home"); }
      case "start-day": return startWorkout({ splitId: t.dataset.split, dayIndex: +t.dataset.day });
      case "start-empty": return startWorkout(null);
      case "train-tab": ui("trainTab", t.dataset.k); return render(true);
      case "finish": return finishWorkout();
      case "discard": return discardWorkout();
      case "tick": return tickSet(uid, +t.dataset.i);
      case "add-set": { flushInputs(); const w = activeW(), it = w.items.find((x) => x.uid === uid); if (it.sets.length >= 10) return toast(T("logger.maxSets")); it.sets.push(newSet()); saveActive(w); return rerender(); }
      case "del-set": { flushInputs(); const w = activeW(), it = w.items.find((x) => x.uid === uid); if (it.sets.length > 1 && !it.sets[it.sets.length - 1].done) { it.sets.pop(); delete errs[uid + ":" + it.sets.length]; } saveActive(w); return rerender(); }
      case "ex-menu": return exMenu(uid);
      case "m-up": return moveItem(uid, -1);
      case "m-down": return moveItem(uid, 1);
      case "m-remove": return removeItem(uid);
      case "m-swap": sheetStack.length = 0; return openSheet(() => swapHTML(uid), { tall: true });
      case "swap-pick": return openSheet(() => swapConfirmHTML(uid, t.dataset.ex));
      case "swap-apply": return applySwap(uid, t.dataset.ex, t.dataset.plan === "1");
      case "swap-search": pickQ = ""; pickM = ""; return openSheet(() => pickerHTML({ kind: "replace", uid }), { tall: true });
      case "add-ex": return openPicker({ kind: "workout" });
      case "pick": return pickExercise(t.dataset.ex, JSON.parse(t.dataset.ctx));
      case "new-custom": { flushInputs(); LS.set("pendingAdd", { ctx: JSON.parse(t.dataset.ctx), ret: location.hash }); closeSheet(); return go("#/exercise-new"); }
      case "rx": return openSheet(() => rxHTML(t.dataset.ex));
      case "rest-minus": case "rest-plus": { const w = activeW(); if (!w || !w.rest) return; const d = a === "rest-plus" ? 15 : -15; w.rest.endsAt = Math.max(Date.now(), w.rest.endsAt + d * 1000); w.rest.total = Math.max(15, w.rest.total + d); saveActive(w); return drawRest(); }
      case "rest-skip": return stopRest();
      case "customise-rec": { const c = ensureEditable("rec"); return go("#/builder/" + c.id); }
      case "use-split": return useSplit(t.dataset.id);
      case "b-save": return bSave();
      case "b-cancel": return bCancel();
      case "b-delete": return bDelete();
      case "b-add-day": return bMutate((d) => d.days.push({ id: L.uid("d"), name: T("common.dayN", { n: d.days.length + 1 }), exercises: [] }));
      case "b-day-up": return bMutate((d) => { const i = +t.dataset.i; [d.days[i - 1], d.days[i]] = [d.days[i], d.days[i - 1]]; });
      case "b-day-del": { const d = draft(), i = +t.dataset.i, day = d.days[i];
        if (day.exercises.length) { const v = await dialog({ title: T("builder.removeDayTitle", { name: day.name || T("builder.thisDay") }), body: T("builder.removeDayBody", { exercises: count("common.plural.exercise", day.exercises.length) }), actions: [{ label: T("common.cancel"), value: null }, { label: T("builder.removeDay"), kind: "danger", value: "x" }] }); if (!v) return; }
        return bMutate((d2) => d2.days.splice(i, 1)); }
      case "b-sets": return bMutate((d) => { const x = d.days[+t.dataset.i].exercises[+t.dataset.j]; x.sets = Math.max(1, Math.min(10, (+x.sets || 0) + +t.dataset.d)); });
      case "b-ex-up": return bMutate((d) => { const ex = d.days[+t.dataset.i].exercises, j = +t.dataset.j; [ex[j - 1], ex[j]] = [ex[j], ex[j - 1]]; });
      case "b-ex-del": { const d = draft(), i = +t.dataset.i, j = +t.dataset.j, removed = d.days[i].exercises[j]; bMutate((d2) => d2.days[i].exercises.splice(j, 1));
        return toast(T("workout.removed", { name: X(removed.exId).name }), { label: T("common.undo"), fn: () => bMutate((d3) => d3.days[i] && d3.days[i].exercises.splice(j, 0, removed)) }); }
      case "b-add-ex": return openPicker({ kind: "builder", day: +t.dataset.i });
      case "copy-community": return copyCommunity(t.dataset.id);
      case "cf-save": cf.name = $("[data-cf-name]").value; cf.notes = $("[data-cf-notes]").value; return cfSave();
      case "cf-cancel": { const pend = LS.get("pendingAdd", null); LS.del("pendingAdd"); cf = null; if (isObj(pend) && typeof pend.ret === "string" && pend.ret.startsWith("#/")) return go(pend.ret); return window.history.length > 1 ? window.history.back() : go("#/library"); }
      case "ex-delete": return deleteCustom(t.dataset.id);
      case "hist-back": return window.history.length > 1 && lastRoute ? window.history.back() : go("#/library");
      case "reset": { const v = await dialog({ title: T("you.resetTitle"), body: T("you.resetBody"), actions: [{ label: T("common.cancel"), value: null }, { label: T("you.resetConfirm"), kind: "danger", value: "x" }] });
        if (!v) return; try { Object.keys(localStorage).filter((k) => k.startsWith(PFX)).forEach((k) => localStorage.removeItem(k)); } catch (e) { /* storage unavailable */ } return go("#/onboarding"); }
      case "lang": { const l = t.dataset.v; if (!I.langs.includes(l) || l === I.lang) return; I.setLang(l); const u = new URL(location.href); if (u.searchParams.has("lang")) { u.searchParams.delete("lang"); history.replaceState(null, "", u.href); } return location.reload(); }  // same-URL replace with a #hash is a fragment navigation (no reload), so reload explicitly
    }
  });
  // Inputs: save as you type, no re-render (keeps focus and the on-screen keyboard).
  document.addEventListener("input", (ev) => {
    const el = ev.target;
    if (el.classList.contains("cell-in")) {
      const w = activeW(); if (!w) return; const it = w.items.find((x) => x.uid === el.dataset.uid); if (!it) return;
      it.sets[+el.dataset.i][el.dataset.f] = el.value; saveActive(w);
      const k = el.dataset.uid + ":" + el.dataset.i;
      if (errs[k] && errs[k][el.dataset.f]) { delete errs[k][el.dataset.f]; el.classList.remove("bad"); el.removeAttribute("aria-invalid"); if (!Object.keys(errs[k]).length) { delete errs[k]; const row = el.closest("tr").nextElementSibling; if (row && row.classList.contains("err-row")) row.remove(); } }
      return;
    }
    if (el.matches("[data-b=name]")) { const d = draft(); d.name = el.value; d.dirty = true; return saveDraft(d); }
    if (el.matches("[data-b=day]")) { const d = draft(); d.days[+el.dataset.i].name = el.value; d.dirty = true; return saveDraft(d); }
    if (el.matches("[data-pick-q]")) { pickQ = el.value; const l = $("[data-pick-list]"); const tmp = document.createElement("div"); tmp.innerHTML = sheetStack[sheetStack.length - 1].render(); l.innerHTML = $("[data-pick-list]", tmp).innerHTML; return; }
    if (el.matches("[data-lib-q]")) { libQ = el.value; $("[data-lib-list]").innerHTML = libList(); return; }
    if (el.matches("[data-cf-name]")) { cf.name = el.value; return; }
    if (el.matches("[data-cf-notes]")) { cf.notes = el.value; return; }
  });
  document.addEventListener("change", (ev) => {
    const el = ev.target;
    if (el.matches("[data-pick-m]")) { pickM = el.value; return refreshSheet(); }
    if (el.matches("[data-lib-m]")) { libM = el.value; $("[data-lib-list]").innerHTML = libList(); return; }
    if (el.matches("[data-b=active]")) { const d = draft(); d.makeActive = el.checked; return saveDraft(d); }
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !$("#sheet").hidden && $("#dialog").hidden) return closeSheet();
    // Enter in a set cell moves to the next cell; Enter in the RIR cell ticks the set.
    if (ev.key === "Enter" && ev.target.classList.contains("cell-in")) {
      ev.preventDefault();
      const el = ev.target, order = ["kg", "reps", "rir"], k = order.indexOf(el.dataset.f);
      if (k < 2) { const n = $(`.cell-in[data-uid="${cssq(el.dataset.uid)}"][data-i="${cssq(el.dataset.i)}"][data-f="${cssq(order[k + 1])}"]`); if (n) n.focus(); }
      else tickSet(el.dataset.uid, +el.dataset.i);
    }
  });
  window.addEventListener("storage", (e) => { if (e.key && e.key.startsWith(PFX)) render(true); });

  // Static shell text (index.html): data-i18n -> textContent, data-i18n-aria -> aria-label. Icons are vendored Lucide paths.
  document.documentElement.lang = I.lang === "pseudo" ? "en" : I.lang;
  $$("[data-i18n]").forEach((el) => { el.textContent = T(el.dataset.i18n, { app: APP }); });
  $$("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", T(el.dataset.i18nAria, { app: APP })); });
  $$("[data-icon]").forEach((s) => { s.innerHTML = own(ICONS, s.dataset.icon) ? ICONS[s.dataset.icon] : ""; s.setAttribute("viewBox", "0 0 24 24"); });
  migrateIds();
  render();
  // Test hook only when a test harness opts in before load (security.md §10 P2: no debug global in normal use).
  if (window.__LIFT_TEST__ === true) window.__carlsen = { LS, render, PFX, I18N: I };
})();
