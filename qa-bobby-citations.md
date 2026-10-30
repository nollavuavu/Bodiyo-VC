# Carlsen citation audit: evidence.md topics 9–15

- **Date:** Oct 29, 2026
- **Auditor:** Bobby (Grok Bot executor)
- **Scope:** Every entry in the **(c) Citations** list of topics 9 to 15 in `/workspace/carlsen/evidence.md`, using the doc's own `## N.` numbering (9 = Progressive overload … 15 = Deloads). Topic 13 has subsections 13a–13c, each with its own table. That gives 93 citation entries (83 unique papers; duplicates across topics are each listed). Papers named only in 'Research notes' are not formal citations; they were spot-checked in the appendix and are not counted.
- **Method:** I parsed each entry's authors, year, title, journal/volume/issue/pages, DOI and PMID. I fetched PubMed records with NCBI E-utilities efetch (XML) in batches, at well under 3 requests per second, and compared title, full author list (surname and initials, in order), issue year, journal, volume, issue, pages, DOI, publication types and CommentsCorrections (Erratum/Retraction/etc.). I fetched each DOI from Crossref `api.crossref.org/works/<doi>` and compared the title, then checked `update-to`, `updated-by` and `relation` for corrections and retractions; Crossref's `updated-by` includes Retraction Watch data. evidence.md was not edited.
- **Notes:** (1) Crossref's 'issued' year is often the online-first year (e.g., Pelland 2025, Kassiano squat 2025, Maeo 2022). evidence.md cites the issue year, which matches PubMed, so I did not count that as a mismatch. (2) Two 2026 'online ahead of print' entries (PMID 42873141, 42328880) have no volume or pages yet on PubMed, which matches how they are cited. (3) Zaroni 2019 is in supplement 'Suppl 1' per PubMed, which matches.

**Overall counts (93 entries):** OK 90 · mismatch 0 · not found 0 · retracted or corrected 3 · unverified 0

| Topic | OK | mismatch | not found | retracted or corrected | unverified |
|---|---|---|---|---|---|
| 9 | 11 | 0 | 0 | 0 | 0 |
| 10 | 14 | 0 | 0 | 0 | 0 |
| 11 | 13 | 0 | 0 | 0 | 0 |
| 12 | 10 | 0 | 0 | 0 | 0 |
| 13a | 5 | 0 | 0 | 1 | 0 |
| 13b | 7 | 0 | 0 | 0 | 0 |
| 13c | 6 | 0 | 0 | 2 | 0 |
| 14 | 13 | 0 | 0 | 0 | 0 |
| 15 | 11 | 0 | 0 | 0 | 0 |

## 9. Progressive overload and auto-regulation

| citation | status | what's wrong | source link |
|---|---|---|---|
| Kassiano W et al. (2026). *Progressive Overload Affects the Magnitude of Muscle Hypertrophy.* Medicine & Science in Sports & Exercise 58(7):1556-1565. doi:10.1249/MSS.0000000000003968, PMID 41718594 (line 165) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41718594/ ; https://api.crossref.org/works/10.1249/MSS.0000000000003968 |
| Kassiano W et al. (2026). *Progressive Overload and Muscle Hypertrophy: Its Relation to Muscle…* Journal of Strength and Conditioning Research. doi:10.1519/JSC.0000000000005659, PMID 42873141 (line 166) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42873141/ ; https://api.crossref.org/works/10.1519/JSC.0000000000005659 |
| Plotkin D et al. (2022). *Progressive overload without progressing load? The effects of load …* PeerJ 10:e14142. doi:10.7717/peerj.14142, PMID 36199287 (line 167) | OK | - | https://pubmed.ncbi.nlm.nih.gov/36199287/ ; https://api.crossref.org/works/10.7717/peerj.14142 |
| Chaves TS et al. (2024). *Effects of Resistance Training Overload Progression Protocols on St…* International Journal of Sports Medicine 45(7):504-510. doi:10.1055/a-2256-5857, PMID 38286426 (line 168) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38286426/ ; https://api.crossref.org/works/10.1055/a-2256-5857 |
| Helms ER et al. (2018). *RPE vs. Percentage 1RM Loading in Periodized Programs Matched for S…* Frontiers in Physiology 9:247. doi:10.3389/fphys.2018.00247, PMID 29628895 (line 169) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29628895/ ; https://api.crossref.org/works/10.3389/fphys.2018.00247 |
| Hickmott LM et al. (2022). *The Effect of Load and Volume Autoregulation on Muscular Strength a…* Sports Medicine - Open 8(1):9. doi:10.1186/s40798-021-00404-9, PMID 35038063 (line 170) | OK | - | https://pubmed.ncbi.nlm.nih.gov/35038063/ ; https://api.crossref.org/works/10.1186/s40798-021-00404-9 |
| Helms ER et al. (2018). *Rating of Perceived Exertion as a Method of Volume Autoregulation W…* Journal of Strength and Conditioning Research 32(6):1627-1636. doi:10.1519/JSC.0000000000002032, PMID 29786623 (line 171) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29786623/ ; https://api.crossref.org/works/10.1519/JSC.0000000000002032 |
| Helms ER et al. (2020). *Methods for Regulating and Monitoring Resistance Training.* Journal of Human Kinetics 74:23-42. doi:10.2478/hukin-2020-0011, PMID 33312273 (line 172) | OK | - | https://pubmed.ncbi.nlm.nih.gov/33312273/ ; https://api.crossref.org/works/10.2478/hukin-2020-0011 |
| Zourdos MC et al. (2016). *Novel Resistance Training-Specific Rating of Perceived Exertion Sca…* Journal of Strength and Conditioning Research 30(1):267-75. doi:10.1519/JSC.0000000000001049, PMID 26049792 (line 173) | OK | - | https://pubmed.ncbi.nlm.nih.gov/26049792/ ; https://api.crossref.org/works/10.1519/JSC.0000000000001049 |
| Mann JB et al. (2010). *The effect of autoregulatory progressive resistance exercise vs. li…* Journal of Strength and Conditioning Research 24(7):1718-23. doi:10.1519/JSC.0b013e3181def4a6, PMID 20543732 (line 174) | OK | - | https://pubmed.ncbi.nlm.nih.gov/20543732/ ; https://api.crossref.org/works/10.1519/JSC.0b013e3181def4a6 |
| Shattock K et al. (2022). *Autoregulation in Resistance Training: A Comparison of Subjective V…* Journal of Strength and Conditioning Research 36(3):641-648. doi:10.1519/JSC.0000000000003530, PMID 32058357 (line 175) | OK | - | https://pubmed.ncbi.nlm.nih.gov/32058357/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003530 |

## 10. Weekly hard sets per muscle

| citation | status | what's wrong | source link |
|---|---|---|---|
| Pelland JC et al. (2026). *The Resistance Training Dose Response: Meta-Regressions Exploring t…* Sports Medicine 56(2):481-505. doi:10.1007/s40279-025-02344-w, PMID 41343037 (line 192) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41343037/ ; https://api.crossref.org/works/10.1007/s40279-025-02344-w |
| Schoenfeld BJ et al. (2017). *Dose-response relationship between weekly resistance training volum…* Journal of Sports Sciences 35(11):1073-1082. doi:10.1080/02640414.2016.1210197, PMID 27433992 (line 193) | OK | - | https://pubmed.ncbi.nlm.nih.gov/27433992/ ; https://api.crossref.org/works/10.1080/02640414.2016.1210197 |
| Schoenfeld BJ et al. (2019). *Resistance Training Volume Enhances Muscle Hypertrophy but Not Stre…* Medicine & Science in Sports & Exercise 51(1):94-103. doi:10.1249/MSS.0000000000001764, PMID 30153194 (line 194) | OK | - | https://pubmed.ncbi.nlm.nih.gov/30153194/ ; https://api.crossref.org/works/10.1249/MSS.0000000000001764 |
| Brigatto FA et al. (2022). *High Resistance-Training Volume Enhances Muscle Thickness in Resist…* Journal of Strength and Conditioning Research 36(1):22-30. doi:10.1519/JSC.0000000000003413, PMID 31868813 (line 195) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31868813/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003413 |
| Heaselgrave SR et al. (2019). *Dose-Response Relationship of Weekly Resistance-Training Volume and…* International Journal of Sports Physiology and Performance 14(3):360-368. doi:10.1123/ijspp.2018-0427, PMID 30160627 (line 196) | OK | - | https://pubmed.ncbi.nlm.nih.gov/30160627/ ; https://api.crossref.org/works/10.1123/ijspp.2018-0427 |
| Aube D et al. (2022). *Progressive Resistance Training Volume: Effects on Muscle Thickness…* Journal of Strength and Conditioning Research 36(3):600-607. doi:10.1519/JSC.0000000000003524, PMID 32058362 (line 197) | OK | - | https://pubmed.ncbi.nlm.nih.gov/32058362/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003524 |
| Enes A et al. (2024). *Effects of Different Weekly Set Progressions on Muscular Adaptation…* Medicine & Science in Sports & Exercise 56(3):553-563. doi:10.1249/MSS.0000000000003317, PMID 37796222 (line 198) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37796222/ ; https://api.crossref.org/works/10.1249/MSS.0000000000003317 |
| Kubo K et al. (2019). *Effects of squat training with different depths on lower limb muscl…* European Journal of Applied Physiology 119(9):1933-1942. doi:10.1007/s00421-019-04181-y, PMID 31230110 (line 199) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31230110/ ; https://api.crossref.org/works/10.1007/s00421-019-04181-y |
| Kassiano W et al. (2026). *Comparison of Muscle Hypertrophy and Strength Adaptations Induced b…* Journal of Strength and Conditioning Research 40(4):367-376. doi:10.1519/JSC.0000000000005338, PMID 41379528 (line 200) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41379528/ ; https://api.crossref.org/works/10.1519/JSC.0000000000005338 |
| Gentil P et al. (2015). *Single vs. Multi-Joint Resistance Exercises: Effects on Muscle Stre…* Asian Journal of Sports Medicine 6(2):e24057. doi:10.5812/asjsm.24057, PMID 26446291 (line 201) | OK | - | https://pubmed.ncbi.nlm.nih.gov/26446291/ ; https://api.crossref.org/works/10.5812/asjsm.24057 |
| Mannarino P et al. (2021). *Single-Joint Exercise Results in Higher Hypertrophy of Elbow Flexor…* Journal of Strength and Conditioning Research 35(10):2677-2681. doi:10.1519/JSC.0000000000003234, PMID 31268995 (line 202) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31268995/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003234 |
| de França HS et al. (2015). *The effects of adding single-joint exercises to a multi-joint exerc…* Applied Physiology, Nutrition, and Metabolism 40(8):822-6. doi:10.1139/apnm-2015-0109, PMID 26244600 (line 203) | OK | - | https://pubmed.ncbi.nlm.nih.gov/26244600/ ; https://api.crossref.org/works/10.1139/apnm-2015-0109 |
| Currier BS et al. (2023). *Resistance training prescription for muscle strength and hypertroph…* British Journal of Sports Medicine 57(18):1211-1220. doi:10.1136/bjsports-2023-106807, PMID 37414459 (line 204) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37414459/ ; https://api.crossref.org/works/10.1136/bjsports-2023-106807 |
| Currier BS et al. (2026). *American College of Sports Medicine Position Stand. Resistance Trai…* Medicine & Science in Sports & Exercise 58(4):851-872. doi:10.1249/MSS.0000000000003897, PMID 41843416 (line 205) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41843416/ ; https://api.crossref.org/works/10.1249/MSS.0000000000003897 |

