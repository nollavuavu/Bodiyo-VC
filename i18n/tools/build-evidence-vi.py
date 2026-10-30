#!/usr/bin/env python3
"""Build i18n/evidence.vi.json from the translated evidence strings.

Inputs (all in tools/evidence_vi/):
  items.json  - [key, english] pairs parsed from evidence.source-snapshot.md
                key = "<topic>|heading|oneLiner|summary|recommendation|evidenceStrength|hybridLine"
                   or "<topic>|cite|<doi>|detail|note", or "r1-6|<field>" (round-1 T6 text)
  uniq.json   - unique English strings (index = translation id)
  c1..c6.py   - V = {index: vietnamese}
Post-process: Hoang's abbreviation-first rule (the ORDER was approved 29 Oct 2026, 19:04):
  first app-visible use of RIR/RPE/1RM/ROM/PPL/UL per topic gets "ABBR (gloss)".
  Only the RPE gloss ("thang nỗ lực") is approved; the RIR/1RM/ROM/PPL/UL glosses are still proposals.
Hoang's approved terms (19:15 list) were swapped into c*.py and TITLES_VI by tools/apply-hoang-terms.py.
Validation: JSON round-trip; every number in each English field appears in its
Vietnamese counterpart; DOIs/PMIDs/"Author YYYY" refs unchanged; no Vietnamese-first
"(ABBR)" pattern left.
"""
import json, re, os, sys, hashlib, glob, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(HERE, 'evidence_vi')
ROOT = os.path.dirname(HERE)
SNAP = os.path.join(ROOT, 'evidence.source-snapshot.md')
OUT = os.path.join(ROOT, 'evidence.vi.json')

items = json.load(open(os.path.join(D, 'items.json'), encoding='utf-8'))
uniq = json.load(open(os.path.join(D, 'uniq.json'), encoding='utf-8'))
V = {}
for f in sorted(glob.glob(os.path.join(D, 'c*.py'))):
    ns = {}; exec(open(f, encoding='utf-8').read(), ns); V.update(ns['V'])
idx = {s: i for i, s in enumerate(uniq)}
missing = [i for i in range(len(uniq)) if i not in V]
assert not missing, f'untranslated: {missing}'

# ---- Hoang's abbreviation-first rule -------------------------------------
GLOSS = {
    'RIR': 'số rep còn dư',
    'RPE': 'thang nỗ lực',
    '1RM': 'mức tạ tối đa cho 1 rep',
    'ROM': 'biên độ',
    'PPL': 'Đẩy / Kéo / Chân',
    'UL':  'Thân trên / Thân dưới',
}
def gloss_first(text, done):
    """Gloss the first eligible occurrence of each abbreviation not yet glossed in this topic."""
    for ab, g in GLOSS.items():
        if ab in done:
            continue
        for m in re.finditer(r'(?<![\w%/–\-])' + re.escape(ab) + r'(?![\w/–\-])', text):
            after = text[m.end():]
            before = text[:m.start()]
            if after.startswith(' (') or after.startswith('('):
                done.add(ab); break          # already "ABBR (…)"
            if re.match(r'\s?\d', after):     # "RPE 10", "RIR 2" -> try a later occurrence
                continue
            if before.endswith('('):
                continue                      # avoid nested "(RPE (thang nỗ lực) …)"
            if ab == 'RPE' and before.lower().endswith('thang '):
                continue                      # avoid "thang RPE (thang nỗ lực)"
            text = text[:m.end()] + f' ({g})' + after
            done.add(ab); break
    return text

VI_FIRST = re.compile(r'[a-zà-ỹđ]\s\((RIR|RPE|1RM|ROM|PPL|UL|CSA)\)')

# ---- assemble --------------------------------------------------------------
FIELD_ORDER = ['heading', 'oneLiner', 'summary', 'recommendation', 'evidenceStrength', 'hybridLine']
topics, round1 = {}, {}
order = []
for key, en in items:
    t = key.split('|')[0]
    if t not in order: order.append(t)
def sortkey(kv):
    k = kv[0].split('|')
    if k[1] == 'cite': return (1, 0)
    return (0, FIELD_ORDER.index(k[1]))
by_topic = {}
for key, en in items:
    by_topic.setdefault(key.split('|')[0], []).append((key, en))

nfields = 0
for t in order:
    rows = sorted(by_topic[t], key=sortkey)   # stable: citations keep source order
    done_heading, done_body = set(), set()
    target = round1.setdefault('6', {}) if t == 'r1-6' else topics.setdefault(t, {})
    for key, en in rows:
        parts = key.split('|')
        vi = V[idx[en]]
        if parts[1] == 'heading':
            vi = gloss_first(vi, done_heading)
        else:
            vi = gloss_first(vi, done_body)
        rec = {'en': en, 'vi': vi}
        if parts[1] == 'cite':
            doi, fld = parts[2], parts[3]
            target.setdefault('citations', {}).setdefault(doi, {})[fld] = rec
        else:
            target[parts[1]] = rec
        nfields += 1

