# QA: numeric claims in evidence.md vs cited papers (Bobby)

- **Date:** 2026-10-29 (Europe/Helsinki)
- **Scope:** Every claim with a number in `/workspace/carlsen/evidence.md` across topics 1–15 (13 split into 13a/13b/13c). Numbers include rep ranges, RIR, rest times, sets, effect sizes, percentages, sample sizes and durations (study weeks, session minutes). The scope is figure-vs-paper only. Disagreements between studies are listed in the final section and are not judged here. evidence.md was not edited.
- **Method:** Each figure was checked against the cited paper's Results or tables. I used open-access full text where it exists (PMC or Europe PMC fullTextXML). Otherwise I used the PubMed or publisher abstract, marked "abstract only". No figure was guessed. Anything not found is "can't verify".
- **Verdict mapping to the lead's terms:** match = ok; mismatch or overstated = fix; can't verify = unclear.
- **Counts:** match 107 · mismatch 2 · overstated 5 · can't verify 6 (total 120 rows)
- Framing note: all rationale is kept on mechanical tension. No muscle-damage reasoning and no "20 sets" slogan.

Link key: PMC = `https://pmc.ncbi.nlm.nih.gov/articles/<PMCID>/`; PubMed = `https://pubmed.ncbi.nlm.nih.gov/<PMID>/`.

---

## 1. Mechanical tension, fiber recruitment and "effective reps"

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Wackerhage 2019 / Morton 2019: effective-reps count | "the last ~5 slow reps near failure do most of the stimulating" (labelled a theoretical model) | Neither cited paper gives a ~5-rep figure | Abstracts only, https://pubmed.ncbi.nlm.nih.gov/30335577/ and https://pubmed.ncbi.nlm.nih.gov/31294822/ | can't verify |
| Pareja-Blanco 2017: velocity loss and hypertrophy | More velocity loss gave more hypertrophy, but the study was small | n=22 (VL20 n=12, VL40 n=10), 8 wk; VL40 gained more vastus lateralis CSA | Abstract only, https://pubmed.ncbi.nlm.nih.gov/27038416/ | match |

No fixes needed. The ~5-rep figure is already labelled theoretical.

## 2. Proximity to failure and reps in reserve (RIR)

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Robinson 2024: RIR dose-response | Hypertrophy kept rising as RIR fell; strength about the same across RIR; RIR estimated; exploratory | Same: hypertrophy rose closer to failure, strength flat; RIR estimated; exploratory | Publisher abstract only, https://link.springer.com/article/10.1007/s40279-024-02069-2 | match |
| Refalo 2023: failure vs non-failure | "Only a trivial edge for failure" | 15 studies; ES 0.19 (95% CI 0.00–0.37), p=0.045, i.e. trivial | Abstract and Results, PMC9935748 | match |
| Lasevicius 2022: failure and light loads | Failure matters more with light loads | n=25 untrained, 8 wk, 30% vs 80% 1RM. CSA: LL-failure 7.8% vs LL-non-failure 2.8% (n.s.); HL-failure 8.1% vs HL-non-failure 7.7% | Abstract only, https://pubmed.ncbi.nlm.nih.gov/31895290/ | match |
| Halperin 2022 (cited in T14): size of RIR underestimate | "a '2 RIR' target may really be 3–4" | Pooled underprediction 0.95 reps (95% CI 0.17–1.73), so 2 RIR ≈ 3. Only Armes 2020's upper CI (2.0, 0–4) reaches 4 | Abstract only, https://pubmed.ncbi.nlm.nih.gov/34542869/ | overstated |
| Robinson 2024: RIR cut-offs | "0–2 RIR (0–1 isolation/machine, 1–3 heavy compounds)" | The paper gives continuous meta-regressions, not these cut-offs | Publisher abstract, link above | can't verify |

Fixes:
- "2 RIR may really be 3–4" → "on average people underestimate by about 1 rep, so a '2 RIR' set may really be about 3 RIR" (cite Halperin 2022 in topic 2).

## 3. Load and rep range (≈5–30 reps)

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Lopez 2021 / Schoenfeld 2015 / Morton 2016: rep span | Similar growth "across roughly 5 to 30 reps" | Lopez: high ≤8RM, moderate 9–15RM, low >15RM, with no hypertrophy difference. Schoenfeld 2015: 25–35 vs 8–12 reps. Morton 2016: 20–25 vs 8–12 reps | Lopez abstract and Methods, PMC8126497; Schoenfeld 2015 abstract, https://pubmed.ncbi.nlm.nih.gov/25853914/; Morton 2016 Methods, PMC4967245 | match |
| Lopez 2021: study size | (Cited as the strong evidence) | 28 studies, 747 adults | Abstract and Results, PMC8126497 | match |
| Lopez 2021: heavy loads for strength | Heavier loads build more max strength | Strength: high vs low SMD 0.60–0.63; moderate vs low 0.34–0.35; high vs moderate 0.26–0.28 (p=0.068) | Abstract and Results, PMC8126497 | match |
| Schoenfeld 2015: trained men, low vs high load | (Cited for load equivalence) | n=18 trained men, 8 wk. Thickness LL/HL: elbow flexors 8.6/5.3%, extensors 5.2/6.0%, quads 9.5/9.3%. Squat 1RM HL 19.6% vs LL 8.8% | Abstract only, https://pubmed.ncbi.nlm.nih.gov/25853914/ | match |
| Morton 2016: trained men | (Cited for load equivalence) | n=49 trained men, 12 wk, 20–25 reps (~30–50% 1RM) vs 8–12 reps (~75–90%) to failure | Abstract and Methods, PMC4967245 | match |
| Cited papers: very light loads | "Very low loads (<~30% 1RM) are less well studied" | No cited paper in topic 3 states this | Searched Lopez full text PMC8126497; others abstract | can't verify |

No fixes needed. Optionally, cite a source for the <30% 1RM statement or drop the number.

## 4. Training frequency per muscle and split choice

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Schoenfeld 2016 (frequency): 2× vs 1× | The earlier analysis favoured 2×/wk over 1×/wk | 10 studies; ES 0.49 (2×) vs 0.30 (1×) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/27102172/ | match |
| Schoenfeld 2019 (frequency): volume-equated | 1, 2 or 3+ sessions/wk give similar growth when volume is matched | 25 studies; no significant frequency effect when volume-equated | Abstract only, https://pubmed.ncbi.nlm.nih.gov/30558493/ | match |
| Pelland 2026: frequency | Frequency effect negligible once volume is accounted for | Frequency effect "compatible with negligible"; posterior probability of volume effect 100% | Publisher abstract only, https://pubmed.ncbi.nlm.nih.gov/41343037/ | match |
| (Split recommendation) | Day counts per split in (b) | Product prescription; no paper gives these | n/a | can't verify |

No fixes needed.

