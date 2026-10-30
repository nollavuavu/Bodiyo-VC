const puppeteer = require("puppeteer-core");
const OUT = "/workspace/carlsen/prototype/screenshots/";
const URL = "file:///workspace/carlsen/prototype/index.html";
(async () => {
  const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args: ["--no-sandbox", "--allow-file-access-from-files"] });
  const pg = await b.newPage();
  await pg.setViewport({ width: 460, height: 900, deviceScaleFactor: 2 });
  const errs = [];
  pg.on("console", (m) => { if (["error", "warning"].includes(m.type())) errs.push(`${m.type()}: ${m.text()}`); });
  pg.on("pageerror", (e) => errs.push("pageerror: " + e.message));
  pg.on("dialog", (d) => d.accept());
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const go = async (h) => { await pg.evaluate((h) => (location.hash = h), h); await wait(350); };
  const shot = async (name, full = false) => {
    const el = await pg.$(".phone");
    if (full) { const h = await pg.evaluate(() => { const s = document.querySelector("#screen"); const h = s.scrollHeight + 44 + 10; document.querySelector(".phone").style.height = h + "px"; return h; }); await pg.setViewport({ width: 460, height: h + 120, deviceScaleFactor: 2 }); await wait(150); }
    await el.screenshot({ path: OUT + name + ".png" });
    if (full) { await pg.evaluate(() => (document.querySelector(".phone").style.height = "")); await pg.setViewport({ width: 460, height: 900, deviceScaleFactor: 2 }); await wait(150); }
    console.log("saved", name);
  };
  await pg.goto(URL); await pg.evaluate(() => localStorage.clear()); await pg.goto(URL + "#/onboarding"); await wait(400);
  // onboarding via real clicks
  await pg.click('[data-set=goal][data-val=hypertrophy]'); await pg.click('[data-set=experience][data-val=intermediate]');
  await pg.click('[data-set=days][data-val="4"]'); await pg.click('[data-set=sessionLength][data-val="60"]'); await pg.click('[data-set=equipment][data-val=gym]');
  await shot("01-onboarding"); await shot("01-onboarding-full", true);
  await pg.click('[data-action=finish-onboarding]'); await wait(400);
  // split verification for 2,4,6 days (+3,5)
  const results = {};
  for (const d of [2, 3, 4, 5, 6]) {
    await pg.evaluate((d) => { const p = JSON.parse(localStorage.getItem("carlsen.profile")); p.days = d; localStorage.setItem("carlsen.profile", JSON.stringify(p)); }, d);
    await go("#/plan"); await go("#/split");
    results[d] = await pg.evaluate(() => document.querySelector("h1").textContent + " | " + document.querySelector(".hero .big").textContent);
    if ([2, 4, 6].includes(d)) await shot(`02-split-${d}days`);
    if (d === 5) { await pg.click(".hero .why"); await wait(400); await shot("02-split-5days"); await pg.click("[data-close-sheet]"); await wait(300); }
  }
  console.log("SPLITS", JSON.stringify(results, null, 1));
  await pg.evaluate(() => { const p = JSON.parse(localStorage.getItem("carlsen.profile")); p.days = 4; localStorage.setItem("carlsen.profile", JSON.stringify(p)); });
  await go("#/plan"); await shot("03-weekly-plan"); await shot("03-weekly-plan-full", true);
  // Upper A (4-day, session 0): scroll to the biceps exercise
  await go("#/workout/0");
  const upperA = await pg.evaluate(() => [...document.querySelectorAll(".ex .ex-head b")].map((b) => b.textContent));
  console.log("Upper A exercises:", upperA.join(" | "));
  await pg.evaluate(() => { const ex = [...document.querySelectorAll(".ex")].find((e) => /Curl/.test(e.textContent)); document.querySelector("#screen").scrollTop = ex.offsetTop - 60; }); await wait(150);
  await shot("04c-upper-a-biceps");
  await pg.evaluate(() => (document.querySelector("#screen").scrollTop = 0));
  const ub = await pg.evaluate(async () => { location.hash = "#/workout/2"; await new Promise((r) => setTimeout(r, 200)); return [...document.querySelectorAll(".ex .ex-head b")].map((b) => b.textContent); });
  console.log("Upper B exercises:", ub.join(" | "));
  // workout: log sets
  await go("#/workout/0");
  await pg.type('[data-ex="0"] [data-set-row="0"] [data-f=kg]', "75"); await pg.type('[data-ex="0"] [data-set-row="0"] [data-f=reps]', "8"); await pg.type('[data-ex="0"] [data-set-row="0"] [data-f=rir]', "2");
  await pg.click('[data-ex="0"] [data-set-row="0"] [data-action=toggle-set]'); await wait(300);
  await pg.click('[data-ex="0"] [data-set-row="1"] [data-action=toggle-set]'); await wait(300);
  await pg.click('[data-action=stop-rest]'); await wait(100);
  await pg.click('[data-ex="1"] [data-set-row="0"] [data-action=toggle-set]'); await wait(300);
  await pg.evaluate(() => (document.querySelector("#screen").scrollTop = 0)); await wait(100);
  await shot("04-workout-logger");
  await pg.evaluate(() => { const s = document.querySelector("#screen"); s.scrollTop = s.scrollHeight; }); await wait(150); await shot("04b-workout-logger-rest-bottom");
  const overlap = await pg.evaluate(() => { const s = document.querySelector("#screen"), last = s.lastElementChild.getBoundingClientRect(), bar = document.querySelector("#resting").getBoundingClientRect(), tab = document.querySelector("#tabbar").getBoundingClientRect(); return { lastBottom: last.bottom, barTop: bar.top, barBottom: bar.bottom, tabTop: tab.top }; });
  console.log("rest bar geometry:", JSON.stringify(overlap));
  await pg.evaluate(() => (document.querySelector("#screen").scrollTop = 0));
  await shot("04-workout-logger-full", true);
  const persisted = await pg.evaluate(() => localStorage.getItem("carlsen.log.0"));
  await pg.reload(); await wait(400);
  const afterReload = await pg.evaluate(() => [...document.querySelectorAll(".chk.on")].length);
  console.log("localStorage log.0 present:", !!persisted, "| done sets after reload:", afterReload);
  // why panels
  await pg.click('[data-ex="0"] .stable .srow.head .why'); await wait(400); await shot("06-why-rir-evidence");
  await pg.evaluate(() => { const s = document.querySelector("#sheet"); s.scrollTop = s.scrollHeight; }); await wait(200); await shot("06a-why-rir-citations");
  await pg.click("[data-close-sheet]"); await wait(300);
  await pg.click('[data-ex="0"] .rest-line .why'); await wait(400); await shot("06b-why-rest-evidence"); await pg.click("[data-close-sheet]"); await wait(300);
  // finish -> summary
  await pg.click("[data-action=finish]"); await wait(500);
  await pg.click('[data-f=effort][data-val=Easy]'); await wait(150); await pg.click('[data-f=soreness][data-val=None]'); await wait(150); await pg.click('[data-f=performance][data-val=Better]'); await wait(200);
  await shot("07-workout-summary"); await shot("07-workout-summary-full", true);
  await go("#/home"); await shot("08-home-history"); await shot("08-home-history-full", true);
  await go("#/exercise/seated_leg_curl"); await shot("05-exercise-detail"); await shot("05-exercise-detail-full", true);
  await go("#/exercise/seated_leg_curl?why=lengthened.seated_leg_curl"); await wait(300); await shot("06c-why-lengthened-evidence");
  await pg.evaluate(() => { const n = document.querySelector("#sheet .cite-note"); n.closest(".cite").scrollIntoView({ block: "center" }); }); await wait(200);
  console.log("Maeo note rendered:", await pg.evaluate(() => [...document.querySelectorAll("#sheet .cite-note")].map((n) => n.textContent)));
  await shot("06f-why-lengthened-maeo-note");
  await go("#/onboarding");
  console.log("onboarding chips:", await pg.evaluate(() => [...document.querySelectorAll("[data-why]")].map((b) => b.dataset.why).join(",")));
  await go("#/onboarding?why=onboarding.experience"); await wait(300); await shot("06d-why-placeholder");
  await go("#/library"); await shot("09-library");
  await pg.type("#libsearch", "zzxq"); await wait(150);
  const empty = await pg.evaluate(() => ({ emptyVisible: !document.querySelector("#libempty").hidden, visibleItems: [...document.querySelectorAll("#liblist .lib-item")].filter((e) => e.style.display !== "none").length }));
  console.log("library empty state:", JSON.stringify(empty)); await shot("09b-library-no-results");
  await pg.click("#libsearch", { clickCount: 3 }); await pg.keyboard.press("Backspace"); await pg.type("#libsearch", "ham"); await wait(150);
  console.log("library 'ham' results:", await pg.evaluate(() => [...document.querySelectorAll("#liblist .lib-item")].filter((e) => e.style.display !== "none").length, "empty hidden:", ), await pg.evaluate(() => document.querySelector("#libempty").hidden));
  await go("#/you"); await shot("10-you");
  await go("#/split?why=split.upper_lower"); await wait(300); await shot("06e-why-split-evidence");
  // check every why key in DOM resolves
  const missing = await pg.evaluate(async () => {
    const miss = new Set(); const routes = ["#/onboarding", "#/split", "#/plan", "#/workout/0", "#/workout/1", "#/workout/2", "#/workout/3", "#/summary/latest", "#/home", "#/library", "#/you", ...Object.keys(window.CARLSEN_DATA.exercises).map((k) => "#/exercise/" + k)];
    for (const r of routes) { location.hash = r; await new Promise((x) => setTimeout(x, 60)); document.querySelectorAll("[data-why]").forEach((b) => { if (!window.EVIDENCE.entries[b.dataset.why]) miss.add(b.dataset.why); }); }
    return [...miss];
  });
  console.log("missing why keys:", missing);
  console.log("CONSOLE ERRORS:", errs.length ? errs : "none");
  await b.close();
})();