TITLES_VI = {
    'Why full body?': 'Vì sao tập toàn thân?',
    'Why upper / lower?': 'Vì sao chia thân trên / thân dưới?',
    'Why a hybrid split?': 'Vì sao chọn lịch kết hợp?',
    'Why push / pull / legs?': 'Vì sao chia Đẩy / Kéo / Chân?',
    'Why this many sets?': 'Vì sao tập số set này?',
    'Why this rep range?': 'Vì sao chọn khoảng rep này?',
    'Why train at this RIR?': 'Vì sao tập ở mức RIR (số rep còn dư) này?',
    'Why this rest time?': 'Vì sao nghỉ chừng này thời gian?',
    'Why {name}?': 'Vì sao chọn {name}?',
    'Why the lengthened position?': 'Vì sao tập ở tư thế cơ giãn dài?',
    'How to judge a custom exercise': 'Cách đánh giá bài tập',
    'How {APP} decides: mechanical tension': 'Cách {APP} quyết định: sức căng cơ học',
    'Why count hard sets per muscle?': 'Vì sao đếm set nỗ lực cho từng nhóm cơ?',
    'Why the goal question matters': 'Vì sao câu hỏi về mục tiêu lại quan trọng',
    'Why days per week matters': 'Vì sao số ngày tập mỗi tuần lại quan trọng',
    'Why experience matters': 'Vì sao kinh nghiệm tập lại quan trọng',
    'Why session length matters': 'Vì sao thời lượng buổi tập lại quan trọng',
    'Why equipment matters': 'Vì sao dụng cụ lại quan trọng',
    'How weekly hard sets are counted': 'Cách đếm số set nỗ lực mỗi tuần',
    'Is there a weekly target?': 'Có mục tiêu mỗi tuần không?',
    'Why about twice a week?': 'Vì sao khoảng hai lần mỗi tuần?',
    'Why spread sets across sessions?': 'Vì sao nên chia set ra nhiều buổi?',
    'Why 2–4 sets per exercise?': 'Vì sao 2–4 set mỗi bài?',
    'How swaps are matched': 'Cách chọn bài thay thế',
    'Why this next-session target?': 'Vì sao đặt mục tiêu này cho buổi sau?',
    'How to log RIR': 'Cách ghi RIR (số rep còn dư)',
    'Do I need a deload week?': 'Tôi có cần tuần deload không?',
}
TITLE_KEYS = {
    'split.<whyKey>': ['Why full body?', 'Why upper / lower?', 'Why a hybrid split?', 'Why push / pull / legs?'],
    'sets.*': 'Why this many sets?', 'reps.*': 'Why this rep range?', 'rir.<level>': 'Why train at this RIR?',
    'rest.*': 'Why this rest time?', 'exercise.<id>': 'Why {name}?', 'lengthened.<id>': 'Why the lengthened position?',
    'exercise.custom': 'How to judge a custom exercise', 'principle.mechanical_tension': 'How {APP} decides: mechanical tension',
    'volume.hard_sets': 'Why count hard sets per muscle?', 'onboarding.goal': 'Why the goal question matters',
    'onboarding.days': 'Why days per week matters', 'onboarding.experience': 'Why experience matters',
    'onboarding.session_length': 'Why session length matters', 'onboarding.equipment': 'Why equipment matters',
    'weekly.hard_sets': 'How weekly hard sets are counted', 'weekly.band': 'Is there a weekly target?',
    'reminder.frequency': 'Why about twice a week?', 'reminder.session_sets': 'Why spread sets across sessions?',
    'plan.exercise_sets': 'Why 2–4 sets per exercise?', 'swap.similar': 'How swaps are matched',
    'progression.suggestion': 'Why this next-session target?', 'rir.input': 'How to log RIR',
    'deload.optional': 'Do I need a deload week?',
}

# ---- validation ------------------------------------------------------------
NUM = re.compile(r'[+−]?\d+(?:[.,]\d+)*')
REF = re.compile(r"\b[A-ZÀ-Ý][A-Za-zÀ-ÿ'\-]+(?: et al\.)? \d{4}\b")
DOI = re.compile(r'10\.\d{4,9}/\S+')
PMID = re.compile(r'PubMed \d+|PMID:? ?\d+')
errors = []
def check(path, en, vi):
    for n in set(NUM.findall(en)) - set(NUM.findall(vi)):
        errors.append(f'{path}: number {n!r} missing')
    for pat, label in ((REF, 'ref'), (DOI, 'doi'), (PMID, 'pmid')):
        for r in set(pat.findall(en)):
            if label == 'ref' and r.split()[0] in ('The', 'In', 'A', 'An', 'By', 'Since', 'From', 'Until'):
                r = r.split()[-1]
            if r not in vi:
                errors.append(f'{path}: {label} {r!r} missing')
    if VI_FIRST.search(vi):
        errors.append(f'{path}: Vietnamese-first abbreviation: {VI_FIRST.search(vi).group(0)!r}')
