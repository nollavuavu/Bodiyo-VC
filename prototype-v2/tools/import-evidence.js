// Builds evidence.json from the frozen evidence.md snapshot named in tools/approved-topics.json ("source"), never the live file.
// Text and citations are copied verbatim from the .md; nothing is invented.
// Keys with no matching topic stay as clearly marked placeholders. QA gate: tools/approved-topics.json (see there).
// Run: node tools/import-evidence.js [--out file] && node tools/build-evidence.js   (an explicit .md path argument is for tests only)
//
// Parsing (robust to new topics):
//  - A topic starts at "## N. Heading" or a sub-topic "### Na. Heading" / "## Na. Heading" (e.g. 13a). Any N works.
//  - Inside a topic: "**One-line answer:**" -> oneLiner, "**(a) ...:**" -> summary, (b) recommendation,
//    (c) citations, (d) evidenceStrength. Other bold-labelled lines start an ignored field.
//  - Lines starting with the exact "**Research notes (not shown in app):**" marker are skipped (topic sections only),
//    as are curator / QA note lines. "(see Topic N)" cross-references and retracted / left-out sentences are removed.
//  - oneLiner falls back to the first sentence of the recommendation when the topic has none (recorded in oneLinerSource).
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const outPath = outIdx >= 0 ? path.resolve(args[outIdx + 1]) : path.join(root, "evidence.json");
const GATE = JSON.parse(fs.readFileSync(path.join(__dirname, "approved-topics.json"), "utf8"));
const mdPath = args.find((a, i) => !a.startsWith("--") && (outIdx < 0 || i !== outIdx + 1)) || (GATE.source ? path.join(root, GATE.source) : null);
if (!mdPath || !fs.existsSync(mdPath)) { console.error("evidence source missing: " + mdPath + " (set \"source\" in tools/approved-topics.json)"); process.exit(1); }
if (path.resolve(mdPath) === path.resolve(root, "..", "evidence.md")) { console.error("refusing to read the live evidence.md; import from the approved snapshot"); process.exit(1); }
{ const sha = require("crypto").createHash("sha256").update(fs.readFileSync(mdPath)).digest("hex");
  if (GATE.sourceSha256 && sha !== GATE.sourceSha256 && !args.includes("--any-source")) { console.error(`snapshot hash mismatch: ${sha} != approved ${GATE.sourceSha256}`); process.exit(1); } }
const PH = "[PLACEHOLDER: awaiting evidence.md]";
const RESEARCH_NOTES = "**Research notes (not shown in app):**";
const NOTE_LINE = /^\s*(?:[-*>]\s*)*(?:\*+|_+)?\s*(?:note|notes|curator note|curator|qa note|qa|editor'?s? note|todo)\b[^:]*:/i;

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

const clean = (txt) => txt.replace(/\s*\((?:see|cf\.?) Topics? \d+[a-z]?[^)]*\)/gi, "").replace(/;\s*see Topics? \d+[a-z]?(?=[).,;])/gi, "")
  .split(/(?<=\.)\s+(?=[A-Z*])/).filter((x) => !/retracted|do[- ]not[- ]use|left out on purpose|curator note|qa note|^\**note:/i.test(x)).join(" ").trim();
const firstSentence = (t) => ((t || "").match(/^.*?[.!?](?=\s|$)/) || [t || ""])[0].trim();

