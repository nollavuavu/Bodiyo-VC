# Lift (Carlsen) – English → Vietnamese glossary (draft 2)

Owner: Vance · Reviewer: Hoang (native speaker, final say) · Draft 1, 29 Oct 2026 · Draft 2 (evidence pass + Hoang decisions of 19:01, 19:04 and his approved-terms list of 19:15), 29 Oct 2026

## Conventions used in this draft

- **Audience and tone.** Ordinary Vietnamese gym-goers, not sports scientists. Short, friendly, everyday words; a coach talking, not a textbook. Avoid Sino-Vietnamese academic terms (e.g. *phì đại cơ*, *căng thẳng cơ học*) when a plain phrase works.
- **Pronoun.** The app speaks to the user as **"bạn"** throughout. No "quý khách", no "mình/cậu". Imperatives are written plainly ("Nghỉ 2–3 phút"), and "hãy" is used only where the sentence sounds abrupt without it.
- **Gym loanwords kept as they are.** Vietnamese gyms already say *set*, *rep*, *superset*, *deload*, *split*, *PPL*, and most exercise names in English, so the app keeps them (lower-case, no brackets) instead of forcing *hiệp/lần lặp*. Exercise names: English name first, Vietnamese description second where it helps (see "Exercise names" below).
- **When English stays in brackets.** A technical term the user will meet again in research/Why? copy appears as *Vietnamese (English)* the **first time on a screen or in a Why? sheet**, then Vietnamese only, e.g. "sức căng cơ học (mechanical tension)". Abbreviations stay in English and get a short Vietnamese gloss, always in the order below.
- **Abbreviation first, Vietnamese after (rule approved by Hoang, 29 Oct 2026, 19:04).** English abbreviations (RIR, RPE, 1RM, PPL, ROM, UL, etc.) always come first, followed by the Vietnamese translation in brackets: "RIR (số rep còn dư)", "RPE (thang nỗ lực)", "1RM (mức tạ tối đa cho 1 rep)", "ROM (biên độ)", "PPL (Đẩy / Kéo / Chân)", "UL (Thân trên / Thân dưới)". Never write the Vietnamese first with the abbreviation in brackets. The gloss is shown on first use in a sentence, a screen or a Why? sheet; after that the abbreviation alone. In tight UI cells with no room (table headers, chips, compact "· RIR {rir} ·" lines), the abbreviation alone is fine. Statistical abbreviations in research copy (ES, CI, SMD, MD, BF, SEM, EMG, MRI, DXA, RCT) stay unglossed, as in the English. *Hoang approved the ORDER only (Yes (Hoang)). The example glosses are proposals, except RPE "thang nỗ lực", which he approved.*
- **Units and numbers.** kg, min/s kept as "kg", "phút", "giây". Ranges keep the en dash "6–12". **Decimals should use a comma in Vietnamese (2,5 kg)**; that is a formatting change for the builder (`toLocaleString("vi-VN")`), not a string change. Placeholders `{name}` are never translated. **Exception, evidence copy (new in evidence pass):** numbers in Why? sheets and citation details are copied exactly from the English, with dot decimals and thousands commas (0.30 cm, p=0.06, 2,058), so they match the cited papers.
- **Paper titles, author names, journals, DOIs/PMIDs and the exercise `evidenceNote` field stay in English.**
- **Diacritics:** Unicode NFC, tone marks in the common web style (e.g. "hòa", "khỏe"). Hoang to confirm if he prefers the newer style ("hoà", "khoẻ").

## Glossary

Legend: **Keep EN?** = show the English term in brackets the first time (Yes), never (No), or the English term *is* the Vietnamese UI word (Keep). **Unsure?** ⚠ = I am not confident this is how Vietnamese lifters say it; please check first.

### Effort and failure