## 5. Volume: hard sets per session and diminishing returns

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Pelland 2026: indirect sets | Counts indirect sets as half a set | Fractional indirect set = 0.5 | Publisher abstract, https://pubmed.ncbi.nlm.nih.gov/41343037/ | match |
| Pelland 2026: diminishing returns | More hard sets help, with diminishing returns | Same | Publisher abstract, link above | match |
| Robinson 2024: 0–3 RIR cut-off | 0–3 RIR "hard set" is a counting convention | No cut-off in the paper; it reports a continuous relationship (evidence.md says the same) | Publisher abstract | match |
| (Heuristic) sets per exercise and session | "2–4 hard sets per exercise, ~3–8 per muscle per session" | No cited paper gives these; evidence.md calls them a heuristic | n/a | can't verify |

No fixes needed.

## 6. Rest intervals

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Singer 2024: >60 s benefit | Small growth advantage for resting more than about a minute | 9 studies, 19 measurements; small benefit for >60 s vs ≤60 s | Abstract, Results and Fig 3, PMC11349676 | match |
| Singer 2024: plateau point | Little extra benefit beyond about 90 s to 2 min | No appreciable difference beyond 90 s | Abstract and Results, PMC11349676 | match |
| Singer 2024: 2–3 min for every exercise | "Rest 2–3 minutes between sets on every exercise, isolation included. The longer rest is beneficial"; "the same longer rest benefits every exercise" | No detected hypertrophy gain beyond 90 s; no isolation-specific analysis (category SMDs ≤60/61–119/120–179/≥180 s: 0.47/0.65/0.55/0.50) | Results and Fig 3, PMC11349676 | overstated |
| Schoenfeld 2016 (rest): design | Longer rest keeps volume load up | n=21 trained men, 8 wk, 1 vs 3 min, 3×8–12RM; 3 min gave more growth at some sites | Abstract only, https://pubmed.ncbi.nlm.nih.gov/26605807/ | match |
| Longo 2022: volume load vs rest | Once volume load is matched, rest length didn't matter | n=28, 10 wk, 1 vs 3 min at 80% 1RM. CSA: LI 13.1%, VLI-SI 12.9% vs SI 6.8%, VSI-LI 6.6% | Abstract only, https://pubmed.ncbi.nlm.nih.gov/35622106/ | match |

Fixes:
- (a)/(b) → "Rest 2–3 minutes (our default). Research shows benefits up to about 90 s; longer rest is not shown to add growth, but it helps you repeat your weight and reps." 2–3 min is Hoang's product decision, so keep the number and soften the word "beneficial".

## 7. Long muscle lengths, stretch and lengthened partials

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Wolf 2023: full vs partial ROM | Lengthened partials may roughly match full ROM (low certainty); main model slightly favoured full ROM; the long-partial estimate is uncertain | Main SMD 0.12 (95% CI −0.02 to 0.26) favouring full ROM; long-length partial −0.28 (−0.81 to 0.16) | Abstract, https://journal.iusca.org/index.php/Journal/article/view/182 | match |

Topic 7 gives no sample sizes or percentages for Maeo 2021, Pedrosa 2022 or Kassiano 2023. Its qualitative statements (seated beat prone leg curl; lengthened partials matched or beat full ROM) agree with the abstracts. Spot-check: Maeo 2021 n=20, 12 wk, +14% vs +9% (PMC7969179); Kassiano 2023 n=42, 8 wk, +15.2% vs +6.7%. These are not counted as rows.

No fixes needed.

## 8. Exercise selection: resistance profile and stability

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Kassiano 2022: exercise variation | Systematic review of 8 studies, young men | 8 studies, young men (N=241) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/35438660/ | match |
| Schwanbeck 2020: free weights vs machines | n=46 (26 women), 8 wk; similar gains | n=46 (26 women), 8 wk; similar | Abstract only, https://pubmed.ncbi.nlm.nih.gov/32358310/ | match |
| Larsen 2025: dumbbell vs cable lateral raise | Trained men and women, n=24, within-subject, 8 wk, 5 sets to failure 2×/wk; similar gains (+3.3–4.6%, BF 0.22–0.27) | Same figures | Abstract and Results, PMC12277279 | match |
| (Recommendation) exercises per muscle | "1–2 exercises per muscle" | Product prescription; not a paper figure | n/a | can't verify |

No fixes needed.

## 9. Progressive overload and auto-regulation (next-session load)

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Kassiano 2026 (MSSE): progressive overload | n=55 untrained women, 8 wk, 3×8–12; growth roughly doubled with progression (+22.9% vs +11.6%) | n=55, 8 wk; +22.9% (0.79 cm) vs +11.6% (0.41 cm); control +1.8% (≈1.97×) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/41718594/ | match |
| Kassiano 2026 (JSCR): overload and muscle use | n=41, 8 wk, 3×8–12, single-joint arm work | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/42873141/ | match |
| Plotkin 2022: load vs rep progression | 27 men and 16 women, ≥1 yr trained, 8 wk; similar growth | Same; difference 2.8 mm (90% CI −0.5 to 5.8); 1RM difference 2.0 kg | Abstract and Results, PMC9528903 | match |
| Chaves 2024: overload in untrained | n=39 untrained | n=39 | Abstract only, https://pubmed.ncbi.nlm.nih.gov/38286426/ | match |
| Helms 2018 (RPE vs %1RM) | n=21 trained, 8 wk; RPE slightly better for squat (ES 0.50 ± 0.63) | Same | Abstract and Results, PMC5877330 | match |
| Hickmott 2022: load autoregulation | 15 studies; small, non-significant 1RM edge (MD 2.07 kg, SMD 0.21, p=0.09); >25% reductions SMD 0.34; no pooled hypertrophy result for load AR | Same; full text confirms no pooled hypertrophy for load AR | Abstract and Results, PMC8762534 | match |
| Helms 2018 (volume AR) | Powerlifters, n=12, 3 wk | n=12, 3 wk | Abstract only, https://pubmed.ncbi.nlm.nih.gov/29786623/ | match |
| Helms 2020: monitoring methods | Review of 90 studies | 90 studies | Abstract, PMC7706636 | match |
| Zourdos 2016: RIR-based RPE | Experienced n=15 (5.2 yr) vs novice n=14 (0.4 yr); r −0.88 / −0.77 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/26049792/ | match |
| Mann 2010: APRE | n=23, 6 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/20543732/ | match |
| Shattock 2022: autoregulation | n=20 | n=20 | Abstract only, https://pubmed.ncbi.nlm.nih.gov/32058357/ | match |
| Maeo 2023 (triceps): load rule | +5% 1RM per session when the previous session had no failure | Protocol as stated | Abstract only, https://pubmed.ncbi.nlm.nih.gov/35819335/ | match |

No fixes needed.