## 11. Exercise substitution

| citation | status | what's wrong | source link |
|---|---|---|---|
| Haugen ME et al. (2023). *Effect of free-weight vs. machine-based strength training on maxima…* BMC Sports Science, Medicine and Rehabilitation 15(1):103. doi:10.1186/s13102-023-00713-4, PMID 37582807 (line 222) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37582807/ ; https://api.crossref.org/works/10.1186/s13102-023-00713-4 |
| Schwanbeck SR et al. (2020). *Effects of Training With Free Weights Versus Machines on Muscle Mas…* Journal of Strength and Conditioning Research 34(7):1851-1859. doi:10.1519/JSC.0000000000003349, PMID 32358310 (line 223) | OK | - | https://pubmed.ncbi.nlm.nih.gov/32358310/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003349 |
| Larsen S et al. (2025). *Dumbbell versus cable lateral raises for lateral deltoid hypertroph…* Frontiers in Physiology 16:1611468. doi:10.3389/fphys.2025.1611468, PMID 40692697 (line 224) | OK | - | https://pubmed.ncbi.nlm.nih.gov/40692697/ ; https://api.crossref.org/works/10.3389/fphys.2025.1611468 |
| Larsen S et al. (2026). *The effects of shoulder extension angle on elbow flexor hypertrophy…* Frontiers in Physiology 17:1750722. doi:10.3389/fphys.2026.1750722, PMID 41988507 (line 225) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41988507/ ; https://api.crossref.org/works/10.3389/fphys.2026.1750722 |
| Maeo S et al. (2023). *Triceps brachii hypertrophy is substantially greater after elbow ex…* European Journal of Sport Science 23(7):1240-1250. doi:10.1080/17461391.2022.2100279, PMID 35819335 (line 226) | OK | - | https://pubmed.ncbi.nlm.nih.gov/35819335/ ; https://api.crossref.org/works/10.1080/17461391.2022.2100279 |
| Kassiano W et al. (2026). *Comparison of Muscle Hypertrophy and Strength Adaptations Induced b…* Journal of Strength and Conditioning Research 40(4):367-376. doi:10.1519/JSC.0000000000005338, PMID 41379528 (line 227) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41379528/ ; https://api.crossref.org/works/10.1519/JSC.0000000000005338 |
| Zabaleta-Korta A et al. (2021). *The role of exercise selection in regional Muscle Hypertrophy: A ra…* Journal of Sports Sciences 39(20):2298-2304. doi:10.1080/02640414.2021.1929736, PMID 34743671 (line 228) | OK | - | https://pubmed.ncbi.nlm.nih.gov/34743671/ ; https://api.crossref.org/works/10.1080/02640414.2021.1929736 |
| Costa BDV et al. (2021). *Does Performing Different Resistance Exercises for the Same Muscle …* International Journal of Sports Medicine 42(9):803-811. doi:10.1055/a-1308-3674, PMID 33440446 (line 229) | OK | - | https://pubmed.ncbi.nlm.nih.gov/33440446/ ; https://api.crossref.org/works/10.1055/a-1308-3674 |
| Costa BDV et al. (2022). *Does Varying Resistance Exercises for the Same Muscle Group Promote…* Journal of Strength and Conditioning Research 36(11):3032-3039. doi:10.1519/JSC.0000000000004042, PMID 35481889 (line 230) | OK | - | https://pubmed.ncbi.nlm.nih.gov/35481889/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004042 |
| Fonseca RM et al. (2014). *Changes in exercises are more effective than in loading schemes to …* Journal of Strength and Conditioning Research 28(11):3085-92. doi:10.1519/JSC.0000000000000539, PMID 24832974 (line 231) | OK | - | https://pubmed.ncbi.nlm.nih.gov/24832974/ ; https://api.crossref.org/works/10.1519/JSC.0000000000000539 |
| Baz-Valle E et al. (2019). *The effects of exercise variation in muscle thickness, maximal stre…* PLoS ONE 14(12):e0226989. doi:10.1371/journal.pone.0226989, PMID 31881066 (line 232) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31881066/ ; https://api.crossref.org/works/10.1371/journal.pone.0226989 |
| Rauch JT et al. (2020). *Auto-Regulated Exercise Selection Training Regimen Produces Small I…* Journal of Strength and Conditioning Research 34(4):1133-1140. doi:10.1519/JSC.0000000000002272, PMID 29016481 (line 233) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29016481/ ; https://api.crossref.org/works/10.1519/JSC.0000000000002272 |
| Kassiano W et al. (2022). *Does Varying Resistance Exercises Promote Superior Muscle Hypertrop…* Journal of Strength and Conditioning Research 36(6):1753-1762. doi:10.1519/JSC.0000000000004258, PMID 35438660 (line 234) | OK | - | https://pubmed.ncbi.nlm.nih.gov/35438660/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004258 |

## 12. Per-session limits

| citation | status | what's wrong | source link |
|---|---|---|---|
| Brigatto FA et al. (2019). *Effect of Resistance Training Frequency on Neuromuscular Performanc…* Journal of Strength and Conditioning Research 33(8):2104-2116. doi:10.1519/JSC.0000000000002563, PMID 29528962 (line 251) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29528962/ ; https://api.crossref.org/works/10.1519/JSC.0000000000002563 |
| Zaroni RS et al. (2019). *High Resistance-Training Frequency Enhances Muscle Thickness in Res…* Journal of Strength and Conditioning Research 33(Suppl 1):S140-S151. doi:10.1519/JSC.0000000000002643, PMID 31260419 (line 252) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31260419/ ; https://api.crossref.org/works/10.1519/JSC.0000000000002643 |
| Ochi E et al. (2018). *Higher Training Frequency Is Important for Gaining Muscular Strengt…* Frontiers in Physiology 9:744. doi:10.3389/fphys.2018.00744, PMID 30013480 (line 253) | OK | - | https://pubmed.ncbi.nlm.nih.gov/30013480/ ; https://api.crossref.org/works/10.3389/fphys.2018.00744 |
| Amirthalingam T et al. (2017). *Effects of a Modified German Volume Training Program on Muscular Hy…* Journal of Strength and Conditioning Research 31(11):3109-3119. doi:10.1519/JSC.0000000000001747, PMID 27941492 (line 254) | OK | - | https://pubmed.ncbi.nlm.nih.gov/27941492/ ; https://api.crossref.org/works/10.1519/JSC.0000000000001747 |
| Hackett DA et al. (2018). *Effects of a 12-Week Modified German Volume Training Program on Mus…* Sports. doi:10.3390/sports6010007, PMID 29910312 (line 255) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29910312/ ; https://api.crossref.org/works/10.3390/sports6010007 |
| Schoenfeld BJ et al. (2019). *Resistance Training Volume Enhances Muscle Hypertrophy but Not Stre…* Medicine & Science in Sports & Exercise 51(1):94-103. doi:10.1249/MSS.0000000000001764, PMID 30153194 (line 256) | OK | - | https://pubmed.ncbi.nlm.nih.gov/30153194/ ; https://api.crossref.org/works/10.1249/MSS.0000000000001764 |
| Alvarez M et al. (2026). *Don't Sweat the Swelling: Exercise Volume's Transient Effects in Tr…* International Journal of Sports Medicine 47(8):588-598. doi:10.1055/a-2791-5145, PMID 41565215 (line 257) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41565215/ ; https://api.crossref.org/works/10.1055/a-2791-5145 |
| Pelland JC et al. (2026). *The Resistance Training Dose Response: Meta-Regressions Exploring t…* Sports Medicine 56(2):481-505. doi:10.1007/s40279-025-02344-w, PMID 41343037 (line 258) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41343037/ ; https://api.crossref.org/works/10.1007/s40279-025-02344-w |
| Kumar V et al. (2012). *Muscle protein synthetic responses to exercise: effects of age, vol…* The Journals of Gerontology, Series A: Biological Sciences and Medical Sciences 67(11):1170-7. doi:10.1093/gerona/gls141, PMID 22859389 (line 259) | OK | - | https://pubmed.ncbi.nlm.nih.gov/22859389/ ; https://api.crossref.org/works/10.1093/gerona/gls141 |
| Terzis G et al. (2010). *The degree of p70 S6k and S6 phosphorylation in human skeletal musc…* European Journal of Applied Physiology 110(4):835-43. doi:10.1007/s00421-010-1527-2, PMID 20617335 (line 260) | OK | - | https://pubmed.ncbi.nlm.nih.gov/20617335/ ; https://api.crossref.org/works/10.1007/s00421-010-1527-2 |

## 13a. Experience level

| citation | status | what's wrong | source link |
|---|---|---|---|
| Ahtiainen JP et al. (2003). *Muscle hypertrophy, hormonal adaptations and strength development d…* European Journal of Applied Physiology 89(6):555-63. doi:10.1007/s00421-003-0833-3, PMID 12734759 (line 279) | OK | - | https://pubmed.ncbi.nlm.nih.gov/12734759/ ; https://api.crossref.org/works/10.1007/s00421-003-0833-3 |
| Lopez P et al. (2021). *Resistance Training Load Effects on Muscle Hypertrophy and Strength…* Medicine & Science in Sports & Exercise 53(6):1206-1216. doi:10.1249/MSS.0000000000002585, PMID 33433148 (line 280) | retracted or corrected | Erratum in Med Sci Sports Exerc 2022;54(2):370 (doi:10.1249/MSS.0000000000002838, PMID 35029596), listed on PubMed and as a Crossref "updated-by: correction". Citation details otherwise match; evidence.md does not mention the correction. | https://pubmed.ncbi.nlm.nih.gov/33433148/ ; https://api.crossref.org/works/10.1249/MSS.0000000000002585 |
| Rhea MR et al. (2003). *A meta-analysis to determine the dose response for strength develop…* Medicine & Science in Sports & Exercise 35(3):456-64. doi:10.1249/01.MSS.0000053727.63505.D4, PMID 12618576 (line 281) | OK | - | https://pubmed.ncbi.nlm.nih.gov/12618576/ ; https://api.crossref.org/works/10.1249/01.MSS.0000053727.63505.D4 |
| Refalo MC et al. (2025). *Sex differences in absolute and relative changes in muscle size fol…* PeerJ 13:e19042. doi:10.7717/peerj.19042, PMID 40028215 (line 282) | OK | - | https://pubmed.ncbi.nlm.nih.gov/40028215/ ; https://api.crossref.org/works/10.7717/peerj.19042 |
| Steele J et al. (2017). *Ability to predict repetitions to momentary failure is not perfectl…* PeerJ 5:e4105. doi:10.7717/peerj.4105, PMID 29204323 (line 283) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29204323/ ; https://api.crossref.org/works/10.7717/peerj.4105 |
| Currier BS et al. (2023). *Resistance training prescription for muscle strength and hypertroph…* British Journal of Sports Medicine 57(18):1211-1220. doi:10.1136/bjsports-2023-106807, PMID 37414459 (line 284) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37414459/ ; https://api.crossref.org/works/10.1136/bjsports-2023-106807 |