| English | Proposed Vietnamese | Keep EN? | Why (one line) | Unsure? | Hoang approved? |
|---|---|---|---|---|---|
| RIR (reps in reserve) | **RIR (số rep còn dư)**; in sentences: "còn dư 1–2 rep" | Keep (abbr.) + gloss | Abbreviation-first ORDER approved by Hoang (19:04); the gloss "số rep còn dư" is still my proposal. | | |
| RPE | **RPE (thang nỗ lực)** | Keep (abbr.) + gloss | Hoang's term; only appears in research copy, not the logger. | | Yes (Hoang) |
| reps in reserve (spelled out, column hint) | "số rep còn dư" | No | Plain explanation of the abbreviation; same gloss as "RIR (số rep còn dư)" (gloss not yet approved). | | |
| failure / to failure | **"ngưỡng thất bại"**; to failure = **"đến ngưỡng thất bại"** (e.g. "tập đến ngưỡng thất bại") | No | Hoang's term. Where the English uses "failure" as shorthand for "training to failure", the Vietnamese says "tập đến ngưỡng thất bại". | | Yes (Hoang) |
| hard set | **"set nỗ lực"** (no plural form: "3 set nỗ lực", "các set nỗ lực") | No | Hoang's term. "Hard = RIR ≤ x" is written "Set nỗ lực = RIR {rir} trở xuống". | | Yes (Hoang) |
| effective reps | "rep hiệu quả" | Yes | Literal and already used in VN fitness content. | | |
| effort | **"nỗ lực"** ("mức nỗ lực", "mức nỗ lực cảm nhận" for perceived exertion) | No | Hoang's term. | | Yes (Hoang) |
| close to failure / ends hard | **"cận ngưỡng thất bại"**; comparatives use "gần … hơn" ("gần ngưỡng thất bại hơn", "càng gần ngưỡng thất bại") | No | Hoang's term; "càng cận …" / "cận … hơn" read badly, so comparatives keep "gần". | | Yes (Hoang) |

### Load, reps, sets, progression

| English | Proposed Vietnamese | Keep EN? | Why (one line) | Unsure? | Hoang approved? |
|---|---|---|---|---|---|
| set | **set** | Keep | Universal in VN gyms ("3 set 12 rep"); "hiệp" sounds like a textbook or a boxing round. | ⚠ Confirm you prefer "set" over "hiệp" app-wide. | |
| rep / reps | **rep** | Keep | Same as set; "lần lặp" is only used in formal writing. | | |
| rep range | "khoảng rep" (e.g. "khoảng 6–12 rep") | No | Short and clear. | | |
| weight / load | "mức tạ", "tạ" | No | What lifters actually say ("lên tạ", "giữ tạ"). | | |
| 1RM | **1RM (mức tạ tối đa cho 1 rep)** | Keep (abbr.) + gloss | Abbreviation-first ORDER approved by Hoang (19:04); the gloss is still my proposal. Mostly in research copy. | | |
| volume (sets) | **"khối lượng tạ"** (meaning number of hard sets); "total volume" = "tổng khối lượng tạ" | No | Hoang's term; app must still say *what* it counts ("số set nỗ lực"). | | Yes (Hoang) |
| total load lifted / tonnage | **"tổng khối lượng nâng"** | No | Hoang's term; kept distinct from volume ("khối lượng tạ"). | | Yes (Hoang) |
| progressive overload | **"quá tải lũy tiến"** | No | Hoang's term. Verb uses "progress" are phrased "duy trì / áp dụng quá tải lũy tiến"; "có / không có quá tải lũy tiến" for progressed vs constant load. | | Yes (Hoang) |
| double progression | **"lũy tiến kép"**, glossed **"lũy tiến kép (tăng rep trước, rồi tăng tạ)"** on first use | No | Hoang's term. | | Yes (Hoang) |
| load step / weight step | "bước tăng tạ" | No | Plain. | | |
| Hold (suggestion) / Next (suggestion) | "Giữ nguyên" / "Lần tới" | No | Matches the suggestion card. | | |
| prescription (sets × reps · RIR · rest) | **"Thông số của bạn"** (section label); never "đơn/chỉ định" | No | "Prescription" sounds medical in Vietnamese. | ⚠ | |
| bodyweight (load) | **"trọng lượng cơ thể"**; in tight cells: "Không tạ" | No | "Bodyweight × 10" → "Không tạ × 10" fits the cell. | ⚠ "tạ người" is common slang, check. | |

### Rest, timing, frequency

| English | Proposed Vietnamese | Keep EN? | Why (one line) | Unsure? | Hoang approved? |
|---|---|---|---|---|---|
| rest / rest between sets | "nghỉ", "nghỉ giữa các set" | No | Everyday. | | |
| rest timer | **"đồng hồ nghỉ"** | No | Short, clear; "bộ đếm giờ nghỉ" is longer. | | |
| frequency (per muscle) | "tần suất" → in UI "số buổi mỗi tuần cho mỗi nhóm cơ" | No | "Tần suất" alone is abstract; spell it out where space allows. | | |
| session / workout | **"buổi tập"** | No | One word for both avoids confusion. | | |
| deload / deload week | **"tuần deload (tuần giảm tải)"** | Keep + gloss | Many VN lifters say "deload"; gloss makes it clear it's an easy week, not stopping. | | |
| diminishing returns | "lợi ích giảm dần" | No | Plain; only in Why? copy. | | |
| dose-response (more sets help, each adds a bit less) | "càng nhiều set càng có lợi, nhưng mỗi set thêm có lợi ít hơn" | No | Explain, don't name. | | |

