# Carlsen: design notes for the clickable prototype (for Xander)
*Agent Vance · 29 Oct 2026 (Helsinki time) · research only, nothing installed.*

**How to read the sources**
- Every claim has a link.
- **[I]** = the page blocks scripted checks (Zendesk or Reddit bot protection, 403). Its content was read through the search index.
- **[R]** = a Reddit or user report, not official documentation.
- **"Screens"** = Hoang's real Lyfta screenshots in `/workspace/carlsen/lyfta-screens/` (described in `app-teardown.md` §1b).
- **Unverified** = I couldn't find a public source. I did not fill these gaps by guessing.

**Contents:** Part 1 covers four flows: (1) split and routine builder, (2) shared routines, (3) add or swap mid-workout, (4) weekly per-muscle stats. Part 2 covers making the UI look shipped: (5) the impeccable rules, (6) what the apps actually use, (7) platform specs, (8) the Carlsen token sheet, (9) a do/don't checklist.

---

# Part 1: How Hevy, Lyfta, Strong and Fitbod handle four flows

## 1. Split and routine builders

| App | Where it lives | What the user taps | What it shows | Source |
|---|---|---|---|---|
| **Hevy** | Workout tab → Routines | Folder icon → name a folder → **New Routine** → **+ Add exercise** (search plus equipment and muscle filters). Drag routines between folders. | Routines grouped in folders. Each exercise row has sets, rep ranges, rest timer and notes. Prefilled with previous sets and weights. | [Gym routines and folders](https://www.hevyapp.com/features/gym-routines/), [help: build a program](https://help.hevyapp.com/hc/en-us/articles/34953606698903-Build-a-Workout-Program-Create-Organize-Routines) [I], [programming options](https://www.hevyapp.com/features/exercise-programming-options/) |
| **Lyfta** | **Routines** tab (also Home → **+** → New Workout → choose template) | **Create Routine** → add exercises → set target sets and reps → Save | A routine is "the plan you start from". Editing it changes the next session, not History. Premium programs saved to your library are separate from self-built routines. | [Support: create and edit a routine](https://support.lyfta.app/en/article/create-and-edit-routines) (updated 7 Oct 2026), [Contact FAQ](https://www.lyfta.app/contact) |
| **Strong** | Workout screen → Templates | Create a template or start an **Empty Workout**. On iPhone, tap the folder icon and drag templates into folders. | A template list. The free tier allows 3 templates. | [help: first workout](https://help.strongapp.io/article/229-my-first-workout), [help: organize templates](https://help.strongapp.io/article/107-organize-templates), [App Store](https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577) |
| **Fitbod** | Workout tab → **My Plan** | Choose a goal → Location (equipment) → Workouts/Week → Duration → Experience → **Training Splits** | The split is *recommended from weekly frequency*. Options: PPL, Upper/Lower, Full Body, Fresh Muscle Groups. With Focus Exercises on, frequency-specific combinations appear (e.g. 4 days: Upper/Lower ×2, PPL + Full Body, Full Body ×4). Workouts/Week and Duration also set **Weekly Set Targets**. | [My Plan](https://help.fitbod.me/hc/en-us/articles/34336407191191-My-Plan) [I], [Focus Exercises](https://help.fitbod.me/hc/en-us/articles/35301260960663-Focus-Exercises) [I] |

**Lyfta gap closed:** the help center confirms the Routines tab → Create Routine flow. The builder screen itself (layout and controls) is still **unverified**; it isn't in Hoang's screenshots.

**Copy:**
- Fitbod's chain of "days/week → recommended split → weekly set target". It is exactly Carlsen's onboarding-to-split logic. Add the Why? line Fitbod lacks.
- Hevy and Strong folders, used as "program = folder of day-routines".
- Lyfta's plan-vs-history rule ("editing the plan never rewrites history"). State it in the UI.

**Avoid:**
- Hard routine caps in the prototype (Strong allows 3 free, Hevy 4).
- Fitbod's opaque split options that unlock only after a toggle. Show every valid split for the chosen days, mark one *Recommended*, and add a reason.

## 2. Community and shared routines

| App | Pattern | Source |
|---|---|---|
| **Hevy** | **Explore** under Routines: 26 programs with **Level / Goal / Equipment** filter chips and "Show all 26 programs". Category tiles include At home, Travel, Dumbbells only and others. The program page has a blue **Save Program** button that saves it as a folder. ⋮ on a routine → share outside Hevy. Shared routine and folder links open on hevy.com, according to Hevy's share page. There is also a social feed with follows, likes and comments. | [Routine library](https://www.hevyapp.com/features/gym-workout-routines/), [help: library](https://help.hevyapp.com/hc/en-us/articles/36011518408983-How-to-Access-and-Use-Hevy-s-Routine-and-Program-Library) [I], [share folders and routines](https://www.hevyapp.com/features/share-folders-routines/) (page body didn't render for my fetcher; content seen through search), [social guide](https://help.hevyapp.com/hc/en-us/articles/35688036014231-Hevy-App-Social-Guide-Connect-Follow-and-Share-Your-Workouts) [I] |
| **Lyfta** | The **Explore** tab is in the bottom nav (screens). A user reports that the app's ready-made workouts are found "in the explore button" [R]. Lyfta offers sharing of workouts and routines, follows, monthly challenges and leaderboards. Premium adds "programs from professionals and the community". The **feed card** is verified: name, date, Duration / Volume / Records medals, exercise thumbnails with "N x" set counts, and Like / Comment / Share. | Screens; [Reddit](https://www.reddit.com/r/Lyfta_App/comments/1krspjv/how_to_remove_a_exercise_from_a_workout_plan/) [R][I]; [App Store](https://apps.apple.com/us/app/lyfta-gym-workout-tracker-log/id6443740936); [Premium](https://lyfta.app/subscription) |
| **Strong** | Only a share sheet for routines and workouts. There is no feed or community. | [App Store](https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577), [Gript review](https://griptapp.com/compare/strong-app-review) (third party) |
| **Fitbod** | **Gap closed.** ⋯ next to **Swap** → **Share Workout Link**. The recipient gets the *same exercises and order but sets, reps and weights re-personalised* to their history. Workouts containing custom exercises can't be shared. Gym equipment setups are shareable (My Plan → Location → ⋯ → Share). After a workout, **Share** shows swipeable summary cards for Instagram Stories. A Fitbod rep confirmed there is no built-in social mode (Jun 2024). | [help: sharing](https://help.fitbod.me/hc/en-us/articles/360006427453-Sharing-a-Workout-Gym-Location-Settings) [I], [Reddit: Fitbod rep](https://www.reddit.com/r/fitbod/comments/1dib623/using_fitbod_with_friends/) [R][I] |

**Copy:**
- Hevy's filter chips plus one primary **Save** button.
- Fitbod's *"shared plan, personalised numbers"*. It fits Carlsen: a shared routine keeps its structure, while RIR, load and Why? text adapt to the recipient.
- Fitbod's swipeable share cards for the post-workout summary.

**Avoid:**
- A full social feed in the prototype. It is out of scope and costly. A static Explore list of 3–4 programs is enough.

## 3. Adding and swapping exercises mid-workout

| App | Add | Swap / replace | Reorder / remove | After the workout | Source |
|---|---|---|---|---|---|
| **Hevy** | Blue **+ Add exercise** with search and equipment/muscle filters (400+ exercises) | ⋮ → **Replace** | ⋮ → drag to reorder, Superset, warm-up sets, Remove | If exercises or sets changed: **"Update Routine"** or **"Keep Original Routine"** (not asked for weight/rep changes) | [programming options](https://www.hevyapp.com/features/exercise-programming-options/), [help](https://help.hevyapp.com/hc/en-us/articles/38387296276375-Update-Routine-vs-Keep-Original-Routine) [I] |
| **Lyfta** | Not seen in the screens (the logger's bottom button is cut off) | ⋮ → **Replace Exercise** opens the picker *pre-filtered to the same muscle group, with recently performed lifts at the top* [R] | ⋮ → Edit → ⋮ → Remove Exercise (routine) [R] | Finish Workout saves to History. The routine is unchanged unless edited. | [Reddit: replace](https://www.reddit.com/r/Lyfta_App/comments/1kikm3g/feature_request_add_substitute_exercises_as_part/) [R][I], [support](https://support.lyfta.app/en/article/create-and-edit-routines), screens (⋮ per exercise, "+ Add Set", collapsed "0/3 done") |
| **Strong** | **Add Exercises** (library or create your own) | Replace Exercise from the exercise's More (…) menu (confirmed by Strong staff on Reddit) | Drag the exercise name; **swipe to delete** a set; checkbox completes a set | **Finish** at top right; you can finish without completing everything | [help: first workout](https://help.strongapp.io/article/229-my-first-workout), [Reddit: Strong staff](https://www.reddit.com/r/strongapp/comments/1hmnnsb/how_do_you_handle_alternative_exercises/) [R][I] |
| **Fitbod** | Scroll to the bottom → **+Add Exercise** (tabs All / By Muscle / Categories; filter by your equipment) | **Swipe left → Replace**. The list sorts by **Best Replacements** / Most / Least / Never Logged and filters Same / Different / No equipment. | Swipe left → Delete; long-press to reorder | Day-level **Swap** applies to that workout only; the split continues | [Editing workouts](https://help.fitbod.me/hc/en-us/articles/360006335593-Editing-Workouts-in-Fitbod) [I], [Focus Exercises FAQ](https://help.fitbod.me/hc/en-us/articles/35301260960663-Focus-Exercises) [I] |

**Users want this:** Lyfta and Strong users both ask for pre-planned substitute exercises because machines are busy ([Lyfta request](https://www.reddit.com/r/Lyfta_App/comments/1kikm3g/feature_request_add_substitute_exercises_as_part/) [R], [Strong thread](https://www.reddit.com/r/strongapp/comments/1hmnnsb/how_do_you_handle_alternative_exercises/) [R]).

**Copy:**
- ⋮ → **Replace** opening a bottom sheet pre-filtered to the same muscle (Lyfta) and ranked "Best match" (Fitbod).
- Each candidate shows a one-line Why? match reason, e.g. "same muscle · loads it in the stretched position". The ranking is the Carlsen twist.
- Hevy's **Update plan / Just today** choice on Finish.
- Strong's swipe-to-delete set.

**Avoid:**
- Workout-reset accidents. A Lyfta review reports losing a 3-hour workout to the collapse arrow (see teardown). Put destructive actions behind a confirm or undo.

## 4. Weekly per-muscle stats

| App | Where | What it shows | Free / paid | Source |
|---|---|---|---|---|
| **Hevy** | Profile → **Statistics** | A "Last 7 days" body graph (muscles highlighted in blue). **Muscle distribution (Body):** sets per muscle for one calendar week, with ◀ ▶ week arrows and a share icon. **Set count per muscle group:** checkbox muscles onto a graph with two dropdowns (period × weekly/monthly grouping). **Counting rule:** primary muscle = 1 set, secondary = 0.5, warm-ups included. The help text cites "approximately 10–20 sets per muscle group per week". | Set count is Pro. Free history is limited to 3 months. | [help: sets per muscle](https://help.hevyapp.com/hc/en-us/articles/44128140257431-How-Does-Sets-per-Muscle-Group-Work) [I], [statistics explained](https://help.hevyapp.com/hc/en-us/articles/35702030346903-Hevy-Statistics-Explained-Track-Your-Training-Progress-and-Muscle-Growth) [I], [muscle group chart](https://www.hevyapp.com/features/muscle-group-workout-chart/), [gym performance](https://www.hevyapp.com/features/gym-performance/) |
| **Lyfta** | Progress / recaps | Muscle split analysis; weekly and monthly recaps with **muscle maps and set distribution**; muscle radar trends. A Premium user describes a muscle graph showing **sets and volume** and a weekly **heat-map summary** [R]. The feed card shows **tonnage** ("5 098 kg"), not sets (screens). | Recaps and analysis are Premium | [Premium](https://lyfta.app/subscription), [Reddit](https://www.reddit.com/r/Lyfta_App/comments/1iawq4b/the_graph_for_seeing_which_muscles_need_more_work/) [R][I], screens |
| **Strong** | Profile dashboard widgets | **Gap closed: no per-muscle set stats.** Widgets are Workouts per Week (with a goal), calories and macros, and per-exercise or measurement charts. Users still asked for sets per muscle in Jan 2026, and third-party tools fill the gap through CSV export. | Some charts are PRO | [help: profile widgets](https://help.strongapp.io/article/239-profile-widgets), [Reddit Jan 2026](https://www.reddit.com/r/strongapp/comments/1qkij1f/when_are_we_going_to_see_the_number_of_sets_per/) [R][I] |
| **Fitbod** | Body / Recovery tab plus My Plan | A 0–100% **recovery heat map** per muscle with a manual override ("a model, not a measurement"). **Weekly Set Targets** come from days/week and duration. I couldn't verify how targets are displayed per muscle. | Subscription | [How it works](https://help.fitbod.me/hc/en-us/sections/360001078993-Understanding-Fitbod-How-It-Works) [I], [My Plan](https://help.fitbod.me/hc/en-us/articles/34336407191191-My-Plan) [I] |

**Copy:**
- Hevy's week view (a body map plus a per-muscle set list with ◀ ▶ week arrows).
- Hevy's transparent 1 / 0.5 counting rule, stated in a footnote.
- Fitbod's "it's a model" honesty and manual override.

**Carlsen twist:**
- Count **hard sets** (logged RIR ≤ 3) rather than all sets or tonnage.
- Show each muscle's bar against a target band. The 10–20 band is a placeholder until Silas's library sets it.
- Add a Why? chip on the band.

**Avoid:**
- Tonnage as the headline number (Lyfta's feed card).
- Paywalling the core stat. It is Carlsen's main idea.

---

# Part 2: Making it look shipped, not AI-generated

## 5. What impeccable says (files read in the repo, 29 Oct 2026)

| Rule | File / rule id | What it means for Carlsen |
|---|---|---|
| The AI tells: "Inter for everything. Purple-to-blue gradients. Cards nested in cards, gray text on colored backgrounds, a rounded-square icon tile above every heading." | [README](https://github.com/pbakaus/impeccable) | Avoid all five. |
| "Ported from a website" is the iOS slop tell; use platform components | [skill/reference/ios.md](https://github.com/pbakaus/impeccable/blob/main/skill/reference/ios.md) | Use a native-looking tab bar, sheets, swipe actions and steppers. |
| SF Pro carries the UI; Dynamic Type styles; **11 pt floor, Body 17 pt**; **44×44 pt** targets; **one tint colour**; SF Symbols, "don't mix in a web icon set"; large titles on top-level screens | ios.md (`ios-typo-*`, `ios-touch-target-44pt`, `ios-color-single-tint`, `ios-components-sf-symbols`, `ios-layout-large-titles`) | See the token sheet in §8. |
| Roboto is the system face; Material type roles; **sp units**; **48×48 dp** targets with **8 dp** between; dark theme is "never a quick invert"; tonal elevation; one FAB | [skill/reference/android.md](https://github.com/pbakaus/impeccable/blob/main/skill/reference/android.md) | Android variant of the token sheet. |
| A **4-unit spacing base**; rhythm from tight vs generous gaps; group by proximity before adding containers | [skill/reference/layout.md](https://github.com/pbakaus/impeccable/blob/main/skill/reference/layout.md) | Tight spacing inside set rows, generous between exercise blocks. |
| Tabular numerals; light-on-dark text needs slightly more line height, tracking and weight; a second family only with a clear role | [skill/reference/typeset.md](https://github.com/pbakaus/impeccable/blob/main/skill/reference/typeset.md) | `tabular-nums` on kg, reps, RIR and timers. |
| The strongest colour owns a role; don't spend the primary colour on decoration; colour mustn't be the only code in data; design dark surfaces explicitly; WCAG AA 4.5:1 for body text, 3:1 for large text | [skill/reference/colorize.md](https://github.com/pbakaus/impeccable/blob/main/skill/reference/colorize.md) | Volume bands need a label as well as colour. |
| Product UIs: **one font family**; scale ratio **1.125–1.2**; accent "for primary actions, current selection, and state indicators only"; no display fonts in labels or data; empty states that teach | [skill/reference/operate.md](https://github.com/pbakaus/impeccable/blob/main/skill/reference/operate.md) (`product-*` rules) | See §8. |
| Bans: gradient text; emoji or Unicode glyphs as icons; nested cards; colored side-stripe borders >1px; a border *and* a soft shadow together (the "ghost card"); card radius 12–16px with pills only for small controls; the generic "hero-metric" template | [skill/reference/craft-floor.md](https://github.com/pbakaus/impeccable/blob/main/skill/reference/craft-floor.md) (`skill-ban-*`) | **Nuance:** stat rows *are* native to lifting apps (Lyfta: Duration / Volume / Records). Keep them as a compact data row, not a giant decorative hero number. |

## 6. What the apps actually use (verified vs unverified)

| App | In-app (verified) | Website CSS (marketing site only, *not* proof of the app) | Unverified |
|---|---|---|---|
| **Lyfta** | From Hoang's screenshots (pixel-sampled, JPEG so ±a few values):<br>• Background is **pure black #000000**, with raised surfaces about **#1F1F1F / #161719**.<br>• One **blue accent ≈ rgb(40,145,220) ≈ #2891DC**, used on set numbers, the "Rest Timer" link, the timer icon and the disabled Finish button.<br>• Gold, silver and bronze medal icons for records.<br>• Red (primary) and blue (secondary) muscle colours.<br>• A clean geometric sans with large bold numbers.<br>• Outline-style nav icons. | The lyfta.app HTML references Roboto, Inter and Montserrat (Montserrat 800 for headings) and colour #017AFF besides Bootstrap defaults. | The app's font family and icon library. The accent's exact hex. |
| **Hevy** | Store listing only (screenshots not inspected). Blue highlights on muscle diagrams are documented ([help](https://help.hevyapp.com/hc/en-us/articles/35702030346903-Hevy-Statistics-Explained-Track-Your-Training-Progress-and-Muscle-Growth) [I]). | hevy.com uses **Figtree** (Next.js font). hevyapp.com (WordPress) uses Inter. | The app's font, icons and hex values. |
| **Strong** | n/a | strong.app (Webflow) uses Inter plus Merriweather. | The app's font, icons and hex values. |
| **Fitbod** | n/a | fitbod.me uses a `system-ui, -apple-system…` stack. | The app's font, icons and hex values. |

**Method:** website fonts were grepped from the live HTML/CSS on 29 Oct 2026. Lyfta app colours were sampled from the screenshot pixels. No press kits were found.

**Takeaway:** the shipped look is a **near-black canvas, one blue tint, medal colours for records, red/blue muscle anatomy, and big bold numerals**. It does not depend on a fancy typeface.

## 7. Platform specs to build against

| Spec | iOS (Apple HIG) | Android (Material 3) |
|---|---|---|
| Min tap target | **44×44 pt** ([HIG UI tips](https://developer.apple.com/design/tips/), [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)) | **48×48 dp**, ≥8 dp apart ([M2 spacing / touch targets](https://m2.material.io/design/layout/spacing-methods.html)) |
| Body text | **17 pt** (SF Pro) ([HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography)) | bodyLarge **16 sp** / 24 line height ([M3 type scale](https://m3.material.io/styles/typography/type-scale-tokens)) |
| Large title / headline | Large Title **34 pt** ([HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography)) | titleLarge **22 sp** / 28 line height ([M3](https://m3.material.io/styles/typography/type-scale-tokens)) |
| Spacing grid | Use a 4/8 rhythm (impeccable layout.md) | 8 dp base, 4 dp for small elements ([M2 spacing](https://m2.material.io/design/layout/spacing-methods.html), [M3 spacing](https://m3.material.io/styles/spacing/tokens)) |
| Icons | **SF Symbols** | **Material Symbols** (Rounded or Outlined) |

## 8. Carlsen token sheet (apply directly)

**Fonts**
- Web prototype: `font-family: system-ui, -apple-system, "SF Pro Text", Roboto, sans-serif;`.
- One family only, with `font-variant-numeric: tabular-nums` on all numbers.
- If a brand face is wanted, use it **only** for the big workout title (Lyfta's site uses Montserrat 800 that way). Never use it in tables.

**Type scale (ratio about 1.2)**

| Role | Size / line height | Weight |
|---|---|---|
| Caption | 12 / 16 | 500 |
| Label | 13 / 18 | 600, uppercase off |
| Body | 15–17 / 22 | 400 |
| Title | 20 / 26 | 600 |
| Screen title | 28 / 34 | 700 |
| Stat number | 22–24 / 28 | 700 |

**Spacing:** 4 · 8 · 12 · 16 · 24 · 32.
- Set row: 8 vertical padding, 48 row height.
- Between exercise blocks: 24.
- Screen gutter: 16.

**Targets:** ≥44 pt (iOS build) or 48 dp (Android). The ✓ set button and ⋮ need full-size hit areas even though the icons are small.

**Colour (dark-first, borrowing the verified Lyfta structure)**

| Token | Value |
|---|---|
| bg | #000000 or #0B0B0C |
| surface | #161719 |
| surface-2 | #1F1F1F |
| separator | #2A2A2A |
| text | #FFFFFF |
| text-2 | #A0A0A5 (check 4.5:1 on surface) |
| accent | **one** blue, e.g. #2F8FE0 |
| Medals | gold #D4A72C, silver #A8B0B8, bronze #B87333 |
| Volume band | below = amber, in range = green, above = red, **always with a text label** |
| Muscle map | primary = red, secondary = muted blue (Lyfta convention) |

- The accent is used for: active set, primary button, links, "Why?" chips, and the timer.
- The medal and band hexes are suggestions, not taken from any app.

**Shape:**
- Cards: radius 12, either a 1px border or a surface tint, never both, and **no nested cards**.
- Chips and pills only for small controls (e.g. the "Why?" chip).

**Icons:** one set at one stroke weight. Use SF Symbols if mocking iOS, Material Symbols for Android, or Lucide at 1.75px stroke for a neutral web prototype. Never emoji.

**Navigation:**
- Tab bar with 4–5 *sections*: Home · Plan · Workout · Library · You (mirrors Lyfta's verified nav).
- Bottom sheets for Replace and the Why? evidence panel.
- Large title on top-level screens.

## 9. Do / Don't checklist

| Do | Don't |
|---|---|
| Real data: "Bench Press · 75 kg × 4 · RIR 2", real dates | Lorem ipsum, "Exercise 1", round placeholder numbers |
| Dense grid set table: Set / Previous / Kg / Reps / RIR / ✓ | Each set as its own card |
| One accent for state and action | Purple-blue gradients, gradient text, a second accent |
| Platform controls: steppers, swipe-to-delete, sheets, ⋮ menus | Custom toggles and pickers, a web-style back button |
| Empty states that teach ("Log your first set; RIR = reps you could still do") | "Nothing here yet 🎉" |
| Tight-then-generous spacing rhythm | One spacing value everywhere, centred lists |
| Muscle map as the only rich illustration | Icon tiles above every heading, stock fitness photos |
| Medals and colour-coded bands with labels | Colour as the only signal |
| Confirm or undo on destructive actions (discard workout) | One-tap workout reset (a Lyfta complaint) |

---
**Remaining gaps:**
- The Lyfta routine-builder screen UI and Explore tab contents (not in the screenshots).
- The in-app fonts, icon libraries and exact accent hexes for all four apps. Lyfta's colours are pixel-sampled, not official.
- How Fitbod displays weekly set targets.
- I didn't inspect the Hevy, Strong or Fitbod store screenshots.
