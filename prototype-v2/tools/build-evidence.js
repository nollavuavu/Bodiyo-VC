// Regenerates evidence.js (window.EVIDENCE = ...) from evidence.json so the prototype works from file:// without fetch.
// Also validates that every Why? key the app can request has an entry. Run: node tools/build-evidence.js
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const ev = JSON.parse(fs.readFileSync(path.join(root, "evidence.json"), "utf8"));
const ctx = { window: {} }; vm.createContext(ctx);
// Freshness guard: exercises.js must match the CURRENT exercises.json byte-for-byte (sha256), else rebuild it now.
{
  const exJson = path.join(root, "..", "exercises.json"), exJs = path.join(root, "exercises.js");
  if (fs.existsSync(exJson)) {
    const sha = require("crypto").createHash("sha256").update(fs.readFileSync(exJson)).digest("hex");
    const m = fs.existsSync(exJs) && /"sourceSha256":\s*"([0-9a-f]+)"/.exec(fs.readFileSync(exJs, "utf8"));
    if (!m || m[1] !== sha) { console.log("exercises.js is stale or missing; rebuilding from exercises.json"); require("child_process").execFileSync(process.execPath, [path.join(__dirname, "build-exercises.js")], { stdio: "inherit" }); }
  }
}
if (fs.existsSync(path.join(root, "exercises.js"))) vm.runInContext(fs.readFileSync(path.join(root, "exercises.js"), "utf8"), ctx);   // same library as the app
vm.runInContext(fs.readFileSync(path.join(root, "data.js"), "utf8"), ctx);
const D = ctx.window.CARLSEN_DATA;
const need = new Set();
Object.values(D.splits).forEach((s) => need.add(s.whyKey));
Object.keys(D.prescription.sets).forEach((l) => need.add(`sets.${l}`));
Object.keys(D.prescription.rir).forEach((l) => need.add(`rir.${l}`));
Object.keys(D.prescription.reps).forEach((g) => ["compound", "isolation"].forEach((t) => need.add(`reps.${g}.${t}`)));
["compound", "isolation"].forEach((t) => need.add(`rest.${t}`));
Object.keys(D.exercises).forEach((id) => { need.add(`exercise.${id}`); need.add(`lengthened.${id}`); });
D.conventions.forEach((r) => need.add(r.whyKey));
["exercise.custom", "principle.mechanical_tension", "volume.hard_sets", "onboarding.goal", "onboarding.days", "onboarding.experience", "onboarding.session_length", "onboarding.equipment",
  "weekly.hard_sets", "weekly.band", "deload.optional", "reminder.frequency", "reminder.session_sets", "plan.exercise_sets", "swap.similar", "progression.suggestion", "rir.input"].forEach((k) => need.add(k));
// keys referenced literally in app.js must exist too
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
for (const m of app.matchAll(/why\(\s*"([a-z_]+\.[a-z_.]+)"/g)) need.add(m[1]);
const missing = [...need].filter((k) => !ev.entries[k]);
const bad = Object.entries(ev.entries).filter(([, e]) => !Array.isArray(e.citations) || !e.oneLiner).map(([k]) => k);
fs.writeFileSync(path.join(root, "evidence.js"), "/* GENERATED from evidence.json by tools/build-evidence.js. Do not edit by hand. */\nwindow.EVIDENCE = " + JSON.stringify(ev, null, 2) + ";\n");
const ph = Object.entries(ev.entries).filter(([, e]) => e.status === "placeholder").map(([k]) => k);
const pend = Object.entries(ev.entries).filter(([, e]) => e.status === "pending").map(([k]) => k);
console.log(`evidence.js written: ${Object.keys(ev.entries).length} entries (${ph.length} placeholder${ph.length ? ": " + ph.join(", ") : ""}; ${pend.length} pending QA approval${pend.length ? ": " + pend.join(", ") : ""})`);
// QA gate self-check: no shipped entry may carry text from a topic that is not approved.
const bad2 = Object.entries(ev.entries).filter(([, e]) => e.status === "evidence" && !/round one|live/.test(e.approval || "") && !e.approval).map(([k]) => k);
if (bad2.length) { console.error("entries without an approval source:", bad2.join(", ")); process.exitCode = 1; }
if (missing.length) { console.error("MISSING keys:", missing.join(", ")); process.exitCode = 1; }
if (bad.length) { console.error("entries without citations array or oneLiner:", bad.join(", ")); process.exitCode = 1; }