### Programming and splits

| English | Proposed Vietnamese | Keep EN? | Why (one line) | Unsure? | Hoang approved? |
|---|---|---|---|---|---|
| split (training split) | **"lịch tập"**; "split" kept in names | Yes, first use – "lịch tập (split)" | VN lifters say both; "lịch tập" is what a beginner understands. | | |
| plan | "kế hoạch" / "lịch tập của bạn" | No | "Plan" tab = "Kế hoạch". | | |
| Full Body | "Toàn thân (Full Body)" | Yes | Both forms are used. | | |
| Upper / Lower | "Thân trên / Thân dưới" | Yes | Literal and natural. | | |
| Push / Pull / Legs (PPL) | "PPL (Đẩy / Kéo / Chân)" | Keep (abbr.) + gloss | Abbreviation-first ORDER approved by Hoang (19:04); the gloss is still my proposal. "PPL" is widely known. | | |
| Hybrid (UL + PPL) | "UL + PPL (Kết hợp)" | Keep (abbr.) + gloss | Rewritten for the abbreviation-first rule (was "Kết hợp (UL + PPL)"). | ⚠ "UL + PPL (Kết hợp)" vs "Kết hợp UL + PPL" (no brackets) – which reads better as a split name? | |
| Bro split | "Bro split – mỗi ngày một nhóm cơ" | Keep + gloss | Known slang in VN gyms. | | |
| superset | **superset** – "tập 2 bài liền nhau, không nghỉ giữa" | Keep + gloss | Established loanword; no VN equivalent in common use. | | |
| compound exercise | "bài đa khớp (compound)" | Yes | Established VN term. | | |
| isolation exercise | "bài đơn khớp (isolation)" | Yes | Established VN term. | | |
| custom exercise | **"bài tập"** ("Tạo bài tập", "Bài tập mới", "Xóa bài tập"); the "Custom" tag stays "Tự tạo" | No | Hoang's term as he wrote it. Some sentences lose the "custom" meaning without a qualifier (custom.intro, you.resetBody, library.customCount, evidence title "Cách đánh giá bài tập"). | ⚠ Ambiguous with "exercise" (also "bài tập"); see the report list. | Yes (Hoang) |
| community splits | "lịch tập cộng đồng" | No | Plain. | | |
| sample data | "dữ liệu mẫu" | No | Plain. | | |
| swap (exercise) / best match | "đổi bài" / "phù hợp nhất" | No | Plain. | | |
| coaching notes | "lời khuyên" | No | Friendlier than "ghi chú huấn luyện". | ⚠ | |
| cues | "lưu ý kỹ thuật" | No | "Cue" has no everyday VN equivalent. | | |

### Muscle length and resistance profile

| English | Proposed Vietnamese | Keep EN? | Why (one line) | Unsure? | Hoang approved? |
|---|---|---|---|---|---|
| mechanical tension | **"sức căng cơ học"**; plain "sức căng" for "tension" | Yes – "sức căng cơ học (mechanical tension)" on first use in Why? | Hoang's term. | | Yes (Hoang) |
| lengthened position / stretch position | **"vị trí giãn cơ"** ("cơ dài nhất") | Yes, first use in Why? | "Giãn cơ" is everyday; avoids "vị trí kéo dài". | | |
| shortened position / squeeze | "vị trí co cơ" / "đoạn siết cơ" | No | "Siết cơ" is common gym talk for the squeeze. | | |
| lengthened partials | **"rep nửa biên độ giãn"** ("bắp chân nửa biên độ giãn" etc.) | No | Hoang's term. | | Yes (Hoang) |
| full range of motion (ROM) | "ROM (biên độ) đầy đủ"; later "ROM đầy đủ" / "hết biên độ" | Keep (abbr.) + gloss | Abbreviation-first ORDER approved by Hoang (19:04); the gloss "biên độ" is still my proposal. | | |
| resistance profile | **"sơ yếu kháng lực"** | Yes, in Why? only | Hoang's decision (19:01); the three labels "Nặng nhất ở …" still describe where the exercise is hardest. | | Yes (Hoang) |
| Hardest near the stretch / in the middle / near the squeeze | "Nặng nhất ở đoạn giãn cơ" / "Nặng nhất ở giữa biên độ" / "Nặng nhất ở đoạn siết cơ" | No | Mirrors the three English labels exactly. | | |
| range of motion | "biên độ chuyển động" | No | Established. | | |
| negative / eccentric (lowering phase) | "pha hạ tạ (negative)" | Yes | "Negative" is used in VN gyms; "ly tâm" is academic. | | |
| dead hang | "treo thả lỏng" | No | Descriptive. | | |
| hinge (movement) | "gập hông" | No | Plain. | | |

