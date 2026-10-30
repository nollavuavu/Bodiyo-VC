# Carlsen: Product Teardown (Lyfta + competitors)

*Researched 29 Oct 2026 (Helsinki time) by Agent Vance for Project Carlsen. All sources are public pages. Links were checked with curl. **[L]** = page returned 200. **[I]** = page returned 403 to curl (bot protection on Zendesk/Cloudflare), so its content was read through the search index instead.*

---

## 1. Lyfta teardown

**What it is:** a free, ad-free strength tracker for iOS, Android, Apple Watch and Wear OS. The developer is Lindberg Development AS. It claims 7M+ users and 600M+ tracked lifts.
Sources: [lyfta.app](https://www.lyfta.app) [L], [App Store](https://apps.apple.com/us/app/lyfta-gym-workout-tracker-log/id6443740936) [L], [Google Play](https://play.google.com/store/apps/details?id=com.lyfta&hl=en_US) [L]

**Ratings (as of 29 Oct 2026):** 4.8★ from about 7.2K ratings on the US App Store and 4.7–4.8★ from about 63K reviews on Google Play. The number varies by locale. Sources: same store links as above.

### Main screens and user flow
> **Partly superseded (29 Oct 2026):** the feed, logger and exercise-detail screens are now verified from real screenshots in §1b below. Rows marked ✅ are confirmed by those screenshots. Onboarding and the program picker are still inferred from the listings.

Lyfta's public pages describe features, not screen-by-screen flows. The flow below is built from those feature lists. I did **not** view the store screenshots image by image, and I did not install the app.

| Area | What the public listings confirm |
|---|---|
| **Onboarding** | Download, create an account, then start a workout ([lyfta.app](https://www.lyfta.app)). The listings do not describe onboarding questions such as goal or experience. **Unverified.** |
| **Program / split picker** | Ready-made programs including PPL, Upper/Lower, Full Body, StrongLifts 5x5, nSuns, GZCL, "RP Hypertrophy" and GVT, plus custom routines and the option to "plan your training weeks in advance" ([App Store](https://apps.apple.com/us/app/lyfta-gym-workout-tracker-log/id6443740936), [Play](https://play.google.com/store/apps/details?id=com.lyfta&hl=en_US)). Program discovery by goal (strength, muscle gain, weight loss) is a **Premium** feature ([Premium page](https://lyfta.app/subscription)). |
| **Workout logging** ✅ | Log sets, reps, weight, RPE and notes. Shows last session's performance. Supports warm-up, drop, failure and superset sets, auto rest timers, live notifications, automatic PRs and a 1RM calculator ([Play](https://play.google.com/store/apps/details?id=com.lyfta&hl=en_US), [App Store](https://apps.apple.com/us/app/lyfta-gym-workout-tracker-log/id6443740936)). |
| **Exercise library** ✅ (detail page) | 5,000+ exercises with HD video. Search by muscle or equipment, swap in alternatives, and add custom exercises ([lyfta.app](https://www.lyfta.app), [Play](https://play.google.com/store/apps/details?id=com.lyfta&hl=en_US)). Custom exercise creation is listed as **Premium** ([Premium page](https://lyfta.app/subscription)). |
| **Progress** | Strength and volume charts, PRs, weekly and monthly stats, muscle-group insights, body measurements and a muscle-recovery view. Premium adds all-time charts, recaps, muscle radar, strength standards and rankings ([Premium page](https://lyfta.app/subscription)). |
| **Social** ✅ (feed card) | Friends feed, monthly challenges, leaderboards, streaks, and public or private profiles ([App Store](https://apps.apple.com/us/app/lyfta-gym-workout-tracker-log/id6443740936)). |
| **Integrations** | Apple Health, Strava, Apple Watch, Wear OS and widgets (store listings above). |

### Free vs Premium
Source: [lyfta.app/subscription](https://lyfta.app/subscription)
- **Free:** workout tracking, exercise library, and saving or creating plans.
- **Premium:** premium programs and discovery, workout analysis (muscle split, rep-range or "training zone" breakdown for strength, hypertrophy and endurance), recaps, all-time charts, strength standards, plate calculator, warm-up auto-insert, and custom exercises.
- There is a 14-day trial ([App Store](https://apps.apple.com/us/app/lyfta-gym-workout-tracker-log/id6443740936)). Monthly, annual and lifetime plans are available, but the page says prices are shown only after login.
- A third-party tracker lists US prices of $5.99–12.99/month and $17.99–79.99/year ([apppricer.com](https://apppricer.com/app/6443740936)). These are **not first-party** figures.
- **Inconsistency:** the Play listing says Premium unlocks "unlimited routines", while the iOS listing says "unlimited custom free routines". The routine limit on the free tier is therefore unclear.

### What Lyfta lacks, and common complaints
These come from the [US App Store reviews page](https://apps.apple.com/us/app/lyfta-gym-workout-tracker-log/id6443740936?see-all=reviews) unless another source is linked.
- **No "why" behind anything.** Programs are presented as named templates. I found nothing on the public pages that explains why a split, set count, rep range or rest time was chosen. The rep-range "training zone" breakdown is the closest feature, and it is descriptive (after the fact), not prescriptive.
- **The muscle recovery view is thin.** One reviewer wrote that it "feels kind of bare… room to make it more interactive." The developer replied asking which details would help.
- **Muscle detail is coarse.** Chest exercises are not split into upper and lower chest, and the library has duplicate-looking variants. The developer acknowledged both.
- **Workouts get lost.** A reviewer reported an accidental tap that reset a 3-hour workout and later said the bug was recurring. The developer said a fix was in progress.
- **Paywall clarity and billing.** One reviewer said it was unclear that a feature was Premium. A French-Canadian review complains about being auto-renewed for a full year ([CA-FR reviews](https://apps.apple.com/ca/app/lyfta-suivi-dentra%C3%AEnement/id6443740936?l=fr-CA&platform=iphone&see-all=reviews), link not curl-checked).
- **Other gaps reviewers named:** the Apple Watch app can't start a workout from the watch, cardio logging is weak (no separate walk and run segments), and time-based exercise units are missing.

## 1b. Verified from Hoang's screenshots
*Three screenshots from Hoang's Android phone, taken 29 Oct 2026 at about 16:13–16:14 Helsinki time. Files are in `/workspace/carlsen/lyfta-screens/`. This section describes only what is visible in the images.*

**A. Home feed / history card**
- **Header:** avatar, the name "Việt Normie" with a verified-style badge, and a dumbbell icon with "October 26, 2026 at 08:41 PM". There is a ⋮ menu.
- **Title:** "Evening Workout".
- **Stats:** Duration **45min**, Volume **5 098 kg** (a space is used as the thousands separator). Records are shown as gold, silver and bronze medal icons followed by **5**.
- **Exercises:** thumbnails with set counts: "2 x Lever Seated Shoul…" (truncated), "3 x Triceps Dip", "2 x Bench Press" and "2 x Pull-up". The thumbnails show the target muscles highlighted in red.
- **Social:** "Be the first to give a Like!" with Like, Comment and Share icons.
- **Next card (partly visible):** 24 Oct 2026 at 08:06 PM, 52min, 4 344 kg, 3 records.
- **Bottom nav:** Home (with a blue notification dot), Explore, Workout, Library, You.

**B. Active workout logger**
- **Top bar:** a collapse chevron (⌄) on the left, a stopwatch icon, and a **Finish** button that is dimmed or disabled at this point.
- **Live summary:** Duration **0:00:07**, Volume **0 kg**, Sets **0**.
- **Bench Press block:** thumbnail, ⋮ menu, "Add note…", and "Rest Timer: 3min" (set per exercise).
- **Set table:** columns Set / Previous / Kg / Reps, plus an unlabeled checkmark column. Rows 1 and 2 each read Previous "75kg x 4", Kg 75, Reps 4, with a check button that is not yet ticked (Sets still shows 0). Row 2 is highlighted.
- **"+ Add Set"** button.
- **Collapsed exercises:** "Triceps Dip – 0/3 done" and "Pull-up – 0/2 done".
- **RPE:** there is **no RPE or RIR column** in this view, although the store listings say RPE logging is supported. RPE may be optional or hidden by default; this is unverified.

**C. Exercise detail (Bench Press)**
- **Tabs:** About (selected), History, Progress, Records and "Leaderbo…" (truncated; presumably Leaderboard).
- **Illustration:** a 3D bench-press illustration with a pause button and a fullscreen icon. The pause button suggests it is an animation or video.
- **Buttons:** Favorites, YouTube, Share and "How to…" (truncated).
- **Target Muscles:** front and back body maps. Chest is in red (primary). Front delts and triceps or upper arms are in blue (secondary). The chest is shown as one region with no upper/lower split, which matches the review complaint in §1.
- **Toast:** "Lyfta has detected this screenshot".

**Check against the lead's description:** almost everything matches. Corrections:
1. The collapsed exercises show both **0/3** (Triceps Dip) and **0/2** (Pull-up).
2. The top-left control is a collapse chevron, and Finish is disabled.
3. The set checkmarks are not ticked.
4. "Lyfta logs only kg and reps" holds for this screen only. The store listings advertise RPE logging, so it is more accurate to say "kg and reps by default; no RIR visible."
5. "Leaderboard" and "How to" are truncated on screen.
6. "Animated" is inferred from the pause button.
7. The feed volume is written "5 098 kg", not "5,098".

---

## 2. Competitor comparison

| App | Does well | Shows the "why"? | Price (US, public) |
|---|---|---|---|
| **Hevy** ([App Store](https://apps.apple.com/us/app/hevy-workout-tracker-gym-log/id1458862350) [L], [features guide](https://help.hevyapp.com/hc/en-us/articles/33106320824727-Everything-You-Need-to-Know-About-the-Hevy-App-2026-Features-Guide) [I]) | Fast logging that shows last session's numbers inline, a strong social feed, and 4.9★ from about 101K ratings. Pro includes **Hevy Trainer**, which builds a program from experience, goal and equipment and gives progressive-overload suggestions. | **Partly.** Trainer gives "tips and progressive overload" suggestions. I found no public evidence of citations or research explanations. | Free tier: 4 routines, 7 custom exercises, 3 months of history. Pro pricing is on [hevy.com/pricing](https://hevy.com/pricing) (not curl-checked). |
| **Strong** ([App Store](https://apps.apple.com/us/app/strong-workout-tracker-gym-log/id464254577) [L], [Strong PRO](https://help.strongapp.io/article/132-strong-pro) [L]) | The simplest notebook-style logger, with a standalone Watch app and CSV export. 4.9★ from about 109K ratings. | **No.** An independent review says "It does not tell you what to lift: no generator, no coach, no progression" ([Gript](https://griptapp.com/compare/strong-app-review) [L], third party). | Free: 3 routines. PRO: $4.99/month or $29.99/year (App Store). |
| **Fitbod** ([App Store](https://apps.apple.com/us/app/fitbod-gym-fitness-planner/id1041517543) [L], [How it works](https://help.fitbod.me/hc/en-us/sections/360001078993-Understanding-Fitbod-How-It-Works) [I], [recovery blog](https://fitbod.me/blog/muscle-recovery/) [I]) | Generates each workout from goals, equipment and **per-muscle recovery %** (0–100%, shown as a body heat map). Users can override recovery manually. | **Yes, the mechanism is visible.** The recovery heat map shows *why* certain muscles were picked, and the help docs explain the model ("a model, not a measurement"). It gives no study citations in the app, as far as I could verify. | Search snippet: $15.99/month or $95.99/year with a 7-day trial. **Not first-party verified.** |
| **RP Hypertrophy** ([App Store](https://apps.apple.com/us/app/rp-hypertrophy/id1555614554) [L], [product page](https://rpstrength.com/pages/hypertrophy-app) [L], [progressions](https://help.rpstrength.com/hc/en-us/articles/43864744488599-Hypertrophy-App-Progressions) [I]) | Mesocycle-based hypertrophy plans and a Meso Builder. After each session it asks about **pump, soreness and workload**. Low pump, low soreness and an easy session lead to more sets. Excessive soreness or fatigue leads to fewer sets. Load rises a few % per week, or reps rise if the plate jump is too big. | **Closest to Carlsen.** Each feedback question ties visibly to the next prescription, and the rules are documented in the help center. The app does not show per-recommendation citations, as far as I could verify. | Search snippet: about $34.99/month or $299.99/year. **Not first-party verified.** |

**Takeaway:** Fitbod explains a model (recovery), RP explains a feedback rule (pump, soreness, workload), and Hevy and Strong mostly explain nothing. **None of the four** attaches research citations to each recommendation. That is Carlsen's open lane.

---

## 3. Recommended Carlsen prototype scope (6 screens + 1 shared panel)

| # | Screen | Content | Where "Why?" appears |
|---|---|---|---|
| 1 | **Onboarding** | Goal (hypertrophy or strength), experience (beginner, intermediate, advanced), days per week, session length, equipment. | A small ⓘ next to each question, e.g. "Why we ask about experience: it sets your starting volume." |
| 2 | **Split recommendation** | One recommended split (e.g. Upper/Lower for 4 days) plus 1–2 alternatives. | A one-line reason card under the pick, e.g. "Hits each muscle 2×/week. Frequency spreads tension-generating sets across sessions." Includes a "See evidence →" link. |
| 3 | **Weekly plan** | A Mon–Sun calendar of day cards with muscle groups and weekly sets per muscle. | A "Why?" chip on the weekly set count per muscle (volume landmark rationale). |
| 4 | **Workout day / logger** | Lyfta-style set table extended to **Set / Previous / Target / Kg / Reps / RIR / ✓**. Each exercise has a rest timer, a progression cue ("Last: 75 kg × 4 → try 75 × 5 or 77.5 × 4"), and PR medals on completion. | A Why? chip on the **RIR column** (proximity to failure creates high tension in the last reps), on the **set target** ("3 × 6–10"), on the **rest timer** (longer rest preserves load and tension on later sets), and on the **progression cue** (progressive overload). |
| 5 | **Exercise detail** | Keeps Lyfta's front/back muscle map (primary vs secondary colour), split into regions such as upper and lower chest. Adds a **"Lengthened position"** card showing where the muscle is most stretched (e.g. the bottom of the bench press), plus cues and alternatives. | A Why? chip on the lengthened-position card: training at long muscle lengths is a candidate driver of hypertrophy (cite Silas's library). A "Why this exercise" block. |
| 6 | **Post-session check-in + progress** | Summary card with Duration, **hard sets per muscle** (sets within about 0–3 RIR) **instead of tonnage volume**, records or medals, and RP-style feedback (effort, soreness, performance) with what changes next week. | A Why? chip on hard sets: hard sets near failure track hypertrophy better than kg × reps tonnage, which over-weights heavy, easy sets. Also: "Next week: +1 set for back. Why: you reported low effort and full recovery." |
| 7 | **"Why?" evidence panel** (bottom sheet, reused everywhere) | A plain-language claim (1–2 sentences), the mechanism (mechanical tension), 1–3 citations from Silas's library, and an evidence-strength tag. | It is the destination of every "Why?" chip. |

**Patterns worth borrowing:**
- Verified Lyfta patterns to keep: the Previous column, a per-exercise rest timer, collapsed "0/3 done" exercises, record medals, the front/back muscle map, and About/History/Progress/Records tabs on exercise detail.
- From Hevy and Strong: last session's numbers inline and an auto rest timer.
- From Fitbod: a recovery heat map with a manual override, and honest "this is a model" wording.
- From RP: post-workout feedback that visibly drives the next prescription.
- From Lyfta: a large library with alternatives and a clearly separated free tier. Avoid Lyfta's mistakes: show paywalls clearly and confirm before resetting a workout.

---

## 4. Gaps and unverified items
- **Now verified** from Hoang's screenshots (§1b): the feed card, the workout logger and the exercise detail page.
- **Still unverified:** the onboarding questions, the program or split picker, the Explore and Library tabs, the Progress and Records tab contents, and whether RPE can be enabled in the logger. I did not install the app.
- Lyfta, Fitbod and RP prices come from third-party or search-snippet sources. Lyfta hides its prices until login.
- The Hevy help article, both Fitbod pages and the RP help article return 403 to curl. They exist, and their content was read through the search index, but curl could not confirm they load.
- I couldn't confirm whether any app shows study citations inside the app. My claim that none does is based only on the public pages I read.
- The free-tier routine limit on Lyfta is inconsistent between the iOS and Play listings.
