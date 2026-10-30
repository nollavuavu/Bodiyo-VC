// i18n checks, headless Chrome over file:// (+ the runtime in Node).
// 1) Pseudo-locale (?lang=pseudo): every visible UI string, aria-label, placeholder and title on every screen, sheet and
//    dialog comes from a key. Text that is not wrapped in pseudo brackets is raw English = FAIL. Excluded: evidence copy
//    (marked lang="en" data-ev), user-entered text (none in this tour), sample handles (@name) and the app name.
// 2) No key is missing (I18N.missing stays empty) in en, vi and pseudo.
// 3) Intl: dates and numbers follow the active locale (en-GB / vi-VN). Plurals use key.one / key.other.
// 4) Layout with ~40% longer text: no horizontal overflow on any screen (pseudo), screenshots for review.
// 5) Vietnamese diacritics: a TEST-ONLY preview that loads Vance's vi.draft.json in memory (never shipped) for the font check.
// Run: node tools/test-i18n.js [--shots]
const path = require("path"), fs = require("fs"), vm = require("vm");
const puppeteer = require(process.env.PUPPETEER || "/workspace/carlsen-tools/node_modules/puppeteer-core");
const ROOT = path.join(__dirname, ".."), URL = "file://" + path.join(ROOT, "index.html"), SHOTS = path.join(ROOT, "screenshots", "i18n");
const SHOT = process.argv.includes("--shots");
let pass = 0, fail = 0; const check = (n, ok, info) => { ok ? pass++ : fail++; console.log(ok ? "PASS" : "FAIL", n, ok ? "" : String(info || "").slice(0, 900)); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Node: runtime plural + fallback + placeholder rules ----
{
  const ctx = { window: {}, self: null, localStorage: null, location: { search: "" } }; ctx.self = ctx.window; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "i18n.js"), "utf8"), ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, "i18n-runtime.js"), "utf8").replace(/typeof self !== "undefined" \? self : this/, "window"), ctx);
  const I = ctx.window.I18N, en = ctx.window.CARLSEN_I18N.en;
  check("plural en: n=1 -> .one, n=3 -> .other", I.t("common.plural.set", { n: 1 }) === en["common.plural.set.one"].replace("{n}", "1") && I.t("common.plural.set", { n: 3 }) === en["common.plural.set.other"].replace("{n}", "3"), I.t("common.plural.set", { n: 1 }));
  I.setLang("vi");
  check("vi with empty vi.json falls back to English per key (plural category from en)", I.t("common.plural.set", { n: 1 }) === en["common.plural.set.one"].replace("{n}", "1") && I.locale() === "vi-VN");
  const raw = Object.entries(en).filter(([k, v]) => /RIR\s*\d/.test(v)).map(([k]) => k);
  check("no hard-coded 'RIR <number>' in en.json (uses {rir})", raw.length === 0, raw.join(", "));
  const concat = Object.entries(en).filter(([k, v]) => /\p{L}/u.test(v) && /^[,;·]\s|\s[,;]$/.test(v)).map(([k]) => k);
  check("no sentence fragments meant for concatenation (leading/trailing separators; pure list separators like common.listSep are allowed)", concat.length === 0, concat.join(", "));
  const bad = Object.keys(en).filter((k) => !/^[a-z][A-Za-z0-9]*(\.[A-Za-z0-9_-]+)+$/.test(k));
  check("keys are flat, namespaced, stable", bad.length === 0, bad.join(", "));
}

