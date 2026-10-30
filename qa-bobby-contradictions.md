# Carlsen: contradiction log (qa-bobby-contradictions.md)

**Owner:** Agent Vinci, sole owner of contradicting studies (TEAM.md).
**Version:** v3, 29 Oct 2026, ~18:40 Helsinki time (UTC+2); adds batches 5–6 (Stirner) and amends R1–R3, R5, R7, R9–R15, with new R16–R18. v2 was written after 18:15. v1 (about 18:10) predated Silas's phase-2 rewrite of evidence.md and is superseded where the two disagree.
**Checked against:** `/workspace/carlsen/evidence.md` as rewritten by Silas at 18:13 (md5 2e59bcd7…), then re-checked after a further edit at 18:20 (md5 cae2905b…, 165 KB). The 18:20 edit only changed T1's research note (Myrholt 2023 erratum), so none of the quotes below are affected. **v3:** re-read at md5 c0ffa049… (~18:33). T9–T14 app text is unchanged; T15 carries Hoang's deload decision; R4 and R7 are applied. All v3 "Current" quotes come from this version. Every "current wording" quote below was re-read from that version. Silas's handoff `/workspace/carlsen/contradictions-for-vinci.md` (18:15) was read but not edited.
**This file does not edit evidence.md.** Only Silas edits it, and Stirner approves. The product decisions flagged here go to Hoang through Luxanna, the lead.
**Sources merged:** my own search, Laurent batches 1–2, Emrys batch 3, and Silas batch 4 (36 entries plus the T6 rest section). Each conflict has one entry, and every source that raised it is credited.
**Depth:** abstracts only, via PubMed efetch and esummary, plus Crossref and doi.org. I verified every PMID, DOI, year and journal in this file myself this session. Numbers come only from abstracts.

---

# PRIORITY A: T6 rest. **Decided by Hoang (via Luxanna), 2026-10-29.**

**Decision:** the app presents both 90 s and 2–3 min as valid options, and the user chooses. It keeps Hoang's wording that longer rest is beneficial, graded **Limited**, with the caveats in the research notes. **There is no 90 s–2 min default.** My earlier proposed per-exercise default is withdrawn.

**Check against evidence.md** (md5 9ea587a8…, re-read after 18:23):
- The One-line answer, (a), (b) and grade ("Limited — …") already match the decision.
- The research notes already contain all three caveats:
  - **Volume load:** "*the clearest wins for longer rest are against 1 min, and mainly for strength or via more volume load*". Longo 2022's volume-load-matched null is spelled out in (d).
  - **Wins only against 1 min:** same sentence, plus "*Long-term trials compared 1 vs 3 min, 1 vs 2.5 min, 2 vs 5 min…*".
  - **Nothing past ~90 s in Singer 2024:** the Table 2 estimates and "*no study shows 2–3 min beating ~90 s for growth*".

**R6 verdict: no change needed.** The optional, non-blocking additions are in R6.

**The evidence behind the caveats, unchanged from v2 and verified:**
- Longo 2022: 3 min beat 1 min only when it allowed more volume load; with volume load matched, there was no difference.
- Singer 2024: small edge for >60 s, none appreciable beyond ~90 s.
- Ahtiainen 2005 (2 vs 5 min) and de Souza 2010 / Souza-Junior 2011 (constant 2 min vs shortened rest): similar growth.
- Every long-term win for longer rest (Schoenfeld 2016, Buresh 2009) was against 1 min.
- Villanueva 2015 (older men) is a population and outcome mismatch.

---

# PRIORITY B: T7 lengthened partials. **Approved for Silas; applied (verified md5 c0ffa049).** v3 amendment for Larsen 2025 (Front Psychol): see R7.

**Current wording (evidence.md 18:13):**
- **One-line:** "*Exercises that load a muscle hard in its stretched position tend to build more muscle; partial reps in the stretched range have grown muscle about as well as full reps.*"
- **Grade:** "*Moderate — several within-person trials show more growth when a muscle is trained at long lengths, but most are small, short, in untrained people and on a few muscles.*"
- **(a), last sentence:** "*Partial reps in the stretched part of the range grew muscle about as well as full reps, and in a few small studies better.*" (The research notes say this phrase is "unchanged pending Vinci's review".)
- **(b):** "*…optionally add lengthened partials at the end of a set once full reps fail (tested so far in one small calf study).*"

**Decision:**
- **Delete "and in a few small studies better".**
- Say that the largest trials and those in trained lifters found no meaningful difference, and that full ROM stays the default.
- Narrow the "stretched position" claim to the muscles where it was shown.
- Keep lengthened partials as an **optional** technique.

**Why:**
- **Larger and better-controlled trials find no advantage.**
  - Gschneidner 2025: pre-registered, 15 sites, n=297, 12 wk. Interaction estimates were −0.032 (arm CSA) and 0 (thigh). The authors call the effects "small and practically equivalent", but formal equivalence was not shown at their adjusted α=0.005 (equivalence p=0.071 arm, 0.019 thigh), and overall growth was also small.
  - Wolf 2025: n=30 trained, within-subject, 8 wk. Elbow flexors and extensors grew similarly.
  - Plotkin 2026: n=16 trained, within-subject, 8 wk, leg press + leg extension + leg curl, MRI. VL mCSA LP−FULL −1.4 cm² (95% CI −6.1 to 3.8), with no fiber-level differences.
  - Larsen 2025: n=23 trained. Restricted vs maximal knee flexion in the leg press made no difference to the quadriceps.
- **The positive trials are small and in untrained people.**
  - Pedrosa 2022: n=45 untrained women, knee extension.
  - Kassiano 2023: n=42 women, calves.
  - Pedrosa 2023: n=19, initial vs final ROM, with no full-ROM arm.
  - Goli 2026: one small calf study of partials added after failure.
- **The pooled evidence leans toward full ROM.**
  - Wolf 2023 (IJSC): main model SMD 0.12 (−0.02 to 0.26) favouring full ROM. The long-length-partial subgroup estimate was uncertain.
  - Pallarés 2021 (16 studies, all partial types): full ROM better for strength and lower-limb hypertrophy.
- **Varovic 2025** (long-length isometrics vs full-ROM dynamic, n=23 trained, 6 wk) should **not** be read as "similar", as Silas's note puts it. The estimate was −0.20 cm (HDI −0.54 to 0.16), with 87% probability of direction and 75% of the posterior outside the ROPE. That is an uncertain *lean*, most likely toward full-ROM dynamic training, although the abstract doesn't define the sign. Treat it as inconclusive.
- **Stretch-position exercise choice:**
  - Supported for hamstrings (seated vs lying curl), triceps (overhead) and calves (standing vs seated), mostly in small trials.
  - Not supported, or mixed, for:
    - glutes (Plotkin 2023, hip thrust ≈ squat);
    - side delts (Larsen 2025 lateral raises);
    - quads in the leg press (Larsen 2025);
    - incline curls (Zabaleta-Korta 2023: no significant growth; Kobayashi 2026: slightly more biceps).

**Exact wording to apply (R7):**
- **One-line →** "*Loading a muscle hard in its stretched position has built more muscle for some muscles, such as the hamstrings, triceps and calves; partial reps in the stretched range have grown muscle about as well as full reps, but not better.*"
- **(a) last sentence →** "*Partial reps in the stretched part of the range grew muscle about as well as full reps; the largest trial (297 people) and several trials in experienced lifters found no meaningful difference, so full reps remain the default.*"
- **(b):** keep as is.
- **Grade →** "*Moderate — several within-person trials show more growth when some muscles (hamstrings, triceps, calves) are trained at long lengths, but most are small and short; for lengthened partials, larger trials and trials in trained lifters found no advantage over full range of motion.*" The grade word stays **Moderate**.
- **Tags:** retag Wolf 2025, Gschneidner 2025, Plotkin 2026 and Larsen 2025 from "contradicting — under review" to **"reviewed — supports 'about as well as, not better'"**. Retag Varovic 2025 as "reviewed — inconclusive".

**Severity:** moderate.

---
# Index: one row per conflict, all sources merged

Status key:
- **open:** awaiting Silas/Stirner.
- **partly applied:** evidence.md 18:13 already covers part of it.
- **decision:** needs Hoang via Luxanna.
- **closed:** no change needed.

| ID | Topic | Conflict (short) | Sources | Severity | Recommended change | Status |
|---|---|---|---|---|---|---|
| T1 | 1 Tension / effective reps | (a) says more velocity loss built more muscle; volume-matched trials are mixed (2 null, Myrholt 2023 favours more loss); EMG stays higher with heavy loads | Vinci (Jenkins 2015, Colosio 2026, Nóbrega 2018); Silas (Andersen 2024, Terada 2022); Stirner (Myrholt 2023) | minor | R1 (amended v3) | open (Stirner: modify → done) |
| T2 | 2 Failure / RIR | Failure ≈ non-failure when volume is matched; failure edge with single sets and in the trained subgroup | Vinci (Vieira 2021, Santanielo 2020, Hermann 2025); Laurent I2.2; Emrys; Silas (Grgic 2022, Hermann 2025, Martorelli 2017); Stirner (Martorelli fix) | minor | R2 (amended v3): Martorelli phrase corrected | open (Stirner: modify → done) |
| T3 | 3 Load / reps | Hammert 2026 light > moderate; Lasevicius 2018 20% < 80%; Mangine 2015 heavy > moderate (rest/volume confounded) | Vinci (Hammert, Cumming 2025, Lees 2025); Laurent I2.1; Silas (Hammert, Lasevicius 2018); Stirner (Mangine 2015) | minor | R3 (amended v3) | approved by Stirner with tweak (folded in) |
| T4 | 4 Frequency | Single trials point both ways; evidence.md misdescribed Schoenfeld 2016 (fixed); Zaroni 2019 not cross-linked | Vinci (Schoenfeld 2015, Gomes 2019, Bartolomei 2021, Saric 2019); Laurent + Emrys I2.3; Silas (Schoenfeld 2016, Schoenfeld 2015, Lasevicius 2019, Yue 2018); Stirner (Zaroni 2019) | minor | R4 (applied); R17 (new) | R4 **applied**; R17 open |
| T5 | 5 Volume per session | Benito 2020: more sets per workout linked to less whole-body gain; Barsuhn 2025 and Camargo 2026 vs Scarpelli 2022 | Vinci (Benito 2020, Scarpelli 2022); Laurent I2.6; Silas (Barsuhn 2025, Scarpelli 2022); Stirner (Camargo 2026) | moderate | R5 (amended v3) | approved by Stirner with tweak (folded in) |
| T6 | 6 Rest | ~90 s vs 2–3 min; isolation recovers faster; Villanueva older men | Vinci (Senna 2016, Grgic 2017, Villanueva 2015); Laurent + Emrys I2.4; Silas (T6 section, 11 papers) | **moderate** | R6: no change needed (optional Longo line, Villanueva retag) | **decided by Hoang (via Luxanna), 2026-10-29**: no change needed |
| T7 | 7 Long lengths / partials | "in a few small studies better" not supported (fixed); stretch advantage muscle-specific; Larsen 2025 (Front Psychol) vs Goli 2026 on partials after failure; Vendruscolo 2025 BFR null | Vinci (Gschneidner 2025, Wolf 2025, Pallarés 2021, Zabaleta-Korta 2023, Augustin 2025); Laurent I1.4; Emrys (Wolf 2023); Silas (Wolf 2025, Gschneidner 2025, Plotkin 2026, Larsen 2025, Varovic 2025); Stirner (Larsen 2025 FP, Vendruscolo 2025) | **moderate** | PRIORITY B / R7 (amended v3 for (b), (d)) | v2 R7 **applied**; v3 amendment open |
| T8 | 8 Exercise selection | Stability: Saeterbakken 2019 similar; variation: Kassiano 2025 similar; glutes / side delts / leg-press quads show no stretch advantage | Vinci (Plotkin 2023, Larsen 2025 ×2); Laurent I1.1, I1.5, I1.6, I2.5; Silas (Kassiano 2025, Saeterbakken 2019) | moderate | R8: (d) + note + retag; prefer-stable graded Theoretical | stability **decided by Hoang (via Luxanna), 2026-10-29**; (a) wording open |
| T9 | 9 Progression | Ferrari 2026: no difference at any time point; RIR drifted to ~4; Scarpelli 2025 individual response by progression type | Vinci; Silas (Ferrari 2026); Stirner (Scarpelli 2025, Nóbrega 2023) | minor | R9 (amended v3) | open |
| T10 | 10 Weekly sets | Trained trials mixed (plateau); Barsuhn and Camargo 2026: large rises above habitual volume added nothing; Radaelli 2015 dose-response in untrained people; indirect sets (Gentil vs Mannarino) | Vinci (Scarpelli 2022, Damas 2019); Laurent + Emrys I1.3; Emrys I3.1; Silas (Heaselgrave, Aube, Enes, Gentil); Stirner (Camargo 2026, Radaelli 2015, La Scala Teixeira 2018, Kinoshita 2026) | minor | R10 (amended v3) | open |
| T11 | 11 Substitution | (a) "helped some regions grow" vs Kassiano 2025 null; Costa 2022 strength-only; Baz-Valle 2019; Heidel 2022 supports equipment claim; Barbalho 2021 kept out | Silas (Costa 2022, Baz-Valle 2019); Laurent I1.2; Stirner (Kassiano 2025, Heidel 2022, Barbalho 2021) | minor | R11 (amended v3) | open |
| T12 | 12 Per-session limits | Benito 2020; Zaroni volume unclear; Radaelli 5 > 3 sets; Camargo +120% no harm; acute MPS vs signalling | Vinci (Benito 2020, Gomes 2019); Laurent I2.6; Emrys I3.2; Silas (Zaroni, Schoenfeld 2019, Kumar, Terzis); Stirner (Camargo 2026, Radaelli 2015) | minor | R12 (amended v3) | open |
| T13a | 13a Experience | Refalo 2025 "not influenced by experience" is a **false conflict** | Emrys I3.4; Silas (Refalo 2025) | minor | R13a: replace the (d) sentence; drop tag | open |
| T13b | 13b Session length | Zhang 2025 supersets (applied); Sødal 2023 drop sets as a time saver | Vinci; Stirner (Sødal 2023) | minor | R16 (new) | open |
| T13c | 13c Equipment | 20% 1RM single trial vs Carvalho 2022 meta; Kotarsky 2018 uninformative; Heidel 2022 and Wei 2023 support | Vinci (Carvalho 2022); Laurent I2.1; Silas (Kotarsky 2018); Stirner (Heidel 2022, Wei 2023) | moderate | R13c (amended v3) | open |
| T14 | 14 RIR accuracy | Steele 2017 SEM vs "1–2 reps"; practice improves accuracy; Hackett 2017 and Zourdos 2021 (larger error far from failure, long sets); Hughes 2020 retracted, not cited | Vinci (Wiedenmann 2026, Hermann 2025, Hickmott 2024, Droguett 2026); Emrys I3.3; Silas (Steele 2017); Stirner (Hackett 2017, Zourdos 2021, Mansfield 2020, Hughes 2020) | moderate | R14 (amended v3) | open |
| T15 | 15 Deloads | Bosquet 2013 is long-break detraining; Halonen 2024 and Psilander 2019 are long breaks in untrained people | Vinci (Hwang 2017, Pritchard 2018); Emrys; Silas (Bosquet 2013); Stirner (Halonen 2024, Psilander 2019) | minor | R15 (amended v3): notes and grade only; v2 One-line rewrite withdrawn | advice **decided by Hoang (deload optional, ~every 8 wk)**; notes open |

