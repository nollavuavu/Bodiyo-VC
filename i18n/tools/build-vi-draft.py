#!/usr/bin/env python3
"""Builds vi.draft.json (Xander's exact keys only) and vi.draft.pending.json (strings not yet in his en.json).
Re-run after Xander updates en.json:  python3 /workspace/carlsen/i18n/tools/build-vi-draft.py
Never writes en.json / vi.json / KEYS.md."""
import json, os, re, collections
H = os.path.dirname(os.path.abspath(__file__)); I = os.path.dirname(H); C = os.path.dirname(I)
ns = {}
for f in ["names.py","pos.py","xkeys.py","pending.py","cues.py"]: exec(open(os.path.join(H,f),encoding="utf-8").read(), ns)
N,P,XV,MU,U,CU = ns["N"],ns["P"],ns["XV"],ns["MUSCLE"],ns["U"],ns["C"]
en = json.load(open(os.path.join(I,"en.json"),encoding="utf-8"))
ex = json.load(open(os.path.join(C,"exercises.json"),encoding="utf-8"))
# all vi translations we have, by key
have = dict(XV)
for e in ex: have[f"exercise.{e['id']}.name"]=N[e["id"]]; have[f"exercise.{e['id']}.position"]=P[e["id"]]
for k,v in MU.items(): have[f"muscle.{k}"]=v
# map pending items onto Xander's keys when his English text matches exactly ({x} names may differ -> compare with placeholders normalised)
norm = lambda s: re.sub(r"\{\w+\}","{}",s).strip()
by_en = collections.defaultdict(list)
for k,v in en.items(): by_en[norm(v)].append(k)
pending = {}; mapped = {}
cands = collections.defaultdict(list)
for item in U: cands[norm(item[1])].append(item)
def segs(k): return set(re.split(r"[._-]", k.lower()))
used = set()
for k in sorted(en):
    if k in have: continue
    opts = cands.get(norm(en[k]))
    if not opts: continue
    key,src,vi,loc = max(opts, key=lambda it: len(segs(it[0]) & segs(k)))
    xn = re.findall(r"\{(\w+)\}", en[k]); on = re.findall(r"\{(\w+)\}", src); t = vi
    if sorted(xn)!=sorted(on) and len(xn)==len(on):
        for a_,b_ in zip(on,xn): t=t.replace("{"+a_+"}","{\x00"+b_+"}")
        t=t.replace("\x00","")
    have[k]=t; mapped[k]=key; used.add(key)
for key,src,vi,loc in U:
    if key not in used: pending[key]={"en":src,"vi":vi,"source":loc}
# cues -> pending (not in Xander's exercise.<id>.name/.position scheme)
import importlib
cmap = {}
try:
    js = open(os.path.join(C,"prototype-v2","exercises.js"),encoding="utf-8").read()
    data = json.loads(js[js.index("{"):js.rstrip().rstrip(";").rindex("}")+1])
    for i,e in data["exercises"].items():
        for n,c in enumerate(e.get("cues") or []): pending[f"exercise.{i}.cue.{n+1}"]={"en":c,"vi":CU[c],"source":"exercises.js cues (from tools/exercise-app-overrides.json)"}
except Exception as err: print("cues skipped:", err)
# exercise cues that are now in en.json (exercise.<id>.cue.N): fill from cues.py by English text
for k in en:
    if ".cue." in k and k not in have and en[k] in CU: have[k] = CU[en[k]]
for k in en:
    m = re.match(r"^(.*)\.(zero|one|two|few|many)$", k)
    if m and k not in have and (m.group(1)+".other") in have: have[k] = have[m.group(1)+".other"]
draft = {}; missing = []
keys = set(en) | {k for k in have if re.match(r"^(exercise\.[a-z0-9-]+\.(name|position)|muscle\.\w+)$", k)}
for k in sorted(keys):
    if k in have: draft[k]=have[k]
    else: draft[k]=""; missing.append(k)
json.dump(draft, open(os.path.join(I,"vi.draft.json"),"w",encoding="utf-8"), ensure_ascii=False, indent=2, sort_keys=True)
pending = {k:v for k,v in pending.items() if not (k in en and have.get(k))}  # now covered by an en.json key
json.dump(pending, open(os.path.join(I,"vi.draft.pending.json"),"w",encoding="utf-8"), ensure_ascii=False, indent=2)
# placeholder check
bad=[k for k,v in draft.items() if v and k in en and sorted(re.findall(r"\{\w+\}",v))!=sorted(re.findall(r"\{\w+\}",en[k]))]
print(f"en.json keys: {len(en)} | vi.draft keys: {len(draft)} (filled {len(draft)-len(missing)}, empty {len(missing)}) | pending: {len(pending)} | auto-mapped from pending: {len(mapped)}")
print("draft keys not in en.json (exercise./muscle. per Xander's scheme):", len(set(draft)-set(en)))
if missing: print("EMPTY (need translation):", missing)
if bad: print("PLACEHOLDER MISMATCH:", bad)
