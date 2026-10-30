// Builds evidence.json from /workspace/carlsen/evidence.md (Silas's library).
// Text and citations are copied verbatim from the .md; nothing is invented.
// Keys with no matching topic stay as clearly marked placeholders.
// Run: node tools/import-evidence.js [path/to/evidence.md] && node tools/build-evidence.js
const fs = require("fs"), path = require("path"), vm = require("vm");
const root = path.join(__dirname, "..");
const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const outPath = outIdx >= 0 ? path.resolve(args[outIdx + 1]) : path.join(root, "evidence.json");
const mdPath = args.filter((a, i) => !a.startsWith("--") && i !== outIdx + 1 || (outIdx < 0 && !a.startsWith("--")))[0] || path.join(root, "..", "evidence.md");
const PH = "[PLACEHOLDER: awaiting evidence.md]";

const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "data.js"), "utf8"), ctx);
const D = ctx.window.CARLSEN_DATA;

// ---- parse evidence.md into topics ----
const topics = {};
if (fs.existsSync(mdPath)) {
  const md = fs.readFileSync(mdPath, "utf8");
  for (let block of md.split(/\n## /).slice(1)) {
    const m = block.match(/^(\d+)\.\s+(.+)/); if (!m) continue;
    const n = +m[1], heading = m[2].trim();
    // Drop curator / QA note lines and blockquotes inside a topic.
    const NOTE_LINE = /^\s*(?:[-*>]\s*)*(?:\*+|_+)?\s*(?:note|notes|curator note|curator|qa note|qa|editor'?s? note|todo)\b[^:]*:/i;
    // Inside topic sections only: skip every line starting with the exact research-notes marker.
    const RESEARCH_NOTES = "**Research notes (not shown in app):**";
    block = block.split("\n").filter((l) => !l.startsWith(RESEARCH_NOTES) && !NOTE_LINE.test(l)).join("\n");
    const grab = (tag) => { const r = block.match(new RegExp("\\*\\*\\(" + tag + "\\)[^*]*\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*\\([a-d]\\)|\\n---|$)")); return r ? r[1].trim() : ""; };
    const cites = [];
    const cBlock = grab("c");
    for (const raw of cBlock.split("\n")) {
      let line = raw.trim(); let optional = false;
      if (/^\*Also verified/i.test(line)) { optional = true; line = line.replace(/^\*Also verified[^*]*\*:?\s*/i, ""); }
      else if (!line.startsWith("- ")) continue; else line = line.slice(2);
      if (/do[- ]not[- ]use|retracted/i.test(line)) continue;            // skip flagged items
      const cm = line.match(/^(.+?)\.?\s+\((\d{4})[^)]*\)\.\s+(?:\*(.+?)\*\s+([^.]+?)\.\s+)?(.*)$/);
      if (!cm) { console.warn("unparsed citation:", line); continue; }
      const rest = cm[5];
      const doi = (rest.match(/https:\/\/doi\.org\/(\S+)/) || [])[1] || "";
      const pmid = (rest.match(/PubMed (\d+)/) || [])[1] || "";
      let authors = cm[1].trim(); if (/et al$/.test(authors)) authors += ".";
      const c = { authors, year: +cm[2], title: cm[3] || "", journal: cm[4] || "", doi, url: doi ? "https://doi.org/" + doi : "", pmid };
      if (!cm[3]) c.note = rest.replace(/https:\/\/\S+/, "").trim();
      if (optional) c.optional = true;
      cites.push(c);
    }
    // Drop curation-only sentences about retracted / excluded papers (do-not-use items never reach the app)
    const clean = (txt) => txt.replace(/\s*\((?:see|cf\.?) Topics? \d+[^)]*\)/gi, "").replace(/;\s*see Topics? \d+(?=[).,;])/gi, "").split(/(?<=\.)\s+(?=[A-Z*])/).filter(x => !/retracted|do[- ]not[- ]use|left out on purpose|curator note|qa note|^\**note:/i.test(x)).join(" ");
    const hyb = (grab("b") + "\n" + grab("a")).split(/(?<=\.)\s+|\n/).find((x) => /hybrid/i.test(x) && /(5|five)[- ]day|5 days|five days/i.test(x));
    topics[n] = { hybridLine: hyb ? clean(hyb.trim()) : "", heading, summary: clean(grab("a")), recommendation: clean(grab("b")), evidenceStrength: clean(grab("d")), citations: cites };
  }
}

// Resolve cross-reference citations ("See Topic N ...") to the full entry with the same DOI; drop if none.
const full = {}; Object.values(topics).forEach((t) => t.citations.forEach((c) => { if (c.title && c.doi) full[c.doi] = c; }));
Object.values(topics).forEach((t) => {
  t.citations = t.citations.map((c) => (!c.title || /see topic/i.test(c.note || "")) ? (full[c.doi] ? Object.assign({}, full[c.doi], { optional: c.optional }) : null) : c).filter(Boolean)
    .map((c) => { if (c.optional === undefined) delete c.optional; return c; });
});