## 13b. Session length

| citation | status | what's wrong | source link |
|---|---|---|---|
| Iversen VM et al. (2021). *No Time to Lift? Designing Time-Efficient Training Programs for Str…* Sports Medicine 51(10):2079-2095. doi:10.1007/s40279-021-01490-1, PMID 34125411 (line 299) | OK | - | https://pubmed.ncbi.nlm.nih.gov/34125411/ ; https://api.crossref.org/works/10.1007/s40279-021-01490-1 |
| Schoenfeld BJ et al. (2019). *Resistance Training Volume Enhances Muscle Hypertrophy but Not Stre…* Medicine & Science in Sports & Exercise 51(1):94-103. doi:10.1249/MSS.0000000000001764, PMID 30153194 (line 300) | OK | - | https://pubmed.ncbi.nlm.nih.gov/30153194/ ; https://api.crossref.org/works/10.1249/MSS.0000000000001764 |
| Androulakis-Korakakis P et al. (2020). *The Minimum Effective Training Dose Required to Increase 1RM Streng…* Sports Medicine 50(4):751-765. doi:10.1007/s40279-019-01236-0, PMID 31797219 (line 301) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31797219/ ; https://api.crossref.org/works/10.1007/s40279-019-01236-0 |
| Paz GA et al. (2017). *Volume Load and Neuromuscular Fatigue During an Acute Bout of Agoni…* Journal of Strength and Conditioning Research 31(10):2777-2784. doi:10.1519/JSC.0000000000001059, PMID 28933712 (line 302) | OK | - | https://pubmed.ncbi.nlm.nih.gov/28933712/ ; https://api.crossref.org/works/10.1519/JSC.0000000000001059 |
| Weakley JJS et al. (2017). *The effects of traditional, superset, and tri-set resistance traini…* European Journal of Applied Physiology 117(9):1877-1889. doi:10.1007/s00421-017-3680-3, PMID 28698987 (line 303) | OK | - | https://pubmed.ncbi.nlm.nih.gov/28698987/ ; https://api.crossref.org/works/10.1007/s00421-017-3680-3 |
| Krzysztofik M et al. (2019). *Maximizing Muscle Hypertrophy: A Systematic Review of Advanced Resi…* International Journal of Environmental Research and Public Health 16(24):4897. doi:10.3390/ijerph16244897, PMID 31817252 (line 304) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31817252/ ; https://api.crossref.org/works/10.3390/ijerph16244897 |
| Singer A et al. (2024). *Give it a rest: a systematic review with Bayesian meta-analysis on …* Frontiers in Sports and Active Living 6:1429789. doi:10.3389/fspor.2024.1429789, PMID 39205815 (line 305) | OK | - | https://pubmed.ncbi.nlm.nih.gov/39205815/ ; https://api.crossref.org/works/10.3389/fspor.2024.1429789 |

## 13c. Equipment

| citation | status | what's wrong | source link |
|---|---|---|---|
| Haugen ME et al. (2023). *Effect of free-weight vs. machine-based strength training on maxima…* BMC Sports Science, Medicine and Rehabilitation 15(1):103. doi:10.1186/s13102-023-00713-4, PMID 37582807 (line 320) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37582807/ ; https://api.crossref.org/works/10.1186/s13102-023-00713-4 |
| Schwanbeck SR et al. (2020). *Effects of Training With Free Weights Versus Machines on Muscle Mas…* Journal of Strength and Conditioning Research 34(7):1851-1859. doi:10.1519/JSC.0000000000003349, PMID 32358310 (line 321) | OK | - | https://pubmed.ncbi.nlm.nih.gov/32358310/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003349 |
| Kikuchi N et al. (2017). *Low-load bench press and push-up induce similar muscle hypertrophy …* Journal of Exercise Science & Fitness 15(1):37-42. doi:10.1016/j.jesf.2017.06.003, PMID 29541130 (line 322) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29541130/ ; https://api.crossref.org/works/10.1016/j.jesf.2017.06.003 |
| Calatayud J et al. (2015). *Bench press and push-up at comparable levels of muscle activity res…* Journal of Strength and Conditioning Research 29(1):246-53. doi:10.1519/JSC.0000000000000589, PMID 24983847 (line 323) | OK | - | https://pubmed.ncbi.nlm.nih.gov/24983847/ ; https://api.crossref.org/works/10.1519/JSC.0000000000000589 |
| Lopes JSS et al. (2019). *Effects of training with elastic resistance versus conventional res…* SAGE Open Medicine 7:2050312119831116. doi:10.1177/2050312119831116, PMID 30815258 (line 324) | retracted or corrected | Erratum in SAGE Open Med 2020;8:2050312120961220 (doi:10.1177/2050312120961220, PMID 32953119), listed on PubMed and as a Crossref "updated-by: correction". Citation details otherwise match; evidence.md does not mention the correction. | https://pubmed.ncbi.nlm.nih.gov/30815258/ ; https://api.crossref.org/works/10.1177/2050312119831116 |
| Schoenfeld BJ et al. (2017). *Strength and Hypertrophy Adaptations Between Low- vs. High-Load Res…* Journal of Strength and Conditioning Research 31(12):3508-3523. doi:10.1519/JSC.0000000000002200, PMID 28834797 (line 325) | OK | - | https://pubmed.ncbi.nlm.nih.gov/28834797/ ; https://api.crossref.org/works/10.1519/JSC.0000000000002200 |
| Lopez P et al. (2021). *Resistance Training Load Effects on Muscle Hypertrophy and Strength…* Medicine & Science in Sports & Exercise 53(6):1206-1216. doi:10.1249/MSS.0000000000002585, PMID 33433148 (line 326) | retracted or corrected | Erratum in Med Sci Sports Exerc 2022;54(2):370 (doi:10.1249/MSS.0000000000002838, PMID 35029596), listed on PubMed and as a Crossref "updated-by: correction". Citation details otherwise match; evidence.md does not mention the correction. | https://pubmed.ncbi.nlm.nih.gov/33433148/ ; https://api.crossref.org/works/10.1249/MSS.0000000000002585 |
| Lasevicius T et al. (2018). *Effects of different intensities of resistance training with equate…* European Journal of Sport Science 18(6):772-780. doi:10.1080/17461391.2018.1450898, PMID 29564973 (line 327) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29564973/ ; https://api.crossref.org/works/10.1080/17461391.2018.1450898 |

## 14. Rep-range and RIR accuracy

| citation | status | what's wrong | source link |
|---|---|---|---|
| Halperin I et al. (2022). *Accuracy in Predicting Repetitions to Task Failure in Resistance Ex…* Sports Medicine 52(2):377-390. doi:10.1007/s40279-021-01559-x, PMID 34542869 (line 344) | OK | - | https://pubmed.ncbi.nlm.nih.gov/34542869/ ; https://api.crossref.org/works/10.1007/s40279-021-01559-x |
| Steele J et al. (2017). *Ability to predict repetitions to momentary failure is not perfectl…* PeerJ 5:e4105. doi:10.7717/peerj.4105, PMID 29204323 (line 345) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29204323/ ; https://api.crossref.org/works/10.7717/peerj.4105 |
| Armes C et al. (2020). *"Just One More Rep!" - Ability to Predict Proximity to Task Failure…* Frontiers in Psychology 11:565416. doi:10.3389/fpsyg.2020.565416, PMID 33424678 (line 346) | OK | - | https://pubmed.ncbi.nlm.nih.gov/33424678/ ; https://api.crossref.org/works/10.3389/fpsyg.2020.565416 |
| Remmert JF et al. (2023). *Accuracy of Predicted Intraset Repetitions in Reserve (RIR) in Sing…* Perceptual and Motor Skills 130(3):1239-1254. doi:10.1177/00315125231169868, PMID 37036795 (line 347) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37036795/ ; https://api.crossref.org/works/10.1177/00315125231169868 |
| Remmert JF et al. (2023). *Changes in Intraset Repetitions in Reserve Prediction Accuracy Duri…* Perceptual and Motor Skills 130(5):2139-2160. doi:10.1177/00315125231189098, PMID 37436724 (line 348) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37436724/ ; https://api.crossref.org/works/10.1177/00315125231189098 |
| Refalo MC et al. (2024). *Accuracy of Intraset Repetitions-in-Reserve Predictions During the …* Journal of Strength and Conditioning Research 38(3):e78-e85. doi:10.1519/JSC.0000000000004653, PMID 37967832 (line 349) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37967832/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004653 |
| Zourdos MC et al. (2016). *Novel Resistance Training-Specific Rating of Perceived Exertion Sca…* Journal of Strength and Conditioning Research 30(1):267-75. doi:10.1519/JSC.0000000000001049, PMID 26049792 (line 350) | OK | - | https://pubmed.ncbi.nlm.nih.gov/26049792/ ; https://api.crossref.org/works/10.1519/JSC.0000000000001049 |
| Ormsbee MJ et al. (2019). *Efficacy of the Repetitions in Reserve-Based Rating of Perceived Ex…* Journal of Strength and Conditioning Research 33(2):337-345. doi:10.1519/JSC.0000000000001901, PMID 28301439 (line 351) | OK | - | https://pubmed.ncbi.nlm.nih.gov/28301439/ ; https://api.crossref.org/works/10.1519/JSC.0000000000001901 |
| Emanuel A et al. (2022). *Seeing Effort: Assessing Coaches' Prediction of the Number of Repet…* Sports Medicine - Open 8(1):132. doi:10.1186/s40798-022-00526-8, PMID 36273064 (line 352) | OK | - | https://pubmed.ncbi.nlm.nih.gov/36273064/ ; https://api.crossref.org/works/10.1186/s40798-022-00526-8 |
| Hackett DA et al. (2022). *The Influence of Muscular Strength and Local Muscular Endurance on …* Sports. doi:10.3390/sports10020027, PMID 35202066 (line 353) | OK | - | https://pubmed.ncbi.nlm.nih.gov/35202066/ ; https://api.crossref.org/works/10.3390/sports10020027 |
| Martínez-Rubio C et al. (2025). *Estimating repetitions in reserve through movement velocity: Applic…* Journal of Sports Sciences 43(10):956-968. doi:10.1080/02640414.2025.2481363, PMID 40125884 (line 354) | OK | - | https://pubmed.ncbi.nlm.nih.gov/40125884/ ; https://api.crossref.org/works/10.1080/02640414.2025.2481363 |
| Chen W et al. (2026). *Velocity-Based Monitoring Lacks Both Accuracy and Applicability for…* Journal of Strength and Conditioning Research. doi:10.1519/JSC.0000000000005549, PMID 42328880 (line 355) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42328880/ ; https://api.crossref.org/works/10.1519/JSC.0000000000005549 |
| Refalo MC et al. (2025). *The Effect of Proximity-To-Failure on Perceptual Responses to Resis…* European Journal of Sport Science 25(3):e12266. doi:10.1002/ejsc.12266, PMID 39960821 (line 356) | OK | - | https://pubmed.ncbi.nlm.nih.gov/39960821/ ; https://api.crossref.org/works/10.1002/ejsc.12266 |

