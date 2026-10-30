# i18n/ — Vietnamese translation (owner: Vance)

Xander owns `en.json`, `KEYS.md`, `vi.json` and the runtime (`prototype-v2/i18n-runtime.js`, `tools/build-i18n.js`).
I never create or edit those. Everything here is a **draft for Hoang to review** before it is merged into `vi.json`.

## Files

| File | What it holds | Keys |
|---|---|---|
| `glossary-vi.md` | Term glossary (draft 2): conventions + 99 terms, with an "Unsure?" flag and a "Hoang approved?" column (approved terms say "Yes (Hoang)"). **Review this first.** | — |
| `vi.draft.json` | Vietnamese for **Xander's exact keys only**. Includes every key in `en.json` at build time (230 on 29 Oct 2026, 18:3x Helsinki time), plus the keys from his agreed schemes: `exercise.<id>.name` ×119, `exercise.<id>.position` ×119 (the "lengthened" text), and `muscle.<id>` ×16. | 484, all filled |
| `vi.draft.pending.json` | Strings that are visible in the app but **have no key in `en.json` yet**. Format: `provisional.key → {en, vi, source}`. The provisional keys use Xander's namespaces. Rename them to his real keys once they exist. | 370 |
| `tools/build-vi-draft.py` | Rebuilds both drafts from the translation tables in `tools/*.py`. **Re-run it after `en.json` changes**: it fills new keys whose English matches a pending string (with placeholder names adapted), and it prints any keys that are still empty. | — |
| `tools/names.py`, `pos.py`, `cues.py`, `xkeys.py`, `pending.py` | Source tables: exercise names, positions, cues, Xander-key values and muscles, and pending UI strings (with source file and line). | — |

Exercise-name style: **Vietnamese gym name followed by the English name in brackets**, for example `Đẩy ngực ngang tạ đòn (Barbell Bench Press)`. People in Vietnamese gyms mostly use the English names, so the brackets help them match.

`evidenceNote` stays in English and is not translated (as instructed).

## Validation (done on 29 Oct 2026)
- Both files parse as JSON (UTF-8, `ensure_ascii=False`).
- Every key in `en.json` is in `vi.draft.json`, and none are empty.
- The `{placeholder}` set matches between the English and Vietnamese for every key, in both files.
- Plurals: Vietnamese has no plural forms (Intl.PluralRules `vi` → always `other`). Even so, every `.one` key is filled with the same text as `.other`, so the English fallback never shows up.
- Units, numbers and placeholders are kept. Decimals in the prose use a comma (`2,5 kg`). Numbers the code inserts should be formatted with `I18N.locale()` (see below).

## Strings missing from Xander's set (listed in `vi.draft.pending.json`)
Grouped by provisional namespace, with the source as `file:line` in the `source` field:
- **app.js UI**: nav (5), home (14), plan (33), builder (29), custom exercise form (27), community (23, including the day names for each sample split beyond `day1`), swap (18), week (15), summary (14), picker (13), workout (11), you (11), library (7), split (7), onboarding screens (10), logger extras (8), common (24: weekday short names T2…CN, extra plurals, etc.), why (2), rx (1), app.loading (1).
- **index.html**: title / loading text / aria-labels.
- **data.js**: everything not yet keyed, such as profileLabels, weekdayNames, and the community split days beyond day1.
- **exercises.js**:
  - `exercise.<id>.cue.<n>`: 72 cues on 24 exercises. Xander's scheme has only `.name` and `.position`, so the cues need a key (proposed: `exercise.<id>.cue.<n>`).
  - Access notes (`exercise.access.*`, 5 unique texts on 9 exercises).
  - Gear labels (`exercise.gear.*`).
  - Compound and isolation tags.

## Hard-coded issues found (for the builder)
1. `RIR 3` is hard-coded in app.js (~line 353, the empty-workout hint) and also in `en.json` → `logger.empty.body`. It should be `{rir}`, like `week.emptyThisBody`.
2. Dates, times and numbers are formatted with `toLocaleString('en-GB', …)` / `toLocaleDateString('en-GB')`. They should use `I18N.locale()` so that vi-VN gives `2,5` and Vietnamese date order.
3. The English `plural()` / `s`-suffix helpers in app.js should be replaced with `I18N.t('….one/.other')` keys.
4. `library.noMatch` uses the example word "lats". The search term itself must be localised (proposed: "lưng xô").
5. Sentences are built from pieces in places such as "Today you {changes}" and `reminder.onceMany`. These work in Vietnamese with the current word order, but Hoang should read them in context.

## Evidence copy — evidence.vi.json (draft 1, 29 Oct 2026, for Hoang's review)
- **File:** `evidence.vi.json`. It is separate from `vi.json` and not wired into the app. Rebuild it with `python3 tools/build-evidence-vi.py`. The translations live in `tools/evidence_vi/c1..c6.py`, the English source pairs in `items.json`/`uniq.json`.
- **Source:** `evidence.source-snapshot.md` is a byte copy (`cp -p`) of `prototype-v2/evidence-approved/evidence-1900-approved.md`.
  - mtime 2026-10-29 18:57:04 (UTC+2), 214,863 bytes.
  - sha256 `c83f6094c783193583692c6623b72203f420e814005efd78eb78382d53726464`.
  - It matches `approved-topics.json` `sourceSha256` and was identical to the live `evidence.md` at copy time. Use `diff` against it to see later edits.
