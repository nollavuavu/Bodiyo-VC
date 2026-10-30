/* Carlsen prototype – programme data (UI logic only).
 * NO justification text or citations live here. Every "Why?" button
 * references a key in evidence.json (exposed as window.EVIDENCE via evidence.js). */
window.CARLSEN_DATA = (function () {
  // equip: which equipment profiles can do the exercise
  // gym = full gym, db = dumbbells + bench at home, bw = bodyweight only (+ pull-up bar)
  const exercises = {
    barbell_back_squat:    { name: "Barbell Back Squat", pattern: "squat", type: "compound", equip: ["gym"], primary: ["Quads", "Glutes"], secondary: ["Adductors"], icon: "🏋️", lengthened: "Bottom of the squat: quads and glutes are longest at full depth.", cues: ["Brace before you descend", "Knees track over toes", "Control the lowering phase"] },
    goblet_squat:          { name: "Goblet Squat", pattern: "squat", type: "compound", equip: ["db"], primary: ["Quads", "Glutes"], secondary: ["Adductors"], icon: "🏋️", lengthened: "Bottom of the squat: quads and glutes are longest at full depth.", cues: ["Dumbbell held at chest", "Sit between the hips", "Stay upright"] },
    bulgarian_split_squat: { name: "Bulgarian Split Squat", pattern: "squat", type: "compound", equip: ["bw"], primary: ["Quads", "Glutes"], secondary: ["Adductors"], icon: "🦵", lengthened: "Bottom position: front-leg glute and quad are at their longest.", cues: ["Rear foot on a bench or chair", "Front knee travels forward", "Slow descent"] },

    romanian_deadlift:     { name: "Romanian Deadlift", pattern: "hinge", type: "compound", equip: ["gym"], primary: ["Hamstrings", "Glutes"], secondary: ["Spinal erectors"], icon: "🏋️", lengthened: "Bottom of the hinge: hamstrings are stretched with hips flexed.", cues: ["Push hips back", "Bar close to legs", "Stop when hips stop moving back"] },
    db_romanian_deadlift:  { name: "Dumbbell Romanian Deadlift", pattern: "hinge", type: "compound", equip: ["db"], primary: ["Hamstrings", "Glutes"], secondary: ["Spinal erectors"], icon: "🏋️", lengthened: "Bottom of the hinge: hamstrings are stretched with hips flexed.", cues: ["Soft knees", "Dumbbells slide down thighs", "Neutral spine"] },
    single_leg_rdl:        { name: "Single-Leg RDL", pattern: "hinge", type: "compound", equip: ["bw"], primary: ["Hamstrings", "Glutes"], secondary: ["Spinal erectors"], icon: "🦵", lengthened: "Bottom of the hinge: standing-leg hamstring is at its longest.", cues: ["Hips stay square", "Reach the free leg back", "Hold a wall if needed"] },

    barbell_bench_press:   { name: "Barbell Bench Press", pattern: "h_push", type: "compound", equip: ["gym"], primary: ["Chest"], secondary: ["Front delts", "Triceps"], icon: "🏋️", lengthened: "Bar at the chest: pecs are at their longest.", cues: ["Shoulder blades set", "Touch lower chest", "Feet planted"] },
    db_bench_press:        { name: "Dumbbell Bench Press", pattern: "h_push", type: "compound", equip: ["db"], primary: ["Chest"], secondary: ["Front delts", "Triceps"], icon: "🏋️", lengthened: "Dumbbells at the bottom: pecs are stretched, usually deeper than with a barbell.", cues: ["Deep stretch at the bottom", "Elbows ~45°", "Press up and slightly in"] },
    push_up:               { name: "Push-Up", pattern: "h_push", type: "compound", equip: ["bw"], primary: ["Chest"], secondary: ["Front delts", "Triceps"], icon: "🤸", lengthened: "Chest near the floor: pecs are at their longest.", cues: ["Body in one line", "Chest to floor", "Elevate feet to progress"] },

    db_shoulder_press:     { name: "Seated Dumbbell Shoulder Press", pattern: "v_push", type: "compound", equip: ["gym", "db"], primary: ["Front delts"], secondary: ["Triceps", "Side delts"], icon: "🏋️", lengthened: "Dumbbells at ear level: front delts are at their longest.", cues: ["Back supported", "Dumbbells to ear level", "Don't flare the ribs"] },
    pike_push_up:          { name: "Pike Push-Up", pattern: "v_push", type: "compound", equip: ["bw"], primary: ["Front delts"], secondary: ["Triceps"], icon: "🤸", lengthened: "Head near the floor: front delts are at their longest.", cues: ["Hips high", "Head travels forward of hands", "Elevate feet to progress"] },

    chest_supported_row:   { name: "Chest-Supported Row", pattern: "h_pull", type: "compound", equip: ["gym"], primary: ["Upper back", "Lats"], secondary: ["Rear delts", "Biceps"], icon: "🏋️", lengthened: "Arms fully extended: lats and upper back are stretched.", cues: ["Chest stays on pad", "Full stretch at the bottom", "Pull elbows back"] },
    one_arm_db_row:        { name: "One-Arm Dumbbell Row", pattern: "h_pull", type: "compound", equip: ["db"], primary: ["Lats", "Upper back"], secondary: ["Rear delts", "Biceps"], icon: "🏋️", lengthened: "Dumbbell hanging low with shoulder reaching forward: lat is stretched.", cues: ["Hand and knee on bench", "Pull toward the hip", "Let the shoulder stretch forward"] },
    inverted_row:          { name: "Inverted Row", pattern: "h_pull", type: "compound", equip: ["bw"], primary: ["Upper back", "Lats"], secondary: ["Biceps"], icon: "🤸", lengthened: "Arms straight at the bottom: upper back and lats are stretched.", cues: ["Use a low bar or table edge", "Body rigid", "Chest to the bar"] },

    lat_pulldown:          { name: "Lat Pulldown", pattern: "v_pull", type: "compound", equip: ["gym"], primary: ["Lats"], secondary: ["Biceps", "Upper back"], icon: "🏋️", lengthened: "Arms overhead at the top: lats are at their longest.", cues: ["Thighs locked under pad", "Full stretch at the top", "Elbows down to sides"] },
    pull_up:               { name: "Pull-Up", pattern: "v_pull", type: "compound", equip: ["gym", "bw"], primary: ["Lats"], secondary: ["Biceps", "Upper back"], icon: "🤸", lengthened: "Dead hang: lats are at their longest.", cues: ["Needs a pull-up bar", "Start from a dead hang", "Use a band to assist if needed"] },

    leg_extension:         { name: "Leg Extension", pattern: "quad_iso", type: "isolation", equip: ["gym"], primary: ["Quads"], secondary: [], icon: "🦵", lengthened: "Knees bent at the start: quads are longest (lean back to add rectus femoris stretch).", cues: ["Pad on lower shin", "Pause at the top", "Control the way down"] },
    sissy_squat:           { name: "Sissy Squat", pattern: "quad_iso", type: "isolation", equip: ["db", "bw"], primary: ["Quads"], secondary: [], icon: "🦵", lengthened: "Knees forward, hips extended: quads are at their longest.", cues: ["Hold a support", "Knees travel forward", "Hips stay extended"] },

    seated_leg_curl:       { name: "Seated Leg Curl", pattern: "ham_iso", type: "isolation", equip: ["gym"], primary: ["Hamstrings"], secondary: [], icon: "🦵", lengthened: "Legs straight with hips flexed: hamstrings are at their longest.", cues: ["Lean slightly forward", "Squeeze at full flexion", "Slow return"] },
    slider_leg_curl:       { name: "Slider Leg Curl", pattern: "ham_iso", type: "isolation", equip: ["db", "bw"], primary: ["Hamstrings"], secondary: ["Glutes"], icon: "🦵", lengthened: "Legs extended: hamstrings are at their longest.", cues: ["Heels on towel or sliders", "Hips stay up", "Extend slowly"] },

    cable_fly:             { name: "Cable Fly", pattern: "chest_iso", type: "isolation", equip: ["gym"], primary: ["Chest"], secondary: ["Front delts"], icon: "💪", lengthened: "Arms wide open: pecs are at their longest.", cues: ["Slight elbow bend", "Open into a deep stretch", "Hug a tree"] },
    db_fly:                { name: "Dumbbell Fly", pattern: "chest_iso", type: "isolation", equip: ["db"], primary: ["Chest"], secondary: ["Front delts"], icon: "💪", lengthened: "Arms wide at the bottom: pecs are at their longest.", cues: ["Fixed elbow angle", "Lower until a stretch", "Don't clash the dumbbells"] },
    deficit_push_up:       { name: "Deficit Push-Up", pattern: "h_push", type: "compound", equip: ["bw"], primary: ["Chest"], secondary: ["Front delts", "Triceps"], icon: "🤸", lengthened: "Chest below hand level: pecs are stretched past a regular push-up.", cues: ["Hands on books or handles", "Chest below hand level", "Pause in the stretch"] },

    cable_lateral_raise:   { name: "Cable Lateral Raise", pattern: "side_delt", type: "isolation", equip: ["gym"], primary: ["Side delts"], secondary: [], icon: "💪", lengthened: "Arm down across the body: side delt is at its longest.", cues: ["Cable behind the body", "Lead with the elbow", "Stop around shoulder height"] },
    db_lateral_raise:      { name: "Dumbbell Lateral Raise", pattern: "side_delt", type: "isolation", equip: ["db"], primary: ["Side delts"], secondary: [], icon: "💪", lengthened: "Arms at the sides: side delts are at their longest (little load there with dumbbells).", cues: ["Slight forward lean", "Raise out, not up", "No swinging"] },

    cable_rear_delt_fly:   { name: "Cable Rear Delt Fly", pattern: "rear_delt", type: "isolation", equip: ["gym"], primary: ["Rear delts"], secondary: ["Upper back"], icon: "💪", lengthened: "Arms crossed in front: rear delts are at their longest.", cues: ["Cross the cables", "Arms move in an arc", "Keep shoulders down"] },
    db_reverse_fly:        { name: "Dumbbell Reverse Fly", pattern: "rear_delt", type: "isolation", equip: ["db"], primary: ["Rear delts"], secondary: ["Upper back"], icon: "💪", lengthened: "Arms hanging down in front: rear delts are at their longest.", cues: ["Chest on incline bench", "Pinkies lead", "Light weight, full range"] },

    incline_db_curl:       { name: "Incline Dumbbell Curl", pattern: "biceps", type: "isolation", equip: ["gym", "db"], primary: ["Biceps"], secondary: [], icon: "💪", lengthened: "Arm behind the torso, elbow straight: biceps are at their longest.", cues: ["Arms hang behind the torso", "No shoulder swing", "Slow lowering"] },
    chin_up_negative:      { name: "Chin-Up (slow negative)", pattern: "v_pull", type: "compound", equip: ["bw"], primary: ["Lats"], secondary: ["Biceps", "Upper back"], icon: "🤸", lengthened: "Bottom of the negative, arms straight: biceps and lats are stretched.", cues: ["Underhand grip", "Jump to the top", "Lower over 3–5 s"] },

    bw_bar_curl:           { name: "Bodyweight Bar Curl", pattern: "biceps", type: "isolation", equip: ["bw"], primary: ["Biceps"], secondary: [], icon: "🤸", lengthened: "Arms straight at the bottom, body hanging under the bar: biceps are at their longest.", cues: ["Underhand grip on a low bar", "Body straight, heels on the floor", "Curl your forehead toward the bar"] },

    overhead_cable_extension: { name: "Overhead Cable Triceps Extension", pattern: "triceps", type: "isolation", equip: ["gym"], primary: ["Triceps"], secondary: [], icon: "💪", lengthened: "Hands behind the head: long head of the triceps is at its longest.", cues: ["Face away from the stack", "Elbows point forward", "Deep stretch behind the head"] },
    db_overhead_extension: { name: "Dumbbell Overhead Extension", pattern: "triceps", type: "isolation", equip: ["db"], primary: ["Triceps"], secondary: [], icon: "💪", lengthened: "Dumbbell behind the head: long head of the triceps is at its longest.", cues: ["Hold one dumbbell with both hands", "Elbows stay narrow", "Lower behind the head"] },
    bench_dip:             { name: "Bench Dip", pattern: "triceps", type: "isolation", equip: ["bw"], primary: ["Triceps"], secondary: ["Front delts"], icon: "🤸", lengthened: "Bottom of the dip: triceps are at their longest.", cues: ["Hands on bench edge", "Hips close to bench", "Elbows point back"] },

    standing_calf_raise:   { name: "Standing Calf Raise", pattern: "calves", type: "isolation", equip: ["gym", "db", "bw"], primary: ["Calves"], secondary: [], icon: "🦶", lengthened: "Heels below the step: calves are at their longest.", cues: ["Use a step for range", "Pause in the bottom stretch", "Full rise onto the toes"] }
  };

  // Session templates = ordered movement-pattern slots (max 7). Shorter sessions keep the first N slots.
  // "a|b" = use pattern a, or b if the equipment setup has no exercise for a (e.g. no pull-up bar with dumbbells).
  const sessions = {
    full_a: { name: "Full Body A", short: "FB-A", slots: ["squat", "h_push", "h_pull", "ham_iso", "biceps", "triceps", "side_delt"] },
    full_b: { name: "Full Body B", short: "FB-B", slots: ["hinge", "v_push", "v_pull|h_pull", "quad_iso", "triceps", "rear_delt", "calves"] },
    full_c: { name: "Full Body C", short: "FB-C", slots: ["squat", "h_push", "h_pull", "biceps", "side_delt", "rear_delt", "calves"] },
    // 2-day only: two sessions cannot cover every muscle directly twice within 7 slots (see README audit)
    full_2a:{ name: "Full Body A", short: "FB-A", slots: ["squat", "h_push", "h_pull", "ham_iso", "biceps", "triceps", "side_delt"] },
    full_2b:{ name: "Full Body B", short: "FB-B", slots: ["hinge", "h_push", "v_pull|h_pull", "quad_iso", "triceps", "biceps", "rear_delt"] },
    upper:  { name: "Upper A", short: "UP-A", slots: ["h_push", "v_pull", "h_pull", "biceps", "triceps", "side_delt", "v_push"] },
    upper_b:{ name: "Upper B", short: "UP-B", slots: ["h_pull", "h_push", "v_push", "triceps", "biceps", "side_delt", "rear_delt"] },
    upper_h:{ name: "Upper", short: "UP", slots: ["h_pull", "h_push", "v_push", "triceps", "biceps", "side_delt", "rear_delt"] },
    lower:  { name: "Lower A", short: "LO-A", slots: ["squat", "hinge", "quad_iso", "ham_iso", "calves"] },
    lower_b:{ name: "Lower B", short: "LO-B", slots: ["hinge", "squat", "ham_iso", "quad_iso", "calves"] },
    lower_h:{ name: "Lower", short: "LO", slots: ["squat", "hinge", "quad_iso", "ham_iso", "calves"] },
    push:   { name: "Push", short: "PU", slots: ["h_push", "v_push", "triceps", "side_delt", "chest_iso"] },
    pull:   { name: "Pull", short: "PL", slots: ["v_pull", "h_pull", "biceps", "rear_delt"] },
    legs:   { name: "Legs", short: "LG", slots: ["squat", "hinge", "quad_iso", "ham_iso", "calves"] }
  };

  // Split per days/week. whyKey -> evidence.json
  const splits = {
    2: { id: "full_body",   name: "Full Body",          whyKey: "split.full_body",   sessions: ["full_2a", "full_2b"],                       weekdays: [0, 3] },
    3: { id: "full_body",   name: "Full Body",          whyKey: "split.full_body",   sessions: ["full_a", "full_b", "full_c"],               weekdays: [0, 2, 4] },
    4: { id: "upper_lower", name: "Upper / Lower",      whyKey: "split.upper_lower", sessions: ["upper", "lower", "upper_b", "lower_b"],     weekdays: [0, 1, 3, 4] },
    5: { id: "hybrid",      name: "Hybrid (UL + PPL)",  whyKey: "split.hybrid",      sessions: ["upper_h", "lower_h", "push", "pull", "legs"],    weekdays: [0, 1, 3, 4, 5] },
    6: { id: "ppl",         name: "Push / Pull / Legs", whyKey: "split.ppl",         sessions: ["push", "pull", "legs", "push", "pull", "legs"], weekdays: [0, 1, 2, 3, 4, 5] }
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
    rest: { compound: "2–3 min", isolation: "2–3 min" },
    restSeconds: { compound: 150, isolation: 150 }
  };

  const options = {
    goal: [
      { id: "hypertrophy", label: "Build muscle", sub: "Hypertrophy focus" },
      { id: "strength", label: "Get stronger", sub: "Heavier compound lifts" },
      { id: "general", label: "General fitness", sub: "Balanced, sustainable" }
    ],
    experience: [
      { id: "beginner", label: "Beginner", sub: "< 1 year consistent" },
      { id: "intermediate", label: "Intermediate", sub: "1–3 years" },
      { id: "advanced", label: "Advanced", sub: "3+ years" }
    ],
    days: [2, 3, 4, 5, 6],
    sessionLength: [
      { id: 45, label: "45 min", maxExercises: 5 },
      { id: 60, label: "60 min", maxExercises: 6 },
      { id: 75, label: "75 min", maxExercises: 7 },
      { id: 90, label: "90 min", maxExercises: 7 }
    ],
    equipment: [
      { id: "gym", label: "Full gym", sub: "Barbells, cables, machines" },
      { id: "db", label: "Dumbbells", sub: "Home: dumbbells + bench" },
      { id: "bw", label: "Bodyweight", sub: "Minimal: pull-up bar" }
    ]
  };

  // Alternatives shown on the split screen (days -> other splits that fit)
  const alternatives = { 2: [], 3: [4], 4: [3, 5], 5: [4, 6], 6: [5, 4] };
  // Muscle groups shown on the front/back map
  const muscles = {
    front: ["Chest", "Front delts", "Side delts", "Biceps", "Abs", "Quads", "Adductors", "Calves"],
    back: ["Rear delts", "Side delts", "Upper back", "Lats", "Triceps", "Spinal erectors", "Glutes", "Hamstrings", "Calves"]
  };
  const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return { exercises, sessions, splits, prescription, options, weekdayNames, alternatives, muscles };
})();