## 15. Deloads and fatigue management

| citation | status | what's wrong | source link |
|---|---|---|---|
| Coleman M et al. (2024). *Gaining more from doing less? The effects of a one-week deload peri…* PeerJ 12:e16777. doi:10.7717/peerj.16777, PMID 38274324 (line 373) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38274324/ ; https://api.crossref.org/works/10.7717/peerj.16777 |
| Pancar Z et al. (2026). *Effects of deload periods in resistance training on muscle hypertro…* Scientific Reports 16(1):10299. doi:10.1038/s41598-026-40612-5, PMID 41730991 (line 374) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41730991/ ; https://api.crossref.org/works/10.1038/s41598-026-40612-5 |
| Ogasawara R et al. (2013). *Comparison of muscle hypertrophy following 6-month of continuous an…* European Journal of Applied Physiology 113(4):975-85. doi:10.1007/s00421-012-2511-9, PMID 23053130 (line 375) | OK | - | https://pubmed.ncbi.nlm.nih.gov/23053130/ ; https://api.crossref.org/works/10.1007/s00421-012-2511-9 |
| Ogasawara R et al. (2011). *Effects of periodic and continued resistance training on muscle CSA…* Clinical Physiology and Functional Imaging 31(5):399-404. doi:10.1111/j.1475-097X.2011.01031.x, PMID 21771261 (line 376) | OK | - | https://pubmed.ncbi.nlm.nih.gov/21771261/ ; https://api.crossref.org/works/10.1111/j.1475-097X.2011.01031.x |
| Vann CG et al. (2021). *Molecular Differences in Skeletal Muscle After 1 Week of Active vs.…* Journal of Strength and Conditioning Research 35(8):2102-2113. doi:10.1519/JSC.0000000000004071, PMID 34138821 (line 377) | OK | - | https://pubmed.ncbi.nlm.nih.gov/34138821/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004071 |
| Bosquet L et al. (2013). *Effect of training cessation on muscular performance: a meta-analys…* Scandinavian Journal of Medicine & Science in Sports 23(3):e140-9. doi:10.1111/sms.12047, PMID 23347054 (line 378) | OK | - | https://pubmed.ncbi.nlm.nih.gov/23347054/ ; https://api.crossref.org/works/10.1111/sms.12047 |
| Bell L et al. (2023). *Integrating Deloading into Strength and Physique Sports Training Pr…* Sports Medicine - Open 9(1):87. doi:10.1186/s40798-023-00633-0, PMID 37730925 (line 379) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37730925/ ; https://api.crossref.org/works/10.1186/s40798-023-00633-0 |
| Rogerson D et al. (2024). *Deloading Practices in Strength and Physique Sports: A Cross-sectio…* Sports Medicine - Open 10(1):26. doi:10.1186/s40798-024-00691-y, PMID 38499934 (line 380) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38499934/ ; https://api.crossref.org/works/10.1186/s40798-024-00691-y |
| Bell L et al. (2022). *"You can't shoot another bullet until you've reloaded the gun": Coa…* Frontiers in Sports and Active Living 4:1073223. doi:10.3389/fspor.2022.1073223, PMID 36619355 (line 381) | OK | - | https://pubmed.ncbi.nlm.nih.gov/36619355/ ; https://api.crossref.org/works/10.3389/fspor.2022.1073223 |
| De Marco K et al. (2024). *Resistance Training Prescription During Planned Deloading Periods: …* Journal of Strength and Conditioning Research 38(12):2099-2106. doi:10.1519/JSC.0000000000004932, PMID 39446750 (line 382) | OK | - | https://pubmed.ncbi.nlm.nih.gov/39446750/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004932 |
| Enes A et al. (2026). *Exploring the Dose-Response Relationship between Resistance-Trainin…* Journal of Human Kinetics 103:303-318. doi:10.5114/jhk/209051, PMID 42713159 (line 383) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42713159/ ; https://api.crossref.org/works/10.5114/jhk/209051 |

## Appendix: papers named in research notes (not counted)

| reference in notes | PubMed check | source link |
|---|---|---|
| Graham & Cleather 2021, JSCR, PMID 31009432 (topic 9) | Exists: Graham T, J Strength Cond Res 2021 | https://pubmed.ncbi.nlm.nih.gov/31009432/ |
| Bernárdez-Vázquez 2022, PMID 35873210 (topic 10) | Exists: Front Sports Act Living 2022 | https://pubmed.ncbi.nlm.nih.gov/35873210/ |
| Kataoka 2026, JSCR, PMID 42647752 (topic 11) | Exists: Kataoka R, J Strength Cond Res 2026 | https://pubmed.ncbi.nlm.nih.gov/42647752/ |
| Barbalho 2019, MSSE, PMID 30779716 (topic 12, 'retracted, do not use') | Confirmed: PubMed type 'Retracted Publication', Med Sci Sports Exerc 2019 | https://pubmed.ncbi.nlm.nih.gov/30779716/ |
| Burd 2010, PMID 20711498 (topic 12) | Exists: Burd NA, PLoS One 2010 | https://pubmed.ncbi.nlm.nih.gov/20711498/ |
| Kotarsky 2018, JSCR, PMID 29466268 (topic 13c) | Exists: Kotarsky CJ, J Strength Cond Res 2018 | https://pubmed.ncbi.nlm.nih.gov/29466268/ |
| Refalo 2024, J Sports Sci, PMID 38393985 (topic 14) | Exists: Refalo MC, J Sports Sci 2024 | https://pubmed.ncbi.nlm.nih.gov/38393985/ |
| Travis 2020, tapering review, PMID 32917000 (topic 15) | Exists: Travis SK, Sports (Basel) 2020, Review | https://pubmed.ncbi.nlm.nih.gov/32917000/ |


---

# Topics 1–8 (pass 1, evidence.md as of Oct 29 2026 17:57)

- **Date:** Oct 29, 2026
- **Scope:** Every entry in the **(c) Citations** list of topics 1 to 8, using the doc's own `## N.` numbering. Line numbers come from the frozen snapshot `/workspace/carlsen-scratch/evidence.pass1-snapshot.md` (copied 17:57 Helsinki time), not the live evidence.md, which Silas is still editing. That gives 28 entries (21 unique papers; repeats across topics are each listed). Machine-readable list for the pass 2 diff: `/workspace/carlsen-scratch/pass1-citations-1-8.json`.
- **Method:** Same as topics 9–15. I fetched PubMed records with NCBI E-utilities efetch (one batched call) and compared title, the author list as cited (surname and initials, in order), issue year, DOI, publication types and CommentsCorrections. I fetched each DOI from Crossref `api.crossref.org/works/<doi>` and compared the title, then checked `update-to`, `updated-by` and `relation`. These entries give no volume or pages, so I couldn't compare those. Wolf 2023 (IJSC) gives no PMID, so I checked it against Crossref only: title, all 5 authors, 2023, journal, vol 3(1).

**Counts (28 entries):** OK 27 · mismatch 0 · not found 0 · retracted or corrected 1 · unverified 0

| Topic | OK | mismatch | not found | retracted or corrected | unverified |
|---|---|---|---|---|---|
| 1 | 4 | 0 | 0 | 0 | 0 |
| 2 | 4 | 0 | 0 | 0 | 0 |
| 3 | 3 | 0 | 0 | 1 | 0 |
| 4 | 3 | 0 | 0 | 0 | 0 |
| 5 | 3 | 0 | 0 | 0 | 0 |
| 6 | 3 | 0 | 0 | 0 | 0 |
| 7 | 4 | 0 | 0 | 0 | 0 |
| 8 | 3 | 0 | 0 | 0 | 0 |

## 1. Mechanical tension, fiber recruitment and "effective reps" (pass 1)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Wackerhage H et al. (2019). *Stimuli and sensors that initiate skeletal muscle hypertrophy follo…* Journal of Applied Physiology. doi:10.1152/japplphysiol.00685.2018, PMID 30335577 (line 21) | OK | - | https://pubmed.ncbi.nlm.nih.gov/30335577/ ; https://api.crossref.org/works/10.1152/japplphysiol.00685.2018 | 1 |
| Morton RW et al. (2019). *Muscle fibre activation is unaffected by load and repetition durati…* The Journal of Physiology. doi:10.1113/JP278056, PMID 31294822 (line 22) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31294822/ ; https://api.crossref.org/works/10.1113/JP278056 | 1 |
| Morton RW et al. (2016). *Neither load nor systemic hormones determine resistance training-me…* Journal of Applied Physiology. doi:10.1152/japplphysiol.00154.2016, PMID 27174923 (line 23) | OK | - | https://pubmed.ncbi.nlm.nih.gov/27174923/ ; https://api.crossref.org/works/10.1152/japplphysiol.00154.2016 | 1 |
| Pareja-Blanco F et al. (2017). *Effects of velocity loss during resistance training on athletic per…* Scandinavian Journal of Medicine & Science in Sports. doi:10.1111/sms.12678, PMID 27038416 (line 24) | OK | - | https://pubmed.ncbi.nlm.nih.gov/27038416/ ; https://api.crossref.org/works/10.1111/sms.12678 | 1 |