## 10. Weekly hard sets per muscle (direct and indirect sets)

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Pelland 2026: size of meta-regression | 67 studies, 2,058 participants (79% male) | 67 studies, 2,058, 79.1% male | Publisher abstract, https://pubmed.ncbi.nlm.nih.gov/41343037/ | match |
| Schoenfeld 2017 (volume) | 15 studies, graded dose-response | 15 studies, 34 groups; +0.37% per set; higher vs lower 3.9% | Abstract only, https://pubmed.ncbi.nlm.nih.gov/27433992/ | match |
| Schoenfeld 2019 (volume): design | Trained men n=34, 8 wk, 1/3/5 sets, 3×/wk | Same; higher volume favoured for elbow flexors, mid-thigh and lateral thigh | Abstract and Results, PMC6303131 | match |
| Brigatto 2022 | n=27, 16/24/32 weekly sets | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/31868813/ | match |
| Heaselgrave 2019 | n=49, 6 wk, 9/18/27 biceps sets; no significant difference | Same; 4.3/9.5/5.4% | Abstract only, https://pubmed.ncbi.nlm.nih.gov/30160627/ | match |
| Aube 2022 | n=35, 12/18/24 sets | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/32058362/ | match |
| Enes 2024 | n=31, 12 wk, set progressions; p=0.067 / 0.076 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/37796222/ | match |
| Kubo 2019 | n=17, 10 wk; quads 4.6–4.9%; RF and hamstrings did not grow | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/31230110/ | match |
| Kassiano 2026 (squat vs LE): RF | n=63 untrained women, 8 wk; leg extensions grew RF far more (proximal RF +11.4% vs +2.0%) | Same; distal VL +18.2% vs +11.2% | Abstract only, https://pubmed.ncbi.nlm.nih.gov/41379528/ | match |
| Gentil 2015: pulldown and biceps | Lat pulldown ≈ full biceps stimulus (n=29, 10 wk, untrained) | 6.10% vs 5.83% | Abstract and Results, PMC4592763 | match |
| Mannarino 2021: row and biceps | Rows ≈ half (n=10, 8 wk) | 11.06% (curl) vs 5.16% (row) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/31268995/ | match |
| de França 2015 | n=20, 8 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/26244600/ | match |
| Currier 2023 | 119 studies, n=3,364 (47% women); SMD 0.66 (0.47–0.85) | Same | Abstract and Results, PMC10579494 | match |
| Currier 2026 (ACSM) | 137 reviews, >30,000 participants | Same | Abstract, PMC12965823 | match |

No fixes needed.

## 11. Exercise substitution (add, remove, swap)

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Haugen 2023: free weights vs machines | 13 studies, n=1,016; hypertrophy SMD −0.055 (−0.397 to 0.287); strength is equipment-specific | Same; 5 hypertrophy outcomes | Abstract and Results, PMC10426227 | match |
| Larsen 2026: shoulder extension | 24 of 30 completers, 10 wk, 7–9% | Same | Abstract and Results, PMC13076143 | match |
| Maeo 2023: overhead vs pushdown | n=21, within-subject, 12 wk; whole triceps +19.9% vs +13.9% (d=0.54); long head +28.5% vs +19.6% (d=0.61) | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/35819335/ | match |
| Kassiano 2026 (squat vs LE): strength test | "Squat 1RM +46.7% vs +21.3%" (also "squat 1RM" in the research note) | The test was a back-squat **3RM**, not 1RM (+46.7% vs +21.3%) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/41379528/ | mismatch |
| Costa 2021 | n=22, 9 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/33440446/ | match |
| Costa 2022 | n=23, 9 wk, +12% vs +7% | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/35481889/ | match |
| Fonseca 2014 | n=49, 12 wk, 9.3–12.2% | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/24832974/ | match |
| Baz-Valle 2019 | n=21, 8 wk, 4×/wk; random rotation did not add growth | Same | Abstract and Results, PMC6934277 | match |
| Rauch 2020 | n=17, 9 wk; 2.47% (ES 0.35) vs 1.37% | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/29016481/ | match |

Fixes:
- Kassiano 2026 → "Back-squat 3RM improved more with squats (+46.7% vs +21.3%)". Change "1RM" to "3RM" in the research note too.

## 12. Per-session limits (sets per muscle per session)

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Brigatto 2019 | n=20, 8 wk, 16 weekly sets in 1 vs 2 sessions; ES slightly favoured 2× | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/29528962/ | match |
| Zaroni 2019 | n=18, 8 wk, 5×/wk full body vs 1×/wk split; favoured frequent | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/31260419/ | match |
| Ochi 2018: duration | "Untrained men, n=20, **8 wk**, volume-matched knee extension; 6 sets 1×/wk vs 2 sets 3×/wk" | n=20 male students; **11 wk** training (+ detraining); 6×12 1×/wk vs 2×12 3×/wk; MVC +43.5% vs +65.2% | Methods and Results, PMC6036131 | mismatch |
| Amirthalingam 2017: 10 vs 5 sets | n=19, 6 wk; 5-set group gained more trunk **and arm** lean mass (ES −0.21, −0.25); recommends 4–6 sets | Figures match. Arm lean mass difference was not significant (p≈0.083) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/27941492/ | overstated |
| Hackett 2018 | Pilot n=12, 12 wk; >5 sets per exercise gave no greater gains | Same | Abstract and Results, PMC5969184 | match |
| Schoenfeld 2019: 5 sets vs 1 or 3 | "5 sets per exercise, 3 sessions/wk still produced more growth than **1 or 3** sets" | Significant only for 5 vs 1 set (elbow flexors, RF, VL); 5 vs 3 had only weak Bayesian evidence, not significant | Results "Elbow flexor thickness", RF, VL sections, PMC6303131 | overstated |
| Alvarez 2026 | n=13, 7/14/21 lower-body sets; swelling resolved within 24 h | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/41565215/ | match |
| Kumar 2012 | Groups of 6; 3 vs 6 sets | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/22859389/ | match |
| Terzis 2010 | n=8; 1/3/5 sets of 6RM | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/20617335/ | match |
| (d) sample sizes | "samples are small (n=12–34)" | Training trials: 12 (Hackett) to 34 (Schoenfeld); acute studies smaller (Kumar 6/group, Terzis 8, Alvarez 13) | Abstracts above | match |

Fixes:
- Ochi 2018 → "11 wk" (not 8 wk).
- Amirthalingam 2017 → "The 5-set group gained more trunk lean mass; arm lean mass trended the same way (not significant)".
- Schoenfeld 2019 → "5 sets per exercise produced more growth than 1 set; the edge over 3 sets was small and uncertain".

## 13. Onboarding: experience, session length and equipment

