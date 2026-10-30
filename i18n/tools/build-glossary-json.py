#!/usr/bin/env python3
"""Regenerate glossary-vi.json from glossary-vi.md (same structure as draft 1)."""
import json, os, re
I = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
md = open(os.path.join(I, 'glossary-vi.md'), encoding='utf-8').read()
terms, section = [], None
clean = lambda c: (re.sub(r'\*\*(.+?)\*\*', r'\1', c).strip() or None)
for line in md.splitlines():
    if line.startswith('### '):
        section = line[4:].strip(); continue
    if section and line.startswith('| ') and not line.startswith('| English') and not line.startswith('|---'):
        cells = [c.strip() for c in line.strip()[1:-1].split('|')]
        if len(cells) != 6: raise SystemExit(f'bad row ({len(cells)} cells): {line}')
        e, v, k, w, u, h = (clean(c) for c in cells)
        terms.append({'section': section, 'english': e, 'vietnamese': v, 'keepEnglish': k,
                      'why': w, 'unsure': u, 'hoangApproved': h})
    elif line.startswith('## ') and section:
        section = None
out = {'source': 'glossary-vi.md (draft 2, 29 Oct 2026: evidence pass + Hoang decisions 19:01/19:04 + approved-terms list 19:15)',
       'count': len(terms), 'terms': terms}
json.dump(out, open(os.path.join(I, 'glossary-vi.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print(len(terms), 'terms;', sum(1 for t in terms if t['hoangApproved']), 'Hoang-approved;',
      sum(1 for t in terms if t['section'].startswith('New in evidence')), 'new in evidence pass')
