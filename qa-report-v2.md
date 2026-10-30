# Carlsen QA report, round 2 (full audit)

Round-2 full and careful audit by Stirner, 2026-10-29 (Europe/Helsinki, EET). Nothing in /workspace/carlsen was edited except this file. Round-1 and Step-3 findings stay in `qa-report.md`.

## Exercise library (Laurent)

**Scope:** the 9 `evidenceNote`s in `exercises.json` (5 citations), the two wording calls (Kubo squat type, Maeo "pushdown"), whether the notes match evidence.md, and a script plus judgement check of all 116 entries, `exercises-README.md` and `exercises-citations.md`.

**How each citation was checked:**
- PubMed efetch: authors, year, journal, volume and pages, publication type, CommentsCorrections.
- Crossref: `updated-by` and `relation`.
- Europe PMC and OpenAlex: open-access status.
- I read the abstract for all 5 and the methods and results where I could get the full text:
  - Maeo 2021: PMC7969179
  - Kikuchi 2017: PMC5812864
  - Maeo 2023: Wiley/T&F full text (participants and training sections)
  - Kubo 2019: full-text PDF (methods: subjects and squat training)
  - Kassiano 2026: abstract only (paywalled), so its methods detail is not verified.

**Metadata and retractions:** all 5 PMIDs resolve, and authors, year, journal, volume and pages match `exercises-citations.md`. None has a retraction, correction or expression of concern in PubMed, Crossref or Europe PMC.

**Counts:** 9 notes. 1 approve, 8 fix (2 for substance: `barbell-bench-press` and `triceps-pushdown`; 6 small wording or population fixes), 0 remove.

| item | citation | verdict | note with exact fix |
|---|---|---|---|
| `barbell-bench-press` | Kikuchi & Nakazato 2017, JESF 15(1):37–42, PMID 29541130 | **fix** | Numbers and population are right: 18 men aged 19–22, 8 wk, 3 sets to failure, 2×/wk, push-ups adjusted to 40% of bench 1RM. **Problem:** "so either can fill a horizontal-push slot" is stronger than the paper and evidence.md 13c. Only a light (40% 1RM) bench was tested, groups were 9 each, and the result was a time effect only (no group difference detected). Also missing: sets were to failure. **Replace with:** "In a small 8-week trial in young men (n=18, 9 per group), a light bench press (40% 1RM) and push-ups matched to the same load, both taken to failure, gave similar chest and triceps growth. (Kikuchi et al. 2017, PMID 29541130)" |
| `push-up` | Kikuchi & Nakazato 2017, PMID 29541130 | **fix (minor)** | Accurate. "When sets were hard" is vaguer than the protocol (to failure), and the small sample isn't stated. **Replace with:** "In a small 8-week trial in young men (n=18, 9 per group), push-ups matched to 40% of bench-press 1RM and taken to failure grew the chest and triceps about as much as a light bench press. (Kikuchi et al. 2017, PMID 29541130)". Side note: the paper contradicts itself on training status. The aim says "untrained men", but the methods say "recreational noncompetitive exercisers with minimum resistance training experience of 1 year". So keep "young men" and don't add "trained" or "untrained". |
| `triceps-pushdown` | Maeo et al. 2023, EJSS 23(7):1240–1250, PMID 35819335 | **fix** | Numbers are right: whole triceps +13.9% vs +19.9%, MRI volume, 12 wk. Missing: participants were untrained (14 M, 7 F, about 23–24 y, no systematic RT in the past 12 months) and each person trained one arm each way. The "pushdown" label needs the qualifier in wording call (b) below. **Replace with:** "In a 12-week trial in untrained young adults (n=21, one arm each way), one-arm cable elbow extensions with the upper arm at the side (a pushdown-style position) grew the whole triceps less than overhead cable extensions (+13.9% vs +19.9% volume); overhead work loads the long head at a longer length. (Maeo et al. 2023, PMID 35819335)" |
| `overhead-cable-triceps-extension` | Maeo et al. 2023, PMID 35819335 | **fix (minor)** | Accurate: 1.4-fold whole triceps (d=0.54), and loads were 34–39% lighter overhead. Add the population, and use "arms-at-side" as in evidence.md topic 11. **Replace with:** "In a 12-week trial in untrained young adults (n=21, one arm each way), overhead cable elbow extensions, which stretch the long head more, grew the whole triceps about 1.4 times more than arms-at-side cable extensions (+19.9% vs +13.9%), despite lighter loads. (Maeo et al. 2023, PMID 35819335)" |
| `barbell-back-squat` | Kubo et al. 2019, EJAP 119(9):1933–1942, PMID 31230110 | **fix (minor)** | Accurate: knee extensors +4.9% vs +4.6%, RF and hamstrings unchanged, adductors 6.2% vs 2.7% and glutes 6.7% vs 2.2% (both greater with full squats). Missing: subjects were untrained men (about 21 y, no organized exercise for ≥1 yr), and the depths should be defined. **Replace with:** "In a 10-week trial in untrained young men (n=17), full-depth barbell back squats (about 140° knee bend) grew the glutes and adductors more than half squats (about 90°); knee-extensor volume grew similarly (+4.9% vs +4.6%), and the rectus femoris and hamstrings did not grow with either depth. (Kubo et al. 2019, PMID 31230110)". Attaching the note to the barbell back squat is fair; see wording call (a). |
| `smith-machine-squat` | Kassiano et al. 2026, JSCR 40(4):367–376, PMID 41379528 | **fix (minor)** | Accurate: 63 untrained young women, Smith back squat (n=30) vs leg extension (n=33), 8 wk, ultrasound muscle thickness, distal VL +18.2% vs +11.2%, RF grew less with squats. "So a knee-extension exercise is a useful addition" is an inference: the trial compared the two exercises and didn't test adding one. It matches evidence.md topic 10(b), but should be hedged. **Replace the ending with:** "…but grew the rectus femoris less, so adding a knee-extension exercise may help the rectus femoris." Optional: "grew … thicker" instead of "grew", because thickness was measured, not volume. |
| `leg-extension` | Kassiano et al. 2026, PMID 41379528 | **approve** | Accurate. The RF was greater at all three sites (proximal 11.4% vs 2.0%, mid 12.3% vs 5.7%, distal 17.5% vs 7.9%), and the squat had the edge for distal VL. Population is stated. It matches evidence.md topics 10 and 11 word for word on the numbers. |
| `seated-leg-curl` | Maeo et al. 2021, MSSE 53(4):825–837, PMID 33009197 | **fix (minor)** | Accurate: whole hamstrings +14% vs +9% (MRI), seated hip about 90° vs prone about 30°. Missing: untrained young adults, one leg each way. Optionally say that only the biarticular hamstrings grew more and the short head grew the same (+10% vs +9%). **Replace with:** "In a 12-week trial in untrained young adults (n=20, one leg each way), seated leg curls, which load the hamstrings at a longer length because the hips are bent, grew the whole hamstrings more than lying leg curls (+14% vs +9% volume). (Maeo et al. 2021, PMID 33009197)" |
| `lying-leg-curl` | Maeo et al. 2021, PMID 33009197 | **fix (minor)** | Accurate. Same population gap. **Replace with:** "In a 12-week trial in untrained young adults (n=20, one leg each way), lying leg curls grew the hamstrings less than seated leg curls (+9% vs +14% volume); the seated version trains them at a longer length. (Maeo et al. 2021, PMID 33009197)" |

### Wording calls

**(a) Kubo 2019, "squat training" attached to `barbell-back-squat`: fair.**
- The methods ("Squat training") say: "The barbell was positioned across their shoulders on the trapezius". It was done in a squat rack with the safety bar set to cue depth, shoulder-width stance and a lifting belt allowed.
- This is a free-barbell, high-bar back squat. It was not a Smith machine.
- Full squat was about 140° knee flexion and half squat about 90°.
- Loading went from 60% 1RM × 10 up to 3 × 8 at about 80–90% 1RM, with load increased when all reps were completed.
- Training status: "physically active, but had not participated in any organized program involving regular exercise for at least 1 year" (untrained).
- Suggested text: see the table row. The key additions are "untrained young men", "full-depth barbell back squats (about 140° knee bend)" and "half squats (about 90°)".

**(b) Maeo 2023, "pushdown" for the neutral-arm condition: fair only with a qualifier.**
- The methods say: standing, cable machine, unilateral, shoulder at 0° (upper arm by the side), elbow 90°→0°, with a supinated grip to hold the shoulder position.
- That is a one-arm, reverse-grip, pushdown-like movement with a shortened range. It is not a standard two-hand rope or bar pushdown, which is how the library item is named ("rope or bar, high pulley").
- So don't call it a plain "pushdown". Use "one-arm cable elbow extensions with the upper arm at the side (a pushdown-style position)" in the `triceps-pushdown` note, and "arms-at-side cable extensions" in the overhead note.
- In evidence.md, topic 11 already says "arms-at-side extensions". Topic 7's app copy says "pushdowns". That's Silas's file, so I'm flagging it only and haven't edited it.

### Wording parity with evidence.md
- **Kikuchi:** the `barbell-bench-press` note goes beyond evidence.md 13c. Its "so either can fill a horizontal-push slot" isn't in evidence.md, and 13c(d) calls the trial small and the evidence weak. Fix as above.
- **Kassiano:** the `smith-machine-squat` note's "useful addition" matches the topic 10(b) recommendation. It's hedged above anyway.
- **All other notes:** they match evidence.md's statements of the same papers, with the same numbers and no strengthening.
- **For Silas, flag only (not edited):** evidence.md leaves out the training status for two papers. Topic 10 calls Kubo 2019's subjects "Men, n=17"; they were untrained. Topic 11 calls Maeo 2023's subjects "Adults, n=21"; they were untrained young adults, 14 M and 7 F.

### Data issues (exercises.json, README, citations file)
Script results:
- 116 entries, all with the same 11 fields.
- No duplicate ids or names. All ids are kebab-case.
- All muscle names are in the allowed 14. No muscle is both primary and secondary.
- No empty or placeholder fields, apart from the intended empty `evidenceNote`s.
- Equipment matches the names, and all Smith exercises are `machine`.
- 40 groups. Only `quads-knee-extension` is a singleton, as documented. No group mixes `stretch` with `shortened`.
- There is no separate swap field. Substitution is group-only, so there are no swaps pointing to missing exercises.
- The contested items have empty notes, as required: all 4 lateral raises, all curl variants (biceps, forearm and preacher curls, plus the Nordic and slider curls), `leg-press`, all 3 hip thrusts and all 6 calf raises.
- The only non-empty notes are the 9 audited above.
- "damage", "micro", "tear", "20 sets" and "sets a week" appear nowhere in the three files. The one exception is "Damage" in the Maeo 2021 paper title in `exercises-citations.md`. That's the title only, not reasoning; evidence.md topic 7 already says not to show the title in a Why? panel.

Judgement issues (none blocking):
1. **`rear-delt-fly` mixes movement patterns.** `face-pull` is a horizontal pull (row plus external rotation, with a lot of upper back) grouped with four reverse flies. Suggest moving it to its own group or making `upper back` co-primary.
2. **`triceps-press` mixes patterns.** `triceps-dip` is a vertical push grouped with `close-grip-bench-press` and `diamond-push-up`, which are horizontal pushes. It's acceptable as a triceps-compound group, but noted.
3. **`triceps-overhead` contains `ez-bar-skull-crusher`.** Its upper arm is at about 90° shoulder flexion, not overhead, so the long head is less lengthened than in the Maeo overhead condition. Suggest renaming the group (e.g. "triceps-long-length") or moving the skull crusher. Either way, don't let the Maeo overhead note imply it applies to skull crushers.
4. **Glute counting changes within squat groups.** `quads-squat` and `quads-squat-machine` share primary `quads`, but glutes are primary in back, goblet, bodyweight, Smith and belt squats and secondary in front squat, hack squat and leg press. Swapping inside a group changes glute credit from 1 to ½. That may be intended, but the README should say so.
5. **Inconsistent overhead-press profiles in `front-delt-press`.** `barbell-overhead-press` is `mid-range` and `seated-dumbbell-shoulder-press` is `stretch`, although the torque pattern is similar. Pick one label or explain the difference in `lengthenedPosition`.
6. **Calves as a secondary muscle in leg curls.** `seated-leg-curl` and `lying-leg-curl` list `calves` as secondary (½ set). By the README's own rule ("muscles that barely grow from a lift are left out"), this has no growth evidence. Suggest removing it or citing a source.
7. **`reverse-barbell-curl` id vs name.** The id says barbell but the name is "Reverse-Grip (Overhand) EZ-Bar Curl". `equipment: barbell` follows the EZ = barbell convention. Cosmetic: suggest renaming the id or the name.
8. **Pushdown name vs study setup.** `triceps-pushdown` is named "rope or bar, high pulley", but the Maeo note describes a one-arm, supinated, 90°→0° movement. It's fine as long as the note uses the qualified wording above.
9. **Dangling reference in `exercises-citations.md`.** "Checked but not used (contradictions sent to Vinci…)" says "See the report for the list", but no file in /workspace/carlsen contains that list. Laurent should either name the report or put the list inline. I haven't looked into the contradictions myself; they belong to Vinci, as TEAM.md says.
10. **Minor:** the `back-row-supported` flag is a false positive. Its primary list is the same two muscles in a different order (`lats, upper back` vs `upper back, lats`), so no change is needed.

**Not verified:** Kassiano 2026's full methods (the exact Smith squat depth and the leg-extension machine) are paywalled. The note relies only on abstract figures, which match.

### Re-check 18:06 (after Laurent's fixes)

Re-verified 2026-10-29 18:06 EET.
- **Compared:** `/workspace/carlsen-scratch/backup-20261029-1803/` (pre-fix) against the current `exercises.json`, `exercises-README.md` and `exercises-citations.md`.
- **Library size:** now 119 exercises in 43 groups. 4 ids were added (3 new exercises plus the renamed `reverse-ez-bar-curl`) and 1 was removed (`reverse-barbell-curl`).
- **Edits:** none, apart from this section.

**Final verdict: approved.** No blocking issues remain. Three optional or downstream items are listed at the end of this section.

#### Notes: final verdicts
All 9 notes now match my replacement text word for word. The one exception is `smith-machine-squat`, which matches the suggested ending plus the optional "thicker". Every note still cites the same 5 PMIDs, so no new citation or claim has been added. No other field of the 9 noted exercises gained a claim.

| item | final verdict | check |
|---|---|---|
| `barbell-bench-press` | **approved** | Exact match. "So either can fill a horizontal-push slot" is gone. |
| `push-up` | **approved** | Exact match. |
| `triceps-pushdown` | **approved** | Exact match, including the qualified "pushdown-style position" and the untrained population. |
| `overhead-cable-triceps-extension` | **approved** | Exact match ("arms-at-side"). |
| `barbell-back-squat` | **approved** | Exact match: untrained young men, about 140° vs about 90°. |
| `smith-machine-squat` | **approved** | Ending matches. On "thicker": the Kassiano 2026 PubMed abstract says "Muscle thickness of the rectus femoris (RF) and vastus lateralis (VL) was measured at the proximal, middle, and distal sites". It measured thickness, not volume or CSA, so "thicker" is supported and, if anything, more precise. The wording is awkward, though. Optional polish: "…Smith machine squats increased distal vastus lateralis thickness more than leg extensions did (+18.2% vs +11.2%) but increased rectus femoris thickness less, so adding a knee-extension exercise may help the rectus femoris." |
| `leg-extension` | **approved** | Unchanged (it was already approved). |
| `seated-leg-curl` | **approved** | Exact match. Calves have been removed from its secondary muscles. |
| `lying-leg-curl` | **approved** | Exact match. Calves have been removed from its secondary muscles. |

#### Data fixes: confirmed
- **Face pulls:** `face-pull` and `cable-rear-delt-row` form the new `rear-delt-upper-back-pull` group (horizontal pull, mid-range, rear delts and upper back both primary). `rear-delt-fly` now holds only the 4 reverse flies, so there's no pattern mix.
- **Dips:** `triceps-dip` and `machine-dip` form the new `triceps-dip` group (vertical push; stretch plus mid-range, which are adjacent and allowed). `triceps-press` now holds only horizontal pushes (`close-grip-bench-press`, `diamond-push-up`).
- **Lying extensions:** `ez-bar-skull-crusher` and `lying-dumbbell-triceps-extension` form the new `triceps-lying-extension` group. `triceps-overhead` now holds only the overhead cable and overhead dumbbell extensions.
- **Squat groups:** every member of `quads-squat` and `quads-squat-machine` has `quads` primary and `glutes` secondary. The README now says this may undercount glutes for deep free-weight squats, which fits Kubo 2019. Lunges keep both muscles primary, as the README says.
- **Overhead presses:** `seated-dumbbell-shoulder-press` is now `mid-range`, matching the barbell and machine presses. `pike-push-up` stays `stretch`, as documented.
- **Leg curls:** calves have been removed from both, and the README says so.
- **Reverse curl:** `reverse-barbell-curl` has been renamed to `reverse-ez-bar-curl`. Equipment is still `barbell` (EZ counts as barbell), and it's in `forearm-reverse-curl` with 2 members.
- **Contradiction list:** `exercises-citations.md` now lists the 6 contradictions inline.
  - I checked existence only, and did not look into the contradictions themselves, which belong to Vinci. All 13 PMIDs in the list resolve on PubMed to the named first author and year: 40692697, 42829982, 41988507, 40082069, 26446291, 31268995, 33977835, 37015016, 36828324, 39959841, 41055237, 40113586 and 37877099.
  - The Plotkin 2023 correction claim checks out. Crossref `updated-by` shows a correction, 10.3389/fphys.2026.1987823, dated 2026-10-28. The notice updates the conflict-of-interest, funding and trial-registration statements (the trial was registered retrospectively). It says this "has no bearing on the originally reported data or results".
  - None of these PMIDs appears in any `evidenceNote`.

