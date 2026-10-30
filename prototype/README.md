# Carlsen – clickable prototype

Gym-app prototype (Lyfta-style look). No backend, no live AI. Open `index.html` directly (works from `file://`).

## Files
- `index.html`, `styles.css`, `app.js` – UI (hash router, localStorage).
- `data.js` – programme data only: exercises, session templates, splits per days/week, prescriptions (sets/reps/RIR/rest). **No justification text.**
- `evidence.json` – the ONLY place for Why? text and citations. Built from `/workspace/carlsen/evidence.md`.
- `evidence.js` – GENERATED (`window.EVIDENCE = …`) so the app works from file:// without fetch. Do not edit.
- `tools/import-evidence.js` – parses evidence.md → evidence.json (verbatim text/citations; skips retracted/do-not-use items; keys without a matching topic stay `[PLACEHOLDER: awaiting evidence.md]`).
- `tools/build-evidence.js` – evidence.json → evidence.js, and checks every Why? key used by data.js exists.
- `tools/screenshots.js` – headless Chrome (puppeteer-core) test: clicks through the flow, verifies splits for 2–6 days, localStorage persistence, Why? key coverage, console errors; writes `screenshots/`.

## Update evidence
```
node tools/import-evidence.js     # reads ../evidence.md
node tools/build-evidence.js      # regenerates evidence.js + key check
```

## Routes
`#/onboarding` `#/split` `#/plan` `#/home` `#/workout/<i>` `#/summary/<id|latest>` `#/exercise/<id>` `#/library` `#/you`.
Append `?why=<key>` to open a Why? sheet (e.g. `#/split?why=split.upper_lower`).

## Splits
2–3 days full body · 4 upper/lower · 5 hybrid (Upper, Lower, Push, Pull, Legs) · 6 PPL.

## evidence.json
`{ _meta, entries: { "<key>": { title, topic, summary, recommendation, evidenceStrength, citations:[{authors,year,title,journal,doi,url,pmid,note?,optional?}], status: "evidence"|"placeholder", source } } }`
Key families: `split.*`, `sets.<level>`, `reps.<goal>.<compound|isolation>`, `rir.<level>`, `rest.<type>`, `exercise.<id>`, `lengthened.<id>`, `volume.hard_sets`, `checkin.adjustment`, `principle.mechanical_tension`, `onboarding.*`.

## Run screenshots
`cd /workspace/carlsen-tools && node shoot.js` (puppeteer-core installed there; same script as tools/screenshots.js).

## Importer rules (tools/import-evidence.js)
- Reads only numbered `## N.` topic sections (header, Changelog and Notes sections are ignored).
- Inside topics, skips lines starting with `**Research notes (not shown in app):**`, plus `Note:` / `Curator note` / `QA note` lines and sentences about retracted or do-not-use papers; strips "(see Topic N)" cross-references; resolves short cross-reference citations to the full citation with the same DOI.
- `split.hybrid` recommendation = topic 4's 5-day hybrid sentence if present, else the first (frequency) sentence of topic 4 (b).
- Onboarding Why? chips render only for entries with real evidence.
- `--out <file>` writes elsewhere for dry runs: `node tools/import-evidence.js ../evidence.md --out /tmp/test.json`.

## Programming audit
`node tools/audit-programme.js [data.js]` (set `LEVEL=beginner|advanced` to change the sets per exercise) prints direct sessions per week and weekly hard sets per muscle for every split × equipment × session length, and flags anything under ~2×/week (§4), outside 3–8 hard sets per muscle per session (§5), duplicate patterns, or slots with no exercise. A slot written as `a|b` falls back to pattern b when the equipment setup has no exercise for a. The before/after results are in AUDIT.md.