### Muscles (app's 14 + extras)

| English | Proposed Vietnamese | Keep EN? | Why (one line) | Unsure? | Hoang approved? |
|---|---|---|---|---|---|
| primary muscle (agonist) | **"cơ chủ vận"** | No | Hoang's term ("Cơ chủ vận" label, "Lọc theo cơ chủ vận"). | | Yes (Hoang) |
| secondary (helper) muscle | "cơ hỗ trợ" | No | Standard; "½ set" stays. | | |
| Chest | Ngực | No | Standard. | | |
| Front delts / Side delts / Rear delts | Vai trước / **Vai giữa** / Vai sau | No | Standard VN gym names. | ⚠ "vai giữa" vs "vai bên" | |
| Lats | Lưng xô | No | Standard gym term. | | |
| Upper back | Lưng trên | No | Plain. | | |
| Spinal erectors | Cơ dựng sống (lưng dưới) | No | Anatomical + plain gloss. | | |
| Biceps / Triceps | Tay trước / Tay sau | No | What VN lifters say ("bắp tay trước/sau" also fine). | | |
| Forearms | Cẳng tay | No | Standard. | | |
| Quads / Hamstrings | Đùi trước / Đùi sau | No | Standard. | | |
| Glutes | Mông | No | Standard. | | |
| Adductors | Đùi trong | No | Plain ("cơ khép" is anatomical). | | |
| Calves | Bắp chân | No | Standard. | | |
| Abs | **Cơ bụng** (muscle label and sentences) | No | Hoang's term. "Cơ bụng chân" (gastrocnemius), "Gập bụng", "Gồng bụng" are separate words and unchanged. | | Yes (Hoang) |

### Equipment and app UI words

| English | Proposed Vietnamese | Keep EN? | Why (one line) | Unsure? | Hoang approved? |
|---|---|---|---|---|---|
| barbell / dumbbell | tạ đòn / tạ đơn | No | Standard. | | |
| cable | **cáp** (no "puly"); pulley height is written "cáp đặt thấp / cáp đặt cao / cáp đặt ngang ngực" | No | Hoang's term. Exercise names now say "cáp" twice in places, e.g. "Dang tay cáp, cáp đặt thấp, cáp vắt trước người". | | Yes (Hoang) |
| machine / Smith machine | máy / máy Smith | No | Standard. | | |
| EZ bar | đòn EZ | No | Standard. | | |
| bench / pad | ghế / đệm | No | Standard. | | |
| Full gym / Dumbbells / Bodyweight (equipment setup) | Phòng gym đầy đủ / Tạ đơn / Không dụng cụ (tạ người) | No | Describes the setup, not the load. | | |
| Why? | **Tại sao?** | No | Short chip; "Vì sao?" also fine. | ⚠ "Tại sao?" vs "Vì sao?" | |
| evidence strength | "mức độ bằng chứng" | No | Plain. | | |
| research note | "ghi chú nghiên cứu" | No | Plain. | | |
| tick (a set) | "đánh dấu xong" | No | Matches the checkmark. | | |

### New in evidence pass (Why? sheets and citation details)

These terms first appear in the evidence translation (evidence.vi.json). All are **new in evidence pass**.

