#!/bin/sh
# Full rebuild. Re-reads ../exercises.json, the approved evidence snapshot named in tools/approved-topics.json (never the live
# ../evidence.md), tools/approved-topics.json and ../i18n/en.json + vi.json every time (all topics come from the
# approved snapshot since 19:00 EET; round-one text is only used if a topic is switched to "round1"). Order matters: exercises.js -> en.json exercise keys -> i18n.js.
set -e
cd "$(dirname "$0")/.."
node tools/build-exercises.js
node tools/sync-i18n-keys.js
node tools/build-i18n.js
node tools/import-evidence.js
node tools/check-evidence-leaks.js
node tools/test-citations.js      # every (c) citation keeps DOI, PubMed id, [tags] and detail
node tools/build-evidence.js
node tools/test-logic.js
