# Biên bản Kiểm tra `r2` (`freeze-r6.md`) & Quyết định Chính sách PM cho `r3`

- **Ngày:** 2026-10-27
- **Người lập:** `pm` (Antigravity session `8ff3570f-a76a-4c25-a971-d6b9354b44c8`)
- **Task / Handoff:** `task-sprint-02-02-code` / `task-sprint-02-02-code-01` (`r2` → `r3`)
- **Codex Session IDs đã ghi nhận:**
  - **Primary Codex Session ID (`Session`):** `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2`
  - **Additional Codex Chat IDs (`Chats`):** `01a17d17-d86e-70b3-923a-7c4964624d75`, `01a17d17-ccf8-7fb3-8c1f-c72b3a568739`, `01a17cfe-7599-7d32-885d-bcbb2965b153`

## 1. Kiểm chứng Độc lập Snapshot `freeze-r6.md`

- `git rev-parse HEAD`: `5f7b2d31b6d765725b32745632e63d43e55d0b97` (khớp 100%).
- SHA-256 của `git diff HEAD` trên tracked scope tại thời điểm nhận `r2`: `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0` (khớp 100%).
- Đối chiếu độc lập 72 file sản phẩm untracked trong `.agent-kit/memory/coder/refs/task-sprint-02-02-code/evidence-r6.md`: **72/72 file khớp chính xác SHA-256**, toàn bộ 70 file code đều `≤ 236` dòng vật lý (đạt chuẩn `≤ 250` dòng của `CODE-STANDARDS.md`).
- Kết luận trạng thái `r2`: Giữ trạng thái **`partial` (`in-progress`)**, **chưa nghiệm thu** `us-006`, `us-007`, `us-008` và **chưa đóng/commit** `sprint-02` vì:
  1. Ba vấn đề chính sách sản phẩm/UX (P1 trong báo cáo `code-reviewer` `r5` và `ux-ui-reviewer` `r5`) cần quyết định chính thức của PM trong các nguồn chuẩn.
  2. Trên snapshot `r6`, lệnh cần quyền loopback bị auto-review từ chối do hết hạn mức nên `test/server.test.js`, khởi động server thực tế, trình duyệt/OBS, ma trận 9 viewport và đo độ trễ/60fps chưa được thực thi trên `r6`. Kết quả unit/mock (31/31) không thay thế kiểm thử tích hợp thực chạy.

## 2. Ba Quyết định Chính sách Chính thức của PM (Cập nhật vào `MISSION.md`, `DESIGN.md`, `TECHSTACK.md`, `ARCHITECT.md`, `SPRINT.md`, `us-006.md`, `us-007.md`, `us-008.md`)

### Quyết định 1: Phạm vi Ngôn ngữ/Ngữ nghĩa của Local Fallback & Xử lý Prompt Không Chắc Chắn (`us-007`)
1. **Phạm vi hỗ trợ:**
   - Khi cấu hình `OPENAI_API_KEY` + `COMPILER_ACCESS_TOKEN`, backend gọi OpenAI Structured Outputs (`json_schema` AST) để hiểu ngôn ngữ tự nhiên rộng.
   - Khi chạy ở chế độ **Local Fallback (`shared/synthesize.js`)**, phạm vi hỗ trợ được quy định tường minh là **bộ quy tắc từ khóa & mệnh đề hữu hạn** cho **tiếng Anh** (kèm nhóm từ khóa demo đa ngôn ngữ Việt/Tây Ban Nha/Trung: `duck/vịt/pato/鸭`, `boss/trùm`, `star/ngôi sao/星`, `ball/bóng`, `shield/khiên/escudo`, `laser/laze`, `float/zero gravity/no gravity/without gravity/không trọng lực`, `reverse/invert/upside down gravity/đảo ngược trọng lực/反重力/gravedad invertida`, `silent/no sound/không âm thanh`). Không yêu cầu hiểu mọi ngôn ngữ tự nhiên bất kỳ khi không có API key.
2. **Loại trừ mệnh đề phủ định cấp vế câu (Clause-Level Negation):**
   - Trước khi dò hiệu ứng dương tính, tách câu theo ranh giới mệnh đề (`[.;,!?]` hoặc các từ nối `but|however|yet|though|although|while|except|and|nhưng|mà`) và loại bỏ toàn bộ mệnh đề chứa từ phủ định/né tránh (`no`, `not`, `never`, `none`, `nothing`, `neither`, `nor`, `don't`, `do not`, `does not`, `doesn't`, `didn't`, `did not`, `won't`, `will not`, `can't`, `cannot`, `shouldn't`, `should not`, `wouldn't`, `would not`, `mustn't`, `must not`, `avoid`, `avoiding`, `prevent`, `preventing`, `stop`, `stopping`, `disable`, `forbid`, `ban`, `skip`, `exclude`, `without`, `against`, `refuse`, `instead of`, `rather than`, `không`, `đừng`, `chớ`, `tránh`, `ngăn`, `cấm`, `sin`, `evitar`, `不要`, `禁止`, `避免`; riêng cụm `no gravity` / `without gravity` / `gravity free` / `gravity off` / `không trọng lực` không đứng sau động từ phủ định khác vẫn mang nghĩa `zeroGravity = true`).
   - Đảm bảo `compile('avoid any effect with gravity upside down')`, `prevent reverse gravity`, `without upside down gravity` tuyệt đối không sinh trọng lực âm (`gravity > 0`).