## 2. Proximity to failure and reps in reserve (RIR) (pass 1)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Robinson ZP et al. (2024). *Exploring the Dose-Response Relationship Between Estimated Resistan…* Sports Medicine. doi:10.1007/s40279-024-02069-2, PMID 38970765 (line 39) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38970765/ ; https://api.crossref.org/works/10.1007/s40279-024-02069-2 | 1 |
| Refalo MC et al. (2023). *Influence of Resistance Training Proximity-to-Failure on Skeletal M…* Sports Medicine. doi:10.1007/s40279-022-01784-y, PMID 36334240 (line 40) | OK | - | https://pubmed.ncbi.nlm.nih.gov/36334240/ ; https://api.crossref.org/works/10.1007/s40279-022-01784-y | 1 |
| Grgic J et al. (2022). *Effects of resistance training performed to repetition failure or n…* Journal of Sport and Health Science. doi:10.1016/j.jshs.2021.01.007, PMID 33497853 (line 41) | OK | - | https://pubmed.ncbi.nlm.nih.gov/33497853/ ; https://api.crossref.org/works/10.1016/j.jshs.2021.01.007 | 1 |
| Lasevicius T et al. (2022). *Muscle Failure Promotes Greater Muscle Hypertrophy in Low-Load but …* Journal of Strength and Conditioning Research. doi:10.1519/JSC.0000000000003454, PMID 31895290 (line 42) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31895290/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003454 | 1 |

## 3. Load and rep range (pass 1)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Schoenfeld BJ et al. (2017). *Strength and Hypertrophy Adaptations Between Low- vs. High-Load Res…* Journal of Strength and Conditioning Research. doi:10.1519/JSC.0000000000002200, PMID 28834797 (line 57) | OK | - | https://pubmed.ncbi.nlm.nih.gov/28834797/ ; https://api.crossref.org/works/10.1519/JSC.0000000000002200 | 1 |
| Lopez P et al. (2021). *Resistance Training Load Effects on Muscle Hypertrophy and Strength…* Medicine & Science in Sports & Exercise. doi:10.1249/MSS.0000000000002585, PMID 33433148 (line 58) | retracted or corrected | Erratum in Med Sci Sports Exerc 2022;54(2):370 (doi:10.1249/MSS.0000000000002838, PMID 35029596), listed on PubMed and as a Crossref "updated-by: correction". Citation details otherwise match; the snapshot does not mention the correction. | https://pubmed.ncbi.nlm.nih.gov/33433148/ ; https://api.crossref.org/works/10.1249/MSS.0000000000002585 | 1 |
| Schoenfeld BJ et al. (2015). *Effects of Low- vs. High-Load Resistance Training on Muscle Strengt…* Journal of Strength and Conditioning Research. doi:10.1519/JSC.0000000000000958, PMID 25853914 (line 59) | OK | - | https://pubmed.ncbi.nlm.nih.gov/25853914/ ; https://api.crossref.org/works/10.1519/JSC.0000000000000958 | 1 |
| Morton RW et al. (2016). *Neither load nor systemic hormones determine resistance training-me…* Journal of Applied Physiology. doi:10.1152/japplphysiol.00154.2016, PMID 27174923 (line 60) | OK | - | https://pubmed.ncbi.nlm.nih.gov/27174923/ ; https://api.crossref.org/works/10.1152/japplphysiol.00154.2016 | 1 |

## 4. Training frequency per muscle and split choice (pass 1)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Schoenfeld BJ et al. (2019). *How many times per week should a muscle be trained to maximize musc…* Journal of Sports Sciences. doi:10.1080/02640414.2018.1555906, PMID 30558493 (line 75) | OK | - | https://pubmed.ncbi.nlm.nih.gov/30558493/ ; https://api.crossref.org/works/10.1080/02640414.2018.1555906 | 1 |
| Schoenfeld BJ et al. (2016). *Effects of Resistance Training Frequency on Measures of Muscle Hype…* Sports Medicine. doi:10.1007/s40279-016-0543-8, PMID 27102172 (line 76) | OK | - | https://pubmed.ncbi.nlm.nih.gov/27102172/ ; https://api.crossref.org/works/10.1007/s40279-016-0543-8 | 1 |
| Pelland JC et al. (2026). *The Resistance Training Dose Response: Meta-Regressions Exploring t…* Sports Medicine. doi:10.1007/s40279-025-02344-w, PMID 41343037 (line 77) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41343037/ ; https://api.crossref.org/works/10.1007/s40279-025-02344-w | 1 |

## 5. Volume: hard sets per session (pass 1)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Pelland JC et al. (2026). *The Resistance Training Dose Response: Meta-Regressions Exploring t…* Sports Medicine. doi:10.1007/s40279-025-02344-w, PMID 41343037 (line 92) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41343037/ ; https://api.crossref.org/works/10.1007/s40279-025-02344-w | 1 |
| Schoenfeld BJ et al. (2017). *Dose-response relationship between weekly resistance training volum…* Journal of Sports Sciences. doi:10.1080/02640414.2016.1210197, PMID 27433992 (line 93) | OK | - | https://pubmed.ncbi.nlm.nih.gov/27433992/ ; https://api.crossref.org/works/10.1080/02640414.2016.1210197 | 1 |
| Robinson ZP et al. (2024). *Exploring the Dose-Response Relationship Between Estimated Resistan…* Sports Medicine. doi:10.1007/s40279-024-02069-2, PMID 38970765 (line 94) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38970765/ ; https://api.crossref.org/works/10.1007/s40279-024-02069-2 | 1 |

## 6. Rest intervals (pass 1)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Singer A et al. (2024). *Give it a rest: a systematic review with Bayesian meta-analysis on …* Frontiers in Sports and Active Living. doi:10.3389/fspor.2024.1429789, PMID 39205815 (line 109) | OK | - | https://pubmed.ncbi.nlm.nih.gov/39205815/ ; https://api.crossref.org/works/10.3389/fspor.2024.1429789 | 1 |
| Schoenfeld BJ et al. (2016). *Longer Interset Rest Periods Enhance Muscle Strength and Hypertroph…* Journal of Strength and Conditioning Research. doi:10.1519/JSC.0000000000001272, PMID 26605807 (line 110) | OK | - | https://pubmed.ncbi.nlm.nih.gov/26605807/ ; https://api.crossref.org/works/10.1519/JSC.0000000000001272 | 1 |
| Longo AR et al. (2022). *Volume Load Rather Than Resting Interval Influences Muscle Hypertro…* Journal of Strength and Conditioning Research. doi:10.1519/JSC.0000000000003668, PMID 35622106 (line 111) | OK | - | https://pubmed.ncbi.nlm.nih.gov/35622106/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003668 | 1 |

## 7. Long muscle lengths, stretch and lengthened partials (pass 1)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Maeo S et al. (2021). *Greater Hamstrings Muscle Hypertrophy but Similar Damage Protection…* Medicine & Science in Sports & Exercise. doi:10.1249/MSS.0000000000002523, PMID 33009197 (line 126) | OK | - | https://pubmed.ncbi.nlm.nih.gov/33009197/ ; https://api.crossref.org/works/10.1249/MSS.0000000000002523 | 1 |
| Maeo S et al. (2023). *Triceps brachii hypertrophy is substantially greater after elbow ex…* European Journal of Sport Science. doi:10.1080/17461391.2022.2100279, PMID 35819335 (line 127) | OK | - | https://pubmed.ncbi.nlm.nih.gov/35819335/ ; https://api.crossref.org/works/10.1080/17461391.2022.2100279 | 1 |
| Pedrosa GF et al. (2022). *Partial range of motion training elicits favorable improvements in …* European Journal of Sport Science. doi:10.1080/17461391.2021.1927199, PMID 33977835 (line 128) | OK | - | https://pubmed.ncbi.nlm.nih.gov/33977835/ ; https://api.crossref.org/works/10.1080/17461391.2021.1927199 | 1 |
| Wolf M et al. (2023). *Partial Vs Full Range of Motion Resistance Training: A Systematic R…* International Journal of Strength and Conditioning. doi:10.47206/ijsc.v3i1.182, no PMID given (line 129) | OK | - | https://api.crossref.org/works/10.47206/ijsc.v3i1.182 | 1 |

## 8. Exercise selection: resistance profile and stability (pass 1)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Schwanbeck SR et al. (2020). *Effects of Training With Free Weights Versus Machines on Muscle Mas…* Journal of Strength and Conditioning Research. doi:10.1519/JSC.0000000000003349, PMID 32358310 (line 146) | OK | - | https://pubmed.ncbi.nlm.nih.gov/32358310/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003349 | 1 |
| Kassiano W et al. (2022). *Does Varying Resistance Exercises Promote Superior Muscle Hypertrop…* Journal of Strength and Conditioning Research. doi:10.1519/JSC.0000000000004258, PMID 35438660 (line 147) | OK | - | https://pubmed.ncbi.nlm.nih.gov/35438660/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004258 | 1 |
| Larsen S et al. (2025). *Dumbbell versus cable lateral raises for lateral deltoid hypertroph…* Frontiers in Physiology. doi:10.3389/fphys.2025.1611468, PMID 40692697 (line 148) | OK | - | https://pubmed.ncbi.nlm.nih.gov/40692697/ ; https://api.crossref.org/works/10.3389/fphys.2025.1611468 | 1 |


---

# Pass 2 (new citations, evidence.md as of Oct 29 2026 18:16)

- **Date:** Oct 29, 2026
- **Source:** the frozen snapshot `/workspace/carlsen-scratch/evidence.pass2-snapshot.md` (copied 18:16 Helsinki time). Line numbers refer to that file.
- **How new entries were found:** I parsed all 196 entries in the snapshot's (c) Citations lists and diffed them by (topic, DOI) against `pass1-citations-1-8.json` and the 93 topic 9–15 entries audited earlier. That gives **75 new entries**: 70 papers that are new to the doc, plus 5 papers that were already cited in another topic and are now also cited here (Halperin 2022 and Refalo 2025 in topic 2; Currier 2023, Lasevicius 2018 and Mitchell 2012 in topic 3, Mitchell 2012 being new in topic 1 too). No earlier entries were removed. The snapshot has 169 unique DOIs.
- **Method:** same as before. NCBI efetch in batches of 50 (≤2 requests per second), plus Crossref `/works/<doi>` for each DOI. I checked the full author list as cited, issue year, title, journal, volume(issue):pages against PubMed, DOI and PMID, and corrections or retractions in PubMed (publication types and CommentsCorrections) and Crossref (update-to, updated-by, relation). Kobayashi 2026 (PMID 42829982) is online ahead of print, and PubMed lists no volume or issue for it, which matches the citation.