#### The 3 new exercises
| id | muscles | equipment / stability | profile / lengthened text | group fit | note | verdict |
|---|---|---|---|---|---|---|
| `cable-rear-delt-row` (rope or bar, pulley at chest height, elbows wide) | P: rear delts, upper back; S: biceps | cable / high | mid-range; lengthened with arms reaching to the pulley and shoulder blades spread. Correct. | Same pattern and primaries as `face-pull`. Fits. | empty | **approved** |
| `machine-dip` (seated) | P: triceps; S: chest, front delts | machine / high | mid-range, with "depends on the machine", which is the README's convention for machines | Vertical push, same primary as `triceps-dip`. Adjacent profiles. Fits. | empty | **approved** |
| `lying-dumbbell-triceps-extension` (neutral grip, upper arms vertical) | P: triceps | dumbbell / high (bench-supported) | mid-range; says the long head is less stretched than fully overhead. Correct. | Same setup as the skull crusher (upper arm at about 90°). Fits. | empty | **approved** |

#### Script re-run on the whole library
- All 119 entries have the same 11 fields.
- No duplicate ids or names. All ids are kebab-case.
- All muscle names are in the allowed 14, and no muscle is both primary and secondary.
- All equipment, profile, stability and pattern values are from the README vocabularies.
- No empty or placeholder fields, apart from the intended empty notes.
- Smith exercises all count as `machine`, and every name's equipment word matches its `equipment` field.
- No group mixes `stretch` with `shortened`, and the only single-member group is `quads-knee-extension`.
- Every group shares a primary muscle. The one remaining difference is in `glutes-deadlift`: glutes are shared, and the second primary differs (hamstrings vs quads). That's acceptable.
- All 9 notes follow the "(Author et al. YEAR, PMID n)" format.
- The contested exercises still have empty notes.
- Banned wording: "damage", "micro", "tear", "20 sets", "sets a week" and "sets per week" appear nowhere in the three files. The one exception is "Damage" in the Maeo 2021 paper title in `exercises-citations.md`, which is a title only.

