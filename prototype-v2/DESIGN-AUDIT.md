# Design audit – prototype v2 (impeccable, 2 rounds)

⚠️ DEGRADED: single-context (no sub-agent tool exposed to this executor; Assessment A (design review) and Assessment B (detector + browser evidence) were run one after the other by one agent)

Surfaces reviewed: every screenshot in `screenshots/` (58 from `tools/test-flows.js`, 390×844 @2x, Europe/Helsinki), plus rendered DOM dumps of 11 screens (onboarding, split, home, train, plan, week, library, you, exercise detail, community, workout) scanned with
`impeccable detect` both as static files and as rendered pages (`http://localhost:8765/<screen>.html`, served locally for the scan only).

## Round 1 – findings

### Deterministic scan (detector)
| Finding | Where | Count | Verdict |
|---|---|---|---|
| low-contrast: set-input placeholders `#75757A` on `#1F1F1F` = 3.6:1 | workout (`.cell-in::placeholder`) | 54 | **Real.** The placeholders carry the suggested kg / reps / RIR, so they are content, not decoration. |
| low-contrast: search placeholder (browser default `#757575`) = 3.6:1 | library, pickers | 1 | **Real.** |
| tight-leading 1.28× | workout (3 elements, static-file mode only) | 3 | **False positive.** Not reproduced by the rendered-page scan, and no element in the rendered DOM has a computed line-height below 1.3 with wrapping text. |
| design-system-font / color / radius | all screens | many | **False positive.** The detector picked up an unrelated `DESIGN.md` from the scratch folder (the impeccable repo). Re-run from a clean folder: none. |

### Design review (visual, from the screenshots)
| Sev | Issue | Fix |
|---|---|---|
| P1 | An undo toast ("Deleted Landmine Press") covered the title of a Why? sheet that opened right after it (41-why-deload). | When a sheet is open, toasts move to the top of the screen (`body:has(#sheet:not([hidden])) .toast`). Undo still works. |
| P2 | Screen headings focused on route change (focus is moved there for screen readers) showed a blue focus ring that looked like a selected input (02-split, 04-workout, 15-summary, 16-week…). | `[tabindex="-1"]:focus { outline: none; }`. Keyboard focus rings on real controls are unchanged. |
| P2 | Exercise detail subtitle read "Compound · barbell" (lower-case gear). | Gear is capitalised: "Compound · Barbell". |
| P2 | Swap reasons read "same muscle · hardest mid-range · supported". | The label is now "Hardest in the middle" (matches "Hardest near the stretch / squeeze"). |
| P2 | The Data line on You still said "18 topics imported from evidence.md", which is wrong under the approval gate. | It now reads from the gate: "8 topics QA-approved (topics 1–8), 10 pending QA approval, built <date>". |
| P2 | The You screen showed the storage prefix `carlsen2.` (the code name, see the naming rule). | It now says "Everything stays in this browser (local storage); nothing is sent anywhere." |
| P3 | A coaching convention said "(the upper end of topic 5's 3–8 heuristic)": a topic-number reference in user copy (qa-report Step 3 fix 3). | "(the upper end of the roughly 3–8 sets per muscle per session guide)". |
| P3 | Long exercises.json names ("Cable Lateral Raise (low pulley, cable across the front)") wrap to two or three lines in the workout header. | Not changed; this is the library's naming. Listed for Laurent as a known issue. |
| P3 | "[Pending QA approval]" shows in a few places users see (the Deload card on Plan, the Next-time Why?, three Why? sheets). | Required by the approval gate. Styled muted at 17px so it doesn't read like an answer. Listed as a known issue. |

## Round 2 – after the fixes

* Placeholders now use `#8E8E93` (5.06:1 on `#1F1F1F`), through one global `::placeholder` rule.
* Rendered-page scan: **0 findings on all 11 screens** (`--no-advisory`). The static-file scan only reports the 3 tight-leading false positives.
* Screenshots re-taken by `tools/test-flows.js` (95/95) and reviewed again: no overlapping toasts, no ring on headings, the gear is capitalised, the Data line is correct.