### 13a. Experience level

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Ahtiainen 2003 | 21 wk; untrained +5.6% quad CSA vs strength athletes −1.8%; force +20.9% vs +3.9%; n=8+8 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/12734759/ | match |
| Rhea 2003 | 140 studies, 1,433 ES; 60% 1RM and 3 d/wk (untrained) vs 80% and 2 d/wk (trained) | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/12618576/ | match |
| Lopez 2021: experience moderates | Untrained grew more; trained gained more with more sessions | Untrained greater (p=0.033); some-background + more sessions (p=0.031–0.045) | Abstract, PMC8126497 | match |
| Refalo 2025 (sex differences) | 29 studies, ages 18–45; SMD 0.19 favouring males (absolute); not influenced by experience | Same; relative change 0.69% (−1.50 to 2.88) | Abstract, PMC11869894 | match |
| Steele 2017 | n=141; SEM 2.64–3.38 reps; accuracy tends to improve with experience | Same | Abstract, PMC5712461 | match |
| Currier 2023 | (as T10) | 119 studies, n=3,364 | PMC10579494 | match |

### 13b. Session length

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Androulakis-Korakakis 2020 | 6 studies; single set of 6–12 reps, 2–3×/wk; +12.09 kg (8.16–16.03) | 6 studies; pooled from 5; conclusion: 1 set of 6–12 reps at ~70–85% 1RM 2–3×/wk, 8–12 wk | Abstract only, https://pubmed.ncbi.nlm.nih.gov/31797219/ | match |
| Schoenfeld 2019 (volume): minimal time | Trained men gained strength with three ~13-min sessions/wk | Abstract: 1-set group ~13 min/session gained strength | Abstract, PMC6303131 | match |
| Iversen 2021: time-saving techniques | Supersets, drop sets and rest-pause roughly halve time while keeping volume | Same, verbatim key point | Key points and Results, PMC8449772 | match |
| Paz 2017 | n=15 trained men; paired sets | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/28933712/ | match |
| Weakley 2017 | n=14 | Same | Abstract, PMC5556132 | match |
| Krzysztofik 2019 | Review of 30 studies | 30 studies met criteria | Results, PMC6950543 | match |

### 13c. Equipment

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Kikuchi 2017 | n=18, 8 wk; push-ups ≈ 40% 1RM bench | Same (n=9+9, 2×/wk) | Abstract and Results, PMC5812864 | match |
| Calatayud 2015 | n=30 trained, 5 wk, 6RM bench vs band push-up; similar strength | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/24983847/ | match |
| Lopes 2019 | 8 studies; SMD −0.11 (lower), 0.09 (upper) | Same | Abstract and Results, PMC6383082 | match |
| Lasevicius 2018 | n=30, 12 wk; 20% 1RM grew less: VL +8.9% vs +19.5%, EF +11.4% vs +25.0% (80%) | Same (EF 25%) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/29564973/ | match |
| Kotarsky 2018 | 4 wk, no change in muscle thickness | n=23, 4 wk, no MT change | Abstract only, https://pubmed.ncbi.nlm.nih.gov/29466268/ | match |

No fixes needed in 13a–13c.

## 14. Rep-range and RIR accuracy by experience level

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Halperin 2022 | 12 studies, 414 participants; ~1 rep underestimate; ≤12 reps more accurate; experience little effect | 0.95 reps (0.17–1.73), I² 97.9%; ≤12 reps β 0.06 vs >12 β 0.47; training status β −0.006 | Abstract only (OA PDF blocked), https://pubmed.ncbi.nlm.nih.gov/34542869/ | match |
| Halperin / Armes / Refalo: one-line answer | "misjudge reps left by about one to two" | Pooled 0.95 (Halperin); 2.0 (Armes); 0.65 absolute (Refalo 2024) | As in rows here | match |
| Armes 2020 | n=14 and n=24, ≥1 yr; ~2.0 reps (0.0–4.0) | Same | Abstract, PMC7785525 | match |
| Remmert 2023a | 27 men, 31 women; no effect of sex or experience | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/37036795/ | match |
| Remmert 2023b | n=9, 6 wk, 3×/wk; no improvement over time | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/37436724/ | match |
| Refalo 2024 (JSCR) | 12 M + 12 W, 75% 1RM; raw −0.17 ± 1.00, absolute 0.65 ± 0.78 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/37967832/ | match |
| Ormsbee 2019 | 14 (4.7 yr) vs 13 (1.1 yr); RPE at 1RM 9.86 vs 9.35 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/28301439/ | match |
| Emanuel 2022 | 259 coaches; errors 4.8/2.0/1.2 at 33/66/90% of set | Same | Abstract, PMC9588140 | match |
| Hackett 2022 | n=20 trained males | Same | Abstract, PMC8877029 | match |
| Martínez-Rubio 2025 | n=28; ≤1 rep near failure; less accurate at 5 RIR with generic profiles | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/40125884/ | match |
| Chen 2026 | n=19 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/42328880/ | match |
| Refalo 2025 (EJSS) | n=18, 8 wk, failure vs 1–2 RIR | 12 M + 6 W, 8 wk, 2×/wk; 2-RIR/1-RIR | Abstract, PMC11832030 | match |
| Refalo 2024 (J Sports Sci), research note | Failure vs 1–2 RIR similar hypertrophy | n=18, 8 wk; 0.181 vs 0.182 cm | Abstract only, https://pubmed.ncbi.nlm.nih.gov/38393985/ | match |
| Steele 2017 | (as 13a) n=141, SEM 2.64–3.38 | Same | PMC5712461 | match |

No fixes needed.

## 15. Deloads and fatigue management

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| Coleman 2024 | 29 M + 10 W trained, 9 wk, 1-wk full break at midpoint; similar size, slightly less strength | Same | Abstract and Results, PMC10809978 | match |
| Pancar 2026 | n=19 untrained, 8 wk; weeks 4 and 8 cut to 1 session × 2 sets vs 6–8 sets 2×/wk; similar gains | Same | Abstract, PMC13031491 | match |
| Ogasawara 2013 | n=14, 24 wk; 6-wk blocks with 3-wk breaks ≈ continuous | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/23053130/ | match |
| Ogasawara 2011 | n=15, 15 wk; 3-wk break after 6 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/21771261/ | match |
| Vann 2021 | n=30 trained; 6 wk; active recovery ~15% of volume | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/34138821/ | match |
| Bosquet 2013 | 103 studies; maximal force SMD −0.46 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/23347054/ | match |
| Bell 2023 (Delphi) | 21–34 coaches | 34 → 29 → 21 across rounds | Abstract, PMC10511399 | match |
| Rogerson 2024 | 246 athletes; 6.4 ± 1.7 days every 5.6 ± 2.3 wk | Same | Abstract, PMC10948666 | match |
| Bell 2022 | 18 coaches; 5–7 days every 4–6 wk | Same | Abstract, PMC9811819 | match |
| De Marco 2024 | 204 coaches; 0–25% cuts in volume and intensity | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/39446750/ | match |
| Enes 2026 | n=31, 12 wk | Same | Abstract, PMC13551339 | match |
| Bell 2022 / Rogerson 2024: typical deload | (a) about a week every 4–6 weeks | 5–7 days every 4–6 wk; 6.4 days every 5.6 wk | As above | match |
| Bell 2022 / Rogerson 2024: app window | (b) "every 4–8 weeks"; (d) "the 4–8 week window comes from surveys of practice" | Surveys report 4–6 wk (Bell 2022) and 5.6 ± 2.3 wk (Rogerson 2024); none states 4–8 | Abstracts, PMC9811819, PMC10948666 | overstated |