| English | Proposed Vietnamese | Keep EN? | Why (one line) | Unsure? | Hoang approved? |
|---|---|---|---|---|---|
| muscle growth / hypertrophy | "tăng cơ"; "phát triển" for a single muscle ("cơ đùi trước phát triển") | No | Everyday words; avoids the academic "phì đại cơ". New in evidence pass. | ⚠ "tăng cơ" vs "phát triển cơ" | |
| evidence grades Strong / Moderate / Limited / Weak / Theoretical | "Mạnh" / "Trung bình" / "Hạn chế" / "Yếu" / "Lý thuyết" | No | Short labels that match the English grades one to one. New in evidence pass. | | |
| meta-analysis / systematic review / narrative review | "phân tích tổng hợp" / "tổng quan hệ thống" / "bài tổng quan tường thuật" | No | Standard Vietnamese research terms. New in evidence pass. | | |
| meta-regression / network meta-analysis | "phân tích hồi quy tổng hợp" / "phân tích tổng hợp mạng lưới" | No | Follows the meta-analysis term. New in evidence pass. | ⚠ | |
| trial / randomised trial / crossover / within-subject | "thử nghiệm" / "thử nghiệm ngẫu nhiên" / "thiết kế bắt chéo" / "so sánh trên cùng người" | No | Plain; "so sánh trên cùng người" explains one-arm/one-leg designs. New in evidence pass. | | |
| trained / untrained (participants) | "người đã có kinh nghiệm tập" / "người chưa tập" | No | Plain, not "đã qua huấn luyện". New in evidence pass. | | |
| muscle thickness | "độ dày cơ" | No | Literal and clear. New in evidence pass. | | |
| CSA (cross-sectional area) | "CSA (tiết diện cơ)" on first use, then "tiết diện cơ" | Keep (abbr.) + gloss | Abbreviation-first rule. New in evidence pass. | | |
| lean mass / fat-free mass | "khối nạc" / "khối không mỡ" | No | Standard body-composition terms. New in evidence pass. | | |
| volume load | **"tổng khối lượng nâng"** (proposal) | No | Close to Hoang's tonnage term as he asked; volume load (sets × reps × load) is the same quantity as tonnage, so one term. New in evidence pass. | ⚠ Proposal: same words as tonnage; alternative "tổng khối lượng nâng (volume load)" on first use. | |
| velocity loss / bar velocity | "mức giảm tốc độ" / "tốc độ đòn" | No | Descriptive. New in evidence pass. | ⚠ | |
| autoregulation / autoregulated | "tự điều chỉnh (mức tạ)" | No | Describes what happens: load set by how the day feels. New in evidence pass. | ⚠ | |
| resistance curve | "đường kháng lực" | No | Matches "sơ yếu kháng lực". New in evidence pass. | ⚠ | |
| partial ROM / initial (lengthened) ROM | "ROM một phần" / "ROM một phần ở đoạn đầu (đoạn giãn)" | Keep (abbr.) | Abbreviation-first rule. New in evidence pass. | | |
| eccentric / isometric | "pha hạ tạ (eccentric)" / "tĩnh" (e.g. "lực tĩnh") | Yes, first use | Keeps the gym word "pha hạ tạ"; "ly tâm" is academic. New in evidence pass. | | |
| vastus lateralis / rectus femoris / vastus intermedius | "cơ đùi ngoài (vastus lateralis)" / "cơ thẳng đùi (rectus femoris)" / "cơ đùi giữa (vastus intermedius)" | Yes, first use | Plain name + Latin on first use. New in evidence pass. | | |
| gastrocnemius / soleus / gluteus maximus | "cơ bụng chân" / "cơ dép" / "cơ mông lớn" | No | Standard anatomy names. New in evidence pass. | | |
| elbow flexors / knee extensors | "cơ gập khuỷu" / "cơ duỗi gối" | No | Literal and clear. New in evidence pass. | | |
| proximal / distal (region) | "phần gần" / "phần xa" | No | Standard anatomy wording. New in evidence pass. | ⚠ | |
| not significant / effect size | "không có ý nghĩa (thống kê)" / "hệ số ảnh hưởng" | No | Standard Vietnamese statistics terms. New in evidence pass. | | |
| online ahead of print | "Đăng trực tuyến trước khi in." | No | Standard. New in evidence pass. | | |

## Exercise names – convention

Format: **English gym name** (as Vietnamese gyms use it), then a short Vietnamese description only where the name isn't self-explanatory, separated by " – ", e.g. "Bench Press tạ đòn – đẩy ngực ngang". Hoang: please say whether you'd rather have **English only** (shorter, matches what trainers say) or **Vietnamese only**. Setup details in brackets are translated (e.g. "(ghế ~45°, tay buông sau người)").

## Terms I'm least sure about

Hoang's 19:15 list settled hard set, failure, effort, volume, tonnage, progressive overload, double progression, custom exercise, mechanical tension, lengthened partials, primary muscle, abs, cable and the RPE gloss. Still open:

1. **Glosses for RIR, 1RM, ROM, PPL, UL** ("số rep còn dư", "mức tạ tối đa cho 1 rep", "biên độ", "Đẩy / Kéo / Chân", "Thân trên / Thân dưới"): only the abbreviation-first order is approved.
2. **volume load** → "tổng khối lượng nâng" (same as tonnage; proposal, ⚠).
3. **custom exercise = "bài tập"** in sentences where "custom" carries the meaning (see the ⚠ on that row).
4. **set vs hiệp** (app-wide choice).
5. **Evidence-pass terms** marked ⚠ above (hypertrophy wording, velocity loss, autoregulation, resistance curve "đường kháng lực").
6. **bodyweight** → "không tạ" vs "tạ người".
7. **Side delts** → "vai giữa" vs "vai bên".
