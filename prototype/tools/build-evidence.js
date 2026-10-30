// Regenerates evidence.js (window.EVIDENCE = ...) from evidence.json so the
// prototype works from file:// without fetch. Also validates that every whyKey
// used in data.js has an entry. Run: node tools/build-evidence.js
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const ev = JSON.parse(fs.readFileSync(path.join(root, "evidence.json"), "utf8"));
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "data.js"), "utf8"), ctx);
const D = ctx.window.CARLSEN_DATA;
const need = new Set();
Object.values(D.splits).forEach(s => need.add(s.whyKey));
Object.keys(D.prescription.sets).forEach(l => need.add(`sets.${l}`));
Object.keys(D.prescription.rir).forEach(l => need.add(`rir.${l}`));
Object.keys(D.prescription.reps).forEach(g => ["compound", "isolation"].forEach(t => need.add(`reps.${g}.${t}`)));
["compound", "isolation"].forEach(t => need.add(`rest.${t}`));
Object.keys(D.exercises).forEach(id => { need.add(`exercise.${id}`); need.add(`lengthened.${id}`); });
["principle.mechanical_tension","volume.hard_sets","checkin.adjustment","onboarding.goal","onboarding.days","onboarding.experience","onboarding.session_length","onboarding.equipment"].forEach(k => need.add(k));
const missing = [...need].filter(k => !ev.entries[k]);
const badCites = Object.entries(ev.entries).filter(([, e]) => !Array.isArray(e.citations)).map(([k]) => k);
fs.writeFileSync(path.join(root, "evidence.js"),
  "/* GENERATED from evidence.json by tools/build-evidence.js. Do not edit by hand. */\nwindow.EVIDENCE = " + JSON.stringify(ev, null, 2) + ";\n");
const ph = Object.values(ev.entries).filter(e => e.status === "placeholder").length;
console.log(`evidence.js written: ${Object.keys(ev.entries).length} entries (${ph} placeholder)`);
if (missing.length) { console.error("MISSING keys:", missing.join(", ")); process.exitCode = 1; }
if (badCites.length) { console.error("citations must be arrays:", badCites.join(", ")); process.exitCode = 1; }