**Pass-2 counts (75 new entries):** OK 74 · mismatch 0 · not found 0 · retracted or corrected 1 · unverified 0

| Topic | new entries | OK | mismatch | not found | retracted or corrected | unverified |
|---|---|---|---|---|---|---|
| 1. Mechanical tension | 8 | 7 | 0 | 0 | 1 | 0 |
| 2. Proximity to failure and RIR | 10 | 10 | 0 | 0 | 0 | 0 |
| 3. Load and rep range | 9 | 9 | 0 | 0 | 0 | 0 |
| 4. Training frequency | 7 | 7 | 0 | 0 | 0 | 0 |
| 5. Volume | 6 | 6 | 0 | 0 | 0 | 0 |
| 6. Rest intervals | 9 | 9 | 0 | 0 | 0 | 0 |
| 7. Long muscle lengths | 15 | 15 | 0 | 0 | 0 | 0 |
| 8. Exercise selection | 8 | 8 | 0 | 0 | 0 | 0 |
| 9. Progressive overload | 1 | 1 | 0 | 0 | 0 | 0 |
| 13b. Session length | 1 | 1 | 0 | 0 | 0 | 0 |
| 13c. Equipment | 1 | 1 | 0 | 0 | 0 | 0 |

## Myrholt 2023 erratum

Published erratum: Int J Sports Physiol Perform 2023;18(4):455, doi:10.1123/ijspp.2023-0050, PMID 36805934 (PubMed type "Published Erratum"). The notice text could not be read: PubMed and Europe PMC have no abstract for it, and the Human Kinetics page (the DOI target) returned 403/405 to both curl and the fetch tool. What it corrects is therefore unverified. Crossref has no updated-by link on the original DOI. evidence.md mentions the erratum in the topic 1 research notes (snapshot line 40) but not in the citation line (34). The citation details otherwise match.

## Pass-1 rows: newly added bibliographic details

All 28 pass-1 entries for topics 1–8 are still present in the pass-2 snapshot, and Silas has added volume(issue):pages and full author lists to them. I re-checked all of them against PubMed: authors, year, title, DOI, PMID and volume(issue):pages all match, so **I found no errors**. Lopez 2021 (topic 3, now line 88) is still the only correction (MSSE 2022;54(2):370); the snapshot's changelog lists it among the errata. The pass-1 tables above are left unchanged and still cite pass-1 snapshot line numbers.

