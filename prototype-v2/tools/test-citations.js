// Citation parsing test (Vance's 19:16 report): every (c) citation line in the approved evidence snapshot must come out
// of tools/import-evidence.js with its DOI (or "no DOI registered"), PubMed id, [tags] and a non-empty detail, verbatim.
// The expected values are parsed here independently of the importer (simple string splits, not the importer's regex).
// Run: node tools/test-citations.js   (writes only to a temp file)
const fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, ".."), GATE = JSON.parse(fs.readFileSync(path.join(__dirname, "approved-topics.json"), "utf8"));
const MD = path.join(ROOT, GATE.source), OUT = path.join(os.tmpdir(), "lift-test-citations-" + process.pid + ".json");
let pass = 0, fail = 0; const check = (name, ok, info) => { ok ? pass++ : fail++; console.log((ok ? "PASS " : "FAIL ") + name + (ok || !info ? "" : "  " + info)); };
execFileSync(process.execPath, [path.join(__dirname, "import-evidence.js"), "--out", OUT], { stdio: "pipe" });
const ev = JSON.parse(fs.readFileSync(OUT, "utf8")); fs.unlinkSync(OUT);
// independent parse of the snapshot: topic headings, (c) blocks, bullet lines
const expected = []; let topic = null, inC = false;
for (const line of fs.readFileSync(MD, "utf8").split("\n")) {
  const h = line.match(/^#{2,3} (\d+[a-z]?)\. /); if (h) { topic = h[1]; inC = false; continue; }
  if (/^## /.test(line)) { topic = null; inC = false; continue; }
  if (/^\*\*\(c\)/.test(line)) { inC = true; continue; }
  if (/^\*\*/.test(line)) { inC = false; continue; }
  if (!topic || !inC || !line.startsWith("- ")) continue;
  if (/do[- ]not[- ]use|retracted/i.test(line)) continue;            // the importer drops these on purpose
  const doi = line.includes("https://doi.org/") ? line.split("https://doi.org/")[1].split(/[\s,)]/)[0] : "";
  const pmid = line.includes("(PubMed ") ? line.split("(PubMed ")[1].split(")")[0] : "";
  const open = line.indexOf(" ["), close = line.indexOf("] — ", open);
  expected.push({ topic, doi, pmid, tags: open > 0 && close > 0 ? line.slice(open + 2, close) : "", detail: close > 0 ? line.slice(close + 4).trim() : "", line: line.slice(2, 70) });
}
check(`snapshot has (c) citation lines (${expected.length})`, expected.length >= 200);
check("every snapshot citation line has [tags] and a detail after '] — '", expected.every((e) => e.tags && e.detail), expected.filter((e) => !e.tags || !e.detail).map((e) => e.line).join(" | "));
// collect parsed citations per evidence.md topic (an entry's `topic` field holds the topic id it was imported from)
const brand = (s) => s.replace(/\bCarlsen(?=['’]s\b|\b)/g, "Lift");
const all = Object.values(ev.entries).flatMap((e) => (e.citations || []).map((c) => Object.assign({ _src: String(e.source || "") + " " + String(e.topic || "") }, c)));
const missing = [], wrong = [];
for (const e of expected) {
  const hit = all.filter((c) => (e.doi ? c.doi === e.doi : c.pmid === e.pmid) && (!e.doi || !e.pmid || c.pmid === e.pmid));
  if (!hit.length) { missing.push(e.topic + ": " + e.line); continue; }
  const ok = hit.some((c) => c.detail === brand(e.detail) && c.tags === brand(e.tags));
  if (!ok) wrong.push(e.topic + ": " + e.line + " -> detail=" + JSON.stringify((hit[0].detail || "").slice(0, 60)));
}
check("every snapshot citation is in evidence.json (matched by DOI, or PubMed id when no DOI is registered)", !missing.length, missing.join(" | "));
check("every imported citation keeps its tags and a non-empty detail, verbatim from the snapshot", !wrong.length, wrong.slice(0, 5).join(" | ") + (wrong.length > 5 ? ` (+${wrong.length - 5})` : ""));
check("no imported citation has an empty detail", all.every((c) => c.detail && c.detail.trim()), all.filter((c) => !c.detail).map((c) => c.authors).slice(0, 5).join(", "));
check("DOIs and PubMed ids are well-formed (10.x/…, digits)", all.every((c) => (!c.doi || /^10\.\d{4,}\/\S+$/.test(c.doi)) && (!c.pmid || /^\d+$/.test(c.pmid))));
check("a tag group containing ' — ' (Myrholt 2023) does not leak into the detail", all.filter((c) => c.doi === "10.1123/ijspp.2022-0161").every((c) => /reviewed — volume-matched/.test(c.tags) && /^Squat and bench press/.test(c.detail)));
console.log(`\n${pass}/${pass + fail} checks passed`); process.exit(fail ? 1 : 0);