#### Remaining items (optional or downstream, not blocking)
1. **Optional:** consider the Smith squat wording polish above.
2. **Optional consistency:** `cable-rear-delt-row` and `face-pull` are `mid-range`, while the similar horizontal cable pull `seated-cable-row` is `shortened`. Either label is defensible. Pick one convention for chest-height cable pulls, or add a line to `lengthenedPosition` explaining the difference.
3. **Downstream (not Laurent's files):** `prototype-v2/exercises.js`, `evidence.json` and `evidence.js` were built at 18:01, before this fix. They still use `reverse-barbell-curl` and the old groups (e.g. `face-pull` in `rear-delt-fly`), and they don't have the 3 new exercises. The prototype data needs rebuilding from the current `exercises.json` before the next prototype QA.
4. **Minor:** `exercises-citations.md` points to Vinci's file `qa-bobby-contradictions.md` (as listed in TEAM.md), but that file doesn't exist in /workspace/carlsen yet. I also can't confirm the "sent directly to Vinci" claim from here.


---

# Evidence audit round 2: topics 1–8

# QA v2: evidence.md topics 1–8 (Stirner)
Written Oct 29, 2026, ~18:30 EET (UTC+2). Audited evidence.md version: mtime 18:23:06 EET (169,050 B; includes Silas's 18:23 Myrholt + T8 stability edits). R4 (T4) and R7 (T7) are approved and pending; their points are **not re-flagged**. Nothing in /workspace/carlsen was edited.

**Method:** PubMed efetch (all PMIDs) and Crossref `/works/{doi}` plus the `updates:` filter (all 96 DOIs) for metadata, corrections and retractions. Every tag and summary was checked against the abstract. OA full text was read where it was needed: Singer 2024, Bello 2025 (PMC12821511), the Gschneidner preprint (srxiv.485), and the Myrholt and Lopez erratum texts.

## Counts
- 102 citation rows in T1–T8: 100 from the 18:13 build, plus Behm 2002 and Anderson 2004 added at 18:23.
- **Verdicts:** 90 approve · 12 fix · 0 remove. Of the fixes, 1 is "fix – could not verify" (Buresh thigh).
- **Metadata:** authors, year, volume/issue/pages and DOI match PubMed and Crossref for all 102. Fink 2017 shows Crossref online 2016-12-16 and print 2017, which is fine. Wolf 2023 has no PMID; Crossref gives IJSC 3(1), 2 Mar 2023, with 5 authors matching.
- **Retractions:** none (PubMed pubtypes and Crossref updated-by/updates).
- **Corrections:**
  - Lopez 2021 corrigendum: the only Crossref update.
  - Myrholt erratum: PubMed only.
  - Both are now correctly reflected. Comments (Morton 2019, Currier, Schoenfeld 2017, Hammarström) need no change.
- **Relations:** Robinson 2024, Hermann 2025 and Havers 2025 have SportRxiv preprints. Hammarström 2020 has an F1000 review. No action needed.
- **Banned wording:** grep of lines 14–259 for damage/micro/tear/"20 sets"/"sets a week"/"sets per week"/"weekly sets" found no slogan and no damage reasoning. The only "damage" hits are Maeo 2021's title, plus the research note that warns against showing it.

## Full citation table
| # | T | line | citation | PMID / DOI | tag ok? | verdict | note / exact fix |
|---|---|---|---|---|---|---|---|
| 1 | T1 | 25 | Wackerhage 2019 | 30335577 / 10.1152/japplphysiol.00685.2018 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 2 | T1 | 26 | Roberts 2023 | 37382939 / 10.1152/physrev.00039.2022 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 3 | T1 | 27 | Morton 2019 | 31294822 / 10.1113/JP278056 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 4 | T1 | 28 | Morton 2016 | 27174923 / 10.1152/japplphysiol.00154.2016 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 5 | T1 | 29 | Mitchell 2012 | 22518835 / 10.1152/japplphysiol.00307.2012 | ok* | approve | Tag "untrained men · knee extension" not stated in abstract; full text is paywalled, so could not verify. Earlier rounds accepted it. Optional: "(training status per full text, not re-verified)". |
| 6 | T1 | 30 | Pareja-Blanco 2017 | 27038416 / 10.1111/sms.12678 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 7 | T1 | 31 | Pareja-Blanco 2020 | 32049887 / 10.1249/MSS.0000000000002295 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 8 | T1 | 32 | Pareja-Blanco 2026 | 41872733 / 10.1249/MSS.0000000000003988 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 9 | T1 | 33 | Jukic 2023 | 36178597 / 10.1007/s40279-022-01754-4 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 10 | T1 | 34 | Myrholt 2023 | 36754062 / 10.1123/ijspp.2022-0161 | ok | approve | Erratum (36805934, doi 10.1123/ijspp.2023-0050) verified via its text: Table 2 units cm→mm, corrected 20 Feb 2023. The 18:23 text now states this correctly. No data change to the 6 ± 6%. |
| 11 | T1 | 35 | Andersen 2024 | 34100789 / 10.1519/JSC.0000000000004067 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 12 | T1 | 36 | Terada 2022 | 35622108 / 10.1519/JSC.0000000000003690 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 13 | T2 | 55 | Robinson 2024 | 38970765 / 10.1007/s40279-024-02069-2 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 14 | T2 | 56 | Refalo 2023 | 36334240 / 10.1007/s40279-022-01784-y | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 15 | T2 | 57 | Grgic 2022 | 33497853 / 10.1016/j.jshs.2021.01.007 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 16 | T2 | 58 | Refalo 2024 | 38393985 / 10.1080/02640414.2024.2321021 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 17 | T2 | 59 | Vasconcelos 2026 | 42784046 / 10.3390/muscles5030061 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 18 | T2 | 60 | Vasconcelos 2026 | 42617172 / 10.1519/JSC.0000000000005494 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 19 | T2 | 61 | Santanielo 2020 | 33343066 / 10.5114/biolsport.2020.96317 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 20 | T2 | 62 | Nóbrega 2018 | 29189407 / 10.1519/JSC.0000000000001787 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 21 | T2 | 63 | Lacerda 2020 | 31809457 / 10.1519/JSC.0000000000003438 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 22 | T2 | 64 | Lasevicius 2022 | 31895290 / 10.1519/JSC.0000000000003454 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 23 | T2 | 65 | Hermann 2025 | 40249908 / 10.1249/MSS.0000000000003728 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 24 | T2 | 66 | Martorelli 2017 | 28713535 / 10.4081/ejtm.2017.6339 | ok | ok | fix | Wrong timepoint. Abstract: RNF +3.9% is the 5-wk value; the 10-wk value is **+2.1%**. New: "…but not with 3×7 non-failure (+2.1% at 10 wk)". Also note: only within-group tests were reported, with no between-group test for thickness. |
| 25 | T2 | 67 | Halperin 2022 | 34542869 / 10.1007/s40279-021-01559-x | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 26 | T2 | 68 | Refalo 2025 | 39960821 / 10.1002/ejsc.12266 | FIX | fix | Tag → "[RCT (within-subject legs) · trained men (12) and women (6) · n=18 · 8 wk]"; add "same cohort as Refalo 2024". |
| 27 | T3 | 87 | Schoenfeld 2017 | 28834797 / 10.1519/JSC.0000000000002200 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 28 | T3 | 88 | Lopez 2021 | 33433148 / 10.1249/MSS.0000000000002585 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 29 | T3 | 89 | Carvalho 2022 | 35015560 / 10.1139/apnm-2021-0515 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 30 | T3 | 90 | Schoenfeld 2015 | 25853914 / 10.1519/JSC.0000000000000958 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 31 | T3 | 91 | Morton 2016 | 27174923 / 10.1152/japplphysiol.00154.2016 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 32 | T3 | 92 | Cumming 2025 | 40827709 / 10.1152/japplphysiol.00353.2025 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 33 | T3 | 93 | Bello 2025 | 41562735 / 10.3390/jfmk11010017 | ok | fix | Summary is wrong. Abstract: group×time interaction for triceps (p=0.04; full text Results p=0.007, PMC12821511). Triceps favoured high load. New: "85% vs 30% 1RM to failure, whole body: similar muscle-thickness gains at most sites, but triceps grew more with the heavy load; more 1RM strength with heavy loads." |
| 34 | T3 | 94 | Jenkins 2017 | 28611677 / 10.3389/fphys.2017.00331 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 35 | T3 | 95 | Mitchell 2012 | 22518835 / 10.1152/japplphysiol.00307.2012 | ok* | approve | Same as the T1 Mitchell row. |
| 36 | T3 | 96 | Currier 2023 | 37414459 / 10.1136/bjsports-2023-106807 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 37 | T3 | 97 | Schoenfeld 2021 | 33671664 / 10.3390/sports9020032 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 38 | T3 | 98 | Hammert 2026 | 42319300 / 10.1249/MSS.0000000000004052 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 39 | T3 | 99 | Lasevicius 2018 | 29564973 / 10.1080/17461391.2018.1450898 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 40 | T4 | 118 | Schoenfeld 2019 | 30558493 / 10.1080/02640414.2018.1555906 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 41 | T4 | 119 | Schoenfeld 2016 | 27102172 / 10.1007/s40279-016-0543-8 | ok | fix (covered by approved R4) | "mostly not volume-equated" contradicts the abstract ("on a volume-equated basis"). R4 fixes (d); also change this summary to "…favouring twice a week (volume-equated comparisons)". |
| 42 | T4 | 120 | Pelland 2026 | 41343037 / 10.1007/s40279-025-02344-w | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 43 | T4 | 121 | Ramos-Campo 2024 | 38595233 / 10.1519/JSC.0000000000004774 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 44 | T4 | 122 | Saric 2019 | 30363041 / 10.1519/JSC.0000000000002909 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 45 | T4 | 123 | Gomes 2019 | 29489727 / 10.1519/JSC.0000000000002559 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 46 | T4 | 124 | Evangelista 2021 | 34468591 / 10.31744/einstein_journal/2021AO5781 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 47 | T4 | 125 | Schoenfeld 2015 | 25932981 / 10.1519/JSC.0000000000000970 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 48 | T4 | 126 | Lasevicius 2019 | 31531139 / 10.2478/hukin-2019-0062 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 49 | T4 | 127 | Yue 2018 | 29216446 / 10.1139/apnm-2017-0575 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 50 | T5 | 146 | Pelland 2026 | 41343037 / 10.1007/s40279-025-02344-w | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 51 | T5 | 147 | Schoenfeld 2017 | 27433992 / 10.1080/02640414.2016.1210197 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 52 | T5 | 148 | Krieger 2010 | 20300012 / 10.1519/JSC.0b013e3181d4d436 | ok | fix | Summary → "Multiple sets gave ~40% greater hypertrophy effect sizes than single sets (ES 0.24 for 1 set, 0.34 for 2–3, 0.44 for 4–6; 2–3 vs 1 was only a trend, p=0.09)". Not re-verified beyond the abstract. |
| 53 | T5 | 149 | Radaelli 2015 | 25546444 / 10.1519/JSC.0000000000000758 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 54 | T5 | 150 | Hammarström 2020 | 31813190 / 10.1113/JP278455 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 55 | T5 | 151 | Kassiano 2024 | 38684187 / 10.1055/a-2316-7885 | ok | fix | Summary → "12 vs 6 weekly sets: greater lateral gastrocnemius, soleus and summed triceps-surae thickness gains (medial gastrocnemius n.s.; 9 sets did not differ from either)". |
| 56 | T5 | 152 | Robinson 2024 | 38970765 / 10.1007/s40279-024-02069-2 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 57 | T5 | 153 | Barsuhn 2025 | 39665246 / 10.1152/japplphysiol.00476.2024 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 58 | T5 | 154 | Scarpelli 2022 | 32108724 / 10.1519/JSC.0000000000003558 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 59 | T6 | 173 | Singer 2024 | 39205815 / 10.3389/fspor.2024.1429789 | ok | fix (minor) | Numbers verified in the full text (Table 2). Label the four-category values "(non-controlled pre–post SMDs)" so they aren't read as between-group effects. |
| 60 | T6 | 174 | Grgic 2017 | 28641044 / 10.1080/17461391.2017.1340524 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 61 | T6 | 175 | Schoenfeld 2016 | 26605807 / 10.1519/JSC.0000000000001272 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 62 | T6 | 176 | Buresh 2009 | 19077743 / 10.1519/JSC.0b013e318185f14a | ok | fix – could not verify | "Thigh CSA … did not differ" is not in the abstract. Arm CSA came from skinfold plus circumference (per Singer 2024 Table 1). Verify in the full text, or reword to "arm CSA (estimated from skinfolds/circumference) +12.3% vs +5.1%; strength gains did not differ". |
| 63 | T6 | 177 | Longo 2022 | 35622106 / 10.1519/JSC.0000000000003668 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 64 | T6 | 178 | Ahtiainen 2005 | 16095405 / 10.1519/15604.1 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 65 | T6 | 179 | de 2010 | 20543741 / 10.1519/JSC.0b013e3181ddae4a | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 66 | T6 | 180 | Souza-Junior 2011 | 22032491 / 10.1186/1550-2783-8-17 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 67 | T6 | 181 | Fink 2017 | 27984843 / 10.1055/s-0042-119204 | ok | approve | Crossref issued 2016-12-16 (online), print 2017. The year 2017 is fine. |
| 68 | T6 | 182 | Grgic 2018 | 28933024 / 10.1007/s40279-017-0788-x | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 69 | T6 | 183 | McMahon 2024 | 38953795 / 10.1519/JSC.0000000000004832 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 70 | T6 | 184 | Villanueva 2015 | 25294666 / 10.1007/s00421-014-3014-7 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 71 | T7 | 203 | Maeo 2021 | 33009197 / 10.1249/MSS.0000000000002523 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 72 | T7 | 204 | Maeo 2023 | 35819335 / 10.1080/17461391.2022.2100279 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 73 | T7 | 205 | Kinoshita 2023 | 38156065 / 10.3389/fphys.2023.1272106 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 74 | T7 | 206 | Maeo 2024 | 38857522 / 10.1249/MSS.0000000000003490 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 75 | T7 | 207 | Pedrosa 2022 | 33977835 / 10.1080/17461391.2021.1927199 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 76 | T7 | 208 | Kassiano 2023 | 37015016 / 10.1519/JSC.0000000000004460 | ok | fix | Lateral gastrocnemius vs full ROM was n.s. (p=0.060). New: "Initial (lengthened) partial calf raises gave greater medial gastrocnemius gains than full or final ROM; for the lateral gastrocnemius they beat only the final range." |
| 77 | T7 | 209 | Pedrosa 2023 | 36828324 / 10.3390/sports11020039 | FIX | fix | Tag → "untrained young women" (the abstract's conclusion says untrained). |
| 78 | T7 | 210 | Pedrosa 2025 | 40366729 / 10.1080/02640414.2025.2502895 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 79 | T7 | 211 | McMahon 2026 | 42392615 / 10.1519/JSC.0000000000005561 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 80 | T7 | 212 | Havers 2025 | 41247250 / 10.1002/ejsc.70087 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 81 | T7 | 213 | Goli 2026 | 42006449 / 10.70252/IJES2026403 | ok | approve | The summary is accurate. The (d) wording is the problem: see T7 issues. |
| 82 | T7 | 214 | Kassiano 2023 | 36662126 / 10.1519/JSC.0000000000004415 | ok | approve | — |
| 83 | T7 | 215 | Wolf 2023 | — / 10.47206/ijsc.v3i1.182 | ok | approve | No PMID. Crossref: Int J Strength Cond 3(1), issued 2 Mar 2023, 5 authors match. No pages registered (consistent). No updates. |
| 84 | T7 | 216 | Pedrosa 2026 | 41777276 / 10.1055/a-2733-7605 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 85 | T7 | 217 | Wolf 2025 | 39959841 / 10.7717/peerj.18904 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 86 | T7 | 218 | Gschneidner 2025 | 41055237 / 10.1080/02640414.2025.2567805 | FIX | fix | Training status is stated in the SportRxiv preprint (10.51224/srxiv.485): "previously trained participants". Tag → "trained adults (per preprint) · n=297". Also note that CSA was *estimated from circumference and skinfolds* (preprint), a weak measure. |
| 87 | T7 | 219 | Plotkin 2026 | 42841600 / 10.1249/MSS.0000000000004183 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 88 | T7 | 220 | Larsen 2025 | 40113586 / 10.1080/02640414.2025.2481534 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 89 | T7 | 221 | Varovic 2025 | 40911904 / 10.1139/apnm-2025-0238 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 90 | T8 | 240 | Schwanbeck 2020 | 32358310 / 10.1519/JSC.0000000000003349 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 91 | T8 | 241 | Amanuma 2025 | 41316621 / 10.1016/j.jbmt.2025.09.027 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 92 | T8 | 242 | Larsen 2025 | 40692697 / 10.3389/fphys.2025.1611468 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 93 | T8 | 243 | Kassiano 2022 | 35438660 / 10.1519/JSC.0000000000004258 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 94 | T8 | 244 | Kinoshita 2026 | 41630124 / 10.1249/MSS.0000000000003957 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 95 | T8 | 245 | Kassiano 2025 | 39809454 / 10.1055/a-2517-0509 | ok | fix (minor) | Add: "…preacher gave more distal thickness (0.10 cm)". |
| 96 | T8 | 246 | Kobayashi 2026 | 42829982 / 10.1080/02640414.2026.2741751 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 97 | T8 | 247 | Attarieh 2026 | 42842490 / 10.1519/JSC.0000000000005701 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 98 | T8 | 248 | Kassiano 2025 | 39794667 / 10.1007/s40279-024-02169-z | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 99 | T8 | 249 | Kassiano 2025 | 39388663 / 10.1080/02701367.2024.2409961 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 100 | T8 | 250 | Saeterbakken 2019 | 30934001 / 10.1371/journal.pone.0214302 | ok | approve | Metadata matches PubMed+Crossref; summary matches abstract. |
| 101 | T8 | 251 | Behm 2002 | 12173956 / (none registered) | ok | approve | PubMed: JSCR 16(3):416-22, 2002, n=8 men. Force −70.5%/−20.2%, and activation also −44.3%/−2.9%. No DOI on PubMed (Crossref not checked). |
| 102 | T8 | 252 | Anderson 2004 | 15320684 / 10.1519/1533-4287(2004)18<637:MOEAAL>2.0.CO;2 | ok | approve | PubMed: JSCR 18(3):637-40, n=10 men, −59.6% isometric force, EMG not different. DOI matches. |
## Per-topic verdicts (grade and one-line)
| T | Grade | Grade fair? | Status | Fixes needed beyond the table |
|---|---|---|---|---|
| 1 | Moderate | yes | **needs fix** | (a) "Slow, forced reps near failure are where each fiber produces the most force." states the model as fact, against T1's own research note. → "According to a leading model, the slow, hard reps near failure are when the most growth-prone fibers work hardest." Last (a) sentence: see R1. |
| 2 | Moderate | yes | **needs fix** | Martorelli (+2.1% at 10 wk); Refalo 2025 tag. Optional: in the grade, "meta-analyses … agree" → "mostly agree", given Refalo 2023 vs Robinson 2024. Halperin fix confirmed. |
| 3 | Strong | yes | **needs fix** | Bello summary. One-line "close to failure" extrapolates from to-failure trials. Minor; optional "close to or at failure". |
| 4 | Strong | yes | approve once R4 is applied | Also change the Schoenfeld 2016 summary (row 41). Missed contradiction: Zaroni 2019 (see below). |
| 5 | Strong (split) | yes | **needs fix** | (a) "In an early analysis, 2–3 sets per exercise built about 40% more muscle than single sets." → "In an early analysis, doing multiple sets per exercise was linked to about 40% larger growth effects than single sets." Plus the Krieger and Kassiano 2024 summaries. |
| 6 | Limited | yes; the grade and notes are honest | **needs fix (wording)** | See the T6 audit. |
| 7 | Moderate | yes (R7 is reworking it) | **needs fix** | **(d) and (b) are factually wrong about post-failure partials.** See the T7 issues. Plus Kassiano 2023, Pedrosa 2023 and Gschneidner tags. |
| 8 | Limited | yes; the grade and notes are honest | approve, with 2 minor fixes | See the T8 audit. |

### T6 honesty audit (user decision: ~90 s and 2–3 min both valid; longer rest beneficial; Limited)
- **Grade line: approve.** "…none compared about 90 seconds directly with 2–3 minutes."
- **(d) and research notes: approve.** They say: "No trial has compared about 90 s directly with 2–3 min for growth"; "So no study shows 2–3 min beating ~90 s for growth"; and that the wins for longer rest are against 1 min, mainly via volume load. The Singer Table 2 numbers are verified against the full text: thigh 61–119 s 0.13, 120–179 s 0.01, ≥180 s 0.32 (−0.10 to 0.68), described as uncertain and U-shaped.
- **(b): approve.** It is honest both ways.
- **One-line: fix.** "both ends of that range have built similar muscle" implies a head-to-head comparison that doesn't exist. → "Rest about 90 seconds to 3 minutes between sets; longer rest can make it easier to keep your reps and weight up, and studies haven't found clear extra growth from resting longer than about 90 seconds."
- **(a): 3 fixes.**
  - "so each set delivers more tension" → "which likely means more tension per set". (d) itself says this was not measured.
  - "Research shows a small growth advantage" → "Research suggests a small, uncertain growth advantage". The credible intervals cross zero.
  - "mostly because" → "probably because".
- These fixes keep the decision (both valid, longer rest beneficial) intact.

### T8 honesty audit (user decision: "prefer stable" stays; unstable exercises stay in the catalog)
- **Grade: approve.** "…the one direct training trial found similar muscle growth at every stability level."
- **(d): approve.** It names Larsen 2025 (DB vs cable lateral raise ≈, verified: n=24 trained, BF 0.22–0.27) and Schwanbeck 2020 (free weights vs machines ≈, verified: n=46, 26 women, 8 wk), plus Amanuma and Saeterbakken.
- **Saeterbakken 2019: verified.** 59 men; 3-wk familiarization then 7 wk; Smith, free-weight and wobble-board squats; similar muscle thickness. Training status is not stated in the abstract.
- **(b): approve.** "Less stable variations also build muscle and are fine to keep" satisfies the catalog rule.
- **(a) new sentence: minor fix.** "in short tests, force on an unstable surface was about 20–70% lower" → "in short tests on a Swiss ball, force was about 20–70% lower". Behm 70.5% and 20.2%, and Anderson 59.6%, are all isometric on a Swiss ball, not wobble board or free weights.
- **Kassiano 2025 curls summary:** add the preacher distal advantage.
- **Behm 2002 and Anderson 2004:** verified on PubMed. Optional: Behm also reports 44% lower quadriceps activation, while Anderson found EMG unchanged.
- Once Silas applies the approved R8 text, I'll re-check it.

### T7 issues (not covered by the approved R7)
1. **Missed trial.** (d) says "Only one small trial in untrained calves (Goli 2026) tested partials added *after* full-ROM failure". That is false. **Larsen S, Swinton PA, … Wolf M. 2025, Front Psychol 16:1494323, doi 10.3389/fpsyg.2025.1494323, PMID 39995432 (PMC11847862)**: 23 untrained men, within-subject, 10 wk, Smith-machine standing calf raises. Past-failure lengthened partials gave +9.6% vs +6.7% medial gastrocnemius thickness (ATE 0.62 mm, 95% CrI 0.21–1.0; BF 13.3). Verified on PubMed.
   - **New (d):** "Two small calf trials in untrained men tested lengthened partials added *after* full-ROM failure, with mixed results: one found more growth (Larsen 2025, Front Psychol), the other similar growth when total volume load was matched (Goli 2026), so that use is only lightly tested."
   - **(b):** "(tested so far in one small calf study)" → "(tested so far in two small calf studies, with mixed results)".
   - **Goli wording:** "similar growth with half the sets" → "similar growth when half the full-ROM sets were extended with partials to a second failure, with total volume load matched".
2. **Gschneidner training status.** The preprint says "previously trained participants", so (d)'s "trials in trained lifters" is correct. Fix the tag (row 86) and note that CSA was estimated from circumference and skinfolds.
3. **Optional (a):** the three examples (Maeo 2021, Maeo 2023, Kinoshita 2023) were all in untrained adults, so add "in beginners".

## Missed contradictions (for Vinci; listed, not resolved)
1. **T4: Zaroni 2019.** JSCR 33(7S):S140-S151, PMID 31260419. 18 trained men, 8 wk. Training each muscle 5×/wk gave greater elbow-flexor and VL thickness than 1×/wk; it reads as volume-equated, but R12 says "volume unclear". It is logged only under T12 and should be cross-linked to T4.
2. **T3: Mangine 2015.** Physiol Rep 3(8):e12472, PMID 26272733, PMC4562558. 29 trained men, 8 wk. 4×3–5 at ~90% gave greater lean arm mass than 4×10–12 at ~70% (+5.2% vs +2.2%). Volume and rest were not matched. Not cited anywhere.
3. **T7: Vendruscolo 2025.** Sports Health 17(5):1036-1043, PMID 39449136, PMC11556575. 21 trained men, 3 wk, low-load BFR. Elbow flexion at long vs short length gave similar MRI CSA at all sites. Not cited.
4. **T7: Larsen 2025 (Front Psychol, PMID 39995432).** Supports post-failure partials and conflicts with Goli 2026. It is also a factual fix (see above).
- Checked and **not** contradicting:
  - Calzavara 2026 (PMID 42709978, 1 vs 3 sessions, trained, similar thickness) supports T4.
  - Sampson 2016, Kubo 2019, Pinto 2012, McMahon 2014, Valamatos 2018 and Bloomquist 2013 are consistent.
- Heaselgrave, Aube and Brigatto 2022 are already logged (T10).

## Applied fixes: confirmation
- **T2 Halperin (Emrys):** present and correct. People underpredict by ~0.95 reps, so "2 RIR" ≈ 3.
- **My round-1 fixes:** present (tags, Wolf 2023 metadata, Barbalho kept out).
- **T7 "pushdown-style one-arm cable extensions":** present in (a) and the research notes. exercises.json Maeo 2023 note updated accordingly.
- **Lopez corrigendum (PMID 35029596):** reflected in the T3 row and notes. Content verified via the doi.org and PMC12479057 text: Figure 4 strength ESs for Morton 2016, Jenkins 2017 and Ozaki 2018 were corrected; overall and best-quality effects changed slightly; conclusions unchanged. No Lopez numbers are used in copy. **OK.**
- **Myrholt erratum:** now reflected (18:23). Verified: Table 2 units cm→mm, corrected 20 Feb 2023. **OK.**
- **T6 rewrite to the user's decision:** grade and notes are honest; wording fixes are listed above.
  - Schoenfeld 2016 (n=21 trained men, 3 vs 1 min), Singer 2024 and Longo 2022: verified.
  - Buresh: "thigh CSA did not differ" is not in the abstract. The abstract says thigh MCSA was measured but reports no result. **Could not verify** (paywalled).
- **No slogan / no damage reasoning:** confirmed.

## Teammate claims (Emrys [P2], qa-bobby-numbers.md): independent verdicts
| Claim | Verdict |
|---|---|
| Martorelli: RNF +2.1% at 10 wk, not +3.9% | **Confirmed.** Abstract: "3.9 and 2.1% after 5 and 10 weeks". Fix row 24. Vinci's Batch 4 table also says "+3.9% ns", so correct that too. |
| Bello 2025 triceps differed (p=0.04) | **Confirmed.** Abstract p=0.04; the full-text Results give p=0.007 (an internal inconsistency), favouring the 85% group. |
| Kassiano 2024 medial gastrocnemius n.s. | **Confirmed.** +6.6% vs +9.9%, P=0.067. |
| Krieger: ~40% larger effect sizes, not "40% more muscle" | **Confirmed.** "40% greater hypertrophy-related ESs"; 2–3 vs 1 set was a trend (p=0.09). |
| Buresh thigh CSA | **Could not verify.** Thigh MCSA was measured, but the abstract reports no result and the full text is paywalled. Keep "fix – could not verify" or drop the thigh clause. |
| Lopez corrigendum details | **Verified.** Figure 4 strength ESs, 3 studies (Morton 2016, Jenkins 2017, Ozaki 2018), conclusions unchanged. Source: corrigendum text at doi.org/10.1249/MSS.0000000000002838 and PMC12479057. The corrected numbers themselves are only in the figure image. |
| Schoenfeld 2015 "8 wk" tag | Load study (25853914): **verified**, the abstract says "for a total of 8 weeks". Frequency study (25932981): **could not verify**; the abstract gives no duration and the full text is paywalled. |

## Vinci recommendations: verdicts (R4, R6, R7 and R8 are already approved, so no verdict here)
- **R1: modify.**
  - The proposed "when total reps were matched, two small trials found no difference" leaves out Myrholt 2023, which matched volume and found slightly more VL growth with more velocity loss.
  - Exact (a): "…built more muscle, although those sets also included more reps; when total reps were roughly matched, results were mixed: two small trials found no difference and one found slightly more thigh growth with more slowing."
  - The (d) EMG sentence: approve.
  - Jenkins 2015 (EJAP 115(11):2335-47, PMID 26159316): 9 men and 9 women doing RT, single sessions, leg extension. EMG stayed higher at 80% than 30% through failure. It has 2 published comments.
  - Colosio 2026 (PeerJ 14:e20909, PMID 41841121): n=12 (6 women), moderate RT experience. EMG at exhaustion did not converge across loads. Note the author is a PeerJ academic editor.
  - Retags: OK.
- **R2: modify.**
  - The (a) addition: approve. Hermann 2025: "may modestly enhance some measures of muscle hypertrophy".
  - The (d) phrase "Martorelli 2017, where only the volume-matched non-failure group kept pace" is inaccurate: RNFV was +8.5% vs failure +17.5%, and only within-group tests were reported. → "Martorelli 2017, where thickness rose significantly with failure and with volume-matched non-failure but not with lower-volume non-failure".
  - Vieira 2021 (JSCR 35(4):1165-75, k=13, PMID 33555822): verified. Overall it favoured failure (SMD 0.75), with no difference when volume was equalized. Suggest adding "(overall, failure favoured; no difference when volume was equalized)".
  - Retags: OK.
- **R3: approve with one tweak.**
  - Hammert: 20–30RM vs 8–12RM, ~0.30 vs ~0.20 cm, n=201 untrained, 6 wk. That is not "slightly" (about 50% larger). → "found more growth with 20–30 reps than 8–12 in a large 6-week trial of untrained elbow flexors".
  - Lasevicius 2018: verified.
  - Carvalho 2022: verified; no load difference including very low loads.
  - Retags: OK.
- **R5: approve with one tweak.**
  - Benito 2020 (IJERPH 17(4):1285, PMID 32079265): 111 studies, 1,927 men, whole-body FFM/LMM/SMM. Sets per workout was a negative moderator (−0.03, p=0.04). Verified.
  - "found no threshold" isn't stated in the abstract → "and did not identify a specific ceiling".
  - Barsuhn/Scarpelli replacement: approve.

## Batch 4 (Silas → Vinci) items for T1–T8: verdicts
- **Corrections:**
  - #1 Schoenfeld 2016 volume-equated: **approve**.
  - #2 Varovic inconclusive (pd 87%, 75% outside ROPE): **approve**; verified in the abstract.
  - #3 Gschneidner: **approve**. Add "trained (preprint)" and "CSA estimated from circumference/skinfolds".
  - #6 Saeterbakken: **approve**; n=59 is now confirmed from the abstract.
  - #10 Martorelli: **approve** the within-group note, **but modify** the table row: RNF was +2.1% at 10 wk (+3.9% was the 5-wk value).
- **Table rows: approve.**
  - T1: Andersen n=10, 9 wk, volume-matched; Terada n=27, 8 wk.
  - T2: Hermann n=42.
  - T3: Hammert n=201, 6 wk; Lasevicius 2018.
  - T4: Schoenfeld 2015 n=20 well-trained; Lasevicius 2019 36→28, 10 wk, ES favoured 2×; Yue n=18, 6 wk.
  - T5: Barsuhn 29 completers, 8 wk; Scarpelli.
  - T6: Villanueva.
  - T7: Wolf 2025, Gschneidner, Plotkin, Larsen leg press n=23, 8 wk; Varovic n=23, 6 wk.
  - T8: Kassiano 2025 RQES n=70; Saeterbakken. All match the abstracts.
- **Wolf 2025 and Plotkin 2026: confirmed.**
  - Wolf 2025: PeerJ 13:e18904, PMID 39959841; 30 resistance-trained, within-participant (arms), 8 wk, upper body, ultrasound; BF 0.16–0.3 for the null.
  - Plotkin 2026: MSSE online 7 Oct 2026, PMID 42841600; Experiment 2 had 16 trained men, within-subject legs, 8 wk, leg press, leg extension and lying leg curl, VL mCSA from 5 MRI slices; LP−FULL −1.4 cm² (−6.1 to 3.8). There is also an n=8 acute crossover. Crossref shows no correction.

## exercises.json polish re-check (Laurent)
- **Smith squat note: OK.** "Smith machine squats increased distal vastus lateralis thickness more than leg extensions did (+18.2% vs +11.2%) but increased rectus femoris thickness less". Matches Kassiano 2026 (PMID 41379528): untrained women n=63, 8 wk.
- **seated-cable-row: OK.** resistanceProfile "mid-range", with lengthenedPosition explaining the even horizontal cable load. face-pull and cable-rear-delt-row are both "mid-range", with the same explanation.
- **qa-bobby-contradictions.md path: OK.** It no longer appears in exercises-citations.md. The only remaining reference is to qa-bobby-citations.md, a different file.


---

# Evidence audit round 2: topics 9–15

# QA v2 — evidence.md topics 9–15 (full audit, round 2)
Auditor: executor subagent · Oct 29, 2026, ~18:30 Europe/Helsinki (UTC+2) · evidence.md read at mtime 18:26 (UTC+2). No file in /workspace/carlsen was edited.

Method: PubMed efetch (metadata, abstract, pub types, CommentsCorrections) + Crossref (metadata, `updated-by`) for all 96 citation entries (86 unique PMIDs); OA full texts where needed (Europe PMC/PMC); Kubo 2019 and Maeo 2023 full texts read from author-hosted copies. qa-bobby-*.md used as leads only.

## Summary counts
- Entries: 96 (86 unique PMIDs). Metadata (authors/year/journal/DOI/PMID): 96/96 match.
- Retractions / expressions of concern: 0 among cited. Corrections: Lopes 2019 (applied), Lopez 2021 (no copy impact). CommentIn letters: Schoenfeld 2017, Schoenfeld 2019, Currier 2023, Zabaleta-Korta 2021 (no corrections).
- Verdicts: 64 approve · 32 fix · 0 remove. Tag problems: 9 entries (#12, 35, 38, 42, 50, 53, 58, 78, + #68 unverified).
- Slogan ("20 sets a week"-style): none. Muscle-damage / micro-tear reasoning: none in app copy (only research-note exclusions in T13b and T15 "not repairing muscle").

## Full table
| # | topic | claim (start) | citation | tag ok? | verdict | note / exact fix |
|---|---|---|---|---|---|---|
| 1 | 9 | Untrained young women, n=55 (within-subject arms), 8 wk elbow extension, 3×8–12; load raised when the top of t… | Kassiano W 2026 (PMID 41718594) | yes | approve | Matches abstract; Kassiano 2026 MSSE. Single-joint arm, untrained women — (d) already says so. |
| 2 | 9 | Untrained young women, n=41 (arms randomised), 8 wk elbow flexion, 3×8–12; load raised at the top of the range… | Kassiano W 2026 (PMID 42873141) | yes | approve | Online ahead of print; claim matches abstract. |
| 3 | 9 | Trained men (n=27) and women (n=16) with ≥1 yr lower-body training, 8 wk, load progression vs repetition progr… | Plotkin D 2022 (PMID 36199287) | yes | approve | Rep vs load progression similar; RF 90% CI crosses 0 — fine as "modestly favoured". |
| 4 | 9 | Untrained men and women, n=39, within-subject legs, load vs repetition progression. No difference in vastus la… | Chaves TS 2024 (PMID 38286426) | yes | approve | Matches abstract. |
| 5 | 9 | Knee extension, 3×10–12, with load progressed vs kept constant: both legs grew (quadriceps CSA +3.36 vs +2.67 … | Ferrari O 2026 (PMID 42880344) | yes | fix | Data verified (CSA +3.36 vs +2.67 cm²; S18–24 diff 1.22 cm²; N-PROG RIR 1.50→4.08). Retag "contradicting — under review" → "nuance (effort drift)": progression is confounded with effort because the constant-load leg drifted from ~1.5 to ~4 RIR. |
| 6 | 9 | Trained men, n=21, 8 wk, RIR-based RPE loading vs %1RM loading, sets and reps matched. No significant differen… | Helms ER 2018 (PMID 29628895) | yes | approve | Matches abstract (squat ES 0.50 ± 0.63). |
| 7 | 9 | Meta-analysis, 15 studies, resistance-trained participants. Autoregulated vs standardised load: similar 1RM (M… | Hickmott LM 2022 (PMID 35038063) | yes | approve | Matches; correctly notes no pooled RPE/RIR hypertrophy result. |
| 8 | 9 | Powerlifters, n=12, 3 wk. RPE-based set stops can autoregulate volume within a periodised plan. No hypertrophy… | Helms ER 2018 (PMID 29786623) | yes | approve | No hypertrophy outcome stated. |
| 9 | 9 | Narrative review of 90 studies. RIR-based RPE and velocity are practical and reliable monitoring methods with … | Helms ER 2020 (PMID 33312273) | yes | approve | Narrative review; fine as context. |
| 10 | 9 | Experienced (n=15, 5.2 yr) vs novice (n=14, 0.4 yr) squatters. Introduces the RIR-based RPE scale (RPE 10 = 0 … | Zourdos MC 2016 (PMID 26049792) | yes | approve | Matches abstract. |
| 11 | 9 | College American football players, n=23, 6 wk. Autoregulatory progressive resistance exercise (load set from r… | Mann JB 2010 (PMID 20543732) | yes | approve | Strength only, athletes; kept out of hypertrophy copy. |
| 12 | 9 | Rugby players, n=20. Velocity-based autoregulation gave larger strength gains than RPE-based autoregulation. S… | Shattock K 2022 (PMID 32058357) | no | fix | Tag → [randomized crossover · amateur rugby union players · n=20 · 2×6 wk]; add "magnitude-based decisions" to claim. |
| 13 | 10 | Meta-regressions, 67 studies, 2,058 participants (79% male), adjusted for training status. Counting indirect s… | Pelland JC 2026 (PMID 41343037) | yes | approve | Pelland 2026 meta-regression; matches. |
| 14 | 10 | Meta-analysis, 15 studies. Graded dose-response between weekly sets and hypertrophy.… | Schoenfeld BJ 2017 (PMID 27433992) | yes | approve | Matches; CommentIn (Arruda 2017 letter) already in research notes. |
| 15 | 10 | Trained men, n=34, 8 wk, 1 vs 3 vs 5 sets per exercise, 3 sessions/wk. Hypertrophy increased with volume (elbo… | Schoenfeld BJ 2019 (PMID 30153194) | yes | fix | Add "significant only 5 vs 1 set" to the T10 claim (as T12 already does). CommentIn exists. |
| 16 | 10 | Trained men, n=27, 16 vs 24 vs 32 weekly sets. 32 sets gave larger gains than 16 for lower-body and triceps mu… | Brigatto FA 2022 (PMID 31868813) | yes | approve | Matches abstract. |
| 17 | 10 | Trained men, n=49, 6 wk biceps, 9 vs 18 vs 27 weekly sets. Thickness +4.3% / +9.5% / +5.4%; no significant bet… | Heaselgrave SR 2019 (PMID 30160627) | yes | approve | Keep contradicting tag (plateau/underpowered). |
| 18 | 10 | Well-trained adults, n=35, 12 vs 18 vs 24 weekly lower-body sets. No difference in muscle thickness or fat-fre… | Aube D 2022 (PMID 32058362) | yes | approve | Keep contradicting tag. |
| 19 | 10 | Trained men, n=31, 12 wk; weekly lower-limb sets held constant or increased by 4 or 6 every 2 wk. Strength gai… | Enes A 2024 (PMID 37796222) | yes | approve | Keep contradicting tag. |
| 20 | 10 | Untrained young men, n=17, 10 wk full vs half squats. Knee-extensor volume +4.6–4.9%; rectus femoris and hamst… | Kubo K 2019 (PMID 31230110) | yes | approve | FIX CONFIRMED: full text — physically active, no organised exercise ≥1 yr, ~21 y, n=17 analysed (20 enrolled). |
| 21 | 10 | Untrained young women, n=63, 8 wk Smith-machine squat vs leg extension. Leg extension grew rectus femoris more… | Kassiano W 2026 (PMID 41379528) | yes | approve | Matches abstract. |
| 22 | 10 | Untrained men, n=29, 10 wk lat pulldown vs biceps curl. Elbow-flexor thickness +6.10% vs +5.83%, no difference… | Gentil P 2015 (PMID 26446291) | yes | fix | "indirect work fully trained the biceps here" → "lat pulldowns trained the biceps as well as curls did, in untrained men". |
| 23 | 10 | Untrained men, n=10, within-subject, 8 wk dumbbell curl vs dumbbell row. Elbow-flexor thickness +11.06% vs +5.… | Mannarino P 2021 (PMID 31268995) | yes | approve | Matches. |
| 24 | 10 | Trained men, n=20, 8 wk. Adding single-joint arm exercises to multi-joint training gave no extra arm size (cir… | de França HS 2015 (PMID 26244600) | yes | approve | Circumference caveat present. |
| 25 | 10 | Bayesian network meta-analysis; hypertrophy network 119 studies, n=3,364 (47% women). All prescriptions promot… | Currier BS 2023 (PMID 37414459) | yes | fix | "(SMD 0.66)" → "(SMD 0.66 vs no-exercise control)". CommentIn exists. |
| 26 | 10 | ACSM position stand, overview of 137 systematic reviews. Higher volumes and eccentric overload enhanced hypert… | Currier BS 2026 (PMID 41843416) | yes | approve | Weekly-set threshold correctly kept out of app copy. |
| 27 | 11 | Meta-analysis, 13 studies, n=1,016 (5 hypertrophy outcomes). Free weights vs machines: hypertrophy SMD −0.055 … | Haugen ME 2023 (PMID 37582807) | yes | approve | Matches. |
| 28 | 11 | Young adults (20 men, 26 women), n=46, 8 wk free weights vs machines. Similar gains in muscle thickness and st… | Schwanbeck SR 2020 (PMID 32358310) | yes | fix | "Similar gains in muscle thickness and strength" → add "except machine-tested strength, which favoured machines". (a) "when both are taken close to failure" is not established for Haugen/Schwanbeck — drop that clause. |
| 29 | 11 | Resistance-trained men and women, n=24, within-subject, 8 wk, 5 sets to failure 2×/wk. Dumbbell vs cable later… | Larsen S 2025 (PMID 40692697) | yes | approve | BF 0.22–0.27 matches. |
| 30 | 11 | Untrained men, n=24 completers, within-subject cable curls with different shoulder-extension angles but matche… | Larsen S 2026 (PMID 41988507) | yes | approve | Matches. |
| 31 | 11 | Untrained young adults (14 men, 7 women), n=21, within-subject, 12 wk cable elbow extension overhead vs neutra… | Maeo S 2023 (PMID 35819335) | yes | fix | FIX CONFIRMED (14 M/7 F, no RT 12 mo). But (a) "about 1.4 times more" → "about 1.4 times as much (≈40% more)". |
| 32 | 11 | Untrained young women, n=63, 8 wk squat vs leg extension. Leg extension grew rectus femoris more (proximal +11… | Kassiano W 2026 (PMID 41379528) | yes | approve | FIX CONFIRMED: Smith squat 3RM +46.7% vs +21.3%. |
| 33 | 11 | Randomised trial, Smith squat vs leg extension, volume and intensity matched. All three rectus femoris regions… | Zabaleta-Korta A 2021 (PMID 34743671) | yes | approve | Matches; CommentIn letter exists (Leitão 2022 + reply), no correction. |
| 34 | 11 | Detrained men, n=22, 9 wk. Varying exercises grew all measured thigh and arm sites; the fixed-exercise group d… | Costa BDV 2021 (PMID 33440446) | yes | approve | Note in research notes that Costa 2021 and 2022 likely share one cohort (not independent). |
| 35 | 11 | Young men, n=23. Varied vs fixed exercises: similar 1RM gains; isometric knee extension improved more with fix… | Costa BDV 2022 (PMID 35481889) | no | fix | Retag: add "· strength outcomes only"; not a hypertrophy result (agrees with Batch 4 #7). |
| 36 | 11 | Physically active adults, n=49, 12 wk. Whole-quadriceps CSA gains similar across groups (about 9–12%); only gr… | Fonseca RM 2014 (PMID 24832974) | yes | approve | Matches. |
| 37 | 11 | Trained men, n=21, 8 wk, 4 sessions/wk. Exercises and rep ranges randomised each session (via app) vs fixed ex… | Baz-Valle E 2019 (PMID 31881066) | yes | fix | Retag "contradicting — under review" → "consistent": random rotation did not add growth, which (a) already says. |
| 38 | 11 | Strength-trained adults, n=17. Self-selected exercises vs fixed: small lean-mass advantage (+2.47%, ES 0.35 vs… | Rauch JT 2020 (PMID 29016481) | no | fix | Tag duration → 9 wk; "Strength-trained adults" → "strength-trained men"; "small lean-mass advantage" → "slightly larger lean-mass gain, not significant between groups, with higher volume load". |
| 39 | 11 | Systematic review of 8 studies, young men. Varying exercises in a systematic way may favour regional growth an… | Kassiano W 2022 (PMID 35438660) | yes | approve | Matches. |
| 40 | 12 | Trained men, n=20, 8 wk; 16 weekly sets per muscle done in 1 session vs split over 2. No significant differenc… | Brigatto FA 2019 (PMID 29528962) | yes | approve | Matches. |
| 41 | 12 | Well-trained men, n=18, 8 wk; each muscle 5×/wk full body vs 1×/wk split. Greater forearm/elbow-flexor and vas… | Zaroni RS 2019 (PMID 31260419) | yes | fix | Retag contradicting → "volume matching unclear in abstract" (Batch 4 agrees). |
| 42 | 12 | Untrained young adults, n=20, 11 wk of volume-matched knee extension followed by detraining; 6 sets 1×/wk vs 2… | Ochi E 2018 (PMID 30013480) | no | fix | FIX CONFIRMED (11 wk). Population: full text "Twenty healthy male college students" (22.3 y) → tag/claim "untrained young men (male college students, ~22 y)" — confirms Emrys P2. |
| 43 | 12 | Healthy men, n=19, 6 wk; 10 vs 5 sets per exercise (modified German Volume Training). The 5-set group gained m… | Amirthalingam T 2017 (PMID 27941492) | yes | fix | p≈0.083 arm lean mass FIX CONFIRMED. Add: "muscle thickness and leg lean mass did not differ between groups" (cherry-pick otherwise). |
| 44 | 12 | Pilot, n=12, 12 wk; 10 vs 5 sets per exercise. More than 5 sets per exercise gave no greater gains.… | Hackett DA 2018 (PMID 29910312) | yes | fix | "gave no greater gains" → "neither group gained significant lean mass overall; the 10-set group lost leg lean mass between weeks 6 and 12". |
| 45 | 12 | Trained men, n=34, 8 wk; 5 sets per exercise, 3 sessions/wk produced significantly more growth than 1 set; its… | Schoenfeld BJ 2019 (PMID 30153194) | yes | fix | FIX CONFIRMED (5>1 only). Nuance from full text: 5 vs 3 BF 2.34/2.25 (thigh) and 0.60 (elbow flexors) → "weak or no Bayesian evidence for 5 over 3 (BF 0.6–2.3)". Retag contradicting → "compatible". |
| 46 | 12 | Trained men, n=13, crossover; single lower-body sessions of 7, 14 or 21 sets. 21 sets gave higher session RPE … | Alvarez M 2026 (PMID 41565215) | yes | fix | Claim OK. App-copy inference "very long sessions may cost more than they return" → "…felt harder and slowed perceived recovery; long-term effects untested". |
| 47 | 12 | Meta-regressions, 67 studies: once weekly volume was accounted for, training frequency had little detectable e… | Pelland JC 2026 (PMID 41343037) | yes | approve | Matches. |
| 48 | 12 | Acute study, young and older men (groups of 6). In young men, doubling from 3 to 6 sets had limited added effe… | Kumar V 2012 (PMID 22859389) | yes | approve | Acute marker; labelled. |
| 49 | 12 | Acute study, untrained men, n=8; 1 vs 3 vs 5 sets of leg press. Anabolic signalling (p70S6k, S6) rose with mor… | Terzis G 2010 (PMID 20617335) | yes | fix | Retag "contradicting" → "acute marker only" (it cannot contradict a growth claim). |
| 50 | 13a | Strength athletes (n=8) vs untrained men (n=8), 21 wk identical training. Untrained: +20.9% maximal force, +5.… | Ahtiainen JP 2003 (PMID 12734759) | no | fix | Tag → [non-randomised controlled trial · strength athletes vs non-strength athletes (men) · n=16 · 21 wk]; drop "identical training" unless full text confirms. |
| 51 | 13a | Network meta-analysis, 28 studies, n=747, sets to failure. Hypertrophy similar across loads; greater effects i… | Lopez P 2021 (PMID 33433148) | yes | fix | Misread: experience/"sessions" effects are multivariate interactions on between-load SMDs; "sessions" = total intervention sessions. Claim → "secondary meta-regression: between-load differences larger in untrained participants and in longer interventions (more total sessions)". Corrigendum (Fig 4 strength only) — no copy change. |
| 52 | 13a | Meta-analysis, 140 studies, 1,433 effect sizes (strength outcomes). Optimal intensity and frequency differed b… | Rhea MR 2003 (PMID 12618576) | yes | approve | Strength only; label "strength outcomes" in any copy. |
| 53 | 13a | Bayesian meta-analysis, 29 studies, healthy adults 18–45. Relative muscle growth similar in males and females;… | Refalo MC 2025 (PMID 40028215) | no | fix | Remove "contradicting" tag and the (d) sentence; reword (c) to "the male–female comparison was not changed by participants' training experience" (Batch 4 #4 / I3.4). |
| 54 | 13a | n=141, mixed experience, single sets to failure. Reps-to-failure predictions were imprecise (SEM 2.64–3.38 rep… | Steele J 2017 (PMID 29204323) | yes | fix | Describe as "one session; tendency only". SEM is spread, not mean error (Batch 4 #5). |
| 55 | 13a | Network meta-analysis: hypertrophy network 119 studies, n=3,364, 47% women. All prescriptions promoted hypertr… | Currier BS 2023 (PMID 37414459) | yes | fix | "so a beginner programme does not need to be complex" is an inference → mark as Carlsen reasoning or drop. |
| 56 | 13b | Narrative review on time-efficient training. Recommends multi-joint exercises, at least one leg press/squat, o… | Iversen VM 2021 (PMID 34125411) | yes | approve | Narrative review. |
| 57 | 13b | Trained men, n=34, 8 wk. The 1-set group (about 13 min per session, 3×/wk) gained strength similarly to higher… | Schoenfeld BJ 2019 (PMID 30153194) | yes | approve | Matches. |
| 58 | 13b | Meta-analysis, 6 studies, resistance-trained men. A single set of 6–12 reps 2–3×/wk near failure increased 1RM… | Androulakis-Korakakis P 2020 (PMID 31797219) | no | fix | Tag/claim → "6 studies reviewed, 5 meta-analysed"; add ~70–85% 1RM, 8–12 wk. Strength outcome only. |
| 59 | 13b | Trained men, n=15, acute crossover. Agonist–antagonist paired sets (bench press + seated row) produced more vo… | Paz GA 2017 (PMID 28933712) | yes | approve | Acute. |
| 60 | 13b | Males, n=14, acute crossover. Supersets and tri-sets were more time-efficient than traditional sets but felt h… | Weakley JJS 2017 (PMID 28698987) | yes | approve | Acute. |
| 61 | 13b | Systematic review, 30 studies. Supersets, drop sets and cluster sets may be time-efficient alternatives; insuf… | Krzysztofik M 2019 (PMID 31817252) | yes | approve | Matches. |
| 62 | 13b | Supersets vs traditional sets: shorter sessions with similar total reps and volume load but higher perceived e… | Zhang X 2025 (PMID 39903375) | yes | fix | Full text: long-term hypertrophy SMD −0.05 from only two studies → add "based on only two long-term studies" to claim and (a). |
| 63 | 13b | Bayesian meta-analysis on rest intervals. Small benefit of resting >60 s for hypertrophy and no clear gain bey… | Singer A 2024 (PMID 39205815) | yes | approve | "mostly untrained" verified (6/9 untrained). |
| 64 | 13c | Meta-analysis, 13 studies, n=1,016. Free weights vs machines: no hypertrophy difference (SMD −0.055, 95% CI −0… | Haugen ME 2023 (PMID 37582807) | yes | approve | Matches. |
| 65 | 13c | Young adults, n=46, 8 wk. Free weights and machines gave similar muscle thickness and strength gains.… | Schwanbeck SR 2020 (PMID 32358310) | yes | approve | Same nit as #28. |
| 66 | 13c | Young men, n=18, 8 wk; push-ups at a load matched to 40% 1RM bench press vs bench press. Similar triceps and p… | Kikuchi N 2017 (PMID 29541130) | yes | fix | Comparator → "bench press at 40% 1RM, sets to failure". Population: full text says ≥1 yr RT experience (Introduction calls them untrained) → tag "young men (≥1 yr recreational RT)". Abstract pectoralis values look identical for both groups (possible source typo) — avoid quoting. |
| 67 | 13c | Students with advanced training experience, n=30, 5 wk; 6RM bench press vs 6RM elastic-band push-ups. Similar … | Calatayud J 2015 (PMID 24983847) | yes | approve | Strength only. |
| 68 | 13c | Meta-analysis, 7 studies (count corrected by a published corrigendum). Elastic vs conventional resistance: no … | Lopes JSS 2019 (PMID 30815258) | ? | fix | Lopes corrigendum (8→7) CONFIRMED applied. Population is mixed incl. older/clinical — "mixed training status" alone understates; tag "mixed ages incl. older and clinical adults" (verify in full text). |
| 69 | 13c | Meta-analysis. Low- and high-load training gave similar hypertrophy; heavy loads better for 1RM.… | Schoenfeld BJ 2017 (PMID 28834797) | yes | approve | CommentIn exists; no correction. |
| 70 | 13c | Network meta-analysis, 28 studies, sets to failure. Hypertrophy similar across low, moderate and high loads; s… | Lopez P 2021 (PMID 33433148) | yes | approve | Corrigendum touches Fig 4 strength SMDs only; main findings unchanged → no copy change. |
| 71 | 13c | Men, n=30, within-subject, 12 wk; 20% 1RM sets to failure vs 40%, 60% or 80% 1RM with volume load matched to t… | Lasevicius T 2018 (PMID 29564973) | yes | approve | Matches (single trial vs meta — fine as nuance). |
| 72 | 13c | Progressive push-up variations vs bench press, 3×/wk: both groups improved 1RM bench press; muscle thickness d… | Kotarsky CJ 2018 (PMID 29466268) | yes | fix | Retag "contradicting" → "uninformative (4 wk; no MT change either group)" (Batch 4 #8). |
| 73 | 14 | Scoping review and meta-analysis, 12 studies, n=414. Mean underprediction 0.95 reps (95% CI 0.17 to 1.73), ver… | Halperin I 2022 (PMID 34542869) | yes | fix | "More accurate near failure" → "slightly, not clearly, more accurate near failure (CI crossed zero)"; lean on Remmert 2023 / Emanuel 2022 / Hackett 2017 for near-failure accuracy. |
| 74 | 14 | n=141, mixed experience, single sets to failure on several exercises. Underprediction with SEM 2.64–3.38 reps;… | Steele J 2017 (PMID 29204323) | yes | approve | Fine; "SEM" = spread. |
| 75 | 14 | Trained adults (≥1 yr training), n=14 and n=24, knee extensions. Underprediction of about 2.0 reps (95% CI 0.0… | Armes C 2020 (PMID 33424678) | yes | approve | Matches. |
| 76 | 14 | Trained and untrained men (n=27) and women (n=31), machine biceps curl, triceps pushdown and seated row. More … | Remmert JF 2023 (PMID 37036795) | yes | approve | Matches. |
| 77 | 14 | Trained men, n=9, 6 wk bench press, 3×/wk. Absolute accuracy did not improve with practice; slightly more unde… | Remmert JF 2023 (PMID 37436724) | yes | approve | Matches (n=9, no absolute improvement). |
| 78 | 14 | Resistance-trained men (n=12) and women (n=12), bench press at 75% 1RM, predicting 1 and 3 RIR. Raw error −0.1… | Refalo MC 2024 (PMID 37967832) | no | fix | Tag "crossover" → "repeated-measures (2 sessions)". |
| 79 | 14 | Experienced (n=15) vs novice (n=14) squatters. RIR-based RPE scale tracked bar velocity in both groups; experi… | Zourdos MC 2016 (PMID 26049792) | yes | approve | Matches. |
| 80 | 14 | Experienced (n=14, 4.7 yr) vs novice (n=13, 1.1 yr) bench pressers. RPE at 1RM higher in experienced (9.86 vs … | Ormsbee MJ 2019 (PMID 28301439) | yes | fix | Note that "novice" had 1.1 yr training. |
| 81 | 14 | Certified coaches, n=259, predicting trainees' RIR from video. Absolute errors 4.8, 2.0 and 1.2 reps at 33%, 6… | Emanuel A 2022 (PMID 36273064) | yes | approve | Matches. |
| 82 | 14 | Trained men, n=20, bench press and squat. Higher local muscular endurance was linked to larger errors in some … | Hackett DA 2022 (PMID 35202066) | yes | approve | Matches. |
| 83 | 14 | Recreationally trained adults, n=28, bench press. Individual velocity–RIR profiles estimated RIR within ≤1 rep… | Martínez-Rubio C 2025 (PMID 40125884) | yes | approve | Velocity context. |
| 84 | 14 | Well-trained men, n=19, hexagonal-bar deadlift. Velocity-based RIR estimates failed the accuracy criteria. Onl… | Chen W 2026 (PMID 42328880) | yes | approve | Online ahead of print. |
| 85 | 14 | Trained adults, n=18, 8 wk. Training to failure raised perceived discomfort and exertion; stopping at 1–2 RIR … | Refalo MC 2025 (PMID 39960821) | yes | approve | Affective outcome; fine. |
| 86 | 15 | Resistance-trained men (n=29) and women (n=10), 9 wk; 1-week training break at the midpoint vs continuous. Sim… | Coleman M 2024 (PMID 38274324) | yes | approve | Matches (full week off, not reduced week). |
| 87 | 15 | Untrained young men, n=19, within-subject, 8 wk; reduced to 1 session of 2 sets in weeks 4 and 8 vs continuous… | Pancar Z 2026 (PMID 41730991) | yes | approve | Matches. |
| 88 | 15 | Untrained young men, n=14, 24 wk bench press; continuous vs three 6-week blocks separated by 3-week breaks. Si… | Ogasawara R 2013 (PMID 23053130) | yes | approve | Matches. |
| 89 | 15 | Untrained young men, n=15, 15 wk bench press; continuous vs 3-week break after 6 wk. No significant loss durin… | Ogasawara R 2011 (PMID 21771261) | yes | approve | Matches. |
| 90 | 15 | Trained men, n=30; 1 week of active (~15% of volume) vs passive recovery after 6 wk high-volume training. Marg… | Vann CG 2021 (PMID 34138821) | yes | approve | Matches. |
| 91 | 15 | Meta-analysis, 103 studies. Stopping training reduced strength (maximal force SMD −0.46), more with longer bre… | Bosquet L 2013 (PMID 23347054) | yes | fix | Retag "contradicting — under review" → "context (strength loss after full cessation; pre-2015, mixed populations)" (Batch 4 #9). |
| 92 | 15 | Delphi consensus, 21–34 expert coaches. Defines deloading as a period of reduced training stress to manage fat… | Bell L 2023 (PMID 37730925) | yes | approve | Matches. |
| 93 | 15 | Survey, 246 competitive strength and physique athletes. Typical deload 6.4 ± 1.7 days every 5.6 ± 2.3 wk; volu… | Rogerson D 2024 (PMID 38499934) | yes | approve | 6.4±1.7 d / 5.6±2.3 wk verified. |
| 94 | 15 | Interviews, 18 strength and physique coaches. Deloads typically 5–7 days every 4–6 wk, mainly by reducing sets… | Bell L 2022 (PMID 36619355) | yes | approve | 5–7 d every 4–6 wk verified. |
| 95 | 15 | Survey, 204 strength and conditioning coaches. Planned deloads usually cut volume by 0–25%, often with a simil… | De Marco K 2024 (PMID 39446750) | yes | fix | Add context: field-sport S&C coaches (taper, in-season, travel), not physique deloads. |
| 96 | 15 | Trained men, n=31, 12 wk. Progressively increasing weekly sets raised training strain in a graded way (6 sets … | Enes A 2026 (PMID 42713159) | yes | approve | Marginal relevance to deloads; could move to research notes. |

## Per-topic grade verdicts
| Topic | Grade | Verdict | Exact fix |
|---|---|---|---|
| T9 | Moderate | needs fix | Grade generous: progression-beats-no-progression rests on two untrained-women single-joint trials plus Ferrari (effort-confounded). → "Limited–Moderate" or keep Moderate but add "in untrained participants" to the grade reason. One-line rule is a product convention (already said in (d)). Shattock tag (#12). |
| T10 | Moderate | needs fix | Grade "Moderate" vs (d) "Strong" conflict → (d) "Strong across meta-analyses for the dose-response; overall grade Moderate because indirect-set weighting and trained-lifter trials are uncertain." (a): note Kubo and Kassiano are untrained samples. #15, #22, #25. |
| T11 | Moderate | needs fix | Grade fair. (a) "about 1.4 times more" → "about 1.4 times as much"; drop "when both are taken close to failure". #28, #35, #37, #38. |
| T12 | Limited | needs fix | Grade "Limited" vs (d) "Weak" → use one label (Limited). Alvarez inference (#46), Amirthalingam (#43), Hackett (#44), Ochi population (#42). |
| 13a | Moderate | needs fix | Grade fair after fixes. (a) "Experienced lifters gained more from additional sessions, so experience level helps set the starting volume" → "Untrained people respond strongly to almost any programme; setting starting volume by experience is a programming convention rather than a tested rule." #50, #51, #53, #54, #55. |
| 13b | Moderate | needs fix | Grade fair. One-line "cut rest-heavy filler" conflicts with Singer (<60 s may cost growth) and T6 rests → "Keep the hard sets and normal rests; cut long warm-ups and extra exercises first, or pair non-competing exercises." (a) Zhang: add "based on only two long-term studies". #58. |
| 13c | Moderate | needs fix | Grade fair. One-line "push-ups … have all built muscle when sets got close to failure" over-general → "Free weights and machines build similar muscle; push-ups matched a light (40% 1RM) bench press in one small trial." #66, #68, #72. |
| T14 | Moderate | approve (minor fixes) | Grade and one-line fair. #73 Halperin wording, #78 tag, #80 note. |
| T15 | Limited | approve with one fix | See T15 audit. |

## Applied-fix confirmations
| Fix | Status |
|---|---|
| T11 Kassiano 2026 3RM | CONFIRMED (+46.7% vs +21.3%, Smith squat 3RM) |
| T12 Ochi 11 wk | CONFIRMED (11 wk + detraining). Additional: population should be young men (see below) |
| T12 Schoenfeld 2019 5>1 only | CONFIRMED; add BF nuance (5 vs 3: 2.34/2.25 thigh, 0.60 elbow flexors) |
| T12 Amirthalingam p≈0.083 n.s. | CONFIRMED; add MT/leg lean mass n.s. |
| T15 4–6 wk / 5.6±2.3 wk | CONFIRMED in grade line and (d); old 4–8 wk range gone |
| T10 Kubo untrained young men | CONFIRMED from full text |
| T11 Maeo untrained young adults | CONFIRMED from full text (14 M / 7 F) |
| No slogan / no damage reasoning | CONFIRMED |

## Steering checks
- **Ochi 2018 (Emrys P2: "young men", not "adults") — CONFIRMED.** Abstract says "untrained subjects" (22.3 ± 0.9 y); Europe PMC full text (PMC6036131) Methods: "Twenty healthy male college students". Fix tag and claim: "untrained young men (male college students, ~22 y)".
- **Lopez 2021 corrigendum (PMID 35029596) — VERIFIED** (PMC12479057; MSSE 2022;54(2):370; ErratumFor 33433148). Text: effect sizes of three studies (Morton 2016, Jenkins 2017, Ozaki 2018) corrected in Figure 4, which is the *muscle strength* SMD figure; "overall and best quality effects are slightly changed, with no changes in the main findings and conclusions". 13a and 13c cite Lopez for hypertrophy and "strength better with heavier loads" (a main finding) → no copy change; research-note wording is accurate. Emrys's "can't verify" can be upgraded to "verified".

## T15 audit (latest text, mtime 18:26 UTC+2)
- One-line, grade (Limited), (b), (d) and research notes honestly reflect thin evidence and record Hoang's decision (optional, ~every 8 weeks as a product choice). **Approve — do not overturn.**
- One fix in (a): "Carlsen suggests about every 8 weeks, a little less often than the surveys report, because the trials show no muscle cost from skipping planned breaks." The "because" makes the interval sound trial-derived. → "Carlsen suggests about every 8 weeks, a little less often than the surveys report; this interval is a product choice, since trials have not tested deload timing and so far show no muscle benefit or cost from planned breaks."
- Optional: one-line could add "a full week off may dip strength slightly" (Coleman 2024), already in (d).
- Bosquet retag to context (#91); De Marco context (#95).

## R9–R15 verdicts (qa-bobby-contradictions.md)
- **R9 — approve with modification.** Effort-drift sentence verified: Ferrari N-PROG RIR 1.50 ± 1.11 (S1) → 4.08 ± 1.94 (S24); PROG 0.47 → 0.20. Reject the optional (a) "each set delivers less tension" sentence (mechanistic, untested) → "sets on the unchanged weight ended further from failure". Retag Ferrari "nuance (effort drift)" rather than plain "consistent".
- **R10 — approve (b); modify (d).** "consistent with a plateau" → "the null trials are small and may reflect a plateau within the range tested or too little power to detect a difference; unresolved." Gentil/Mannarino "½ sits between them" OK, keep the untrained caveat.
- **R11 — approve** Costa 2022 retag (strength only) and Baz-Valle "consistent". If (d) says varied and fixed performed similarly for overall growth, add "some trials found more sites grew significantly with systematic variation (Fonseca 2014, Costa 2021), based on within-group tests."
- **R12 — approve** Benito 2020 (PMID 32079265; 111 studies, 1,927 males; sets-per-workout moderator −0.03, 95% CI −0.05 to −0.001, p=0.04), stating limits: men only, whole-body, between-study, sets per workout not per muscle. Zaroni / Schoenfeld 2019 retags approve.
- **R13a — approve** deleting the Refalo sentence and retag; RIR sentence approve but "improved it in two short trials" rather than general claim. Also apply my Lopez fix (#51).
- **R13c — approve** Carvalho 2022 (PMID 35015560; volume-matched loads, no hypertrophy difference — verified) and Kotarsky retag.
- **R14 — approve with modification.** Wiedenmann 2026 (PMID 42632893; 13 younger 9F/4M + 13 older 7F/6M, 6 sessions/6 wk, MAE down by up to 2.3 reps) and Hermann 2025 (PMID 40249908; 42 trained, 8 wk; accuracy improved "particularly for the bench press") verified. Add Hermann to T14 (c) if cited in copy. Note Remmert 2023b (n=9) found no absolute improvement. "Practice helps more than years of lifting" → "Practice seems to help: …" (comparison not tested head-to-head).
- **R15 — modify.** Its quoted "One-line Current" ("Planned easy weeks are optional… cost a little strength") is stale vs current text; rebase on the current one-line and do not alter Hoang's decision. Hwang 2017 (PMID 28328712; 20 trained men, 2 wk detraining, leg-press strength and lean mass maintained; whey/carbohydrate supplement trial) OK with n and context. **Pritchard 2018 (PMID 29369954; n=8 trained men, 3.5 vs 5.5 d cessation): the CMJ / isometric bench increases were T1 (pre-training) → T3, not end-of-training → after the break.** "rose after a few days off" → "was maintained after 3.5–5.5 days off (n=8)".

## Batch 4 (Silas) items touching T9–15
| Item | Verdict |
|---|---|
| #4 Refalo 2025 false conflict with 13a | approve (abstract: "not influenced by RT experience" refers to the sex comparison) |
| #5 Steele 2017 SEM is spread, not mean error | approve (abstract reports SEM 2.64–3.38 with 95% CI; "tendency" only) |
| #7 Costa 2022 strength only | approve |
| Kotarsky 2018 uninformative (4 wk) | approve |
| Bosquet 2013 context | approve (retag as context, strength-only, mixed populations) |
| Lasevicius 2018 single trial vs meta (T13c) | approve |
| Ferrari 2026 effort drift (T9) | approve |
| Heaselgrave / Aube / Enes plateau (T10) | approve as logged; wording per R10 modification |
| Gentil 2015 keep ½ (T10) | approve |
| Baz-Valle 2019 consistent (T11) | approve |
| Zaroni 2019 volume unclear; Schoenfeld 2019 compatible (T12) | approve |
| Kumar 2012 / Terzis 2010 acute (T12) | approve (retag Terzis away from "contradicting") |
| Benito 2020 (R12, still uncited) | approve with limits stated |
| Barsuhn 2025 / Scarpelli 2022 (T10) | approve as "consistent (prior volume)" — not re-verified in detail by me |

## Missed contradictions / tensions (PubMed searches Oct 29; listed, not resolved)
Verified on PubMed this session; none currently cited in T9–15 unless noted.
1. **T9 – Scarpelli 2025** (PMID 40500534, EJAP; 37 untrained, 10 wk, within-subject): individual responses differed by progression model (~34% grew more with rep progression, ~19% with load) — tension with a single fixed double-progression rule.
2. **T9 – Nóbrega 2023** (PMID 36515591, JSCR; 24 untrained men, secondary analysis): RM-zone progression gave faster volume-load progression; CSA related to VL progression — relevant to how the rule progresses.
3. **T9 – Ghobadi 2022** (PMID 34346831, EJSS; 24 recreationally active men): APRE gave more leg-press strength than linear — strength only, context for autoregulation.
4. **T10/T12 – Camargo 2026** (PMID 42461790, J Appl Physiol; 25 trained, 8 wk, within-subject): +120% vs +20% weekly volume gave no extra hypertrophy (and no harm) — tension with dose-response framing in trained lifters.
5. **T10/T12 – Radaelli 2015** (PMID 25546444, JSCR; 48 untrained men, 6 mo): 5 sets > 1 and 3 sets for elbow flexor/extensor MT — cited in T5 only; supports volume but contradicts "5 vs 3 weak" in a long untrained trial.
6. **T10 – La Scala Teixeira 2018** (PMID 29024332, review): high vs low upper-body set volumes not significantly different in untrained; trained data lacking.
7. **T11/T13c – Heidel 2022** (PMID 34609100, meta-analysis): free weight vs machine hypertrophy ES −0.01 — consistent; could be added as a second meta-analysis.
8. **T11 – Barbalho 2021** (PMID 32252103, IJSM, trained women, has ErratumIn 33733437): multi-joint groups gained more MT in glutes/quads/pecs than single-joint only. Author group has a retracted 2019 MSSE paper (30779716, also EoC) — treat with caution.
9. **T11 – Kassiano 2025** (PMID 39388663, RQES; 70 young women, 10 wk): varied vs constant exercises gave similar thigh MT at all sites — tension with "mixing a few exercises helped some regions grow" (cited in T8 only).
10. **T11/13a – Kinoshita 2026** (PMID 41630124, MSSE; 17 untrained, 12 wk): KE vs LP — RF +13.2% vs +1.1%, whole QF similar; LP grew glutes/adductors (cited in T8; relevant to T10 fractional counting).
11. **T13b – Sødal 2023** (PMID 37523092, drop-sets meta-analysis, 6 studies, 142 participants) — time-efficient method not mentioned.
12. **T13c – Wei 2023** (PMID 37598268, Sci Rep; 13 sedentary women, 6 wk): progressive bodyweight vs barbell squat similar MT — supports bodyweight but tiny.
13. **T14 – Hackett 2017** (PMID 27787474; 81 adults): error ~1 rep at 0–5 reps to failure vs >2 at 7–10 — stronger support for "better near failure" than Halperin's CI.
14. **T14 – Zourdos 2021** (PMID 30747900; 25 trained men): intraset RIR more accurate closer to failure.
15. **T14 – Mansfield 2020** (PMID 32881842; 20 trained men): knowing the load did not change RIR accuracy.
16. **T14 – Hughes 2020** (PMID 33337690) is **RETRACTED** — do not cite.
17. **T15 – Halonen 2024** (PMID 39364857, SJMSS; 55 untrained, 32 ± 5 y; 10 wk off between two 10-wk blocks): strength/CSA fell during detraining but regained quickly; final outcomes similar — supportive of "breaks don't cost muscle long-term".
18. **T15 – Psilander 2019** (PMID 30991013, J Appl Physiol; 19 adults): after 20 wk detraining MT/CSA returned to baseline while strength stayed elevated — context for longer breaks.
Other leads not checked further: Bernárdez-Vázquez 2022 (already in T10 notes), Stasinaki 2018, Benito 2020 (R12).


## Exercise notes round 2 (12 new)

Audited by Stirner, 2026-10-29 18:30 EET. Nothing in /workspace/carlsen was edited except this appended section. Scratch work is in `/workspace/qa-r2/`.

**How each note was checked**
- **Metadata:** PubMed efetch (authors, year, journal, volume and pages, DOI, publication type, CommentsCorrections). Crossref `updated-by`, `update-to` and `filter=updates:`.
- **Full text (open access, Europe PMC):** Larsen 2025 lateral raises (PMC12277279), Attarieh 2025 (PMC11906226), Larsen 2026 (PMC13076143), Gentil 2015 (PMC4592763) and Plotkin 2023 (PMC10593473).
- **Paywalled:** I read the methods excerpts on the publisher or preprint pages for Larsen 2025 leg press (T&F page and SportRxiv 502) and Kobayashi 2026 (ResearchGate results excerpt and ECSS abstract). Mannarino 2021 and Kassiano 2023 were checked against the abstract only.
- **Metadata result:** all 9 PMIDs resolve to the claimed first author, year and journal. Kobayashi 2026 is J Sports Sci, online 2026-10-04, with no volume yet.
- **Retractions and corrections:** none for 8 of the 9 papers in PubMed or Crossref. Plotkin 2023 has one: Crossref correction 10.3389/fphys.2026.1987823 (2026-10-28) covers COI, funding and trial registration only, with results unaffected. I confirmed this earlier, at 18:06.

**Previously approved 9 notes (script diff):** `/workspace/qa-r2/diff9.py` compares the current `exercises.json` with the approved texts and with `/workspace/carlsen-scratch/backup-20261029-1803/`.
- All 9 match the approved text word for word, including the Smith squat polish ("increased distal vastus lateralis thickness more than leg extensions did (+18.2% vs +11.2%)…").
- Non-note changes since 18:03 are the data fixes I already approved: squat glutes moved to secondary, calves removed from the leg curls, the face-pull, dip and skull-crusher regrouping, the OHP and DB press set to `mid-range`, and the reverse-curl rename.
- **Changed after my 18:06 approval (backup 1814 → 1823, not a note):** `seated-cable-row` changed from `shortened` to `mid-range` and gained a sentence in `lengthenedPosition`. `face-pull` and `cable-rear-delt-row` each gained "The cable pulls horizontally, so the load stays fairly even through the pull." This applies my optional consistency item 2, and the wording is fine. **Approved**, but note it was a post-approval change.
- **12 → 21 notes:** 1823 → now changed only the 12 new `evidenceNote`s. No other field changed.
- **Banned wording:** "damage", "micro", "tear", "20 sets", "sets a week" and "sets per week" appear in none of the 21 notes.

**Counts:** 12 notes. 5 approve, 6 fix, 1 remove.

| exercise | citation | verdict | note / exact replacement text |
|---|---|---|---|
| `dumbbell-lateral-raise` | Larsen et al. 2025, Front Physiol 16:1611468, PMID 40692697 | **fix (minor)** | Numbers and population are right: 26 randomized and 24 analyzed, ≥3 years of RT, men and women, 5 sets to failure 2×/wk for 8 wk, MT +3.3–4.6%, Bayesian support for the null. **Mapping gap:** the study's cable was set "approximately horizontally aligned with the hand", so it was hardest with the arm down. That is not the library's low-pulley, across-the-front raise. **Replace with:** "In an 8-week trial in resistance-trained men and women (n=24, one arm each way), dumbbell lateral raises (hardest near the top) and cable lateral raises with the pulley at about hand height (hardest near the bottom), both taken to failure, grew the side delts similarly (about 3–5% thicker). (Larsen et al. 2025, PMID 40692697)" |
| `cable-lateral-raise` | Larsen et al. 2025, PMID 40692697 | **fix** | Same study. The library item is "low pulley, cable across the front", but the trial used a hand-height pulley, which gives a different resistance curve. The note must say which setup was tested. **Replace with:** "In an 8-week trial in resistance-trained men and women (n=24, one arm each way), cable lateral raises with the pulley at about hand height (hardest near the bottom, unlike a low-pulley setup) and dumbbell lateral raises, both taken to failure, grew the side delts similarly (about 3–5% thicker). (Larsen et al. 2025, PMID 40692697)" |
| `incline-dumbbell-curl` | Kobayashi et al. 2026, J Sports Sci (online 2026-10-04) 1–14, doi 10.1080/02640414.2026.2741751, PMID 42829982 | **approve** | Exact: 21 untrained adults, one arm each way, 12 wk, MRI volume, shoulder about 50° extended vs flexed, 70% 1RM 5×10 2×/wk. Biceps +22.1% vs +18.9% (g=0.33, P=0.046). Brachialis +17.1% vs +21.1% and brachioradialis +13.5% vs +17.6% (P≈0.039). Total +17.6% vs +19.2% (P=0.134, n.s.). "Slightly" fits the small-to-moderate effects, and the population is stated. Not overclaimed. |
| `dumbbell-preacher-curl` | Kobayashi et al. 2026, PMID 42829982 | **approve** | Mirror of the above, with the same numbers. "Similar" total growth matches P=0.134 and the authors' "did not differ". The preacher pad (~45°) vs the trial's ~50° shoulder flexion is close enough. |
| `bayesian-cable-curl` | Attarieh et al. 2025, Eur J Sport Sci 25(4):e12279, PMID 40082069 | **fix** | 21 started and 15 analyzed (6 dropped for <80% attendance). Men, 25.6 y, no RT in the prior 6 months (methods). The 'untrained' label is the authors' own wording, from the conclusion. Shoulder about 50° flexed vs extended, ultrasound thickness. **Overclaim:** "grew … similarly" presents a non-significant result from n=15 as equivalence. Biceps was 9% (Bayesian) vs 6–7% (preacher), and brachialis 8% vs 10%. **Replace with:** "In a small 10-week trial in young men with no resistance training in the previous 6 months (n=15, one arm each way), Bayesian cable curls (shoulder about 50° extended) and preacher cable curls (shoulder about 50° flexed), set up with matched resistance profiles, showed no significant difference in biceps or brachialis growth (biceps about 9% vs 6–7% thicker); a trial this small can't rule out a modest difference. (Attarieh et al. 2025, PMID 40082069)" |
| `cable-preacher-curl` | Attarieh et al. 2025, PMID 40082069 | **fix** | Same issue. **Replace with:** "In a small 10-week trial in young men with no resistance training in the previous 6 months (n=15, one arm each way), preacher cable curls (shoulder about 50° flexed) and Bayesian cable curls (shoulder about 50° extended), set up with matched resistance profiles, showed no significant difference in biceps or brachialis growth (brachialis about 10% vs 8% thicker); a trial this small can't rule out a modest difference. (Attarieh et al. 2025, PMID 40082069)" |
| `cable-curl` | Larsen et al. 2026, Front Physiol 17:1750722, PMID 41988507 | **remove** | The numbers are right: 30 untrained men, 24 analyzed, 10 wk, MT about 7–9%, and anecdotal-to-moderate Bayesian support for the null. **Wrong exercise mapping.** Both arms trained only from 0° to 90° of elbow flexion, and "the cable height and body positioning were individually adjusted to create a similar descending resistance profile", so the curl was hardest with the arm straight. The library's `cable-curl` is a "Standing Cable Curl (low pulley, in front)": a full-range curl that is hardest near mid-range. Neither condition was that exercise. **Set to "".** If wanted elsewhere, the closer match is `bayesian-cable-curl`. That would need a new, separately approved note, so I'm not proposing text now. |
| `lat-pulldown` | Gentil et al. 2015, Asian J Sports Med 6(2):e24057, PMID 26446291 | **fix** | Figures are right: n=29 (14 pulldown, 15 curl), untrained young men, 10 wk, 3×8–12RM 2×/wk, MT +6.10% vs +5.83%, no group difference. **Inaccurate:** "training only lat pulldowns … only biceps curls" is wrong. Both groups also did leg press, knee flexion and bench press, and the only difference was wide-grip pulldowns vs standing barbell curls. Also add "small", and say the result was non-significant rather than equivalent. The indirect-arm-work claim is otherwise honest for beginners. **Replace with:** "In a small 10-week trial in untrained young men (n=29, 14 vs 15 per group) doing the same leg and chest exercises, a group that added wide-grip lat pulldowns and a group that added barbell biceps curls instead showed similar elbow-flexor thickness gains (+6.1% vs +5.8%, no significant difference). (Gentil et al. 2015, PMID 26446291)" |
| `one-arm-dumbbell-row` | Mannarino et al. 2021, JSCR 35(10):2677–2681, PMID 31268995 | **approve** | Abstract only (paywalled). 10 untrained men, within-subject, 8 wk, 4–6 sets of 8–12 to failure 2×/wk, ultrasound MT +5.16% vs +11.06% (p=0.009). The figures, "about half" and "small" are all right. "Direct curls may help if arm size is a goal" is hedged and follows from the result. Observation for Vinci, not blocking: next to the Gentil note, users see two small beginner trials pointing different ways on indirect arm work. Both notes state their populations honestly. |
| `leg-press` | Larsen et al. 2025, J Sports Sci 43(10):986–994, PMID 40113586 | **approve** | 23 resistance-trained (7.2±3.5 y), within-subject, 4 sets to failure 2×/wk for 8 wk. Knee range about 5–100° vs 5–154°±7.8°, on a Rogue 45° leg press (methods), which matches the library's "45° Leg Press". MT +2–7% in both, with Bayesian support for the null (BF 0.14–0.22; multivariate <0.01). "Similarly" is supported. |
| `barbell-hip-thrust` | Plotkin et al. 2023, Front Physiol 14:1279170, PMID 37877099 (correction 10.3389/fphys.2026.1987823: COI, funding and registration only) | **fix** | 34 completers (18 HT, 16 SQ), untrained college-aged men and women, 9 wk, MRI mCSA, set-volume equated. Glutes were similar (estimates modestly favored HT, with wide CIs). Squats grew the quads and adductors more. **Factual error in the note:** the "Thruster 3.0 (BC Strength)" is a stand-alone hip-thrust **bench** used with a free barbell and plates. It is not a plate-loaded machine. The maker's page says it "allows the use of resistance bands, free weights", "no Bar, Plates… included". BC Strength's plate-loaded machine is the separate "Thruster Pro". The paper calls the exercise the "barbell hip thrust" throughout, and its 21-inch plates are BC's barbell "Thruster Plates". So the barbell mapping is correct and the machine wording is wrong. **Replace with:** "In a 9-week MRI trial in untrained young men and women (n=34; 18 hip thrust, 16 squat), barbell hip thrusts (done on a stand-alone hip-thrust bench) grew the glutes about as much as barbell back squats with the same number of sets, while the squats grew the quads and adductors more. (Plotkin et al. 2023, PMID 37877099)" |
| `leg-press-calf-raise` | Kassiano et al. 2023, JSCR 37(9):1746–1753, PMID 37015016 | **approve** | Abstract only (paywalled). 42 young women, 3 groups, 8 wk, 3×/wk, pin-loaded horizontal leg press, 3×15–20RM. The initial range (−25° to 0°, heel-down/stretched half) gave medial gastrocnemius +15.2% vs full +6.7% (p≤0.009). Lateral gastrocnemius +14.9% vs full +7.3% (p=0.060, n.s.) is correctly reported as not significantly different. The one condition favored is stated specifically, not as general advice. Training status isn't given in the abstract, and the note correctly states none. |

### Hip thrust recommendation (Plotkin 2023)
- **(a) `machine-hip-thrust`: don't add the Plotkin note. Leave it `""`.** The trial used a free barbell on a hip-thrust bench, not a machine, so Laurent's premise ("the trial used a machine") is mistaken. The machine has a different resistance curve: its own `lengthenedPosition` says "hardest near full hip extension on most machines". If the team still wants something on that exercise, use this exact optional text, which keeps the gap explicit: "Not tested directly: in a 9-week MRI trial in untrained young men and women (n=34), barbell hip thrusts grew the glutes about as much as back squats with the same number of sets; whether hip-thrust machines match this hasn't been tested in that trial. (Plotkin et al. 2023, PMID 37877099)"
- **(b) `barbell-hip-thrust` wording:** the current "done on a plate-loaded hip-thrust machine" is factually wrong. Use the replacement in the table: "barbell hip thrusts (done on a stand-alone hip-thrust bench)".
- **Knock-on fix for Laurent:** `exercises-citations.md` line 119 says "Plotkin 2023's hip-thrust machine (Thruster 3.0, BC Strength, plate-loaded)". Change it to "hip-thrust bench (BC Strength Thruster 3.0, used with a loaded barbell)". evidence.md has no "machine" wording for Plotkin, so nothing is needed there.

### Myrholt 2023 erratum: confirmed
- PubMed 36754062 (IJSPP 18(4):368–377) lists ErratumIn 36805934 (IJSPP 18(4):455, doi 10.1123/ijspp.2023-0050, "Published Erratum").
- Crossref has no update-to link, and Europe PMC lists it as subscription-only.
- I read the publisher's erratum page in full (journals.humankinetics.com/view/journals/ijspp/18/4/article-p455.xml, reached via the DOI). It says: "In Table 2, the unit of measure for vastus lateralis and triceps brachii thickness was listed as centimeters when it should have been millimeters. The article was corrected February 20, 2023."
- **Silas's description is confirmed:** the erratum covers only the Table 2 thickness unit (cm → mm, for VL and triceps). It doesn't change any reported percentage or conclusion. The audit row's "per Silas, not independently verified" can now read "verified against the publisher's erratum notice".

### Summary for Laurent
- **Apply:** the fixes to `dumbbell-lateral-raise`, `cable-lateral-raise`, `bayesian-cable-curl`, `cable-preacher-curl`, `lat-pulldown` and `barbell-hip-thrust`.
- **Clear:** set `cable-curl` to "".
- **Keep `machine-hip-thrust` empty.** Fix line 119 in `exercises-citations.md`.
- **Approved as written:** `incline-dumbbell-curl`, `dumbbell-preacher-curl`, `one-arm-dumbbell-row`, `leg-press` and `leg-press-calf-raise`.
- **Your call (b) is approved:** keeping the back squat and leg extension notes unchanged is right, since those are approved texts.

## Re-check of applied batch, T1–8 (Stirner, Oct 29, 2026, ~18:40 EET)
I diffed evidence.md (mtime 18:29:40 EET) against the 18:16 snapshot I audited (`carlsen-scratch/evidence.pass2-snapshot.md`) for topics 1–8 and the header, and matched each change to the Changelog. Every change in T1–8 maps to an approved item, and nothing unapproved changed in T1–8. One header addition on line 10 defines the `reviewed — …` tags, which is fine.

| T | Status | Remaining issue (exact fix) |
|---|---|---|
| 1 | Approved as applied (Myrholt erratum line and note). | Outstanding from my list: (a) model-as-fact sentence; R1 (not yet applied). |
| 2 | Approved as applied (Martorelli +2.1% at 10 wk, +3.9% at 5 wk; verified). | Outstanding: Refalo 2025 tag; R2. |
| 3 | Bello approved as applied (triceps exception, p=0.04). | **Regression in the Lopez note.** It now says the corrigendum content is "unverified". It can be verified: the corrigendum text (doi.org/10.1249/MSS.0000000000002838; PMC12479057 page text) says the authors "corrected the effect size of three studies (Morton et al., 2016; Jenkins et al., 2017; Ozaki et al., 2018) in Figure 4 … the overall and best quality effects are slightly changed, with no changes in the main findings and conclusions". Suggest restoring that wording, citing the corrigendum text. The corrected values exist only in the figure image. |
| 4 | R4 (d) approved as applied, plus the retags; Schoenfeld 2015 frequency tag now "duration not stated in abstract" (correct). | **Incomplete R4.** The Schoenfeld 2016 (c) summary (line 119) still ends "mostly not volume-equated", which contradicts the new (d) and the abstract. → "…favouring twice a week (volume-equated comparisons)." |
| 5 | Approved as applied. Krieger (a) and summary verified: 2–3 vs 1 set trend p=0.09, "significant when considering permutation test p values (p < 0.01)". Kassiano 2024 verified: LG +14.3/+8.1, SOL +12.7/+6.7, sum +12.0/+6.9, MG +9.9/+6.6 p=0.067. | — |
| 6 | Revised R6 approved as applied: Longo sentence in the notes, Villanueva retag, app copy unchanged. Buresh now says thigh not in the abstract (correct). | (d) still says Villanueva "this disagreement is unresolved and under review", which is inconsistent with the new retag. Use the corrected sentence below. Outstanding: my one-line and (a) accuracy tweaks. |
| 7 | R7 approved as applied, exactly as Vinci wrote it: one-line, (a), grade Moderate, (d), Pallarés 2021 (verified: k=16, ES 0.56 strength, 0.88 lower-limb hypertrophy, 0.28 architecture n.s.), and the retags. | Outstanding: the two after-failure calf trials (Larsen 2025 Front Psychol, PMID 39995432) in (d) and (b); Pedrosa 2023, Kassiano 2023 and Gschneidner tags. |
| 8 | Revised R8 approved as applied: (d); Saeterbakken n=59, 7 wk; stretch and variation sentences; Behm/Anderson tagged acute isometric Swiss-ball, n=8/10 ("on a Swiss ball" applied). Plotkin 2023 verified: untrained, n=34 (18/16), 9 wk, MRI. Its Oct 28, 2026 correction (doi 10.3389/fphys.2026.1987823) exists on Crossref and Frontiers. | (i) The Plotkin 2023 note leaves out part of the correction: the **funding statement** now also discloses that "BC Strength also donated the Thruster 3.0 apparatus used in the study". Add that. (ii) The new (a) clause "rotating exercises at random every session added no growth" comes from Baz-Valle 2019 (T11), which is not cited in T8. Add it to T8 (c) or name it in the notes. (iii) (d) still calls Kassiano 2025 "unresolved and under review" despite the retag; use the corrected sentence below. (iv) The notes repeat "Unstable exercises stay in the (exercise) catalog" twice; delete one. |

**Corrected suggested sentences:**
1. **T6 (d):** "Villanueva 2015 found that 60-second rests gave *larger* lean-mass and strength gains than 4-minute rests in older men (about 66–70 years), but it measured whole-body lean mass during a strength-focused phase, so it doesn't apply directly to younger lifters training for size." The parent's version said the shorter rests "worked well", which undersells the result: the abstract reports significantly greater gains.
2. **T8 (d):** T8 (d) refers to **Kassiano 2025, Res Q Exerc Sport 96(2):371-381, PMID 39388663**. That is the varied vs constant trial: 70 young women, 10 wk, training status not stated. It is not the preacher vs incline curl paper (Kassiano 2025, IJSM, PMID 39809454). Sentence: "Kassiano 2025 (Res Q Exerc Sport) found that planned rotation of thigh exercises across the week gave similar muscle growth at every measured site, and similar strength gains, compared with doing the same exercises every session, so variation is optional rather than required." The parent's "similar overall growth" undersells it: growth was similar at all sites. The variation was planned, not random.

**Still outstanding from my qa-v2-topics-1-8 list (not applied):**
- T1 (a) model-as-fact.
- T2 Refalo 2025 tag.
- T3 optional "close to or at failure".
- T4 Schoenfeld 2016 summary.
- T5 none.
- T6 one-line "both ends…" and the three (a) tweaks.
- T7 two after-failure trials, Goli wording, and the Pedrosa 2023, Kassiano 2023 and Gschneidner tags.
- T8 Kassiano 2025 curl summary (preacher distal +0.10 cm).
- R1 and R2 modifications.

---

## Vinci batches 5–6 (v3) review — Stirner, 2026-10-29 18:41 EET (UTC+2)

Inputs: qa-bobby-contradictions.md v3 (md5 95872b66…), evidence.md md5 c0ffa049 (confirmed unchanged). Each claim was checked against the PubMed abstract (efetch) unless a full text is named. No number below was accepted unless I saw it in a source.

### Per-item verdicts

| Item | Verdict | Notes |
|---|---|---|
| R1 v3 (T1, Myrholt) | **Approve** | Myrholt 2023 (IJSPP 18(4):368-377; PMID 36754062): 16 strength-trained adults, 6 wk, similar volume; VL thickness group difference 6 ± 6%, P<.05. Jenkins 2015 (EMG amplitude stayed higher at 80% than 30% 1RM) and Colosio 2026 (excitation at exhaustion rose with load; no common EMG level) match the abstracts. Optional: add "; whole-body lean mass (DXA) did not differ" after "(Myrholt 2023, n=16, 6 wk)". |
| R2 v3 (T2, Martorelli/Vieira) | **Modify (minor)** | Martorelli numbers match PMID 28713535 exactly (+17.5% RF, +8.5% RNFV, RNF 3.9%/2.1% at 5/10 wk, not significant). Vieira 2021 (k=13): favours failure overall, no difference when volume is equalized. That matches the abstract. The final clause is our interpretation, not a Vieira finding, so split it off. |
| R3 (T3, Hammert "slightly" removed) | **Approve, with caveat** | Hammert 2026 (PMID 42319300) abstract: 201 non-resistance-trained adults, 6 wk, 20–30RM grew more than 8–12RM. Removing "slightly" is fine. **Could not verify** the evidence.md summary "~0.30 vs ~0.20 cm" (it is not in the abstract). Silas should source it from the full text or remove it. The Mangine 2015 note matches (29 trained men, 8 wk, 1 vs 3 min rest; lean arm 5.2 ± 2.9% vs 2.2 ± 5.6%; bench 14.8% vs 6.9%). |
| R5 (T5, Camargo 2026) | **Modify** | Benito 2020 is in healthy males (111 studies, 1927 participants; sets/workout moderator −0.03, p=0.04). Camargo 2026 (J Appl Physiol 141(2):477-493): 25 trained men and women, 8 wk, within-subject; VL mCSA rose in both, no interaction. Its outcome is VL only. Change "both point to" to "both suggest", add "in men" for Benito, and add "(vastus lateralis)" for Camargo. |
| R7 v3 (T7, Larsen vs Goli) | **Modify** | Larsen 2025: 23 untrained men, 10 wk, MG +9.6% vs +6.7%. Goli 2026 (PMID 42006449): 16 untrained men, volume load equated, ~equivalent growth. Both match. Delete the speculative synthesis sentence and keep the design note. "Mixed results" and "in beginners" are OK. The Vendruscolo note matches (21 trained men, 3 wk, MRI CSA similar at 45/65/85%). |
| R9 (Scarpelli) | **Approve, with tag fix** | Scarpelli 2025: 37 untrained; ~34%/~19%/~35%; 5 non-responders. Matches. Nóbrega 2023 is an *exploratory secondary data analysis*, so change the tag "RCT" to "secondary analysis · untrained men · n=24". |
| R10 (Radaelli) | **Modify** | Radaelli 2015 = 48 men with no weight-training experience, so use "untrained men", not "untrained people". |
| R11 (Kassiano 2025; Heidel 2022) | **Approve** | Kassiano 2025: 70 young women. Heidel 2022: hypertrophy ES −0.01 (95% CI −0.525, 0.545), strength specific to the test device. Matches. |
| R12 (Camargo/Radaelli) | **Modify** | Same fix as R10: "untrained men". The Camargo phrasing (+120% vs +20%, no growth difference, trained) matches. |
| R13c (Wei 2023) | **Approve** | 13 sedentary women, 6 wk, similar MT (gastrocnemius, RF, gluteus maximus). Labelled untrained (sedentary). OK. |
| R14 (Hackett/Zourdos) | **Approve** | Hackett 2017: n=81 (53 M/28 F), ~1 rep error at 0–5 RIR vs >2 at 7–10; experience had no effect. Zourdos 2016: 25 men, training age 4.7 y, 2.05/3.65/5.15 at 1/3/5 RIR. Wiedenmann 2026: 26 adults, 6 sessions over 6 wk. Mansfield: 20 trained men, not retracted. Optional precision: "over a few sessions" could read "over six sessions" for Wiedenmann. |
| R15 (Halonen/Psilander, "untrained people" in grade) | **Modify** | Halonen matches (55 randomized, 42 completed, 45% women, untrained). The **Psilander 2019** abstract does not state training status (9 M/10 F, 10 wk unilateral, 20 wk off, 5 wk retraining), so "untrained" is **unverified**. Tag it "training status not stated in abstract" unless Silas confirms it from the full text. The grade change "untrained men" to "untrained people" is accurate. Pritchard wording must change (see below). If Hwang/Pritchard go into (d), the grade's "only one trial in trained lifters" becomes false. Neither has a continuous-training control, so the grade would need "only one controlled deload trial in trained lifters". |
| R16 (Sødal 2023 drop sets → 13b) | **Approve** | Sports Med Open 9(1):66: 6 studies, 142 participants (28 women), 5 pooled, SMD 0.155, p=0.392; some formats took ½–⅓ of the time. Matches. The "isolation exercises" scope is a Carlsen product framing, not a study finding. |
| R17 (Zaroni 2019 → T4 (d)) | **Modify** | See the specific check. Weekly **sets** per muscle were equated, but total load lifted was not (TOTAL +22.3%, p=0.029). The wording must say "set-equated" and note the higher load lifted. |
| R18 (Kinoshita, notes only) | **Approve, labelled** | 17 untrained adults; RF +13.2% vs +1.1%; vasti and QF similar. Keep the "untrained" label. |

### Exact modified wording

- **R2 (d) New:** "*Some results lean toward failure (Grgic 2022's trained subgroup; Hermann 2025 with one set per exercise; Martorelli 2017, where thickness rose significantly with failure and with volume-matched non-failure but not with lower-volume non-failure). Across 13 studies failure was favoured overall, but not when volume was equalized (Vieira 2021). This fits the idea that closeness to failure matters most when sets are few or loads light.*"
- **R5:** replace "both point to" with "both suggest". Benito: "...(Benito 2020, in men)". Camargo: "...(Camargo 2026, trained adults, vastus lateralis only)".
- **R7 (d):** delete "*Together they suggest the partials add growth roughly in line with the extra work they add.*" and insert "*The designs differ: Larsen added the partials on top of the same sets, while Goli matched total volume load.*"
- **R9 tag (Nóbrega 2023):** "[secondary analysis · untrained men · n=24 · 24 sessions · reviewed]".
- **R10 / R12:** "untrained people" → "**untrained men**" (Radaelli 2015).
- **R15 (Pritchard):** "rose after a few days off" → "**did not decline after 3.5–5.5 days off**" (8 trained men; the only significant change was T1→T3). Psilander tag: "[training status not stated in abstract]". If Hwang/Pritchard are added to (d), the grade becomes: "*Limited — only one controlled deload trial in trained lifters (a full week off, not a reduced week) ...*" (rest unchanged).
- **R17 T4 (d) addition:** "*In 18 well-trained men over 8 weeks, training each muscle 5×/week instead of 1×/week, with the same weekly sets per muscle, grew elbow flexors and vastus lateralis more; strength gains were similar (Zaroni 2019). Total load lifted was 22.3% higher in the 5×/week group, so the volume-load match was not exact.*" Tag: "[RCT · trained men · n=18 · 8 wk · weekly sets equated, volume load not (+22.3% TOTAL) · reviewed — outlier vs pooled negligible frequency effect]".

### Specific checks

1. **Zaroni 2019 volume matching (R17).** I checked the author-hosted accepted manuscript (paulogentil.com PDF; J Strength Cond Res 33(7S):S140-S151, doi 10.1519/JSC.0000000000002643, PMID 31260419). The aim is stated "with the number of sets per muscle group per week equated". Table 2 has both groups doing the same 25 exercises, 3 × 10–12RM, 15 sets per session, 5 sessions/week (SPLIT 5 exercises for one muscle in one day; TOTAL 1 exercise per muscle per day), all to failure. But total load lifted was higher in TOTAL (Δ 22.3%, p=0.029, d=1.13). Internal load did not differ (Δ 5.33%, p=0.406). Verdict: **set-volume-equated, not volume-load-equated.** The wording must say so (done above). Also: 18 men, RT experience 6.4 ± 2.4 y; MT EF +8.5% vs +3.8%, VL +9.7% vs +5.4%.
2. **Hughes 2020 retraction.** Confirmed. PMID 33337690 has pubtype "Retracted Publication". Notice PMID 33470601 ("JSCR-08-13218 and JSCR-08-15296 Retraction", JSCR 2021;35(3):585, doi 10.1519/JSC.0000000000003977) retracts Hughes 2020 (doi …3865) and a 2019 JSCR paper (doi …3436). evidence.md cites **neither** (grep: no "Hughes", no "…3436", no "…3865").
3. **Barbalho 2021 "correction".** The linked notice is doi 10.1055/a-1400-4290 (PMID 33733437), titled "Correction: Injury and Illness Rates During Ultratrail Running". It corrects an ultratrail injury rate (13.1 → 187.9 per 1000 h) in a different paper. Thieme's page and PubMed ("Erratum for" both papers) link it to Barbalho 2021, but the content has nothing to do with Barbalho: it is a **publisher mislink**. Barbalho 2021 itself is **not retracted** per PubMed pubtype and Crossref (no update-to/relation; updates filter empty). It stays **out** of evidence.md: it is not cited. The only Barbalho in evidence.md is the 2019 MSSE paper (PMID 30779716, pubtype "Retracted Publication"), named as retracted at lines 158 and 379.
4. **Gschneidner 2025 tag.** Checked against the SportRxiv preprint (doi 10.51224/SRXIV.485, version of 17 Dec 2024; published J Sports Sci 43(23):2963-2976, doi 10.1080/02640414.2025.2567805). Participants were "existing clients with a minimum of 6 months RT experience with Discover Strength", described as "previously trained". Muscle CSA was **estimated from circumference and skinfold** (Heymsfield/Housh equations), not imaging. Training was single sets, 2×/wk, to failure, and only the single-joint limb exercises differed in ROM. Arm and thigh interactions were −0.032 and 0, and equivalence was not established at their α=0.005 (p=0.071 arm, p=0.019 thigh). The authors include Discover Strength staff. The **current evidence.md tag ("training status not stated in abstract") is now outdated**. Change it to: "[cluster RCT · trained (≥6 mo supervised training, per preprint) · n=297 (163 vs 134) · 12 wk · CSA estimated from circumference + skinfold · reviewed — consistent with claim (partials ≈ full)]". This is Silas's edit.
5. **Hoang's decisions.** No v3 item touches T6's "beneficial" wording or the ~90 s / 2–3 min rest options, or T8's "prefer stable". T15: R15 leaves the one-line answer and (b) ("optional", "about every 8 weeks") unchanged, and the notes still call ~8 weeks a Carlsen product choice. No conflict.
6. **Strengthening / untrained labels.** No item strengthens a claim beyond its source once the modifications above are made. The two places that over-reached are R2's final clause (an interpretation, not Vieira's finding) and R7's synthesis sentence; both are fixed. Untrained-only findings are now labelled: Radaelli (R10/R12, after the fix), Larsen and Goli (R7), Scarpelli and Nóbrega (R9), Wei (R13c), Hammert (R3), Halonen (R15) and Kinoshita (R18). Psilander remains "status not stated".

### Open items (not mine to apply)
- Hammert "~0.30 vs ~0.20 cm" in evidence.md: needs a full-text source or removal (Silas).
- Gschneidner tag update (Silas).
- Psilander 2019 training status: full text not checked (could not verify).

## Final re-check, 18:48 version (Stirner, 2026-10-29 18:55 EET, UTC+2)

**File checked:** evidence.md as saved by Silas at 18:48 EET (md5 04a625bb…, 565 lines, 214 unique PMIDs).
**Compared against:** the earlier snapshot c0ffa049 (193 PMIDs), using a word diff. Each fix list in this report (T1–8 audit, T9–15 audit, T1–8 applied-batch re-check, v3 review) and R1–R18 from qa-bobby-contradictions.md v3 was checked against the new file.

### Per-topic verdicts

| Topic | Verdict | Notes |
|---|---|---|
| T1 | approve | Model wording, mixed volume-matched trials with the Myrholt DXA clause, Jenkins and Colosio all applied. |
| T2 | approve | R2 and the Vieira split sentence are in; the Refalo 2025 tag is fixed. |
| T3 | **still-needs-fix** | The Hammert figures "~0.30 vs ~0.20 cm" are **not in the PubMed abstract** (PMID 42319300, re-read 18:52 EET). The abstract gives only the direction. They appear in the (c) line 101 and in research note 106. App lines are fine. |
| T4 | approve | Schoenfeld 2016 is now "volume-equated". Zaroni (c), (d) and note match the full text. |
| T5 | approve | Krieger, Kassiano 2024, Benito (men) and Camargo (VL only) are in; "both suggest" is used. |
| T6 | **still-needs-fix (One-line only)** | (a), (d) and Villanueva are fixed. "Beneficial", both rest options and Limited are unchanged. The One-line still says "both ends of that range have built similar muscle", but the grade itself says no trial compared ~90 s with 2–3 min. This is stronger than the evidence. |
| T7 | approve | Two calf trials in beginners, the design note, Goli/Larsen wording and the Gschneidner tag are all in. |
| T8 | approve | Kassiano 2025 RQES and IJSM are kept separate. "Prefer stable" is kept. The catalog sentence now appears once (line 266). Plotkin funding is corrected. |
| T9 | approve | The grade now says "untrained participants". Ferrari drift, Scarpelli and the Nóbrega "small secondary analysis" match the abstracts. |
| T10 | approve | Radaelli (untrained men), Camargo, Gentil/Mannarino, "Moderate overall" and the Kinoshita note are in. |
| T11 | approve | "1.4 times" checked (Maeo abstract: whole triceps 1.4-fold). The Schwanbeck exception (+13.9% vs +8.6%) and the Rauch wording match the abstracts. |
| T12 | approve | Amirthalingam: "no significant increases … leg lean body mass or muscle thickness across groups". The 5-set trunk lean mass advantage is p=0.043. Hackett 2018: total, trunk and arm unchanged; 10-set leg lean mass fell from week 6 to 12 (p=0.02). Both match the abstracts. |
| 13a | **still-needs-fix** | (d) says "practice with feedback improved it in two short trials". The Hermann 2025 abstract does not mention feedback, and Remmert 2023 (n=9, trained) found no improvement. Ahtiainen (a) matches the abstract (NA +5.6%, SA −1.8%). |
| 13b | approve (app lines) + note fix | Sødal's "half to one-third of the time" **is in the abstract's conclusions** (PubMed 37523092; full text PMC10390395). App (d) is correct, but research note 447 wrongly says the figure is "not from the abstract". |
| 13c | approve | Lopes "15–88 y, coronary heart disease, COPD" is verified in the PMC full text (PMC6383082: "224 individuals aged between 15 and 88 years"). Kikuchi, Kotarsky, Wei and Carvalho are fine. |
| T14 | **still-needs-fix** | (a) says "Practice seems to help: in two newer trials, estimates improved…" but leaves out the null trial (Remmert 2023) that (d) cites. The Hermann (8 wk) and Wiedenmann (6 sessions/6 wk) numbers match the abstracts. |
| T15 | approve | The grade fix is applied. Hwang, Pritchard ("did not decline after 3.5–5.5 days off"), Halonen and De Marco match the abstracts. Psilander is tagged "training status not stated in abstract; full text not checked", which is honest. Hoang's One-line, (b) and Limited are unchanged. |

### Exact fixes

1. **T3, (c) line 101 (Hammert).** Replace "low load gave larger muscle thickness gains (~0.30 vs ~0.20 cm)" with "low load gave greater elbow-flexor muscle-thickness increases than high load and a non-exercise control; tendon thickness changed similarly across training groups". Optionally change the tag to "n=201 (45 high-load, 48 low-load, plus mid-point and control groups)".
2. **T3, research note 106.** Delete "Hammert 2026's ~0.30 vs ~0.20 cm muscle-thickness figures are stated in the PubMed abstract (PMID 42319300, re-read Oct 29, 2026)." Replace with: "The Hammert 2026 PubMed abstract reports the direction only (greater muscle-thickness increase with low load); effect sizes were not checked in the full text."
3. **T6, One-line.** Use: "Rest about 90 seconds to 3 minutes between sets; longer rest can make it easier to keep your reps and weight up, and studies have not found clear extra growth from resting longer than about 90 seconds." This keeps both options. If Hoang approved this exact One-line text, the change needs his decision.
4. **13a, (d) last sentence.** Use: "Years of experience show little effect on RIR accuracy; repeated practice improved it in two short trials, though one small trial in trained lifters found no change."
5. **13b, research note 447.** Replace "comes from the included studies as summarised by Vinci and checked by Stirner, not from the abstract" with "is stated in the abstract's conclusions (Sødal 2023, PubMed 37523092, re-read Oct 29, 2026)".
6. **T14, (a).** Replace "Practice seems to help: in two newer trials, estimates improved over several weeks of repeated sessions." with "Practice may help: in two newer trials, estimates improved over several weeks of repeated sessions, though one small trial in trained lifters found no change."
7. **Optional, header line 10.** It still defines the `contradicting — under review` tag, while also stating that no citation carries it. Suggest deleting the definition sentence. This is not app copy.

### Global checks

- **App lines:** all 85 One-line, grade, (a), (b) and (d) lines were checked. None contains I/we/our/us, a topic cross-reference, "10–20 sets", "20 sets", "sets a week", damage/micro/tear, or unresolved/under review.
- **Tag strings:** no citation carries `contradicting — under review`. No "unverified" or "unconfirmed" appears anywhere. The tag string survives only in the header line 10 definition (fix 7).
- **Retracted papers:**
  - Barbalho 2019 appears only labelled as retracted/do not use (lines 164, 396, 554).
  - Barbalho 2021 does not appear.
  - Hughes 2020 (PubMed 33337690; Crossref confirms it is retracted) appears only in the T14 research note: "is retracted and is not cited". It is not cited. Removing the PMID from that note is optional.
- **Hoang's decisions are unchanged:** T6 (both ~90 s and 2–3 min, Limited); T8 ("prefer stable"; unstable exercises stay in the catalog); T15 (optional, about every 8 weeks, product choice).

### New PMIDs since c0ffa049 (21)

- **The list:** Jenkins 26159316, Mangine 26272733, Hackett 2017 27787474, Hwang 28328712, Pritchard 29369954, Zourdos 2021 30747900, Psilander 30991013, Benito 32079265, Hughes 33337690, Vieira 33555822, Heidel 34609100, Nóbrega 2023 36515591, Sødal 37523092, Wei 37598268, Halonen 39364857, Vendruscolo 39449136, Larsen (Front Psychol) 39995432, Scarpelli 2025 40500534, Colosio 41841121, Camargo 42461790, Wiedenmann 42632893.
- **Result:**
  - All 21 resolve on PubMed (esummary). DOI, year, volume and first author match each (c) citation.
  - Crossref shows no update-to or updated-by for any except Hughes, which is retracted and appears in notes only.
  - Wei has a has-preprint relation only.
  - Mangine, Vendruscolo and Hughes appear in notes only.

### Specific items

1. **Hammert, PMID 42319300.** It exists, and the metadata matches (MSSE 2026, online Jun 22, doi 10.1249/MSS.0000000000004052, Hammert WB … Loenneke JP). The numbers 0.30 and 0.20 are **not** in the abstract; Silas's claim is wrong. Fixes 1–2.
2. **New PMIDs:** see the table above; all OK.
3. **Silas's wording against the abstracts:**
   - Rauch: correct. The CI analysis showed only AES increased lean body mass, and no between-group test is reported.
   - Amirthalingam: correct for the outcome cited (leg lean mass and muscle thickness).
   - Hermann/Wiedenmann generalisation: the numbers are correct, but it leaves out Remmert. Fixes 4 and 6.
   - Schwanbeck: correct (machine bench press 13.9% vs 8.6%, p=0.05).
   - Nóbrega: correct ("exploratory secondary data analysis", 24 untrained men).
4. **Sødal:** verified. The figure is in the abstract's conclusions; it was not checked in the full text. Keep the (d) wording and fix the note (fix 5).
5. **Kassiano 2025:** cited correctly and separately. RQES 96(2):371-381, 39388663 (n=70, rotation vs fixed). IJSM 39809454 (n=63; proximal 0.08 cm with incline curls, distal +0.10 cm with preacher curls).
6. **Psilander and Buresh:**
   - Psilander is honest: training status is not stated in the abstract, and the full text was not checked.
   - Buresh is honest: untrained men, arms only, and the thigh CSA result is not reported in the abstract.

### Approved for import

T1, T2, T4, T5, T7, T8, T9, T10, T11, T12, 13b (after the note-only fix 5), 13c, T15.

### Still needs fixes

T3 (fixes 1–2), T6 (fix 3), 13a (fix 4), T14 (fix 6).

evidence.md was not edited (md5 04a625bb… unchanged).

## Final clearance, 19:00 version (Stirner)
- **Correction to the 18:48 re-check:** the Hammert 2026 PubMed abstract (PMID 42319300) does state "~0.30 cm versus ~0.20 cm". The XML uses thin spaces, so the earlier text search missed it. I re-verified this myself at about 19:00 EET. Silas's T3 text stands, and fixes 1–2 for T3 are withdrawn.
- I verified that the T6 one-line ("both ends of that range can build muscle"), the 13a (d) sentence with Remmert 2023, the 13b Sødal note, the T14 (a) sentence, and the header tag-definition removal are applied.
- **Approved for import:** T3, T6, 13a, 13b and T14. All 17 topics of evidence.md are now approved.