## Design Health Score (Nielsen, after round 2)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 4 | Live timer, set counts, a rest bar and an in-progress resume bar on every tab. |
| 2 | Match system / real world | 3 | "RIR" is gym jargon; there is a Why? on "Logging RIR", but no plain gloss on first use. |
| 3 | User control and freedom | 4 | Undo on remove/delete/copy, in-app confirms, "Just today vs Update plan" on a swap. |
| 4 | Consistency and standards | 3 | The exercises.json names are much longer than the v1 names, so row heights vary. |
| 5 | Error prevention | 4 | Inline set validation, a duplicate-name check, never-blocking coaching notes, a start-conflict dialog. |
| 6 | Recognition rather than recall | 4 | The previous set and the suggestion sit inline in each row. Swap ranks a "Best match". |
| 7 | Flexibility and efficiency | 3 | Placeholders fill blank fields on tick. No bulk "copy last session". |
| 8 | Aesthetic and minimalist | 3 | "[Pending QA approval]" placeholders add noise until topics 9–15 are approved. |
| 9 | Error recovery | 4 | Specific messages ("Weight can't be negative…"), and corrupted storage recovers. |
| 10 | Help and documentation | 3 | One Why? per item. Pending topics have no research yet. |
| **Total** | | **35/40** | **Excellent** |

## Audit Health Score

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 4 | 44px targets, AA contrast across the board after round 2, focus moved to headings, aria-invalid plus describedby on set errors. |
| 2 | Performance | 4 | Static files, no network, ~120 KB of generated data. |
| 3 | Theming | 4 | One token set (#161719/#1F1F1F surfaces, #3D9BE9 accent text, #1D6FBF filled buttons), platform font. |
| 4 | Responsive | 3 | Built and checked at 390×844 only, with the column capped at 480px. Not checked on small Android sizes. |
| 5 | Implementation integrity | 4 | The detector finds no slop patterns. Lucide icons are vendored. Every user-facing string goes through `esc()` (see README, Security). |
| **Total** | | **19/20** | **Excellent** |

## Round 3 – i18n and all topics approved (19:00–19:20 EET)

* The rendered-page scan was re-run on a local copy (served on localhost only for the scan) in Vietnamese (`?lang=vi`: onboarding, home, workout, library, you) with `--no-advisory`: **0 findings**. In the pseudo-locale, the only finding is one advisory "straggler" (a lone last word in `p.lt-sub` on onboarding). This is expected with +40 % padded text, so it was left alone.
* Pseudo-locale screenshots (`screenshots/i18n/pseudo-*.png`, 26 screens, sheets and dialogs) were reviewed by eye. There is no clipping and no horizontal overflow at 390 px. Long labels wrap: the buttons, segments, chips and tags wrap, and the tab-bar labels truncate with an ellipsis. Two tight spots are acceptable: the workout table header ("Set / Previous") and the weekday column on the split screen both wrap to two lines in pseudo.
* Vietnamese preview (`screenshots/i18n/vi-draft-preview-*.png`) uses Vance's vi.draft.json, injected in memory by the test only. Diacritics (ự, ẩ, ố, ờ…) render cleanly at the 1.45 line-height used under `html[lang="vi"]`. The stacked marks are not clipped in buttons or headings.
* Rows 8 and 10 of the score table above were written before all topics were approved. There are no "[Pending QA approval]" placeholders left (evidence.js: 0 placeholder / 0 pending), and the You Data line now reads "Evidence: all 17 topics QA-approved (topics 1, …, 12, 13a, 13b, 13c, 14 and 15). Imported <date>."

## Font and accent decisions (unchanged from v1)
* Platform font stack (`-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, Roboto, "Segoe UI", sans-serif`) with tabular numbers. Nothing is downloaded.
* Accent: Vance's ~#2891DC fails as a fill under white text (3.4:1). So text and icon accent is `#3D9BE9` (6.03:1 on #161719), and filled buttons are `#1D6FBF` (white 5.15:1).
* Vietnamese: no web font is shipped. The platform stack covers Vietnamese on iOS/macOS (SF), Android (Roboto/Noto), Windows (Segoe UI) and Linux (Noto Sans). `tools/test-i18n.js` checks through CDP that the Vietnamese text renders in ONE platform font with no per-glyph fallback (headless Chrome on Linux: Noto Sans, 51 glyphs). `html[lang="vi"]` gets a slightly taller line-height (1.45) for the stacked diacritics.