## 1. Mechanical tension (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Roberts MD et al. (2023). *Mechanisms of mechanical overload-induced skeletal muscle hypertrop…* Physiological Reviews 103(4):2679-2757. doi:10.1152/physrev.00039.2022, PMID 37382939 (line 26) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37382939/ ; https://api.crossref.org/works/10.1152/physrev.00039.2022 | 2 |
| Mitchell CJ et al. (2012). *Resistance exercise load does not determine training-mediated hyper…* Journal of Applied Physiology 113(1):71-7. doi:10.1152/japplphysiol.00307.2012, PMID 22518835 (line 29) | OK | - | https://pubmed.ncbi.nlm.nih.gov/22518835/ ; https://api.crossref.org/works/10.1152/japplphysiol.00307.2012 | 2 |
| Pareja-Blanco F et al. (2020). *Velocity Loss as a Critical Variable Determining the Adaptations to…* Medicine & Science in Sports & Exercise 52(8):1752-1762. doi:10.1249/MSS.0000000000002295, PMID 32049887 (line 31) | OK | - | https://pubmed.ncbi.nlm.nih.gov/32049887/ ; https://api.crossref.org/works/10.1249/MSS.0000000000002295 | 2 |
| Pareja-Blanco F et al. (2026). *Optimizing Strength and Hypertrophy: The Combined Effect of Intensi…* Medicine & Science in Sports & Exercise 58(8):1773-1781. doi:10.1249/MSS.0000000000003988, PMID 41872733 (line 32) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41872733/ ; https://api.crossref.org/works/10.1249/MSS.0000000000003988 | 2 |
| Jukic I et al. (2023). *The Acute and Chronic Effects of Implementing Velocity Loss Thresho…* Sports Medicine 53(1):177-214. doi:10.1007/s40279-022-01754-4, PMID 36178597 (line 33) | OK | - | https://pubmed.ncbi.nlm.nih.gov/36178597/ ; https://api.crossref.org/works/10.1007/s40279-022-01754-4 | 2 |
| Myrholt RB et al. (2023). *Effects of Low- Versus High-Velocity-Loss Thresholds With Similar T…* International Journal of Sports Physiology and Performance 18(4):368-377. doi:10.1123/ijspp.2022-0161, PMID 36754062 (line 34) | retracted or corrected | Published erratum: Int J Sports Physiol Perform 2023;18(4):455, doi:10.1123/ijspp.2023-0050, PMID 36805934 (PubMed type "Published Erratum"). The notice text could not be read: PubMed and Europe PMC have no abstract for it, and the Human Kinetics page (the DOI target) returned 403/405 to both curl and the fetch tool. What it corrects is therefore unverified. Content per Silas, not independently verified: the erratum changes only the Table 2 muscle-thickness unit from cm to mm (https://journals.humankinetics.com/view/journals/ijspp/18/4/article-p455.xml). That page returned 403/405 again on 29 Oct 2026, to curl and to the fetch tool. Crossref has no updated-by link on the original DOI. evidence.md mentions the erratum in the topic 1 research notes (snapshot line 40) but not in the citation line (34). The citation details otherwise match. | https://pubmed.ncbi.nlm.nih.gov/36754062/ ; https://api.crossref.org/works/10.1123/ijspp.2022-0161 | 2 |
| Andersen V et al. (2024). *Resistance Training With Different Velocity Loss Thresholds Induce …* Journal of Strength and Conditioning Research 38(3):e135-e142. doi:10.1519/JSC.0000000000004067, PMID 34100789 (line 35) | OK | - | https://pubmed.ncbi.nlm.nih.gov/34100789/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004067 | 2 |
| Terada K et al. (2022). *Low-Load Resistance Training to Volitional Failure Induces Muscle H…* Journal of Strength and Conditioning Research 36(6):1576-1581. doi:10.1519/JSC.0000000000003690, PMID 35622108 (line 36) | OK | - | https://pubmed.ncbi.nlm.nih.gov/35622108/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003690 | 2 |

## 2. Proximity to failure and RIR (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Refalo MC et al. (2024). *Similar muscle hypertrophy following eight weeks of resistance trai…* Journal of Sports Sciences 42(1):85-101. doi:10.1080/02640414.2024.2321021, PMID 38393985 (line 58) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38393985/ ; https://api.crossref.org/works/10.1080/02640414.2024.2321021 | 2 |
| Vasconcelos T et al. (2026). *Elbow Flexor Adaptations to Failure Versus Repetitions-in-Reserve T…* Muscles 5(3):61. doi:10.3390/muscles5030061, PMID 42784046 (line 59) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42784046/ ; https://api.crossref.org/works/10.3390/muscles5030061 | 2 |
| Vasconcelos T et al. (2026). *Comparative Adaptations to Different Leg Extension Set-termination …* Journal of Strength and Conditioning Research 40(10):1205-1213. doi:10.1519/JSC.0000000000005494, PMID 42617172 (line 60) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42617172/ ; https://api.crossref.org/works/10.1519/JSC.0000000000005494 | 2 |
| Santanielo N et al. (2020). *Effect of resistance training to muscle failure vs non-failure on s…* Biology of Sport 37(4):333-341. doi:10.5114/biolsport.2020.96317, PMID 33343066 (line 61) | OK | - | https://pubmed.ncbi.nlm.nih.gov/33343066/ ; https://api.crossref.org/works/10.5114/biolsport.2020.96317 | 2 |
| Nóbrega SR et al. (2018). *Effect of Resistance Training to Muscle Failure vs. Volitional Inte…* Journal of Strength and Conditioning Research 32(1):162-169. doi:10.1519/JSC.0000000000001787, PMID 29189407 (line 62) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29189407/ ; https://api.crossref.org/works/10.1519/JSC.0000000000001787 | 2 |
| Lacerda LT et al. (2020). *Is Performing Repetitions to Failure Less Important Than Volume for…* Journal of Strength and Conditioning Research 34(5):1237-1248. doi:10.1519/JSC.0000000000003438, PMID 31809457 (line 63) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31809457/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003438 | 2 |
| Hermann T et al. (2025). *Without Fail: Muscular Adaptations in Single-Set Resistance Trainin…* Medicine & Science in Sports & Exercise 57(9):2021-2031. doi:10.1249/MSS.0000000000003728, PMID 40249908 (line 65) | OK | - | https://pubmed.ncbi.nlm.nih.gov/40249908/ ; https://api.crossref.org/works/10.1249/MSS.0000000000003728 | 2 |
| Martorelli S et al. (2017). *Strength Training with Repetitions to Failure does not Provide Addi…* European Journal of Translational Myology 27(2):6339. doi:10.4081/ejtm.2017.6339, PMID 28713535 (line 66) | OK | - | https://pubmed.ncbi.nlm.nih.gov/28713535/ ; https://api.crossref.org/works/10.4081/ejtm.2017.6339 | 2 |
| Halperin I et al. (2022). *Accuracy in Predicting Repetitions to Task Failure in Resistance Ex…* Sports Medicine 52(2):377-390. doi:10.1007/s40279-021-01559-x, PMID 34542869 (line 67) [paper already cited in another topic] | OK | - | https://pubmed.ncbi.nlm.nih.gov/34542869/ ; https://api.crossref.org/works/10.1007/s40279-021-01559-x | 2 |
| Refalo MC et al. (2025). *The Effect of Proximity-To-Failure on Perceptual Responses to Resis…* European Journal of Sport Science 25(3):e12266. doi:10.1002/ejsc.12266, PMID 39960821 (line 68) [paper already cited in another topic] | OK | - | https://pubmed.ncbi.nlm.nih.gov/39960821/ ; https://api.crossref.org/works/10.1002/ejsc.12266 | 2 |

## 3. Load and rep range (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Carvalho L et al. (2022). *Muscle hypertrophy and strength gains after resistance training wit…* Applied Physiology, Nutrition, and Metabolism 47(4):357-368. doi:10.1139/apnm-2021-0515, PMID 35015560 (line 89) | OK | - | https://pubmed.ncbi.nlm.nih.gov/35015560/ ; https://api.crossref.org/works/10.1139/apnm-2021-0515 | 2 |
| Cumming KT et al. (2025). *Divergent strength gains but similar hypertrophy after low-load and…* Journal of Applied Physiology 139(3):685-697. doi:10.1152/japplphysiol.00353.2025, PMID 40827709 (line 92) | OK | - | https://pubmed.ncbi.nlm.nih.gov/40827709/ ; https://api.crossref.org/works/10.1152/japplphysiol.00353.2025 | 2 |
| Bello ML et al. (2025). *Muscle Hypertrophy, Strength, and Salivary Hormone Changes Followin…* Journal of Functional Morphology and Kinesiology 11(1):17. doi:10.3390/jfmk11010017, PMID 41562735 (line 93) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41562735/ ; https://api.crossref.org/works/10.3390/jfmk11010017 | 2 |
| Jenkins NDM et al. (2017). *Greater Neural Adaptations following High- vs. Low-Load Resistance …* Frontiers in Physiology 8:331. doi:10.3389/fphys.2017.00331, PMID 28611677 (line 94) | OK | - | https://pubmed.ncbi.nlm.nih.gov/28611677/ ; https://api.crossref.org/works/10.3389/fphys.2017.00331 | 2 |
| Mitchell CJ et al. (2012). *Resistance exercise load does not determine training-mediated hyper…* Journal of Applied Physiology 113(1):71-7. doi:10.1152/japplphysiol.00307.2012, PMID 22518835 (line 95) | OK | - | https://pubmed.ncbi.nlm.nih.gov/22518835/ ; https://api.crossref.org/works/10.1152/japplphysiol.00307.2012 | 2 |
| Currier BS et al. (2023). *Resistance training prescription for muscle strength and hypertroph…* British Journal of Sports Medicine 57(18):1211-1220. doi:10.1136/bjsports-2023-106807, PMID 37414459 (line 96) [paper already cited in another topic] | OK | - | https://pubmed.ncbi.nlm.nih.gov/37414459/ ; https://api.crossref.org/works/10.1136/bjsports-2023-106807 | 2 |
| Schoenfeld BJ et al. (2021). *Loading Recommendations for Muscle Strength, Hypertrophy, and Local…* Sports (Basel) 9(2):32. doi:10.3390/sports9020032, PMID 33671664 (line 97) | OK | - | https://pubmed.ncbi.nlm.nih.gov/33671664/ ; https://api.crossref.org/works/10.3390/sports9020032 | 2 |
| Hammert WB et al. (2026). *High- and Low-Load Resistance Training Produce Distinct Skeletal Mu…* Medicine & Science in Sports & Exercise (online ahead of print). doi:10.1249/MSS.0000000000004052, PMID 42319300 (line 98) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42319300/ ; https://api.crossref.org/works/10.1249/MSS.0000000000004052 | 2 |
| Lasevicius T et al. (2018). *Effects of different intensities of resistance training with equate…* European Journal of Sport Science 18(6):772-780. doi:10.1080/17461391.2018.1450898, PMID 29564973 (line 99) [paper already cited in another topic] | OK | - | https://pubmed.ncbi.nlm.nih.gov/29564973/ ; https://api.crossref.org/works/10.1080/17461391.2018.1450898 | 2 |

## 4. Training frequency (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Ramos-Campo DJ et al. (2024). *Efficacy of Split Versus Full-Body Resistance Training on Strength …* Journal of Strength and Conditioning Research 38(7):1330-1340. doi:10.1519/JSC.0000000000004774, PMID 38595233 (line 121) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38595233/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004774 | 2 |
| Saric J et al. (2019). *Resistance Training Frequencies of 3 and 6 Times Per Week Produce S…* Journal of Strength and Conditioning Research 33 Suppl 1:S122-S129. doi:10.1519/JSC.0000000000002909, PMID 30363041 (line 122) | OK | - | https://pubmed.ncbi.nlm.nih.gov/30363041/ ; https://api.crossref.org/works/10.1519/JSC.0000000000002909 | 2 |
| Gomes GK et al. (2019). *High-Frequency Resistance Training Is Not More Effective Than Low-F…* Journal of Strength and Conditioning Research 33 Suppl 1:S130-S139. doi:10.1519/JSC.0000000000002559, PMID 29489727 (line 123) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29489727/ ; https://api.crossref.org/works/10.1519/JSC.0000000000002559 | 2 |
| Evangelista AL et al. (2021). *Split or full-body workout routine: which is best to increase muscl…* Einstein (São Paulo) 19:eAO5781. doi:10.31744/einstein_journal/2021AO5781, PMID 34468591 (line 124) | OK | - | https://pubmed.ncbi.nlm.nih.gov/34468591/ ; https://api.crossref.org/works/10.31744/einstein_journal/2021AO5781 | 2 |
| Schoenfeld BJ et al. (2015). *Influence of Resistance Training Frequency on Muscular Adaptations …* Journal of Strength and Conditioning Research 29(7):1821-9. doi:10.1519/JSC.0000000000000970, PMID 25932981 (line 125) | OK | - | https://pubmed.ncbi.nlm.nih.gov/25932981/ ; https://api.crossref.org/works/10.1519/JSC.0000000000000970 | 2 |
| Lasevicius T et al. (2019). *Similar Muscular Adaptations in Resistance Training Performed Two V…* Journal of Human Kinetics 68:135-143. doi:10.2478/hukin-2019-0062, PMID 31531139 (line 126) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31531139/ ; https://api.crossref.org/works/10.2478/hukin-2019-0062 | 2 |
| Yue FL et al. (2018). *Comparison of 2 weekly-equalized volume resistance-training routine…* Applied Physiology, Nutrition, and Metabolism 43(5):475-481. doi:10.1139/apnm-2017-0575, PMID 29216446 (line 127) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29216446/ ; https://api.crossref.org/works/10.1139/apnm-2017-0575 | 2 |

## 5. Volume (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Krieger JW (2010). *Single vs. multiple sets of resistance exercise for muscle hypertro…* Journal of Strength and Conditioning Research 24(4):1150-9. doi:10.1519/JSC.0b013e3181d4d436, PMID 20300012 (line 148) | OK | - | https://pubmed.ncbi.nlm.nih.gov/20300012/ ; https://api.crossref.org/works/10.1519/JSC.0b013e3181d4d436 | 2 |
| Radaelli R et al. (2015). *Dose-response of 1, 3, and 5 sets of resistance exercise on strengt…* Journal of Strength and Conditioning Research 29(5):1349-58. doi:10.1519/JSC.0000000000000758, PMID 25546444 (line 149) | OK | - | https://pubmed.ncbi.nlm.nih.gov/25546444/ ; https://api.crossref.org/works/10.1519/JSC.0000000000000758 | 2 |
| Hammarström D et al. (2020). *Benefits of higher resistance-training volume are related to riboso…* The Journal of Physiology 598(3):543-565. doi:10.1113/JP278455, PMID 31813190 (line 150) | OK | - | https://pubmed.ncbi.nlm.nih.gov/31813190/ ; https://api.crossref.org/works/10.1113/JP278455 | 2 |
| Kassiano W et al. (2024). *Bigger Calves from Doing Higher Resistance Training Volume?* International Journal of Sports Medicine 45(10):739-747. doi:10.1055/a-2316-7885, PMID 38684187 (line 151) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38684187/ ; https://api.crossref.org/works/10.1055/a-2316-7885 | 2 |
| Barsuhn A et al. (2025). *Training volume increases or maintenance based on previous volume: …* Journal of Applied Physiology 138(1):259-269. doi:10.1152/japplphysiol.00476.2024, PMID 39665246 (line 153) | OK | - | https://pubmed.ncbi.nlm.nih.gov/39665246/ ; https://api.crossref.org/works/10.1152/japplphysiol.00476.2024 | 2 |
| Scarpelli MC et al. (2022). *Muscle Hypertrophy Response Is Affected by Previous Resistance Trai…* Journal of Strength and Conditioning Research 36(4):1153-1157. doi:10.1519/JSC.0000000000003558, PMID 32108724 (line 154) | OK | - | https://pubmed.ncbi.nlm.nih.gov/32108724/ ; https://api.crossref.org/works/10.1519/JSC.0000000000003558 | 2 |

## 6. Rest intervals (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Grgic J et al. (2017). *The effects of short versus long inter-set rest intervals in resist…* European Journal of Sport Science 17(8):983-993. doi:10.1080/17461391.2017.1340524, PMID 28641044 (line 174) | OK | - | https://pubmed.ncbi.nlm.nih.gov/28641044/ ; https://api.crossref.org/works/10.1080/17461391.2017.1340524 | 2 |
| Buresh R et al. (2009). *The effect of resistive exercise rest interval on hormonal response…* Journal of Strength and Conditioning Research 23(1):62-71. doi:10.1519/JSC.0b013e318185f14a, PMID 19077743 (line 176) | OK | - | https://pubmed.ncbi.nlm.nih.gov/19077743/ ; https://api.crossref.org/works/10.1519/JSC.0b013e318185f14a | 2 |
| Ahtiainen JP et al. (2005). *Short vs. long rest period between the sets in hypertrophic resista…* Journal of Strength and Conditioning Research 19(3):572-82. doi:10.1519/15604.1, PMID 16095405 (line 178) | OK | - | https://pubmed.ncbi.nlm.nih.gov/16095405/ ; https://api.crossref.org/works/10.1519/15604.1 | 2 |
| de Souza TP et al. (2010). *Comparison between constant and decreasing rest intervals: influenc…* Journal of Strength and Conditioning Research 24(7):1843-50. doi:10.1519/JSC.0b013e3181ddae4a, PMID 20543741 (line 179) | OK | - | https://pubmed.ncbi.nlm.nih.gov/20543741/ ; https://api.crossref.org/works/10.1519/JSC.0b013e3181ddae4a | 2 |
| Souza-Junior TP et al. (2011). *Strength and hypertrophy responses to constant and decreasing rest …* Journal of the International Society of Sports Nutrition 8(1):17. doi:10.1186/1550-2783-8-17, PMID 22032491 (line 180) | OK | - | https://pubmed.ncbi.nlm.nih.gov/22032491/ ; https://api.crossref.org/works/10.1186/1550-2783-8-17 | 2 |
| Fink JE et al. (2017). *Acute and Long-term Responses to Different Rest Intervals in Low-lo…* International Journal of Sports Medicine 38(2):118-124. doi:10.1055/s-0042-119204, PMID 27984843 (line 181) | OK | - | https://pubmed.ncbi.nlm.nih.gov/27984843/ ; https://api.crossref.org/works/10.1055/s-0042-119204 | 2 |
| Grgic J et al. (2018). *Effects of Rest Interval Duration in Resistance Training on Measure…* Sports Medicine 48(1):137-151. doi:10.1007/s40279-017-0788-x, PMID 28933024 (line 182) | OK | - | https://pubmed.ncbi.nlm.nih.gov/28933024/ ; https://api.crossref.org/works/10.1007/s40279-017-0788-x | 2 |
| McMahon G et al. (2024). *Increased Neuromuscular Activity, Force Output, and Resistance Exer…* Journal of Strength and Conditioning Research 38(9):1527-1534. doi:10.1519/JSC.0000000000004832, PMID 38953795 (line 183) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38953795/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004832 | 2 |
| Villanueva MG et al. (2015). *Short rest interval lengths between sets optimally enhance body com…* European Journal of Applied Physiology 115(2):295-308. doi:10.1007/s00421-014-3014-7, PMID 25294666 (line 184) | OK | - | https://pubmed.ncbi.nlm.nih.gov/25294666/ ; https://api.crossref.org/works/10.1007/s00421-014-3014-7 | 2 |

## 7. Long muscle lengths (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Kinoshita M et al. (2023). *Triceps surae muscle hypertrophy is greater after standing versus s…* Frontiers in Physiology 14:1272106. doi:10.3389/fphys.2023.1272106, PMID 38156065 (line 205) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38156065/ ; https://api.crossref.org/works/10.3389/fphys.2023.1272106 | 2 |
| Maeo S et al. (2024). *Hamstrings Hypertrophy Is Specific to the Training Exercise: Nordic…* Medicine & Science in Sports & Exercise 56(10):1893-1905. doi:10.1249/MSS.0000000000003490, PMID 38857522 (line 206) | OK | - | https://pubmed.ncbi.nlm.nih.gov/38857522/ ; https://api.crossref.org/works/10.1249/MSS.0000000000003490 | 2 |
| Kassiano W et al. (2023). *Greater Gastrocnemius Muscle Hypertrophy After Partial Range of Mot…* Journal of Strength and Conditioning Research 37(9):1746-1753. doi:10.1519/JSC.0000000000004460, PMID 37015016 (line 208) | OK | - | https://pubmed.ncbi.nlm.nih.gov/37015016/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004460 | 2 |
| Pedrosa GF et al. (2023). *Training in the Initial Range of Motion Promotes Greater Muscle Ada…* Sports (Basel) 11(2):39. doi:10.3390/sports11020039, PMID 36828324 (line 209) | OK | - | https://pubmed.ncbi.nlm.nih.gov/36828324/ ; https://api.crossref.org/works/10.3390/sports11020039 | 2 |
| Pedrosa GF et al. (2025). *From full to partials: Investigating the impact of range of motion …* Journal of Sports Sciences 43(15):1440-1451. doi:10.1080/02640414.2025.2502895, PMID 40366729 (line 210) | OK | - | https://pubmed.ncbi.nlm.nih.gov/40366729/ ; https://api.crossref.org/works/10.1080/02640414.2025.2502895 | 2 |
| McMahon G et al. (2026). *Moderate Intensity Resistance Training With Partial Range-of-Motion…* Journal of Strength and Conditioning Research (online ahead of print). doi:10.1519/JSC.0000000000005561, PMID 42392615 (line 211) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42392615/ ; https://api.crossref.org/works/10.1519/JSC.0000000000005561 | 2 |
| Havers T et al. (2025). *Partial Range, Full Gains? The Effect of 8 Weeks of Partial Range o…* European Journal of Sport Science 25(12):e70087. doi:10.1002/ejsc.70087, PMID 41247250 (line 212) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41247250/ ; https://api.crossref.org/works/10.1002/ejsc.70087 | 2 |
| Goli A et al. (2026). *Does Performing Partial Repetitions Beyond Momentary Failure Enhanc…* International Journal of Exercise Science 19(4):4003. doi:10.70252/IJES2026403, PMID 42006449 (line 213) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42006449/ ; https://api.crossref.org/works/10.70252/IJES2026403 | 2 |
| Kassiano W et al. (2023). *Which ROMs Lead to Rome? A Systematic Review of the Effects of Rang…* Journal of Strength and Conditioning Research 37(5):1135-1144. doi:10.1519/JSC.0000000000004415, PMID 36662126 (line 214) | OK | - | https://pubmed.ncbi.nlm.nih.gov/36662126/ ; https://api.crossref.org/works/10.1519/JSC.0000000000004415 | 2 |
| Pedrosa GF et al. (2026). *The interplay between muscle length, range of motion, and exercise …* Sports Medicine International Open 10:a27337605. doi:10.1055/a-2733-7605, PMID 41777276 (line 216) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41777276/ ; https://api.crossref.org/works/10.1055/a-2733-7605 | 2 |
| Wolf M et al. (2025). *Lengthened partial repetitions elicit similar muscular adaptations …* PeerJ 13:e18904. doi:10.7717/peerj.18904, PMID 39959841 (line 217) | OK | - | https://pubmed.ncbi.nlm.nih.gov/39959841/ ; https://api.crossref.org/works/10.7717/peerj.18904 | 2 |
| Gschneidner D et al. (2025). *The effects of lengthened-partial range of motion resistance traini…* Journal of Sports Sciences 43(23):2963-2976. doi:10.1080/02640414.2025.2567805, PMID 41055237 (line 218) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41055237/ ; https://api.crossref.org/works/10.1080/02640414.2025.2567805 | 2 |
| Plotkin DL et al. (2026). *Acute Molecular and Chronic Vastus Lateralis Adaptations to Lengthe…* Medicine & Science in Sports & Exercise (online ahead of print). doi:10.1249/MSS.0000000000004183, PMID 42841600 (line 219) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42841600/ ; https://api.crossref.org/works/10.1249/MSS.0000000000004183 | 2 |
| Larsen S et al. (2025). *Knee flexion range of motion does not influence muscle hypertrophy …* Journal of Sports Sciences 43(10):986-994. doi:10.1080/02640414.2025.2481534, PMID 40113586 (line 220) | OK | - | https://pubmed.ncbi.nlm.nih.gov/40113586/ ; https://api.crossref.org/works/10.1080/02640414.2025.2481534 | 2 |
| Varovic D et al. (2025). *The effects of long muscle length isometric versus full range of mo…* Applied Physiology, Nutrition, and Metabolism 50:1-14. doi:10.1139/apnm-2025-0238, PMID 40911904 (line 221) | OK | - | https://pubmed.ncbi.nlm.nih.gov/40911904/ ; https://api.crossref.org/works/10.1139/apnm-2025-0238 | 2 |

## 8. Exercise selection (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Amanuma MT et al. (2025). *Comparable regional hypertrophy of the knee extensor muscles in res…* Journal of Bodywork and Movement Therapies 45:562-568. doi:10.1016/j.jbmt.2025.09.027, PMID 41316621 (line 241) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41316621/ ; https://api.crossref.org/works/10.1016/j.jbmt.2025.09.027 | 2 |
| Kinoshita M et al. (2026). *Hypertrophic Effects of Single- versus Multi-Joint Exercise: A Dire…* Medicine & Science in Sports & Exercise 58(7):1566-1580. doi:10.1249/MSS.0000000000003957, PMID 41630124 (line 244) | OK | - | https://pubmed.ncbi.nlm.nih.gov/41630124/ ; https://api.crossref.org/works/10.1249/MSS.0000000000003957 | 2 |
| Kassiano W et al. (2025). *Distinct muscle growth and strength adaptations after preacher and …* International Journal of Sports Medicine 46(5):334-343. doi:10.1055/a-2517-0509, PMID 39809454 (line 245) | OK | - | https://pubmed.ncbi.nlm.nih.gov/39809454/ ; https://api.crossref.org/works/10.1055/a-2517-0509 | 2 |
| Kobayashi Y et al. (2026). *Exercise-specific preferential hypertrophy of individual elbow flex…* Journal of Sports Sciences (online ahead of print). doi:10.1080/02640414.2026.2741751, PMID 42829982 (line 246) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42829982/ ; https://api.crossref.org/works/10.1080/02640414.2026.2741751 | 2 |
| Attarieh P et al. (2026). *Regional Hypertrophy of the Gluteal Muscles Is Task-Specific: Diffe…* Journal of Strength and Conditioning Research (online ahead of print). doi:10.1519/JSC.0000000000005701, PMID 42842490 (line 247) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42842490/ ; https://api.crossref.org/works/10.1519/JSC.0000000000005701 | 2 |
| Kassiano W et al. (2025). *Comparison of Muscle Growth and Dynamic Strength Adaptations Induce…* Sports Medicine 55(4):923-936. doi:10.1007/s40279-024-02169-z, PMID 39794667 (line 248) | OK | - | https://pubmed.ncbi.nlm.nih.gov/39794667/ ; https://api.crossref.org/works/10.1007/s40279-024-02169-z | 2 |
| Kassiano W et al. (2025). *Muscle Hypertrophy and Strength Adaptations to Systematically Varyi…* Research Quarterly for Exercise and Sport 96(2):371-381. doi:10.1080/02701367.2024.2409961, PMID 39388663 (line 249) | OK | - | https://pubmed.ncbi.nlm.nih.gov/39388663/ ; https://api.crossref.org/works/10.1080/02701367.2024.2409961 | 2 |
| Saeterbakken AH et al. (2019). *The short- and long-term effects of resistance training with differ…* PLoS ONE 14(4):e0214302. doi:10.1371/journal.pone.0214302, PMID 30934001 (line 250) | OK | - | https://pubmed.ncbi.nlm.nih.gov/30934001/ ; https://api.crossref.org/works/10.1371/journal.pone.0214302 | 2 |

## 9. Progressive overload (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Ferrari O et al. (2026). *Time course of muscle hypertrophy with and without progressive over…* International Journal of Sports Medicine (online ahead of print). doi:10.1055/a-2980-6473, PMID 42880344 (line 273) | OK | - | https://pubmed.ncbi.nlm.nih.gov/42880344/ ; https://api.crossref.org/works/10.1055/a-2980-6473 | 2 |

## 13b. Session length (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Zhang X et al. (2025). *Superset Versus Traditional Resistance Training Prescriptions: A Sy…* Sports Medicine 55(4):953-975. doi:10.1007/s40279-025-02176-8, PMID 39903375 (line 420) | OK | - | https://pubmed.ncbi.nlm.nih.gov/39903375/ ; https://api.crossref.org/works/10.1007/s40279-025-02176-8 | 2 |

## 13c. Equipment (pass 2)

| citation | status | what's wrong | source link | pass |
|---|---|---|---|---|
| Kotarsky CJ et al. (2018). *Effect of Progressive Calisthenic Push-up Training on Muscle Streng…* Journal of Strength and Conditioning Research 32(3):651-659. doi:10.1519/JSC.0000000000002345, PMID 29466268 (line 446) | OK | - | https://pubmed.ncbi.nlm.nih.gov/29466268/ ; https://api.crossref.org/works/10.1519/JSC.0000000000002345 | 2 |
