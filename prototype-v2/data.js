/* Carlsen prototype v2 – programme data (UI logic only).
 * NO justification text or citations live here. Every "Why?" button
 * references a key in evidence.json (exposed as window.EVIDENCE via evidence.js). */
window.CARLSEN_DATA = (function () {
  // The ONE place the user-facing app name lives. "Carlsen" is only the project code name and must never be shown.
  const APP_NAME = "Lift";
  // equip: which equipment profiles can do the exercise
  // profile: resistance profile = where in the range the exercise is hardest for the target muscle
  //   lengthened (hardest near the stretch) | mid (hardest mid-range) | shortened (hardest near the squeeze). Used to rank swaps.
  // gym = full gym, db = dumbbells + bench at home, bw = bodyweight only (+ pull-up bar)
  // Built-in library: used only when exercises.js (generated from Laurent's exercises.json) is not loaded.
  const builtin = {
    barbell_back_squat:    { name: "Barbell Back Squat", pattern: "squat", type: "compound", equip: ["gym"], primary: ["Quads", "Glutes"], secondary: ["Adductors"], profile: "lengthened", lengthened: "Bottom of the squat: quads and glutes are longest at full depth.", cues: ["Brace before you descend", "Knees track over toes", "Control the lowering phase"] },
    goblet_squat:          { name: "Goblet Squat", pattern: "squat", type: "compound", equip: ["db"], primary: ["Quads", "Glutes"], secondary: ["Adductors"], profile: "lengthened", lengthened: "Bottom of the squat: quads and glutes are longest at full depth.", cues: ["Dumbbell held at chest", "Sit between the hips", "Stay upright"] },
    bulgarian_split_squat: { name: "Bulgarian Split Squat", pattern: "squat", type: "compound", equip: ["bw"], primary: ["Quads", "Glutes"], secondary: ["Adductors"], profile: "lengthened", lengthened: "Bottom position: front-leg glute and quad are at their longest.", cues: ["Rear foot on a bench or chair", "Front knee travels forward", "Slow descent"] },

    romanian_deadlift:     { name: "Romanian Deadlift", pattern: "hinge", type: "compound", equip: ["gym"], primary: ["Hamstrings", "Glutes"], secondary: ["Spinal erectors"], profile: "lengthened", lengthened: "Bottom of the hinge: hamstrings are stretched with hips flexed.", cues: ["Push hips back", "Bar close to legs", "Stop when hips stop moving back"] },
    db_romanian_deadlift:  { name: "Dumbbell Romanian Deadlift", pattern: "hinge", type: "compound", equip: ["db"], primary: ["Hamstrings", "Glutes"], secondary: ["Spinal erectors"], profile: "lengthened", lengthened: "Bottom of the hinge: hamstrings are stretched with hips flexed.", cues: ["Soft knees", "Dumbbells slide down thighs", "Neutral spine"] },
    single_leg_rdl:        { name: "Single-Leg RDL", pattern: "hinge", type: "compound", equip: ["bw"], primary: ["Hamstrings", "Glutes"], secondary: ["Spinal erectors"], profile: "lengthened", lengthened: "Bottom of the hinge: standing-leg hamstring is at its longest.", cues: ["Hips stay square", "Reach the free leg back", "Hold a wall if needed"] },

    barbell_bench_press:   { name: "Barbell Bench Press", pattern: "h_push", type: "compound", equip: ["gym"], primary: ["Chest"], secondary: ["Front delts", "Triceps"], profile: "lengthened", lengthened: "Bar at the chest: pecs are at their longest.", cues: ["Shoulder blades set", "Touch lower chest", "Feet planted"] },
    db_bench_press:        { name: "Dumbbell Bench Press", pattern: "h_push", type: "compound", equip: ["db"], primary: ["Chest"], secondary: ["Front delts", "Triceps"], profile: "lengthened", lengthened: "Dumbbells at the bottom: pecs are stretched, usually deeper than with a barbell.", cues: ["Deep stretch at the bottom", "Elbows ~45°", "Press up and slightly in"] },
    push_up:               { name: "Push-Up", pattern: "h_push", type: "compound", equip: ["bw"], primary: ["Chest"], secondary: ["Front delts", "Triceps"], profile: "lengthened", lengthened: "Chest near the floor: pecs are at their longest.", cues: ["Body in one line", "Chest to floor", "Elevate feet to progress"] },

    db_shoulder_press:     { name: "Seated Dumbbell Shoulder Press", pattern: "v_push", type: "compound", equip: ["gym", "db"], primary: ["Front delts"], secondary: ["Triceps", "Side delts"], profile: "lengthened", lengthened: "Dumbbells at ear level: front delts are at their longest.", cues: ["Back supported", "Dumbbells to ear level", "Don't flare the ribs"] },
    pike_push_up:          { name: "Pike Push-Up", pattern: "v_push", type: "compound", equip: ["bw"], primary: ["Front delts"], secondary: ["Triceps"], profile: "lengthened", lengthened: "Head near the floor: front delts are at their longest.", cues: ["Hips high", "Head travels forward of hands", "Elevate feet to progress"] },

    chest_supported_row:   { name: "Chest-Supported Row", pattern: "h_pull", type: "compound", equip: ["gym"], primary: ["Upper back", "Lats"], secondary: ["Rear delts", "Biceps"], profile: "shortened", lengthened: "Arms fully extended: lats and upper back are stretched.", cues: ["Chest stays on pad", "Full stretch at the bottom", "Pull elbows back"] },
    one_arm_db_row:        { name: "One-Arm Dumbbell Row", pattern: "h_pull", type: "compound", equip: ["db"], primary: ["Lats", "Upper back"], secondary: ["Rear delts", "Biceps"], profile: "shortened", lengthened: "Dumbbell hanging low with shoulder reaching forward: lat is stretched.", cues: ["Hand and knee on bench", "Pull toward the hip", "Let the shoulder stretch forward"] },
    inverted_row:          { name: "Inverted Row", pattern: "h_pull", type: "compound", equip: ["bw"], primary: ["Upper back", "Lats"], secondary: ["Biceps"], profile: "shortened", lengthened: "Arms straight at the bottom: upper back and lats are stretched.", cues: ["Use a low bar or table edge", "Body rigid", "Chest to the bar"] },

    lat_pulldown:          { name: "Lat Pulldown", pattern: "v_pull", type: "compound", equip: ["gym"], primary: ["Lats"], secondary: ["Biceps", "Upper back"], profile: "mid", lengthened: "Arms overhead at the top: lats are at their longest.", cues: ["Thighs locked under pad", "Full stretch at the top", "Elbows down to sides"] },
    pull_up:               { name: "Pull-Up", pattern: "v_pull", type: "compound", equip: ["gym", "bw"], primary: ["Lats"], secondary: ["Biceps", "Upper back"], profile: "mid", lengthened: "Dead hang: lats are at their longest.", cues: ["Needs a pull-up bar", "Start from a dead hang", "Use a band to assist if needed"] },

    leg_extension:         { name: "Leg Extension", pattern: "quad_iso", type: "isolation", equip: ["gym"], primary: ["Quads"], secondary: [], profile: "shortened", lengthened: "Knees bent at the start: quads are longest (lean back to add rectus femoris stretch).", cues: ["Pad on lower shin", "Pause at the top", "Control the way down"] },
    sissy_squat:           { name: "Sissy Squat", pattern: "quad_iso", type: "isolation", equip: ["db", "bw"], primary: ["Quads"], secondary: [], profile: "lengthened", lengthened: "Knees forward, hips extended: quads are at their longest.", cues: ["Hold a support", "Knees travel forward", "Hips stay extended"] },

    seated_leg_curl:       { name: "Seated Leg Curl", pattern: "ham_iso", type: "isolation", equip: ["gym"], primary: ["Hamstrings"], secondary: [], profile: "lengthened", lengthened: "Legs straight with hips flexed: hamstrings are at their longest.", cues: ["Lean slightly forward", "Squeeze at full flexion", "Slow return"] },
    slider_leg_curl:       { name: "Slider Leg Curl", pattern: "ham_iso", type: "isolation", equip: ["db", "bw"], primary: ["Hamstrings"], secondary: ["Glutes"], profile: "mid", lengthened: "Legs extended: hamstrings are at their longest.", cues: ["Heels on towel or sliders", "Hips stay up", "Extend slowly"] },

    cable_fly:             { name: "Cable Fly", pattern: "chest_iso", type: "isolation", equip: ["gym"], primary: ["Chest"], secondary: ["Front delts"], profile: "mid", lengthened: "Arms wide open: pecs are at their longest.", cues: ["Slight elbow bend", "Open into a deep stretch", "Hug a tree"] },
    db_fly:                { name: "Dumbbell Fly", pattern: "chest_iso", type: "isolation", equip: ["db"], primary: ["Chest"], secondary: ["Front delts"], profile: "lengthened", lengthened: "Arms wide at the bottom: pecs are at their longest.", cues: ["Fixed elbow angle", "Lower until a stretch", "Don't clash the dumbbells"] },
    deficit_push_up:       { name: "Deficit Push-Up", pattern: "h_push", type: "compound", equip: ["bw"], primary: ["Chest"], secondary: ["Front delts", "Triceps"], profile: "lengthened", lengthened: "Chest below hand level: pecs are stretched past a regular push-up.", cues: ["Hands on books or handles", "Chest below hand level", "Pause in the stretch"] },

    cable_lateral_raise:   { name: "Cable Lateral Raise", pattern: "side_delt", type: "isolation", equip: ["gym"], primary: ["Side delts"], secondary: [], profile: "lengthened", lengthened: "Arm down across the body: side delt is at its longest.", cues: ["Cable behind the body", "Lead with the elbow", "Stop around shoulder height"] },
    db_lateral_raise:      { name: "Dumbbell Lateral Raise", pattern: "side_delt", type: "isolation", equip: ["db"], primary: ["Side delts"], secondary: [], profile: "shortened", lengthened: "Arms at the sides: side delts are at their longest (little load there with dumbbells).", cues: ["Slight forward lean", "Raise out, not up", "No swinging"] },

    cable_rear_delt_fly:   { name: "Cable Rear Delt Fly", pattern: "rear_delt", type: "isolation", equip: ["gym"], primary: ["Rear delts"], secondary: ["Upper back"], profile: "mid", lengthened: "Arms crossed in front: rear delts are at their longest.", cues: ["Cross the cables", "Arms move in an arc", "Keep shoulders down"] },
    db_reverse_fly:        { name: "Dumbbell Reverse Fly", pattern: "rear_delt", type: "isolation", equip: ["db"], primary: ["Rear delts"], secondary: ["Upper back"], profile: "shortened", lengthened: "Arms hanging down in front: rear delts are at their longest.", cues: ["Chest on incline bench", "Pinkies lead", "Light weight, full range"] },

    incline_db_curl:       { name: "Incline Dumbbell Curl", pattern: "biceps", type: "isolation", equip: ["gym", "db"], primary: ["Biceps"], secondary: [], profile: "lengthened", lengthened: "Arm behind the torso, elbow straight: biceps are at their longest.", cues: ["Arms hang behind the torso", "No shoulder swing", "Slow lowering"] },
    chin_up_negative:      { name: "Chin-Up (slow negative)", pattern: "v_pull", type: "compound", equip: ["bw"], primary: ["Lats"], secondary: ["Biceps", "Upper back"], profile: "mid", lengthened: "Bottom of the negative, arms straight: biceps and lats are stretched.", cues: ["Underhand grip", "Jump to the top", "Lower over 3–5 s"] },

    bw_bar_curl:           { name: "Bodyweight Bar Curl", pattern: "biceps", type: "isolation", equip: ["bw"], primary: ["Biceps"], secondary: [], profile: "mid", lengthened: "Arms straight at the bottom, body hanging under the bar: biceps are at their longest.", cues: ["Underhand grip on a low bar", "Body straight, heels on the floor", "Curl your forehead toward the bar"] },

    overhead_cable_extension: { name: "Overhead Cable Triceps Extension", pattern: "triceps", type: "isolation", equip: ["gym"], primary: ["Triceps"], secondary: [], profile: "lengthened", lengthened: "Hands behind the head: long head of the triceps is at its longest.", cues: ["Face away from the stack", "Elbows point forward", "Deep stretch behind the head"] },
    db_overhead_extension: { name: "Dumbbell Overhead Extension", pattern: "triceps", type: "isolation", equip: ["db"], primary: ["Triceps"], secondary: [], profile: "lengthened", lengthened: "Dumbbell behind the head: long head of the triceps is at its longest.", cues: ["Hold one dumbbell with both hands", "Elbows stay narrow", "Lower behind the head"] },
    bench_dip:             { name: "Bench Dip", pattern: "triceps", type: "isolation", equip: ["bw"], primary: ["Triceps"], secondary: ["Front delts"], profile: "lengthened", lengthened: "Bottom of the dip: triceps are at their longest.", cues: ["Hands on bench edge", "Hips close to bench", "Elbows point back"] },

    standing_calf_raise:   { name: "Standing Calf Raise", pattern: "calves", type: "isolation", equip: ["gym", "db", "bw"], primary: ["Calves"], secondary: [], profile: "lengthened", lengthened: "Heels below the step: calves are at their longest.", cues: ["Use a step for range", "Pause in the bottom stretch", "Full rise onto the toes"] }
  };

  // Session templates = ordered movement-pattern slots (max 7). Shorter sessions keep the first N slots.
  // "a|b" = use pattern a, or b if the equipment setup has no exercise for a (e.g. no pull-up bar with dumbbells).
  // Session and split display names are i18n keys: split.session.<session id>, split.name.<split id> (en.json).
  const sessions = {
    full_a: { slots: ["squat", "h_push", "h_pull", "ham_iso", "biceps", "triceps", "side_delt"] },
    full_b: { slots: ["hinge", "v_push", "v_pull|h_pull", "quad_iso", "triceps", "rear_delt", "calves"] },
    full_c: { slots: ["squat", "h_push", "h_pull", "biceps", "side_delt", "rear_delt", "calves"] },
    // 2-day only: two sessions cannot cover every muscle directly twice within 7 slots (see README audit)
    full_2a: { slots: ["squat", "h_push", "h_pull", "ham_iso", "biceps", "triceps", "side_delt"] },
    full_2b: { slots: ["hinge", "h_push", "v_pull|h_pull", "quad_iso", "triceps", "biceps", "rear_delt"] },
    upper: { slots: ["h_push", "v_pull|h_pull", "h_pull", "biceps", "triceps", "side_delt", "v_push"] },
    upper_b: { slots: ["h_pull", "h_push", "v_push", "triceps", "biceps", "side_delt", "rear_delt"] },
    upper_h: { slots: ["h_pull", "h_push", "v_push", "triceps", "biceps", "side_delt", "rear_delt"] },
    lower: { slots: ["squat", "hinge", "quad_iso", "ham_iso", "calves", "core"] },
    lower_b: { slots: ["hinge", "squat", "ham_iso", "quad_iso", "calves", "core"] },
    lower_h: { slots: ["squat", "hinge", "quad_iso", "ham_iso", "calves", "core"] },
    push: { slots: ["h_push", "v_push", "triceps", "side_delt", "chest_iso"] },
    pull: { slots: ["v_pull|h_pull", "h_pull", "biceps", "rear_delt"] },
    legs: { slots: ["squat", "hinge", "quad_iso", "ham_iso", "calves", "core"] }
  };

  // ---------- exercise source ----------
  // exercises.js (generated from /workspace/carlsen/exercises.json) replaces the built-in library when present.
  const EXL = (typeof window !== "undefined" && window.CARLSEN_EXERCISES) || null;
  const exercises = EXL ? EXL.exercises : builtin;
  const aliases = EXL ? EXL.aliases : {};
  // Template slot -> exercises.json movementPattern (+ required first primary muscle). Tried in order; "a|b" in a slot tries slot a, then b.
  // Only slots that map cleanly to a movementPattern; a slot with no exercise for the equipment is left out of the session.
  const slotSpecs = {
    squat:     [{ p: "squat" }, { p: "lunge" }],
    hinge:     [{ p: "hinge", m: "Hamstrings" }, { p: "hinge" }, { p: "hip-extension" }],
    h_push:    [{ p: "horizontal push", m: "Chest" }],
    v_push:    [{ p: "vertical push", m: "Front delts" }],
    h_pull:    [{ p: "horizontal pull", m: ["Upper back", "Lats"] }],
    v_pull:    [{ p: "vertical pull", m: "Lats" }],
    quad_iso:  [{ p: "isolation-knee-extension" }],
    ham_iso:   [{ p: "isolation-knee-flexion" }],
    chest_iso: [{ p: "isolation-horizontal-adduction" }],
    side_delt: [{ p: "isolation-shoulder-abduction" }],
    rear_delt: [{ p: "isolation-horizontal-abduction" }],
    biceps:    [{ p: "isolation-elbow-flexion", m: "Biceps" }],
    triceps:   [{ p: "isolation-elbow-extension" }, { p: "horizontal push", m: "Triceps" }],
    calves:    [{ p: "isolation-plantar-flexion" }],
    core:      [{ p: "core-flexion" }, { p: "core-anti-extension" }]
  };

  // Split per days/week. whyKey -> evidence.json
  const splits = {
    2: { id: "full_body",   whyKey: "split.full_body",   sessions: ["full_2a", "full_2b"],                       weekdays: [0, 3] },
    3: { id: "full_body",   whyKey: "split.full_body",   sessions: ["full_a", "full_b", "full_c"],               weekdays: [0, 2, 4] },
    4: { id: "upper_lower", whyKey: "split.upper_lower", sessions: ["upper", "lower", "upper_b", "lower_b"],     weekdays: [0, 1, 3, 4] },
    5: { id: "hybrid", whyKey: "split.hybrid",      sessions: ["upper_h", "lower_h", "push", "pull", "legs"],    weekdays: [0, 1, 3, 4, 5] },
    6: { id: "ppl", whyKey: "split.ppl",         sessions: ["push", "pull", "legs", "push", "pull", "legs"], weekdays: [0, 1, 2, 3, 4, 5] }
  };

  // Prescriptions (numbers only; justification is in evidence.json)
  const prescription = {
    sets: { beginner: 3, intermediate: 3, advanced: 3 },
    reps: {
      strength:    { compound: "3–6",  isolation: "8–12" },
      hypertrophy: { compound: "6–12", isolation: "10–20" },
      general:     { compound: "8–12", isolation: "12–20" }
    },
    rir: {
      beginner:     { compound: "2–3", isolation: "1–2" },
      intermediate: { compound: "1–3", isolation: "0–1" },
      advanced:     { compound: "1–2", isolation: "0–1" }
    },
    rest: { compound: "2–3", isolation: "2–3" },   // minutes; shown with common.minutes. Product default (Hoang) inside T6's approved 90 s–3 min
    restSeconds: { compound: 150, isolation: 150 }
  };

  // Labels are i18n keys: onboarding.goal.<id>(.sub), onboarding.experience.<id>(.sub), common.minutes, common.equipment.<id>(.sub).
  const options = {
    goal: [{ id: "hypertrophy" }, { id: "strength" }, { id: "general" }],
    experience: [{ id: "beginner" }, { id: "intermediate" }, { id: "advanced" }],
    days: [2, 3, 4, 5, 6],
    sessionLength: [{ id: 45, maxExercises: 5 }, { id: 60, maxExercises: 6 }, { id: 75, maxExercises: 7 }, { id: 90, maxExercises: 7 }],
    equipment: [{ id: "gym" }, { id: "db" }, { id: "bw" }]
  };

  // Alternatives shown on the split screen (days -> other splits that fit)
  const alternatives = { 2: [], 3: [4], 4: [3, 5], 5: [4, 6], 6: [5, 4] };
  // Muscle groups shown on the front/back map
  const muscles = {
    front: ["Chest", "Front delts", "Side delts", "Biceps", "Abs", "Quads", "Adductors", "Calves"],
    back: ["Rear delts", "Side delts", "Upper back", "Lats", "Triceps", "Spinal erectors", "Glutes", "Hamstrings", "Calves"]
  };
  // Weekday labels come from Intl in the current language (app.js weekdayShort); 0 = Monday.

  // Muscles the tracker, reminders and plan notes reason about (all have direct exercises in the library).
  // With exercises.json: the 14 agreed muscle names. Built-in fallback: the v1 set.
  const trackedMuscles = EXL ? ["Chest", "Upper back", "Lats", "Front delts", "Side delts", "Rear delts", "Biceps", "Triceps", "Forearms", "Quads", "Hamstrings", "Glutes", "Calves", "Abs"]
    : ["Chest", "Upper back", "Lats", "Front delts", "Side delts", "Rear delts", "Biceps", "Triceps", "Quads", "Hamstrings", "Glutes", "Calves"];
  // Extra muscles a custom exercise may list (built-in fallback only).
  const extraMuscles = EXL ? [] : ["Abs", "Adductors", "Spinal erectors", "Forearms"];
  const muscleRegion = { Chest: "push", "Front delts": "push", "Side delts": "push", Triceps: "push", "Upper back": "pull", Lats: "pull", "Rear delts": "pull", Biceps: "pull",
    Quads: "legs", Hamstrings: "legs", Glutes: "legs", Calves: "legs", Adductors: "legs", Abs: "core", "Spinal erectors": "core", Forearms: "pull" };
  // Display labels for e.profile: common.profile.<id> in en.json (app.js looks them up; no English here).

  // Numbers the coaching logic uses. Every one traces to evidence.md, or is a listed product convention (see `conventions`).
  const rules = {
    hardSetMaxRIR: 3,          // §5 (a) / §10: sets within ~0-3 RIR count as hard sets (a counting convention)
    secondaryWeight: 0.5,      // round-one §5 (d) (Pelland 2026 counts indirect sets as half); also §10 (b): direct sets x 1 + indirect (helper-muscle) sets x 1/2 (Pelland 2026)
    frequencyTarget: 2,        // §4 (b): hit each muscle about 2x per week
    sessionSets: [3, 8],       // §5 (b): roughly 3-8 hard sets per muscle per session (a practical heuristic). §12: soft warning only, never a cap
    exerciseSets: [2, 4],      // §5 (b): about 2-4 hard sets per exercise
    weeklyBand: null,          // round-one §5: more sets help with diminishing returns, no band given (§10, approved ~19:00, agrees): no fixed weekly target (continuous dose-response: more sets help, each adds a bit less)
    // §9 (b): double progression with "the smallest available weight step". The step sizes are a product convention.
    progression: { loadStepKg: 2.5, smallLoadStepKg: 1, smallLoadBelowKg: 10 }
  };
  // Product conventions: numbers or triggers evidence.md does not set. Shown on the You screen and in the matching Why? sheet.
  // Text: settings.convention.<id> in en.json ({app} = APP_NAME).
  const conventions = [
    { id: "load-step", whyKey: "progression.suggestion" },
    { id: "easy-trigger", whyKey: "progression.suggestion" },
    { id: "bodyweight", whyKey: "progression.suggestion" },
    { id: "blank-rir", whyKey: "rir.input" },
    { id: "session-note", whyKey: "reminder.session_sets" },
    // Hoang's decision (29 Oct, 19:00): 2–3 min / 2:30 default on every exercise, a choice inside approved T6's 90 s–3 min range.
    { id: "rest-default", whyKey: "rest.compound", alsoFor: ["rest.isolation"] }
  ];
  // Community splits: SAMPLE DATA for the prototype (not real users).
  const X = (exId, sets) => ({ exId, sets });
  // Names, blurbs and day names are i18n keys: community.<id>.name, .blurb, .day<N> (en.json). Days get `name` filled in by app.js.
  const communitySplits = [
    { id: "c-bro5", author: "sample_lifter", sample: true,
      days: [
        { exercises: [X("barbell_bench_press", 4), X("db_bench_press", 4), X("cable_fly", 4), X("push_up", 3)] },
        { exercises: [X("lat_pulldown", 4), X("chest_supported_row", 4), X("one_arm_db_row", 3), X("pull_up", 3)] },
        { exercises: [X("db_shoulder_press", 4), X("cable_lateral_raise", 4), X("db_lateral_raise", 3), X("cable_rear_delt_fly", 3)] },
        { exercises: [X("incline_db_curl", 4), X("overhead_cable_extension", 4), X("bw_bar_curl", 3), X("bench_dip", 3)] },
        { exercises: [X("barbell_back_squat", 4), X("romanian_deadlift", 4), X("leg_extension", 3), X("seated_leg_curl", 3), X("standing_calf_raise", 4)] }
      ] },
    { id: "c-fb3", author: "three_day_dana", sample: true,
      days: [
        { exercises: [X("barbell_back_squat", 3), X("barbell_bench_press", 3), X("chest_supported_row", 3)] },
        { exercises: [X("romanian_deadlift", 3), X("db_shoulder_press", 3), X("lat_pulldown", 3)] },
        { exercises: [X("goblet_squat", 3), X("db_bench_press", 3), X("one_arm_db_row", 3)] }
      ] },
    { id: "c-ul4", author: "plate_math", sample: true,
      days: [
        { exercises: [X("barbell_bench_press", 3), X("chest_supported_row", 3), X("db_shoulder_press", 3), X("lat_pulldown", 3), X("incline_db_curl", 2), X("overhead_cable_extension", 2)] },
        { exercises: [X("barbell_back_squat", 3), X("romanian_deadlift", 3), X("standing_calf_raise", 3)] },
        { exercises: [X("db_bench_press", 3), X("one_arm_db_row", 3), X("cable_lateral_raise", 3), X("cable_rear_delt_fly", 3), X("incline_db_curl", 2), X("overhead_cable_extension", 2)] },
        { exercises: [X("bulgarian_split_squat", 3), X("seated_leg_curl", 3), X("leg_extension", 3), X("standing_calf_raise", 3)] }
      ] },
    { id: "c-arnold6", author: "golden_era_gus", sample: true,
      days: [
        { exercises: [X("barbell_bench_press", 4), X("pull_up", 4), X("db_fly", 3), X("chest_supported_row", 4)] },
        { exercises: [X("db_shoulder_press", 4), X("db_lateral_raise", 4), X("incline_db_curl", 4), X("overhead_cable_extension", 4)] },
        { exercises: [X("barbell_back_squat", 4), X("romanian_deadlift", 3), X("leg_extension", 3), X("standing_calf_raise", 4)] },
        { exercises: [X("db_bench_press", 4), X("lat_pulldown", 4), X("cable_fly", 3), X("one_arm_db_row", 4)] },
        { exercises: [X("db_shoulder_press", 3), X("cable_lateral_raise", 4), X("cable_rear_delt_fly", 3), X("incline_db_curl", 3), X("db_overhead_extension", 3)] },
        { exercises: [X("goblet_squat", 4), X("seated_leg_curl", 4), X("sissy_squat", 3), X("standing_calf_raise", 4)] }
      ] },
    { id: "c-home3", author: "garage_gains", sample: true,
      days: [
        { exercises: [X("goblet_squat", 3), X("db_bench_press", 3), X("one_arm_db_row", 3), X("db_lateral_raise", 3), X("incline_db_curl", 2)] },
        { exercises: [X("db_romanian_deadlift", 3), X("db_shoulder_press", 3), X("one_arm_db_row", 3), X("db_overhead_extension", 3), X("standing_calf_raise", 3)] },
        { exercises: [X("goblet_squat", 3), X("db_fly", 3), X("db_reverse_fly", 3), X("slider_leg_curl", 3), X("incline_db_curl", 2), X("db_overhead_extension", 2)] }
      ] }
  ];
  // Sample splits are written with v1 ids; map them to exercises.json ids. Two v1 exercises have no exercises.json equivalent,
  // so the sample data uses a gym stand-in (sample data only, no claim).
  const SAMPLE_STANDIN = { bw_bar_curl: "cable-curl", bench_dip: "triceps-pushdown" };
  if (EXL) communitySplits.forEach((c) => c.days.forEach((d) => d.exercises.forEach((x) => { x.exId = aliases[x.exId] || SAMPLE_STANDIN[x.exId] || x.exId; })));
  // Display text from the i18n runtime (loaded first). The language is fixed per page load; switching language reloads the page.
  const T = (typeof window !== "undefined" && window.I18N && window.I18N.t) || ((k, v, f) => f || k);
  // Day-name keys per sample split: day 1 uses community.<id>.day1; later days reuse the shared community.day.* keys.
  const DAY_KEYS = {
    "c-bro5": ["community.c-bro5.day1", "community.day.back", "community.day.shoulders", "community.day.arms", "community.day.legs"],
    "c-fb3": ["community.c-fb3.day1", "community.day.b", "community.day.c"],
    "c-ul4": ["community.c-ul4.day1", "community.day.lowerHeavy", "community.day.upperLight", "community.day.lowerLight"],
    "c-arnold6": ["community.c-arnold6.day1", "community.day.shouldersArms", "community.day.legs", "community.c-arnold6.day1", "community.day.shouldersArms", "community.day.legs"],
    "c-home3": ["community.c-home3.day1", "community.day.fullBodyN", "community.day.fullBodyN"]
  };
  communitySplits.forEach((c) => { c.name = T("community." + c.id + ".name"); c.blurb = T("community." + c.id + ".blurb");
    c.days.forEach((d, i) => { d.name = T(DAY_KEYS[c.id][i], { n: i + 1 }); }); });
  conventions.forEach((c) => { c.text = T("settings.convention." + c.id, { app: APP_NAME }); });
  return { appName: APP_NAME, exercises, exerciseSource: EXL ? { file: "exercises.json", generated: EXL.generated, count: EXL.count, groups: EXL.groups, notes: EXL.exerciseNotes } : { file: "data.js (built-in)" }, aliases, slotSpecs: EXL ? slotSpecs : null, sessions, splits, prescription, options, alternatives, muscles, trackedMuscles, extraMuscles, muscleRegion, rules, conventions, communitySplits };
})();
