// Shared i18n key map for generated key families (used by build-exercises.js and sync-i18n-keys.js).
// Data text -> stable key. Changing an English text here does not change the key.
const ACCESS_KEYS = {
  "needs dip bars": "dipBars",
  "needs a bar": "bar",
  "needs a bar or sturdy table": "barOrTable",
  "can be done unloaded (rear foot on a chair)": "unloaded",
  "needs a 45° back-extension bench": "backExtBench"
};
const GEAR = { barbell: "Barbell", dumbbell: "Dumbbell", machine: "Machine", bodyweight: "Bodyweight", cable: "Cable" };
// "isolation-elbow-flexion" -> "isolationElbowFlexion", "horizontal push" -> "horizontalPush"
const slug = (s) => String(s).trim().toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).map((w, i) => (i ? w[0].toUpperCase() + w.slice(1) : w)).join("");
const muscleId = (m) => String(m).toLowerCase().replace(/\s+/g, "_");   // same rule as i18n-runtime.js
const sentence = (s) => { const t = String(s).replace(/[-_]+/g, " ").trim(); return t.charAt(0).toUpperCase() + t.slice(1); };
module.exports = { ACCESS_KEYS, GEAR, slug, muscleId, sentence };