function parseCitations(block) {
  const cites = [];
  for (const raw of block.split("\n")) {
    let line = raw.trim(); let optional = false;
    if (/^\*Also verified/i.test(line)) { optional = true; line = line.replace(/^\*Also verified[^*]*\*:?\s*/i, ""); }
    else if (!line.startsWith("- ")) continue; else line = line.slice(2);
    if (/do[- ]not[- ]use|retracted/i.test(line)) continue;
    const cm = line.match(/^(.+?)\.?\s+\((\d{4})[^)]*\)\.\s+(?:\*(.+?)\*\s+([^.]+?)\.\s+)?(.*)$/);
    if (!cm) { console.warn("unparsed citation:", line.slice(0, 80)); continue; }
    const rest = cm[5];
    const doi = (rest.match(/https:\/\/doi\.org\/(\S+?)(?=[\s,)]|$)/) || [])[1] || "";
    const pmid = (rest.match(/PubMed (\d+)/) || [])[1] || "";
    let authors = cm[1].trim(); if (/et al$/.test(authors)) authors += ".";
    // Journal may carry volume/pages ("Sports Medicine 56(2):481-505") -> journal + volume.
    let journal = (cm[4] || "").trim(), volume = "";
    const jm = journal.match(/^(.*?)\s+(\d+(?:\s*\(\w+(?:\s\d+)?\))?(?::\s*\S+)?)$/);
    if (jm) { journal = jm[1]; volume = jm[2]; }
    const c = { authors, year: +cm[2], title: cm[3] || "", journal, doi, url: doi ? "https://doi.org/" + doi : "", pmid };
    if (volume) c.volume = volume;
    // Tags and study detail. evidence.md (c) lines read
    //   "... https://doi.org/X (PubMed N) [type · population · n · duration] — detail"
    // and the tags themselves may contain " — " ("[RCT · … · reviewed — volume-matched]"), so the detail is the text after
    // the FIRST bracketed tag group that is followed by a dash. Both are kept verbatim from evidence.md.
    // (Before 19:20 EET the pattern was /\)\s+[—–-]\s+(.+)$/, which needs ")" right before the dash, so the "[tags]"
    // between "(PubMed N)" and "—" made 229 of 230 details drop; found by Vance, i18n/README.md.)
    const tm = rest.match(/^(.*?)\[([^\[\]]+)\]\s+[—–]\s+(.+)$/);
    const dm = tm ? null : rest.match(/\)\s+[—–-]\s+(.+)$/);
    if (tm) { c.tags = tm[2].trim(); c.detail = tm[3].trim(); }
    else if (dm) c.detail = dm[1].trim();
    if (!cm[3]) c.note = rest.replace(/https:\/\/\S+/, "").trim();
    if (optional) c.optional = true;
    cites.push(c);
  }
  return cites;
}