// Context notes attached to specific citations, keyed by DOI (survive rebuilds).
const CITATION_NOTES = {
  "10.1249/MSS.0000000000002523": "Cited for its muscle growth results at long muscle lengths, not for muscle damage." // Maeo 2021
};
Object.values(topics).forEach((t) => t.citations.forEach((c) => { if (CITATION_NOTES[c.doi]) c.note = CITATION_NOTES[c.doi]; }));

// ---- key -> topic map ----
const entries = {};
const make = (title, topic) => {
  const t = topics[topic];
  if (!t) return { title, summary: PH, recommendation: "", evidenceStrength: "", citations: [], status: "placeholder" };
  return { title, topic: `${topic}. ${t.heading}`, summary: t.summary, recommendation: t.recommendation,
    evidenceStrength: t.evidenceStrength, citations: t.citations, status: "evidence", source: `evidence.md §${topic}` };
};
const splitTitles = { full_body: "Why full body?", upper_lower: "Why upper / lower?", hybrid: "Why a hybrid split?", ppl: "Why push / pull / legs?" };
for (const s of Object.values(D.splits)) entries[s.whyKey] = make(splitTitles[s.id], 4);
// 5-day hybrid: if topic 4 has its own 5-day hybrid line, use it as the recommendation.
// Otherwise show only topic 4's frequency reasoning: first sentence of (b) ("Hit each muscle about 2x per week.").
if (entries["split.hybrid"] && entries["split.hybrid"].status === "evidence") {
  const h = entries["split.hybrid"], line = topics[4] && topics[4].hybridLine;
  if (line) { h.recommendation = line; h.trimmed = "recommendation = 5-day hybrid line from evidence.md §4"; }
  else { h.recommendation = (h.recommendation.match(/^[^.]*\./) || [h.recommendation])[0]; h.trimmed = "recommendation trimmed to frequency sentence of evidence.md §4 (b)"; }
}
for (const l of Object.keys(D.prescription.sets)) entries[`sets.${l}`] = make("Why this many sets?", 5);
for (const g of Object.keys(D.prescription.reps)) for (const t of ["compound", "isolation"]) entries[`reps.${g}.${t}`] = make("Why this rep range?", 3);
for (const l of Object.keys(D.prescription.rir)) entries[`rir.${l}`] = make("Why train at this RIR?", 2);
for (const t of ["compound", "isolation"]) entries[`rest.${t}`] = make("Why this rest time?", 6);
for (const [id, ex] of Object.entries(D.exercises)) {
  entries[`exercise.${id}`] = make(`Why ${ex.name}?`, 8);
  entries[`lengthened.${id}`] = make("Why the lengthened position?", 7);
}
entries["principle.mechanical_tension"] = make("How Carlsen decides: mechanical tension", 1);
entries["volume.hard_sets"] = make("Why count hard sets per muscle?", 5);
entries["checkin.adjustment"] = make("Why adjust next week like this?", 5);
entries["onboarding.goal"] = make("Why the goal question matters", 3);
entries["onboarding.days"] = make("Why days per week matters", 4);
// No matching topic in evidence.md -> placeholder
entries["onboarding.experience"] = make("Why experience matters", null);
entries["onboarding.session_length"] = make("Why session length matters", null);
entries["onboarding.equipment"] = make("Why equipment matters", null);

const doc = {
  _meta: {
    source: mdPath, imported: new Date().toISOString(),
    topicsFound: Object.keys(topics).length,
    framing: "Mechanical tension. No weekly-set-count slogans, no muscle micro-tear claims.",
    rules: "All Why? text and citations live ONLY in this file, copied from evidence.md. Never invent studies. Items marked do-not-use/retracted are skipped.",
    entrySchema: { title: "UI heading", topic: "evidence.md topic", summary: "(a) App justification", recommendation: "(b)", evidenceStrength: "(d)", citations: "(c) [{authors,year,title,journal,doi,url,pmid,note?,optional?}]", status: "evidence | placeholder", source: "evidence.md §N" }
  },
  entries
};
fs.writeFileSync(outPath, JSON.stringify(doc, null, 2) + "\n");
console.log("wrote", outPath);
const ph = Object.entries(entries).filter(([, e]) => e.status === "placeholder").map(([k]) => k);
console.log(`topics parsed: ${Object.keys(topics).length}; entries: ${Object.keys(entries).length}; placeholders: ${ph.join(", ") || "none"}`);
for (const [n, t] of Object.entries(topics)) console.log(`  §${n}: ${t.citations.length} citations`);
