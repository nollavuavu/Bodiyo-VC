#!/usr/bin/env python3
"""Regenerate glossary-justifications.md: only terms in glossary-vi.json that Hoang has NOT approved yet."""
import json, os
I = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
g = json.load(open(os.path.join(I, 'glossary-vi.json'), encoding='utf-8'))
# Hoang's 19:15 list approved the earlier 'reported picks' (hard set, failure, progressive overload, primary muscle); none left.
REPORTED = {}
open_terms = [t for t in g['terms'] if not t['hoangApproved']]
approved = [t for t in g['terms'] if t['hoangApproved']]
L = ['# Justifications for the glossary terms that are not approved yet', '',
     f'Regenerated from glossary-vi.json ({g["source"]}). {len(open_terms)} of {g["count"]} terms still need Hoang\'s decision; '
     f'{len(approved)} are approved and left out: ' + ', '.join(f'{t["english"]} → {t["vietnamese"]}' for t in approved) + '.',
     '', 'Each line gives the proposed wording and why. ⚠ marks the ones I am least sure about. '
     'Terms tagged *new in evidence pass* come from the evidence (Why?) translation.', '']
rep = [t for t in open_terms if t['english'] in REPORTED]
if rep:
    L += ['## Reported as Hoang\'s picks, not yet recorded', '',
          'The previous version of this file said Hoang picked these. They are not marked approved in glossary-vi.md, '
          'and the drafts still use the proposed wording. Please confirm, and they will be marked "Yes (Hoang)" and applied everywhere.', '']
    for t in rep:
        L.append(f'- **{t["english"]}** → reported pick: "{REPORTED[t["english"]]}" (current draft: {t["vietnamese"]}).')
    L.append('')
sec = None
for t in open_terms:
    if t in rep: continue
    if t['section'] != sec:
        sec = t['section']; L += [f'## {sec}', '']
    line = f'- **{t["english"]}** → {t["vietnamese"]}. {t["why"] or ""}'
    if t['unsure']: line += f' {t["unsure"] if t["unsure"].startswith("⚠") else "⚠ " + t["unsure"]}'
    L.append(line.rstrip())
    if sec != (open_terms[open_terms.index(t)+1]['section'] if open_terms.index(t)+1 < len(open_terms) else None):
        L.append('')
open(os.path.join(I, 'glossary-justifications.md'), 'w', encoding='utf-8').write('\n'.join(L).rstrip() + '\n')
print(len(open_terms), 'open terms written;', len(rep), 'reported picks')