Fixes:
- (d) → "Surveys report deloads roughly every 4–6 weeks (mean 5.6); the 4–8 week window is our product range built around that."

---

## Contradictions to hand off
(One line each. Not investigated here and not reflected in the verdicts.)

- **T2:** Refalo 2023 vs Robinson 2024. A trivial, non-linear failure effect vs a continuous RIR dose-response for hypertrophy.
- **T4:** Schoenfeld 2016 (frequency) vs Schoenfeld 2019 (frequency). 2×/wk beat 1×/wk vs no frequency effect once volume is equated.
- **T6:** Singer 2024 vs Schoenfeld 2016 (rest) and the product decision. No detected growth gain beyond 90 s vs 3-min rest outgrowing 1-min, and the app's 2–3 min for every exercise.
- **T7:** Wolf 2023 vs Pedrosa 2022 and Kassiano 2023. The main ROM model slightly favours full ROM vs trials where lengthened partials beat full ROM.
- **T10:** Schoenfeld 2019 (volume) and Brigatto 2022 vs Heaselgrave 2019, Aube 2022 and Enes 2024. Graded volume benefit vs no significant difference at higher weekly sets.
- **T10/T11:** Gentil 2015 vs Mannarino 2021. Lat pulldown ≈ full biceps stimulus vs rows ≈ half.
- **T12:** Kumar 2012 vs Terzis 2010. Acute signalling and MPS plateau at moderate sets vs a dose-dependent rise with more sets.
- **T13a/T14:** Steele 2017 vs Halperin 2022, Remmert 2023a and Refalo 2024. RIR accuracy improves with experience vs no clear experience effect.
- **T13a:** Lopez 2021 vs Refalo 2025 (sex differences). Training background moderates hypertrophy vs outcomes not influenced by RT experience.


---

## Pass 2 (2026-10-29): new and expanded claims

- **Scope:** Only numeric claims that are new or changed in the final `evidence.md` compared with `.emrys/evidence-pass1-snapshot.md`. That covers new citations, changed numbers in existing citations, n/duration tags, and new numbers in (a)/(b)/(d) and research notes. Pass-1 rows above are unchanged.
- **Method:** Same as pass 1. I used open-access full text where it exists (PMC or Europe PMC), otherwise the PubMed or publisher abstract, marked "abstract only". No figures are invented.
- **Verdict mapping:** match = ok; mismatch or overstated = fix; can't verify = unclear.
- **Pass-2 counts:** match 95 · mismatch 2 · overstated 3 · can't verify 3 (total 103 rows)
- **HOLD respected:** this pass does not comment on the T6 "2–3 min" / "beneficial" wording tied to Singer 2024. T6 rows check figures only.

### P2 · 1. Mechanical tension

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Mitchell 2012 (PubMed 22518835) | n=18, 10 wk; 30%-3 / 80%-3 / 80%-1: quad volume +6.8 / +7.2 / +3.2% | Same | Abstract, PMC3404827 | match |
| [P2] Morton 2016 (PubMed 27174923), changed text | 20–25 reps at ~30–50% 1RM vs 8–12 at ~75–90%, to failure; hormones did not predict growth | Same (HR n=24, LR n=25); no hormone–hypertrophy correlation | Abstract, PMC4967245 | match |
| [P2] Pareja-Blanco 2017 (PubMed 27038416), changed text | VL40 more VL+VI hypertrophy; VL20 similar strength with 40% fewer reps, larger jump gains | VL40 more vastus lateralis/intermedius hypertrophy; VL20 similar squat strength, CMJ 9.5% vs 3.5%, 40% fewer reps | Abstract only, https://pubmed.ncbi.nlm.nih.gov/27038416/ | match |
| [P2] Pareja-Blanco 2020 (PubMed 32049887) | n=64, 8 wk; VL hypertrophy p=0.06 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/32049887/ | match |
| [P2] Pareja-Blanco 2026 (PubMed 41872733) | n=158; 12 groups; 40–85% 1RM × VL 0–50% | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/41872733/ | match |
| [P2] Jukic 2023 (PubMed 36178597) | 19 + 18 studies; VL slope b=0.006 (CI 0.001–0.012) | Same | Full text, PMC9807551 | match |
| [P2] Myrholt 2023 (PubMed 36754062) + erratum (PubMed 36805934) | n=16 (7+9), 6 wk; 6 ± 6% difference; erratum Table 2 cm→mm, 20 Feb 2023 | Same; erratum confirms the Table 2 unit fix and correction date | Abstract only, https://pubmed.ncbi.nlm.nih.gov/36754062/; erratum https://doi.org/10.1123/ijspp.2023-0050 | match |
| [P2] Andersen 2024 (PubMed 34100789) | n=10, 9 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/34100789/ | match |
| [P2] Terada 2022 (PubMed 35622108) | n=27, 8 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/35622108/ | match |
| [P2] Roberts 2023 (PubMed 37382939) | Review figures as cited | Same | Abstract, PMC10625844 (full-text XML failed) | match |

No fixes needed.

### P2 · 2. Proximity to failure / RIR

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Martorelli 2017 (PubMed 28713535): RNF group gain | RNF "+3.9%" given alongside the 10-wk values | RNF +3.9% at 5 wk; **+2.1% at 10 wk** | Abstract and Results, PMC5505097 | mismatch |
| [P2] Vasconcelos 2026 arms (PubMed 42617172) | n=19 (11 men, 8 women), 8 wk; diff 0.032 cm (HDI −0.044 to 0.113) | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/42617172/ | match |
| [P2] Vasconcelos 2026 legs (PubMed 42784046) | n=19, 8 wk; diff −0.019 cm (HDI −0.094 to 0.054) | Same | Abstract, PMC13609929 | match |
| [P2] Santanielo 2020 (PubMed 33343066) | n=14, 10 wk; +13.5% / +18.1% | Same | Full text, PMC7725035 | match |
| [P2] Nóbrega 2018 (PubMed 29189407) | n=32, 12 wk; +6.1–7.5% | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/29189407/ | match |
| [P2] Lacerda 2020 (PubMed 31809457) | n=10, 14 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/31809457/ | match |
| [P2] Hermann 2025 (PubMed 40249908) | n=42, 8 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/40249908/ | match |
| [P2] Refalo 2023 (PubMed 36334240), added subgroup | ES 0.19 (0.00–0.37); momentary failure ES 0.12 (−0.13 to 0.37) | Same (p=0.045; subgroup p=0.343) | Abstract, PMC9935748 | match |
| [P2] Grgic 2022 (PubMed 33497853), added numbers | Hypertrophy ES 0.22 (−0.11 to 0.55); trained 0.15 (0.03–0.26) | Same | Full text (Europe PMC) | match |
| [P2] Refalo 2024 (PubMed 38393985), added numbers | Quad thickness +0.181 vs +0.182 cm | FAIL 0.181 cm (HDI 0.119–0.243), RIR 0.182 cm (0.115–0.247) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/38393985/ | match |
| [P2] Lasevicius 2022 (PubMed 31895290), added numbers | At 30% 1RM, stopping at ~20 of ~34 reps: +2.8% vs +7.8%; at 80% failure added nothing | LL-RNF ~19.6 vs LL-RF ~34.4 reps; CSA 2.8% (n.s.) vs 7.8%; HL-RF 8.1% vs HL-RNF 7.7% | Abstract only, https://pubmed.ncbi.nlm.nih.gov/31895290/ | match |
| [P2] Halperin 2022 → T2 body "logged 2 RIR ≈ 3" | Underestimate ~1 rep (pooled 0.95, CI 0.17–1.73), so 2 RIR ≈ 3 RIR | Pooled 0.95 reps (95% CI 0.17–1.73) | Abstract, PubMed 34542869 (verified pass 1) | match |
| [P2] T2 (d) trial sizes | Trained-lifter trials n≈14–42; Refalo 2024 / Vasconcelos ~18–19 people, 8 wk | Santanielo 14 … Hermann 42; Refalo 2024 18; Vasconcelos 19; all 8 wk | As cited rows | match |