(async () => {
  const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args: ["--no-sandbox"] });
  const pg = await b.newPage(); await pg.emulateTimezone("Europe/Helsinki"); await pg.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const errs = []; pg.on("pageerror", (e) => errs.push(e.message)); pg.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  pg.on("dialog", (d) => d.dismiss());
  await pg.evaluateOnNewDocument(() => { window.__LIFT_TEST__ = true; });
  const prof = { goal: "hypertrophy", experience: "intermediate", days: 4, sessionLength: 60, equipment: "gym", activeSplitId: "rec" };
  const seed = async (lang) => {
    await pg.goto(URL); await pg.evaluate((p, lang) => {
      localStorage.clear(); localStorage.setItem("carlsen2.profile", JSON.stringify(p)); if (lang) localStorage.setItem("carlsen2.lang", JSON.stringify(lang));
      const d = new Date(Date.now() - 864e5).toISOString(), s = (kg, r) => ({ kg, reps: r, rir: "2", done: true });
      localStorage.setItem("carlsen2.history", JSON.stringify([{ id: "h1", name: "", date: d, startedAt: d, durationMin: 52, items: [
        { uid: "u1", exId: "barbell-bench-press", sets: [s("62.5", "8"), s("62.5", "8"), s("62.5", "7")] }, { uid: "u2", exId: "lat-pulldown", sets: [s("52.5", "10"), s("52.5", "10")] }] }]));
    }, prof, lang);
  };
  // ---- the pseudo scan ----
  const scan = () => pg.evaluate(() => {
    const out = [], strip = (s) => { let p; do { p = s; s = s.replace(/\[[^\[\]]*\]/g, " "); } while (s !== p); return s; };
    const skip = (el) => !el || el.closest("[data-ev], [lang=en], script, style, svg, [hidden], .vh-skip") || (el.checkVisibility && !el.checkVisibility());
    const rawEnglish = (s) => { const r = strip(s).replace(/@[\w-]+/g, " ").replace(/\bLift\b/g, " ").replace(/evidence\.md|exercises\.json|localStorage/g, " "); return /[A-Za-z]{2,}/.test(r) ? r.trim() : ""; };
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) { const t = n.nodeValue.trim(); if (!t || skip(n.parentElement)) continue; const r = rawEnglish(t); if (r) out.push("text: " + t.slice(0, 90)); }
    for (const el of document.querySelectorAll("[aria-label],[placeholder],[title]")) { if (skip(el)) continue;
      for (const a of ["aria-label", "placeholder", "title"]) { const v = el.getAttribute(a); if (v && rawEnglish(v)) out.push(a + ": " + v.slice(0, 90)); } }
    if (rawEnglish(document.title)) out.push("document.title: " + document.title);
    return out;
  });
  const overflow = () => pg.evaluate(() => { const W = document.documentElement.clientWidth; const o = [];
    for (const el of document.querySelectorAll("#app *, #sheet *, #dialog *")) { if (el.checkVisibility && !el.checkVisibility()) continue; const r = el.getBoundingClientRect(); if (r.width && (r.right > W + 1 || r.left < -1) && !el.closest(".hscroll, .chips-scroll, [data-scroll-x], pre")) o.push((el.className || el.tagName) + " " + Math.round(r.right)); }
    return [...new Set(o)].slice(0, 6); });
  const go = async (h) => { await pg.evaluate((h) => (location.hash = h), h); await wait(280); };
  const click = (sel) => pg.evaluate((s) => { const e = document.querySelector(s); if (!e) return false; e.click(); return true; }, sel).then(async (r) => { await wait(220); return r; });
  const closeSheet = () => click("[data-sheet-close]");
  const report = {}; const note = (where, items) => { if (items.length) report[where] = items; };
  const tour = async (lang, shots) => {
    const st = async (where, name) => { note(where, await scan()); const o = await overflow(); if (o.length) note(where + " (overflow)", o); if (shots && name) await pg.screenshot({ path: path.join(SHOTS, `${lang}-${name}.png`) }); };
    await pg.goto(URL + "?lang=" + lang); await pg.evaluate(() => localStorage.clear()); await pg.goto(URL + "?lang=" + lang + "#/onboarding"); await pg.reload(); await wait(400);  // hash-only goto is a fragment navigation: reload so the app starts on the cleared storage
    await st("onboarding", "01-onboarding");
    if (await click(".why")) { await click("#sheet [data-research]"); await st("onboarding why", "01b-onboarding-why"); await closeSheet(); }
    await click("[data-act=ob-done]"); await wait(300); await st("split (after onboarding)", "02-split");
    await seed(); await pg.goto(URL + "?lang=" + lang + "#/home"); await wait(400);
    const screens = [["#/home", "03-home"], ["#/plan", "04-plan"], ["#/week", "05-week"], ["#/week/-1", ""], ["#/library", "06-library"], ["#/exercise/barbell-bench-press", "07-exercise"], ["#/exercise/incline-dumbbell-curl", ""],
      ["#/community", "08-community"], ["#/community/c-bro5", ""], ["#/builder/new", "09-builder"], ["#/you", "10-you"], ["#/summary/h1", "11-summary"], ["#/split", ""], ["#/train", ""], ["#/exercise/nope", ""]];
    for (const [h, name] of screens) { await go(h); await st(h, name);
      if (await click("#screen .why")) { await click("#sheet [data-research]"); await st(h + " why sheet", name ? name + "-why" : ""); await closeSheet(); } }
    await go("#/exercise/barbell-bench-press"); if (await click("[data-act=rx], [data-rx], .rx-open")) { await st("rx sheet", "07b-rx"); await closeSheet(); }
    await go("#/library"); await pg.evaluate(() => { const q = document.querySelector("[data-lib-q]"); q.value = "zzzz"; q.dispatchEvent(new Event("input", { bubbles: true })); }); await wait(300); await st("library no match", "06b-library-nomatch");
    await go("#/exercise-new"); await click("[data-act=cf-save]"); await wait(250); await st("custom exercise form (errors)", "12-custom-errors");
    await go("#/train"); await click("[data-act=start-empty]"); await wait(300); await st("empty workout", "13-workout-empty");
    await click("[data-act=add-ex]"); await st("picker", "14-picker"); await click(".pick-row[data-act=pick]"); await wait(300);
    await pg.evaluate(() => { const i = document.querySelectorAll(".cell-in"); const set = (el, v) => { el.value = v; el.dispatchEvent(new Event("input", { bubbles: true })); }; if (i[0]) set(i[0], "40"); if (i[1]) set(i[1], "10"); }); await wait(150);
    await click("[data-act=tick], .tick, [data-act=done-set]"); await wait(300); await st("workout with rest timer", "15-workout");
    if (await click("[data-act=ex-menu]")) { await st("exercise menu", "16-menu"); await closeSheet(); }
    if (await click("[data-act=finish], [data-act=w-finish]")) { await wait(300); await st("finish dialog/summary", "17-finish"); }
    await go("#/you"); if (await click("[data-act=reset]")) { await st("reset dialog", "18-reset-dialog"); await click("[data-dlg-cancel], [data-act=dlg-cancel], .dlg-actions .btn-ghost"); }
    const missing = await pg.evaluate(() => (window.__carlsen && window.__carlsen.I18N.missing.slice()) || ["(no hook)"]);
    check(`[${lang}] no missing keys after the tour (I18N.missing empty)`, missing.length === 0, missing.join(", "));
  };
  try {
    if (SHOT) fs.mkdirSync(SHOTS, { recursive: true });
    await tour("pseudo", SHOT);
    const raw = Object.entries(report).filter(([k]) => !/overflow/.test(k)), ov = Object.entries(report).filter(([k]) => /overflow/.test(k));
    check("pseudo-locale: no raw English UI text outside evidence copy (all screens, sheets, dialogs, attributes)", raw.length === 0, JSON.stringify(Object.fromEntries(raw), null, 1));
    check("pseudo-locale (~40% longer): nothing overflows the 390 px viewport", ov.length === 0, JSON.stringify(Object.fromEntries(ov)));
    for (const k of Object.keys(report)) delete report[k];
    await tour("en", false); await tour("vi", false);
    // Intl: dates + numbers in the active locale
    await seed("en"); await pg.goto(URL + "#/summary/h1"); await pg.reload(); await wait(400); const enTxt = await pg.evaluate(() => document.body.innerText);
    await seed("vi"); await pg.goto(URL + "#/summary/h1"); await pg.reload(); await wait(400); const viTxt = await pg.evaluate(() => document.body.innerText);
    const enDate = new Intl.DateTimeFormat("en-GB", { month: "short" }).format(new Date(Date.now() - 864e5)), viDate = new Intl.DateTimeFormat("vi-VN", { month: "short" }).format(new Date(Date.now() - 864e5));
    const lcI = (x) => x.toLocaleLowerCase("vi-VN"); check("Intl dates: en-GB month name in en, vi-VN month in vi", enTxt.includes(enDate) && lcI(viTxt).includes(lcI(viDate).replace(/^thg /, "tháng ")) && !viTxt.includes(" " + enDate + " "), enDate + " / " + viDate + " | vi: " + (viTxt.match(/[^\n]*tháng[^\n]*/i) || [""])[0]);
    const tl = (n, l) => new Intl.NumberFormat(l, { maximumFractionDigits: 0 }).format(Math.round(n));  // seeded h1: 62.5 kg × (8+8+7) + 52.5 kg × (10+10) = 2487.5 -> shown rounded
    check("Intl numbers: total load uses the locale's grouping/decimal (2,488 in en-GB vs 2.488 in vi-VN; set weights 62.5 vs 62,5)", enTxt.includes(tl(2487.5, "en-GB")) && viTxt.includes(tl(2487.5, "vi-VN")) && enTxt.includes("62.5") && viTxt.includes("62,5"), tl(2487.5, "en-GB") + " / " + tl(2487.5, "vi-VN") + " | " + (viTxt.match(/[\d.,]{4,}/g) || []).join(" "));
    await seed("en"); await pg.goto(URL + "#/library"); await pg.reload(); await wait(300);
    await pg.evaluate(() => { const q = document.querySelector("[data-lib-q]"); q.value = "zzzz"; q.dispatchEvent(new Event("input", { bubbles: true })); }); await wait(300);
    check("library.noMatch example comes from muscle.lats", /like "lats"/.test(await pg.evaluate(() => document.body.innerText)));
    // Language switch on You persists and reloads
    await seed("en"); await pg.goto(URL + "#/you"); await pg.reload(); await wait(300);
    const sw = await pg.evaluate(() => { const b = document.querySelector('[data-act=lang][data-v="vi"], [data-lang="vi"]'); if (!b) return false; b.click(); return true; }); await wait(800);
    const after = await pg.evaluate(() => ({ lang: localStorage.getItem("carlsen2.lang"), html: document.documentElement.lang, hash: location.hash }));
    check("EN/VI switch on You saves carlsen2.lang and switches <html lang>", sw && after.lang === '"vi"' && after.html === "vi", JSON.stringify(after));
    // Vietnamese diacritics preview (TEST ONLY: Vance's vi.draft.json injected in memory, nothing written or shipped)
    const draft = JSON.parse(fs.readFileSync(path.join(ROOT, "..", "i18n", "vi.draft.json"), "utf8"));
    const p2 = await b.newPage(); await p2.emulateTimezone("Europe/Helsinki"); await p2.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await p2.evaluateOnNewDocument((d) => { let v; Object.defineProperty(window, "CARLSEN_I18N", { configurable: true, get: () => v, set: (x) => { v = x; v.vi = Object.assign({}, v.vi, Object.fromEntries(Object.entries(d).filter(([k, s]) => typeof s === "string" && s))); } }); }, draft);
    await p2.goto(URL); await p2.evaluate((p) => { localStorage.clear(); localStorage.setItem("carlsen2.profile", JSON.stringify(p)); localStorage.setItem("carlsen2.lang", '"vi"'); }, prof);
    fs.mkdirSync(SHOTS, { recursive: true });
    for (const [h, n] of [["#/home", "home"], ["#/plan", "plan"], ["#/exercise/barbell-bench-press", "exercise"], ["#/library", "library"], ["#/onboarding", "onboarding"]]) { await p2.goto(URL + h); await wait(450); await p2.screenshot({ path: path.join(SHOTS, `vi-draft-preview-${n}.png`) }); }
    const font = await p2.evaluate(async () => { const s = document.createElement("p"); s.textContent = "Đẩy ngực ngang tạ đòn · Tuần · Bài tập · ơ ư ặ ễ ộ ữ"; document.querySelector("#screen").prepend(s); await document.fonts.ready; return getComputedStyle(s).fontFamily; });
    const cdp = await p2.target().createCDPSession(); await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
    const { root } = await cdp.send("DOM.getDocument"); const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: "#screen > p" });
    const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    await p2.screenshot({ path: path.join(SHOTS, "vi-diacritics-font.png") });
    check("Vietnamese diacritics render in ONE platform font (no per-glyph fallback)", fonts.length === 1, JSON.stringify(fonts) + " stack: " + font);
    console.log("   font used for Vietnamese in headless Chrome:", JSON.stringify(fonts));
    await p2.close();
  } catch (e) { check("script error: " + e.stack, false); }
  check("no page errors", errs.length === 0, errs.join(" | "));
  console.log(`\n${pass}/${pass + fail} checks passed`); await b.close(); process.exit(fail ? 1 : 0);
})();
