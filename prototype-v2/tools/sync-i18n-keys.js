// Generates the data-driven key families into the canonical English file /workspace/carlsen/i18n/en.json:
//   exercise.<id>.name, exercise.<id>.position (lengthenedPosition), exercise.<id>.cue.<n>  (from exercises.js, built from exercises.json)
//   exercise.gear.<equipment>, exercise.access.<key>, common.pattern.<slug>, muscle.<id>
// evidenceNote is evidence copy and is deliberately NOT keyed (stays English).
// Stale exercise.<id>.* keys (ids no longer in exercises.json) are removed. Hand-written keys are never touched.
// Run after build-exercises.js:  node tools/sync-i18n-keys.js
const fs = require("fs"), path = require("path"), vm = require("vm");
const { ACCESS_KEYS, GEAR, slug, muscleId, sentence } = require("./i18n-map.js");
const root = path.join(__dirname, ".."), enPath = path.join(root, "..", "i18n", "en.json");
const ctx = { window: {} }; vm.createContext(ctx);
const exPath = path.join(root, "exercises.js");
if (!fs.existsSync(exPath)) { console.log("sync-i18n-keys: no exercises.js, nothing to sync"); process.exit(0); }
vm.runInContext(fs.readFileSync(exPath, "utf8"), ctx);
const X = ctx.window.CARLSEN_EXERCISES, ex = X.exercises;
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const before = Object.keys(en).length;
const RESERVED = new Set(["gear", "access", "map", "rx"]);   // exercise.<family>.* hand/generated families, never ids
for (const k of Object.keys(en)) { const m = /^exercise\.([^.]+)\.(name|position|cue\.\d+)$/.exec(k); if (m && !RESERVED.has(m[1])) delete en[k]; }
for (const k of Object.keys(en)) if (/^(exercise\.gear|exercise\.access|common\.pattern|muscle)\./.test(k)) delete en[k];
const muscles = new Set(), patterns = new Set(), gears = new Set();
for (const [id, e] of Object.entries(ex)) {
  if (RESERVED.has(id)) throw new Error("exercise id collides with a reserved key family: " + id);
  en[`exercise.${id}.name`] = e.name;
  if (e.lengthened) en[`exercise.${id}.position`] = e.lengthened;
  (e.cues || []).forEach((c, n) => { en[`exercise.${id}.cue.${n + 1}`] = c; });
  e.primary.concat(e.secondary).forEach((m) => muscles.add(m));
  if (e.pattern) patterns.add(e.pattern);
  if (e.gear) gears.add(e.gear);
}
// Muscles: every muscle the app can show (exercises.js + data.js fallback lists).
const dctx = { window: {} }; vm.createContext(dctx); vm.runInContext(fs.readFileSync(exPath, "utf8") + "\n" + fs.readFileSync(path.join(root, "data.js"), "utf8"), dctx);
const D = dctx.window.CARLSEN_DATA;
D.trackedMuscles.concat(D.extraMuscles, ["Abs", "Adductors", "Spinal erectors", "Forearms"]).forEach((m) => muscles.add(m));
for (const m of muscles) en["muscle." + muscleId(m)] = m;
for (const p of patterns) en["common.pattern." + slug(p)] = sentence(p);
for (const g of gears) en["exercise.gear." + g] = GEAR[g] || sentence(g);
for (const [text, key] of Object.entries(ACCESS_KEYS)) en["exercise.access." + key] = text;
const sorted = Object.fromEntries(Object.keys(en).sort().map((k) => [k, en[k]]));
fs.writeFileSync(enPath, JSON.stringify(sorted, null, 2) + "\n");
const n = (re) => Object.keys(sorted).filter((k) => re.test(k)).length;
console.log(`en.json: ${before} -> ${Object.keys(sorted).length} keys | exercise names ${n(/^exercise\.[^.]+\.name$/)}, positions ${n(/\.position$/)}, cues ${n(/\.cue\.\d+$/)}, muscles ${n(/^muscle\./)}, patterns ${n(/^common\.pattern\./)}, gear ${n(/^exercise\.gear\./)}, access ${n(/^exercise\.access\./)}`);