3. **Tín hiệu `uncertain: boolean` & Safe Neutral Default:**
   - Khi prompt không khớp bất kỳ từ khóa cơ chế dương tính nào sau khi đã loại bỏ mệnh đề phủ định, `synthesize(prompt)` trả về AST mặc định trung tính an toàn (`gravity: 0.5`, `collision: 'bounce'`, `spawn_zone: 'edge_ring'`, `tags` chứa `'uncertain'`) và `compile(prompt)` trả thêm `uncertain: true`.
   - Khi `uncertain: true`, UI hiển thị rõ nhãn `LOCAL (DEFAULT)` trên `#telCompile` và `✓ AST SAFE · DEFAULT FALLBACK` trên chân khung Compiler (`[data-verified]`) để thông báo minh bạch cho streamer/giám khảo.

### Quyết định 2: Chính sách ToS Safety Guard 4 Lớp (`us-007`)
- Không tuyên bố bộ lọc từ khóa tĩnh (`shared/safety.js`) là hệ thống kiểm duyệt NLP đa ngôn ngữ toàn diện; thay vào đó chuẩn hóa **Kiến trúc An toàn Phát sóng 4 Lớp**:
  1. **Lớp 1 — Bộ lọc từ khóa & ký tự điều khiển (`shared/safety.js`):** Chạy trên prompt gốc trước mọi bước loại phủ định, tổng hợp local hay gọi OpenAI; phát hiện các từ khóa vi phạm bằng tiếng Anh + các từ mẫu đa ngôn ngữ (`bomba/bombe`, `giết người/khủng bố/tự tử`, `炸弹/杀人/恐怖主义`) và ký tự điều khiển/ẩn, chuyển ngay sang trạng thái `6. Blocked` → `RESCUE RUBBER DUCKS` (`duckfallback`).
  2. **Lớp 2 — Sàng lọc trước khi vào Poll (`round.addIdea`):** Kiểm tra `isUnsafePrompt(idea)` trước khi thêm ý tưởng `!forge` vào danh sách Poll công khai để từ ngữ bị chặn không xuất hiện trên bảng Poll OBS.
  3. **Lớp 3 — Closed-World AST Whitelist (`shared/ast-validate.js`):** Lớp phủ vật lý khi `Active Chaos` chỉ vẽ 4 hình mẫu cố định (`duck | ball | star | boss`) và phát 4 âm thanh synth (`quack | laser | pop | none`), hoàn toàn không hiển thị văn bản tự do hay tài nguyên bên ngoài từ prompt của người dùng.
  4. **Lớp 4 — Kiểm soát của Streamer:** Chế độ `MOD APPROVAL` (giữ bản vá ở `WAITING FOR MOD APPROVAL`) và phím `Space` Panic Clear `< 100ms`.

### Quyết định 3: Hiển thị Poll dài trên OBS (`340 × 352 px` — `us-006`, `us-008`)
- Giữ nguyên giới hạn đồng bộ `MAX_IDEA_LENGTH = 160` ký tự trong `shared/sync-contract.js`.
- Trong khung `.ov-poll` (`340 × 352 px`), **bỏ `-webkit-line-clamp: 2`** trên `.ov-idea__text` để không cắt cụt phần cuối của ý tưởng dài và không phụ thuộc vào hover `title` (vì khán giả xem video OBS không thể hover).
- Áp dụng cỡ chữ thích ứng theo độ dài ý tưởng (`data-len="sm|md|lg"` trên `.ov-idea__text`: cơ sở `16px` cho câu ngắn `≤ 48` ký tự; tự động thu gọn cỡ chữ/khoảng cách dòng và đệm `.ov-idea` cho câu `49–96` và `97–160` ký tự) sao cho **toàn bộ 160 ký tự của cả 3 lựa chọn đều hiển thị đầy đủ trên màn hình trong khung `340 × 352 px` (`scrollHeight <= clientHeight`)** để khán giả OBS phân biệt được cả 3 phương án ngay cả khi trùng tiền tố dài.
- Cập nhật dòng thông số trong `client/ui/overlay-view.js` thành `16 px base (auto-scales for long poll ideas)`.