// ---- parse evidence.md into topics ----
const topics = {};
if (fs.existsSync(mdPath)) {
  const lines = fs.readFileSync(mdPath, "utf8").split("\n");
  let cur = null;
  const HEAD = /^(#{2,4})\s+(?:Topic\s+)?(\d+[a-z]?)(?:[.):]|\s+[—–-])\s*(.+?)\s*$/i;
  for (const line of lines) {
    const h = line.match(HEAD);
    if (h) { cur = { id: h[2], heading: h[3], lines: [] }; topics[cur.id] = cur; continue; }
    if (/^#{1,3}\s/.test(line)) { cur = null; continue; }          // e.g. "## Changelog" ends topic sections
    if (cur) cur.lines.push(line);
  }
  for (const t of Object.values(topics)) {
    const fields = {}; let f = null;
    for (const l of t.lines) {
      if (l.startsWith(RESEARCH_NOTES) || NOTE_LINE.test(l)) { f = null; continue; }
      if (/^\s*---\s*$/.test(l)) { f = null; continue; }
      let m;
      if ((m = l.match(/^\*\*One-line answer:?\*\*:?\s*(.*)$/i))) { f = "oneLiner"; fields[f] = m[1]; continue; }
      if ((m = l.match(/^\*\*\(([a-z])\)[^*]*\*\*:?\s*(.*)$/))) { f = m[1]; fields[f] = m[2]; continue; }
      if (/^\*\*[^*]+:\*\*/.test(l) && !/^\*Also verified/i.test(l)) { f = "_other"; continue; }
      if (f) fields[f] = (fields[f] ? fields[f] + "\n" : "") + l;
    }
    const g = (k) => (fields[k] || "").trim();
    const recommendation = clean(g("b").replace(/\n+/g, " "));
    const hyb = (g("b") + "\n" + g("a")).split(/(?<=\.)\s+|\n/).find((x) => /hybrid/i.test(x) && /(5|five)[- ]day|5 days|five days/i.test(x));
    Object.assign(t, {
      oneLiner: g("oneLiner") ? clean(g("oneLiner").replace(/\n+/g, " ")) : firstSentence(recommendation),
      oneLinerSource: g("oneLiner") ? "evidence.md One-line answer" : "first sentence of (b) recommendation",
      summary: clean(g("a").replace(/\n+/g, " ")), recommendation, evidenceStrength: clean(g("d").replace(/\n+/g, " ")),
      citations: parseCitations(g("c")), hybridLine: hyb ? clean(hyb.trim()) : ""
    });
    delete t.lines;
    if (!t.summary && !t.recommendation && !g("oneLiner")) t.empty = true;   // e.g. a parent heading whose content is in 13a/13b
  }
}

// Resolve cross-reference citations ("See Topic N ...") to the full entry with the same DOI; drop if none.
const full = {}; Object.values(topics).forEach((t) => (t.citations || []).forEach((c) => { if (c.title && c.doi) full[c.doi] = c; }));
Object.values(topics).forEach((t) => {
  t.citations = (t.citations || []).map((c) => (!c.title || /see topic/i.test(c.note || "")) ? (full[c.doi] ? Object.assign({}, full[c.doi], { optional: c.optional }) : null) : c).filter(Boolean)
    .map((c) => { if (c.optional === undefined) delete c.optional; return c; });
});
// Context notes attached to specific citations, keyed by DOI (survive rebuilds).
const CITATION_NOTES = {
  "10.1249/MSS.0000000000002523": "Cited for its muscle growth results at long muscle lengths, not for muscle damage." // Maeo 2021
};
Object.values(topics).forEach((t) => t.citations.forEach((c) => { if (CITATION_NOTES[c.doi]) c.note = CITATION_NOTES[c.doi]; }));

// ---- QA approval gate (tools/approved-topics.json) ----
// Only Stirner-approved evidence ships. Per topic: "round1" -> frozen snapshot (evidence-approved/round1-v1-evidence.json),
// "live" -> current evidence.md text, anything else / unlisted -> "[Pending QA approval]" placeholder.
const APPROVAL_PATH = path.join(__dirname, "approved-topics.json");
const SNAPSHOT_PATH = path.join(root, "evidence-approved", "round1-v1-evidence.json");
const approval = GATE;
const PENDING = "[Pending QA approval]";
const approvalOf = (id) => (approval.topics || {})[String(id)] || "pending";
// Round-one topics, rebuilt from the v1 entries (verbatim). The 5-day hybrid line is v1's split.hybrid recommendation.
const round1 = {};
if (fs.existsSync(SNAPSHOT_PATH)) {
  const snap = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf8"));
  for (const [k, e] of Object.entries(snap.entries || {})) {
    if (e.status !== "evidence") continue;
    const id = ((e.source || "").match(/§(\d+[a-z]?)/) || [])[1]; if (!id) continue;
    if (k === "split.hybrid") { (round1[id] = round1[id] || {}).hybridLine = e.recommendation; continue; }
    if (round1[id] && round1[id].summary) continue;
    const rec = e.recommendation || "";
    round1[id] = Object.assign(round1[id] || {}, { id, heading: (e.topic || "").replace(/^\d+[a-z]?\.\s*/, ""), oneLiner: firstSentence(rec),
      oneLinerSource: "first sentence of (b) recommendation (round one has no one-line answers)", summary: e.summary || "", recommendation: rec,
      evidenceStrength: e.evidenceStrength || "", citations: e.citations || [] });
  }
}
const resolved = {}, topicStatus = {};
for (const id of new Set([...Object.keys(topics), ...Object.keys(approval.topics || {}), ...Object.keys(round1)])) {
  const a = approvalOf(id);
  if (a === "round1" && round1[id]) { resolved[id] = Object.assign({}, round1[id], { approval: "round1" }); topicStatus[id] = "approved (round-one snapshot)"; }
  else if ((a === "snapshot" || a === "live") && topics[id] && !topics[id].empty) { resolved[id] = Object.assign({}, topics[id], { approval: "snapshot" }); topicStatus[id] = "approved (" + path.basename(mdPath) + ")"; }
  else if (topics[id] && topics[id].empty) topicStatus[id] = "parent heading (content in its sub-topics)";
  else topicStatus[id] = a === "round1" ? "pending (no round-one text)" : (a === "snapshot" || a === "live") ? "pending (topic missing in snapshot)" : "pending QA approval";
}

// ---- key -> topic map ----
// make(title, [primary topic, fallback topic...]): uses the primary topic if approved.
// A fallback is only listed where that topic already contains the number or rule the UI uses; it is used when the primary
// is not in evidence.md, or (fallbackToApprovedTopic) when the primary is pending QA approval.
const entries = {};
const make = (title, ids) => {
  ids = [].concat(ids).filter((x) => x != null).map(String);
  const primary = ids[0];
  // Strict mode: a pending primary topic is never replaced by a fallback.
  const candidates = approval.fallbackToApprovedTopic === false && !["round1", "snapshot", "live"].includes(approvalOf(primary)) && topics[primary] ? [primary] : ids;
  const id = candidates.find((x) => resolved[x]);
  if (!id) {
    const inMd = ids.some((x) => topics[x] && !topics[x].empty) || ids.some((x) => round1[x]);
    if (inMd) return { title, oneLiner: PENDING, summary: PENDING, recommendation: "", evidenceStrength: "", citations: [], status: "pending", awaiting: `QA approval of evidence.md §${primary}` };
    return { title, oneLiner: PH, summary: PH, recommendation: "", evidenceStrength: "", citations: [], status: "placeholder", awaiting: ids.length ? `evidence.md §${primary}` : "evidence.md" };
  }
  const t = resolved[id];
  const e = { title, topic: `${id}. ${t.heading}`, oneLiner: t.oneLiner, oneLinerSource: t.oneLinerSource, summary: t.summary, recommendation: t.recommendation,
    evidenceStrength: t.evidenceStrength, citations: t.citations, status: "evidence", approval: t.approval, source: t.approval === "round1" ? `evidence.md §${id} (round one, QA-approved)` : `evidence.md §${id} (QA-approved ~19:00 version)` };
  if (id !== primary) e.fallbackFrom = resolved[primary] ? "" : (topics[primary] && !topics[primary].empty ? `evidence.md §${primary} (pending QA approval)` : `evidence.md §${primary} (not in evidence.md yet)`);
  if (!e.fallbackFrom) delete e.fallbackFrom;
  return e;
};
const splitTitles = { full_body: "Why full body?", upper_lower: "Why upper / lower?", hybrid: "Why a hybrid split?", ppl: "Why push / pull / legs?" };
for (const s of Object.values(D.splits)) entries[s.whyKey] = make(splitTitles[s.id], 4);
// 5-day hybrid: show only topic 4's frequency reasoning (its own hybrid line if present).
if (entries["split.hybrid"] && entries["split.hybrid"].status === "evidence") {
  const h = entries["split.hybrid"], line = topics[4] && topics[4].hybridLine;
  if (line) { h.recommendation = line; h.trimmed = "recommendation = 5-day hybrid line from evidence.md §4"; if (h.oneLinerSource !== "evidence.md One-line answer") h.oneLiner = line; }
  else { h.recommendation = firstSentence(h.recommendation); h.trimmed = "recommendation trimmed to frequency sentence of evidence.md §4 (b)"; }
}
for (const l of Object.keys(D.prescription.sets)) entries[`sets.${l}`] = make("Why this many sets?", 5);
for (const g of Object.keys(D.prescription.reps)) for (const t of ["compound", "isolation"]) entries[`reps.${g}.${t}`] = make("Why this rep range?", 3);
for (const l of Object.keys(D.prescription.rir)) entries[`rir.${l}`] = make("Why train at this RIR?", 2);
for (const t of ["compound", "isolation"]) entries[`rest.${t}`] = make("Why this rest time?", 6);
for (const [id, ex] of Object.entries(D.exercises)) {
  entries[`exercise.${id}`] = make(`Why ${ex.name}?`, 8);
  entries[`lengthened.${id}`] = make("Why the lengthened position?", 7);
}
entries["exercise.custom"] = make("How to judge a custom exercise", 8);
entries["principle.mechanical_tension"] = make("How Lift decides: mechanical tension", 1);
entries["volume.hard_sets"] = make("Why count hard sets per muscle?", 5);
entries["onboarding.goal"] = make("Why the goal question matters", 3);
entries["onboarding.days"] = make("Why days per week matters", 4);
entries["onboarding.experience"] = make("Why experience matters", "13a");
entries["onboarding.session_length"] = make("Why session length matters", "13b");
entries["onboarding.equipment"] = make("Why equipment matters", "13c");
// v2 features
entries["weekly.hard_sets"] = make("How weekly hard sets are counted", [10, 5]);
entries["weekly.band"] = make("Is there a weekly target?", 10);
entries["reminder.frequency"] = make("Why about twice a week?", 4);            // the 2x/week number is from §4
entries["reminder.session_sets"] = make("Why spread sets across sessions?", [12, 5]);
entries["plan.exercise_sets"] = make("Why 2–4 sets per exercise?", 5);          // the 2-4 number is from §5
entries["swap.similar"] = make("How swaps are matched", [11, 8]);
entries["progression.suggestion"] = make("Why this next-session target?", 9);
entries["rir.input"] = make("How to log RIR", 14);                            // T14 only (no fallback to T2)
entries["deload.optional"] = make("Do I need a deload week?", 15);

const topicIndex = {};
for (const id of Object.keys(topicStatus).sort((a, b) => parseInt(a) - parseInt(b) || a.localeCompare(b))) {
  const t = resolved[id], live = topics[id];
  // Pending topics expose only their heading and status (no text) so nothing unapproved reaches the app.
  topicIndex[id] = t ? { heading: t.heading, status: topicStatus[id], oneLiner: t.oneLiner, oneLinerSource: t.oneLinerSource, citations: (t.citations || []).length }
    : { heading: live ? live.heading : "", status: topicStatus[id], inEvidenceMd: !!(live && !live.empty) };
}

// Code name -> public app name. "Carlsen" is the internal project name and must not reach users (security.md §8).
// This is a name substitution only (no wording change); the source lines stay in evidence.md for Silas to clean up.
const APP_NAME = "Lift";
const brandText = (v) => (typeof v === "string" ? v.replace(/\bCarlsen(?=['’]s\b|\b)/g, APP_NAME) : Array.isArray(v) ? v.map(brandText) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, brandText(x)])) : v);
for (const k of Object.keys(entries)) entries[k] = brandText(entries[k]);
const doc = {
  _meta: {
    source: path.relative(root, mdPath), sourceSha256: GATE.sourceSha256 || "", approvalGate: "tools/approved-topics.json", snapshot: "evidence-approved/round1-v1-evidence.json", imported: new Date().toISOString(), topicsFound: Object.keys(topics).length, topics: topicIndex,
    framing: "Mechanical tension. No weekly-set-count slogans, no muscle micro-tear claims.",
    rules: "All Why? text and citations live ONLY in this file, copied from evidence.md. Never invent studies. Items marked do-not-use/retracted are skipped.",
    entrySchema: { title: "UI heading", topic: "evidence.md topic", oneLiner: "One-line answer (or first sentence of (b))", summary: "(a) App justification", recommendation: "(b)", evidenceStrength: "(d)", citations: "(c) [{authors,year,title,journal,volume?,doi,url,pmid,detail?,note?,optional?}]", status: "evidence | pending (marked [Pending QA approval]) | placeholder", approval: "round1 | live", source: "evidence.md §N", fallbackFrom: "set when the primary topic is missing and an existing topic with the same rule is used" }
  },
  entries
};
fs.writeFileSync(outPath, JSON.stringify(doc, null, 2) + "\n");
console.log("wrote", outPath);
const ph = Object.entries(entries).filter(([, e]) => e.status === "placeholder").map(([k]) => k);
const pend = Object.entries(entries).filter(([, e]) => e.status === "pending").map(([k]) => k);
const order = (a, b) => parseInt(a) - parseInt(b) || a.localeCompare(b);
console.log("topic approval:", Object.entries(topicIndex).sort(([a], [b]) => order(a, b)).map(([id, t]) => `${id}=${t.status}`).join("; "));
console.log(`pending QA approval: ${pend.join(", ") || "none"}`);
const fb = Object.entries(entries).filter(([, e]) => e.fallbackFrom).map(([k, e]) => `${k}→${e.source}`);
console.log(`topics parsed: ${Object.keys(topics).join(", ")}; entries: ${Object.keys(entries).length}`);
console.log(`placeholders: ${ph.join(", ") || "none"}`);
console.log(`fallbacks: ${fb.join(", ") || "none"}`);
