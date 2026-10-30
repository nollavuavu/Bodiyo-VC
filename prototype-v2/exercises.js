/* GENERATED from exercises.json by tools/build-exercises.js. Do not edit by hand. */
window.CARLSEN_EXERCISES = {
 "source": "/workspace/carlsen/exercises.json",
 "sourceSha256": "4fb5811422301b32799dffdeb0f46d96f42870edff46ff6b5e931967179d31f5",
 "sourceMtime": "2026-10-29T16:53:38.428Z",
 "generated": "2026-10-29T17:23:47.987Z",
 "count": 119,
 "groups": 43,
 "exerciseNotes": "shown (approved)",
 "aliases": {
  "barbell_back_squat": "barbell-back-squat",
  "goblet_squat": "goblet-squat",
  "bulgarian_split_squat": "bulgarian-split-squat",
  "romanian_deadlift": "barbell-romanian-deadlift",
  "db_romanian_deadlift": "dumbbell-romanian-deadlift",
  "single_leg_rdl": "single-leg-romanian-deadlift",
  "barbell_bench_press": "barbell-bench-press",
  "db_bench_press": "dumbbell-bench-press",
  "push_up": "push-up",
  "db_shoulder_press": "seated-dumbbell-shoulder-press",
  "pike_push_up": "pike-push-up",
  "chest_supported_row": "chest-supported-dumbbell-row",
  "one_arm_db_row": "one-arm-dumbbell-row",
  "inverted_row": "inverted-row",
  "lat_pulldown": "lat-pulldown",
  "pull_up": "pull-up",
  "leg_extension": "leg-extension",
  "sissy_squat": "sissy-squat",
  "seated_leg_curl": "seated-leg-curl",
  "slider_leg_curl": "slider-leg-curl",
  "cable_fly": "cable-fly-mid",
  "db_fly": "dumbbell-fly",
  "deficit_push_up": "deficit-push-up",
  "cable_lateral_raise": "cable-lateral-raise",
  "db_lateral_raise": "dumbbell-lateral-raise",
  "cable_rear_delt_fly": "cable-reverse-fly",
  "db_reverse_fly": "chest-supported-dumbbell-reverse-fly",
  "incline_db_curl": "incline-dumbbell-curl",
  "chin_up_negative": "chin-up",
  "overhead_cable_extension": "overhead-cable-triceps-extension",
  "db_overhead_extension": "overhead-dumbbell-triceps-extension",
  "standing_calf_raise": "standing-calf-raise-machine",
  "reverse-barbell-curl": "reverse-ez-bar-curl"
 },
 "exercises": {
  "barbell-bench-press": {
   "name": "Barbell Bench Press",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts",
    "Triceps"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of the press, hands or bar near chest level with elbows behind the torso: chest is at its longest.",
   "stability": "high",
   "group": "chest-press-stretch",
   "evidenceNote": "In a small 8-week trial in young men (n=18, 9 per group), a light bench press (40% 1RM) and push-ups matched to the same load, both taken to failure, gave similar chest and triceps growth. (Kikuchi et al. 2017, PMID 29541130)",
   "cues": [
    "Shoulder blades set",
    "Touch lower chest",
    "Feet planted"
   ]
  },
  "dumbbell-bench-press": {
   "name": "Dumbbell Bench Press",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts",
    "Triceps"
   ],
   "profile": "lengthened",
   "lengthened": "Dumbbells at the bottom beside the chest: chest is at its longest, often a little deeper than with a barbell.",
   "stability": "low",
   "group": "chest-press-stretch",
   "cues": [
    "Deep stretch at the bottom",
    "Elbows ~45°",
    "Press up and slightly in"
   ]
  },
  "incline-barbell-bench-press": {
   "name": "Incline Barbell Bench Press",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts",
    "Triceps"
   ],
   "profile": "lengthened",
   "lengthened": "Bar at the upper chest: chest (especially the upper part) is at its longest.",
   "stability": "high",
   "group": "chest-incline-press-stretch"
  },
  "incline-dumbbell-bench-press": {
   "name": "Incline Dumbbell Bench Press",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts",
    "Triceps"
   ],
   "profile": "lengthened",
   "lengthened": "Dumbbells at the bottom beside the upper chest: chest is at its longest.",
   "stability": "low",
   "group": "chest-incline-press-stretch"
  },
  "smith-machine-incline-press": {
   "name": "Smith Machine Incline Press",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts",
    "Triceps"
   ],
   "profile": "lengthened",
   "lengthened": "Bar at the upper chest: chest is at its longest.",
   "stability": "high",
   "group": "chest-incline-press-stretch"
  },
  "smith-machine-bench-press": {
   "name": "Smith Machine Bench Press",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts",
    "Triceps"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of the press, hands or bar near chest level with elbows behind the torso: chest is at its longest.",
   "stability": "high",
   "group": "chest-press-stretch"
  },
  "machine-chest-press": {
   "name": "Machine Chest Press (seated)",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts",
    "Triceps"
   ],
   "profile": "mid",
   "lengthened": "Handles at the start position beside the chest: chest is at its longest. Where it is hardest depends on the machine's lever and cam.",
   "stability": "high",
   "group": "chest-press-machine"
  },
  "plate-loaded-chest-press": {
   "name": "Plate-Loaded Chest Press",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts",
    "Triceps"
   ],
   "profile": "mid",
   "lengthened": "Handles at the start position beside the chest: chest is at its longest. Where it is hardest depends on the machine's lever arc.",
   "stability": "high",
   "group": "chest-press-machine"
  },
  "push-up": {
   "name": "Push-Up",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Triceps",
    "Front delts"
   ],
   "profile": "lengthened",
   "lengthened": "Chest near the floor: chest is at its longest.",
   "stability": "low",
   "group": "chest-press-bodyweight",
   "evidenceNote": "In a small 8-week trial in young men (n=18, 9 per group), push-ups matched to 40% of bench-press 1RM and taken to failure grew the chest and triceps about as much as a light bench press. (Kikuchi et al. 2017, PMID 29541130)",
   "cues": [
    "Body in one line",
    "Chest to floor",
    "Elevate feet to progress"
   ]
  },
  "deficit-push-up": {
   "name": "Deficit Push-Up (hands on blocks)",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Triceps",
    "Front delts"
   ],
   "profile": "lengthened",
   "lengthened": "Chest below hand level at the bottom: chest is stretched further than in a floor push-up.",
   "stability": "low",
   "group": "chest-press-bodyweight",
   "cues": [
    "Hands on books or handles",
    "Chest below hand level",
    "Pause in the stretch"
   ]
  },
  "chest-dip": {
   "name": "Chest Dip (torso leaning forward)",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "bodyweight",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Triceps",
    "Front delts"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of the dip with shoulders extended: chest and front delts are at their longest.",
   "stability": "low",
   "group": "chest-press-bodyweight",
   "accessNote": "needs dip bars",
   "accessKey": "dipBars"
  },
  "dumbbell-fly": {
   "name": "Dumbbell Fly (flat bench)",
   "pattern": "isolation-horizontal-adduction",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts"
   ],
   "profile": "lengthened",
   "lengthened": "Arms open wide at the bottom with elbows slightly bent: chest is at its longest.",
   "stability": "low",
   "group": "chest-fly-stretch",
   "cues": [
    "Fixed elbow angle",
    "Lower until a stretch",
    "Don't clash the dumbbells"
   ]
  },
  "incline-dumbbell-fly": {
   "name": "Incline Dumbbell Fly",
   "pattern": "isolation-horizontal-adduction",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts"
   ],
   "profile": "lengthened",
   "lengthened": "Arms open wide at the bottom: chest (especially the upper part) is at its longest.",
   "stability": "low",
   "group": "chest-fly-stretch"
  },
  "cable-fly-mid": {
   "name": "Cable Fly (pulleys at chest height, step forward)",
   "pattern": "isolation-horizontal-adduction",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts"
   ],
   "profile": "lengthened",
   "lengthened": "Arms open wide and slightly behind the body: chest is at its longest. With pulleys at chest height and a step forward, the cable pulls hardest near this open position.",
   "stability": "high",
   "group": "chest-fly-stretch"
  },
  "pec-deck": {
   "name": "Pec Deck (machine fly)",
   "pattern": "isolation-horizontal-adduction",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts"
   ],
   "profile": "mid",
   "lengthened": "Arms open wide at the start: chest is at its longest. Resistance is fairly even across the range on most machines.",
   "stability": "high",
   "group": "chest-fly-machine"
  },
  "cable-crossover-high": {
   "name": "High-to-Low Cable Crossover",
   "pattern": "isolation-horizontal-adduction",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Chest"
   ],
   "secondary": [
    "Front delts"
   ],
   "profile": "mid",
   "lengthened": "Arms up and out at the start: lower and middle chest are at their longest.",
   "stability": "high",
   "group": "chest-fly-machine"
  },
  "barbell-overhead-press": {
   "name": "Standing Barbell Overhead Press",
   "pattern": "vertical push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Front delts"
   ],
   "secondary": [
    "Triceps",
    "Side delts"
   ],
   "profile": "mid",
   "lengthened": "Bar at the upper chest/collarbone: front delts are at their longest in this movement; it is hardest around the lower-middle part of the press.",
   "stability": "low",
   "group": "front-delt-press"
  },
  "seated-dumbbell-shoulder-press": {
   "name": "Seated Dumbbell Shoulder Press",
   "pattern": "vertical push",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Front delts"
   ],
   "secondary": [
    "Triceps",
    "Side delts"
   ],
   "profile": "mid",
   "lengthened": "Dumbbells at ear level with elbows below the hands: front delts are at their longest; like the barbell press, it is hardest around the lower-middle part of the press rather than at the very bottom.",
   "stability": "low",
   "group": "front-delt-press",
   "cues": [
    "Back supported",
    "Dumbbells to ear level",
    "Don't flare the ribs"
   ]
  },
  "machine-shoulder-press": {
   "name": "Machine Shoulder Press",
   "pattern": "vertical push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Front delts"
   ],
   "secondary": [
    "Triceps",
    "Side delts"
   ],
   "profile": "mid",
   "lengthened": "Handles at shoulder level at the start: front delts are at their longest. Where it is hardest depends on the machine.",
   "stability": "high",
   "group": "front-delt-press"
  },
  "pike-push-up": {
   "name": "Pike Push-Up",
   "pattern": "vertical push",
   "type": "compound",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Front delts"
   ],
   "secondary": [
    "Triceps",
    "Upper back"
   ],
   "profile": "lengthened",
   "lengthened": "Head near the floor with hips high: front delts are at their longest.",
   "stability": "low",
   "group": "front-delt-press",
   "cues": [
    "Hips high",
    "Head travels forward of hands",
    "Elevate feet to progress"
   ]
  },
  "dumbbell-front-raise": {
   "name": "Dumbbell Front Raise",
   "pattern": "isolation-shoulder-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Front delts"
   ],
   "secondary": [],
   "profile": "shortened",
   "lengthened": "Arm hanging by the thigh at the bottom (front delts only lengthen modestly here); hardest with the arm near shoulder height.",
   "stability": "low",
   "group": "front-delt-raise"
  },
  "cable-front-raise": {
   "name": "Cable Front Raise (low pulley behind)",
   "pattern": "isolation-shoulder-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Front delts"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Arm down by the side or slightly behind the body: front delts are at their longest.",
   "stability": "high",
   "group": "front-delt-raise"
  },
  "dumbbell-lateral-raise": {
   "name": "Dumbbell Lateral Raise",
   "pattern": "isolation-shoulder-abduction",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Side delts"
   ],
   "secondary": [],
   "profile": "shortened",
   "lengthened": "Arm down by the side at the bottom: side delts are at their longest; the dumbbell is hardest when the arm is near shoulder height.",
   "stability": "low",
   "group": "side-delt-raise",
   "evidenceNote": "In an 8-week trial in resistance-trained men and women (n=24, one arm each way), dumbbell lateral raises (hardest near the top) and cable lateral raises with the pulley at about hand height (hardest near the bottom), both taken to failure, grew the side delts similarly (about 3–5% thicker). (Larsen et al. 2025, PMID 40692697)",
   "cues": [
    "Slight forward lean",
    "Raise out, not up",
    "No swinging"
   ]
  },
  "cable-lateral-raise": {
   "name": "Cable Lateral Raise (low pulley, cable across the front)",
   "pattern": "isolation-shoulder-abduction",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Side delts"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Arm across the front of the body at the bottom: side delts are at their longest; the cable keeps tension in this low position.",
   "stability": "high",
   "group": "side-delt-raise",
   "evidenceNote": "In an 8-week trial in resistance-trained men and women (n=24, one arm each way), cable lateral raises with the pulley at about hand height (hardest near the bottom, unlike a low-pulley setup) and dumbbell lateral raises, both taken to failure, grew the side delts similarly (about 3–5% thicker). (Larsen et al. 2025, PMID 40692697)",
   "cues": [
    "Cable behind the body",
    "Lead with the elbow",
    "Stop around shoulder height"
   ]
  },
  "machine-lateral-raise": {
   "name": "Machine Lateral Raise",
   "pattern": "isolation-shoulder-abduction",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Side delts"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Arms down by the sides at the start: side delts are at their longest. Profile depends on the machine's cam.",
   "stability": "high",
   "group": "side-delt-raise"
  },
  "lean-away-dumbbell-lateral-raise": {
   "name": "Lean-Away Dumbbell Lateral Raise",
   "pattern": "isolation-shoulder-abduction",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Side delts"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Arm down and slightly across the body while leaning away from a support: side delts are at their longest, and leaning shifts the hardest point lower than a standard raise.",
   "stability": "high",
   "group": "side-delt-raise"
  },
  "reverse-pec-deck": {
   "name": "Reverse Pec Deck",
   "pattern": "isolation-horizontal-abduction",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Rear delts"
   ],
   "secondary": [
    "Upper back"
   ],
   "profile": "mid",
   "lengthened": "Arms forward in front of the chest at the start: rear delts are at their longest.",
   "stability": "high",
   "group": "rear-delt-fly"
  },
  "bent-over-dumbbell-reverse-fly": {
   "name": "Bent-Over Dumbbell Reverse Fly",
   "pattern": "isolation-horizontal-abduction",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Rear delts"
   ],
   "secondary": [
    "Upper back"
   ],
   "profile": "shortened",
   "lengthened": "Arms hanging straight down under the chest: rear delts are at their longest; hardest when the arms reach out to the sides.",
   "stability": "low",
   "group": "rear-delt-fly"
  },
  "chest-supported-dumbbell-reverse-fly": {
   "name": "Chest-Supported Incline Dumbbell Reverse Fly",
   "pattern": "isolation-horizontal-abduction",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Rear delts"
   ],
   "secondary": [
    "Upper back"
   ],
   "profile": "shortened",
   "lengthened": "Arms hanging down in front of the bench: rear delts are at their longest; hardest when the arms reach out to the sides.",
   "stability": "high",
   "group": "rear-delt-fly"
  },
  "cable-reverse-fly": {
   "name": "Cable Reverse Fly (pulleys at shoulder height, cables crossed)",
   "pattern": "isolation-horizontal-abduction",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Rear delts"
   ],
   "secondary": [
    "Upper back"
   ],
   "profile": "mid",
   "lengthened": "Arms crossed in front of the chest: rear delts are at their longest.",
   "stability": "high",
   "group": "rear-delt-fly"
  },
  "face-pull": {
   "name": "Cable Face Pull (rope, pulley at face height)",
   "pattern": "horizontal pull",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Rear delts",
    "Upper back"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Arms reaching forward toward the pulley: rear delts and upper back are at their longest. The cable pulls horizontally, so the load stays fairly even through the pull.",
   "stability": "high",
   "group": "rear-delt-upper-back-pull"
  },
  "cable-rear-delt-row": {
   "name": "Cable Rear-Delt Row (rope or bar, pulley at chest height, elbows wide)",
   "pattern": "horizontal pull",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Rear delts",
    "Upper back"
   ],
   "secondary": [
    "Biceps"
   ],
   "profile": "mid",
   "lengthened": "Arms reaching forward toward the pulley with the shoulder blades spread: rear delts and upper back are at their longest. The cable pulls horizontally, so the load stays fairly even through the pull.",
   "stability": "high",
   "group": "rear-delt-upper-back-pull"
  },
  "pull-up": {
   "name": "Pull-Up (overhand)",
   "pattern": "vertical pull",
   "type": "compound",
   "equip": [
    "gym",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Upper back"
   ],
   "profile": "mid",
   "lengthened": "Dead hang with arms overhead: lats are at their longest.",
   "stability": "low",
   "group": "lats-vertical-pull",
   "accessNote": "needs a bar",
   "accessKey": "bar",
   "cues": [
    "Needs a pull-up bar",
    "Start from a dead hang",
    "Use a band to assist if needed"
   ]
  },
  "chin-up": {
   "name": "Chin-Up (underhand)",
   "pattern": "vertical pull",
   "type": "compound",
   "equip": [
    "gym",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Upper back"
   ],
   "profile": "mid",
   "lengthened": "Dead hang with arms overhead: lats are at their longest.",
   "stability": "low",
   "group": "lats-vertical-pull",
   "accessNote": "needs a bar",
   "accessKey": "bar"
  },
  "assisted-pull-up-machine": {
   "name": "Assisted Pull-Up Machine",
   "pattern": "vertical pull",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Upper back"
   ],
   "profile": "mid",
   "lengthened": "Arms overhead at the bottom: lats are at their longest.",
   "stability": "high",
   "group": "lats-vertical-pull",
   "notForTemplates": true
  },
  "lat-pulldown": {
   "name": "Lat Pulldown (wide overhand grip)",
   "pattern": "vertical pull",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Upper back"
   ],
   "profile": "mid",
   "lengthened": "Arms fully extended overhead at the top: lats are at their longest.",
   "stability": "high",
   "group": "lats-vertical-pull",
   "evidenceNote": "In a small 10-week trial in untrained young men (n=29, 14 vs 15 per group) doing the same leg and chest exercises, a group that added wide-grip lat pulldowns and a group that added barbell biceps curls instead showed similar elbow-flexor thickness gains (+6.1% vs +5.8%, no significant difference). (Gentil et al. 2015, PMID 26446291)",
   "cues": [
    "Thighs locked under pad",
    "Full stretch at the top",
    "Elbows down to sides"
   ]
  },
  "close-grip-lat-pulldown": {
   "name": "Close Neutral-Grip Lat Pulldown",
   "pattern": "vertical pull",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Upper back"
   ],
   "profile": "mid",
   "lengthened": "Arms fully extended overhead at the top: lats are at their longest.",
   "stability": "high",
   "group": "lats-vertical-pull"
  },
  "single-arm-cable-pulldown": {
   "name": "Single-Arm Cable Pulldown (kneeling)",
   "pattern": "vertical pull",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Upper back"
   ],
   "profile": "mid",
   "lengthened": "Arm fully extended overhead and slightly across: lats are at their longest.",
   "stability": "high",
   "group": "lats-vertical-pull"
  },
  "straight-arm-pulldown": {
   "name": "Straight-Arm Cable Pulldown",
   "pattern": "isolation-shoulder-extension",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Lats"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Arms reaching up toward the high pulley: lats are at their longest.",
   "stability": "high",
   "group": "lats-pullover"
  },
  "dumbbell-pullover": {
   "name": "Dumbbell Pullover (lying across a bench)",
   "pattern": "isolation-shoulder-extension",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Lats"
   ],
   "secondary": [
    "Chest"
   ],
   "profile": "lengthened",
   "lengthened": "Arms reaching back behind the head: lats are at their longest, and the dumbbell is hardest here.",
   "stability": "low",
   "group": "lats-pullover"
  },
  "barbell-bent-over-row": {
   "name": "Barbell Bent-Over Row",
   "pattern": "horizontal pull",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Upper back",
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Rear delts"
   ],
   "profile": "shortened",
   "lengthened": "Arms hanging straight down at the bottom: upper back and lats are at their longest.",
   "stability": "low",
   "group": "back-row-free"
  },
  "one-arm-dumbbell-row": {
   "name": "One-Arm Dumbbell Row (hand on bench)",
   "pattern": "horizontal pull",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Lats",
    "Upper back"
   ],
   "secondary": [
    "Biceps",
    "Rear delts"
   ],
   "profile": "shortened",
   "lengthened": "Arm hanging straight down with the shoulder blade allowed to move forward: lats and upper back are at their longest.",
   "stability": "high",
   "group": "back-row-supported",
   "evidenceNote": "In a small 8-week trial in untrained men (n=10, one arm each way), one-arm dumbbell rows grew elbow-flexor thickness about half as much as one-arm biceps curls (+5.2% vs +11.1%), so direct curls may help if arm size is a goal. (Mannarino et al. 2021, PMID 31268995)",
   "cues": [
    "Hand and knee on bench",
    "Pull toward the hip",
    "Let the shoulder stretch forward"
   ]
  },
  "chest-supported-dumbbell-row": {
   "name": "Chest-Supported Incline Dumbbell Row",
   "pattern": "horizontal pull",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Upper back",
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Rear delts"
   ],
   "profile": "shortened",
   "lengthened": "Arms hanging straight down in front of the bench: upper back and lats are at their longest.",
   "stability": "high",
   "group": "back-row-supported"
  },
  "t-bar-row": {
   "name": "Chest-Supported T-Bar Row",
   "pattern": "horizontal pull",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Upper back",
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Rear delts"
   ],
   "profile": "shortened",
   "lengthened": "Arms fully extended at the bottom: upper back and lats are at their longest.",
   "stability": "high",
   "group": "back-row-supported"
  },
  "seated-cable-row": {
   "name": "Seated Cable Row (close neutral grip)",
   "pattern": "horizontal pull",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Upper back",
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Rear delts"
   ],
   "profile": "mid",
   "lengthened": "Arms reaching forward with the shoulder blades spread: upper back and lats are at their longest. The cable pulls horizontally, so the load on the back stays fairly even through the pull (unlike free-weight rows, which are hardest at the top).",
   "stability": "high",
   "group": "back-row-supported"
  },
  "machine-row": {
   "name": "Seated Machine Row (chest pad)",
   "pattern": "horizontal pull",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Upper back",
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Rear delts"
   ],
   "profile": "mid",
   "lengthened": "Arms reaching forward at the start: upper back and lats are at their longest. Where it is hardest depends on the machine.",
   "stability": "high",
   "group": "back-row-supported"
  },
  "inverted-row": {
   "name": "Inverted Row (bar or rings)",
   "pattern": "horizontal pull",
   "type": "compound",
   "equip": [
    "gym",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Upper back",
    "Lats"
   ],
   "secondary": [
    "Biceps",
    "Rear delts"
   ],
   "profile": "shortened",
   "lengthened": "Hanging under the bar with arms straight: upper back and lats are at their longest.",
   "stability": "low",
   "group": "back-row-free",
   "accessNote": "needs a bar or sturdy table",
   "accessKey": "barOrTable"
  },
  "barbell-shrug": {
   "name": "Barbell Shrug",
   "pattern": "isolation-scapular-elevation",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Upper back"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "mid",
   "lengthened": "Shoulders relaxed and pulled down by the bar: upper traps are at their longest.",
   "stability": "high",
   "group": "upper-back-shrug"
  },
  "dumbbell-shrug": {
   "name": "Dumbbell Shrug",
   "pattern": "isolation-scapular-elevation",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Upper back"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "mid",
   "lengthened": "Shoulders relaxed and pulled down by the dumbbells: upper traps are at their longest.",
   "stability": "high",
   "group": "upper-back-shrug"
  },
  "barbell-curl": {
   "name": "Standing Barbell Curl",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "mid",
   "lengthened": "Arms straight by the sides at the bottom: biceps are at their longest in this movement.",
   "stability": "low",
   "group": "biceps-curl-mid"
  },
  "ez-bar-curl": {
   "name": "Standing EZ-Bar Curl",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "mid",
   "lengthened": "Arms straight by the sides at the bottom: biceps are at their longest in this movement.",
   "stability": "low",
   "group": "biceps-curl-mid"
  },
  "dumbbell-curl": {
   "name": "Standing Dumbbell Curl",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "mid",
   "lengthened": "Arms straight by the sides at the bottom: biceps are at their longest in this movement.",
   "stability": "low",
   "group": "biceps-curl-mid"
  },
  "hammer-curl": {
   "name": "Dumbbell Hammer Curl",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "mid",
   "lengthened": "Arms straight by the sides at the bottom: elbow flexors are at their longest in this movement.",
   "stability": "low",
   "group": "biceps-curl-mid"
  },
  "cable-curl": {
   "name": "Standing Cable Curl (low pulley, in front)",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "mid",
   "lengthened": "Arms straight by the sides at the bottom: biceps are at their longest in this movement.",
   "stability": "high",
   "group": "biceps-curl-mid"
  },
  "incline-dumbbell-curl": {
   "name": "Incline Dumbbell Curl (bench ~45°, arms hanging behind)",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "mid",
   "lengthened": "Arms straight and hanging behind the body: biceps are stretched more than in a standing curl because the shoulder is extended.",
   "stability": "high",
   "group": "biceps-curl-shoulder-extended",
   "evidenceNote": "In a 12-week MRI trial in untrained adults (n=21, one arm each way), incline dumbbell curls grew the biceps slightly more than preacher curls (+22.1% vs +18.9%) but the brachialis and brachioradialis less, so total elbow-flexor growth was similar (+17.6% vs +19.2%). (Kobayashi et al. 2026, PMID 42829982)",
   "cues": [
    "Arms hang behind the torso",
    "No shoulder swing",
    "Slow lowering"
   ]
  },
  "bayesian-cable-curl": {
   "name": "Bayesian Cable Curl (facing away, pulley low behind)",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "lengthened",
   "lengthened": "Arm straight and pulled behind the body by the cable: biceps are stretched with the shoulder extended, and the cable is hardest near this position.",
   "stability": "high",
   "group": "biceps-curl-shoulder-extended",
   "evidenceNote": "In a small 10-week trial in young men with no resistance training in the previous 6 months (n=15, one arm each way), Bayesian cable curls (shoulder about 50° extended) and preacher cable curls (shoulder about 50° flexed), set up with matched resistance profiles, showed no significant difference in biceps or brachialis growth (biceps about 9% vs 6–7% thicker); a trial this small can't rule out a modest difference. (Attarieh et al. 2025, PMID 40082069)"
  },
  "dumbbell-preacher-curl": {
   "name": "Dumbbell Preacher Curl (seated, pad ~45°)",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "lengthened",
   "lengthened": "Elbow almost straight at the bottom of the pad: elbow flexors are at their longest and the dumbbell is hardest near here.",
   "stability": "high",
   "group": "biceps-curl-preacher",
   "evidenceNote": "In a 12-week MRI trial in untrained adults (n=21, one arm each way), preacher dumbbell curls grew the brachialis and brachioradialis slightly more than incline curls but the biceps slightly less, so total elbow-flexor growth was similar (+19.2% vs +17.6%). (Kobayashi et al. 2026, PMID 42829982)"
  },
  "ez-bar-preacher-curl": {
   "name": "EZ-Bar Preacher Curl (pad ~45°)",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "lengthened",
   "lengthened": "Elbows almost straight at the bottom of the pad: elbow flexors are at their longest and the bar is hardest near here.",
   "stability": "high",
   "group": "biceps-curl-preacher"
  },
  "machine-preacher-curl": {
   "name": "Machine Preacher Curl",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "mid",
   "lengthened": "Elbows almost straight at the start: elbow flexors are at their longest. Profile depends on the machine's cam.",
   "stability": "high",
   "group": "biceps-curl-preacher"
  },
  "cable-preacher-curl": {
   "name": "Cable Preacher Curl (pulley low in front of the pad)",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Biceps"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "mid",
   "lengthened": "Elbow almost straight on the pad: elbow flexors are at their longest.",
   "stability": "high",
   "group": "biceps-curl-preacher",
   "evidenceNote": "In a small 10-week trial in young men with no resistance training in the previous 6 months (n=15, one arm each way), preacher cable curls (shoulder about 50° flexed) and Bayesian cable curls (shoulder about 50° extended), set up with matched resistance profiles, showed no significant difference in biceps or brachialis growth (brachialis about 10% vs 8% thicker); a trial this small can't rule out a modest difference. (Attarieh et al. 2025, PMID 40082069)"
  },
  "triceps-pushdown": {
   "name": "Cable Triceps Pushdown (rope or bar, high pulley)",
   "pattern": "isolation-elbow-extension",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Triceps"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Elbows fully bent with upper arms at the sides: triceps are at their longest in this movement (the long head is not fully stretched with the arms down).",
   "stability": "high",
   "group": "triceps-arms-down",
   "evidenceNote": "In a 12-week trial in untrained young adults (n=21, one arm each way), one-arm cable elbow extensions with the upper arm at the side (a pushdown-style position) grew the whole triceps less than overhead cable extensions (+13.9% vs +19.9% volume); overhead work loads the long head at a longer length. (Maeo et al. 2023, PMID 35819335)"
  },
  "dumbbell-kickback": {
   "name": "Dumbbell Triceps Kickback",
   "pattern": "isolation-elbow-extension",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Triceps"
   ],
   "secondary": [],
   "profile": "shortened",
   "lengthened": "Elbow bent with upper arm held back along the torso: triceps are at their longest in this movement; hardest at lockout.",
   "stability": "low",
   "group": "triceps-arms-down"
  },
  "close-grip-bench-press": {
   "name": "Close-Grip Bench Press",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Triceps"
   ],
   "secondary": [
    "Chest",
    "Front delts"
   ],
   "profile": "lengthened",
   "lengthened": "Bar at the lower chest with elbows bent: triceps and chest are at their longest in this movement.",
   "stability": "high",
   "group": "triceps-press"
  },
  "triceps-dip": {
   "name": "Triceps Dip (upright torso, parallel bars)",
   "pattern": "vertical push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "bodyweight",
   "primary": [
    "Triceps"
   ],
   "secondary": [
    "Chest",
    "Front delts"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of the dip with elbows deeply bent: triceps are at their longest in this movement.",
   "stability": "low",
   "group": "triceps-dip",
   "accessNote": "needs dip bars",
   "accessKey": "dipBars"
  },
  "machine-dip": {
   "name": "Seated Machine Dip",
   "pattern": "vertical push",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Triceps"
   ],
   "secondary": [
    "Chest",
    "Front delts"
   ],
   "profile": "mid",
   "lengthened": "Handles high with elbows deeply bent: triceps are at their longest in this movement. Where it is hardest depends on the machine.",
   "stability": "high",
   "group": "triceps-dip"
  },
  "diamond-push-up": {
   "name": "Diamond (Close-Hand) Push-Up",
   "pattern": "horizontal push",
   "type": "compound",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Triceps"
   ],
   "secondary": [
    "Chest",
    "Front delts"
   ],
   "profile": "lengthened",
   "lengthened": "Chest near the hands with elbows bent: triceps are at their longest in this movement.",
   "stability": "low",
   "group": "triceps-press"
  },
  "overhead-cable-triceps-extension": {
   "name": "Overhead Cable Triceps Extension (facing away, rope)",
   "pattern": "isolation-elbow-extension",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Triceps"
   ],
   "secondary": [],
   "profile": "lengthened",
   "lengthened": "Elbows fully bent with arms overhead: triceps (especially the long head) are at their longest, and the cable is hardest near here.",
   "stability": "high",
   "group": "triceps-overhead",
   "evidenceNote": "In a 12-week trial in untrained young adults (n=21, one arm each way), overhead cable elbow extensions, which stretch the long head more, grew the whole triceps about 1.4 times more than arms-at-side cable extensions (+19.9% vs +13.9%), despite lighter loads. (Maeo et al. 2023, PMID 35819335)",
   "cues": [
    "Face away from the stack",
    "Elbows point forward",
    "Deep stretch behind the head"
   ]
  },
  "overhead-dumbbell-triceps-extension": {
   "name": "Seated Overhead Dumbbell Triceps Extension (two hands)",
   "pattern": "isolation-elbow-extension",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Triceps"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Dumbbell lowered behind the head with arms overhead: triceps (especially the long head) are at their longest.",
   "stability": "high",
   "group": "triceps-overhead",
   "cues": [
    "Hold one dumbbell with both hands",
    "Elbows stay narrow",
    "Lower behind the head"
   ]
  },
  "ez-bar-skull-crusher": {
   "name": "Lying EZ-Bar Skull Crusher (bar to forehead)",
   "pattern": "isolation-elbow-extension",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Triceps"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Bar lowered toward the forehead with elbows fully bent: triceps are at their longest in this movement; angling the upper arms back toward the head lengthens the long head more.",
   "stability": "high",
   "group": "triceps-lying-extension"
  },
  "lying-dumbbell-triceps-extension": {
   "name": "Lying Dumbbell Triceps Extension (neutral grip, upper arms vertical)",
   "pattern": "isolation-elbow-extension",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Triceps"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Dumbbells lowered beside the head with elbows fully bent: triceps are at their longest in this movement; the long head is less stretched than with the arms fully overhead.",
   "stability": "high",
   "group": "triceps-lying-extension"
  },
  "dumbbell-wrist-curl": {
   "name": "Dumbbell Wrist Curl (forearm on bench)",
   "pattern": "isolation-wrist",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Forearms"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Wrist bent back with the dumbbell rolled toward the fingers: wrist flexors are at their longest.",
   "stability": "high",
   "group": "forearm-wrist-curl"
  },
  "barbell-wrist-curl": {
   "name": "Barbell Wrist Curl (forearms on bench)",
   "pattern": "isolation-wrist",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Forearms"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Wrists bent back at the bottom: wrist flexors are at their longest.",
   "stability": "high",
   "group": "forearm-wrist-curl"
  },
  "reverse-ez-bar-curl": {
   "name": "Reverse-Grip (Overhand) EZ-Bar Curl",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Forearms",
    "Biceps"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Arms straight by the sides: elbow flexors, including the brachioradialis in the forearm, are at their longest.",
   "stability": "low",
   "group": "forearm-reverse-curl"
  },
  "reverse-cable-curl": {
   "name": "Reverse-Grip Cable Curl (low pulley)",
   "pattern": "isolation-elbow-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Forearms",
    "Biceps"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Arms straight by the sides: elbow flexors, including the brachioradialis in the forearm, are at their longest.",
   "stability": "high",
   "group": "forearm-reverse-curl"
  },
  "barbell-back-squat": {
   "name": "Barbell Back Squat",
   "pattern": "squat",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Quads"
   ],
   "secondary": [
    "Glutes"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of a deep squat with hips and knees fully bent: quads and glutes are at their longest (the rectus femoris part of the quads is not, because the hip is bent).",
   "stability": "low",
   "group": "quads-squat",
   "evidenceNote": "In a 10-week trial in untrained young men (n=17), full-depth barbell back squats (about 140° knee bend) grew the glutes and adductors more than half squats (about 90°); knee-extensor volume grew similarly (+4.9% vs +4.6%), and the rectus femoris and hamstrings did not grow with either depth. (Kubo et al. 2019, PMID 31230110)",
   "cues": [
    "Brace before you descend",
    "Knees track over toes",
    "Control the lowering phase"
   ]
  },
  "front-squat": {
   "name": "Barbell Front Squat",
   "pattern": "squat",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Quads"
   ],
   "secondary": [
    "Glutes"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of a deep squat with hips and knees fully bent: quads and glutes are at their longest (the rectus femoris part of the quads is not, because the hip is bent).",
   "stability": "low",
   "group": "quads-squat"
  },
  "smith-machine-squat": {
   "name": "Smith Machine Squat",
   "pattern": "squat",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Quads"
   ],
   "secondary": [
    "Glutes"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of a deep squat with hips and knees fully bent: quads and glutes are at their longest (the rectus femoris part of the quads is not, because the hip is bent).",
   "stability": "high",
   "group": "quads-squat-machine",
   "evidenceNote": "In an 8-week trial in untrained women (n=63), Smith machine squats increased distal vastus lateralis thickness more than leg extensions did (+18.2% vs +11.2%) but increased rectus femoris thickness less, so adding a knee-extension exercise may help the rectus femoris. (Kassiano et al. 2026, PMID 41379528)"
  },
  "hack-squat": {
   "name": "Machine Hack Squat",
   "pattern": "squat",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Quads"
   ],
   "secondary": [
    "Glutes"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of a deep squat with hips and knees fully bent: quads and glutes are at their longest (the rectus femoris part of the quads is not, because the hip is bent).",
   "stability": "high",
   "group": "quads-squat-machine"
  },
  "leg-press": {
   "name": "45° Leg Press",
   "pattern": "squat",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Quads"
   ],
   "secondary": [
    "Glutes"
   ],
   "profile": "lengthened",
   "lengthened": "Sled lowered with knees deeply bent toward the chest: quads and glutes are at their longest.",
   "stability": "high",
   "group": "quads-squat-machine",
   "evidenceNote": "In an 8-week trial in resistance-trained adults (n=23, one leg each way), one-leg presses to about 100° of knee bend and to full depth (about 154°) grew the quads similarly. (Larsen et al. 2025, PMID 40113586)"
  },
  "belt-squat": {
   "name": "Belt Squat Machine",
   "pattern": "squat",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Quads"
   ],
   "secondary": [
    "Glutes"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of a deep squat with hips and knees fully bent: quads and glutes are at their longest (the rectus femoris part of the quads is not, because the hip is bent).",
   "stability": "high",
   "group": "quads-squat-machine"
  },
  "goblet-squat": {
   "name": "Dumbbell Goblet Squat",
   "pattern": "squat",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Quads"
   ],
   "secondary": [
    "Glutes"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of a deep squat with hips and knees fully bent: quads and glutes are at their longest (the rectus femoris part of the quads is not, because the hip is bent).",
   "stability": "low",
   "group": "quads-squat",
   "cues": [
    "Dumbbell held at chest",
    "Sit between the hips",
    "Stay upright"
   ]
  },
  "bodyweight-squat": {
   "name": "Bodyweight Squat",
   "pattern": "squat",
   "type": "compound",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Quads"
   ],
   "secondary": [
    "Glutes"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of a deep squat with hips and knees fully bent: quads and glutes are at their longest (the rectus femoris part of the quads is not, because the hip is bent).",
   "stability": "low",
   "group": "quads-squat"
  },
  "leg-extension": {
   "name": "Leg Extension Machine (seated)",
   "pattern": "isolation-knee-extension",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Quads"
   ],
   "secondary": [],
   "profile": "shortened",
   "lengthened": "Knees fully bent at the start: quads are at their longest in this movement (sitting with the hip bent keeps the rectus femoris from being fully stretched). On most machines it is hardest near full knee extension.",
   "stability": "high",
   "group": "quads-knee-extension",
   "evidenceNote": "In an 8-week trial in untrained women (n=63), leg extensions grew the rectus femoris more than Smith machine squats (e.g. proximal +11.4% vs +2.0%), while squats grew the distal vastus lateralis more. (Kassiano et al. 2026, PMID 41379528)",
   "cues": [
    "Pad on lower shin",
    "Pause at the top",
    "Control the way down"
   ]
  },
  "sissy-squat": {
   "name": "Sissy Squat (bodyweight, holding a support)",
   "pattern": "isolation-knee-extension",
   "type": "isolation",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Quads"
   ],
   "secondary": [],
   "profile": "lengthened",
   "lengthened": "Knees far forward and fully bent with hips straight and the torso leaning back: quads, including the rectus femoris, are at their longest.",
   "stability": "low",
   "group": "quads-knee-extension-bodyweight",
   "cues": [
    "Hold a support",
    "Knees travel forward",
    "Hips stay extended"
   ]
  },
  "reverse-nordic": {
   "name": "Reverse Nordic (kneeling)",
   "pattern": "isolation-knee-extension",
   "type": "isolation",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Quads"
   ],
   "secondary": [],
   "profile": "lengthened",
   "lengthened": "Leaning back from the kneeling position with hips straight: quads, including the rectus femoris, are at their longest.",
   "stability": "low",
   "group": "quads-knee-extension-bodyweight"
  },
  "bulgarian-split-squat": {
   "name": "Dumbbell Bulgarian Split Squat (rear foot elevated)",
   "pattern": "lunge",
   "type": "compound",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "dumbbell",
   "primary": [
    "Quads",
    "Glutes"
   ],
   "secondary": [],
   "profile": "lengthened",
   "lengthened": "Bottom of the lunge: front-leg quads and glutes are at their longest.",
   "stability": "low",
   "group": "quads-glutes-lunge",
   "accessNote": "can be done unloaded (rear foot on a chair)",
   "accessKey": "unloaded",
   "cues": [
    "Rear foot on a bench or chair",
    "Front knee travels forward",
    "Slow descent"
   ]
  },
  "dumbbell-walking-lunge": {
   "name": "Dumbbell Walking Lunge",
   "pattern": "lunge",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Quads",
    "Glutes"
   ],
   "secondary": [],
   "profile": "lengthened",
   "lengthened": "Bottom of the lunge: front-leg quads and glutes are at their longest.",
   "stability": "low",
   "group": "quads-glutes-lunge"
  },
  "dumbbell-reverse-lunge": {
   "name": "Dumbbell Reverse Lunge",
   "pattern": "lunge",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Quads",
    "Glutes"
   ],
   "secondary": [],
   "profile": "lengthened",
   "lengthened": "Bottom of the lunge: front-leg quads and glutes are at their longest.",
   "stability": "low",
   "group": "quads-glutes-lunge"
  },
  "barbell-split-squat": {
   "name": "Barbell Split Squat",
   "pattern": "lunge",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Quads",
    "Glutes"
   ],
   "secondary": [],
   "profile": "lengthened",
   "lengthened": "Bottom of the lunge: front-leg quads and glutes are at their longest.",
   "stability": "low",
   "group": "quads-glutes-lunge"
  },
  "dumbbell-step-up": {
   "name": "Dumbbell Step-Up (knee-height box)",
   "pattern": "lunge",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Quads",
    "Glutes"
   ],
   "secondary": [],
   "profile": "lengthened",
   "lengthened": "Foot on the box with the knee and hip deeply bent at the start: quads and glutes are at their longest.",
   "stability": "low",
   "group": "quads-glutes-lunge"
  },
  "barbell-romanian-deadlift": {
   "name": "Barbell Romanian Deadlift",
   "pattern": "hinge",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Hamstrings",
    "Glutes"
   ],
   "secondary": [
    "Upper back",
    "Forearms"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of the hinge with hips pushed back and knees soft: hamstrings and glutes are at their longest.",
   "stability": "low",
   "group": "hamstrings-hinge",
   "cues": [
    "Push hips back",
    "Bar close to legs",
    "Stop when hips stop moving back"
   ]
  },
  "dumbbell-romanian-deadlift": {
   "name": "Dumbbell Romanian Deadlift",
   "pattern": "hinge",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Hamstrings",
    "Glutes"
   ],
   "secondary": [
    "Forearms"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of the hinge with hips pushed back and knees soft: hamstrings and glutes are at their longest.",
   "stability": "low",
   "group": "hamstrings-hinge",
   "cues": [
    "Soft knees",
    "Dumbbells slide down thighs",
    "Neutral spine"
   ]
  },
  "stiff-leg-deadlift": {
   "name": "Barbell Stiff-Leg Deadlift",
   "pattern": "hinge",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Hamstrings",
    "Glutes"
   ],
   "secondary": [
    "Upper back",
    "Forearms"
   ],
   "profile": "lengthened",
   "lengthened": "Bottom of the hinge with knees nearly straight: hamstrings are at their longest.",
   "stability": "low",
   "group": "hamstrings-hinge"
  },
  "single-leg-romanian-deadlift": {
   "name": "Dumbbell Single-Leg Romanian Deadlift",
   "pattern": "hinge",
   "type": "compound",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Hamstrings",
    "Glutes"
   ],
   "secondary": [],
   "profile": "lengthened",
   "lengthened": "Bottom of the hinge: standing-leg hamstring and glute are at their longest.",
   "stability": "low",
   "group": "hamstrings-hinge"
  },
  "conventional-deadlift": {
   "name": "Barbell Conventional Deadlift",
   "pattern": "hinge",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Glutes",
    "Hamstrings"
   ],
   "secondary": [
    "Quads",
    "Upper back",
    "Forearms"
   ],
   "profile": "lengthened",
   "lengthened": "Bar on the floor with hips and knees bent: glutes are at their longest in this movement (hamstrings less so, because the knees are bent).",
   "stability": "low",
   "group": "glutes-deadlift"
  },
  "trap-bar-deadlift": {
   "name": "Trap-Bar Deadlift",
   "pattern": "hinge",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Glutes",
    "Quads"
   ],
   "secondary": [
    "Hamstrings",
    "Upper back",
    "Forearms"
   ],
   "profile": "lengthened",
   "lengthened": "Handles at the bottom with hips and knees bent: glutes and quads are at their longest in this movement.",
   "stability": "low",
   "group": "glutes-deadlift"
  },
  "back-extension-45": {
   "name": "45° Back Extension (hip hinge)",
   "pattern": "hinge",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "bodyweight",
   "primary": [
    "Glutes",
    "Hamstrings"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Torso lowered toward the floor with hips bent: glutes and hamstrings are at their longest.",
   "stability": "high",
   "group": "glutes-hamstrings-back-extension",
   "accessNote": "needs a 45° back-extension bench",
   "accessKey": "backExtBench"
  },
  "reverse-hyperextension": {
   "name": "Reverse Hyperextension Machine",
   "pattern": "hinge",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Glutes",
    "Hamstrings"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Legs hanging down with hips bent: glutes and hamstrings are at their longest.",
   "stability": "high",
   "group": "glutes-hamstrings-back-extension"
  },
  "seated-leg-curl": {
   "name": "Seated Leg Curl Machine",
   "pattern": "isolation-knee-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Hamstrings"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Knees straight with hips bent by the seat: hamstrings are at their longest, more than in a lying leg curl. Where it is hardest depends on the machine's cam.",
   "stability": "high",
   "group": "hamstrings-leg-curl",
   "evidenceNote": "In a 12-week trial in untrained young adults (n=20, one leg each way), seated leg curls, which load the hamstrings at a longer length because the hips are bent, grew the whole hamstrings more than lying leg curls (+14% vs +9% volume). (Maeo et al. 2021, PMID 33009197)",
   "cues": [
    "Lean slightly forward",
    "Squeeze at full flexion",
    "Slow return"
   ]
  },
  "lying-leg-curl": {
   "name": "Lying (Prone) Leg Curl Machine",
   "pattern": "isolation-knee-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Hamstrings"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Knees straight at the start: hamstrings are at their longest in this movement, but less than in a seated leg curl because the hips are straight. Where it is hardest depends on the machine's cam.",
   "stability": "high",
   "group": "hamstrings-leg-curl",
   "evidenceNote": "In a 12-week trial in untrained young adults (n=20, one leg each way), lying leg curls grew the hamstrings less than seated leg curls (+9% vs +14% volume); the seated version trains them at a longer length. (Maeo et al. 2021, PMID 33009197)"
  },
  "nordic-hamstring-curl": {
   "name": "Nordic Hamstring Curl",
   "pattern": "isolation-knee-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Hamstrings"
   ],
   "secondary": [],
   "profile": "lengthened",
   "lengthened": "Body lowered toward the floor with knees nearly straight: hamstrings are at their longest and the lever is longest here.",
   "stability": "low",
   "group": "hamstrings-leg-curl-bodyweight"
  },
  "slider-leg-curl": {
   "name": "Slider/Ball Leg Curl (hips up)",
   "pattern": "isolation-knee-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Hamstrings"
   ],
   "secondary": [
    "Glutes"
   ],
   "profile": "mid",
   "lengthened": "Legs straight out with hips lifted: hamstrings are at their longest in this movement.",
   "stability": "low",
   "group": "hamstrings-leg-curl-bodyweight",
   "cues": [
    "Heels on towel or sliders",
    "Hips stay up",
    "Extend slowly"
   ]
  },
  "barbell-hip-thrust": {
   "name": "Barbell Hip Thrust (upper back on bench)",
   "pattern": "hip-extension",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Glutes"
   ],
   "secondary": [
    "Hamstrings",
    "Quads"
   ],
   "profile": "shortened",
   "lengthened": "Hips lowered toward the floor: glutes are at their longest in this movement; it is hardest at the top with the hips fully extended.",
   "stability": "high",
   "group": "glutes-hip-thrust",
   "evidenceNote": "In a 9-week MRI trial in untrained young men and women (n=34; 18 hip thrust, 16 squat), barbell hip thrusts (done on a stand-alone hip-thrust bench) grew the glutes about as much as barbell back squats with the same number of sets, while the squats grew the quads and adductors more. (Plotkin et al. 2023, PMID 37877099)"
  },
  "machine-hip-thrust": {
   "name": "Hip Thrust Machine",
   "pattern": "hip-extension",
   "type": "compound",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Glutes"
   ],
   "secondary": [
    "Hamstrings",
    "Quads"
   ],
   "profile": "shortened",
   "lengthened": "Hips lowered at the bottom: glutes are at their longest in this movement; hardest near full hip extension on most machines.",
   "stability": "high",
   "group": "glutes-hip-thrust"
  },
  "single-leg-hip-thrust": {
   "name": "Single-Leg Hip Thrust (bodyweight)",
   "pattern": "hip-extension",
   "type": "compound",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Glutes"
   ],
   "secondary": [
    "Hamstrings"
   ],
   "profile": "shortened",
   "lengthened": "Hips lowered toward the floor: working-side glute is at its longest in this movement; hardest at the top.",
   "stability": "low",
   "group": "glutes-hip-thrust"
  },
  "hip-abduction-machine": {
   "name": "Seated Hip Abduction Machine",
   "pattern": "isolation-hip-abduction",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Glutes"
   ],
   "secondary": [],
   "profile": "shortened",
   "lengthened": "Knees together at the start: the side glutes (gluteus medius and minimus) are at their longest.",
   "stability": "high",
   "group": "glutes-hip-abduction"
  },
  "cable-hip-abduction": {
   "name": "Standing Cable Hip Abduction (ankle strap)",
   "pattern": "isolation-hip-abduction",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Glutes"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Working leg crossed slightly in front of the standing leg: side glutes are at their longest.",
   "stability": "high",
   "group": "glutes-hip-abduction"
  },
  "standing-calf-raise-machine": {
   "name": "Standing Calf Raise Machine",
   "pattern": "isolation-plantar-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Calves"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Heels dropped below the step with knees straight: calves (gastrocnemius and soleus) are at their longest.",
   "stability": "high",
   "group": "calves-straight-knee"
  },
  "leg-press-calf-raise": {
   "name": "Leg Press Calf Raise",
   "pattern": "isolation-plantar-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Calves"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Toes on the platform edge with heels pushed toward you and knees straight: calves are at their longest.",
   "stability": "high",
   "group": "calves-straight-knee",
   "evidenceNote": "In an 8-week trial in young women (n=42, three groups), calf raises on a horizontal leg-press machine done only in the heel-down (stretched) half of the range grew the medial gastrocnemius more than full-range reps (+15.2% vs +6.7%); lateral gastrocnemius growth did not differ significantly from full range. (Kassiano et al. 2023, PMID 37015016)"
  },
  "smith-machine-calf-raise": {
   "name": "Smith Machine Standing Calf Raise (on a step)",
   "pattern": "isolation-plantar-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Calves"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Heels dropped below the step with knees straight: calves are at their longest.",
   "stability": "high",
   "group": "calves-straight-knee"
  },
  "single-leg-dumbbell-calf-raise": {
   "name": "Single-Leg Dumbbell Calf Raise (on a step)",
   "pattern": "isolation-plantar-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Calves"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Heel dropped below the step with knee straight: calf is at its longest.",
   "stability": "low",
   "group": "calves-straight-knee"
  },
  "seated-calf-raise": {
   "name": "Seated Calf Raise Machine",
   "pattern": "isolation-plantar-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Calves"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Heels dropped below the platform with knees bent: the soleus is at its longest; the gastrocnemius is slack because the knee is bent.",
   "stability": "high",
   "group": "calves-bent-knee"
  },
  "bent-knee-dumbbell-calf-raise": {
   "name": "Bent-Knee Calf Raise (dumbbell on the knee, seated on a bench)",
   "pattern": "isolation-plantar-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "db"
   ],
   "gear": "dumbbell",
   "primary": [
    "Calves"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Heels dropped below a step or plate with knees bent: the soleus is at its longest; the gastrocnemius is slack because the knee is bent.",
   "stability": "high",
   "group": "calves-bent-knee"
  },
  "cable-crunch": {
   "name": "Kneeling Cable Crunch (rope, high pulley)",
   "pattern": "core-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "cable",
   "primary": [
    "Abs"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Torso upright and slightly extended at the top: abs are at their longest in this movement.",
   "stability": "high",
   "group": "abs-crunch"
  },
  "machine-crunch": {
   "name": "Ab Crunch Machine",
   "pattern": "core-flexion",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "machine",
   "primary": [
    "Abs"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Torso upright at the start: abs are at their longest in this movement. Profile depends on the machine.",
   "stability": "high",
   "group": "abs-crunch"
  },
  "hanging-knee-raise": {
   "name": "Hanging Knee Raise",
   "pattern": "core-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Abs"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Hanging with legs straight down: abs are at their longest in this movement; the abs work hardest when the pelvis curls up at the top.",
   "stability": "low",
   "group": "abs-leg-raise",
   "accessNote": "needs a bar",
   "accessKey": "bar"
  },
  "hanging-leg-raise": {
   "name": "Hanging Straight-Leg Raise",
   "pattern": "core-flexion",
   "type": "isolation",
   "equip": [
    "gym",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Abs"
   ],
   "secondary": [],
   "profile": "mid",
   "lengthened": "Hanging with legs straight down: abs are at their longest in this movement; the abs work hardest when the pelvis curls up at the top.",
   "stability": "low",
   "group": "abs-leg-raise",
   "accessNote": "needs a bar",
   "accessKey": "bar"
  },
  "ab-wheel-rollout": {
   "name": "Ab Wheel Rollout (kneeling)",
   "pattern": "core-anti-extension",
   "type": "isolation",
   "equip": [
    "gym",
    "db",
    "bw"
   ],
   "gear": "bodyweight",
   "primary": [
    "Abs"
   ],
   "secondary": [
    "Lats"
   ],
   "profile": "lengthened",
   "lengthened": "Arms reaching far forward with the body extended: abs are at their longest and the lever is longest here.",
   "stability": "low",
   "group": "abs-rollout"
  },
  "barbell-rollout": {
   "name": "Barbell Rollout (kneeling, plates on the bar)",
   "pattern": "core-anti-extension",
   "type": "isolation",
   "equip": [
    "gym"
   ],
   "gear": "barbell",
   "primary": [
    "Abs"
   ],
   "secondary": [
    "Lats"
   ],
   "profile": "lengthened",
   "lengthened": "Arms reaching far forward with the body extended: abs are at their longest and the lever is longest here.",
   "stability": "low",
   "group": "abs-rollout"
  }
 }
};