- **Approval:** `qa-report-v2.md`, section "Final clearance, 19:00 version (Stirner)", says: "Approved for import: T3, T6, 13a, 13b and T14. All 17 topics of evidence.md are now approved." The rest were cleared in the 18:55 re-check.
- **Structure:**
  - `topics.<id>`, using the importer's ids 1–12, 13a, 13b, 13c, 14, 15.
  - Fields: `heading`, `oneLiner`, `summary`, `recommendation`, `evidenceStrength`, `hybridLine` (topic 4), and `citations.<doi>.detail` / `.note`. Each one is `{en, vi}`.
  - `round1.6` holds the round-one T6 text that the app currently imports. `approved-topics.json` keeps T6 on round1 until Hoang decides on rest.
  - `titles` holds the generated entry titles (e.g. "Why this rep range?").
  - Counts: 17 topics, 320 fields, plus 27 titles.
- **Validation:** the build fails if any of these checks fail:
  - every number in each English field is present in the Vietnamese;
  - every DOI, PMID and "Author YYYY" reference is present;
  - no Vietnamese-first "(ABBR)" pattern remains.
- **For the builder:**
  1. **Importer bug.** `import-evidence.js` parses citation `detail` with `\)\s+[—–-]\s+(.+)$`. The evidence lines read `(PubMed N) [tags] — detail`, so 229 details are dropped; only the Myrholt erratum line matches. The details in `evidence.vi.json` were parsed directly and keyed by DOI. Topic 8 has one citation with no DOI and no detail.
  2. **Branding.** The Vietnamese contains "Carlsen" wherever the English does (e.g. "Carlsen gợi ý…", "suy luận của Carlsen"). It must go through `brand()` / `brandText` exactly like the English.
  3. **Numbers.** Numbers in evidence copy keep dot decimals and thousands commas (0.30 cm, 2,058) so they match the papers. This is an exception to the vi-VN decimal comma used in the UI.
  4. **Language tag.** The Why? sheet marks evidence text `lang="en" data-ev`. When the Vietnamese is shown, set `lang="vi"`.
- **Abbreviation-first rule (Hoang, 19:04):** Hoang approved the ORDER only (English abbreviation first, Vietnamese in brackets). The first use per topic is "RIR (số rep còn dư)", "RPE (thang nỗ lực)", "1RM (mức tạ tối đa cho 1 rep)", "ROM (biên độ)", "PPL (Đẩy / Kéo / Chân)", added by the build script. Of these glosses only RPE "thang nỗ lực" is approved; the others are still proposals in `glossary-vi.md`.
- **Hoang's approved terms (19:15 list):** swapped into every source table by `tools/apply-hoang-terms.py` (one-off; prints counts per term) and marked "Yes (Hoang)" in `glossary-vi.md`. "Volume load" in the evidence uses "tổng khối lượng nâng", the same as tonnage. That is a proposal and is flagged ⚠.

## Evidence copy — original notes (superseded by the section above)
From `prototype-v2/evidence.json` (snapshot `evidence-approved/round1-v1-evidence.json`; gate `tools/approved-topics.json`), these are shown in the Why? sheet:
- **Translate later:** `title`, `oneLiner` (per topic and in `_meta.topics`), `summary`, `recommendation`, `evidenceStrength` (label), `citations[].detail`, `citations[].note`, and the conventions text (already done as `settings.convention.*`).
- **Keep in English:** `citations[].authors`, `year`, `title`, `journal`, DOI and PMID, and each exercise's `evidenceNote`.
- Proposed approach: a parallel `evidence.vi.json` keyed by topic id containing only those fields, which goes through the same Silas approval gate. Untranslated topics fall back to English.

## Proposed i18n structure (for Xander / builder)
- Keep Xander's runtime as is: `I18N.t(key, vars, fallback)`, with the vi → en fallback and Intl plurals.
- Merge flow:
  1. Hoang approves the glossary and the drafts.
  2. Copy the `vi.draft.json` values into `vi.json`, plus the pending entries once Xander assigns real keys.
  3. Run `tools/build-i18n.js` to regenerate `i18n.js`.
- Load `i18n.js` and the runtime **before** `data.js`. That way the data labels (options, splits, community) can be resolved with `t()` at render time, not frozen at load.
- Language switch: on the You screen, `I18N.setLang('vi')` + re-render. The choice is kept in `localStorage carlsen2.lang`, and `?lang=vi` works for QA.
- Exercise text: `t('exercise.'+id+'.name', null, ex.name)`, `.position`, and the proposed `.cue.<n>`. Custom exercises keep the name the user typed.
- Muscles: `t('muscle.'+id)` everywhere (map, week, reminders).
- The app name stays `APP_NAME` ("Lift") through `{app}`; never "Carlsen".
