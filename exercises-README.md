# exercises.json: format and conventions

`exercises.json` is a JSON array of exercise objects. It holds data only; app "Why?" copy stays in evidence.md.

## Fields
| Field | Meaning |
|---|---|
| `id` | Unique kebab-case id |
| `name` | Display name. It includes the usual setup when the profile depends on it (pulley height, bench angle, facing direction) |
| `equipment` | `barbell`, `dumbbell`, `cable`, `machine` or `bodyweight`. Smith machine exercises count as `machine` |
| `primaryMuscles` | Target muscles. **Each hard set counts as 1 set** for these |
| `secondaryMuscles` | Helper muscles. **Each hard set counts as ½ set** for these (evidence.md topic 10, Pelland 2026 fractional counting). Per the topic 10 research note, muscles that barely grow from a lift are left out, e.g. hamstrings in squats get 0, not ½ |
| `movementPattern` | Small vocabulary: horizontal push, vertical push, horizontal pull, vertical pull, squat, lunge, hinge, hip-extension, core-flexion, core-anti-extension, and `isolation-<joint action>` (elbow-flexion, elbow-extension, shoulder-abduction, shoulder-flexion, shoulder-extension, horizontal-adduction, horizontal-abduction, scapular-elevation, wrist, knee-extension, knee-flexion, hip-abduction, plantar-flexion) |
| `resistanceProfile` | `stretch`, `mid-range` or `shortened`: where in the range the **external resistance torque on the target muscle peaks** for the stated common setup. Roughly flat profiles (most selectorised machines and many cables) are labelled `mid-range`. Machine profiles depend on the cam or lever, which the `lengthenedPosition` text says |
| `lengthenedPosition` | Plain-English position where the target muscle is longest. This is separate from the profile: a muscle can be lengthened at the start even when the exercise is hardest elsewhere (e.g. seated leg curl) |
| `stability` | `high`: body supported or path fixed, so balance rarely limits the set (machines, braced cables, bench- or pad-supported lifts). `low`: standing free-weight compounds, single-leg work, hanging/bodyweight work, dumbbell presses and other free-weight work where balance or bracing may limit the set before the target muscle |
| `substitutionGroup` | Exercises with the same primary muscle and a similar profile (same or adjacent profile; never `stretch` mixed with `shortened`). Every member of a group has the same **first** primary muscle (checked by the validator). Every group has at least 2 members except `quads-knee-extension` (see below) |
| `evidenceNote` | `''` by default. Filled only when a verified study tested that exercise directly. Format: finding, then `(FirstAuthor et al. YEAR, PMID n)`. The sources are in `exercises-citations.md` |

## Group conventions (updated after QA round 2)
- **Squat groups (`quads-squat`, `quads-squat-machine`):** quads are primary (1 set) and glutes secondary (½ set) for every member, so swapping inside a group never changes glute credit. This is a conservative counting choice. Kubo 2019 found deep barbell back squats did grow the glutes, so the ½ may undercount glutes for deep free-weight squats. Lunges and split squats keep quads and glutes both primary in their own group.
- **Overhead presses (`front-delt-press`):** the barbell, dumbbell and machine presses are all `mid-range`, since their torque patterns are similar. The pike push-up stays `stretch`.
- **Triceps:** `triceps-press` holds horizontal pushes (close-grip bench, diamond push-up). `triceps-dip` holds vertical-push dips (bodyweight and machine). `triceps-overhead` holds only arms-overhead extensions. Lying extensions (skull crusher, lying dumbbell extension, with the upper arm at about 90°) are in `triceps-lying-extension`.
- **Rear delts:** reverse flies (`rear-delt-fly`) are kept apart from face pulls and rear-delt rows (`rear-delt-upper-back-pull`, horizontal pull, with rear delts and upper back both primary).
- **Leg curls:** calves are not counted. No growth evidence was found for them, so they get no ½ set.

- **Rows:** the first primary muscle follows elbow path and grip. Elbows tucked close to the body with a neutral grip, pulling toward the hip or lower ribs, is mostly shoulder extension. That makes it lats-first (`back-row-lats`: one-arm dumbbell row, close-grip seated cable row). A chest-supported row with the elbows drifting out (about 45° or wider) adds horizontal abduction and shoulder-blade retraction. That makes it upper-back-first (`back-row-supported`: chest-supported dumbbell, T-bar and machine rows). Both muscles stay primary in every row; only the order, and so the group, changes. This is a biomechanical convention, not a tested hypertrophy difference.

## Singleton group
- `quads-knee-extension` holds only `leg-extension`. It is the only common loaded knee-extension isolation. Sissy squats and reverse Nordics are stretch-loaded bodyweight moves, so they sit in their own group, `quads-knee-extension-bodyweight`.

## Muscle names
Use only these 14: chest, front delts, side delts, rear delts, lats, upper back, biceps, triceps, forearms, quads, hamstrings, glutes, calves, abs.
