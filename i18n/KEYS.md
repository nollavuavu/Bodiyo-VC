# i18n keys for Lift (prototype v2)

**vi.json belongs to Vance.** The build only ever created it once, as an empty-value skeleton (every key, value `""`),
and never writes Vietnamese into it. Empty values fall back to English per key. `vi.draft.json`,
`vi.draft.pending.json`, `glossary-vi.md`, `glossary-vi.json` and `tools/` are Vance's drafts and are never touched by the build.

`en.json` is the canonical English (final as of 29 Oct 2026; 884 keys). Evidence copy (Why? titles, one-liners, research,
citations, exercise `evidenceNote`) stays English by design and is **not keyed**; in the DOM it carries `lang="en"`.

## How strings load
`en.json` + `vi.json` → `prototype-v2/tools/build-i18n.js` → `prototype-v2/i18n.js` (`{meta, en, vi, pseudo}`) →
`i18n-runtime.js` (`window.I18N`). Re-run `sh prototype-v2/tools/build.sh` after editing either JSON file.
A vi value ships only if its `{placeholder}` set matches English; otherwise that key falls back to English and the build warns.
Language: You → Language (EN / VI), saved as `carlsen2.lang`; default `en`. `?lang=vi|en|pseudo` overrides for testing.
`pseudo` is a generated test locale (accented, ~40% longer, wrapped in `[…]`), never offered in the UI.

## Conventions
- **Flat, namespaced, stable keys**: `<screen-or-area>.<thing>[.<variant>]`, camelCase segments; ids from data keep their own form
  (`exercise.barbell-bench-press.name`, `settings.convention.blank-rir`).
- **Placeholders**: `{name}`. Never concatenate translated fragments; whole sentences are one key with placeholders.
  Placeholder values are escaped by the app; translations must keep every placeholder from English (order may change).
- **Plurals**: `<key>.one` / `<key>.other` (Intl.PluralRules categories of the active locale; Vietnamese uses only `other`,
  so filling `.other` is enough, `.one` may be left empty). The count is passed as `{n}` (and `{count}`).
- **Numbers and dates** are formatted by the app with `Intl` in the active locale (`en-GB`, `vi-VN`); don't put formatted numbers in strings.
- `{app}` is the product name (APP_NAME = "Lift"); `{rir}` comes from the hard-set rule (`D.rules.hardSetMaxRIR`).

## Prefixes
| Prefix | What |
|---|---|
| `app.*`, `nav.*` | shell: loading text, document title, tab bar |
| `home.*`, `plan.*`, `split.*`, `week.*`, `summary.*`, `workout.*`, `logger.*`, `picker.*`, `swap.*`, `library.*`, `builder.*`, `custom.*`, `community.*`, `you.*`, `settings.*`, `onboarding.*` | per screen / feature |
| `reminder.*` | weekly-tracker reminders (`reminder.next.<region>` push/pull/legs/other) |
| `why.*`, `rx.*` | UI around the Why? sheet and prescription sheet (not the evidence text) |
| `common.*` | shared: buttons, units, `common.count.*` / `common.plural.*` plurals, `common.weekday.<mon..sun>`, `common.equipment.<id>(.sub)`, `common.profile.<id>`, `common.pattern.<id>`, `common.dayN` |
| `muscle.<id>` | 16 muscles; id = English name lower snake case (`muscle.upper_back`) |
| `exercise.<id>.name` / `.position` / `.cue.<n>` | generated from `exercises.json` (119 names, 119 positions, 72 cues) |
| `exercise.gear.*`, `exercise.access.*` | gear labels (5) and access notes (5) generated from `exercises.json` |
| `community.<id>.name/.blurb/.day1`, `community.day.*` | sample splits ("Sample data") |
| `split.name.<id>`, `split.session.<id>` | recommended split names and session names |

## Generated families (don't edit by hand)
`exercise.<id>.*`, `muscle.*`, `common.pattern.*`, `exercise.gear.*`, `exercise.access.*` are rewritten by
`prototype-v2/tools/sync-i18n-keys.js` from the current `exercises.json`; stale ids are removed. Reserved ids: gear, access, map, rx.

## Deviations from Vance's provisional keys (vi.draft.pending.json)
All 370 pending strings now have keys; where the English matched, his provisional key name was kept. Differences:
`community.copyName` "{name} (copy)" (instead of copySuffix); `library.customCount` "{count} + {n} custom";
`library.count.*` and `community.nSets.*` are plurals; `plan.nextTag`; `common.dayN` covers plan.day / picker.day;
`nav.workout` added; `common.docTitle`, `exercise.accessLine` "{note}.", `settings.language*`, `why.placeholder`, `why.sourceKey`;
weekday short names are `common.weekday.<mon..sun>`; profile labels are `common.profile.<id>`; `logger.empty.body` uses `{rir}`.
Vance's `build-vi-draft.py` maps by English text, so re-running it (on a copy) picks these up automatically.
