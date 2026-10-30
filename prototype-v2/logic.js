/* Carlsen prototype v2: pure programme logic (no DOM, no storage).
 * Loaded in the browser as window.CarlsenLogic and in Node by tools/test-logic.js.
 * Every number used here comes from data.js `rules` (each traced to evidence.md) or a listed Carlsen convention (data.js `conventions`). */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory;
  else root.CarlsenLogic = factory(root.CARLSEN_DATA, root.I18N);
})(typeof self !== "undefined" ? self : this, function (D, I) {
  "use strict";
  const R = D.rules;
  // All user-facing text goes through the i18n runtime (i18n-runtime.js): T(key, vars), muscle names via M().
  if (!I) throw new Error("logic.js needs the i18n runtime (load i18n.js and i18n-runtime.js first)");
  const T = I.t, M = I.muscle, lc = (m) => I.lower(M(m)), cap = I.cap;
  const uid = (p = "") => p + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

  // ---------- exercises ----------
  // Built-in or custom. Unknown ids (e.g. a custom exercise from another device) render as a neutral stub.
  // Legacy v1 ids resolve through D.aliases (tools/exercise-app-overrides.json).
  // Own-property checks only (security.md §2): ids such as "constructor" or "__proto__" must not resolve to Object.prototype members.
  const own = (o, k) => o != null && Object.prototype.hasOwnProperty.call(o, k);
  const canon = (id) => own(D.exercises, id) ? id : (own(D.aliases, id) && own(D.exercises, D.aliases[id]) ? D.aliases[id] : id);
  function ex(id, customs) {
    id = canon(id);
    if (own(D.exercises, id)) return Object.assign({ id }, D.exercises[id]);
    const c = own(customs, id) ? customs[id] : null;
    if (c) return Object.assign({ id, custom: true, pattern: "custom:" + id, secondary: [] }, c);
    return { id, name: T("exercise.unknown"), primary: [], secondary: [], equip: [], type: "isolation", missing: true };
  }
  // exercises.json picks: movementPattern (+ first primary muscle) from data.js slotSpecs, ranked toward round-one §7/§8:
  // challenge the stretched position (resistance profile) and push close to failure safely (stability), then the setup's main gear.
  // `used` = ids already in this session (skipped); `seen` = ids used elsewhere in the split (small penalty, for A/B variety).
  const PROF_SCORE = { lengthened: 3, mid: 2, shortened: 1 };
  const GEAR_SCORE = { gym: { barbell: 1, machine: 1, cable: 1, dumbbell: 0.5, bodyweight: 0 }, db: { dumbbell: 1, bodyweight: 0.25 }, bw: { bodyweight: 1, dumbbell: 0.25 } };
  function pickSpec(spec, equip, used, seen) {
    const ms = spec.m ? [].concat(spec.m) : null;
    const ids = Object.keys(D.exercises).filter((k) => { const e = D.exercises[k];
      return !e.notForTemplates && e.pattern === spec.p && e.equip.includes(equip) && !used.has(k) && (!ms || ms.includes(e.primary[0])); });
    const sc = (k) => { const e = D.exercises[k]; return (PROF_SCORE[e.profile] || 0) + (e.stability === "high" ? 1 : 0) + ((GEAR_SCORE[equip] || {})[e.gear] || 0) - (seen.has(k) ? 0.6 : 0); };
    return ids.sort((a, b) => sc(b) - sc(a))[0] || null;
  }
  function pick(slot, equip, used, seen) {
    used = used || new Set(); seen = seen || new Set();
    if (D.slotSpecs) {
      for (const alt of slot.split("|")) for (const spec of D.slotSpecs[alt] || []) { const id = pickSpec(spec, equip, used, seen); if (id) return id; }
      return null;
    }
    for (const pattern of slot.split("|")) {
      const id = Object.keys(D.exercises).find((k) => D.exercises[k].pattern === pattern && D.exercises[k].equip.includes(equip));
      if (id) return id;
    }
    return null;
  }
  // Prescription for an exercise, with the evidence key behind each number.
  function rx(exId, p, customs) {
    const e = ex(exId, customs), t = e.type === "compound" ? "compound" : "isolation";
    return {
      sets: D.prescription.sets[p.experience], reps: D.prescription.reps[p.goal][t], rir: D.prescription.rir[p.experience][t],
      rest: D.prescription.rest[t], restSec: D.prescription.restSeconds[t],
      why: { sets: `sets.${p.experience}`, reps: `reps.${p.goal}.${t}`, rir: `rir.${p.experience}`, rest: `rest.${t}`,
        exercise: e.custom || e.missing ? "exercise.custom" : `exercise.${e.id}`, lengthened: e.custom || e.missing ? null : `lengthened.${e.id}` }
    };
  }
  const range = (s) => { const m = String(s || "").match(/(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)/); return m ? [+m[1], +m[2]] : null; };

  // ---------- recommended split (from onboarding answers) ----------
  function recommended(p) {
    const key = p.splitKey && own(D.splits, p.splitKey) ? p.splitKey : p.days;
    const split = D.splits[key];
    const maxEx = (D.options.sessionLength.find((o) => o.id === p.sessionLength) || { maxExercises: 6 }).maxExercises;
    const sets = D.prescription.sets[p.experience], seen = new Set();
    return {
      id: "rec", name: T("split.name." + split.id, null, split.name), source: { type: "recommended", splitKey: key }, whyKey: split.whyKey, readOnly: true,
      days: split.sessions.map((sid, i) => {
        const tpl = D.sessions[sid], used = new Set(), ids = [];
        for (const s of tpl.slots) { if (ids.length >= maxEx) break; const id = pick(s, p.equipment, used, seen); if (id) { used.add(id); ids.push(id); } }
        ids.forEach((id) => seen.add(id));
        return { id: "rec-" + i, name: T("split.session." + sid, null, tpl.name), weekday: split.weekdays[i], exercises: ids.map((exId) => ({ exId, sets })) };
      })
    };
  }

  // ---------- plan analysis (split builder + community) ----------
  // Gentle notes only; never blocks saving. Thresholds: rules.frequencyTarget (§4), rules.sessionSets (§5), rules.exerciseSets (§5).
  const list = (a) => I.list(a);
  const names = (ms) => cap(list(ms.map(lc)));
  const dayName = (d, i) => d.name || T("common.dayN", { n: i + 1 });
  // Equipment tiers: a full gym also has dumbbells and bodyweight options; dumbbells at home also allow bodyweight.
  const ADJ = { lengthened: ["mid"], mid: ["lengthened", "shortened"], shortened: ["mid"] };
  const TIERS = { gym: ["gym", "db", "bw"], db: ["db", "bw"], bw: ["bw"] };
  function planMuscles(split, customs) {
    const freq = {}, weekly = {};
    (split.days || []).forEach((d) => {
      const direct = new Set();
      d.exercises.forEach((it) => {
        const e = ex(it.exId, customs), n = Math.max(0, +it.sets || 0);
        e.primary.forEach((m) => { direct.add(m); weekly[m] = (weekly[m] || 0) + n; });
        e.secondary.forEach((m) => { weekly[m] = (weekly[m] || 0) + n * R.secondaryWeight; });
      });
      direct.forEach((m) => (freq[m] = (freq[m] || 0) + 1));
    });
    return { freq, weekly };
  }
  function sessionMuscleSets(items, customs, countFn) {
    const out = {};
    items.forEach((it) => {
      const e = ex(it.exId, customs), n = countFn(it);
      if (!n) return;
      e.primary.forEach((m) => { out[m] = out[m] || { sets: 0, direct: true }; out[m].sets += n; out[m].direct = true; });
      e.secondary.forEach((m) => { out[m] = out[m] || { sets: 0, direct: false }; out[m].sets += n * R.secondaryWeight; });
    });
    return out;
  }
  function analysePlan(split, customs) {
    const notes = [];
    const days = split.days || [];
    const [sLo, sHi] = R.sessionSets, [eLo, eHi] = R.exerciseSets;
    if (!days.length) return [{ kind: "empty", text: T("plan.note.noDays"), whyKey: null }];
    days.forEach((d, i) => { if (!d.exercises.length) notes.push({ kind: "empty", text: T("plan.note.emptyDay", { day: dayName(d, i) }), whyKey: null }); });
    const total = days.reduce((n, d) => n + d.exercises.length, 0);
    if (!total) return notes;
    const { freq, weekly } = planMuscles(split, customs);
    const once = D.trackedMuscles.filter((m) => freq[m] === 1);
    const indirect = D.trackedMuscles.filter((m) => !freq[m] && weekly[m] > 0);
    const none = D.trackedMuscles.filter((m) => !freq[m] && !weekly[m]);
    const who = (ms) => ms.length > 4 ? (ms.length === D.trackedMuscles.length ? T("plan.note.allMuscles", { n: ms.length }) : T("plan.note.someMuscles", { n: ms.length, muscles: list(ms.map(lc)) })) : names(ms);
    if (once.length) notes.push({ kind: "frequency", text: T("plan.note.frequency", { muscles: who(once) }), whyKey: "reminder.frequency", muscles: once });
    if (indirect.length) notes.push({ kind: "indirect", text: T("plan.note.indirect", { muscles: who(indirect) }), whyKey: "reminder.frequency", muscles: indirect });
    if (none.length) notes.push({ kind: "none", text: T("plan.note.none", { muscles: list(none.map(lc)) }), whyKey: "reminder.frequency", muscles: none });
    // Per-session notes are merged into one note each (high / low) so a plan never gets a wall of repeats.
    const highs = [], lows = [];
    days.forEach((d, i) => {
      const per = sessionMuscleSets(d.exercises, customs, (it) => Math.max(0, +it.sets || 0)), dn = dayName(d, i);
      const mc = (m) => T("common.muscleCount", { muscle: lc(m), n: fmtN(per[m].sets) });
      const high = Object.keys(per).filter((m) => per[m].sets > sHi);
      if (high.length) highs.push(T("plan.note.onDay", { items: list(high.map(mc)), day: dn }));
      const low = Object.keys(per).filter((m) => per[m].direct && per[m].sets < sLo);
      if (low.length) lows.push(T("plan.note.onDay", { items: list(low.map(mc)), day: dn }));
    });
    if (highs.length) notes.push({ kind: "session-high", text: T("plan.note.sessionHigh", { lo: sLo, hi: sHi, items: highs.join(T("common.separatorGroups")) }), whyKey: "reminder.session_sets" });
    if (lows.length) notes.push({ kind: "session-low", text: T("plan.note.sessionLow", { lo: sLo, hi: sHi, items: lows.join(T("common.separatorGroups")) }), whyKey: "reminder.session_sets" });
    const offEx = [];
    days.forEach((d) => d.exercises.forEach((it) => { const n = +it.sets || 0; if (n < eLo || n > eHi) offEx.push(T("plan.note.exerciseSetsItem", { name: exName(it.exId, customs), n })); }));
    if (offEx.length) notes.push({ kind: "exercise-sets", text: T("plan.note.exerciseSets", { items: list([...new Set(offEx)]), lo: eLo, hi: eHi }), whyKey: "plan.exercise_sets" });
    return notes;
  }
  const fmtN = (n) => (Math.round(n * 2) / 2).toString().replace(/\.5$/, "½").replace(/^0½$/, "½");

  // ---------- sets: validation and hard-set counting ----------
  // kg: blank or 0 = bodyweight, must be >= 0 and <= 1000. reps: whole number 1-100. RIR: blank, or 0-10 in steps of 0.5.
  function validateSet(s) {
    const err = {};
    const kg = String(s.kg ?? "").trim(), reps = String(s.reps ?? "").trim(), rir = String(s.rir ?? "").trim();
    if (kg !== "" && (!/^\d+(?:[.,]\d+)?$/.test(kg) || +kg.replace(",", ".") > 1000)) err.kg = /^-/.test(kg) ? T("logger.error.kgNegative") : T("logger.error.kg");
    if (reps === "") err.reps = T("logger.error.repsBlank");
    else if (!/^\d+$/.test(reps) || +reps < 1 || +reps > 100) err.reps = T("logger.error.reps");
    if (rir !== "" && (!/^\d+(?:[.,]5|[.,]0)?$/.test(rir) || +rir.replace(",", ".") > 10)) err.rir = T("logger.error.rir");
    return err;
  }
  const num = (v) => { const t = String(v ?? "").trim().replace(",", "."); return t === "" ? null : +t; };
  // A hard set: ticked and RIR <= rules.hardSetMaxRIR (§5). Blank RIR = assumed on target (convention "blank-rir").
  const isHard = (s) => !!s.done && (num(s.rir) == null || num(s.rir) <= R.hardSetMaxRIR);
  function workoutMuscles(w, customs) {
    return sessionMuscleSets(w.items, customs, (it) => it.sets.filter(isHard).length);
  }
  const doneSets = (w) => w.items.reduce((n, it) => n + it.sets.filter((s) => s.done).length, 0);
  const hardSets = (w) => w.items.reduce((n, it) => n + it.sets.filter(isHard).length, 0);
  const volumeKg = (w) => w.items.reduce((n, it) => n + it.sets.filter((s) => s.done).reduce((a, s) => a + (num(s.kg) || 0) * (num(s.reps) || 0), 0), 0);

  // ---------- weeks (local time, Monday start; DST-safe via setDate) ----------
  function weekStart(date) { const d = new Date(date); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; }
  function weekRange(offset, now) { const s = weekStart(now || new Date()); s.setDate(s.getDate() + 7 * offset); const e = new Date(s); e.setDate(e.getDate() + 7); return { start: s, end: e }; }
  function weekStats(history, start, end, customs) {
    const ws = history.filter((w) => { const t = new Date(w.date); return t >= start && t < end; }).sort((a, b) => new Date(a.date) - new Date(b.date));
    const muscles = {};
    ws.forEach((w) => {
      const per = workoutMuscles(w, customs);
      Object.entries(per).forEach(([m, v]) => {
        const r = (muscles[m] = muscles[m] || { hard: 0, sessions: 0 });
        r.hard += v.sets; if (v.direct) r.sessions += 1;
      });
    });
    return { workouts: ws, muscles, hard: ws.reduce((n, w) => n + hardSets(w), 0) };
  }
  // Friendly weekly reminders. Threshold: rules.frequencyTarget direct sessions per muscle per week (§4).
  // Only muscles the active plan trains directly; grouped by body region; at most `max`.
  function weeklyReminders(stats, plan, customs, opts) {
    opts = opts || {};
    const target = R.frequencyTarget;
    const { freq } = plan ? planMuscles(plan, customs) : { freq: {} };
    const planned = D.trackedMuscles.filter((m) => plan ? freq[m] : true);
    if (!stats.workouts.length) return [];
    const short = planned.filter((m) => (stats.muscles[m] ? stats.muscles[m].sessions : 0) < target);
    if (!short.length) return [{ kind: "done", tone: "good", text: T("reminder.allDone", { n: target }), whyKey: "reminder.frequency" }];
    const groups = {};
    short.forEach((m) => { const r = D.muscleRegion[m] || "other"; (groups[r] = groups[r] || []).push(m); });
    const out = [];
    const order = Object.entries(groups).sort((a, b) => score(b[1]) - score(a[1]));
    function score(ms) { return ms.reduce((n, m) => n + ((stats.muscles[m] && stats.muscles[m].sessions) === 1 ? 2 : 1), 0); }
    for (const [region, ms] of order) {
      const once = ms.filter((m) => stats.muscles[m] && stats.muscles[m].sessions >= 1);
      const zero = ms.filter((m) => !(stats.muscles[m] && stats.muscles[m].sessions >= 1));
      const day = plan && nextDayFor(plan, ms, customs, opts.nextIndex);
      const next = day ? T("reminder.next.day", { day: day.name }) : T("reminder.next." + (["push", "pull", "legs"].includes(region) ? region : "other"));
      if (once.length) {
        const hard = (m) => stats.muscles[m].hard, hs = (m) => fmtN(hard(m));
        out.push({ kind: "once", region, muscles: once, whyKey: "reminder.frequency",
          text: once.length === 1 ? T("reminder.onceOne", { muscle: lc(once[0]), sets: hs(once[0]), n: hard(once[0]), next })
            : T("reminder.onceMany", { items: list(once.map((m, i) => T(i === 0 ? "reminder.onceItemFirst" : "reminder.onceItem", { muscle: lc(m), sets: hs(m), n: hard(m) }))), next }) });
      }
      if (zero.length) {
        const prev = out.find((r) => r.kind === "zero" && r.day === (day && day.name));
        if (prev) prev.muscles = prev.muscles.concat(zero); else out.push({ kind: "zero", region, muscles: zero, day: day && day.name, whyKey: "reminder.frequency" });
      }
    }
    out.filter((r) => r.kind === "zero").forEach((r) => {
      const ms = r.muscles, who = ms.length > 4 ? T("reminder.zeroMany", { n: ms.length, a: lc(ms[0]), b: lc(ms[1]) }) : list(ms.map(lc));
      r.text = T("reminder.zero", { muscles: who, next: r.day ? T("reminder.zeroDay", { day: r.day }) : T("reminder.zeroTime") });
    });
    // one-session muscles first (closest to the guide), then untouched ones
    out.sort((a, b) => (a.kind === "once" ? 0 : 1) - (b.kind === "once" ? 0 : 1));
    return out.slice(0, opts.max || 3);
  }
  function nextDayFor(plan, muscles, customs, startIdx) {
    const n = plan.days.length; if (!n) return null;
    for (let k = 0; k < n; k++) {
      const d = plan.days[((startIdx || 0) + k) % n];
      if (d.exercises.some((it) => ex(it.exId, customs).primary.some((m) => muscles.includes(m)))) return d;
    }
    return null;
  }
  // Per-session reminders for the summary. Thresholds: rules.sessionSets (§5).
  function sessionReminders(w, customs) {
    const [lo, hi] = R.sessionSets, per = workoutMuscles(w, customs), out = [];
    const high = Object.keys(per).filter((m) => per[m].sets > hi);
    if (high.length) out.push({ kind: "session-high", whyKey: "reminder.session_sets",
      text: T("reminder.sessionHigh", { items: list(high.map((m) => T("common.muscleCount", { muscle: lc(m), n: fmtN(per[m].sets) }))), lo, hi }) });
    return out;
  }

  // ---------- swaps ----------
  // Same primary muscle. Ranked: same exercises.json substitutionGroup first, then same/adjacent resistance profile and same stability,
  // then same movement pattern, equipment fit and type. The top candidate is shown as "Best match".
  function swapCandidates(exId, p, customs, excludeIds) {
    const t = ex(exId, customs), muscle = t.primary[0];
    exId = t.id; excludeIds = (excludeIds || []).map(canon);
    if (!muscle) return [];
    const pool = Object.keys(D.exercises).concat(Object.keys(customs || {}).filter((k) => !customs[k].archived));
    return pool.filter((id) => id !== exId && !(excludeIds || []).includes(id)).map((id) => {
      const c = ex(id, customs);
      if (!c.primary.includes(muscle)) return null;
      const samePattern = !t.custom && !c.custom && c.pattern === t.pattern;
      const sameGroup = !!t.group && c.group === t.group;
      const sameProfile = !!t.profile && c.profile === t.profile;
      const nearProfile = !sameProfile && !!t.profile && !!c.profile && ADJ[t.profile] && ADJ[t.profile].includes(c.profile);
      const sameStability = !!t.stability && c.stability === t.stability;
      const tiers = TIERS[p.equipment] || [p.equipment];
      const tier = Math.min(...(c.equip || []).map((q) => tiers.indexOf(q)).filter((i) => i >= 0), 9);
      const fits = tier < 9;
      const firstMuscle = c.primary[0] === muscle;
      const score = (sameGroup ? 16 : 0) + (samePattern ? 8 : 0) + (sameProfile ? 4 : nearProfile ? 2 : 0) + (sameStability ? 2 : 0) + (fits ? 2 - tier * 0.5 : 0) + (c.type === t.type ? 1 : 0) + (firstMuscle ? 1 : 0);
      const reasons = [T("logger.swap.sameMuscle")];
      if (sameGroup) reasons.push(T("logger.swap.sameFamily")); else if (samePattern) reasons.push(T("logger.swap.samePattern"));
      if (c.profile) reasons.push(I.lower(T("common.profile." + c.profile, null, c.profile)));
      if (!fits) reasons.push(T("logger.swap.needs", { equipment: I.list((c.equip || []).map((q) => I.lower(T("common.equipment." + q, null, q))), "disjunction") }));
      if (sameStability && c.stability === "high") reasons.push(T("logger.swap.supported"));
      return { id, ex: c, score, sameGroup, samePattern, sameProfile, nearProfile, sameStability, fits, reasons };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.ex.name.localeCompare(b.ex.name));
  }

  // ---------- progression (evidence.md §9 double progression; §14: weight the last set most) ----------
  // Build reps to the top of the range at the target RIR, then add the smallest weight step and restart at the bottom.
  // Hold the load when the last set ended harder than the target RIR. Step sizes and the "easier than target" trigger are conventions.
  function suggestion(exId, lastSets, rxv) {
    const done = (lastSets || []).filter((s) => s.done && num(s.reps) != null);
    if (!done.length) return null;
    const rr = range(rxv.reps) || [8, 12], rir = range(rxv.rir) || [1, 3];
    const top = Math.max(...done.map((s) => num(s.kg) || 0));
    const atTop = done.filter((s) => (num(s.kg) || 0) === top);
    const reps = atTop.map((s) => num(s.reps)), best = Math.max(...reps);
    const lastSet = atTop[atTop.length - 1], lastRir = num(lastSet.rir);
    const allTop = reps.every((r) => r >= rr[1]);
    const easy = lastRir != null && lastRir > rir[1];
    const hard = lastRir != null && lastRir < rir[0];
    const rirs = atTop.map((s) => num(s.rir));
    const lastLoad = top ? T("logger.target.kg", { kg: fmtKg(top), reps: reps.join(", ") }) : T("logger.target.bw", { reps: reps.join(", ") });
    const last = rirs.some((v) => v != null) ? T("logger.target.withRir", { target: lastLoad, rir: rirs.map((v) => v == null ? "–" : fmtN(v)).join(", ") }) : lastLoad;
    const P = R.progression, base = { last, hold: false };
    if (!top) {
      const next = Math.min(best + 1, 100);
      if (hard) return Object.assign(base, { kg: "", reps: String(best), target: T("logger.target.bw", { reps: best }), hold: true, reason: T("logger.reason.bwHold", { rir: fmtN(lastRir), target: rxv.rir }) });
      return Object.assign(base, { kg: "", reps: String(next), target: T("logger.target.bw", { reps: next }), reason: T("logger.reason.bwAdd") });
    }
    const step = top < P.smallLoadBelowKg ? P.smallLoadStepKg : P.loadStepKg, nk = top + step;
    if (hard && !allTop) return Object.assign(base, { kg: fmtKg(top), reps: String(best), target: T("logger.target.kg", { kg: fmtKg(top), reps: best }), hold: true,
      reason: T("logger.reason.hold", { rir: fmtN(lastRir), target: rxv.rir, kg: fmtKg(top) }) });
    if (allTop || easy) return Object.assign(base, { kg: fmtKg(nk), reps: String(rr[0]), target: T("logger.target.kgRange", { kg: fmtKg(nk), lo: rr[0], hi: rr[1] }),
      reason: allTop ? T("logger.reason.top", { reps: rxv.reps, step: fmtKg(step), lo: rr[0] }) : T("logger.reason.easy", { rir: fmtN(lastRir), target: rxv.rir, step: fmtKg(step) }) });
    const nr = Math.min(best + 1, rr[1]);
    return Object.assign(base, { kg: fmtKg(top), reps: String(nr), target: T("logger.target.kg", { kg: fmtKg(top), reps: nr }), reason: T("logger.reason.rep", { kg: fmtKg(top), hi: rr[1] }) });
  }
  // Display only: decimal separator follows the active locale (vi-VN "2,5"). Stored values always use "."; num() accepts both.
  const fmtKg = (n) => { const v = Math.round(n * 100) / 100; try { return new Intl.NumberFormat(I.locale(), { maximumFractionDigits: 2, useGrouping: false }).format(v); } catch (e) { return String(v); } };
  // Display name of a library exercise in the current language (exercise.<id>.name in en.json, generated from exercises.json).
  function exName(id, customs) { const e = ex(id, customs); return e.custom || e.missing ? e.name : T("exercise." + e.id + ".name", null, e.name); }

  return { uid, ex, canon, pick, rx, range, recommended, planMuscles, analysePlan, validateSet, num, isHard, workoutMuscles, doneSets, hardSets, volumeKg,
    weekStart, weekRange, weekStats, weeklyReminders, sessionReminders, swapCandidates, suggestion, nextDayFor, fmtN, fmtKg, list, exName };
});