Fixes:
- Martorelli 2017: "+3.9%" → "+2.1% at 10 wk (+3.9% at 5 wk)".

### P2 · 3. Load and rep range

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Bello 2025 (PubMed 41562735) | "similar muscle thickness at all sites" | Similar at most sites, but a group×time interaction for triceps brachii (p=0.04) | Full text, PMC12821511 | overstated |
| [P2] Lasevicius 2018 (PubMed 29564973) | n=30 men, 12 wk; 20% 1RM suboptimal: VL +8.9% vs +19.5% (80%), elbow flexors +11.4% vs +25.0% | Same (EF 25%) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/29564973/ | match |
| [P2] Schoenfeld 2017 load (PubMed 28834797), changed text | Low ≤60% vs high >60% 1RM | Same inclusion definitions | Abstract only, https://pubmed.ncbi.nlm.nih.gov/28834797/ | match |
| [P2] Schoenfeld 2015 load (PubMed 25853914), changed text | 25–35 vs 8–12 reps | Same (n=9 per group) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/25853914/ | match |
| [P2] Carvalho 2022 (PubMed 35015560) | Figures as cited | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/35015560/ | match |
| [P2] Cumming 2025 (PubMed 40827709) | n=14, 9 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/40827709/ | match |
| [P2] Jenkins 2017 (PubMed 28611677) | n=26, 6 wk | Same | Full text, PMC5447067 | match |
| [P2] Schoenfeld 2021 (PubMed 33671664) | Figures as cited | Same | Full text, PMC7927075 | match |
| [P2] Hammert 2026 (PubMed 42319300) | n=201, 6 wk; ~0.30 vs ~0.20 cm | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/42319300/ | match |
| [P2] Lopez 2021 corrigendum (PubMed 35029596) | Corrected Figure 4 strength ES for 3 studies (Morton 2016, Jenkins 2017, Ozaki 2018); conclusions unchanged | Publisher/PubMed page gives only the title; content not readable (Europe PMC XML failed) | https://doi.org/10.1249/MSS.0000000000002838 | can't verify |
| [P2] T3 "~30% 1RM" light condition | Most trials used ~30% 1RM (Mitchell, Jenkins, …); no tested cut-off claimed | Mitchell 30%, Jenkins 30%, Lasevicius 2022 30% | As cited rows | match |

Fixes:
- Bello 2025: "similar muscle thickness at all sites" → "similar at all sites except triceps brachii (group×time p=0.04)".

### P2 · 4. Frequency

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Ramos-Campo 2024 (PubMed 38595233) | 14 studies, n=392; MD −0.08 (k=5) | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/38595233/ | match |
| [P2] Saric 2019 (PubMed 30363041) | n=27, 6 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/30363041/ | match |
| [P2] Gomes 2019 (PubMed 29489727) | n=23, 8 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/29489727/ | match |
| [P2] Evangelista 2021 (PubMed 34468591) | n=67, 8 wk | Same | Full text, PMC8372753 | match |
| [P2] Schoenfeld 2015 frequency (PubMed 25932981): content | Split vs full-body figures as cited | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/25932981/ | match |
| [P2] Schoenfeld 2015 frequency: tag duration | "8 wk" | Duration not stated in the abstract | Abstract only, link above | can't verify |
| [P2] Lasevicius 2019 (PubMed 31531139) | 36 / 28, 10 wk | Same | Full text, PMC6724585 | match |
| [P2] Yue 2018 (PubMed 29216446) | n=18, 6 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/29216446/ | match |
| [P2] Schoenfeld 2016 frequency (PubMed 27102172), changed text | ES 0.49 vs 0.30; mostly not volume-equated | 0.49 ± 0.08 vs 0.30 ± 0.07 (p=0.002); session-frequency analysis with matched per-muscle frequency could not be done | Abstract only, https://pubmed.ncbi.nlm.nih.gov/27102172/ | match |
| [P2] T4 (d) study counts | Schoenfeld 2019 25 · Ramos-Campo 14 · Pelland 67 studies | Same | Abstracts | match |

No fixes needed. Optional: add "8 wk" from the Schoenfeld 2015 full text or mark it "duration from full text".

### P2 · 5. Volume per session

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Krieger 2010 → T5 (a) new sentence | "2–3 sets per exercise built about 40% more muscle than single sets" | "Multiple sets are associated with 40% greater hypertrophy-related **ESs**" than 1 set. 2–3 vs 1 set: ES 0.34 vs 0.24, a trend (p=0.09; permutation p<0.01) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/20300012/ | overstated |
| [P2] Kassiano 2024 calves (PubMed 38684187) | "12 sets gave more gastrocnemius growth" | Lateral gastrocnemius +14.3 vs +8.1% (p=0.017), soleus and triceps-surae sum significant; medial gastrocnemius p=0.067 (n.s.) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/38684187/ | overstated |
| [P2] Radaelli 2015 (PubMed 25546444) | n=48, 6 months | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/25546444/ | match |
| [P2] Hammarström 2020 (PubMed 31813190) | n=34, 12 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/31813190/ | match |
| [P2] Barsuhn 2025 (PubMed 39665246) | 29 completers, 8 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/39665246/ | match |
| [P2] Scarpelli 2022 (PubMed 32108724) | n=16, 8 wk; 1.08 cm² | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/32108724/ | match |
| [P2] Schoenfeld 2019 volume (PubMed 30153194), T5/T12 note | 5 sets beat only 1 set significantly | 5-set group > 1-set group; 3-set group not significantly different from either | Abstract only, https://pubmed.ncbi.nlm.nih.gov/30153194/ | match |

