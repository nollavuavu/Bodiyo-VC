#!/usr/bin/env python3
"""One-off swap of Hoang's approved terms (29 Oct 2026, 19:15 list) into the Vietnamese sources.
Touches only Vietnamese text: evidence_vi/c*.py (values) and the UI tables (xkeys/pending/pos/names/cues).
Prints replacements per term. Safe to re-run (patterns no longer match after the first run)."""
import re, os, glob, json, collections
H = os.path.dirname(os.path.abspath(__file__))
# (term, regex, replacement) - order matters
FAIL = [
 ('close to failure', r'gần tới failure', 'cận ngưỡng thất bại'),
 ('failure (comparative "gần … hơn")', r'(càng|Mức độ|độ) gần failure', r'\1 gần ngưỡng thất bại'),
 ('failure (comparative "gần … hơn")', r'gần failure hơn', 'gần ngưỡng thất bại hơn'),
 ('close to failure', r'gần failure', 'cận ngưỡng thất bại'),
 ('failure', r'tới failure', 'đến ngưỡng thất bại'),
 ('failure', r'failure', 'ngưỡng thất bại'),
]
COMMON = [
 ('hard set', r'set gắng sức', 'set nỗ lực'),
 ('hard set', r'Gắng sức = RIR', 'Set nỗ lực = RIR'),
 ('effort', r'gắng sức', 'nỗ lực'),
 ('tonnage / total load lifted', r'[Tt]ổng khối lượng tạ đã nâng', lambda m: m.group(0)[0] + 'ổng khối lượng nâng'),
 ('volume load', r'tổng khối lượng tạ', 'tổng khối lượng nâng'),
 ('volume', r'khối lượng tập', 'khối lượng tạ'),
 ('volume', r'([Kk])hối lượng(?! tạ| nâng| công)', r'\1hối lượng tạ'),
 ('progressive overload', r'[Tt]ăng tải dần', lambda m: ('Q' if m.group(0)[0] == 'T' else 'q') + 'uá tải lũy tiến'),
 ('progressive overload', r'không tăng tải', 'không có quá tải lũy tiến'),
 ('progressive overload', r'khi tăng tải', 'khi có quá tải lũy tiến'),
 ('progressive overload', r'việc tăng tải tốt hơn', 'việc có quá tải lũy tiến tốt hơn'),
 ('progressive overload', r'có thể tăng tải đều đặn', 'có thể duy trì quá tải lũy tiến đều đặn'),
 ('progressive overload', r'tập nặng và tăng tải đều', 'tập nặng và duy trì quá tải lũy tiến'),
 ('progressive overload', r'đủ lâu để tăng tải', 'đủ lâu để áp dụng quá tải lũy tiến'),
 ('progressive overload', r'và tăng tải chủ yếu bằng', 'và áp dụng quá tải lũy tiến chủ yếu bằng'),
 ('progressive overload', r'tăng tải', 'quá tải lũy tiến'),
 ('double progression', r'Dùng phương pháp tăng rep trước, rồi tăng tạ \(double progression\)', 'Dùng lũy tiến kép (tăng rep trước, rồi tăng tạ)'),
 ('double progression', r'Quy tắc tăng rep trước, rồi tăng tạ cụ thể', 'Quy tắc lũy tiến kép cụ thể'),
 ('double progression', r'tăng rep trước, rồi tăng tạ dùng cả hai cách', 'lũy tiến kép dùng cả hai cách'),
 ('custom exercise', r'bài tự tạo', 'bài tập'),
 ('custom exercise', r'Bài tự tạo', 'Bài tập'),
 ('custom exercise', r'Bài tập riêng mới', 'Bài tập mới'),
 ('custom exercise', r'Tạo bài tập riêng', 'Tạo bài tập'),
 ('custom exercise', r'tạo bài tập riêng', 'tạo bài tập'),
 ('custom exercise', r'bài tập tự thêm', 'bài tập'),
 ('mechanical tension', r'lực căng cơ học', 'sức căng cơ học'),
 ('mechanical tension', r'lực căng', 'sức căng'),
 ('lengthened partials', r'nửa biên độ ở đoạn giãn', 'nửa biên độ giãn'),
 ('primary muscle', r'nhóm cơ chính', 'cơ chủ vận'),
 ('primary muscle', r'([Cc])ơ chính', r'\1ơ chủ vận'),
 ('abs', r'"abs":"Bụng"', '"abs":"Cơ bụng"'),
 ('abs', r'; bụng làm việc', '; cơ bụng làm việc'),
 ('cable (drop puly)', r'về phía puly cao', 'lên phía cáp đặt cao'),
 ('cable (drop puly)', r'về phía puly', 'về phía cáp'),
 ('cable (drop puly)', r'Khi puly ngang', 'Khi cáp đặt ngang'),
 ('cable (drop puly)', r'puly (thấp|cao|ngang)', r'cáp đặt \1'),
 ('cable (drop puly)', r'ròng rọc \(puly\)', 'cáp'),
]
counts = collections.Counter()
def apply(text, rules):
    for term, pat, rep in rules:
        text, n = re.subn(pat, rep, text)
        counts[term] += n
    return text
# evidence values
ev = collections.Counter()
for f in sorted(glob.glob(os.path.join(H, 'evidence_vi', 'c*.py'))):
    ns = {}; exec(open(f, encoding='utf-8').read(), ns); V = ns['V']
    for k in V: V[k] = apply(V[k], FAIL + COMMON)
    open(f, 'w', encoding='utf-8').write('V = {\n' + ''.join(f'{k}: {V[k]!r},\n' for k in sorted(V)) + '}\n')
evc = dict(counts); counts.clear()
# UI tables: no Vietnamese "failure" there, and English columns must not be touched -> skip FAIL rules
for f in ['xkeys.py', 'pending.py', 'pos.py', 'names.py', 'cues.py']:
    p = os.path.join(H, f); s = open(p, encoding='utf-8').read()
    open(p, 'w', encoding='utf-8').write(apply(s, COMMON))
uic = dict(counts)
print(json.dumps({'evidence': evc, 'ui_tables': uic}, ensure_ascii=False, indent=1))
