/* Carlsen prototype – UI. Plain JS, hash routing, localStorage. No backend, no AI.
 * All "Why?" text comes from window.EVIDENCE (generated from evidence.json). */
(function () {
  "use strict";
  const D = window.CARLSEN_DATA;
  const EV = (window.EVIDENCE && window.EVIDENCE.entries) || {};
  const $ = (s, r = document) => r.querySelector(s);
  const screen = $("#screen"), tabbar = $("#tabbar"), phone = $("#phone");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>");

  // ---------- storage ----------
  const LS = {
    get(k, d) { try { const v = localStorage.getItem("carlsen." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { localStorage.setItem("carlsen." + k, JSON.stringify(v)); },
    del(k) { localStorage.removeItem("carlsen." + k); }
  };
  const DEFAULT_PROFILE = { goal: "hypertrophy", experience: "intermediate", days: 4, sessionLength: 60, equipment: "gym" };
  const profile = () => LS.get("profile", null);

  // ---------- programme logic ----------
  function pick(slot, equip) {
    for (const pattern of slot.split("|")) {
      const id = Object.keys(D.exercises).find((k) => D.exercises[k].pattern === pattern && D.exercises[k].equip.includes(equip));
      if (id) return id;
    }
    return null;
  }
  function rxFor(exId, p) {
    const ex = D.exercises[exId], t = ex.type;
    return {
      sets: D.prescription.sets[p.experience], reps: D.prescription.reps[p.goal][t], rir: D.prescription.rir[p.experience][t],
      rest: D.prescription.rest[t], restSec: D.prescription.restSeconds[t],
      why: { sets: `sets.${p.experience}`, reps: `reps.${p.goal}.${t}`, rir: `rir.${p.experience}`, rest: `rest.${t}`, exercise: `exercise.${exId}`, lengthened: `lengthened.${exId}` }
    };
  }
  function buildPlan(p) {
    const split = D.splits[p.days];
    const maxEx = (D.options.sessionLength.find((o) => o.id === p.sessionLength) || { maxExercises: 6 }).maxExercises;
    const sessions = split.sessions.map((sid, i) => {
      const tpl = D.sessions[sid];
      const exIds = tpl.slots.map((s) => pick(s, p.equipment)).filter(Boolean).slice(0, maxEx);
      return { index: i, id: sid, name: tpl.name, short: tpl.short, weekday: split.weekdays[i], exercises: exIds.map((id) => ({ id, rx: rxFor(id, p) })) };
    });
    return { split, sessions };
  }
  function musclesOf(exIds) { const s = new Set(); exIds.forEach((id) => D.exercises[id].primary.forEach((m) => s.add(m))); return [...s]; }
  // Hard sets: completed sets at <= 3 RIR (blank RIR = assumed on target). Primary = 1, secondary = 0.5.
  function hardSetsPerMuscle(items) {
    const out = {};
    items.forEach(({ id, sets }) => sets.forEach((s) => {
      if (!s.done) return; if (s.rir !== "" && s.rir != null && +s.rir > 3) return;
      const ex = D.exercises[id];
      ex.primary.forEach((m) => (out[m] = (out[m] || 0) + 1));
      ex.secondary.forEach((m) => (out[m] = (out[m] || 0) + 0.5));
    }));
    return Object.entries(out).sort((a, b) => b[1] - a[1]);
  }
  const totalHard = (items) => items.reduce((n, e) => n + e.sets.filter((s) => s.done && !(s.rir !== "" && s.rir != null && +s.rir > 3)).length, 0);
  const volume = (items) => items.reduce((n, e) => n + e.sets.filter((s) => s.done).reduce((a, s) => a + (+s.kg || 0) * (+s.reps || 0), 0), 0);

  // ---------- history (seeded sample so Home is not empty) ----------
  function history() {
    let h = LS.get("history", null);
    if (!h) {
      const mk = (id, n, kg, reps, rir) => ({ id, sets: Array.from({ length: n }, () => ({ kg, reps, rir, done: true })) });
      h = [
        { id: "sample-2", sample: true, name: "Upper", date: "2026-10-26T20:41:00", durationMin: 45,
          exercises: [mk("barbell_bench_press", 3, 75, 6, 2), mk("lat_pulldown", 3, 60, 9, 2), mk("db_shoulder_press", 3, 22, 8, 1), mk("chest_supported_row", 3, 50, 10, 2), mk("cable_lateral_raise", 2, 7.5, 14, 1)] },
        { id: "sample-1", sample: true, name: "Lower", date: "2026-10-24T20:06:00", durationMin: 52,
          exercises: [mk("barbell_back_squat", 3, 90, 6, 2), mk("romanian_deadlift", 3, 80, 8, 2), mk("leg_extension", 2, 45, 13, 1), mk("seated_leg_curl", 2, 40, 12, 1), mk("standing_calf_raise", 2, 60, 12, 1)] }
      ];
      LS.set("history", h);
    }
    return h;
  }
  function previousFor(exId) {
    for (const s of history()) { const e = s.exercises.find((x) => x.id === exId); if (e) return e.sets; }
    return [];
  }

  // ---------- UI helpers ----------
  const why = (key, label = "Why?", cls = "") => `<button class="why ${cls}" data-why="${esc(key)}" aria-label="Why? ${esc(key)}">${esc(label)}</button>`;
  const fmtDate = (iso) => new Date(iso).toLocaleString("en-GB", { month: "long", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
  let toastT; function toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 1600); }

  function openWhy(key) {
    const e = EV[key];
    const sheet = $("#sheet"), bd = $("#sheet-backdrop");
    let html = `<div class="grab"></div>`;
    if (!e) {
      html += `<h3 id="sheet-title">No evidence entry</h3><div class="notice">Missing key in evidence.json: <code>${esc(key)}</code></div>`;
    } else {
      const ph = e.status !== "evidence";
      html += `<div class="spread"><span class="eyebrow">Why?</span><span class="tag" style="${ph ? "background:rgba(255,181,71,.12);color:var(--warn)" : ""}">${ph ? "Placeholder" : "Evidence"}</span></div>
        <h3 id="sheet-title">${esc(e.title)}</h3>
        ${e.topic ? `<p class="small muted" style="margin:-4px 0 10px">${esc(e.topic)}</p>` : ""}
        <p class="summary ${ph ? "placeholder" : ""}">${md(e.summary)}</p>
        ${e.recommendation ? `<h2 style="font-size:15px;margin:16px 0 6px">Recommendation</h2><p class="small" style="line-height:1.5">${md(e.recommendation)}</p>` : ""}
        ${e.evidenceStrength ? `<h2 style="font-size:15px;margin:16px 0 6px">Evidence strength</h2><div class="strength">${md(e.evidenceStrength)}</div>` : ""}
        <h2 style="font-size:15px;margin:16px 0 6px">Citations (${e.citations.length})</h2>
        ${e.citations.length ? e.citations.map((c) => `<div class="cite"><b>${esc(c.authors)} (${esc(c.year)})</b>${c.title ? esc(c.title) + " " : ""}${c.journal ? `<i>${esc(c.journal)}</i>. ` : ""}${c.optional ? '<span class="pill">optional extra</span> ' : ""}<br>${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">doi:${esc(c.doi)}</a>` : ""}${c.pmid ? ` · <a href="https://pubmed.ncbi.nlm.nih.gov/${esc(c.pmid)}/" target="_blank" rel="noopener">PubMed ${esc(c.pmid)}</a>` : ""}${c.note ? `<div class="cite-note">ⓘ ${esc(c.note)}</div>` : ""}</div>`).join("")
          : `<div class="notice">No citations yet. This entry is a placeholder until evidence.md covers it.</div>`}
        ${e.source ? `<p class="keytag">source: ${esc(e.source)} · key: ${esc(key)}</p>` : `<p class="keytag">key: ${esc(key)}</p>`}`;
    }
    html += `<button class="btn btn-ghost" data-close-sheet>Close</button>`;
    sheet.innerHTML = html; sheet.hidden = false; bd.hidden = false;
    requestAnimationFrame(() => { sheet.classList.add("show"); bd.classList.add("show"); });
    sheet.scrollTop = 0;
  }
  function closeWhy() {
    const sheet = $("#sheet"), bd = $("#sheet-backdrop");
    sheet.classList.remove("show"); bd.classList.remove("show");
    setTimeout(() => { sheet.hidden = true; bd.hidden = true; }, 220);
    if (location.hash.includes("?why=")) history_replace(location.hash.replace(/\?why=[^&]*/, ""));
  }
  function history_replace(h) { try { window.history.replaceState(null, "", h); } catch (e) { /* file:// in some browsers */ } }

  // ---------- muscle map ----------
  function muscleMap(ex) {
    const col = (m) => ex.primary.includes(m) ? "var(--primary-m)" : ex.secondary.includes(m) ? "var(--secondary-m)" : "#34353b";
    const base = `<circle cx="50" cy="14" r="10" fill="#26272c"/><rect x="45" y="22" width="10" height="8" fill="#26272c"/>
      <rect x="29" y="29" width="42" height="64" rx="10" fill="#26272c"/>
      <rect x="16" y="32" width="11" height="72" rx="5.5" fill="#26272c"/><rect x="73" y="32" width="11" height="72" rx="5.5" fill="#26272c"/>
      <rect x="32" y="88" width="17" height="104" rx="8" fill="#26272c"/><rect x="51" y="88" width="17" height="104" rx="8" fill="#26272c"/>`;
    const E = (m, cx, cy, rx, ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${col(m)}"><title>${m}</title></ellipse>`;
    const R = (m, x, y, w, h, r) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${col(m)}"><title>${m}</title></rect>`;
    const front = base + E("Front delts", 30, 36, 6, 6) + E("Front delts", 70, 36, 6, 6) + E("Side delts", 22, 38, 4, 6) + E("Side delts", 78, 38, 4, 6)
      + E("Chest", 41, 46, 9, 7) + E("Chest", 59, 46, 9, 7) + E("Biceps", 21.5, 58, 4.5, 11) + E("Biceps", 78.5, 58, 4.5, 11)
      + R("Abs", 43, 56, 14, 30, 4) + E("Quads", 40, 122, 7.5, 22) + E("Quads", 60, 122, 7.5, 22) + E("Adductors", 47, 108, 2.5, 11) + E("Adductors", 53, 108, 2.5, 11)
      + E("Calves", 40, 166, 5, 13) + E("Calves", 60, 166, 5, 13);
    const back = base + E("Rear delts", 30, 36, 6, 6) + E("Rear delts", 70, 36, 6, 6) + E("Side delts", 22, 38, 4, 6) + E("Side delts", 78, 38, 4, 6)
      + E("Upper back", 50, 42, 16, 9) + E("Lats", 38, 63, 8, 14) + E("Lats", 62, 63, 8, 14) + E("Triceps", 21.5, 58, 4.5, 11) + E("Triceps", 78.5, 58, 4.5, 11)
      + R("Spinal erectors", 46, 52, 8, 34, 4) + E("Glutes", 41, 98, 9, 9) + E("Glutes", 59, 98, 9, 9)
      + E("Hamstrings", 40, 128, 7.5, 18) + E("Hamstrings", 60, 128, 7.5, 18) + E("Calves", 40, 166, 6, 13) + E("Calves", 60, 166, 6, 13);
    return `<div class="mmap"><figure><svg viewBox="0 0 100 200" role="img" aria-label="Front muscle map">${front}</svg><figcaption>Front</figcaption></figure>
      <figure><svg viewBox="0 0 100 200" role="img" aria-label="Back muscle map">${back}</svg><figcaption>Back</figcaption></figure></div>
      <div class="legend"><span><i style="background:var(--primary-m)"></i>Primary</span><span><i style="background:var(--secondary-m)"></i>Secondary</span></div>`;
  }

  // ---------- screens ----------
  const S = {};

  S.onboarding = () => {
    const p = Object.assign({}, DEFAULT_PROFILE, profile() || {});
    const opt = (field, o) => `<button class="opt" data-set="${field}" data-val="${esc(o.id)}" aria-pressed="${String(p[field]) === String(o.id)}"><b>${esc(o.label)}</b>${o.sub ? `<span>${esc(o.sub)}</span>` : ""}</button>`;
    // Why? chip only when the entry has real evidence (placeholder chips hidden for now)
    const q = (label, key, body) => `<div class="q"><div class="q-label"><span>${label}</span>${EV[key] && EV[key].status === "evidence" ? why(key, "Why?", "sm") : ""}</div>${body}</div>`;
    return `
      <div class="eyebrow" style="margin-top:8px">Carlsen</div>
      <h1>Let's build your plan</h1>
      <p class="lead">Five quick questions. Every recommendation comes with a <b style="color:var(--accent)">Why?</b> backed by research.</p>
      ${q("Goal", "onboarding.goal", `<div class="opts">${D.options.goal.map((o) => opt("goal", o)).join("")}</div>`)}
      ${q("Experience", "onboarding.experience", `<div class="opts cols3">${D.options.experience.map((o) => opt("experience", o)).join("")}</div>`)}
      ${q("Days per week", "onboarding.days", `<div class="days">${D.options.days.map((d) => `<button class="day" data-set="days" data-val="${d}" aria-pressed="${p.days === d}">${d}</button>`).join("")}</div>`)}
      ${q("Session length", "onboarding.session_length", `<div class="opts" style="grid-template-columns:repeat(4,1fr)">${D.options.sessionLength.map((o) => opt("sessionLength", o)).join("")}</div>`)}
      ${q("Equipment", "onboarding.equipment", `<div class="opts cols3">${D.options.equipment.map((o) => opt("equipment", o)).join("")}</div>`)}
      <button class="btn btn-primary" data-action="finish-onboarding">See my split →</button>`;
  };

  S.split = () => {
    const p = profile() || DEFAULT_PROFILE, { split, sessions } = buildPlan(p);
    const freq = {}; sessions.forEach((s) => musclesOf(s.exercises.map((e) => e.id)).forEach((m) => (freq[m] = (freq[m] || 0) + 1)));
    const freqVals = Object.values(freq); const avg = freqVals.length ? (freqVals.reduce((a, b) => a + b, 0) / freqVals.length).toFixed(1) : 0;
    const alts = D.alternatives[p.days].map((d) => D.splits[d]);
    return `
      <div class="topbar"><a class="iconbtn" href="#/onboarding" aria-label="Back">‹</a><span class="small muted">Step 2 of 2</span><span style="width:36px"></span></div>
      <div class="eyebrow">Your recommended split</div>
      <h1>${esc(split.name)}</h1>
      <p class="lead">${p.days} days/week · ${esc(D.options.goal.find((g) => g.id === p.goal).label)} · ${esc(D.options.equipment.find((g) => g.id === p.equipment).label)}</p>
      <div class="card hero" style="margin-top:16px">
        <div class="spread"><span class="small muted">Sessions</span>${why(split.whyKey)}</div>
        <div class="big">${sessions.map((s) => s.short).join(" · ")}</div>
        <div class="row small muted" style="margin-top:6px;gap:16px"><span>${sessions.length} sessions</span><span>~${avg}× / muscle / week</span><span>${p.sessionLength} min</span></div>
        <button class="small" data-why="${split.whyKey}" style="color:var(--accent);font-weight:700;margin-top:12px">See evidence →</button>
      </div>
      <div class="week">${D.weekdayNames.map((n, i) => { const s = sessions.find((x) => x.weekday === i); return `<div class="wd ${s ? "on" : ""}"><small>${n}</small><b>${s ? s.short : "Rest"}</b></div>`; }).join("")}</div>
      ${alts.length ? `<h2>Other options</h2>${alts.map((a) => `<div class="alt"><div><b style="font-size:15px">${esc(a.name)}</b><div class="small muted">${a.sessions.length} days/week</div></div><div class="row" style="gap:8px">${why(a.whyKey, "Why?", "sm")}<button class="btn-sm ghost" data-action="set-days" data-val="${a.sessions.length}">Switch</button></div></div>`).join("")}` : ""}
      <button class="btn btn-primary" data-action="go" data-val="#/plan">Use this split</button>`;
  };

  S.plan = () => {
    const p = profile() || DEFAULT_PROFILE, { split, sessions } = buildPlan(p);
    const weekly = {}; sessions.forEach((s) => s.exercises.forEach((e) => { const ex = D.exercises[e.id]; ex.primary.forEach((m) => (weekly[m] = (weekly[m] || 0) + e.rx.sets)); ex.secondary.forEach((m) => (weekly[m] = (weekly[m] || 0) + e.rx.sets / 2)); }));
    const wl = Object.entries(weekly).sort((a, b) => b[1] - a[1]); const mx = wl.length ? wl[0][1] : 1;
    return `
      <div class="topbar"><span class="eyebrow">Explore · Your week</span><a class="small" href="#/split" style="color:var(--accent);font-weight:700">Change split</a></div>
      <h1>${esc(split.name)}</h1>
      <div class="row" style="gap:8px;margin-bottom:6px"><span class="pill acc">${p.days} days</span><span class="pill">${esc(p.experience)}</span>${why(split.whyKey, "Why this split?", "sm")}</div>
      <div class="stack" style="margin-top:14px">
      ${D.weekdayNames.map((n, i) => {
        const s = sessions.find((x) => x.weekday === i);
        if (!s) return `<div class="session" style="opacity:.5"><div class="badge" style="color:var(--dim)">${n}</div><div class="meta"><b>Rest day</b><span>Recover</span></div></div>`;
        return `<a class="session" href="#/workout/${s.index}"><div class="badge">${n}</div><div class="meta"><b>${esc(s.name)}</b><span>${s.exercises.length} exercises · ${musclesOf(s.exercises.map((e) => e.id)).slice(0, 4).join(", ")}</span></div><span class="chev">›</span></a>`;
      }).join("")}
      </div>
      <div class="spread" style="margin-top:22px"><h2 style="margin:0">Planned hard sets / muscle</h2>${why("volume.hard_sets", "Why?", "sm")}</div>
      <p class="small muted" style="margin:4px 0 6px">This week, counted from your plan (secondary muscles = ½ set).</p>
      ${wl.map(([m, v]) => `<div class="mbar"><span>${esc(m)}</span><span class="track"><i style="width:${(v / mx) * 100}%"></i></span><b>${v % 1 ? v.toFixed(1) : v}</b></div>`).join("")}`;
  };

  function nextSessionIndex(n) { return history().filter((h) => !h.sample).length % n; }

  S.workout = (arg) => {
    const p = profile() || DEFAULT_PROFILE, { sessions } = buildPlan(p);
    const idx = arg != null && arg !== "" ? Math.min(+arg, sessions.length - 1) : nextSessionIndex(sessions.length);
    const s = sessions[idx];
    const log = LS.get(`log.${idx}`, null) || { startedAt: Date.now(), sets: {} };
    if (!LS.get(`log.${idx}`, null)) LS.set(`log.${idx}`, log);
    const items = s.exercises.map((e, ei) => ({ id: e.id, sets: log.sets[ei] || [] }));
    const exHtml = s.exercises.map((e, ei) => {
      const ex = D.exercises[e.id], prev = previousFor(e.id);
      const rows = log.sets[ei] || Array.from({ length: e.rx.sets }, () => ({ kg: "", reps: "", rir: "", done: false }));
      if (!log.sets[ei]) log.sets[ei] = rows;
      const done = rows.filter((r) => r.done).length;
      return `<div class="ex" data-ex="${ei}">
        <div class="ex-head"><a class="thumb" href="#/exercise/${e.id}">${ex.icon}</a><div class="t"><a href="#/exercise/${e.id}"><b>${esc(ex.name)}</b></a><span>${done}/${rows.length} done · ${ex.primary.join(", ")}</span></div>${why(e.rx.why.exercise, "Why?", "sm")}</div>
        <div class="rx" style="grid-template-columns:repeat(3,1fr)">
          <div class="cell"><small>Target sets</small><b>${e.rx.sets}</b>${why(e.rx.why.sets, "Why?", "sm")}</div>
          <div class="cell"><small>Reps</small><b>${e.rx.reps}</b>${why(e.rx.why.reps, "Why?", "sm")}</div>
          <div class="cell"><small>RIR</small><b>${e.rx.rir}</b>${why(e.rx.why.rir, "Why?", "sm")}</div>
        </div>
        <div class="rest-line">⏱ Rest Timer: ${e.rx.rest} ${why(e.rx.why.rest, "Why?", "sm")}</div>
        <div class="stable">
          <div class="srow head"><span>Set</span><span>Previous</span><span>Kg</span><span>Reps</span><span>RIR ${why(e.rx.why.rir, "Why?", "sm")}</span><span></span></div>
          ${rows.map((r, si) => { const pv = prev[si]; return `<div class="srow ${r.done ? "done" : ""}" data-set-row="${si}">
            <span class="n">${si + 1}</span><span class="prev">${pv ? `${pv.kg}kg × ${pv.reps}` : "–"}</span>
            <input type="number" inputmode="decimal" data-f="kg" value="${esc(r.kg)}" placeholder="${pv ? pv.kg : "kg"}" aria-label="kg set ${si + 1}">
            <input type="number" inputmode="numeric" data-f="reps" value="${esc(r.reps)}" placeholder="${esc(e.rx.reps.split("–")[0])}" aria-label="reps set ${si + 1}">
            <input type="number" inputmode="numeric" data-f="rir" value="${esc(r.rir)}" placeholder="${esc(e.rx.rir)}" aria-label="RIR set ${si + 1}">
            <button class="chk ${r.done ? "on" : ""}" data-action="toggle-set" aria-pressed="${r.done}" aria-label="done set ${si + 1}">✓</button></div>`; }).join("")}
        </div>
        <button class="addset" data-action="add-set">+ Add Set</button>
      </div>`;
    }).join("");
    LS.set(`log.${idx}`, log);
    const mins = Math.floor((Date.now() - log.startedAt) / 1000);
    return `
      <div class="logtop"><a class="iconbtn" href="#/plan" aria-label="Back">⌄</a><span class="small muted">${esc(s.name)} · ${D.weekdayNames[s.weekday]}</span><button class="btn-sm" data-action="finish" data-val="${idx}">Finish</button></div>
      <div class="stats3"><div><small>Duration</small><b class="blue" id="dur" data-start="${log.startedAt}">${fmtDur(mins)}</b></div><div><small>Volume</small><b>${Math.round(volume(items)).toLocaleString("fi-FI")} kg</b></div><div><small>Hard sets</small><b>${totalHard(items)}</b></div></div>
      ${exHtml}
      <button class="btn btn-ghost" data-action="reset" data-val="${idx}" style="color:var(--warn)">Reset workout</button>`;
  };
  function fmtDur(sec) { const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60; return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`; }

  S.summary = (id) => {
    const h = history(); const w = id === "latest" ? h[0] : h.find((x) => x.id === id) || h[0];
    if (!w) return `<p class="lead">No workout yet.</p>`;
    const pm = hardSetsPerMuscle(w.exercises); const mx = pm.length ? pm[0][1] : 1;
    const ci = LS.get(`checkin.${w.id}`, { effort: "", soreness: "", performance: "" });
    const seg = (field, opts) => `<div class="seg">${opts.map((o) => `<button data-action="checkin" data-id="${esc(w.id)}" data-f="${field}" data-val="${o}" aria-pressed="${ci[field] === o}">${o}</button>`).join("")}</div>`;
    let next = "Answer the three questions to see next week's change.";
    if (ci.effort && ci.soreness && ci.performance) {
      const top = pm.length ? pm[0][0].toLowerCase() : "this session";
      if (ci.soreness === "A lot" || ci.performance === "Worse" || ci.effort === "Too hard") next = `Next week: −1 set for ${top}.`;
      else if (ci.effort === "Easy" && ci.soreness === "None" && ci.performance !== "Worse") next = `Next week: +1 set for ${top}.`;
      else next = "Next week: keep sets the same and add load or reps.";
    }
    return `
      <div class="topbar"><a class="iconbtn" href="#/home" aria-label="Close">✕</a><span class="small muted">Workout summary</span><span style="width:36px"></span></div>
      <div class="eyebrow">${w.sample ? "Sample session" : "Nice work"}</div>
      <h1>${esc(w.name)}</h1><p class="small muted">${fmtDate(w.date)}</p>
      <div class="stats3" style="margin-top:14px"><div><small>Duration</small><b class="blue">${w.durationMin} min</b></div><div><small>Hard sets</small><b>${totalHard(w.exercises)}</b></div><div><small>Volume</small><b>${Math.round(volume(w.exercises)).toLocaleString("fi-FI")} kg</b></div></div>
      <div class="spread" style="margin-top:22px"><h2 style="margin:0">Hard sets per muscle</h2>${why("volume.hard_sets", "Why?", "sm")}</div>
      <p class="small muted" style="margin:4px 0 6px">Completed sets at ≤3 RIR · secondary muscles count ½.</p>
      ${pm.map(([m, v]) => `<div class="mbar"><span>${esc(m)}</span><span class="track"><i style="width:${(v / mx) * 100}%"></i></span><b>${v % 1 ? v.toFixed(1) : v}</b></div>`).join("") || '<p class="small muted">No completed sets.</p>'}
      <h2>Quick check-in</h2>
      <div class="stack"><div><div class="q-label">Effort</div>${seg("effort", ["Easy", "About right", "Too hard"])}</div>
      <div><div class="q-label">Soreness since last time</div>${seg("soreness", ["None", "Some", "A lot"])}</div>
      <div><div class="q-label">Performance vs last time</div>${seg("performance", ["Worse", "Same", "Better"])}</div></div>
      <div class="next"><div class="spread"><b>${esc(next)}</b>${why("checkin.adjustment", "Why?", "sm")}</div><p class="small muted" style="margin-top:6px">Rule-based suggestion, not a measurement.</p></div>
      <button class="btn btn-primary" data-action="go" data-val="#/home">Done</button>`;
  };

  S.home = () => {
    const p = profile() || DEFAULT_PROFILE, { sessions } = buildPlan(p);
    const nx = sessions[nextSessionIndex(sessions.length)];
    const card = (w) => `<div class="hcard">
      <div class="who"><div class="avatar">HV</div><div><b>Hoang${w.sample ? '<span class="sample">SAMPLE</span>' : ""}</b><small>🏋 ${fmtDate(w.date)}</small></div></div>
      <a href="#/summary/${esc(w.id)}"><h4>${esc(w.name)}</h4></a>
      <div class="hstats"><div><small>Duration</small><b>${w.durationMin}min</b></div><div><small>Hard sets</small><b>${totalHard(w.exercises)}</b></div><div><small>Volume</small><b>${Math.round(volume(w.exercises)).toLocaleString("fi-FI")} kg</b></div></div>
      <div class="thumbs">${w.exercises.map((e) => { const ex = D.exercises[e.id]; return `<a href="#/exercise/${e.id}"><div><span class="e">${ex.icon}</span>${e.sets.filter((s) => s.done).length} × ${esc(ex.name)}</div></a>`; }).join("")}</div>
    </div>`;
    return `
      <div class="topbar"><h1 style="margin:0;font-size:26px">Carlsen</h1><a class="iconbtn" href="#/you" aria-label="Profile">◯</a></div>
      <a class="card hero" href="#/workout/${nx.index}" style="display:block;margin-top:6px">
        <div class="eyebrow">Next up · ${D.weekdayNames[nx.weekday]}</div>
        <div class="big">${esc(nx.name)}</div>
        <div class="small muted">${nx.exercises.length} exercises · ${musclesOf(nx.exercises.map((e) => e.id)).slice(0, 4).join(", ")}</div>
        <span class="btn btn-primary" style="margin-top:14px;height:46px">Start workout</span>
      </a>
      <div class="card" style="margin-top:12px"><div class="spread"><div><b>How Carlsen decides</b><div class="small muted">Mechanical tension, explained</div></div>${why("principle.mechanical_tension")}</div></div>
      <h2>History</h2>
      ${history().map(card).join("")}`;
  };

  S.library = () => `
      <div class="topbar"><h1 style="margin:0;font-size:26px">Library</h1></div>
      <input class="search" id="libsearch" placeholder="Search exercises or muscles" aria-label="Search">
      <div id="liblist">${Object.entries(D.exercises).map(([id, ex]) => `<a class="lib-item" href="#/exercise/${id}" data-q="${esc((ex.name + " " + ex.primary.join(" ") + " " + ex.secondary.join(" ")).toLowerCase())}"><span class="thumb">${ex.icon}</span><div class="t"><b>${esc(ex.name)}</b><span>${ex.primary.join(", ")} · ${ex.type}</span></div><span class="chev">›</span></a>`).join("")}</div>
      <div id="libempty" class="card" style="text-align:center;margin-top:16px" hidden><div style="font-size:28px">🔍</div><b style="display:block;margin-top:6px">No results</b><div class="small muted" style="margin-top:4px">No exercises match “<span id="libq"></span>”. Try a muscle like “chest” or “hamstrings”.</div></div>`;

  S.exercise = (id) => {
    const ex = D.exercises[id]; if (!ex) return `<p class="lead">Unknown exercise.</p>`;
    const p = profile() || DEFAULT_PROFILE, rx = rxFor(id, p);
    const alts = Object.keys(D.exercises).filter((k) => k !== id && D.exercises[k].pattern === ex.pattern);
    const cell = (label, val, key) => `<div class="cell"><small>${label}</small><b>${esc(val)}</b>${why(key, "Why?", "sm")}</div>`;
    return `
      <div class="topbar"><a class="iconbtn" href="javascript:history.back()" aria-label="Back">←</a><b style="flex:1;margin-left:14px;font-size:19px">${esc(ex.name)}</b></div>
      <div class="tabs"><span class="on">About</span><span>History</span><span>Progress</span></div>
      <div class="detail-hero">${ex.icon}<span class="ph">demo media placeholder</span></div>
      <h2>Target muscles</h2>
      ${muscleMap(ex)}
      <div class="chips" style="margin-top:10px">${ex.primary.map((m) => `<span class="chip" style="background:rgba(255,77,66,.15);color:var(--primary-m)">${esc(m)}</span>`).join("")}${ex.secondary.map((m) => `<span class="chip" style="background:var(--accent-soft);color:var(--secondary-m)">${esc(m)}</span>`).join("")}</div>
      <div class="spread" style="margin-top:22px"><h2 style="margin:0">Lengthened position</h2>${why(rx.why.lengthened, "Why?", "sm")}</div>
      <div class="lnote" style="margin-top:10px">${esc(ex.lengthened)}</div>
      <div class="spread" style="margin-top:22px"><h2 style="margin:0">Why this exercise</h2>${why(rx.why.exercise, "Why?", "sm")}</div>
      <p class="small muted" style="margin-top:6px">${esc(ex.type === "compound" ? "Compound" : "Isolation")} · ${esc(ex.pattern.replace("_", " "))} pattern · equipment: ${ex.equip.join(", ")}</p>
      <h2>Your prescription</h2>
      <div class="kv">${cell("Sets", rx.sets, rx.why.sets)}${cell("Reps", rx.reps, rx.why.reps)}${cell("RIR", rx.rir, rx.why.rir)}${cell("Rest", rx.rest, rx.why.rest)}</div>
      <h2>Cues</h2><ol class="cues">${ex.cues.map((c) => `<li>${esc(c)}</li>`).join("")}</ol>
      ${alts.length ? `<h2>Swap alternatives</h2>${alts.map((k) => `<a class="lib-item" href="#/exercise/${k}"><span class="thumb">${D.exercises[k].icon}</span><div class="t"><b>${esc(D.exercises[k].name)}</b><span>${D.exercises[k].equip.join(", ")}</span></div><span class="chev">›</span></a>`).join("")}` : ""}`;
  };

  S.you = () => {
    const p = profile() || DEFAULT_PROFILE, meta = (window.EVIDENCE && window.EVIDENCE._meta) || {};
    const n = Object.values(EV).filter((e) => e.status === "evidence").length;
    return `
      <div class="topbar"><h1 style="margin:0;font-size:26px">You</h1></div>
      <div class="card"><div class="row"><div class="avatar">HV</div><div><b>Hoang</b><div class="small muted">${esc(p.goal)} · ${esc(p.experience)} · ${p.days} days · ${p.sessionLength} min · ${esc(p.equipment)}</div></div></div></div>
      <button class="btn btn-ghost" data-action="go" data-val="#/onboarding">Edit answers</button>
      <h2>Evidence library</h2>
      <div class="card small"><div>${n} of ${Object.keys(EV).length} Why? entries backed by evidence.md</div><div class="muted" style="margin-top:6px">Imported ${esc((meta.imported || "").slice(0, 10))}</div></div>
      <button class="btn btn-ghost" data-action="clear" style="color:var(--warn)">Reset all prototype data</button>`;
  };

  // ---------- router ----------
  const TAB = { home: "home", split: "explore", plan: "explore", workout: "workout", summary: "home", library: "library", exercise: "library", you: "you" };
  let restTimer = null;
  function render() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    const [pathPart, query = ""] = raw.split("?");
    let [route, arg] = pathPart.split("/");
    if (!profile() && route !== "onboarding") route = "onboarding";
    if (!route || !S[route]) route = "home";
    screen.innerHTML = S[route](arg);
    screen.scrollTop = 0;
    const showTabs = route !== "onboarding";
    tabbar.hidden = !showTabs; phone.classList.toggle("has-tabs", showTabs);
    tabbar.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.dataset.tab === TAB[route]));
    const wq = new URLSearchParams(query).get("why");
    if (wq) openWhy(wq); else if (!$("#sheet").hidden) { $("#sheet").classList.remove("show"); $("#sheet").hidden = true; $("#sheet-backdrop").hidden = true; }
  }
  window.addEventListener("hashchange", render);

  // ---------- events ----------
  document.addEventListener("click", (ev) => {
    const w = ev.target.closest("[data-why]");
    if (w) { ev.preventDefault(); ev.stopPropagation(); openWhy(w.dataset.why); return; }
    if (ev.target.closest("[data-close-sheet]") || ev.target.id === "sheet-backdrop") { closeWhy(); return; }
    const set = ev.target.closest("[data-set]");
    if (set) {
      const p = Object.assign({}, DEFAULT_PROFILE, profile() || {}, LS.get("draft", {}));
      const v = set.dataset.val; p[set.dataset.set] = /^\d+$/.test(v) ? +v : v;
      LS.set("draft", p);
      set.parentElement.querySelectorAll("[data-set]").forEach((b) => b.setAttribute("aria-pressed", b === set));
      return;
    }
    const a = ev.target.closest("[data-action]"); if (!a) return;
    const act = a.dataset.action;
    if (act === "finish-onboarding") { LS.set("profile", Object.assign({}, DEFAULT_PROFILE, profile() || {}, LS.get("draft", {}))); LS.del("draft"); location.hash = "#/split"; }
    else if (act === "go") location.hash = a.dataset.val;
    else if (act === "set-days") { const p = profile(); p.days = +a.dataset.val; LS.set("profile", p); toast(`Switched to ${p.days} days`); render(); }
    else if (act === "toggle-set" || act === "add-set") {
      const exEl = a.closest("[data-ex]"), ei = exEl.dataset.ex, idx = currentWorkoutIdx(), log = LS.get(`log.${idx}`);
      if (act === "add-set") log.sets[ei].push({ kg: "", reps: "", rir: "", done: false });
      else {
        const si = +a.closest("[data-set-row]").dataset.setRow, r = log.sets[ei][si];
        r.done = !r.done;
        if (r.done) { const row = a.closest("[data-set-row]"); const ph = (f) => row.querySelector(`[data-f=${f}]`).placeholder; if (r.kg === "" && !isNaN(+ph("kg"))) r.kg = ph("kg"); if (r.reps === "" && !isNaN(+ph("reps"))) r.reps = ph("reps"); startRest(exEl); }
      }
      LS.set(`log.${idx}`, log); const y = screen.scrollTop; render(); screen.scrollTop = y;
    }
    else if (act === "finish") {
      const idx = +a.dataset.val, p = profile(), { sessions } = buildPlan(p), s = sessions[idx], log = LS.get(`log.${idx}`);
      const entry = { id: "w" + Date.now(), name: s.name, date: new Date().toISOString(), durationMin: Math.max(1, Math.round((Date.now() - log.startedAt) / 60000)),
        exercises: s.exercises.map((e, ei) => ({ id: e.id, sets: (log.sets[ei] || []).filter((x) => x.done) })).filter((e) => e.sets.length) };
      const h = history(); h.unshift(entry); LS.set("history", h); LS.del(`log.${idx}`); stopRest();
      location.hash = `#/summary/${entry.id}`;
    }
    else if (act === "reset") { if (confirm("Reset this workout? Logged sets will be cleared.")) { LS.del(`log.${a.dataset.val}`); stopRest(); render(); } }
    else if (act === "checkin") { const k = `checkin.${a.dataset.id}`, c = LS.get(k, {}); c[a.dataset.f] = a.dataset.val; LS.set(k, c); const y = screen.scrollTop; render(); screen.scrollTop = y; }
    else if (act === "clear") { if (confirm("Clear all Carlsen prototype data?")) { Object.keys(localStorage).filter((k) => k.startsWith("carlsen.")).forEach((k) => localStorage.removeItem(k)); location.hash = "#/onboarding"; render(); } }
    else if (act === "stop-rest") stopRest();
  });
  document.addEventListener("input", (ev) => {
    const inp = ev.target;
    if (inp.id === "libsearch") { const q = inp.value.toLowerCase(); let shown = 0; document.querySelectorAll("#liblist .lib-item").forEach((el) => { const ok = el.dataset.q.includes(q); el.style.display = ok ? "" : "none"; shown += ok; }); $("#libempty").hidden = shown > 0; $("#libq").textContent = inp.value; return; }
    const row = inp.closest("[data-set-row]"); if (!row) return;
    const ei = row.closest("[data-ex]").dataset.ex, si = +row.dataset.setRow, idx = currentWorkoutIdx(), log = LS.get(`log.${idx}`);
    log.sets[ei][si][inp.dataset.f] = inp.value; LS.set(`log.${idx}`, log);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#sheet").hidden) closeWhy(); });
  function currentWorkoutIdx() { const m = $("[data-action=finish]"); return m ? +m.dataset.val : 0; }

  function startRest(exEl) {
    stopRest();
    const idx = currentWorkoutIdx(), p = profile(), s = buildPlan(p).sessions[idx], e = s.exercises[+exEl.dataset.ex];
    let left = e.rx.restSec;
    const box = document.createElement("div"); box.className = "resting"; box.id = "resting";
    box.innerHTML = `<span>⏱</span><b id="rest-left"></b><span class="grow">Rest · target ${esc(e.rx.rest)}</span><button class="btn-sm ghost" data-action="stop-rest">Skip</button>`;
    phone.appendChild(box); phone.classList.add("is-resting");
    const tick = () => { const el = $("#rest-left"); if (el) el.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`; if (left-- <= 0) stopRest(); };
    tick(); restTimer = setInterval(tick, 1000);
  }
  function stopRest() { clearInterval(restTimer); restTimer = null; const b = $("#resting"); if (b) b.remove(); phone.classList.remove("is-resting"); }
  setInterval(() => { const d = $("#dur"); if (d) d.textContent = fmtDur(Math.floor((Date.now() - +d.dataset.start) / 1000)); }, 1000);

  const st = $("#ev-status"); if (st) { const n = Object.values(EV).filter((e) => e.status === "evidence").length; st.textContent = `${n}/${Object.keys(EV).length} entries from evidence.md`; }
  render();
})();