**Major:** none (v3 included: under Hoang's decisions no batch-5/6 item changes advice). **Moderate:** T5, T6, T7, T8, T13c, T14. **Minor:** the rest. *(T12 drops from moderate to minor versus v1, because evidence.md 18:13 already lists the opposing findings.)*

---

# Recommendations for Silas and Stirner (apply-ready)

Format for each item:
- **Where:** the topic and field.
- **Current:** the exact text from evidence.md 18:13; for items amended in v3, re-checked at md5 c0ffa049.
- **New:** the replacement text.
- **Cite/tag:** papers to cite or retag. "Retag" means changing the "contradicting — under review" suffix in (c) and the "under review" phrase in (d).

Only the items marked **decision** need Hoang.

### R6. T6 Rest. **Decided by Hoang (via Luxanna), 2026-10-29.** R6: no change needed
- **Current evidence.md T6 already matches the decision.**
  - One-line: "*Rest about 90 seconds to 3 minutes between sets; longer rest can make it easier to keep your reps and weight up, and both ends of that range have built similar muscle.*"
  - Grade: "*Limited — …*"
  - (b): "*…pick what suits you…*"
  - The research notes already hold all three caveats.
- **No 90 s–2 min default** (withdrawn).
- **Optional, non-blocking:**
  - (i) In the research notes, after "*…mainly for strength or via more volume load.*", add: "*In Longo 2022, 3-minute rest grew more than 1-minute rest only when it allowed more volume load; with volume load matched, rest length made no difference.*"
  - (ii) Retag Villanueva 2015 from "contradicting — under review" to "*reviewed — population/outcome mismatch (older men, strength phase, whole-body lean mass); no age caveat in app copy*".

### R7. T7 Lengthened partials (PRIORITY B). **Approved for Silas; applied** (amended v3 for (b), (d) and notes)
*Applied by Silas, verified in evidence.md md5 c0ffa049: the One-line, (a), grade, the Pallarés 2021 sentence, "match but do not beat full ROM", and all five retags. Approved v2 text is kept in PRIORITY B above. v3 adds the missed Larsen 2025 calf trial (batch 6, Stirner) and Vendruscolo 2025.*
- **(b) Current:** "*…optionally add lengthened partials at the end of a set once full reps fail (tested so far in one small calf study).*"
- **(b) New:** "*…optionally add lengthened partials at the end of a set once full reps fail (tested so far in two small calf studies in beginners, with mixed results).*"
- **(d) Current:** "*Only one small trial in untrained calves (Goli 2026) tested partials added *after* full-ROM failure; it found similar growth with half the sets, so that use is only lightly tested.*"
- **(d) New:** "*Two small calf trials in untrained men tested lengthened partials added *after* full-ROM failure, with mixed results: adding them to the same sets gave more growth (Larsen 2025, Front Psychol: +9.6% vs +6.7%), while extending half as many sets with partials, total volume load matched, gave similar growth (Goli 2026). Together they suggest the partials add growth roughly in line with the extra work they add, so that use is only lightly tested.*"
- **Agreement with Stirner's interim wording:** compatible. Stirner's "(b)" text is used with "in beginners" added. My (d) keeps his "mixed results" and Goli fix, and adds the design difference (partials added on top vs volume load matched), which explains most of the disagreement in tension terms. If Silas prefers Stirner's shorter (d) verbatim, that is also accurate.
- **One-line:** no change. Its "but not better" refers to partials used *instead of* full reps; add to the research notes: "*'Not better' compares partials used instead of full reps; partials added after full-rep failure gave more calf growth in one trial (Larsen 2025, Front Psychol).*"
- **Research notes, add:** "*Vendruscolo 2025 (Sports Health 17(5):1036-1043, PubMed 39449136; 21 trained men, 3 wk): low-load (30% 1RM) blood-flow-restricted elbow flexion at long vs short muscle length gave similar MRI CSA at all three sites. Short, low-load and occluded, so not cited in app copy.*"
- **Cite:** Larsen S, Swinton PA, Sandberg NØ, et al. 2025, Front Psychol 16:1494323, doi 10.3389/fpsyg.2025.1494323, PMID 39995432 [RCT (within-subject legs) · untrained men · n=23 · 10 wk · reviewed — partials added on top (not volume-matched)]. Distinct from the Larsen 2025 leg-press trial (PMID 40113586).
- **Retag:** Goli 2026 → "reviewed — volume-load matched; similar growth".
- **Grade:** no change (Moderate).

### R1. T1 Tension / effective reps (amended v3)
*v3 change: per Stirner's verdict, the (a) sentence now includes Myrholt 2023 (volume-matched, favoured more velocity loss), so "two small trials found no difference" becomes "mixed". Status: not yet applied (T1 (a) unchanged in evidence.md md5 c0ffa049).*
- **(a) Current, last sentence:** "*In several velocity-based trials, letting the bar slow down more within each set (stopping closer to failure) built more muscle.*"
- **(a) New:** "*In several velocity-based trials, letting the bar slow down more within each set (stopping closer to failure) built more muscle, although those sets also included more reps; when total reps were roughly matched, results were mixed: two small trials found no difference and one found slightly more thigh growth with more slowing.*"
- **(d) Current:** "*Two small trials that matched total volume (Andersen 2024, Terada 2022) found no difference; this disagreement is unresolved and under review.*"
- **(d) New:** "*Among trials that roughly matched total volume, two small ones found no difference (Andersen 2024, Terada 2022) and one in strength-trained lifters found slightly more vastus lateralis growth with higher velocity loss (Myrholt 2023, n=16, 6 wk). EMG studies find heavier loads keep higher surface EMG even at failure (Jenkins 2015; Colosio 2026), so equal recruitment at light loads is inferred from growth trials, not shown directly.*"
- **Cite:** Myrholt RB et al. 2023, Int J Sports Physiol Perform 18(4):368-377, doi 10.1123/ijspp.2022-0161, PMID 36754062 (already in T1 citations; erratum PMID 36805934 is a units fix, no data change). Jenkins 2015 (PMID 26159316) and Colosio 2026 (PMID 41841121) as in v2.
- **Retag:** Andersen 2024 and Terada 2022 → "reviewed — volume-matched; mixed with Myrholt 2023". Myrholt 2023 → "reviewed — volume-matched; favours more velocity loss (VL only, 6 ± 6% group difference)". Grade: no change (Moderate).
- **Related, Stirner's own item (not mine to approve):** Stirner flags T1 (a) "*Slow, forced reps near failure are where each fiber produces the most force.*" as stating the model as fact. I agree on tension-framing grounds; it fits with the R1 wording above.

### R2. T2 Failure / RIR (amended v3)
*v3 change: my v2 Martorelli phrase ("only the volume-matched non-failure group kept pace") was wrong. Re-read of the abstract (PMID 28713535): 10-wk muscle thickness rose +17.5% with failure (RF) and +8.5% with volume-matched non-failure (RNFV), both significant within-group; +2.1% with lower-volume non-failure (RNF, not significant; +3.9% was its 5-wk value). No between-group test for thickness is reported in the abstract. Vieira parenthetical added per Stirner.*
- **(a) Current, last sentence:** "*In head-to-head trials in trained lifters, stopping 1–3 reps short of failure built about as much muscle as going to failure.*"
- **(a) New:** "*In head-to-head trials in trained lifters, stopping 1–3 reps short of failure built about as much muscle as going to failure; when you do only one set of an exercise, taking it closer to failure may add a little.*"
- **(d) Current:** "*Some results lean toward failure (Grgic 2022's trained subgroup; Hermann 2025 with one set per exercise; Martorelli 2017 in women); these are unresolved and under review.*"
- **(d) New:** "*Some results lean toward failure (Grgic 2022's trained subgroup; Hermann 2025 with one set per exercise; Martorelli 2017, where thickness rose significantly with failure and with volume-matched non-failure but not with lower-volume non-failure). They fit the non-linear pattern: across 13 studies failure was favoured overall, but not when volume was equalized (Vieira 2021), and closeness to failure matters most when sets are few or loads light.*"
- **Cite:** Vieira AF et al. 2021, J Strength Cond Res 35(4):1165-1175, doi 10.1519/JSC.0000000000003936, PMID 33555822 [meta-analysis · k=13].
- **Retag:** Grgic 2022, Hermann 2025 and Martorelli 2017 → "reviewed — consistent with non-linear dose-response". Grade: no change. (Optional, Stirner: grade "meta-analyses … agree" → "mostly agree".)

### R3. T3 Load / reps (amended v3)
*v3 change: Stirner's tweak, Hammert "slightly more" removed (about 0.30 vs 0.20 cm is not slight). Mangine 2015 added as a research note (batch 6).*
- **(d) Current:** "*Two results do not fit neatly and are under review: Hammert 2026 found more growth with light loads in untrained arms, and Lasevicius 2018 found 20% 1RM less effective.*"
- **(d) New:** "*Two results do not fit neatly: Hammert 2026 found more growth with 20–30 reps than 8–12 in a large 6-week trial of untrained elbow flexors, and Lasevicius 2018 found 20% 1RM less effective than heavier volume-matched loads, while a meta-analysis of volume-matched studies found no clear difference down to very light loads (Carvalho 2022). Neither changes the 5–30 rep guidance.*"
- **Research notes, add:** "*Mangine 2015 (Physiol Rep 3(8):e12472, PubMed 26272733; 29 trained men, 8 wk): 4×3–5 at ~90% 1RM with 3-min rest gave more DXA lean arm mass (+5.2% vs +2.2%) and bench 1RM than 4×10–12 at ~70% with 1-min rest. Rest length differed and volume load was not matched, so it is not a clean load comparison; the 1-min rest arm also fits Topic 6. Not cited in app copy.*"
- **Retag:** Hammert 2026 → "reviewed — short, untrained; ahead of print". Lasevicius 2018 → "reviewed — below ~30% 1RM floor". Grade: no change (Strong).

### R4. T4 Frequency (factual fix). **Approved for Silas; applied** (verified in evidence.md md5 c0ffa049). Zaroni 2019 cross-link → R17.
- **(d) Current:** "*The 2016 analysis favored 2×/week over 1×, but most of its studies did not equate volume.*"
- **Problem:** the Schoenfeld 2016 abstract says the opposite: "*When comparing studies that investigated training muscle groups between 1 to 3 days per week on a volume-equated basis…*". Silas's handoff repeats the error.
- **(d) New:** "*The 2016 analysis (10 studies) favored 2×/week over 1×; later analyses with many more studies (25 and 67) did not confirm a frequency effect once volume was equal.*"
- **Also replace:** "*these disagreements are unresolved and under review*" → "*these single small trials point both ways, as expected around a near-zero average effect*".
- **Retag:** Schoenfeld 2016, Schoenfeld 2015, Lasevicius 2019 and Yue 2018 → "reviewed — consistent with negligible pooled effect". Yue 2018's result was within-group only. Grade: no change (Strong).

### R5. T5 Volume per session (amended v3)
*v3 change: Stirner's tweak, "found no threshold" → "did not identify a specific ceiling" (the abstract does not state "no threshold"). Camargo 2026 added (batch 5).*
- **(d) Current:** "*No verified peer-reviewed study was found that pins down a per-session ceiling.*"
- **(d) New:** "*No study pins down a per-session ceiling; one meta-regression of 111 studies linked more sets per workout to slightly smaller whole-body gains (Benito 2020), but it compared across studies, used whole-body measures and did not identify a specific ceiling.*"
- **(d) Current:** "*In trained lifters, raising volume well above what they were already doing did not always add growth (Barsuhn 2025), while an individualised increase did in one small trial (Scarpelli 2022); this is unresolved and under review.*"
- **(d) New:** "*In trained lifters, raising volume well above what they were already doing did not add growth in two trials (Barsuhn 2025; Camargo 2026, +120% vs +20% over habitual volume, similar growth and no impairment), while an individualised increase did in one small trial (Scarpelli 2022); both point to setting the dose from each lifter's recent volume rather than a fixed number.*"
- **Cite:** Benito PJ et al. 2020, Int J Environ Res Public Health 17(4):1285, doi 10.3390/ijerph17041285, PMID 32079265. Camargo JBB et al. 2026, J Appl Physiol 141(2):477-493, doi 10.1152/japplphysiol.00284.2026, PMID 42461790 [RCT (within-subject legs) · resistance-trained men and women · n=25 · 8 wk].
- **Retag:** Barsuhn 2025 and Scarpelli 2022 → "reviewed — consistent (individual prior volume)". Grade: no change.

### R8. T8 Exercise selection. Stability part: **Decided by Hoang (via Luxanna), 2026-10-29.**
**Decision:** keep "prefer stable exercises" in the One-line answer and (b). Put Saeterbakken 2019 in the research notes with an honest grade. Unstable exercises stay in the catalog.

**Already applied by Silas** (evidence.md md5 9ea587a8…):
- (b) keeps "*prefer stable ones*" and adds "*Less stable variations also build muscle and are fine to keep in a programme.*"
- The research notes record the decision and the catalog rule.
- The topic grade is "*Limited — … the one direct training trial found similar muscle growth at every stability level.*"

**Grade for the "prefer stable" advice:** **Theoretical** for muscle growth, i.e. practical reasoning that no growth trial supports. Its support is acute force data. *(Behm 2002 and Anderson & Behm 2004 are now verified; see the Behm check below.)* The topic grade stays **Limited**.

**Behm check (v3, verified this session):** both cited studies are acute, men only, and measured no muscle growth.
- Behm 2002 (JSCR 16(3):416-22, PMID 12173956; no DOI): n=8 men, single session. Seated on a Swiss ball, isometric leg-extension force was 70.5% lower and plantar-flexion force 20.2% lower, and quadriceps activation was 44.3% lower.
- Anderson & Behm 2004 (JSCR 18(3):637-40, PMID 15320684): n=10 men, chest press on a ball vs a bench. Isometric force was 59.6% lower, with no significant EMG difference.
- This matches Silas's description (n=8 and n=10, men, acute). "Theoretical" for growth stands, because the support is reduced force (less load to overload with), not growth data.

**Exact delta still to apply:**
- **(d) Current:** "*The one direct training trial (Saeterbakken 2019) found similar muscle growth across stability levels; that disagreement is unresolved and under review.*"
- **(d) New:** "*The one direct training trial (Saeterbakken 2019) found similar muscle growth across stability levels, so the preference for stable exercises is a practical default for loading and safety, not a growth rule (grade for this advice: Theoretical).*"
- **Research notes Current:** "*Saeterbakken 2019 stays tagged contradicting — under review.*"
- **Research notes New:** "*Saeterbakken 2019 (PLoS ONE 14(4):e0214302, PubMed 30934001): Smith-machine, free-weight and wobble-board squat training gave similar muscle-thickness gains. Retagged 'reviewed — kept as practical default by Hoang's decision (Oct 29, 2026)'. Evidence grade for the 'prefer stable' advice: Theoretical for growth (supported only by acute force tests and reasoning); topic grade stays Limited. Unstable exercises stay in the catalog.*"
- **(c) tag:** Saeterbakken 2019 "contradicting — under review" → "reviewed — practical default kept (Hoang, Oct 29, 2026)".

**Non-stability parts of R8 (still open; Silas/Stirner, no Hoang decision needed):**
- **(a) Current, first sentence:** "*When in doubt, prefer exercises that challenge the muscle where it's stretched and let you push close to failure safely.*"
- **(a) New:** "*Prefer exercises that let you push close to failure safely; for some muscles, such as the hamstrings and triceps, versions that challenge the stretched position grew more, while for the glutes, side delts and quads on the leg press, trials found no difference.*"
- **(a) Current, last sentence:** "*A systematic review found that some planned exercise variation may help different regions of a muscle grow, while constant random rotation may hold gains back.*"
- **(a) New:** "*Planned variation and keeping the same exercises built similar overall muscle in recent trials, and rotating exercises at random every session added no growth.*"
- **(d):** add Plotkin 2023 (Front Physiol 14:1279170, doi 10.3389/fphys.2023.1279170, PMID 37877099). Its correction exists (doi 10.3389/fphys.2026.1987823); I did not verify the correction's content.
- **Retag:** Kassiano 2025 → "reviewed — consistent with 'variation optional'".

### R9. T9 Progression (amended v3)
*v3 change: Scarpelli 2025 added (batch 5); Nóbrega 2023 optional.*
- **(d):** after "*how much progression adds is unresolved and under review*", add "*In that trial the constant-load sets drifted from about 1.5 to about 4 reps in reserve, so the benefit of progression may come mainly from keeping sets close to failure.*"
- **(d), add (v3):** "*Individual responses may depend on the progression type: in a within-person trial in untrained legs (Scarpelli 2025), about a third of participants grew more with rep progression, about a fifth with load progression, and about a third the same; double progression uses both.*"
- **(a):** optionally add "*Without progression, the same weight gets easier and sets end further from failure, so each set delivers less tension.*"
- **Optional (d), v3:** "*Adjusting load to stay in a rep-max zone gave more growth than fixed %1RM loads in one small trial in untrained men (Nóbrega 2023).*"
- **Cite:** Scarpelli MC, Bergamasco JGA, Godwin JS, et al. 2025, Eur J Appl Physiol 125(11):3323-3340, doi 10.1007/s00421-025-05817-y, PMID 40500534 [RCT (within-subject legs) · untrained · n=37 · 10 wk · reviewed — consistent (individual variation)]. Optional: Nóbrega SR et al. 2023, J Strength Cond Res 37(1):62-67, PMID 36515591 [RCT · untrained men · n=24 · 24 sessions].
- **Retag:** Ferrari 2026 → "reviewed — consistent (effort drift)". Grade: no change (Moderate). Severity: minor.

### R10. T10 Weekly sets (amended v3)
*v3 change: Camargo 2026 (trained, +120% vs +20%) and Radaelli 2015 (untrained, 5 > 3 > 1 sets) added (batch 5).*
- **(b) Current:** "*…add sets gradually while performance keeps improving…*"
- **(b) New:** "*…start from the weekly sets you already do and add sets gradually only while performance keeps improving…*"
- **(d) Current:** "*Individual trials in trained people are mixed: Schoenfeld 2019 and Brigatto 2022 found benefits, Aube 2022, Heaselgrave 2019 and Enes 2024 found no significant differences; this disagreement is unresolved and under review.*"
- **(d) New:** "*Individual trials in trained people are mixed: Schoenfeld 2019 and Brigatto 2022 found benefits, Aube 2022, Heaselgrave 2019 and Enes 2024 found no significant differences, and a large jump above lifters' usual volume (+120% vs +20%) gave similar growth to a modest one (Camargo 2026). The null trials are consistent with a plateau, with gains levelling off somewhere in the range tested. In untrained people over 6 months, 5 sets per exercise grew arm muscles more than 3 or 1 (Radaelli 2015).*"
- **(d), indirect sets.** Current: "*this is unresolved and under review*" (Gentil/Mannarino). New: "*the ½ weighting sits between them*".
- **Grade:** no change (Moderate; "trials in trained lifters are mixed" already covers Camargo).
- **Cite:** Camargo 2026 (PMID 42461790), as in R5. Radaelli R et al. 2015, J Strength Cond Res 29(5):1349-58, doi 10.1519/JSC.0000000000000758, PMID 25546444 (already cited in T5; tag as there).
- **Retag:** Heaselgrave 2019, Aube 2022, Enes 2024 and Gentil 2015 → "reviewed — consistent with diminishing returns / ½ weighting". Camargo 2026 → "reviewed — consistent with plateau". Severity: minor.
- **Not adding:** La Scala Teixeira 2018 (Clin Physiol Funct Imaging 38(5):727-732, PMID 29024332) is a narrative review finding ≥3 sets not clearly better than <3 for upper-body growth in untrained people. It predates the meta-analyses already cited; research note at most.

### R11. T11 Substitution (amended v3)
*v3 change: Kassiano 2025 added to the variation sentence; Heidel 2022 added as a second equipment meta-analysis; Barbalho 2021 kept out (batch 5).*
- **(a) Current:** "*Mixing a few exercises for a muscle helped some regions grow, while rotating exercises at random every session did not add growth, though it improved motivation.*"
- **(a) New:** "*Mixing a few exercises for a muscle helped some regions grow in some trials but not in a 2025 trial in 70 women, while rotating exercises at random every session did not add growth, though it improved motivation.*"
- **(d) Current:** "*Trials disagree on whether varying exercises helps: Fonseca 2014 and Costa 2021 found more sites grew with variation, while Baz-Valle 2019 (random variation) found similar growth and Costa 2022 found a small isometric-strength edge for fixed exercises; this is unresolved and under review.*"
- **(d) New:** "*Trials disagree on whether varying exercises helps: Fonseca 2014 and Costa 2021 found more sites grew with variation, while Kassiano 2025 (70 women) and Baz-Valle 2019 (random variation) found similar growth, and Costa 2022's difference was in isometric strength only. For overall growth, varied and fixed selection performed similarly.*"
- **(d), equipment:** "*Moderate that equipment type (free weight, machine, cable) makes little difference to overall growth*" → add "*(two meta-analyses, including Heidel 2022: hypertrophy ES −0.01, wide CI)*".
- **Cite:** Heidel KA, Novak ZJ, Dankel SJ 2022, J Sports Med Phys Fitness 62(8):1061-1070, doi 10.23736/S0022-4707.21.12929-9, PMID 34609100 [meta-analysis · free weights vs machines · strength specific to test mode; hypertrophy similar]. Kassiano 2025 (already cited in T8).
- **Retag:** Costa 2022 → "reviewed — strength only (isometric); not a growth conflict". Baz-Valle 2019 → "reviewed — consistent with (a)". Grade: no change. Severity: minor.
- **Barbalho 2021 (Int J Sports Med 42(4):371-376, PMID 32252103):** not cited in evidence.md, so nothing to remove. It is not retracted (PubMed type RCT, no Crossref update). However, PubMed links an erratum (PMID 33733437) whose title is a correction for an unrelated ultratrail paper, and the same group has retracted papers (Barbalho 2019 MSSE is already excluded). Keep it out as a precaution. Optional research note: "*Barbalho 2021 (multi- vs single-joint, trained women) not cited: unclear erratum link and same group's retractions.*"

### R12. T12 Per-session limits (amended v3)
*v3 change: Camargo 2026 and Radaelli 2015 added to the "point the other way" list (batch 5). Zaroni 2019 cross-linked to T4 (R17).*
- **(d):** add "*A meta-regression linked more sets per workout to slightly smaller whole-body gains (Benito 2020), supporting a soft warning but not a number.*"
- **(d) Current:** "*Some findings point the other way: very frequent full-body training beat a once-weekly split in one trial (Zaroni 2019), 5 sets per exercise in a session still outgrew 1 set (Schoenfeld 2019), and the acute protein-synthesis (Kumar 2012) and signalling (Terzis 2010) data disagree; these are unresolved and under review.*"
- **(d) New:** "*Some findings point the other way: very frequent full-body training beat a once-weekly split in one trial (Zaroni 2019), 5 sets per exercise in a session still outgrew 1 set (Schoenfeld 2019) and outgrew 3 sets in untrained people over 6 months (Radaelli 2015), and in trained lifters a sudden +120% rise in weekly volume did not reduce growth compared with +20% (Camargo 2026). The acute protein-synthesis (Kumar 2012) and signalling (Terzis 2010) data disagree and are not used in app copy. Together these support a soft warning, not a cap.*"
- **(a):** no change. "*very long sessions may cost more than they return*" rests on perceived recovery (the 21-set trial). Camargo measured growth, not session length, so it does not contradict it.
- **Cite:** Benito 2020 (PMID 32079265), Camargo 2026 (PMID 42461790), Radaelli 2015 (PMID 25546444).
- **Retag:** Zaroni 2019 → "reviewed — volume matching not stated in abstract; see T4". Schoenfeld 2019, Radaelli 2015 and Camargo 2026 → "reviewed — compatible with soft warning". Kumar 2012 and Terzis 2010 → "reviewed — acute markers; not for app copy".
- **One-line and grade:** no change (Limited). Severity: minor.

### R13a. T13a Experience (unchanged from v2)
- **(d) Current:** "*A sex-differences meta-analysis (Refalo 2025) found its results were not influenced by training experience; how that bears on growth rate by experience is unresolved and under review.*"
- **(d) New:** delete the sentence. Refalo 2025's "not influenced by training experience" refers to the male–female comparison, so it is not a conflict.
- **(d):** also change "*Evidence that RIR accuracy improves with experience is mixed.*" → "*Years of experience show little effect on RIR accuracy, but practice with feedback improves it (Topic 14).*"
- **Retag:** remove "contradicting" from Refalo 2025 in 13a. Grade: no change.

### R13c. T13c Equipment (amended v3)
*v3 change: Heidel 2022 and Wei 2023 added (batch 5).*
- **(a) Current:** "*…but a very light 20% 1RM load grew less than heavier loads in a trial that matched volume load, so minimal-equipment plans need sets that stay challenging.*"
- **(a) New:** "*…but one trial found a very light 20% 1RM load grew less than heavier loads with volume load matched (a meta-analysis of volume-matched studies found no clear difference), so minimal-equipment plans need sets that stay challenging.*"
- **(a), first sentence:** "*Free weights and machines produced similar muscle growth in a meta-analysis*" → "*…in two meta-analyses*".
- **(d) Current:** "*Weak for bands and bodyweight specifically: band evidence is strength-only, and the push-up hypertrophy trial is small (n=18). A 4-week progressive push-up trial (Kotarsky 2018) found no significant muscle-thickness change with either push-ups or bench press; this is unresolved and under review.*"
- **(d) New:** "*Weak for bands and bodyweight specifically: band evidence is strength-only, the push-up hypertrophy trial is small (n=18), and a 6-week trial in 13 sedentary women found progressive bodyweight leg training and barbell squats grew muscle similarly (Wei 2023). A 4-week push-up trial (Kotarsky 2018) found no thickness change in either group, which is too short to inform growth.*"
- **Cite:** Carvalho 2022 (PMID 35015560, already in T3). Heidel 2022 (PMID 34609100), as in R11. Wei W, Zhu J, Ren S, et al. 2023, Sci Rep 13(1):13505, doi 10.1038/s41598-023-40319-x, PMID 37598268 [RCT · sedentary young women · n=13 · 6 wk · reviewed — consistent, very small].
- **Retag:** Kotarsky 2018 → "reviewed — uninformative (4 wk)". Grade: no change (Moderate). Severity: minor.

### R14. T14 RIR accuracy (amended v3)
*v3 change: Hackett 2017 and Zourdos 2021 added (batch 5). Hughes 2020 is retracted and not cited (checked).*
- **(a):** after "*…one large study found a tendency toward better accuracy with more experience.*", add "*Practice helps more than years of lifting: in two newer trials, estimates improved over a few sessions that included sets taken to failure.*"
- **(d) Current:** "*Mixed on whether experience improves accuracy: one large study suggests it does, the meta-analysis and several newer trials find no clear effect; this disagreement is unresolved and under review.*"
- **(d) New:** "*Years of experience show little effect (the meta-analysis, a study of 81 adults (Hackett 2017) and several newer trials; one large study found only a tendency, Steele 2017), but repeated practice with feedback from failure improved accuracy in two trials (Wiedenmann 2026; Hermann 2025), while one small trial in trained lifters found no change (Remmert 2023). Errors grow with distance from failure and with longer sets: about 1 rep when 0–5 reps were left vs more than 2 when 7–10 were left (Hackett 2017), and in 16-rep squat sets trained men were off by about 2, 3.7 and 5.2 reps when they called 1, 3 and 5 RIR (Zourdos 2021).*"
- **Research note:** Steele 2017's SEM of 2.64–3.38 reps describes spread, not mean error. It does not contradict "about one to two" on average, but individual guesses can be off by more, especially in long sets. Hughes 2020 (J Strength Cond Res, PMID 33337690) is **retracted** (notice J Strength Cond Res 2021;35(3):585, PMID 33470601, doi 10.1519/JSC.0000000000003977) and must not be cited; evidence.md does not cite it. Mansfield 2020 (PMID 32881842; not retracted) is consistent: accuracy improved over sets 1–3, and knowing the load made no difference. Optional only.
- **(b):** no change. "*within about one to two reps*" holds for typical sets of 12 or fewer; (a) already says accuracy is better in those.
- **Product option (Hoang):** an occasional calibration set to failure on a safe machine or isolation exercise.
- **Cite:** Wiedenmann T et al. 2026, BMC Sports Sci Med Rehabil 18(1):375, doi 10.1186/s13102-026-01997-y, PMID 42632893. Hackett DA, Cobley SP, Davies TB, et al. 2017, J Strength Cond Res 31(8):2162-2168, doi 10.1519/JSC.0000000000001683, PMID 27787474 [cross-sectional · men and women, mixed experience · n=81 · single session]. Zourdos MC, Goldsmith JA, Helms ER, et al. 2021, J Strength Cond Res 35(Suppl 1):S158-S165, doi 10.1519/JSC.0000000000002995, PMID 30747900 [cross-sectional · trained men · n=25 · single session].
- **Retag:** Steele 2017 → "reviewed — tendency only; SEM ≠ mean error". Grade: no change (Moderate). Severity: moderate (from v2), unchanged by v3.

### R15. T15 Deloads (amended v3)
*v3 change: Hoang's decision is now in evidence.md (deloads optional, about every 8 weeks ≈ 2 months, as a product choice). My v2 One-line rewrite is **withdrawn**, because it is superseded by Hoang's One-line. Halonen 2024 and Psilander 2019 go in the research notes and grade only. No change to the advice.*
- **One-line, (a), (b):** no change (Hoang's decision).
- **Grade Current:** "*Limited — only one trial in trained lifters (a full week off, not a reduced week), the other trials are in untrained men, and no trial has tested deload timing; …*"
- **Grade New:** "*Limited — only one trial in trained lifters (a full week off, not a reduced week), the other trials are in untrained people, and no trial has tested deload timing; …*" (rest unchanged). Halonen 2024 included women, so "untrained men" is no longer exact once it is cited.
- **Research notes, add:** "*Halonen 2024 (Scand J Med Sci Sports 34(10):e14739, PubMed 39364857; 42 untrained adults, 45% women): 10 weeks training, 10 weeks off, 10 weeks retraining ended with similar strength and muscle size to 20 weeks of continuous training; size and strength lost during the break returned quickly on retraining. Psilander 2019 (J Appl Physiol 126(6):1636-1645, PubMed 30991013; 9 men and 10 women): after 10 weeks of one-leg training, 20 weeks off returned muscle thickness to baseline while strength stayed elevated, and the previously trained leg did not respond better on retraining. Both are long breaks in untrained people, not deloads. They support 'occasional breaks are not costly once training resumes' but say nothing about deload timing; the ~8-week interval remains a Carlsen product choice.*"
- **(d), optional:** after "*Strength losses grow with longer breaks (Bosquet 2013)…*", add "*Small trials in trained men found strength held after 2 weeks off (Hwang 2017) or rose after a few days off (Pritchard 2018).*"
- **Cite:** Halonen EJ, Gabriel I, Kelahaara MM, et al. 2024, doi 10.1111/sms.14739, PMID 39364857 [RCT · untrained adults · n=42 completers · 30 wk · reviewed — consistent (breaks recovered)]. Psilander N, Eftestøl E, Cumming KT, et al. 2019, doi 10.1152/japplphysiol.00917.2018, PMID 30991013 [within-subject legs · men and women · n=19 · 35 wk · context (detraining/retraining)]. Hwang 2017 (PMID 28328712) and Pritchard 2018 (PMID 29369954) as in v2.
- **Retag:** Bosquet 2013 → "context (strength loss after full cessation; pre-2015, mixed populations)" (Stirner's wording, which I accept over my v2 wording). Severity: minor.

### R16. T13b Session length: drop sets (new in v3)
- **(b) Current:** "*For short sessions, prioritise multi-joint exercises, pair non-competing exercises as supersets and keep warm-ups to exercise-specific ramp-up sets…*"
- **(b) New:** "*For short sessions, prioritise multi-joint exercises, pair non-competing exercises as supersets or use drop sets on isolation exercises, and keep warm-ups to exercise-specific ramp-up sets…*"
- **(d), add:** "*A meta-analysis of drop sets (Sødal 2023; 6 studies, 142 participants) found similar hypertrophy to traditional sets, with some drop-set formats taking a half to a third of the time.*"
- **Cite:** Sødal LK, Kristiansen E, Larsen S, et al. 2023, Sports Med Open 9(1):66, doi 10.1186/s40798-023-00620-5, PMID 37523092 [systematic review + meta-analysis · mixed · k=6 (5 pooled), n=142 · varied · reviewed — consistent].
- **Grade:** no change (Moderate). Severity: minor (additive, strengthens the claim). Tension framing: drop sets keep each set close to failure while cutting rest time.

### R17. T4 Frequency: Zaroni 2019 cross-link (new in v3)
- R4 is **applied** (verified in evidence.md md5 c0ffa049).
- **(d) Current:** "*Individual trials sometimes favour higher frequency (Schoenfeld 2015) or lower frequency (Lasevicius 2019, Yue 2018); these single small trials point both ways…*"
- **(d) New:** "*Individual trials sometimes favour higher frequency (Schoenfeld 2015; Zaroni 2019, 5× vs 1× per week in trained men) or lower frequency (Lasevicius 2019, Yue 2018); these single small trials point both ways…*"
- **Research note:** "*Zaroni 2019 (n=18 trained men, 8 wk): TOTAL (5×/wk) gave greater elbow-flexor and vastus lateralis thickness gains than SPLIT (1×/wk), with similar strength. The abstract does not state that weekly volume was matched (Stirner reads it as volume-equated; I could not confirm this from the abstract).*"
- **Cite:** Zaroni RS et al. 2019, J Strength Cond Res 33(Suppl 1):S140-S151, doi 10.1519/JSC.0000000000002643, PMID 31260419 (already cited in T12; add to T4 citations) [RCT · well-trained men · n=18 · 8 wk · reviewed — consistent with negligible pooled effect].
- **Grade:** no change (Strong). Severity: minor.

### R18. T3 / T7 / T10: no copy change (v3 notes only)
- Mangine 2015 is under R3 (research note). Vendruscolo 2025 is under R7 (research note).
- **Kinoshita 2026** (MSSE 58(7):1566-1580, PMID 41630124, already cited in T8): optional cross-reference in T10 (a). Leg press grew the rectus femoris by +1.1% vs +13.2% with knee extension, with similar vasti and whole-quadriceps growth. This supports T10's "add a direct exercise for… rectus femoris". No conflict.

### Not changing
- **T6:** R6, no change needed (Hoang decision).
- **T13b:** Zhang 2025 is already cited; the only v3 addition is R16.

---
# Batch 4: Silas (contradictions-for-vinci.md, 36 entries plus the T6 rest section)

**Verification:** I checked all 36 entries and the 11 T6-section papers on PubMed esummary (authors, year, journal, volume, pages, DOI) and read the abstracts.
- Every PMID and DOI matches.
- PubMed lists no retractions or errata for them.
- Vasconcelos 2026 (Muscles 5(3):61, doi 10.3390/muscles5030061, PMID 42784046; and J Strength Cond Res 40(10):1205-1213, doi 10.1519/JSC.0000000000005494, PMID 42617172), now cited in evidence.md T2, also verified: n=19 trained, within-subject, 8 wk; failure ≈ 1–3 RIR.

**Where Silas's note needed correcting** (the rest of his summaries match the abstracts):
1. **Schoenfeld 2016 frequency (27102172).** Silas says it was "mostly not volume-equated". The abstract's conclusion says "on a volume-equated basis". This is a factual error, and it is repeated in evidence.md T4 (d). Fix: R4.
2. **Varovic 2025 (40911904).** "Similar" overstates it: 75% of the posterior is outside the ROPE and pd is 87%, so the result is inconclusive, not equivalent (R7).
3. **Gschneidner 2025 (41055237).** Correct that equivalence was not confirmed. The authors nonetheless conclude the effects are "small and practically equivalent", and overall growth was small. My v1 said "practically equivalent" without that caveat; corrected below.
4. **Refalo 2025 (40028215).** "Not influenced by training experience" refers to the sex comparison, so this is a false conflict with 13a (same conclusion as Emrys I3.4).
5. **Steele 2017 (29204323).** The SEM of 2.64–3.38 reps is a spread measure, not the average error, so it does not contradict "about one to two" on average.
6. **Saeterbakken 2019 (30934001).** Accurately described. I could not confirm n=59 from the abstract text I retrieved, so I don't quote n.
7. **Costa 2022 (35481889).** Strength only. It is not a hypertrophy conflict for T11.
8. **Kotarsky 2018 (29466268).** Neither group changed muscle thickness in 4 weeks, so it is uninformative rather than contradicting.
9. **Bosquet 2013 (23347054).** Pre-2015 and about detraining strength across mostly longer breaks. Fine as context.
10. **Martorelli 2017 (28713535).** Accurate. Note that the abstract reports within-group significance for muscle thickness, not a between-group test.

| Silas entry (PMID) | Verified | Merged into | My verdict |
|---|---|---|---|
| Andersen 2024 (34100789) | ✓ JSCR 38(3):e135-e142; n=10 trained, within-leg, 9 wk, 15% vs 30% VL, volume matched | T1 / R1 | complicating, minor |
| Terada 2022 (35622108) | ✓ JSCR 36(6):1576-81; n=27, bench 40% 1RM failure vs 20% VL, equal work, 8 wk | T1 / R1 | complicating, minor |
| Grgic 2022 (33497853) | ✓ (verified in v1 work) | T2 / R2 | consistent with non-linear |
| Hermann 2025 (40249908) | ✓ MSSE 57(9):2021-31; n=42 trained | T2 / R2 | single-set nuance |
| Martorelli 2017 (28713535) | ✓ EJTM 27(2):6339; n=89 women, 10 wk; MT RF +17.5%, RNFV +8.5% (both sig. within-group), RNF +2.1% ns at 10 wk (+3.9% at 5 wk) *(corrected v3)* | T2 / R2 | volume confound |
| Hammert 2026 (42319300) | ✓ MSSE ahead of print; n=201 untrained, 6 wk | T3 / R3 | minor |
| Lasevicius 2018 (29564973) | ✓ EJSS 18(6):772-80; n=30 | T3, T13c / R3, R13c | single trial vs meta |
| Schoenfeld 2016 freq (27102172) | ✓ Sports Med 46(11):1689-97; **volume-equated per abstract** | T4 / R4 | Silas note wrong |
| Schoenfeld 2015 (25932981) | ✓ JSCR 29(7):1821-9; n=20 well-trained | T4 / R4 | consistent |
| Lasevicius 2019 (31531139) | ✓ J Hum Kinet 68:135-43; 36 randomised, 28 completed, 10 wk; ES favoured 2×/wk, ns | T4 / R4 | consistent |
| Yue 2018 (29216446) | ✓ APNM 43(5):475-81; n=18, 6 wk; within-group only | T4 / R4 | consistent |
| Barsuhn 2025 (39665246) | ✓ J Appl Physiol 138(1):259-69; 29 completers, 8 wk; no MT/FFM difference; CON best 1RM | T5, T10 / R5, R10 | consistent (prior volume) |
| Scarpelli 2022 (32108724) | ✓ JSCR 36(4):1153-7; n=16 trained | T5, T10 / R5, R10 | consistent (prior volume) |
| Villanueva 2015 (25294666) | ✓ EJAP 115(2):295-308; n=22 older men | T6 / R6 | population mismatch |
| Wolf 2025 (39959841) | ✓ PeerJ 13:e18904; n=30 trained | T7 / R7 | supports "not better" |
| Gschneidner 2025 (41055237) | ✓ J Sports Sci 43(23):2963-76; n=297 | T7 / R7 | supports "not better" |
| Plotkin 2026 (42841600) | ✓ MSSE ahead of print (7 Oct 2026); n=16 trained + 8 acute; VL mCSA −1.4 cm² (−6.1 to 3.8) | T7 / R7 | supports "not better" |
| Larsen 2025 leg press (40113586) | ✓ J Sports Sci 43(10):986-94; n=23 trained | T7, T8 / R7, R8 | supports narrowing |
| Varovic 2025 (40911904) | ✓ APNM 50:1-14; n=23 trained, 6 wk | T7 / R7 | inconclusive (not "similar") |
| Kassiano 2025 (39388663) | ✓ RQES 96(2):371-81; n=70 young women (38 vs 32), 10 wk; MT +7.8–17.7% vs +7.5–19.3% | T8 / R8 | variation optional |
| Saeterbakken 2019 (30934001) | ✓ PLoS ONE 14(4):e0214302; similar MT across stability | T8 / R8 | "prefer stable" not growth-based |
| Ferrari 2026 (42880344) | ✓ IJSM ahead of print; n=31 untrained | T9 / R9 | effort drift |
| Heaselgrave 2019 (30160627) | ✓ | T10 / R10 | plateau |
| Aube 2022 (32058362) | ✓ | T10 / R10 | plateau |
| Enes 2024 (37796222) | ✓ | T10 / R10 | plateau |
| Gentil 2015 (26446291) | ✓ | T10 / R10 (I1.3) | keep ½ |
| Costa 2022 (35481889) | ✓ JSCR 36(11):3032-9; n=23; isometric KE +12% vs +7% | T11 / R11 | strength only |
| Baz-Valle 2019 (31881066) | ✓ (v1) | T11 / R11 | consistent |
| Zaroni 2019 (31260419) | ✓ (v1) | T12 / R12 | volume unclear |
| Schoenfeld 2019 volume (30153194) | ✓ (v1) | T12 / R12 | compatible |
| Kumar 2012 (22859389) | ✓ | T12 / R12 (I3.2) | acute |
| Terzis 2010 (20617335) | ✓ | T12 / R12 (I3.2) | acute |
| Refalo 2025 (40028215) | ✓ | T13a / R13a (I3.4) | false conflict |
| Kotarsky 2018 (29466268) | ✓ JSCR 32(3):651-9; n=23, 4 wk | T13c / R13c | uninformative |
| Steele 2017 (29204323) | ✓ | T14 / R14 (I3.3) | tendency; SEM ≠ mean error |
| Bosquet 2013 (23347054) | ✓ SJMSS 23(3):e140-9; 103 studies | T15 / R15 | context |
| **T6 section:** Schoenfeld 2016 rest (26605807), Buresh 2009 (19077743), Longo 2022 (35622106), Grgic 2018 (28933024), McMahon 2024 (38953795), Singer 2024 (39205815), Grgic 2017 (28641044), Ahtiainen 2005 (16095405), de Souza 2010 (20543741), Souza-Junior 2011 (22032491), Fink 2017 (27984843) | ✓ all (journal / volume / pages / DOI match). Key numbers re-checked: Buresh arm CSA +12.3% vs +5.1%, n=12 untrained; Ahtiainen 2 vs 5 min similar, n=13; de Souza CSA arm 13.8 vs 14.5%, thigh 16.6 vs 16.3%; Fink triceps 9.8 vs 10.6%, thigh 5.7 vs 8.3%; Grgic 2018 >2 min for strength in trained lifters | T6 / R6 | see PRIORITY A |

# Batch 5: Stirner, T9–T15 audit ("Missed contradictions", qa-v2-topics-9-15.md)
Everything was verified by me this session via PubMed esummary and efetch abstracts (plus Crossref for Barbalho). I re-read evidence.md at md5 c0ffa049 (~18:33 Helsinki, UTC+2): T9–T14 app-facing text is unchanged since 18:13; T15 now carries Hoang's deload decision.

| Paper (PMID) | Verified facts (abstract) | Topic | Why it differs / verdict | Severity | → R |
|---|---|---|---|---|---|
| Scarpelli 2025 (40500534) | EJAP 125(11):3323-40; n=37 untrained, within-subject legs, 10 wk; rep vs load progression. ~34% grew more with reps, ~19% with load, ~35% same, 5 non-responders | T9 | Not a conflict: individual variation, not a group difference. Double progression combines both | minor | R9 |
| Nóbrega 2023 (36515591) | JSCR 37(1):62-67; n=24 untrained men; RM-zone > %1RM for CSA, more volume-load progression | T9 | Supports performance-based progression; optional | minor | R9 (opt.) |
| Camargo 2026 (42461790) | J Appl Physiol 141(2):477-93; n=25 trained men and women, within-subject, 8 wk; +120% vs +20% over habitual weekly volume: mCSA rose in both, no interaction; no fCSA effect | T10/T12/T5 | Consistent with Barsuhn: above habitual volume, growth plateaus. No harm from the large jump; also no gain | minor | R5, R10, R12 |
| Radaelli 2015 (25546444) | JSCR 29(5):1349-58; untrained men, n=48, 6 months; 5 sets > 3 and 1 for elbow-flexor and extensor MT | T10/T12 | Untrained and long-term; already cited in T3/T5/13a/13c but not in T10/T12. Consistent dose-response | minor | R10, R12 |
| La Scala Teixeira 2018 (29024332) | Clin Physiol Funct Imaging 38(5):727-32; narrative review: ≥3 sets not clearly better than <3 (untrained, upper body) | T10 | Older narrative review, superseded by meta-analyses; do not add to copy | minor | R10 note |
| Kassiano 2025 (39388663) | RQES 96(2):371-81; 70 young women, 10 wk; varied vs constant exercises: similar hypertrophy | T11 | Conflicts with T11 (a) "helped some regions grow"; the difference is study design (Fonseca/Costa 2021 vs Kassiano). Soften (a) | minor | R11 |
| Barbalho 2021 (32252103) | IJSM 42(4):371-6; 30 trained women, 6 months; MJ and MJ+SJ > SJ for glutes, quads, pecs | T11 | **Not cited** in evidence.md. Not retracted (PubMed RCT, no Crossref update); PubMed's linked erratum (33733437) is titled as a correction for an unrelated paper. Same group's 2019 MSSE paper is retracted. Keep out | — | R11 note |
| Heidel 2022 (34609100) | JSMPF 62(8):1061-70; meta-analysis; hypertrophy ES −0.01 (CI −0.525, 0.545); strength specific to the test device | T11/13c | Supports "equipment makes little difference"; a second meta-analysis | minor | R11, R13c |
| Kinoshita 2026 (41630124) | MSSE 58(7):1566-80; leg press vs knee extension: rectus femoris +1.1% vs +13.2%; vasti and whole QF similar | T10 (T8) | Supports T10's "direct exercise for rectus femoris". Already cited in T8 | — | R18 |
| Sødal 2023 (37523092) | Sports Med Open 9(1):66; 6 studies, 142 participants; drop sets ≈ traditional (SMD 0.155, p=0.392); some formats took ½–⅓ of the time | 13b | Supports and extends 13b (time-efficient option) | minor | R16 (new) |
| Wei 2023 (37598268) | Sci Rep 13(1):13505; 13 sedentary women, 6 wk; progressive bodyweight vs barbell squat: similar MT | 13c | Supports bodyweight; very small | minor | R13c |
| Hackett 2017 (27787474) | JSCR 31(8):2162-8; n=81; error ~1 rep at 0–5 reps from failure vs >2 at 7–10; experience did not affect accuracy | T14 | Supports "better near failure" and "experience made little difference" | minor | R14 |
| Zourdos 2021 (30747900) | JSCR 35(S1):S158-65; 25 trained men, squat at 70% to failure (~16 reps); error 2.05 / 3.65 / 5.15 reps at 1 / 3 / 5 RIR calls; more reps → larger error | T14 | Supports "better near failure, in sets of ≤12". Shows errors over 2 reps in long sets | minor | R14 |
| Mansfield 2020 (32881842) | JSCR; n=20; load knowledge did not change accuracy; accuracy improved over sets 1–3 | T14 | Consistent; optional | — | R14 note |
| Hughes 2020 (33337690) | **Retracted** (PubMed "Retracted Publication"; notice PMID 33470601, JSCR 2021;35(3):585) | T14 | **Not cited** in evidence.md (grep: no Hughes, no PMID). Do not cite | — | R14 note |
| Halonen 2024 (39364857) | SJMSS 34(10):e14739; 42 untrained adults; 10 wk training + 10 off + 10 retraining ≈ 20 wk continuous at the end; losses regained quickly | T15 | Consistent with "optional"; a long break, not a deload | minor | R15 (notes and grade only) |
| Psilander 2019 (30991013) | J Appl Physiol 126(6):1636-45; 9 men and 10 women; 20 wk off returned MT to baseline, strength stayed elevated; no extra retraining response in the previously trained leg | T15 | Context: long detraining. Does not bear on deload timing | minor | R15 (notes only) |

**Optional Behm check:** done, see R8. Both studies are acute and in men (n=8, n=10), and neither measured growth.
**Major items in batch 5:** none. Under Hoang's decisions, no batch-5 item changes advice. T15 changes are notes and grade only, as instructed.

---
# Batch 6: Stirner, T1–T8 audit (qa-report-v2.md) and verdicts on R1–R5
Verified by me via PubMed esummary and efetch abstracts this session. qa-report-v2.md (18:30) was read but not edited.

| Paper (PMID) | Verified facts (abstract) | Topic | Why it differs / verdict | Severity | → R |
|---|---|---|---|---|---|
| Zaroni 2019 (31260419) | JSCR 33(S1):S140-51; 18 well-trained men, 8 wk; 5×/wk whole-body > 1×/wk split for elbow-flexor and VL thickness; strength similar | T4 (also T12) | One small trial favouring high frequency. It fits the "single trials point both ways" sentence. The abstract does not state volume matching | minor | R17 (new) |
| Mangine 2015 (26272733) | Physiol Rep 3(8):e12472; 29 trained men, 8 wk; 4×3–5 @ ~90%, 3-min rest vs 4×10–12 @ ~70%, 1-min rest; DXA lean arm mass +5.2% vs +2.2%; bench 1RM greater | T3 | Heavy beat moderate, but rest (3 vs 1 min) and volume load differed, and failure was not stated. Not a clean load test, so the 5–30 rep claim is unaffected | minor | R3 (note) |
| Vendruscolo 2025 (39449136) | Sports Health 17(5):1036-43; 21 trained men, 3 wk, 30% 1RM with vascular occlusion; long vs short elbow-flexor length: similar MRI CSA at 45/65/85% | T7 | Light occluded loads over 3 weeks are far from T7's loaded-stretch trials. Does not overturn the muscle-specific claim | minor | R7 (note) |
| Larsen 2025, Front Psychol (39995432) | Front Psychol 16:1494323; 23 untrained men, within-subject, 10 wk; calf raises with partials past failure: +9.6% vs +6.7% medial gastrocnemius (BF 13.3) | T7 | Conflicts with Goli 2026 at face value. The designs differ: Larsen added partials on top of the same sets (more total work), while Goli matched volume load with half the sets. In tension terms, the extra partials add work. Makes the (d) "only one small trial" sentence factually wrong | moderate (factual) | R7 (amended v3) |
| Myrholt 2023 (36754062) | IJSPP 18(4):368-77; 16 strength-trained (7 women), 6 wk, similar volume; higher velocity loss gave more VL thickness (6 ± 6% group difference, P<.05); 1RM and DXA similar | T1 | A volume-matched trial that favoured more velocity loss, so the matched-volume evidence is mixed, not null. Erratum 36805934 (units) changes no data | minor | R1 (amended v3) |
| Martorelli 2017 (28713535) | Re-read: 10-wk MT RF +17.5%, RNFV +8.5% (both significant), RNF +2.1% (not significant; +3.9% was the 5-wk value); within-group tests only | T2 | My v2 R2 phrase was wrong; corrected. evidence.md already uses +2.1% (verified) | minor | R2 (amended v3) |

**Stirner's R-verdicts, folded in:**
- **R1:** modify, done (Myrholt; his exact (a) text adopted).
- **R2:** modify, done (his Martorelli phrase and Vieira parenthetical adopted).
- **R3:** tweak, done (Hammert "slightly" removed, his wording adopted).
- **R5:** tweak, done ("did not identify a specific ceiling").
- **R4:** applied (verified). **R7:** applied, plus the v3 amendment.
- **Also fixed in this file:** the batch-4 table's Martorelli row said "RNF +3.9% ns"; it now gives the 10-wk value.
- **Gschneidner (Stirner):** "previously trained (preprint)". I have not opened the preprint, so I accept his reading but have not verified it myself. The abstract's "estimated muscle CSA" wording is consistent with his circumference/skinfold note.

---
# Resolution ledger per source agent

- **Laurent, batch 1 (exercises.json):** all 13 PMIDs verified.
  - I1.1 (lateral raises) → T8/R8.
  - I1.2 (curl shoulder angle) → T11 nuance, optional.
  - I1.3 (Gentil vs Mannarino) → T10/R10, merged with Emrys and Silas.
  - I1.4 (partials) → T7/R7, merged with Emrys and Silas.
  - I1.5 (leg-press depth) → T7/T8, merged with Silas (Larsen 2025).
  - I1.6 (Plotkin 2023 + correction) → T8/R8.
  - Exercise notes table below (unchanged from v1).
- **Laurent, batch 2 (topics 1–8):**
  - I2.1 → T3/T13c (R3, R13c), merged with Silas (Lasevicius 2018).
  - I2.2 → T2/R2, merged with Emrys and Silas.
  - I2.3 → T4/R4: the self-contradiction was already fixed at 18:13, but a new factual error was introduced (R4).
  - I2.4 → T6/PRIORITY A.
  - I2.5 → T8/R8, merged with Silas (Kassiano 2025).
  - I2.6 → T5/T12 (R5, R12).
- **Emrys, batch 3:**
  - T2, T4, T6, T7 and T10/11 items → merged as in v1 (I2.2, I2.3, I2.4, I1.4, I1.3), now also with Silas.
  - I3.1 → T10/R10.
  - I3.2 → T12/R12.
  - I3.3 → T14/R14.
  - I3.4 → T13a/R13a (false conflict).
- **Silas, batch 4:** all 36 entries plus the T6 section are mapped in the table above.
  - Corrections to his notes: 1–10 above.
  - Answers to his three T6 questions are in PRIORITY A, points 2, 5 and 6.
  - His blocked T7 copy is answered by PRIORITY B / R7.
- **Stirner, batch 5 (qa-v2-topics-9-15.md, "Missed contradictions", 18 items):** all verified.
  - Scarpelli 2025, Nóbrega 2023 → R9.
  - Camargo 2026 → R5, R10, R12. Radaelli 2015 → R10, R12. La Scala Teixeira 2018 → R10 note.
  - Kassiano 2025, Heidel 2022 → R11. Barbalho 2021: not cited, keep out.
  - Heidel 2022, Wei 2023 → R13c. Sødal 2023 → R16. Kinoshita 2026 → R18.
  - Hackett 2017, Zourdos 2021, Mansfield 2020 → R14. Hughes 2020: retracted, not cited.
  - Halonen 2024, Psilander 2019 → R15 (notes and grade only).
  - Ghobadi 2022 (EJSS 22(10):1543-54, PMID 34346831; recreationally active males, 8 wk): skeletal muscle mass rose similarly with both progression methods, and the strength difference is strength only. Consistent with T9; no change.
- **Stirner, batch 6 (qa-report-v2.md):**
  - Zaroni 2019 → R17. Mangine 2015 → R3 note. Vendruscolo 2025 → R7 note. Larsen 2025 (Front Psychol) → R7 (amended v3).
  - R1–R5 verdicts folded in (R1, R2, R3 and R5 amended v3; R4 applied).
  - The Behm and Anderson check is under R8.
- **Vinci's own search:** papers now cited in evidence.md (no longer "new"):
  - Nóbrega 2018, Santanielo 2020, Hermann 2025, Hammert 2026, Cumming 2025;
  - Carvalho 2022, Schoenfeld 2015, Gomes 2019, Saric 2019, Scarpelli 2022;
  - Grgic 2017, Villanueva 2015, Wolf 2025, Gschneidner 2025, Pedrosa 2023;
  - Larsen 2025, Kobayashi 2026, Ferrari 2026, Zhang 2025.
- **Still not cited, and proposed in R1–R15:**
  - Jenkins 2015, Colosio 2026 (R1);
  - Vieira 2021 (R2);
  - Benito 2020 (R5, R12);
  - Senna 2016 (R6);
  - Pallarés 2021 (R7);
  - Plotkin 2023 (R8);
  - Wiedenmann 2026 (R14);
  - Hwang 2017, Pritchard 2018 (R15).
- **Still not cited, and optional (not proposed for app copy):**
  - Lees 2025, Bartolomei 2021, Zabaleta-Korta 2023 (removed from T8 on purpose earlier; T7 context only);
  - Augustin 2025, Damas 2019, Angleri 2022, Hickmott 2024, Droguett 2026, Attarieh 2025.

---

> **Note on the v1 detail below (Parts A and B):** the paper-level evidence below is still valid, and every citation was verified. However, the "Claim"/"Current wording" quotes and the "Recommended change" lines in it were written against the **pre-18:13** evidence.md. Where they differ from the Recommendations above (R1–R15), **the R items win.** In particular, v1's T6 quotes ("same longer rest benefits every exercise", "Rest 2–3 minutes … on every exercise") no longer exist in evidence.md. I also corrected one v1 line: Gschneidner 2025 is described as "practically equivalent" by its authors, but formal equivalence was not shown.

# Part A (v1 detail). Contradiction search by topic (in evidence.md order; quotes are pre-18:13)

## 1. Mechanical tension, fiber recruitment and "effective reps"
**Claim:** Near failure, all motor units are recruited whatever the load, so light and heavy sets taken close to failure give a similar tension stimulus.

- **Jenkins NDM, Housh TJ, Bergstrom HC, et al. (2015).** *Muscle activation during three sets to failure at 80 vs. 30% 1RM resistance exercise.* Eur J Appl Physiol 115(11):2335-47. doi:10.1007/s00421-015-3214-9, PMID 26159316.
  - **Finding:** EMG amplitude stayed higher at 80% than at 30% 1RM across all reps and sets.
  - **Strength:** Acute crossover, n=18 trained (9 men, 9 women), leg extension, surface EMG only. Comment letters were published in response.
- **Colosio AL, D'hoe B, Bourgois JG, et al. (2026).** *Minimum load threshold in resistance training: insights into muscle metabolism, excitation, and fatigue across the repetition continuum.* PeerJ 14:e20909. doi:10.7717/peerj.20909, PMID 41841121.
  - **Finding:** EMG at exhaustion rose with load and did not converge across loads. At 10% 1RM, subjects did not reach failure. The "critical load" was about 32% 1RM.
  - **Strength:** Acute, n=12, leg extension. No growth outcome.
- **Nóbrega SR, Ugrinowitsch C, Pintanel L, et al. (2018).** *Effect of Resistance Training to Muscle Failure vs. Volitional Interruption at High- and Low-Intensities on Muscle Mass and Strength.* J Strength Cond Res 32(1):162-169. doi:10.1519/JSC.0000000000001787, PMID 29189407.
  - **Finding:** Stopping by choice ("volitional interruption") grew muscle as much as going to failure, at both high and low loads (CSA +6.1–7.5%). EMG was higher with the high load.
  - **Strength:** Within-subject RCT, n=32 untrained men, 12 wk, ultrasound CSA.
- **Why these differ from the cited papers:**
  - Morton 2019 (PMID 31294822; n=10 recreationally trained) measured fiber-type **glycogen depletion** and found it similar regardless of load. It also found that EMG did not track fiber activation. The two kinds of study use different markers.
  - Pareja-Blanco 2017 (PMID 27038416; n=22 young men, squat, 8 wk, MRI plus biopsies) found that 40% velocity loss grew vastus lateralis and intermedius more than 20% velocity loss. The 40% group also did more volume.
  - The Nóbrega abstract does not report RIR at volitional interruption.
- **Change advice?** No. That light and heavy loads build similar muscle rests on long-term trials (Topic 3), not on EMG. Nóbrega weakens a strict "only the last ~5 reps count" reading.
- **Severity:** minor.
- **Recommended change:** Keep the current (d) framing ("effective reps" is "a theoretical model") and the grade. Add: "*EMG studies (Jenkins 2015; Colosio 2026) find heavier loads keep higher surface EMG even at failure, so it is not settled that light loads recruit equally; the case that they grow muscle equally comes from long-term trials (Topic 3).*" No change to app copy.

## 2. Proximity to failure and RIR
**Claim:** Hypertrophy rises as RIR falls, but true failure on every set doesn't clearly beat stopping a rep or two short.

- **Vieira AF, Umpierre D, Teodoro JL, et al. (2021).** *Effects of Resistance Training Performed to Failure or Not to Failure on Muscle Strength, Hypertrophy, and Power Output: A Systematic Review With Meta-Analysis.* J Strength Cond Res 35(4):1165-1175. doi:10.1519/JSC.0000000000003936, PMID 33555822.
  - **Finding:** Failure beat non-failure for hypertrophy overall (SMD 0.75, p=0.005), but there was **no difference when volume was equated**. Non-failure was better for strength and power when volume was not equated.
  - **Strength:** Meta-analysis, 13 studies.
- **Santanielo N, Nóbrega SR, Scarpelli MC, et al. (2020).** *Effect of resistance training to muscle failure vs non-failure on strength, hypertrophy and muscle architecture in trained individuals.* Biol Sport 37(4):333-341. doi:10.5114/biolsport.2020.96317, PMID 33343066.
  - **Finding:** Vastus lateralis CSA grew similarly: +13.5% with failure, +18.1% without.
  - **Strength:** Within-subject, n=14 trained, 10 wk, ultrasound.
- **Hermann T, Mohan AE, Enes A, et al. (2025).** *Without Fail: Muscular Adaptations in Single-Set Resistance Training Performed to Failure or with Repetitions-in-Reserve.* Med Sci Sports Exerc 57(9):2021-2031. doi:10.1249/MSS.0000000000003728, PMID 40249908.
  - **Finding:** With **one set** of each of 9 exercises, twice a week, hypertrophy tended to favour failure over 2 RIR, though only modestly. Strength gains were similar.
  - **Strength:** RCT, n=42 trained, 8 wk.
- **Nóbrega 2018:** see Topic 1.
- **Already in evidence.md, so not counted as new:** Refalo 2024 (J Sports Sci, PMID 38393985), which is named in Topic 14's notes.
- **Why these differ from the cited papers:** Whether volume was equated is the main moderator. When failure wins, the failure condition usually did more volume or ended closer to failure. Single-set training is the case where each set's proximity to failure matters most. This fits Lasevicius 2022 and Robinson 2024 (see I2.2).
- **Change advice?** Nuance. Keep 0–2 RIR. For plans with one set per exercise, taking the last set to failure on safe exercises is reasonable.
- **Severity:** minor.
- **Recommended change:** Add to (a): "*When you do only one set per exercise, taking it to failure may add a little growth.*" Add Hermann 2025 and Vieira 2021 to (c). Keep (d) at "Moderate".

## 3. Load and rep range
**Claim:** Growth is "*similar … across roughly 5 to 30 reps … Most people do best in the middle of the range.*"

- **Hammert WB, Yamada Y, Sallberg RW, et al. (2026).** *High- and Low-Load Resistance Training Produce Distinct Skeletal Muscle Growth but Similar Changes in Tendon Morphology.* Med Sci Sports Exerc (online ahead of print, 22 Jun 2026). doi:10.1249/MSS.0000000000004052, PMID 42319300.
  - **Finding:** Elbow flexion to failure at 20–30RM increased muscle thickness **more** than at 8–12RM.
  - **Strength:** RCT, n=201 untrained, 6 wk, ultrasound.
- **Cumming KT, Elvatun IC, Kalenius R, et al. (2025).** *Divergent strength gains but similar hypertrophy after low-load and high-load resistance exercise training in trained individuals: many roads lead to Rome.* J Appl Physiol 139(3):685-697. doi:10.1152/japplphysiol.00353.2025, PMID 40827709.
  - **Finding:** 3–5RM and 20–25RM to failure grew muscle thickness by a similar ~7–8%. Fiber CSA did not change. The heavy load gave a larger single-joint 1RM gain.
  - **Strength:** Within-subject, n=14 trained, 9 wk.
- **Lees MJ, Mcleod JC, Morton RW, et al. (2025).** *Resistance training load does not determine resistance training-induced hypertrophy across upper and lower limbs in healthy young males.* J Physiol (online 31 Dec 2025). doi:10.1113/JP289684, PMID 41474371.
  - **Finding:** 8–12 and 20–25 reps produced the same growth. Differences between individuals were large and driven by intrinsic factors.
  - **Strength:** Within-subject, n=20, 10 wk.
- **Why these differ from the cited meta-analyses:** On equivalence, they don't. Schoenfeld 2017 (21 studies, all sets to failure) and Lopez 2021 (28 studies, n=747) both found similar growth across loads. Hammert is the first large trial to suggest a light-load advantage, but it was short (6 wk), in untrained people, and measured by ultrasound only.
- **Change advice?** No. The 6–12 and 10–20 rep defaults are practical choices within the supported range.
- **Severity:** minor.
- **Recommended change:** Keep (d) at "Strong". After "*Very low loads (<~30% 1RM) are less well studied*", add: "*Recent trials found 3–5RM ≈ 20–25RM in trained lifters (Cumming 2025), and one large 6-week trial in untrained people found 20–30RM grew slightly more than 8–12RM (Hammert 2026).*"

## 4. Frequency and split
**Claim:** "*If total weekly hard sets are the same, training a muscle once, twice, or three times a week builds similar muscle.*"

- **Schoenfeld BJ, Ratamess NA, Peterson MD, et al. (2015).** *Influence of Resistance Training Frequency on Muscular Adaptations in Well-Trained Men.* J Strength Cond Res 29(7):1821-9. doi:10.1519/JSC.0000000000000970, PMID 25932981.
  - **Finding:** Training each muscle 3×/wk (total body) grew the forearm flexors more than a 1×/wk split.
  - **Strength:** RCT, n=20 well-trained men, 8 wk, ultrasound.
- **Gomes GK, Franco CM, Nunes PRP, et al. (2019).** *High-Frequency Resistance Training Is Not More Effective Than Low-Frequency Resistance Training in Increasing Muscle Mass and Strength in Well-Trained Men.* J Strength Cond Res 33(Suppl 1):S130-S139. doi:10.1519/JSC.0000000000002559, PMID 29489727.
  - **Finding:** 1× and 5×/wk with sets equated (10–15/wk) produced similar results.
  - **Strength:** n=23 men averaging 6.9 years of training, 8 wk, **DXA**.
- **Bartolomei S, Nigro F, Malagoli Lanzoni I, et al. (2021).** *A Comparison Between Total Body and Split Routine Resistance Training Programs in Trained Men.* J Strength Cond Res 35(6):1520-1526. doi:10.1519/JSC.0000000000003573, PMID 32168178.
  - **Finding:** The split routine grew vastus lateralis thickness more. Total body gave larger gains on some strength measures.
  - **Strength:** RCT, n=21 trained, 10 wk.
- **Saric J, Lisica D, Orlic I, et al. (2019).** *Resistance Training Frequencies of 3 and 6 Times Per Week Produce Similar Muscular Adaptations in Resistance-Trained Men.* J Strength Cond Res 33(Suppl 1):S122-S129. doi:10.1519/JSC.0000000000002909, PMID 30363041.
  - **Finding:** Similar results with volume equated.
  - **Strength:** n=27 trained, 6 wk.
- **Why these differ:** All are small (n=20–27), short (6–10 wk) single trials, measured with different tools (one- or two-site ultrasound vs DXA). Gomes and Saric state volume was equated; Schoenfeld 2015's abstract does not. Taken together they are consistent with Schoenfeld 2019 and Pelland 2026.
- **Change advice?** No.
- **Severity:** minor. For the (d) wording, see I2.3.

## 5. Volume per session
**Claim (b):** "*about 2–4 hard sets per exercise and roughly 3–8 hard sets per muscle per session*". (d): "*No verified peer-reviewed study was found that pins down a per-session ceiling.*"

- **Benito PJ, Cupeiro R, Ramos-Campo DJ, et al. (2020).** *A Systematic Review with Meta-Analysis of the Effect of Resistance Training on Whole-Body Muscle Growth in Healthy Adult Males.* Int J Environ Res Public Health 17(4):1285. doi:10.3390/ijerph17041285, PMID 32079265.
  - **Finding:** Sets per workout was the only training variable that explained the variance in gains, and its effect was **negative** (−0.03, p=0.04). The authors conclude that "excessive sets per workout" reduce gains.
  - **Strength:** Meta-regression of 111 studies, n=1,927 men.
  - **Limits:** It measured **whole-body** lean mass (fat-free, lean or skeletal muscle mass) and compared across studies rather than within them. It counted sets per *workout*, not per muscle, and found no threshold.
- **Hermann 2025 (Topic 2):** single sets per exercise were productive in trained lifters.
- **Why these differ from Pelland 2026 and Schoenfeld 2017:** Those analyses counted **weekly sets per muscle** with site-specific measures and found a positive slope with diminishing returns. Both findings can be true at once: weekly volume for a muscle helps, while very long sessions may lose quality.
- **Change advice?** Nuance. This supports a soft per-session warning but not any specific number.
- **Severity:** moderate. For the recommended change, see I2.6.
## 6. Rest intervals
**Claim:**
- (a): "*Isolation sets taken close to failure are just as demanding as big compound sets, so the same longer rest benefits every exercise.*"
- (b): "*Rest 2–3 minutes between sets on every exercise, isolation work included. The longer rest is beneficial because…*"
- (d): "Moderate to weak."

**Papers:**
- **Senna GW, Willardson JM, Scudese E, et al. (2016).** *Effect of Different Interset Rest Intervals on Performance of Single and Multijoint Exercises With Near-Maximal Loads.* J Strength Cond Res 30(3):710-6. doi:10.1519/JSC.0000000000001142, PMID 26907842.
  - **Finding:** On the machine chest fly, reps were maintained with **2 min** of rest. Bench press needed **3–5 min**. Single-joint exercises recover faster.
  - **Strength:** Acute study, n=15 trained men, 3RM loads, no growth outcome.
- **Grgic J, Lazinica B, Mikulic P, et al. (2017).** *The effects of short versus long inter-set rest intervals in resistance training on measures of muscle hypertrophy: A systematic review.* Eur J Sport Sci 17(8):983-993. doi:10.1080/17461391.2017.1340524, PMID 28641044.
  - **Finding:** Short and long rest both produce growth. Long rest may help trained people when measured with sensitive methods.
  - **Strength:** Systematic review of 6 studies, no pooled analysis.
- **Villanueva MG, Lane CJ, Schroeder ET (2015).** *Short rest interval lengths between sets optimally enhance body composition and performance with 8 weeks of strength resistance training in older men.* Eur J Appl Physiol 115(2):295-308. doi:10.1007/s00421-014-3014-7, PMID 25294666.
  - **Finding:** 60 s of rest gained more lean body mass than 4 min.
  - **Strength:** n=22 older men, 8 wk, DXA. Not representative of Carlsen users.

**Why they differ from Schoenfeld 2016 (PMID 26605807):**
- That trial had n=21 trained men, 8 wk, 3 total-body sessions a week of 3×8–12RM on 7 exercises, measured by ultrasound. Three-minute rest beat one-minute for the anterior thigh, with a trend for the triceps.
- Volume load was not matched. Longer rest preserves volume load (see Longo 2022 under I2.4).
- Senna shows that isolation exercises recover their volume load sooner. So the volume-load mechanism predicts that isolation needs *less* rest, not the same rest.

**Change advice?** Nuance. The 2–3 min default is Hoang's product decision and costs nothing in growth. But the reason the app gives for applying it to isolation work is not supported.

**Severity:** moderate. Route to Hoang via Luxanna.

**Recommended change:**
- **(a):** "*Longer rest helps you repeat your weight and reps, so each set keeps delivering high tension. The growth benefit levels off around 90 seconds to 2 minutes. Big compound lifts usually need the longer end; isolation exercises recover faster.*"
- **(b):** Keep "2–3 min" if Hoang wants it, but drop "*The longer rest is beneficial because…*" for isolation, or say "*about 2 minutes is plenty for most isolation work.*"
- **(d):** Keep "Moderate to weak". Add Senna 2016 and Grgic 2017.

## 7. Long muscle lengths and lengthened partials
**Claim:**
- (a): "*Partial reps in the stretched part of the range grew muscle about as well as full reps, and in a few small studies better.*"
- (d): "*Moderate and growing … small, short trials.*"

**Papers:**
- **Gschneidner D, Carlson L, Steele J, et al. (2025).** *The effects of lengthened-partial range of motion resistance training of the limbs on arm and thigh muscle area: A multi-site randomised trial.* J Sports Sci 43(23):2963-2976. doi:10.1080/02640414.2025.2567805, PMID 41055237.
  - **Finding:** Interaction estimates were near zero (arm −0.032, thigh 0). The authors call the effects "small and practically equivalent", but equivalence was not formally shown at the adjusted α=0.005 (equivalence p=0.071 arm, p=0.019 thigh). *(Corrected in v2.)*
  - **Strength:** Pre-registered cluster RCT at 15 sites, **n=297** (163 partial vs 134 full ROM), 12 wk.
- **Wolf M, Androulakis Korakakis P, Piñero A, et al. (2025).** *Lengthened partial repetitions elicit similar muscular adaptations as full range of motion repetitions during resistance training in trained individuals.* PeerJ 13:e18904. doi:10.7717/peerj.18904, PMID 39959841.
  - **Finding:** Upper-body muscle thickness changes were similar (BF 0.16–0.3, favouring "no difference").
  - **Strength:** Within-subject, n=30 trained, 8 wk.
- **Pallarés JG, Hernández-Belmonte A, Martínez-Cava A, et al. (2021).** *Effects of range of motion on resistance training adaptations: A systematic review and meta-analysis.* Scand J Med Sci Sports 31(10):1866-1881. doi:10.1111/sms.14006, PMID 34170576.
  - **Finding:** Full ROM beat partial ROM for strength (ES 0.56) and for lower-limb hypertrophy.
  - **Strength:** 16 studies, pooling all types of partial.
- **Zabaleta-Korta A, Fernández-Peña E, Torres-Unda J, et al. (2023).** *Regional Hypertrophy: The Effect of Exercises at Long and Short Muscle Lengths in Recreationally Trained Women.* J Hum Kinet 87:259-270. doi:10.5114/jhk/163561, PMID 37559762.
  - **Finding:** **Incline curls**, which train the biceps at long length, produced no significant growth at any site. Preacher curls grew the biceps at the 70% site.
  - **Strength:** n=38 recreationally trained women, 9 wk, ultrasound.
  - **Note:** evidence.md's changelog shows this paper was removed from T8 on purpose. I log it here only as a contradiction to T7.
- **Augustin F, Piñero A, Enes A, et al. (2025).** *Do Cheaters Prosper? Effect of Externally Supplied Momentum During Resistance Training on Measures of Upper Body Muscle Hypertrophy.* Int J Exerc Sci 18(3):329-342. doi:10.70252/GDBL2230, PMID 40191387.
  - **Finding:** "Cheat" reps and strict reps gave similar growth.
  - **Strength:** Within-subject, n=30, 8 wk.
  - **Advice:** Nuance. Keep "control at the bottom" for safety and to keep tension on the target muscle. This trial found no growth penalty for cheating.

**Why they differ from Maeo 2021/2023, Pedrosa 2022 and Kassiano 2023:**
- The positive trials are small or looked at a single muscle: Maeo n=20–21 by MRI; Pedrosa n=45 untrained women, knee extension; Kassiano n=42 women, calves.
- The null trials are larger (n=297), include trained lifters (n=30), or cover several sites.
- Regional effects can appear where whole-muscle size doesn't change.
- See also I1.4.

**Change advice?** Nuance. Keep "challenge the stretched position" and keep partials optional. Stop implying that partials beat full ROM.

**Severity:** moderate.

**Recommended change:**
- **(a):** "*…and in a few small studies better*" → "*…and the two largest trials found no meaningful difference.*"
- **(d):** Add Gschneidner 2025, Wolf 2025, Pallarés 2021 and Zabaleta-Korta 2023.
- **Grade:** "Moderate and growing" → "**Moderate for long-length loading of hamstrings and triceps; low-to-moderate and mixed for partials and other muscles.**"

## 8. Exercise selection
**Claim:**
- (a): "*prefer exercises that challenge the muscle where it's stretched … constant random rotation may hold gains back.*"
- (d): "*Weakest topic, and largely mechanistic.*"

**Papers:**
- **Plotkin DL, Rodas MA, Vigotsky AD, et al. (2023).** *Hip thrust and back squat training elicit similar gluteus muscle hypertrophy and transfer similarly to the deadlift.* Front Physiol 14:1279170. doi:10.3389/fphys.2023.1279170, PMID 37877099. A correction (doi:10.3389/fphys.2026.1987823) was published 28 Oct 2026; see I1.6.
  - **Finding:** Glute growth was similar between the hip thrust (hardest where the glutes are short) and the squat. Squats grew the quads more. Hamstrings and glute medius barely grew. Higher hip-thrust EMG did not predict growth.
  - **Strength:** RCT in untrained people (hip thrust n=18 vs squat n=16), 9 wk, **MRI**.
- **Larsen 2025, leg-press depth (PMID 40113586):** deeper knee flexion did not grow the quads more. See I1.5.
- **Larsen 2025, lateral raises (PMID 40692697):** already cited in evidence.md. Dumbbell and cable raises grew the side delts equally. See I1.1.
- **Stability:** none found.

**Why they differ from Maeo 2021/2023:** Maeo changed joint position (seated vs lying leg curl; overhead vs neutral triceps extension), which puts a two-joint muscle at a longer length. Plotkin and the two Larsen trials changed the resistance curve or the depth within one movement. The stretch benefit looks specific to certain muscles and exercises.

**Change advice?** Nuance. Prefer stretched-position loading where it has been shown to help (hamstrings: seated curl; triceps: overhead). Elsewhere, pick what the user can progress.

**Severity:** moderate.

**Recommended change:**
- **(a):** "*When in doubt, prefer exercises that challenge the muscle where it's stretched…*" → "*For some muscles, such as the hamstrings and triceps, loading the stretched position grew more muscle. For others (glutes, side delts, and quads in the leg press), trials found no difference, so pick what you can progress.*"
- Also apply the I2.5 change on random rotation.
- **Grade:** Keep "Weakest topic". Add Plotkin 2023 and Larsen 2025 (leg press).

## 9. Progressive overload
**Claim:** Progressing beats repeating the same load. Use double progression with an RIR check.

**Papers:**
- **Ferrari O, Silva DG, Camargo JBB, et al. (2026).** *Time course of muscle hypertrophy with and without progressive overload.* Int J Sports Med (online ahead of print, 15 Oct 2026). doi:10.1055/a-2980-6473, PMID 42880344.
  - **Finding:** There was no between-protocol difference at any single time point. Only the change from session 18 to 24 favoured progression (1.22 cm²). In the leg that did not progress, **RIR drifted from 1.5 to 4.08**.
  - **Strength:** Within-subject, n=31 untrained, knee extension, 12 wk.

**Why it differs from Kassiano 2026 (PMID 41718594), where progression about doubled triceps growth:** It uses a different muscle and model. Ferrari shows that without progression, sets end further from failure, so each set delivers less tension, and the growth gap opened only late. Both papers point the same way; they differ in how big the effect is and when it appears.

**Change advice?** No. This supports RIR-gated double progression.

**Severity:** minor.

**Recommended change:** Add to (a): "*Without progression, the same weight gets easier and your sets end further from failure, so each set delivers less tension.*" Keep the grade at "Moderate".

## 10. Weekly hard sets per muscle
**Claim (b):** Increase weekly sets gradually.

**Papers:**
- **Scarpelli MC, Nóbrega SR, Santanielo N, et al. (2022).** *Muscle Hypertrophy Response Is Affected by Previous Resistance Training Volume in Trained Individuals.* J Strength Cond Res 36(4):1153-1157. doi:10.1519/JSC.0000000000003558, PMID 32108724.
  - **Finding:** A leg trained at 1.2× the person's own logged weekly sets gained more vastus lateralis CSA than a leg on a standardised prescription (ES 0.75).
  - **Strength:** Within-subject, n=16 trained, 8 wk.
  - **App copy:** don't quote the comparison group's set count.
- **Damas F, Angleri V, Phillips SM, et al. (2019).** *Myofibrillar protein synthesis and muscle hypertrophy individualized responses to systematically changing resistance training variables in trained young men.* J Appl Physiol 127(3):806-815. doi:10.1152/japplphysiol.00350.2019, PMID 31268828.
  - **Finding:** A varied programme with more total volume grew CSA no more than the standard one. Variability between people was about 40× greater than variability within a person.
  - **Strength:** Within-subject, n=20 trained, 8 wk.

**Why they differ from Pelland 2026 / Schoenfeld 2019:** The meta-regressions describe the average dose-response. Individual response depends on the person and on their recent training volume.

**Change advice?** Nuance: start from the user's logged volume.

**Severity:** minor.

**Recommended change:**
- **(b):** "*…add sets gradually*" → "*…start from the sets you currently do and add a few at a time (in one trial, about 20% more than a lifter's usual volume beat a standard prescription) while performance keeps improving.*"
- Keep the grade. See also I3.1.

## 11. Exercise substitution
**None found that contradicts it.**
- Plotkin 2023 supports the existing "strength is exercise-specific" note.
- **Angleri V, Damas F, Phillips SM, et al. (2022)**, Scand J Med Sci Sports 32(5):821-832, doi:10.1111/sms.14134, PMID 35092084 (n=20 trained): manipulating training variables mattered less than intrinsic biology. This is consistent with "variation adds nothing".

**Recommended change:** None. The I1.2 nuance is optional.

## 12. Per-session limits
**Claim:**
- One-line answer: "*No study has pinned down a per-session set limit; splitting … is a cautious default.*"
- (d): "Weak."

**Papers:**
- **Benito 2020 (Topic 5):** excessive sets per workout were linked to smaller whole-body gains.
- **Gomes 2019 (Topic 4):** 10–15 weekly sets done in **one** session matched 5×/wk in well-trained men.
- **Bartolomei 2021 (Topic 4):** the split (more sets per muscle per session) grew vastus lateralis more.

**Why they differ from Zaroni 2019 (PMID 31260419):** Zaroni favoured 5× over 1× a week, but its abstract does not say volume was matched. Gomes matched sets and measured with DXA. Brigatto 2019 found no difference between 16 sets in one session and 16 split over two. At moderate session volumes, distribution matters little. Benito hints at a cost at the extreme.

**Change advice?** No. A soft warning is still the right approach.

**Severity:** moderate (wording). For the recommended change, see I2.6.

## 13a. Experience level
**None found.** No strong 2015–2026 paper contradicts "trained lifters grow more slowly". Benito 2020 found that no participant variable explained variance in gains, but its abstract doesn't name training status, so I don't count it.

**No change.** Emrys's items on this topic are I3.3 and I3.4.

## 13b. Session length
**Claim (d):** "*Superset … evidence is mostly acute or short-term.*"

**Papers:**
- **Zhang X, Weakley J, Li H, et al. (2025).** *Superset Versus Traditional Resistance Training Prescriptions: A Systematic Review and Meta-analysis Exploring Acute and Chronic Effects on Mechanical, Metabolic, and Perceptual Variables.* Sports Med 55(4):953-975. doi:10.1007/s40279-025-02176-8, PMID 39903375.
  - **Finding:** Supersets shortened sessions and gave **similar long-term hypertrophy and strength**, with higher perceived effort. Agonist–antagonist pairs maintained volume load; same-muscle pairs reduced it.
  - **Strength:** 19 studies, n=313.

This strengthens the claim.

**Severity:** minor.

**Recommended change:**
- **(d):** → "*A 2025 meta-analysis (19 studies) found similar long-term growth and strength with supersets; pairing exercises for the same muscle reduced volume load, so pair non-competing exercises.*"
- **Grade:** upgrade the superset grade from weak to **moderate**.

## 13c. Equipment
**Claim (a):** "*…a very light 20% 1RM load grew less than heavier loads in a volume-matched trial, so minimal-equipment plans need sets that stay challenging.*"

**Papers:**
- **Carvalho L, Junior RM, Barreira J, et al. (2022).** *Muscle hypertrophy and strength gains after resistance training with different volume-matched loads: a systematic review and meta-analysis.* Appl Physiol Nutr Metab 47(4):357-368. doi:10.1139/apnm-2021-0515, PMID 35015560.
  - **Finding:** With volume matched, hypertrophy did not differ between very low (<30% 1RM or >35RM), low, moderate and high loads. Heavier loads won for strength.
  - **Strength:** Systematic review and meta-analysis.
- **Hammert 2026 (Topic 3)** points the same way.

**Why they differ from Lasevicius 2018 (PMID 29564973):**
- Lasevicius: n=30 men, within-subject, 12 wk. CSA rose 8.9% (vastus lateralis) and 11.4% (elbow flexors) at 20% 1RM, versus 19.5% and 25% at 80%.
- Only the 20% condition was described as going to failure. The other limbs did sets adjusted to match its volume load.
- It is a single trial against pooled data, and 20% sits below the roughly 30% critical load (Colosio 2026).

**Change advice?** No. "Keep sets challenging" still stands.

**Severity:** moderate. A single-trial finding is currently stated as settled.

**Recommended change:**
- **(a):** "*…a very light 20% 1RM load grew less than heavier loads in a volume-matched trial*" → "*…one volume-matched trial found a very light load (20% 1RM) grew less, though a meta-analysis of volume-matched studies found no clear difference, so…*"
- Keep the grade. Add Carvalho 2022. See also I2.1.

## 14. RIR accuracy by experience
**Claim (a):** "*Training experience made little difference…*" The cited Remmert 2023b found accuracy did not improve over 6 weeks.

**Papers:**
- **Wiedenmann T, Kunellis D, Rappelt L, et al. (2026).** *Trainability of repetitions-in-reserve estimation in younger and older adults: a parallel-group repeated-measures study.* BMC Sports Sci Med Rehabil 18(1):375. doi:10.1186/s13102-026-01997-y, PMID 42632893.
  - **Finding:** Mean absolute error **fell by up to 2.3 reps** over 6 sessions. Age made no difference.
  - **Strength:** 13 younger and 13 older adults.
- **Hermann 2025 (Topic 2):** RIR estimates became more accurate over 8 weeks in trained lifters, especially on the bench press.
- **Hickmott LM, Butcher SJ, Chilibeck PD (2024).** *A Comparison of Subjective Estimations and Objective Velocities at Quantifying Proximity to Failure for the Bench Press in Resistance-Trained Men and Women.* J Strength Cond Res 38(7):1206-1212. doi:10.1519/JSC.0000000000004784, PMID 38595310.
  - **Finding:** Velocity profiles were more accurate than subjective estimates in early sets and at lower loads.
  - **Strength:** 18 men and 18 women, all trained.
- **Droguett FAB, Festa RR, Quintana NAT, et al. (2026).** *Objective Accuracy in Estimating Repetitions in Reserve in the Back Squat: An Analysis between Experienced vs. Novice Subjects.* J Hum Kinet 102:145-158. doi:10.5114/jhk/205218, PMID 42211811.
  - **Finding:** Experience did not affect accuracy. This **supports** the current claim.
  - **Strength:** n=16.

**Why they differ from Remmert 2023b (PMID 37436724):** Remmert's subjects were already trained and the sample was small, so there was less room to improve. Wiedenmann's protocol included sets to failure, which gives direct feedback. The pattern is that *practice* helps, while years of experience don't.

**Change advice?** Yes (nuance). Consider an occasional **calibration set** taken to failure on safe machine or isolation exercises. The RIR targets stay the same.

**Severity:** moderate.

**Recommended change:**
- **(a):** after "*Training experience made little difference…*", add "*…but practice helps: in two newer trials, estimates got better after a few sessions that included sets to failure.*"
- **(d):** add "*Years of experience show little effect; repeated practice with feedback from failure improved accuracy in two trials (Wiedenmann 2026; Hermann 2025), while one small trial found no improvement (Remmert 2023b).*"
- See also I3.3.

## 15. Deloads
**Claim (a):** "*a one-week break … led to similar muscle growth but smaller strength gains*".

**Papers:**
- **Hwang PS, Andre TL, McKinley-Barnard SK, et al. (2017).** *Resistance Training-Induced Elevations in Muscular Strength in Trained Men Are Maintained After 2 Weeks of Detraining and Not Differentially Affected by Whey Protein Supplementation.* J Strength Cond Res 31(4):869-881. doi:10.1519/JSC.0000000000001807, PMID 28328712.
  - **Finding:** Strength was maintained after 2 weeks off, and lean mass was retained.
  - **Strength:** n=20 trained men. A supplement study.
- **Pritchard HJ, Barnes MJ, Stewart RJC, et al. (2018).** *Short-Term Training Cessation as a Method of Tapering to Improve Maximal Strength.* J Strength Cond Res 32(2):458-465. doi:10.1519/JSC.0000000000001803, PMID 29369954.
  - **Finding:** 3.5 or 5.5 days off **increased** strength expression.
  - **Strength:** n=8 trained.

**Why they differ from Coleman 2024 (PMID 38274324):** Coleman had 39 trained men and women in a 9-week high-volume programme with a deload week at the **midpoint**, and tested strength at the end. Lower-body strength gains were smaller in the deload group. Hwang and Pritchard tested **right after** a short break.

**Change advice?** No.

**Severity:** minor.

**Recommended change:** (a) → "*…similar muscle growth but slightly smaller strength gains by the end of the programme; small trials found strength held or rose right after short breaks.*" Keep the grade.

---
# Part B (v1 detail). Incoming conflicts from other agents (batches 1–3; batch 4 is above)

## Batch 1: Laurent (exercises.json)
**PMID verification.** I opened every PMID on PubMed. **All 13 match Laurent's descriptions; none failed.**

| PMID | Paper | Journal / DOI |
|---|---|---|
| 40692697 | Larsen S, Wolf M, Schoenfeld BJ et al 2025, dumbbell vs cable lateral raises | Front Physiol 16:1611468, 10.3389/fphys.2025.1611468 |
| 42829982 | Kobayashi Y, Maeo S, Eihara Y et al 2026, incline vs preacher curls | J Sports Sci (online 4 Oct 2026), 10.1080/02640414.2026.2741751 |
| 41988507 | Larsen S, Sandvik Kristiansen B, Østerås Sandberg N et al 2026, shoulder angle in cable curls | Front Physiol 17:1750722, 10.3389/fphys.2026.1750722 |
| 40082069 | Attarieh P, Nunes JP, Khani S et al 2025, shoulder flexed vs extended | Eur J Sport Sci 25(4):e12279, 10.1002/ejsc.12279 |
| 26446291 | Gentil P, Soares S, Bottaro M 2015, single vs multi-joint | Asian J Sports Med 6(2):e24057, 10.5812/asjsm.24057 |
| 31268995 | Mannarino P, Matta T, Lima J et al 2021, row vs curl | J Strength Cond Res 35(10):2677-2681, 10.1519/JSC.0000000000003234 |
| 33977835 | Pedrosa GF, Lima FV, Schoenfeld BJ et al 2022, knee-extension partials | Eur J Sport Sci 22(8):1250-1260, 10.1080/17461391.2021.1927199 |
| 37015016 | Kassiano W, Costa B, Kunevaliki G et al 2023, calf partials | J Strength Cond Res 37(9):1746-1753, 10.1519/JSC.0000000000004460 |
| 36828324 | Pedrosa GF, Simões MG, Figueiredo MOC et al 2023, preacher-curl initial vs final ROM | Sports (Basel) 11(2):39, 10.3390/sports11020039 |
| 39959841 | Wolf M et al 2025, lengthened partials ≈ full ROM | PeerJ 13:e18904, 10.7717/peerj.18904 |
| 41055237 | Gschneidner D et al 2025, multi-site RCT | J Sports Sci 43(23):2963-2976, 10.1080/02640414.2025.2567805 |
| 40113586 | Larsen S, Wolf M, Schoenfeld BJ et al 2025, leg-press knee ROM | J Sports Sci 43(10):986-994, 10.1080/02640414.2025.2481534 |
| 37877099 | Plotkin DL et al 2023, hip thrust vs squat | Front Physiol 14:1279170 (2026 correction, see I1.6) |

**One correction to Laurent's framing:** Pedrosa 2023 compared **initial vs final** range of motion in the preacher curl and had **no full-ROM arm**. It supports "stretched half beats short half", not "partials beat full ROM". The size difference showed up at the 70% site only; summed CSA was not significant.

### I1.1 Lateral raises: Larsen 2025 vs topics 7/8 (source: Laurent)
- **Larsen 2025:** resistance-trained, n=24, within-subject, 8 weeks, 5 sets to failure twice a week, measured by ultrasound. Muscle thickness rose 3.3–4.6% in both arms. Bayes factors of 0.22–0.27 support no difference.
- **Maeo 2021/2023:** n=20–21, MRI.
- **Why they differ:** Larsen changed *where the resistance curve peaks* within the same range of motion. Maeo changed *joint position*, which lengthens the whole two-joint muscle. Side delts also lengthen less than the hamstrings or the long head of the triceps.
- **Severity:** moderate, as part of T8's overgeneralisation.
- **Resolved:** merged into the T8 rewrite.

### I1.2 Curl shoulder angle: Kobayashi 2026 vs Larsen 2026 / Attarieh 2025 (source: Laurent)
- **Kobayashi 2026:** n=21 untrained, 12 weeks, **MRI** volume of each muscle, incline vs preacher **dumbbell** curls.
  - Biceps grew +22.1% vs +18.9% (g 0.33).
  - Brachialis and brachioradialis favoured the preacher curl.
  - **Total elbow-flexor growth was similar:** +17.6% vs +19.2% (P=0.134).
- **Larsen 2026:** 30 untrained men (24 completed), 10 weeks, **cable** curls with resistance profile and range of motion matched. Shoulder angle had no effect; thickness rose about 7–9%.
- **Attarieh 2025:** 15 young men, within-subject, 10 weeks, cable preacher vs Bayesian curl with profiles matched. No difference: biceps 6–7% vs 9%, brachialis 10% vs 8%.
- **Why they differ:**
  - **Measurement:** MRI volume of each muscle vs ultrasound thickness.
  - **Confounding:** the dumbbell versions in Kobayashi also differ in resistance profile. The cable trials isolate shoulder angle.
  - **Agreement on totals:** Kobayashi's small biceps effect is offset by the other elbow flexors, so all three trials agree that total elbow-flexor growth is similar.
  - **Mixed evidence:** Zabaleta-Korta 2023 found that incline curls grew nothing, which points the other way.
- **Severity:** minor.
- **Recommended change:** add to T11 (a): "*…though one MRI study found incline curls grew the biceps slightly more and preacher curls the brachialis slightly more.*"

### I1.3 Indirect biceps work: Gentil 2015 vs Mannarino 2021 (sources: Laurent and Emrys, merged)
- **Gentil 2015:** between-subject, n=29 untrained, 10 weeks. Elbow-flexor thickness rose +6.10% with lat pulldowns vs +5.83% with curls.
- **Mannarino 2021:** **within-subject**, n=10 untrained, 8 weeks. It rose +5.16% with dumbbell rows vs +11.06% with curls.
- **Why they differ:**
  - **Exercise:** the pulldown loads the elbow through a long range. A row is usually limited by the back.
  - **Design:** between-subject n=29 cannot detect modest differences. Within-subject n=10 is more sensitive but tiny.
  - **Baseline:** curl growth itself differed between the trials (11% vs 6%).
- **Severity:** minor. Both results fall inside T10's "about ½ to about full" credit for indirect sets.
- **Recommended change:** none to the wording. For implementation, keep biceps at **0.5** for both pulldowns and rows. One untrained trial is not enough to raise pulldowns to 1.0.

### I1.4 Lengthened partials (sources: Laurent, plus Emrys's Wolf 2023 vs Pedrosa 2022 / Kassiano 2023, merged)
- **Wolf M, Androulakis-Korakakis P, Fisher J, Schoenfeld B, Steele J (2023).** *Partial Vs Full Range of Motion Resistance Training: A Systematic Review and Meta-Analysis.* Int J Strength Cond 3(1). doi:10.47206/ijsc.v3i1.182. Verified on Crossref; it has no PMID.
  - **Main model:** a trivial SMD of 0.12 (95% CI −0.02 to 0.26) favouring full ROM.
  - **Long-length partial subgroup:** −0.28 (95% CI −0.81 to 0.16) favouring partials. This estimate is uncertain.
- **Positive trials are small and mostly in untrained women:**
  - Pedrosa 2022: n=45.
  - Kassiano 2023: n=42.
  - Pedrosa 2023: n=19, with no full-ROM arm.
- **Null trials are large or in trained people:**
  - Gschneidner: n=297.
  - Wolf 2025: n=30, trained.
- **Wolf 2023's pooled estimate** is compatible with both sides once its confidence interval is considered. Full analysis in T7.
- **Severity:** moderate.
- **Resolved:** merged into the T7 rewrite.

### I1.5 Leg-press depth: Larsen 2025 (source: Laurent)
- **Larsen 2025:** n=23 trained (7.2 years), within-subject, 8 weeks, knee range ~5–100° vs 5–154°. No difference; Bayes factors of 0.14–0.22 support the null.
- **Why it differs from Pedrosa 2022:**
  - Pedrosa's long-length advantage came from the isolated knee extension.
  - In a leg press the quads are loaded across the whole range, and 100° of knee bend already reaches fairly long vastus lengths.
  - Training status also differs (trained vs untrained).
- **Severity:** moderate.
- **Resolved:** merged into T8. Quads in compound presses join glutes and side delts on the "no difference" list.

### I1.6 Hip thrust vs squat: Plotkin 2023 and its correction (source: Laurent)
- **Correction verified.** Crossref `updated-by` lists doi:10.3389/fphys.2026.1987823, dated **28 Oct 2026**. It covers three things:
  - the conflict-of-interest statement was clarified;
  - the funding statement now lists the gift funds;
  - trial registration was added **retrospectively**, in 2026.
- The publisher states the correction does not affect the data or results. **Laurent's description is accurate.**
- **Caveat:** retrospective registration plus gift funding is a mild risk-of-bias flag. Mention it in the research notes; it is not a reason to drop the paper.
- **Resolved:** merged into T8.

### Per-exercise evidence notes for Laurent (exercises.json)
These are draft `evidenceNote` lines based on abstracts only, and Stirner needs to approve them. Exercises not listed have no direct trial behind them, so leave their notes empty.

| exercise id | Suggested evidenceNote |
|---|---|
| `dumbbell-lateral-raise` | In an 8-week trial in trained lifters (n=24), dumbbell and cable lateral raises grew the side delts equally, so pick the one you can progress. (Larsen et al. 2025, PMID 40692697) |
| `cable-lateral-raise` | In an 8-week trial in trained lifters (n=24), cable and dumbbell lateral raises grew the side delts equally despite their different resistance curves. (Larsen et al. 2025, PMID 40692697) |
| `incline-dumbbell-curl` | In a 12-week MRI study (n=21, untrained), incline curls grew the biceps slightly more than preacher curls, with the same total elbow-flexor growth; another trial found no advantage. (Kobayashi et al. 2026, PMID 42829982) |
| `dumbbell-preacher-curl` | In a 12-week MRI study (n=21, untrained), preacher curls grew the brachialis and brachioradialis slightly more than incline curls, with the same total elbow-flexor growth. (Kobayashi et al. 2026, PMID 42829982) |
| `bayesian-cable-curl` | In a 10-week trial (n=15), Bayesian and preacher cable curls with matched resistance profiles grew the biceps and brachialis similarly. (Attarieh et al. 2025, PMID 40082069) |
| `cable-preacher-curl` | In a 10-week trial (n=15), cable preacher and Bayesian curls with matched resistance profiles grew the biceps and brachialis similarly. (Attarieh et al. 2025, PMID 40082069) |
| `cable-curl` | In a 10-week trial in untrained men, cable curls with the arm at the side or reaching back grew the elbow flexors about equally (~7–9%). (Larsen et al. 2026, PMID 41988507) |
| `lat-pulldown` | In a 10-week trial in untrained men (n=29), lat pulldowns grew the elbow flexors about as much as biceps curls. (Gentil et al. 2015, PMID 26446291) |
| `one-arm-dumbbell-row` | In an 8-week trial (n=10, untrained), dumbbell rows grew the elbow flexors about half as much as curls (+5% vs +11%), so add curls if arm size is a goal. (Mannarino et al. 2021, PMID 31268995) |
| `leg-press` | In an 8-week trial in trained lifters (n=23), a deep leg press and one stopping near 100° of knee bend grew the quads equally, so use the depth you can control. (Larsen et al. 2025, PMID 40113586) |
| `barbell-hip-thrust` | In a 9-week MRI trial (untrained), hip thrusts and back squats grew the glutes similarly; squats grew the quads more. (Plotkin et al. 2023, PMID 37877099) |
| calf raise (see note 2) | In an 8-week trial in young women (n=42), calf raises in the stretched, heel-down half of the range grew the medial gastrocnemius more than full-range reps (+15.2% vs +6.7%). (Kassiano et al. 2023, PMID 37015016) |
| `barbell-back-squat` (already has a note) | Optional extra line: Squats grew the glutes about as much as hip thrusts and the quads more in a 9-week MRI trial. (Plotkin et al. 2023, PMID 37877099) |
| `leg-extension` (already has a note) | Optional extra line: Training the bent-knee (long-length) half of the leg extension grew some quad regions more than the straight-knee half in untrained women (n=45). (Pedrosa et al. 2022, PMID 33977835) |

**Notes for Laurent:**
1. `machine-hip-thrust`: evidence is indirect only. Leave it empty or mark the note as indirect.
2. Calf raise mapping: I could not tell from the abstract which calf machine Kassiano 2023 used. Check before choosing between `leg-press-calf-raise` and `standing-calf-raise-machine`.
3. Wolf 2025 and Gschneidner 2025 don't name their exercises in the abstracts, so I didn't map them.
4. Pedrosa 2023, if you want a partials line on `dumbbell-preacher-curl`: "Training the arm-straight half of the preacher curl grew the biceps more at one site than the top half (n=19 untrained women; PMID 36828324)."
5. Keep the existing resistance-profile labels (`dumbbell-lateral-raise` shortened, `cable-lateral-raise` mid-range). Larsen found the profile didn't change growth, so the substitution group shouldn't rank either one first.

## Batch 2: Laurent (internal conflicts, topics 1–8)
Before this batch I re-read evidence.md (md5 unchanged since 17:35) and Laurent's "Topics 1–8 (pass 1)" section. I read that section only and did not edit it.

### I2.1 Topic 3 vs 13c: Schoenfeld 2017 / Lopez 2021 vs Lasevicius 2018 (source: Laurent)
- **The three papers:**
  - Schoenfeld 2017 (PMID 28834797): 21 studies, all sets to failure, ≤60% vs >60% 1RM. Similar hypertrophy.
  - Lopez 2021 (PMID 33433148): 28 studies, n=747, all to failure. No difference between loads.
  - Lasevicius 2018: see T13c.
- **Why they differ:**
  - **Proximity to failure:** both meta-analyses required every set to reach failure. Lasevicius matched volume load instead.
  - **Load range:** 20% 1RM is below the low-load range that most included studies used.
  - **Single trial vs pooled data:** Carvalho 2022's volume-matched meta-analysis found no deficit even below 30% 1RM.
- **Lopez 2021 corrigendum, verified (Laurent's flag):** Med Sci Sports Exerc 2022;54(2):370, doi:10.1249/MSS.0000000000002838, PMID 35029596. It corrects the effect sizes of three studies in the **strength** figure. The main findings and conclusions are unchanged. Add "(corrigendum 2022, strength figure only)" to the research notes.
- **Severity:** moderate.
- **Resolved:** merged into the T13c rewrite. Topic 3 already says loads below ~30% are less studied.

### I2.2 Topic 2: Lasevicius 2022 / Refalo 2023 / Grgic 2022 / Robinson 2024 (sources: Laurent, plus Emrys's Refalo 2023 vs Robinson 2024, merged)
- **The four papers:**
  - **Lasevicius 2022** (PMID 31895290): n=25 untrained, knee extension, 8 weeks, volume equated. Low-load sets stopped short of failure grew 2.8% (not significant). The other conditions grew about 8%.
  - **Refalo 2023** (PMID 36334240): 15 studies. A trivial effect of set failure (ES 0.19). Momentary failure was not significant (ES 0.12). The relationship may be non-linear.
  - **Grgic 2022** (PMID 33497853): 15 studies. Overall ES 0.22, not significant. In the trained subgroup, ES 0.15 favoured failure significantly.
  - **Robinson 2024** (PMID 38970765): exploratory meta-regression on *estimated* RIR. Hypertrophy rose steadily as RIR fell.
- **Why they differ:**
  - The category-based analyses lump all "non-failure" sets together, from about 1 RIR to far short of failure (as in Lasevicius's low-load group). That averages out to a trivial effect.
  - Robinson models RIR continuously, and its slope is likely driven by sets stopped far from failure. That fits Refalo's suggestion of non-linearity: most of the gain comes from moving from far to near failure, and little from near to true failure.
  - Lasevicius shows why load matters here. At light loads, stopping early leaves many reps, and much of the tension, unused.
- **Severity:** minor.
- **Recommended change:** add to (d): "*Grgic 2022 found a small advantage for failure in trained participants only (ES 0.15).*" Also add the Hermann 2025 line from T2. Keep the grade at "Moderate".

### I2.3 Topic 4: Schoenfeld 2016 vs Schoenfeld 2019 / Pelland 2026 (sources: Laurent and Emrys, merged)
- **The three papers:**
  - **Schoenfeld 2016** (PMID 27102172): 10 studies, volume equated. Training twice a week beat once a week (ES 0.49 vs 0.30).
  - **Schoenfeld 2019** (PMID 30558493): 25 studies. No frequency effect when volume is equated.
  - **Pelland 2026** (PMID 41343037): 67 studies. Any frequency effect on hypertrophy is compatible with negligible. Frequency is positive for strength.
- **Why they differ:** the newer analyses include 2.5–6.7× as many studies. New single trials point both ways (T4).
- **Is the current wording adequate?** Mostly. The problem is that (d) says "*Mixed across meta-analyses, but they agree overall*", which contradicts itself.
- **Severity:** minor.
- **Recommended change:** (d) → "**Strong** that frequency matters little for growth once weekly volume is equal (Schoenfeld 2019, 25 studies; Pelland 2026, 67 studies). An earlier, smaller analysis (2016, 10 studies) favoured 2× over 1× a week; newer data don't confirm it. Frequency does help strength."

### I2.4 Topic 6: Schoenfeld 2016 vs Longo 2022 vs Singer 2024 and the 2–3 min default (sources: Laurent and Emrys, merged)
- **The three papers:**
  - **Schoenfeld 2016 rest study** (PMID 26605807): see T6. Volume load was not matched.
  - **Longo 2022** (PMID 35622106): n=28, knee extension at 80% 1RM, 10 weeks, four protocols. **Volume load, not rest interval**, determined quadriceps CSA. Short rest with volume load matched to long rest grew as much as long rest.
  - **Singer 2024** (PMID 39205815): 9 studies. A small benefit for rest above 60 s, and none detectable beyond 90 s. Whole-body measures slightly favoured short rest.
- **Why they differ:** they don't really conflict; they describe one mechanism. Rest matters through the volume load (tension × reps) it preserves:
  - Where volume load isn't matched, long rest wins.
  - Where it is matched, rest stops mattering.
  - Past about 90 s, there's no further cost to shorter rest.
- **Severity:** moderate.
- **Resolved:** merged into T6.
- **Extra nuance for 13b (time-limited users):** short rest plus one extra set to recover the lost volume load is a valid option.

### I2.5 Topic 8 vs 11: Kassiano 2022 vs Baz-Valle 2019 (source: Laurent)
- **Kassiano 2022** (PMID 35438660): 8 studies, N=241 young men. *Systematic* variation may help regional growth. *Excessive random* variation may compromise gains.
- **Baz-Valle 2019** (PMID 31881066): n=21 trained, 8 weeks, exercises picked at random by an app each session. Growth was similar between groups. Only the fixed group's vastus intermedius change was significant within-group. Motivation was higher with variation.
- **Why they differ:** different questions (planned vs random variation). Baz-Valle found *similar* growth, not worse growth.
- **Severity:** minor.
- **Recommended change:** T8 (a): "*…constant random rotation may hold gains back*" → "*…rotating exercises at random every session did not add growth*". This matches T11.

### I2.6 Topic 5 vs 12: the 3–8 heuristic vs "no limit", and Barbalho (source: Laurent)
- **Retraction verified.** Barbalho M, Coswig VS, Steele J, et al. (2019), *Evidence for an Upper Threshold for Resistance Training Volume in Trained Women*, Med Sci Sports Exerc 51(3):515-522, doi:10.1249/MSS.0000000000001818, PMID 30779716.
  - Expression of concern: MSSE 2020;52(11):2490, PMID 33060463.
  - **Retraction:** MSSE 2021;53(6):1318, doi:10.1249/MSS.0000000000002672, PMID 33986236.
  - evidence.md is right to exclude it. Barbalho 2020 (PMID 31072272) is also retracted.
- **The conflict:** T5 (b) gives app users "3–8 hard sets per muscle per session", while T12 says no study pins down a limit. The two only fit if 3–8 is labelled as a convention.
- **New evidence on per-session volume:**
  - Benito 2020: a negative slope for sets per workout, with no threshold.
  - Gomes 2019: 10–15 sets in a single session were fine.
  - Amirthalingam 2017 and Hackett 2018 (already cited in T12): 10 sets per exercise did no better than 5.
- **Severity:** moderate.
- **Recommended changes:**
  - **T5 (b):** → "*Do about 2–4 hard sets per exercise. Carlsen's starting range is about 3–8 hard sets per muscle per session; this is a planning convention, not a proven limit.*"
  - **T5 (d):** → "*No trustworthy study pins down a per-session ceiling. A meta-regression of 111 studies linked more sets per workout to slightly smaller whole-body gains (Benito 2020), and 10 sets per exercise did no better than 5 in two small trials.*"
  - **T12 one-line answer:** → "*No study has found a clear per-session set limit, though very long sessions may return less; splitting a large weekly total across two or more sessions is a cautious default.*"
  - **T12 (d):** keep "Weak". Add Benito 2020 and Gomes 2019.
  - **Implementation:** use the same number for T12's soft-warning threshold as T5's upper bound (8).

## Batch 3: Emrys (from "Contradictions to hand off" in qa-bobby-numbers.md, read only)
**Merged into Laurent's entries, crediting both:**
- T2 (Refalo 2023 vs Robinson 2024) → **I2.2**
- T4 (Schoenfeld 2016 vs 2019) → **I2.3**
- T6 (Singer 2024 vs Schoenfeld 2016 and the default) → **I2.4 / T6**
- T7 (Wolf 2023 vs Pedrosa 2022 / Kassiano 2023) → **I1.4 / T7**
- T10/T11 (Gentil vs Mannarino) → **I1.3**

I opened every paper on PubMed (Wolf 2023 on Crossref). All match Emrys's descriptions.

### I3.1 Topic 10: Schoenfeld 2019 / Brigatto 2022 vs Heaselgrave 2019 / Aube 2022 / Enes 2024 (source: Emrys)
**Pro-volume trials:**
- **Schoenfeld 2019** (PMID 30153194): n=34 trained, 1, 3 or 5 sets per exercise, 3×/wk, 8 wk, ultrasound. Higher volume favoured the elbow flexors, mid-thigh and lateral thigh.
- **Brigatto FA, Lima LEM, Germano MD, et al. (2022)**, J Strength Cond Res 36(1):22-30, doi:10.1519/JSC.0000000000003413, PMID 31868813: n=27 trained, 16, 24 or 32 weekly sets, 8 wk. 32 beat 16 for lower-body muscle thickness and for triceps.

**Trials with no significant difference:**
- **Heaselgrave SR, Blacker J, Smeuninx B, et al. (2019)**, Int J Sports Physiol Perform 14(3):360-368, doi:10.1123/ijspp.2018-0427, PMID 30160627: n=49 trained men, 9, 18 or 27 weekly biceps sets, **6 wk**. Gains were +4.3%, +9.5% and +5.4%. Effect sizes for 18 and 27 vs 9 were moderate to large. **The 9-set group trained once a week; the others trained twice.**
- **Aube D, Wadhi T, Rauch J, et al. (2022)**, J Strength Cond Res 36(3):600-607, doi:10.1519/JSC.0000000000003524, PMID 32058362: n=35, squat 1RM about 2.1× bodyweight, 12, 18 or 24 lower-body sets, 8 wk. No group differences. Medial muscle thickness was numerically **lowest** at 24 sets (+2.7%, vs +5.7% at 18 and +6.4% at 12).
- **Enes A, De Souza EO, Souza-Junior TP (2024)**, Med Sci Sports Exerc 56(3):553-563, doi:10.1249/MSS.0000000000003317, PMID 37796222: n=31 trained, 12 wk, constant sets vs adding 4 or 6 sets every 2 weeks. No significant growth difference (p=0.067–0.076). The confidence intervals suggest a plateau.

**Why they differ:**
- Groups of n=9–17 can't detect the small differences the meta-regressions predict.
- The trials are short (6–12 wk).
- Starting volume and training status vary. Aube's lifters were very strong (see Scarpelli 2022).
- In Heaselgrave, frequency was confounded with volume.
- Growth was measured by ultrasound at only 1–4 sites.

**Severity:** minor. T10 (d) already says individual trials in trained people are mixed.

**Recommended change:**
- Add to (d): "*…in the strongest lifters (Aube 2022) the highest volume was numerically the least effective, consistent with the response depending on prior training volume (Scarpelli 2022).*"
- Apply the T10 (b) change above.
- Keep the grade at "Strong" for the pooled dose-response.

### I3.2 Topic 12: Kumar 2012 vs Terzis 2010 (source: Emrys)
**The papers:**
- **Kumar 2012** (PMID 22859389): groups of 6 young and 6 older men. Measured **myofibrillar protein synthesis** over several hours. Doubling volume added little in young men but more in older men.
- **Terzis 2010** (PMID 20617335): n=8 untrained, **fasted**, 1, 3 or 5 sets of 6RM leg press, biopsy at **30 min**. p70S6k and S6 **phosphorylation** rose with more sets. mTOR rose about equally at every volume.

**Why they differ:** different outcomes (protein synthesis vs one signalling snapshot), timing and fed state, tiny samples, and the result in Kumar depended on age.

**Both are weak proxies for growth.** In Damas 2019 (T10), the higher-volume protocol did not produce more growth.

**Severity:** minor.

**Recommended change:** Keep both in the research notes only, never in app copy. Add to (d): "*Acute signalling markers have not tracked long-term growth in training trials (Damas 2019).*"

### I3.3 Topics 13a/14: Steele 2017 vs Halperin 2022 / Remmert 2023a / Refalo 2024 (source: Emrys)
**The papers:**
- **Steele J, Endres A, Fisher J, et al. (2017)**, PeerJ 5:e4105, doi:10.7717/peerj.4105, PMID 29204323: n=141, **one session**, single sets to failure. Participants underpredicted reps (SEM 2.64–3.38). There was only "a tendency" toward better accuracy with experience.
- **Halperin 2022** (PMID 34542869): meta-analysis. Training status did not clearly moderate accuracy.
- **Remmert JF, Laurson KR, Zourdos MC (2023)**, Percept Mot Skills 130(3):1239-1254, doi:10.1177/00315125231169868, PMID 37036795: n=58. Neither training experience nor experience with RIR affected accuracy. Accuracy was better closer to failure and in later sets.
- **Refalo MC, Remmert JF, Pelland JC, et al. (2024)**, J Strength Cond Res 38(3):e78-e85, doi:10.1519/JSC.0000000000004653, PMID 37967832: n=24 trained. Accuracy was high and unrelated to years of training.
- **Droguett 2026** (T14): experienced and novice lifters were about equally accurate.

**Why they differ:**
- Steele measured **pre-set** predictions. Most of the others measured **within-set** predictions near failure, which are more accurate.
- Steele reports a "tendency", not a tested effect.
- The newer trials (Wiedenmann 2026; Hermann 2025) point to **practice with feedback**, not years of training, as what improves accuracy.

**Severity:** moderate.

**Recommended changes:**
- **T14:** as written in the T14 section above.
- **13a (d):** "*Evidence that RIR accuracy improves with experience is mixed*" → "*Years of experience have little clear effect on RIR accuracy; practice with occasional sets to failure improved it in two newer trials.*"
- **13a (c):** describe Steele 2017 as "*one session; tendency only*".

### I3.4 Topic 13a: Lopez 2021 vs Refalo 2025 (source: Emrys). Resolved as a false conflict
- **Lopez 2021:** larger hypertrophy effects in **untrained** participants (P=0.033). This is about **how much** people grow depending on training status.
- **Refalo MC, Nuckols G, Galpin AJ, et al. (2025)**, PeerJ 13:e19042, doi:10.7717/peerj.19042, PMID 40028215: 29 studies of **male vs female** growth. The sex comparison was "not influenced by RT experience". This is about whether training experience changes the **difference between the sexes**.

**Why they don't conflict:** they answer different questions.

**Severity:** minor.

**Recommended change:** Reword the 13a (c) note on Refalo 2025 from "*…results not influenced by training experience*" to "*…the male–female comparison was not changed by participants' training experience.*"

---


## Closing summary (v2)
- **Major:** none.
- **Moderate:** T5, T6, T7, T8, T13c, T14.
- **Minor:** everything else. T13b is closed.
- **Most important:**
  - (1) T6: decided by Hoang: 90 s and 2–3 min are both valid, user's choice, Limited; evidence.md already matches (R6: no change needed).
  - (2) T7: delete "in a few small studies better"; partials match full ROM but do not beat it.
  - (3) T4: evidence.md misstates Schoenfeld 2016 as not volume-equated.
- **Searched poorly:** T8 stability (one trial, which came from Silas); T13a (none found); T13c bands and bodyweight (thin literature); T15 deload structure (no trials comparing deload designs).

## Incoming conflicts: how new ones are logged
Each new item gets:
- an index row;
- verification of every PMID/DOI;
- a "why they differ" analysis, a severity rating, and an apply-ready R item.

Overlaps are merged into one entry that credits every source.

## Changelog
- 2026-10-29, ~18:10 Helsinki (UTC+2): v1 by Vinci. All 15 topics (17 sections) searched for 2015–2026. Batches 1–2 (Laurent) and 3 (Emrys) logged and merged.
- 2026-10-29, after 18:15 Helsinki (UTC+2): v2 by Vinci.
  - Re-checked against evidence.md as rewritten by Silas at 18:13 (md5 2e59bcd7…).
  - Added PRIORITY A (T6) and PRIORITY B (T7) at the top.
  - Rebuilt the index with one row per conflict and all sources.
  - Rewrote the recommendations as apply-ready R items with current text quoted.
  - Added batch 4 (Silas, 36 entries + T6 section) with verification and 10 corrections, including the Schoenfeld 2016 volume-equation error.
  - Corrected v1's Gschneidner wording.
- 2026-10-29, ~18:25 Helsinki (UTC+2): v2.1. Applied Hoang's decisions (via Luxanna):
  - T6: both valid, no default; R6 = no change needed.
  - T8: keep 'prefer stable', graded Theoretical; Saeterbakken goes to the research notes.
  - R4 and R7 marked approved for Silas.
  - Re-checked against evidence.md md5 9ea587a8….
- 2026-10-29, ~18:40 Helsinki (UTC+2): v3 by Vinci. Re-checked against evidence.md md5 c0ffa049….
  - Added batch 5 (Stirner T9–15, 18 items) and batch 6 (Stirner T1–8, 4 items plus R1–R5 verdicts).
  - Amended v3: R1 (Myrholt), R2 (Martorelli wording corrected), R3, R5, R7 (Larsen 2025 Front Psychol), R9–R15.
  - New: R16 (13b drop sets), R17 (T4 Zaroni) and R18 (notes only). R15's v2 One-line rewrite withdrawn (superseded by Hoang).
  - Behm 2002 and Anderson & Behm 2004 verified (acute, men, no growth measured).
  - Fixed the batch-4 Martorelli row (+2.1% at 10 wk).
