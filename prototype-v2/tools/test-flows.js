// End-to-end flows + edge cases + screenshots, headless Chrome over file://.
// Run: node tools/test-flows.js   (needs puppeteer-core; default path /workspace/carlsen-tools/node_modules)
const path = require("path"), fs = require("fs");
const puppeteer = require(process.env.PUPPETEER || "/workspace/carlsen-tools/node_modules/puppeteer-core");
const ROOT = path.join(__dirname, ".."), OUT = path.join(ROOT, "screenshots"), URL = "file://" + path.join(ROOT, "index.html");
const SHOTS = process.env.NO_SHOTS ? false : true;
(async () => {
  if (SHOTS) { fs.mkdirSync(OUT, { recursive: true }); for (const f of fs.readdirSync(OUT)) if (f.endsWith(".png")) fs.rmSync(path.join(OUT, f)); }  // keep subfolders (screenshots/i18n is test-i18n.js's)
  const b = await puppeteer.launch({ executablePath: "/usr/bin/google-chrome", headless: "new", args: ["--no-sandbox"] });
  const pg = await b.newPage();
  await pg.evaluateOnNewDocument(() => { window.__LIFT_TEST__ = true; });   // opt in to the test hook (window.__carlsen)
  await pg.emulateTimezone("Europe/Helsinki");
  await pg.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const errs = []; pg.on("console", (m) => { if (["error", "warning"].includes(m.type())) errs.push(`${m.type()}: ${m.text()}`); }); pg.on("pageerror", (e) => errs.push("pageerror: " + e.message));
  pg.on("dialog", (d) => { errs.push("native dialog used: " + d.message()); d.dismiss(); });
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  let pass = 0, fail = 0; const results = [];
  const check = (name, ok, info) => { results.push({ name, ok: !!ok }); ok ? pass++ : fail++; console.log(ok ? "PASS" : "FAIL", name, ok ? "" : (info || "")); };
  const go = async (h) => { await pg.evaluate((h) => (location.hash = h), h); await wait(300); };
  const click = async (sel, i = 0) => { const ok = await pg.evaluate((sel, i) => { const el = document.querySelectorAll(sel)[i]; if (!el) return false; el.scrollIntoView({ block: "center" }); el.click(); return true; }, sel, i); if (!ok) throw new Error("no element " + sel + " #" + i); await wait(250); };
  const clickText = async (sel, text) => { const ok = await pg.evaluate((sel, text) => { const el = [...document.querySelectorAll(sel)].find((e) => e.textContent.trim().includes(text)); if (!el) return false; el.scrollIntoView({ block: "center" }); el.click(); return true; }, sel, text); if (!ok) throw new Error(`no ${sel} with "${text}"`); await wait(300); };
  const type = async (sel, v) => { await pg.evaluate((sel) => { const el = document.querySelector(sel); el.scrollIntoView({ block: "center" }); el.focus(); el.value = ""; }, sel); await pg.type(sel, v); await wait(80); };
  const text = (sel) => pg.evaluate((sel) => [...document.querySelectorAll(sel)].map((e) => e.textContent.replace(/\s+/g, " ").trim()).join(" | "), sel);
  const LSget = (k) => pg.evaluate((k) => JSON.parse(localStorage.getItem("carlsen2." + k)), k);
  const LSset = (k, v) => pg.evaluate((k, v) => localStorage.setItem("carlsen2." + k, JSON.stringify(v)), k, v);
  const shot = async (name, opts = {}) => { if (!SHOTS) return; if (opts.top) await pg.evaluate(() => window.scrollTo(0, 0)); if (opts.sel) await pg.evaluate((s) => ([s, bl]) => document.querySelector(s).scrollIntoView({ block: bl }), [opts.sel, opts.block || "start"]); await wait(opts.wait || 350); await pg.screenshot({ path: path.join(OUT, name + ".png"), fullPage: !!opts.full }); };
  const sheetShot = async (name, opts = {}) => { if (!SHOTS) return; await wait(350); if (opts.scroll) await pg.evaluate((s) => { const el = document.querySelector(s); if (el) el.scrollIntoView({ block: "start" }); }, opts.scroll); await wait(150); await pg.screenshot({ path: path.join(OUT, name + ".png") }); };
  const S = (kg, reps, rir) => ({ kg: String(kg), reps: String(reps), rir: rir == null ? "" : String(rir), done: true });
  const daysAgo = (d, h = 18) => { const x = new Date(); x.setDate(x.getDate() - d); x.setHours(h, 0, 0, 0); return x.toISOString(); };

  try {
    // ---------- 1. onboarding -> split ----------
    await pg.goto(URL); await pg.evaluate(() => localStorage.clear()); await pg.goto(URL + "#/home"); await pg.reload(); await wait(400);
    check("fresh start routes to onboarding", (await pg.evaluate(() => location.hash)) === "#/onboarding");
    // Approval gate: onboarding Why? only where the entry is QA-approved (goal, days); experience / session length / equipment stay hidden.
    const obWhy = await pg.$$eval(".q", (qs) => qs.map((q) => !!q.querySelector(".why")));
    check("onboarding Why? shown for all five questions (13a/13b/13c approved ~19:00)", JSON.stringify(obWhy) === JSON.stringify([true, true, true, true, true]), JSON.stringify(obWhy));
    await click('[data-ob=days][data-v="4"]'); await click('[data-ob=equipment][data-v=gym]');
    await shot("01-onboarding", { top: true });
    await click('.q .why', 0); await sheetShot("01b-why-onboarding-goal");
    const ol = await text(".sheet .oneliner"); check("onboarding goal Why? shows an approved one-line answer", ol.length > 20 && !/placeholder|pending/i.test(ol), ol);
    await click("[data-research]"); await sheetShot("01c-why-onboarding-research", { scroll: "#research" });
    check("research expander shows citations", (await pg.$$eval(".cites li", (x) => x.length)) > 0);
    await click("[data-sheet-close]");
    await click("[data-act=ob-done]"); await wait(300);
    check("split reveal: Upper / Lower for 4 days", (await text("h1")) === "Upper / Lower");
    await shot("02-split", { top: true }); await shot("02b-split-full", { full: true });
    check("split shows no numeric weekly target band", !/10\s*[–-]\s*20|target band/i.test(await text("#screen")));
    await clickText("[data-act=alt]", "Full Body"); check("alternative split selectable", (await text("h1")) === "Full Body");
    await clickText("[data-act=alt]", "Upper / Lower"); check("switch back to recommended", (await text("h1")) === "Upper / Lower");
    await click("[data-act=use-rec]");
    await shot("03-home-empty", { top: true });
    check("home empty state teaches", /Finished workouts show up here/.test(await text("#screen")));

    // history: last week's Upper A (gives "Previous" + adaptive suggestion), plus Sun 23:30 / Mon 00:30 boundary sessions
    const rec = await pg.evaluate(() => window.CarlsenLogic.recommended(JSON.parse(localStorage.getItem("carlsen2.profile"))));
    const ua = rec.days[0].exercises.map((x) => x.exId);
    const r0 = await pg.evaluate(() => { const r = window.CarlsenLogic.weekRange(0); return { start: r.start.toISOString(), end: r.end.toISOString() }; });
    const mon0030 = new Date(r0.start); mon0030.setMinutes(30); const sun2330 = new Date(r0.start); sun2330.setMinutes(-30);
    const hist = [
      { id: "h-last", name: "Upper A", date: daysAgo(8), startedAt: daysAgo(8, 17), durationMin: 58, source: { splitId: "rec", splitName: "Upper / Lower", dayIndex: 0 },
        items: [{ exId: ua[0], sets: [S(80, 12, 2), S(80, 12, 2), S(80, 12, 1)] }, { exId: ua[1], sets: [S(60, 10, 2), S(60, 9, 2), S(60, 8, 0)] }, { exId: ua[2], sets: [S(70, 9, 2), S(70, 8, 2), S(70, 8, 5)] }] },
      { id: "h-sun", name: "Late session", date: sun2330.toISOString(), startedAt: sun2330.toISOString(), durationMin: 20, source: null, items: [{ exId: "one_arm_db_row", sets: [S(30, 10, 2), S(30, 10, 2)] }] },
      { id: "h-mon", name: "Midnight session", date: mon0030.toISOString(), startedAt: mon0030.toISOString(), durationMin: 20, source: null, items: [{ exId: "seated_leg_curl", sets: [S(40, 12, 2), S(40, 12, 2)] }] }
    ];
    await LSset("history", hist); await go("#/home"); await pg.reload(); await wait(400);

    // ---------- 2. split day -> workout ----------
    await click("[data-act=start-day]"); await wait(300);
    check("workout started from split day", (await text(".tb-name")) === "Upper A");
    const sug0 = await text(".exb:nth-of-type(1) .sugg");
    check("adaptive suggestion from last session (all sets at top -> +2.5 kg)", /82\.5 kg × 6/.test(sug0), sug0);
    const sug1 = await text(".exb:nth-of-type(2) .sugg"); check("suggestion holds load when last set was harder than target", /Hold/.test(sug1), sug1);
    const sug2 = await text(".exb:nth-of-type(3) .sugg"); check("suggestion adds weight when last set easier than target (T14 last set)", /72\.5 kg/.test(sug2), sug2);
    check("kg placeholder filled from suggestion", (await pg.$eval('.cell-in[data-f=kg]', (e) => e.placeholder)) === "82.5");
    await shot("04-workout", { top: true });

    // invalid inputs
    await type('.cell-in[data-f=kg][data-i="0"]', "-5"); await type('.cell-in[data-f=reps][data-i="0"]', "0"); await type('.cell-in[data-f=rir][data-i="0"]', "12");
    await click('[data-act=tick][data-i="0"]');
    const er = await text(".err-row"); check("invalid kg/reps/RIR blocks the tick with inline messages", /negative/.test(er) && /rep/i.test(er) && /RIR/.test(er), er);
    check("invalid set not marked done", !(await LSget("active")).items[0].sets[0].done);
    await shot("05-workout-invalid", { sel: ".exb", block: "start" });
    await type('.cell-in[data-f=kg][data-i="0"]', "82.5"); await type('.cell-in[data-f=reps][data-i="0"]', "8"); await type('.cell-in[data-f=rir][data-i="0"]', "2");
    await click('[data-act=tick][data-i="0"]');
    let A = await LSget("active");
    check("valid set ticks", A.items[0].sets[0].done && A.items[0].sets[0].kg === "82.5");
    check("rest timer starts at 2:30", /2:(30|29|28)/.test(await text("#restbar")), await text("#restbar"));
    await click('[data-act=tick][data-i="1"]'); A = await LSget("active");
    check("blank cells fill from placeholders (82.5 × 6)", A.items[0].sets[1].done && A.items[0].sets[1].kg === "82.5" && A.items[0].sets[1].reps === "6");
    check("blank RIR stays blank (assumed at target)", A.items[0].sets[1].rir === "");
    await shot("06-workout-logged-rest", { top: true });
    // zero weight on a loaded lift is allowed only explicitly
    await type('.exb:nth-of-type(3) .cell-in[data-f=kg][data-i="0"]', "0"); await type('.exb:nth-of-type(3) .cell-in[data-f=reps][data-i="0"]', "8");
    // (that exercise has history, so 0 is an explicit bodyweight entry)
    await click('.exb:nth-of-type(3) [data-act=tick][data-i="0"]'); A = await LSget("active");
    check("explicit 0 kg accepted", A.items[2].sets[0].done && A.items[2].sets[0].kg === "0");
    await click('.exb:nth-of-type(3) [data-act=tick][data-i="0"]'); A = await LSget("active"); check("tapping a done tick unticks it", !A.items[2].sets[0].done);

    // swap via the replace sheet -> Update plan (recommended -> personal copy)
    await click("[data-act=ex-menu]", 1); await sheetShot("07-exercise-menu");
    await click("[data-act=m-swap]"); await sheetShot("08-replace-best-match");
    const best = await text(".pick-row.best .pr-sub"); check("replace sheet ranks a Best match with a reason", /Same muscle/.test(best), best);
    const bestName = await text(".pick-row.best .pr-name");
    await click(".pick-row.best"); await sheetShot("09-replace-just-today-or-plan");
    check("swap offers Just today / Update plan", /Just today/.test(await text(".sheet")) && /Update plan too/.test(await text(".sheet")));
    await click('[data-act=swap-apply][data-plan="1"]');
    const sp = await LSget("splits"), prof = await LSget("profile");
    check("Update plan on recommended split creates 'my version' and makes it active", sp.length === 1 && /my version/.test(sp[0].name) && prof.activeSplitId === sp[0].id);
    A = await LSget("active");
    check("plan day updated with the swap", sp[0].days[0].exercises[1].exId === A.items[1].exId && A.items[1].exId !== ua[1]);
    check("workout now points at the personal copy", A.source.splitId === sp[0].id);
    check("swapped exercise is the best match", (await text(".exb:nth-of-type(2) .exname")) === bestName);

    // reorder + remove with undo
    const before = (await LSget("active")).items.map((x) => x.exId);
    await click("[data-act=ex-menu]", 3); await click("[data-act=m-up]");
    const after = (await LSget("active")).items.map((x) => x.exId);
    check("move up reorders", after[2] === before[3] && after[3] === before[2]);
    const nItems = after.length;
    await click("[data-act=ex-menu]", nItems - 1); await click("[data-act=m-remove]");
    check("remove deletes the exercise", (await LSget("active")).items.length === nItems - 1);
    await shot("10-removed-undo-toast", { wait: 200 });
    await click(".toast-act"); check("Undo restores it in place", (await LSget("active")).items.length === nItems && (await LSget("active")).items[nItems - 1].exId === after[nItems - 1]);
    await click("[data-act=ex-menu]", nItems - 1); await click("[data-act=m-remove]");
    // add from picker
    await click("[data-act=add-ex]"); await type("[data-pick-q]", "curl"); await sheetShot("11-add-exercise-picker");
    check("picker search filters", (await pg.$$eval("[data-pick-list] .pick-row", (x) => x.length)) >= 1 && /Curl/.test(await text("[data-pick-list]")));
    await type("[data-pick-q]", "zzzz"); check("picker no-results message", /No exercises match/.test(await text("[data-pick-list]")));
    await type("[data-pick-q]", "curl"); await click("[data-pick-list] .pick-row:not([disabled])");
    A = await LSget("active"); check("added exercise appended", /curl/i.test(A.items[A.items.length - 1].exId) && A.changes.add === 1);

    // refresh mid-workout
    const doneBefore = A.items[0].sets.filter((s) => s.done).length;
    await pg.reload(); await wait(500);
    A = await LSget("active");
    check("refresh mid-workout keeps the workout, ticks and edits", (await text(".tb-name")) === "Upper A" && A.items[0].sets.filter((s) => s.done).length === doneBefore);
    check("rest timer resumes after refresh", !(await pg.$eval("#restbar", (e) => e.hidden)));
    await shot("12-refresh-restored", { top: true });

    // swap an exercise that already has logged sets -> logged sets stay, new one starts fresh below
    await click("[data-act=ex-menu]", 0); await click("[data-act=m-swap]"); await click(".pick-row.best");
    check("swap note explains logged sets stay", /logged sets? of .* stay/.test(await text(".sheet")));
    await click('[data-act=swap-apply][data-plan="0"]');
    A = await LSget("active"); check("swap with done sets keeps them and inserts the new exercise after", A.items[0].sets.every((s) => s.done) && A.items[0].sets.length === 2 && A.items[1].swappedFrom === A.items[0].exId);

    // finish: unticked dialog -> plan dialog -> summary
    await click('.exb:nth-of-type(3) [data-act=tick][data-i="0"]');
    await click("[data-act=finish]"); await shot("13-finish-unticked-dialog", { wait: 200 });
    check("finish warns about unticked sets in-app", /not ticked/.test(await text("#dialog")));
    await clickText("#dialog button", "Finish workout");
    check("finish asks Keep plan / Update plan after add/remove/reorder", /Update Upper A in your plan/.test(await text("#dialog")));
    await shot("14-finish-update-plan-dialog", { wait: 200 });
    await clickText("#dialog button", "Keep plan");
    check("lands on summary", /#\/summary\//.test(await pg.evaluate(() => location.hash)));
    const sum = await text("#screen");
    check("summary has a friendly reminder with Why?", (await pg.$$eval(".notes .note .why", (x) => x.length)) >= 1, sum.slice(0, 300));
    check("summary has Next time suggestions", /Next time/.test(sum));
    await shot("15-summary", { top: true }); await shot("15b-summary-full", { full: true });
    check("active workout cleared and progress advanced", !(await LSget("active")) && (await LSget("splitProgress"))[sp[0].id] === 1);

    // ---------- 3. week ----------
    await go("#/week"); await shot("16-week", { top: true }); await shot("16b-week-full", { full: true });
    const wk = await text("#screen");
    check("week counts today's workout and the Mon 00:30 one, not Sun 23:30", /Midnight session/.test(wk) && !/Late session/.test(wk) && /Upper A/.test(wk));
    check("week shows ½ counting footnote with Why?", /helper-muscle sets ½/.test(wk) && (await pg.$$eval(".sec-why .why", (x) => x.length)) === 1);
    check("week shows no numeric weekly target", !/10\s*[–-]\s*20/.test(wk) && /no fixed weekly target/i.test(wk));
    await click('a[aria-label="Previous week"]'); const lw = await text("#screen");
    check("previous week has Sun 23:30 session (DST week 19–25 Oct handled)", /Late session/.test(lw) && /Upper A/.test(lw), lw.slice(0, 200));
    await shot("17-week-last", { top: true });
    await go("#/week/-5"); check("empty week state", /No workouts that week/.test(await text("#screen"))); await shot("18-week-empty", { top: true });
    // empty current week state is shown in a fresh profile at the end

    // ---------- 4. spontaneous workout + custom exercise ----------
    await go("#/train"); await click("[data-act=start-empty]");
    check("empty workout shows teaching empty state", /Add exercises as you go/.test(await text("#screen")));
    await shot("19-workout-empty", { top: true });
    await click("[data-act=add-ex]"); await click("[data-act=new-custom]");
    check("custom exercise form opens from picker", /New exercise/.test(await text(".tb-title")));
    await click("[data-act=cf-save]"); const cfe = await text(".err");
    check("custom form validation: name + primary required", /name/i.test(cfe) && /primary/i.test(cfe), cfe);
    await shot("20-custom-invalid", { top: true });
    await type("[data-cf-name]", "Barbell Bench Press"); await click('[data-cf=primary][data-v="Chest"]'); await click("[data-act=cf-save]");
    check("duplicate name rejected", /already exists/.test(await text(".err")));
    await type("[data-cf-name]", "Landmine Press");
    for (const m of ["Front delts", "Triceps", "Side delts"]) await click(`[data-cf=primary][data-v="${m}"]`);
    check("coaching note for many primaries (non-blocking)", /Most exercises load one to three muscles/.test(await text("[data-cf-coach]")));
    await shot("21-custom-coaching-note", { sel: "[data-cf-coach]", block: "center" });
    for (const m of ["Front delts", "Triceps", "Side delts"]) await click(`[data-cf=primary][data-v="${m}"]`);
    await click('[data-cf=secondary][data-v="Front delts"]'); await click('[data-cf=secondary][data-v="Triceps"]'); await click('[data-cf=profile][data-v="mid"]');
    await type("[data-cf-notes]", "Bar in a corner landmine, half-kneeling.");
    await shot("21b-custom-form", { top: true });
    await click("[data-act=cf-save]"); await wait(400);
    A = await LSget("active");
    check("custom exercise saved and added to the spontaneous workout", A && A.items.length === 1 && /^c_/.test(A.items[0].exId));
    const cid = A.items[0].exId;
    check("custom has secondaries and notes", (await LSget("customExercises"))[cid].secondary.length === 2);
    await click("[data-act=ex-menu]"); await click("[data-act=m-swap]");
    check("swap for a custom exercise lists same-muscle options", /Best match/.test(await text(".sheet")) && /Same muscle/.test(await text(".pick-row.best")));
    await sheetShot("22-swap-custom-exercise");
    await click("[data-sheet-close]");
    check("custom exercise placeholder asks for kg (no history)", (await pg.$eval('.cell-in[data-f=kg]', (e) => e.placeholder)) === "kg");
    await click('[data-act=tick][data-i="0"]'); check("blank kg on a loaded lift with no history asks for the weight", /Enter the weight/.test(await text(".err-row")));
    for (const i of [0, 1, 2]) { await type(`.cell-in[data-f=kg][data-i="${i}"]`, "40"); await type(`.cell-in[data-f=reps][data-i="${i}"]`, "10"); await type(`.cell-in[data-f=rir][data-i="${i}"]`, "2"); await click(`[data-act=tick][data-i="${i}"]`); }
    await shot("23-spontaneous-logged", { top: true });
    await click("[data-act=finish]"); await wait(300);
    check("spontaneous workout: no plan dialog, straight to summary", /#\/summary\//.test(await pg.evaluate(() => location.hash)));
    const wst = await pg.evaluate(() => { const r = window.CarlsenLogic.weekRange(0); return window.CarlsenLogic.weekStats(JSON.parse(localStorage.getItem("carlsen2.history")), r.start, r.end, JSON.parse(localStorage.getItem("carlsen2.customExercises"))); });
    check("week counts the spontaneous workout (3 workouts, chest includes landmine)", wst.workouts.length === 3 && wst.muscles.Chest.hard >= 5, JSON.stringify(wst.muscles.Chest));

    // discard flow + zero-set finish
    await go("#/train"); await click("[data-act=start-empty]"); await click("[data-act=finish]");
    check("finishing with zero sets offers keep going / discard", /No sets ticked yet/.test(await text("#dialog")));
    await clickText("#dialog button", "Discard workout"); check("discard clears the workout", !(await LSget("active")));

    // ---------- 5. builder ----------
    await go("#/plan"); await clickText("a.btn", "New split");
    await type("[data-b=name]", "Push Pull"); await type("[data-b=day]", "Push");
    await click('[data-act=b-add-ex][data-i="0"]'); await type("[data-pick-q]", "bench press"); await click("[data-pick-list] .pick-row");
    await click('[data-act=b-add-ex][data-i="0"]'); await type("[data-pick-q]", "landmine"); await click("[data-pick-list] .pick-row");
    for (let k = 0; k < 3; k++) await click('[data-act=b-sets][data-i="0"][data-j="0"][data-d="1"]');
    await click("[data-act=b-add-day]"); await type('[data-b=day][data-i="1"]', "Pull");
    await click('[data-act=b-add-ex][data-i="1"]'); await type("[data-pick-q]", "pulldown"); await click("[data-pick-list] .pick-row");
    const notesB = await text(".notes");
    check("builder shows gentle coaching notes", /one direct session a week/.test(notesB) && /sets per exercise is the guide/.test(notesB), notesB);
    await shot("24-builder", { top: true }); await shot("24b-builder-full", { full: true });
    await click("[data-act=b-save]");
    const sp2 = await LSget("splits"), pp = sp2.find((s) => s.name === "Push Pull");
    check("builder saves despite notes and sets it active", pp && (await LSget("profile")).activeSplitId === pp.id && pp.days[0].exercises[0].sets === 6 && pp.days[0].exercises.some((x) => /^c_/.test(x.exId)));
    await shot("25-plan-custom-split", { top: true });
    // edit & cancel with unsaved changes
    await go("#/builder/" + pp.id); await type("[data-b=name]", "Push Pull 2"); await click("[data-act=b-cancel]");
    check("cancel with unsaved changes asks first", /Discard changes/.test(await text("#dialog"))); await clickText("#dialog button", "Discard");
    check("cancel keeps the saved name", (await LSget("splits")).find((s) => s.id === pp.id).name === "Push Pull");
    // empty day + empty split still save
    await go("#/builder/new"); await click('[data-act=b-day-del][data-i="0"]'); await click("[data-act=b-save]");
    check("a split with no days still saves (never blocked)", (await LSget("splits")).some((s) => s.name === "My split" && s.days.length === 0));
    await go("#/plan"); await clickText(".row .btn-sm", "Use");

    // ---------- 6. community ----------
    await go("#/community"); await shot("26-community", { top: true });
    check("community list: 4-6 splits labelled Sample data", (await pg.$$eval(".rows .row", (x) => x.length)) >= 4 && /Sample data/.test(await text("#screen")));
    await go("#/community/c-bro5"); await shot("27-community-detail", { top: true }); await shot("27b-community-detail-full", { full: true });
    check("community split shows plan-analysis notes with Why?", (await pg.$$eval(".notes .why", (x) => x.length)) >= 2);
    await click("[data-act=copy-community]"); await click("[data-act=copy-community]");
    const cps = (await LSget("splits")).filter((s) => s.source && s.source.communityId === "c-bro5").map((s) => s.name);
    check("copying twice makes '(copy)' and '(copy 2)'", cps.length === 2 && cps[0] === "Classic Bro Split (copy)" && cps[1] === "Classic Bro Split (copy 2)", cps.join(", "));
    await shot("28-community-copied", { wait: 200 });

    // ---------- 7. next session: adaptive suggestion ----------
    await go("#/plan"); await clickText(".row .btn-sm", "Use"); // first non-active split in list = Upper / Lower (my version)
    await LSset("ui", { trainTab: "mine" }); await go("#/train"); await shot("29-train-my-splits", { top: true });
    const myv = (await LSget("splits"))[0];
    await pg.evaluate((id) => { const p = JSON.parse(localStorage.getItem("carlsen2.profile")); p.activeSplitId = id; localStorage.setItem("carlsen2.profile", JSON.stringify(p)); const pr = JSON.parse(localStorage.getItem("carlsen2.splitProgress")); pr[id] = 0; localStorage.setItem("carlsen2.splitProgress", JSON.stringify(pr)); }, myv.id);
    await go("#/home"); await shot("30-home-next-up", { top: true }); await shot("30b-home-full", { full: true });
    await click("[data-act=start-day]");
    const ns = await text(".exb:nth-of-type(1) .sugg"); // exercise 1 was logged earlier today
    check("next session shows an adaptive suggestion from today's log", /Next|Hold/.test(ns), ns);
    await shot("31-next-session-suggestion", { top: true });
    await click(".sugg .why"); await sheetShot("32-why-progression");
    check("progression Why? (topic 9, approved) shows the T9 one-liner and a research disclosure", /double progression|top of the range/i.test(await text(".sheet .oneliner")) && !!(await pg.$("[data-research]")), await text(".sheet .oneliner"));
    await click("[data-sheet-close]");
    await click('.sets th:nth-child(5)').catch(() => {});
    await click("[data-act=rx]"); await sheetShot("33-prescription-sheet");
    await clickText(".rx-row", "Logging RIR"); await sheetShot("33b-why-rir-input");
    check("RIR logging Why? opens T14 entry", /RIR/.test(await text(".sheet .why-title")));
    await click("[data-sheet-close]");
    // start conflict
    await go("#/community/c-fb3"); await click("details summary"); await click("[data-act=start-day]");
    check("starting a second workout asks in-app", /already in progress/.test(await text("#dialog"))); await shot("34-start-conflict", { wait: 200 });
    await clickText("#dialog button", "Resume current"); check("resume keeps the current workout", (await text(".tb-name")) === "Upper A");
    await go("#/home"); check("minimised workout shows resume bar", !(await pg.$eval("#minibar", (e) => e.hidden))); await shot("35-home-resume-bar", { top: true });
    await go("#/workout"); await click("[data-act=discard]"); await clickText("#dialog button", "Discard");

    // ---------- 8. library / detail / delete custom / you ----------
    await go("#/library"); await shot("36-library", { top: true });
    await type("[data-lib-q]", "xyz"); check("library no-results message", /No exercises match/.test(await text("[data-lib-list]"))); await shot("36b-library-no-results", { top: true });
    await type("[data-lib-q]", "");
    await go("#/exercise/romanian_deadlift"); await shot("37-exercise-detail", { top: true }); await shot("37b-exercise-detail-full", { full: true });
    // exercises.json library (approved 18:06): evidence notes shown, new ids routable, renamed id still resolves
    await go("#/exercise/barbell-bench-press"); await shot("37c-exercise-research-note", { full: true });
    check("approved exercise evidence note is shown", /Research note/.test(await text("#screen")) && /8-week trial/.test(await text("#screen")));
    for (const id of ["cable-rear-delt-row", "machine-dip", "lying-dumbbell-triceps-extension"]) { await go("#/exercise/" + id); check("new exercise " + id + " renders", !/not found|unknown/i.test(await text("#screen h1")) && (await text("#screen h1")).length > 3, await text("#screen h1")); }
    await go("#/exercise/reverse-barbell-curl"); check("renamed id reverse-barbell-curl resolves to reverse-ez-bar-curl", /Reverse-Grip \(Overhand\) EZ-Bar Curl/.test(await text("#screen h1")), await text("#screen h1"));
    await go("#/exercise/romanian_deadlift"); check("exercise without an approved note shows none", !/Research note/.test(await text("#screen")));
    await go("#/exercise/" + cid); await shot("38-custom-exercise-detail", { top: true });
    await click("[data-act=ex-delete]"); await clickText("#dialog button", "Delete");
    check("deleted custom leaves library but history still counts it", !(/Landmine/.test(await text("[data-lib-list]"))) && (await pg.evaluate((cid) => { const r = window.CarlsenLogic.weekRange(0); return window.CarlsenLogic.weekStats(JSON.parse(localStorage.getItem("carlsen2.history")), r.start, r.end, JSON.parse(localStorage.getItem("carlsen2.customExercises"))).muscles.Chest.hard; }, cid)) >= 5);
    await go("#/builder/" + pp.id); check("split using a deleted custom still renders it", /Landmine Press/.test(await text("#screen"))); await click("[data-act=b-cancel]");
    await go("#/you"); await shot("39-you", { top: true }); await shot("39b-you-full", { full: true });
    check("You screen states the approval status (all 17 topics approved, 13 not counted)", /all 17 topics QA-approved \(topics 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13a, 13b, 13c, 14 and 15\)/.test(await text("#screen")), (await text("#screen")).match(/Evidence:[^.]*\./));
    await go("#/plan"); await shot("40-plan", { top: true }); await shot("40b-plan-full", { full: true });
    await click(".deload .why"); check("deload Why? (T15) on plan", /deload/i.test(await text(".sheet"))); await sheetShot("41-why-deload"); await click("[data-sheet-close]");
    await go("#/week"); await click(".sec-why .why"); await sheetShot("42-why-weekly-hard-sets"); check("weekly Why? mentions ½ counting", /½|half/i.test(await text(".sheet"))); await click("[data-sheet-close]");
    await go("#/you"); await click("[data-act=reset]"); await shot("43-reset-dialog", { wait: 200 }); await clickText("#dialog button", "Reset everything");
    check("reset returns to onboarding with no carlsen2 keys left", (await pg.evaluate(() => location.hash)) === "#/onboarding" && (await pg.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith("carlsen2.")).length)) === 0);
    await click("[data-act=ob-done]"); await click("[data-act=use-rec]"); await go("#/week"); await shot("44-week-empty-current", { top: true });
    check("current empty week teaches + offers start", /Nothing logged yet this week/.test(await text("#screen")));
    // corrupted storage does not crash
    await pg.evaluate(() => { localStorage.setItem("carlsen2.history", "{not json"); localStorage.setItem("carlsen2.active", "42"); }); await pg.reload(); await wait(400);
    check("corrupted storage: week screen still renders", /Nothing logged/.test(await text("#screen")));
    await go("#/"); check("corrupted storage: home falls back safely", (await text("h1")) === "Today");
    // v1 keys untouched / not used
    check("only carlsen2. keys are written", await pg.evaluate(() => Object.keys(localStorage).every((k) => k.startsWith("carlsen2."))));
  } catch (e) { check("script error: " + e.message, false); await pg.screenshot({ path: "/tmp/flow-error.png" }); }
  check("zero console errors / warnings / native dialogs", errs.length === 0, errs.join("\n"));
  console.log(`\n${pass}/${pass + fail} checks passed`);
  fs.writeFileSync(path.join(ROOT, "tools", "last-test-results.json"), JSON.stringify({ when: new Date().toISOString(), pass, fail, results, errs }, null, 1));
  await b.close(); if (fail) process.exitCode = 1;
})();