Fixes:
- T5 (a): "2–3 sets … built about 40% more muscle than single sets" → "multiple sets gave about 40% larger hypertrophy effect sizes than single sets (Krieger 2010)".
- Kassiano 2024: "more gastrocnemius growth" → "more lateral gastrocnemius, soleus and total calf growth (medial gastrocnemius not significant)".

### P2 · 6. Rest intervals (figures only; framing on HOLD)

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Grgic 2017 (PubMed 28641044) | 6 studies; ≤60 s vs >60 s | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/28641044/ | match |
| [P2] Schoenfeld 2016 rest (PubMed 26605807) | n=21 trained men, 8 wk; 3 vs 1 min; triceps p=0.06; 1RM | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/26605807/ | match |
| [P2] Buresh 2009 (PubMed 19077743): arms | n=12 untrained men, 10 wk; 2.5 vs 1 min; arm CSA 12.3 vs 5.1% | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/19077743/ | match |
| [P2] Buresh 2009: thigh | "thigh CSA … did not differ" | Abstract reports arm CSA and strength only | Abstract only, link above | can't verify |
| [P2] Ahtiainen 2005 (PubMed 16095405) | n=13, 2 × 3 months; 2 vs 5 min | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/16095405/ | match |
| [P2] de Souza 2010 (PubMed 20543741) | n=20, 8 wk; MRI; shortening rest with less volume | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/20543741/ | match |
| [P2] Souza-Junior 2011 (PubMed 22032491) | n=22, 8 wk; with creatine | Same | Full text, PMC3215636 | match |
| [P2] Fink 2017 (PubMed 27984843) | n=21, 8 wk; 40% 1RM; 30 vs 150 s | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/27984843/ | match |
| [P2] Grgic 2018 (PubMed 28933024) | 23 studies, n=491; >2 min trained; 60–120 s untrained (strength) | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/28933024/ | match |
| [P2] Longo 2022 (PubMed 35622106) | n=28, 10 wk, 80% 1RM; 3 vs 1 min +13.1 vs +6.8% only when more volume load | LI 13.1%, VL-matched 1-min 12.9% > SI 6.8%, VL-matched 3-min 6.6%; 1RM n.s. | Abstract only, https://pubmed.ncbi.nlm.nih.gov/35622106/ | match |
| [P2] McMahon 2024 (PubMed 38953795) | n=8 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/38953795/ | match |
| [P2] Villanueva 2015 (PubMed 25294666) | n=22 older men; 8 wk after 4 wk; 60 s vs 4 min | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/25294666/ | match |
| [P2] Singer 2024 Table 2 (research note) | vs ≤60 s thigh: 61–119 s 0.13; 120–179 s 0.01; ≥180 s 0.32 (CrI −0.10 to 0.68); "highly uncertain" | Same | Full text, Table 2 (PubMed 39205815) | match |
| [P2] Research notes: Fink 2018 / Simão 2022 | Fink 2018 30 s + 20RM vs 3 min + 8RM; Simão 2022 75 s vs self-selected, n=33, 8 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/28032435/ ; https://pubmed.ncbi.nlm.nih.gov/32826830/ | match |

Fixes: Buresh 2009 thigh: cite the full text or drop "thigh CSA did not differ" (abstract has arms only).

### P2 · 7. Long muscle lengths / ROM

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Maeo 2021 (PubMed 33009197), changed text | Seated vs prone leg curl: whole hamstrings +14% vs +9% | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/33009197/ | match |
| [P2] Maeo 2023 (PubMed 35819335), changed tag/text | Untrained young adults (14 men, 7 women), n=21, 12 wk; whole TB +19.9 vs +13.9% (1.4-fold, d=0.54); long head +28.5 vs +19.6% (d=0.61) | Same; Methods: 14 males, 7 females, no systematic RT in prior 12 months | Abstract + publisher full text Methods, https://doi.org/10.1080/17461391.2022.2100279 | match |
| [P2] Kinoshita 2023 (PubMed 38156065) | n=14, 12 wk | Same | Full text, PMC10753835 | match |
| [P2] Maeo 2024 (PubMed 38857522) | n=42, 14/group, 12 wk | Same | Full text, PMC11419281 | match |
| [P2] Pedrosa 2023 (PubMed 36828324) | n=19, 8 wk | Same | Full text, PMC9960616 | match |
| [P2] Pedrosa 2025 (PubMed 40366729) | n=50 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/40366729/ | match |
| [P2] McMahon 2026 (PubMed 42392615) | n=45, 8 wk; 55 vs 80% | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/42392615/ | match |
| [P2] Havers 2025 (PubMed 41247250) | n=13, 8 wk | Same | Full text, PMC12621570 | match |
| [P2] Goli 2026 (PubMed 42006449) | n=16, 10 wk | Same | Full text, PMC13075556 | match |
| [P2] Kassiano 2023 ROM review (PubMed 37015016) | 11 studies | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/37015016/ | match |
| [P2] Pedrosa 2026 review (PubMed 41777276) | Figures as cited | Same | Full text, PMC12951042 | match |
| [P2] Wolf 2025 (PubMed 39959841) | n=30, 8 wk | Same | Full text, PMC11829627 | match |
| [P2] Gschneidner 2025 (PubMed 41055237) | 163/134, 12 wk; equivalence p arm 0.071, thigh 0.019 vs alpha 0.005 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/41055237/ | match |
| [P2] Plotkin 2026 (PubMed 42841600) | 16 + 8, 8 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/42841600/ | match |
| [P2] Larsen 2025 leg press (PubMed 40113586) | n=23, 8 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/40113586/ | match |
| [P2] Varovic 2025 (PubMed 40911904) | n=23, 6 wk; −0.20 cm (HDI −0.54 to 0.16) | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/40911904/ | match |

No fixes needed.

### P2 · 8. Exercise selection

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Amanuma 2025 (PubMed 41316621) | n=8, 9 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/41316621/ | match |
| [P2] Kinoshita 2026 (PubMed 41630124) | n=17, 12 wk; 13.2 vs 1.1% | Same | Full text, PMC13215645 | match |
| [P2] Kassiano 2025 curls (PubMed 39794667) | n=63, 8 wk; 0.08 cm | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/39794667/ | match |
| [P2] Kobayashi 2026 (PubMed 42829982) | n=21, 12 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/42829982/ | match |
| [P2] Attarieh 2026 (PubMed 42842490) | n=17, 10 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/42842490/ | match |
| [P2] Kassiano 2025 uni/bi review (PubMed 39388663) | 9 studies; ES −0.21 | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/39388663/ | match |
| [P2] Kassiano 2025 varied (PubMed 39809454) | n=70, 10 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/39809454/ | match |
| [P2] Saeterbakken 2019 (PubMed 30934001) | n=59, 7 + 3 wk | Same | Full text, PMC6443166 | match |
| [P2] Schwanbeck 2020 (PubMed 32358310), changed tag | 20 men, 26 women, n=46, 8 wk | 46 subjects (26 women), 8 wk | Abstract only, https://pubmed.ncbi.nlm.nih.gov/32358310/ | match |
| [P2] Behm 2002 / Anderson 2004 → T8 (a) "force ~20–70% lower" | Unstable-surface force ~20–70% lower | Behm: 70.5% and 20.2% lower; Anderson: 59.6% lower | Abstract only, https://pubmed.ncbi.nlm.nih.gov/12173956/ ; https://pubmed.ncbi.nlm.nih.gov/15320684/ | match |
| [P2] Kassiano 2026 squat vs LE (PubMed 41379528), changed text | n=63, 8 wk; RF proximal +11.4 vs +2.0%; VL distal +18.2 vs +11.2%; Smith back-squat 3RM +46.7 vs +21.3% | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/41379528/ | match |

