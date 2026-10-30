# Project Carlsen team roster

Read this before you start any task. Ask the owner before you duplicate their work.
Lead: **Agent Luxanna** (615b0523-3679-460e-b20f-7725c9931007). She hands out assignments, receives reports and is the only one who talks to Hoang about Carlsen. Hoang has the final say.

Rules: mechanical-tension framing; no "20 sets a week" slogan; no muscle-damage/micro-tear reasoning; never invent a study; only Silas edits evidence.md.

| Agent | ID | Owns | Main files | Go to them for |
|---|---|---|---|---|
| Silas | 8643763a-f67e-48dd-ab2d-3a9526a81e75 | Evidence library, the only editor of evidence.md | evidence.md | Any claim, citation, app "Why?" copy, evidence grades |
| Stirner | 0b7eb863-3453-4986-a3ef-f86aa2da2eff | Lead fact-checker and final QA of evidence and app | qa-report.md, qa-report-v2.md | Whether a claim or citation is approved; prototype bugs |
| Vinci | aa7e4c89-63ab-4f97-8df4-877a92b244b8 | **Sole owner of contradicting studies**: finds, reads and resolves papers that disagree with each other or with our claims, and recommends how each claim should change. Later does the v2 design critique. | qa-bobby-contradictions.md, design-critique-v2.md | "Study X says the opposite of Y", conflicting results, how strong the disagreement is |
| Laurent | 10aefcb4-8495-4848-a194-9a16f0197ebe | Citation audit for topics 9-15, then the exercise library; Security (v2 audit, future auth/payments plan) | qa-bobby-citations.md, exercises.json, security.md | Whether a citation exists and is correct; exercise muscles, profile, stretch position, swaps; XSS, secrets, CSP, auth/payments/GDPR |
| Emrys | a6e27a7b-d853-4d49-b1bc-4104a206c89e | Numbers check (do the figures match the papers), then the PWA install | qa-bobby-numbers.md | Rep ranges, rest, sets and effect sizes vs the papers; phone install |
| Vance | ff586414-198b-4cec-a8e7-429afb70b39b | Competitor and product research, UI patterns; **owner of the English-to-Vietnamese translation** (UI, exercises, app-visible evidence copy) | app-teardown.md, design-notes.md, lyfta-screens/, i18n/vi.json, i18n/glossary-vi.md | How Lyfta, Hevy, Strong, Fitbod and RP do things; Vietnamese wording and terminology |
| Xander | 2e450e75-4b18-4ba7-a6b9-a0b7e5ba05b3 | Builder of prototype v1 and v2, imports evidence into the app | prototype/, prototype-v2/, evidence.json | App features, UI, data import |
| Shrader | 9cc90495-8ef5-4fc3-a83c-e91a3171e2a3 | Bobby team lead; pushes final v2 to a private GitHub repo | (none) | Bobby team status, GitHub |

## How work flows
1. Silas writes evidence. Laurent checks the citations, Emrys checks the numbers, and Vinci handles every contradiction. All of them send findings to Silas (who edits) and Stirner (who approves).
2. If you find a contradiction yourself, send it to Vinci. Don't investigate it on your own.
3. Stirner gives the final approval on evidence. Xander imports only approved evidence into the app.
4. Vinci critiques the design, and Emrys does the PWA once v2 lands. Then Shrader pushes to GitHub.
5. Report results to Luxanna with priority true, and send FYIs with priority false.