def walk(o, path):
    if isinstance(o, dict):
        if set(o) == {'en', 'vi'}:
            check(path, o['en'], o['vi']); return
        for k, v in o.items(): walk(v, f'{path}.{k}')
walk(topics, 'topics'); walk(round1, 'round1')
for en, vi in TITLES_VI.items():
    check(f'titles[{en}]', en, vi)

st = os.stat(SNAP)
sha = hashlib.sha256(open(SNAP, 'rb').read()).hexdigest()
counts = {}
for t, o in topics.items():
    counts[t] = sum(1 for k in o if k != 'citations') + sum(len(c) for c in o.get('citations', {}).values())
out = {
    '_meta': {
        'status': "DRAFT for Hoang's review - not wired into the app",
        'source': 'i18n/evidence.source-snapshot.md (byte copy of prototype-v2/evidence-approved/evidence-1900-approved.md)',
        'sourceSha256': sha,
        'sourceMtime': datetime.datetime.fromtimestamp(st.st_mtime).astimezone().isoformat(timespec='seconds'),
        'approval': "qa-report-v2.md, 'Final clearance, 19:00 version (Stirner)': Approved for import: T3, T6, 13a, 13b and T14. All 17 topics of evidence.md are now approved. (T1, T2, T4, T5, T7-T12, 13b, 13c, T15 cleared in the 18:55 re-check.)",
        'T6note': "prototype-v2/tools/approved-topics.json keeps topic 6 on the round-one text pending Hoang's rest decision. topics.6 = 19:00 snapshot text; round1.6 = the round-one text the app currently imports.",
        'keys': "topics.<id> uses the importer's topic ids (1..12, 13a, 13b, 13c, 14, 15); citations keyed by DOI exactly as evidence.json citation.doi. Fields map to evidence.json entries: heading=topic title, oneLiner, summary, recommendation, evidenceStrength, hybridLine (topic 4), citations[doi].detail / .note. Entry titles (e.g. 'Why this rep range?') are generated by import-evidence.js; their Vietnamese is in titles.",
        'rules': [
            'Paper titles, authors, journals, years, DOIs, PMIDs are not in these fields and stay English in evidence.json.',
            'Numbers kept exactly as in English, including dot decimals (0.30 cm, p=0.06) and thousands commas (2,058); exception to the UI decimal-comma convention so they match the cited papers.',
            "Abbreviation-first (Hoang approved the order, 19:04): first use per topic is 'ABBR (gloss)'. Only the RPE gloss 'thang nỗ lực' is approved; RIR/1RM/ROM/PPL/UL glosses are proposals. Statistical abbreviations (ES, CI, SMD, MD, BF, SEM, EMG, MRI, DXA, HDI, RCT) are left unglossed as in the English.",
            "Hoang-approved terms (19:15): ngưỡng thất bại (failure; 'đến ngưỡng thất bại' = to failure), cận ngưỡng thất bại (close to failure), set nỗ lực (hard set), nỗ lực (effort), khối lượng tạ (volume), tổng khối lượng nâng (total load lifted / tonnage), quá tải lũy tiến (progressive overload), lũy tiến kép (double progression), sức căng cơ học (mechanical tension), rep nửa biên độ giãn (lengthened partials), sơ yếu kháng lực (resistance profile), cơ chủ vận (primary muscle). Volume load also uses 'tổng khối lượng nâng' (proposal, flagged).",
            "Text contains 'Carlsen' exactly where the English does; it must go through brand() like the English (app.js brand(), importer brandText).",
        ],
        'counts': {'topics': len(topics), 'fieldsTotal': nfields, 'perTopic': counts, 'round1_6': len(round1.get('6', {})), 'titles': len(TITLES_VI)},
    },
    'topics': topics,
    'round1': round1,
    'titles': {'keys': TITLE_KEYS, 'vi': TITLES_VI},
}
s = json.dumps(out, ensure_ascii=False, indent=2)
json.loads(s)
if errors:
    print('\n'.join(errors)); print(f'{len(errors)} validation errors'); sys.exit(1)
open(OUT, 'w', encoding='utf-8').write(s + '\n')
print(f'wrote {OUT}: {len(topics)} topics, {nfields} fields (+{len(TITLES_VI)} titles); validation OK')
