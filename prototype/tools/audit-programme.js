// Programming audit: for every split (2-6 days) x equipment (gym/db/bw) x session length,
// counts direct weekly sessions (exercise lists the muscle as primary) and weekly hard sets
// (direct sets + 0.5 x indirect sets, the Pelland 2026 convention in evidence.md §5),
// and checks per-session muscle sets against evidence.md §5's 3-8 hard sets per muscle per session heuristic
// and §4's ~2x/week frequency. Usage: node tools/audit-programme.js [data.js] [--md]
const fs = require("fs"), vm = require("vm"), path = require("path");
const file = process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : path.join(__dirname, "..", "data.js");
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(file, "utf8"), ctx);
const D = ctx.window.CARLSEN_DATA;
const MUSCLES = ["Chest", "Upper back", "Lats", "Front delts", "Side delts", "Rear delts", "Biceps", "Triceps", "Quads", "Hamstrings", "Glutes", "Calves", "Abs"];
const SHORT = { Chest: "Chest", "Upper back": "UBack", Lats: "Lats", "Front delts": "FDelt", "Side delts": "SDelt", "Rear delts": "RDelt", Biceps: "Bi", Triceps: "Tri", Quads: "Quad", Hamstrings: "Ham", Glutes: "Glute", Calves: "Calf", Abs: "Abs" };
const SETS = D.prescription.sets[process.env.LEVEL || "intermediate"];
const pick = (slot, eq) => { for (const p of slot.split("|")) { const id = Object.keys(D.exercises).find((k) => D.exercises[k].pattern === p && D.exercises[k].equip.includes(eq)); if (id) return id; } return null; };
const trim = (slots, max) => (D.trimSlots ? D.trimSlots(slots, max) : slots.slice(0, max));
const lens = [...new Set(D.options.sessionLength.map((o) => o.maxExercises))].sort();
const flags = [];
const rows = [];
for (const max of lens) for (const eq of ["gym", "db", "bw"]) for (const days of [2, 3, 4, 5, 6]) {
  const sp = D.splits[days]; const freq = {}, wk = {}; MUSCLES.forEach((m) => { freq[m] = 0; wk[m] = 0; });
  sp.sessions.forEach((sid) => {
    const tpl = D.sessions[sid]; const ids = trim(tpl.slots.map((s) => pick(s, eq)).filter(Boolean), max);
    const missing = tpl.slots.filter((s) => !pick(s, eq));
    const pats = ids.map((id) => D.exercises[id].pattern); const dup = pats.filter((p, i) => pats.indexOf(p) !== i);
    if (tpl.slots.length > 7) flags.push(`${sid}: ${tpl.slots.length} slots (>7)`);
    if (dup.length) flags.push(`${eq} ${sid}: duplicate pattern ${dup}`);
    if (missing.length && max === Math.max(...lens) && days === 6 || (missing.length && max === Math.max(...lens) && !["push","pull","legs"].includes(sid) && days !== 6)) flags.push(`${eq} ${sid}: no exercise for ${missing.join(", ")}`);
    const ses = {}; const direct = new Set();
    ids.forEach((id) => { const ex = D.exercises[id]; ex.primary.forEach((m) => { ses[m] = (ses[m] || 0) + SETS; direct.add(m); }); ex.secondary.forEach((m) => (ses[m] = (ses[m] || 0) + SETS / 2)); });
    direct.forEach((m) => freq[m]++);
    Object.entries(ses).forEach(([m, v]) => { wk[m] = (wk[m] || 0) + v; if (v > 8) flags.push(`${eq} ${max}ex ${sid}: ${m} ${v} sets/session (>8, §5)`); if (direct.has(m) && v < 3) flags.push(`${eq} ${max}ex ${sid}: ${m} ${v} sets/session (<3, §5)`); });
  });
  rows.push({ max, eq, days, split: sp.id, freq, wk });
}
const fmt = (v) => (v % 1 ? v.toFixed(1) : String(v));
const md = process.argv.includes("--md");
for (const max of lens) {
  console.log(`\n### Max ${max} exercises/session (${D.options.sessionLength.filter((o) => o.maxExercises === max).map((o) => o.label).join(", ")}) — cells: direct sessions/week × / weekly hard sets (intermediate, ${SETS} sets/exercise)`);
  console.log("| Equip | Days | " + MUSCLES.map((m) => SHORT[m]).join(" | ") + " |");
  console.log("|---|---|" + MUSCLES.map(() => "---").join("|") + "|");
  rows.filter((r) => r.max === max).forEach((r) => console.log(`| ${r.eq} | ${r.days} | ` + MUSCLES.map((m) => { const c = `${r.freq[m]}×/${fmt(r.wk[m])}`; return r.freq[m] < 2 ? `**${c}**` : c; }).join(" | ") + " |"));
}
console.log("\nFlags:"); [...new Set(flags)].forEach((f) => console.log(" - " + f));