No fixes needed.

### P2 · 9. Progressive overload

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Ferrari 2026 (PubMed 42880344) | n=31, 12 wk; CSA +3.36 vs +2.67 cm²; no difference at any single time point; sessions 18–24 favoured progression (1.22 cm²); constant leg ~4 RIR (4.08) | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/42880344/ | match |
| [P2] Kassiano 2026 MSSE (PubMed 41718594) → (d) "roughly doubled" | n=55, 8 wk; triceps sum +22.9% (+0.79 cm) vs +11.6% (+0.41 cm), control +1.8% | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/41718594/ | match |

No fixes needed.

### P2 · 12–13. Per-session volume, efficiency, equipment

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Ochi 2018 (PubMed 30013480): duration | 11 wk training + detraining; n=20 | 11 wk + 6 wk detraining; n=10 + 10 | Full text (Europe PMC) | match |
| [P2] Ochi 2018: tag population | "untrained young adults (~22 y)" | "Twenty healthy male college students" (age 22.3), untrained | Full text Methods (Europe PMC); abstract says "untrained subjects" | mismatch |
| [P2] Amirthalingam 2017 (PubMed 27941492) | n=19 men, 6 wk; trunk p=0.043 (ES −0.21); arm p=0.083 (ES −0.25), not significant; authors suggest 4–6 sets | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/27941492/ | match |
| [P2] T12 (a) "5 to 10 sets … slightly less trunk lean mass" | Doubling 5→10 sets gave no extra growth; slightly less trunk lean mass in one trial | Amirthalingam: 5-SET > 10-SET for trunk lean mass (p=0.043) | As above | match |
| [P2] Zhang 2025 (PubMed 39903375) | 19 studies, 313 participants; hypertrophy SMD −0.05; strength 0.10; reps −0.03; volume load 0.05; RPE higher | Same; full text notes 16 studies were acute-only | Full text, PMC12011898 | match |
| [P2] Lopes 2019 + corrigendum | 7 studies (corrected from 8); lower −0.11, upper 0.09 | Corrigendum: 8→7 studies; swapped limb labels; lower −0.11, upper 0.09 | https://doi.org/10.1177/2050312120961220 | match |
| [P2] Kotarsky 2018 (PubMed 29466268) | Moderately trained men, n=23, 3×/wk, 4 wk; MT no significant change | Same (PUSH 14, BENCH 9) | Abstract only, https://pubmed.ncbi.nlm.nih.gov/29466268/ | match |
| [P2] Kataoka 2026 (PubMed 42647752), research note | n=105 untrained, 6 wk | Same | Abstract only, https://pubmed.ncbi.nlm.nih.gov/42647752/ | match |

Fixes:
- Ochi 2018 tag/text: "untrained young adults" → "untrained young men (college students)".

### P2 · 15. Deloads

| Claim | What evidence.md says | What the paper says | Where in the paper | Verdict |
|---|---|---|---|---|
| [P2] Bell 2022 / Rogerson 2024 → (d) survey intervals | ~4–6 wk (Bell 2022); 5.6 ± 2.3 wk (Rogerson 2024); 4–8 wk labelled a product range | 4–6 wk; 5.6 ± 2.3 wk | Abstracts, PMC9811819 / PMC10948666 | match |

No fixes needed.

### P2 · n/duration tags (all citations, compact)

197 tags were auto-checked against the abstract or full text (word numbers and subgroup sums handled).

| Result | Tags |
|---|---|
| OK, n and duration found | All except the rows below (e.g., Myrholt 16 = 7+9; Ahtiainen 2003 16 = 8+8; Remmert 58 = 27+31; Martínez-Rubio 4 sessions = 2×2 modes; Larsen 2025 "eightweek") |
| OK, "not stated in abstract" is accurate | Pedrosa 2022 and 2025 duration; Zabaleta-Korta; Rauch; Shattock; Robinson study count |
| Can't verify | Schoenfeld 2015 frequency "8 wk" (not in abstract) |
| Wrong population | Ochi 2018 "young adults" → young men (n and duration correct) |
| Wrong n/duration | None |

### P2 · model / product-rule labels

Confirmed labelled as model or product rule: T1 ~5 effective reps; T2 RIR split by exercise type; T3 ~30% (no tested cut-off); T4 split-to-day pairings; T5 2–4 / 3–8 sets; T8 "1–2 exercises per muscle"; T12 "5 to 10 sets" (describes German Volume Training designs); T15 4–8 wk product range. All match.

### Pass 2 contradictions to hand off
(One line each. Already tagged "contradicting — under review" in evidence.md. Not investigated, and not in the verdicts.)

- **T1:** Andersen 2024 and Terada 2022 vs the velocity-loss trials (Pareja-Blanco 2017/2020/2026, Jukic 2023).
- **T2:** Grgic 2022, Hermann 2025 and Martorelli 2017 vs the 1–3 RIR ≈ failure trials.
- **T3:** Hammert 2026 (light > heavy, untrained arms) and Lasevicius 2018 (20% 1RM suboptimal) vs load equivalence.
- **T4:** Schoenfeld 2015, Lasevicius 2019 and Yue 2018 vs frequency-neutral meta-analyses.
- **T5:** Barsuhn 2025 vs Scarpelli 2022.
- **T6:** Villanueva 2015 (60 s > 4 min, older men) vs longer-rest trials.
- **T7:** Wolf 2025, Gschneidner 2025, Plotkin 2026, Larsen 2025 (leg press) and Varovic 2025 vs the lengthened-position benefit.
- **T8:** Kassiano 2025 (varied) and Saeterbakken 2019 vs "prefer stable" and constant selection.
- **T9:** Ferrari 2026 vs Kassiano 2026 MSSE (size of the progression benefit).
- **T11:** Costa 2022 and Baz-Valle 2019.
- **T12:** Zaroni 2019 and Schoenfeld 2019 vs per-session caps.
- **T13a:** Refalo 2025 (sex differences).
- **T13c:** Kotarsky 2018 vs push-up hypertrophy evidence.
- **T14:** Steele 2017 vs Halperin 2022 / Remmert 2023 / Refalo 2024.
- **T15:** Bosquet 2013.
