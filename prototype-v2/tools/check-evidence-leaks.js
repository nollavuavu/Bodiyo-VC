// Leak check for the evidence import: nothing from "Research notes (not shown in app)" lines, no retracted /
// left-out paper and no PMID that is only named in research notes reaches evidence.json. Run after import-evidence.js.
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), gate = JSON.parse(fs.readFileSync(path.join(__dirname, "approved-topics.json"), "utf8"));
const md = fs.readFileSync(path.join(root, gate.source), "utf8").split("\n");
const ev = fs.readFileSync(process.argv[2] || path.join(root, "evidence.json"), "utf8");
const notes = md.filter((l) => l.startsWith("**Research notes (not shown in app):**"));
const cited = new Set(md.filter((l) => /^\s*- |^\*Also verified/.test(l) && !/retracted|do[- ]not[- ]use/i.test(l)).flatMap((l) => l.match(/PubMed (\d+)/g) || []).map((x) => x.split(" ")[1]));
const notePmids = [...new Set(notes.flatMap((l) => l.match(/PubMed (\d+)/g) || []).map((x) => x.split(" ")[1]))];
const onlyInNotes = notePmids.filter((p) => !cited.has(p));
const fails = [];
for (const p of onlyInNotes) if (ev.includes(p)) fails.push("PMID " + p + " (research notes only) appears in evidence.json");
for (const name of ["Barbalho", "Graham", "Cleather"]) if (new RegExp("\\b" + name + "\\b").test(ev)) fails.push(name + " appears in evidence.json");
if (/Research notes/i.test(ev)) fails.push("'Research notes' text appears");
let phr = 0; for (const l of notes) { const body = l.replace(/^\*\*Research notes \(not shown in app\):\*\*\s*/, ""); for (const s of body.split(/(?<=\.)\s+/)) if (s.length > 40) { phr++; if (ev.includes(JSON.stringify(s).slice(1, -1))) fails.push("research-note sentence leaked: " + s.slice(0, 80)); } }
const maeo = /Cited for its muscle growth results at long muscle lengths, not for muscle damage\./.test(ev);
if (!maeo) fails.push("Maeo 2021 context note missing");
console.log(`research-note lines: ${notes.length}, sentences checked: ${phr}, PMIDs named only in research notes: ${onlyInNotes.join(", ") || "none"}; Maeo note: ${maeo ? "present" : "MISSING"}`);
console.log(fails.length ? "FAIL\n" + fails.join("\n") : "PASS: no excluded paper, PMID or research-note text in evidence.json");
process.exit(fails.length ? 1 : 0);
