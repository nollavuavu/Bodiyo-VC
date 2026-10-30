// Generates exercises.js (window.CARLSEN_EXERCISES) from /workspace/carlsen/exercises.json (Laurent) for file:// use.
// exercises.json is read-only here. App-side tweaks live in tools/exercise-app-overrides.json.
// evidenceNote is evidence copy: it is only included when tools/approved-topics.json has "exerciseNotes": true (off by default).
// If exercises.json is missing, exercises.js is removed and data.js falls back to its built-in library.
// Run: node tools/build-exercises.js [path/to/exercises.json]
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const src = path.resolve(process.argv[2] || path.join(root, "..", "exercises.json"));
const out = path.join(root, "exercises.js");
const { ACCESS_KEYS } = require("./i18n-map.js");
const O = JSON.parse(fs.readFileSync(path.join(__dirname, "exercise-app-overrides.json"), "utf8"));
const gate = JSON.parse(fs.readFileSync(path.join(__dirname, "approved-topics.json"), "utf8"));
if (!fs.existsSync(src)) { if (fs.existsSync(out)) fs.unlinkSync(out); console.log("no exercises.json: removed exercises.js, app uses data.js built-in library"); process.exit(0); }

const MUSCLES = ["chest", "front delts", "side delts", "rear delts", "lats", "upper back", "biceps", "triceps", "forearms", "quads", "hamstrings", "glutes", "calves", "abs"];
const PROFILE = { stretch: "lengthened", "mid-range": "mid", shortened: "shortened" };
const ACCESS = { barbell: ["gym"], machine: ["gym"], cable: ["gym"], dumbbell: ["gym", "db"], bodyweight: ["gym", "db", "bw"] };
const cap = (m) => m.charAt(0).toUpperCase() + m.slice(1);
// legacy library (for cues only)
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(root, "data.js"), "utf8"), ctx);
const legacy = ctx.window.CARLSEN_DATA.exercises;

const list = JSON.parse(fs.readFileSync(src, "utf8"));
const problems = [], exercises = {}, groups = {};
for (const e of list) {
  const where = e.id || JSON.stringify(e).slice(0, 40);
  if (!e.id || exercises[e.id]) problems.push(`${where}: missing or duplicate id`);
  for (const m of [].concat(e.primaryMuscles || [], e.secondaryMuscles || [])) if (!MUSCLES.includes(m)) problems.push(`${where}: unknown muscle "${m}"`);
  if (!(e.primaryMuscles || []).length) problems.push(`${where}: no primary muscle`);
  (e.secondaryMuscles || []).forEach((m) => { if ((e.primaryMuscles || []).includes(m)) problems.push(`${where}: "${m}" is both primary and secondary`); });
  if (!PROFILE[e.resistanceProfile]) problems.push(`${where}: unknown resistanceProfile "${e.resistanceProfile}"`);
  if (!ACCESS[e.equipment]) problems.push(`${where}: unknown equipment "${e.equipment}"`);
  if (!["high", "low"].includes(e.stability)) problems.push(`${where}: unknown stability "${e.stability}"`);
  if (!e.substitutionGroup) problems.push(`${where}: no substitutionGroup`);
  (groups[e.substitutionGroup] = groups[e.substitutionGroup] || []).push(e);
  const pattern = e.movementPattern || "";
  const x = {
    name: e.name, pattern, type: /^(isolation|core)-/.test(pattern) ? "isolation" : "compound",
    equip: O.access[e.id] || ACCESS[e.equipment] || ["gym"], gear: e.equipment,
    primary: (e.primaryMuscles || []).map(cap), secondary: (e.secondaryMuscles || []).map(cap),
    profile: PROFILE[e.resistanceProfile] || null, lengthened: e.lengthenedPosition || "", stability: e.stability, group: e.substitutionGroup
  };
  if (O.accessReasons[e.id]) { x.accessNote = O.accessReasons[e.id]; x.accessKey = ACCESS_KEYS[x.accessNote] || null; if (!x.accessKey) problems.push(`${where}: accessReasons text has no i18n key in tools/i18n-map.js`); }
  if ((O.templateAvoid || []).includes(e.id)) x.notForTemplates = true;
  if (gate.exerciseNotes === true && e.evidenceNote) x.evidenceNote = e.evidenceNote;
  exercises[e.id] = x;
}
// group checks (README: same primary muscle, same/adjacent profile, never stretch with shortened, >= 2 members except quads-knee-extension)
for (const [g, ms] of Object.entries(groups)) {
  if (ms.length < 2 && g !== "quads-knee-extension") problems.push(`group ${g}: only ${ms.length} member`);
  const prim = new Set(ms.map((m) => (m.primaryMuscles || [])[0])); if (prim.size > 1) problems.push(`group ${g}: mixed first primary muscles (${[...prim].join(", ")})`);
  const pr = new Set(ms.map((m) => m.resistanceProfile)); if (pr.has("stretch") && pr.has("shortened")) problems.push(`group ${g}: mixes stretch and shortened`);
}
const aliases = {};
for (const [old, nu] of Object.entries(O.legacyIds)) { if (nu && !exercises[nu]) problems.push(`override legacyIds.${old} -> ${nu}: not in exercises.json`); if (nu) aliases[old] = nu; }
for (const [old, nu] of Object.entries(O.renamedIds || {})) { if (old === "_doc") continue; if (exercises[old]) problems.push(`renamedIds.${old}: old id still exists`); else if (!exercises[nu]) problems.push(`renamedIds.${old} -> ${nu}: not in exercises.json`); else aliases[old] = nu; }
for (const old of O.cuesFromLegacy) { const nu = O.legacyIds[old]; if (nu && exercises[nu] && legacy[old] && legacy[old].cues) exercises[nu].cues = legacy[old].cues; }
for (const id of Object.keys(O.access).concat(O.templateAvoid || [])) if (!exercises[id]) problems.push(`override access.${id}: not in exercises.json`);

const srcBuf = fs.readFileSync(src);   // re-read on every build; nothing cached
const sourceSha256 = require("crypto").createHash("sha256").update(srcBuf).digest("hex");
const doc = { source: src, sourceSha256, sourceMtime: fs.statSync(src).mtime.toISOString(), generated: new Date().toISOString(), count: Object.keys(exercises).length, groups: Object.keys(groups).length,
  exerciseNotes: gate.exerciseNotes === true ? "shown (approved)" : "hidden (pending QA approval)", aliases, exercises };
fs.writeFileSync(out, "/* GENERATED from exercises.json by tools/build-exercises.js. Do not edit by hand. */\nwindow.CARLSEN_EXERCISES = " + JSON.stringify(doc, null, 1) + ";\n");
console.log(`exercises.js written: ${doc.count} exercises, ${doc.groups} substitution groups, evidence notes ${doc.exerciseNotes}`);
console.log(problems.length ? "data problems (for Laurent):\n  " + problems.join("\n  ") : "data checks: no problems");
