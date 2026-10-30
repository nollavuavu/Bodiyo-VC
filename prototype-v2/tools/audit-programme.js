// Programme audit (v2): runs the app's own CarlsenLogic.recommended() for every split (2-6 days) x equipment (gym/db/bw)
// x session length, with the same exercise library the app loads (exercises.js from exercises.json, else data.js built-in).
// Per plan: direct sessions/week per muscle (exercise lists it as primary), weekly hard sets (direct x1 + indirect x1/2,
// round-one §5 / Pelland 2026), per-session sets vs round-one §5's 3-8 per muscle per session heuristic, ~2x/week (§4),
// slots with no exercise for the setup, and duplicate exercises in a session.
// Usage: node tools/audit-programme.js [--md out.md]   (BUILTIN=1 to audit the data.js fallback library)
const fs = require("fs"), vm = require("vm"), path = require("path");
const root = path.join(__dirname, "..");
const ctx = { window: {} }; vm.createContext(ctx);
if (!process.env.BUILTIN && fs.existsSync(path.join(root, "exercises.js"))) vm.runInContext(fs.readFileSync(path.join(root, "exercises.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(root, "data.js"), "utf8"), ctx);
const D = ctx.window.CARLSEN_DATA, L = require(path.join(root, "logic.js"))(D);
const M = D.trackedMuscles, LEVEL = process.env.LEVEL || "intermediate";
const SHORT = { Chest: "Chest", "Upper back": "UBk", Lats: "Lats", "Front delts": "FD", "Side delts": "SD", "Rear delts": "RD", Biceps: "Bi", Triceps: "Tri", Forearms: "Fore", Quads: "Quad", Hamstrings: "Ham", Glutes: "Glu", Calves: "Calf", Abs: "Abs" };
const lens = D.options.sessionLength.map((o) => o.id).filter((v, i, a) => a.findIndex((x) => (D.options.sessionLength.find((o) => o.id === x).maxExercises === D.options.sessionLength.find((o) => o.id === v).maxExercises)) === i);
const out = [], flags = [], plans = [];
const fmt = (v) => (v % 1 ? v.toFixed(1) : String(v));
out.push(`# Programme audit (generated ${new Date().toISOString().slice(0, 16)}Z)`, "", `Library: ${D.exerciseSource.file}${D.exerciseSource.count ? ` (${D.exerciseSource.count} exercises, ${D.exerciseSource.groups} groups)` : ""}. Level: ${LEVEL} (${D.prescription.sets[LEVEL]} sets per exercise).`, "Cells: direct sessions per week / weekly hard sets (direct 1, indirect ½). **Bold** = fewer than 2 direct sessions.", "");
for (const len of lens) {
  const maxEx = D.options.sessionLength.find((o) => o.id === len).maxExercises;
  out.push(`## ${len} min (up to ${maxEx} exercises)`, "", "| Equip | Days | " + M.map((m) => SHORT[m]).join(" | ") + " |", "|---|---|" + M.map(() => "---").join("|") + "|");
  for (const eq of ["gym", "db", "bw"]) for (const days of [2, 3, 4, 5, 6]) {
    const p = { goal: "hypertrophy", experience: LEVEL, days, sessionLength: len, equipment: eq };
    const plan = L.recommended(p); const freq = {}, wk = {}; M.forEach((m) => { freq[m] = 0; wk[m] = 0; });
    plan.days.forEach((d, i) => {
      const tpl = D.sessions[D.splits[days].sessions[i]];
      const ids = d.exercises.map((x) => x.exId);
      if (new Set(ids).size !== ids.length) flags.push(`${eq} ${days}d ${len}min ${d.name}: duplicate exercise`);
      if (ids.length < Math.min(maxEx, tpl.slots.length)) {
        const used = new Set(), seen = new Set(), miss = tpl.slots.filter((s) => { const id = L.pick(s, eq, used, seen); if (id) used.add(id); return !id; });
        if (miss.length) flags.push(`${eq}: ${tpl.name} has no exercise for slot ${miss.join(", ")}`);
      }
      const ses = {}, direct = new Set();
      d.exercises.forEach((x) => { const e = L.ex(x.exId); if (!e.equip.includes(eq)) flags.push(`${eq} ${d.name}: ${e.name} does not fit the setup`);
        e.primary.forEach((m) => { ses[m] = (ses[m] || 0) + x.sets; direct.add(m); }); e.secondary.forEach((m) => { ses[m] = (ses[m] || 0) + x.sets / 2; }); });
      direct.forEach((m) => freq[m]++);
      Object.entries(ses).forEach(([m, v]) => { wk[m] += v; if (v > D.rules.sessionSets[1]) flags.push(`${eq} ${days}d ${len}min ${d.name}: ${m} ${fmt(v)} sets in one session (above ~${D.rules.sessionSets[1]}, soft note)`); });
    });
    plans.push({ len, eq, days, plan });
    out.push(`| ${eq} | ${days} | ` + M.map((m) => { const c = `${freq[m]}×/${fmt(wk[m])}`; return freq[m] < 2 ? `**${c}**` : c; }).join(" | ") + " |");
  }
  out.push("");
}
out.push("## Sessions at 75 min (all slots)", "");
for (const { len, eq, days, plan } of plans.filter((x) => x.len === 75)) {
  out.push(`- **${eq} · ${days} days (${plan.name})**`);
  plan.days.forEach((d) => out.push(`  - ${d.name}: ${d.exercises.map((x) => L.ex(x.exId).name).join(", ")}`));
}
out.push("", "## Flags", "", ...([...new Set(flags)].map((f) => "- " + f)), flags.length ? "" : "- none");
const mdIdx = process.argv.indexOf("--md");
if (mdIdx >= 0) { fs.writeFileSync(path.resolve(process.argv[mdIdx + 1] || path.join(__dirname, "audit-programme.md")), out.join("\n") + "\n"); }
console.log(out.join("\n"));
