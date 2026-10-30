// Unit tests for logic.js (node tools/test-logic.js). No dependencies.
const fs = require("fs"), path = require("path"), vm = require("vm"), assert = require("assert");
const root = path.join(__dirname, "..");
const ctx = { window: {} }; ctx.self = ctx.window; vm.createContext(ctx);
// i18n first (as in index.html): generated dictionaries + runtime. Tests run in English.
vm.runInContext(fs.readFileSync(path.join(root, "i18n.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(root, "i18n-runtime.js"), "utf8").replace(/typeof self !== "undefined" \? self : this/, "window"), ctx);
if (!process.env.BUILTIN && fs.existsSync(path.join(root, "exercises.js"))) vm.runInContext(fs.readFileSync(path.join(root, "exercises.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(root, "data.js"), "utf8"), ctx);
const D = ctx.window.CARLSEN_DATA, I18N = ctx.window.I18N, L = require(path.join(root, "logic.js"))(D, I18N);
let n = 0, fail = 0;
const t = (name, fn) => { n++; try { fn(); console.log("ok  ", name); } catch (e) { fail++; console.log("FAIL", name, "\n     ", e.message); } };
const P = { goal: "hypertrophy", experience: "intermediate", days: 4, sessionLength: 60, equipment: "gym" };
const S = (kg, reps, rir) => ({ kg: String(kg), reps: String(reps), rir: rir == null ? "" : String(rir), done: true });
const W = (date, items) => ({ id: "w" + Math.random(), date, items: items.map(([exId, sets]) => ({ exId, sets })) });

t("validateSet: blank kg ok (bodyweight), negative / text / >1000 rejected", () => {
  assert.deepStrictEqual(L.validateSet({ kg: "", reps: "8", rir: "2" }), {});
  assert.ok(L.validateSet({ kg: "-5", reps: "8" }).kg.includes("negative"));
  assert.ok(L.validateSet({ kg: "abc", reps: "8" }).kg);
  assert.ok(L.validateSet({ kg: "1001", reps: "8" }).kg);
  assert.deepStrictEqual(L.validateSet({ kg: "0", reps: "8" }), {});
  assert.deepStrictEqual(L.validateSet({ kg: "62,5", reps: "8" }), {});
});
t("validateSet: reps 1-100 integers; RIR 0-10 in .5 steps", () => {
  assert.ok(L.validateSet({ kg: "50", reps: "" }).reps);
  assert.ok(L.validateSet({ kg: "50", reps: "0" }).reps);
  assert.ok(L.validateSet({ kg: "50", reps: "8.5" }).reps);
  assert.ok(L.validateSet({ kg: "50", reps: "101" }).reps);
  assert.ok(L.validateSet({ kg: "50", reps: "8", rir: "11" }).rir);
  assert.ok(L.validateSet({ kg: "50", reps: "8", rir: "-1" }).rir);
  assert.ok(L.validateSet({ kg: "50", reps: "8", rir: "1.3" }).rir);
  assert.deepStrictEqual(L.validateSet({ kg: "50", reps: "8", rir: "1.5" }), {});
});
t("hard set = done and RIR <= 3 (blank RIR counts)", () => {
  assert.strictEqual(L.isHard(S(50, 8, 3)), true);
  assert.strictEqual(L.isHard(S(50, 8, 3.5)), false);
  assert.strictEqual(L.isHard(S(50, 8, null)), true);
  assert.strictEqual(L.isHard({ kg: "50", reps: "8", rir: "1", done: false }), false);
});
t("secondary muscles count 1/2 (bench: chest 3, triceps 1.5)", () => {
  const per = L.workoutMuscles(W(new Date(), [["barbell_bench_press", [S(60, 8, 2), S(60, 8, 2), S(60, 8, 5)]]]), {});
  assert.strictEqual(per.Chest.sets, 2); assert.strictEqual(per.Triceps.sets, 1); assert.strictEqual(per.Chest.direct, true); assert.ok(!per.Triceps.direct);
});
t("weekStart is local Monday 00:00; Sun 23:30 and Mon 00:30 fall in different weeks", () => {
  const sun = new Date(2026, 10, 1, 23, 30), mon = new Date(2026, 10, 2, 0, 30);
  assert.strictEqual(L.weekStart(sun).getDate(), 26); assert.strictEqual(L.weekStart(mon).getDate(), 2);
  assert.strictEqual(L.weekStart(mon).getHours(), 0);
});
t("week across the DST change (Sun 25 Oct 2026) still runs Mon 26 Oct - Mon 2 Nov, and 19-26 Oct", () => {
  const r = L.weekRange(0, new Date(2026, 9, 29, 12)); assert.strictEqual(r.start.getDate(), 26); assert.strictEqual(r.end.getDate(), 2); assert.strictEqual(r.end.getHours(), 0);
  const p = L.weekRange(-1, new Date(2026, 9, 29, 12)); assert.strictEqual(p.start.getDate(), 19); assert.strictEqual(p.end.getDate(), 26); assert.strictEqual(p.end.getHours(), 0);
  const h = [W(new Date(2026, 9, 25, 3, 30).toISOString(), [["barbell_bench_press", [S(60, 8, 2)]]]), W(new Date(2026, 9, 26, 0, 10).toISOString(), [["lat_pulldown", [S(50, 10, 2)]]])];
  assert.strictEqual(L.weekStats(h, p.start, p.end, {}).workouts.length, 1);
  assert.strictEqual(L.weekStats(h, r.start, r.end, {}).workouts.length, 1);
});
t("weekStats counts sessions only where the muscle is primary", () => {
  const r = L.weekRange(0, new Date(2026, 9, 29));
  const h = [W(new Date(2026, 9, 26, 18).toISOString(), [["barbell_bench_press", [S(60, 8, 2), S(60, 8, 2)]]]), W(new Date(2026, 9, 28, 18).toISOString(), [["db_bench_press", [S(24, 10, 2)]]])];
  const st = L.weekStats(h, r.start, r.end, {});
  assert.strictEqual(st.muscles.Chest.sessions, 2); assert.strictEqual(st.muscles.Chest.hard, 3); assert.strictEqual(st.muscles.Triceps.sessions, 0); assert.strictEqual(st.muscles.Triceps.hard, 1.5);
});
t("empty week -> no reminders", () => { const r = L.weekRange(0); assert.deepStrictEqual(L.weeklyReminders(L.weekStats([], r.start, r.end, {}), L.recommended(P), {}, {}), []); });
t("weekly reminder is friendly and names the next plan day", () => {
  const r = L.weekRange(0, new Date(2026, 9, 29)), plan = L.recommended(P);
  const h = [W(new Date(2026, 9, 26, 18).toISOString(), plan.days[0].exercises.map((x) => [x.exId, [S(50, 8, 2), S(50, 8, 2), S(50, 8, 2)]]))];
  const rem = L.weeklyReminders(L.weekStats(h, r.start, r.end, {}), plan, {}, { nextIndex: 1 });
  assert.ok(rem.length >= 1 && rem.length <= 3); assert.ok(/^Heads up/.test(rem[0].text), rem[0].text); assert.ok(!/!|warning|danger|must/i.test(rem.map((x) => x.text).join(" ")));
  rem.forEach((x) => assert.strictEqual(x.whyKey, "reminder.frequency"));
});
t("session reminder only when a muscle exceeds ~8 hard sets; soft wording", () => {
  const low = W(new Date(), [["barbell_bench_press", Array(8).fill(S(60, 8, 2))]]), hi = W(new Date(), [["barbell_bench_press", Array(9).fill(S(60, 8, 2))]]);
  assert.strictEqual(L.sessionReminders(low, {}).length, 0);
  const r = L.sessionReminders(hi, {}); assert.strictEqual(r.length, 1); assert.ok(/cautious default/.test(r[0].text) && /Nothing is capped/.test(r[0].text));
});
t("suggestion (T9 double progression): +1 rep inside range", () => {
  const s = L.suggestion("barbell_bench_press", [S(80, 8, 2), S(80, 7, 2), S(80, 7, 2)], L.rx("barbell_bench_press", P, {}));
  assert.strictEqual(s.kg, "80"); assert.strictEqual(s.reps, "9"); assert.ok(!s.hold);
});
t("suggestion: every set at top of range -> +2.5 kg and restart at bottom", () => {
  const s = L.suggestion("barbell_bench_press", [S(80, 12, 2), S(80, 12, 2)], L.rx("barbell_bench_press", P, {}));
  assert.strictEqual(s.kg, "82.5"); assert.strictEqual(s.reps, "6");
});
t("suggestion: last set easier than target RIR (T14 weights last set) -> add weight", () => {
  const s = L.suggestion("barbell_bench_press", [S(80, 8, 2), S(80, 8, 5)], L.rx("barbell_bench_press", P, {}));
  assert.strictEqual(s.kg, "82.5");
});
t("suggestion: harder than target -> hold load", () => {
  const s = L.suggestion("barbell_bench_press", [S(80, 8, 2), S(80, 6, 0)], L.rx("barbell_bench_press", P, {}));
  assert.strictEqual(s.hold, true); assert.strictEqual(s.kg, "80");
});
t("suggestion: small loads step 1 kg; bodyweight adds a rep; no history -> null", () => {
  assert.strictEqual(L.suggestion("db_lateral_raise", [S(8, 20, 1), S(8, 20, 1)], L.rx("db_lateral_raise", P, {})).kg, "9");
  const bw = L.suggestion("push_up", [S("", 15, 2)], L.rx("push_up", P, {})); assert.strictEqual(bw.kg, ""); assert.strictEqual(bw.reps, "16");
  assert.strictEqual(L.suggestion("push_up", [], L.rx("push_up", P, {})), null);
});
t("swapCandidates: same primary muscle, best match shares pattern + profile, excludes in-workout", () => {
  const c = L.swapCandidates("barbell_bench_press", P, {}, ["barbell_bench_press", "push_up"]);
  assert.ok(c.length); c.forEach((x) => assert.ok(x.ex.primary.includes("Chest"))); assert.ok(!c.some((x) => x.id === L.canon("push_up")));
  assert.strictEqual(c[0].ex.pattern, L.ex("barbell_bench_press").pattern); assert.ok(/Same muscle/.test(c[0].reasons.join(" ")));
  if (D.slotSpecs) {   // exercises.json: same substitutionGroup ranks first, then same/adjacent profile
    const t = L.ex("barbell_bench_press"), grp = Object.keys(D.exercises).filter((k) => D.exercises[k].group === t.group && k !== t.id && k !== L.canon("push_up"));
    assert.deepStrictEqual(c.slice(0, grp.length).map((x) => x.id).sort(), grp.sort());
    assert.ok(c[0].sameGroup && /same movement family/.test(c[0].reasons.join(" ")));
    const after = c.slice(grp.length); assert.ok(after.length && !after.some((x) => x.sameGroup));
    // never rank a profile two steps away (stretch vs shortened) above an adjacent one outside the group
    const fly = L.swapCandidates("cable-fly-mid", P, {}, []); assert.ok(fly[0].sameGroup);
  }
});
t("exercises.json: legacy v1 ids resolve, 14 muscles tracked, evidence notes follow the approval gate", () => {
  if (!D.slotSpecs) return;
  assert.strictEqual(L.ex("barbell_bench_press").id, "barbell-bench-press"); assert.strictEqual(D.trackedMuscles.length, 14);
  Object.values(D.exercises).forEach((e) => { e.primary.concat(e.secondary).forEach((m) => assert.ok(D.trackedMuscles.includes(m), m)); if (ctx.window.CARLSEN_EXERCISES.exerciseNotes.startsWith("hidden")) assert.ok(!("evidenceNote" in e)); });
  const src = JSON.parse(fs.readFileSync(path.join(root, "..", "exercises.json"), "utf8"));
  assert.strictEqual(Object.keys(D.exercises).length, src.length, "exercises.js matches current exercises.json count");
  D.communitySplits.forEach((c) => c.days.forEach((d) => d.exercises.forEach((x) => assert.ok(D.exercises[x.exId], x.exId))));
});
t("swapCandidates works for a custom exercise and lists customs as options", () => {
  const cu = { c_land: { name: "Landmine Press", primary: ["Chest"], secondary: ["Front delts"], equip: ["gym"], type: "compound", profile: "mid" } };
  const from = L.swapCandidates("c_land", P, cu, ["c_land"]); assert.ok(from.length && from.every((x) => x.ex.primary.includes("Chest")));
  const to = L.swapCandidates("barbell_bench_press", P, cu, ["barbell_bench_press"]); assert.ok(to.some((x) => x.id === "c_land"));
  cu.c_land.archived = true; assert.ok(!L.swapCandidates("barbell_bench_press", P, cu, []).some((x) => x.id === "c_land"));
});
t("unknown / deleted exercise renders as a stub and never throws", () => {
  const e = L.ex("nope", {}); assert.ok(e.missing); assert.doesNotThrow(() => L.workoutMuscles(W(new Date(), [["nope", [S(1, 1, 1)]]]), {}));
});
t("analysePlan: never empty for bro split, merged per-session note, empty split note", () => {
  const bro = D.communitySplits.find((c) => c.id === "c-bro5"), n = L.analysePlan(bro, {});
  assert.ok(n.some((x) => x.kind === "frequency")); assert.strictEqual(n.filter((x) => x.kind === "session-high").length, 1);
  assert.strictEqual(L.analysePlan({ days: [] }, {})[0].kind, "empty");
});
t("recommended split for 2-6 days; every exercise fits equipment", () => {
  for (const d of [2, 3, 4, 5, 6]) for (const eq of ["gym", "db", "bw"]) {
    const r = L.recommended(Object.assign({}, P, { days: d, equipment: eq }));
    assert.strictEqual(r.days.length, d); r.days.forEach((day) => day.exercises.forEach((x) => assert.ok(D.exercises[x.exId].equip.includes(eq), x.exId + " " + eq)));
  }
});
t("rules carry no numeric weekly band (T10) and the session guide is soft (T12)", () => { assert.strictEqual(D.rules.weeklyBand, null); assert.deepStrictEqual([...D.rules.sessionSets], [3, 8]); });
console.log(`\n${n - fail}/${n} passed`); if (fail) process.exitCode = 1;
