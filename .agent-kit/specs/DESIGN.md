# DESIGN — ChaosForge Live (`Codex Chaos Foundry`)

Trạng thái: **Đã chốt & Duyệt (Approved — Đã cập nhật Quyết định PM `r3` về Local Fallback Semantics/Uncertainty, Chính sách ToS Safety Guard 4 lớp, và Hiển thị Poll dài trên OBS)**. Bộ thiết kế gốc nằm tại [`.agent-kit/specs/design-handoff/`](design-handoff/DESIGN-HANDOFF.md). Mục đích tổng thể tại [MISSION](MISSION.md); lộ trình tại [ROADMAP](ROADMAP.md).

## Hành vi và luồng dùng chung

### 1. Kiến trúc 3 HTML Entries & Hash Routes Chuẩn (Đã chuẩn hóa — Supersedes boilerplate cũ)
1. **`index.html` — Main Studio Web App (3 Hash Views):** Chứa thanh điều hướng trên cùng (`topbar`), thanh 6 trạng thái vòng (`statebar`) và 3 chế độ xem chuyển đổi qua hash route:
   - `#/stage` (mặc định) → `#view-stage` (Virtual OBS Demo Stage + Built-in Arcade + 500-Viewer Crowd Simulator + Judge Live Prompt)
   - `#/overlay` → `#view-overlay` (Bản xem trước OBS Overlay + hướng dẫn cài đặt & thông số vùng an toàn)
   - `#/deck` → `#view-deck` (Streamer Control Deck + Panic Clear + Live Round Queue + 2-Streamer Raid Room + Saved Cartridges)
2. **`overlay.html` — Standalone Transparent OBS Browser Source (`1920×1080`):** Trang nguồn trình duyệt độc lập nền trong suốt (`transparent`) không có viền trang, đồng bộ thời gian thực với `index.html`.
3. **`design-system.html` — Standalone Design System v1.0 Reference:** Trang tài liệu tiêu chuẩn thị giác và thành phần UI.

*(Lưu ý thực thi theo `CODE-STANDARDS.md`: Để đảm bảo mọi file `.html`, `.css`, `.js` của sản phẩm đều **≤ 250 dòng vật lý**, cho phép tách `styles.css` thành nhiều file CSS theo module trong `client/styles/*.css` và tách phần dựng DOM của các view/section lớn thành các ES modules trong `client/ui/*.js`, miễn là cấu trúc DOM sau khi render, các `id`/`class`/`data-*`, CSS tokens và bố cục thị giác khớp với bản gốc trong `.agent-kit/specs/design-handoff/`).*

### 2. Quy hoạch Vùng An toàn OBS (`1920×1080` — Giữa 60% Trống)
- **Center 60% Safe Zone (`1152 × 648 px`, tọa độ `[384, 1536] × [216, 864]`):** Không thực thể nào sinh ra trong hình chữ nhật trung tâm; thực thể sinh ở vành ngoài (`edge_ring`), khi bay qua vùng tâm tự động giảm độ mờ còn `0.70` (`70%`).
- **Top-Right Poll (`340 × 352 px`, cách lề 28px):** Bảng *Live Chaos Poll* (Tím Twitch `--purple`, đếm ngược 15s, cập nhật 4Hz).
  - **Quy chuẩn hiển thị Poll dài cho khán giả OBS (Quyết định PM `r3`):** Giữ nguyên giới hạn đồng bộ `MAX_IDEA_LENGTH = 160` ký tự, nhưng **bỏ `-webkit-line-clamp: 2`** trên `.ov-idea__text` để không cắt cụt phần đuôi phân biệt ý tưởng hay phụ thuộc vào hover `title` (vì khán giả xem luồng video OBS không thể hover). Sử dụng cỡ chữ thích ứng theo độ dài ý tưởng (`data-len="sm|md|lg"`: cơ sở `16px` cho ý tưởng ngắn `≤ 48` ký tự; tự động thu gọn cỡ chữ/khoảng cách dòng cho ý tưởng `49–96` và `97–160` ký tự) kết hợp bố cục `.ov-poll` gọn trong khung `340 × 352 px` sao cho toàn bộ nội dung của cả 3 phương án hiển thị đầy đủ trên màn hình mà không tràn khung (`scrollHeight <= clientHeight`). Trong bảng thông số tại `#view-overlay` (`client/ui/overlay-view.js`), dòng thông số chữ HUD ghi rõ `16 px base (auto-scales for long poll ideas)`.
- **Bottom-Left Compiler (`420 × 272 px`, cách lề 28px):** Bảng *Codex Live Compiler* (Lục bảo `--green`, hiển thị JSON AST + huy hiệu `AST SAFE VERIFIED`, hoặc `✓ AST SAFE · DEFAULT FALLBACK` khi local synthesizer xử lý câu nhập không chắc chắn/ngoài từ điển).
- **Top-Center Boss + Combo (`600 × 176 px`, cách lề trên 24px):** Thanh máu Boss / thời gian hiệu lực (30–45s), tên `@Viewer` (*Chief Chaos Architect*) và thanh nhịp chat combo (Hổ phách `--amber`).

## Trạng thái và validation dùng chung (6 Trạng thái Vòng)

| # | Mã trạng thái | Nhãn hiển thị (English UI chuẩn) | Hành vi chuẩn bắt buộc |
| --- | --- | --- | --- |
| 1 | `idle` | **Idle · Ready** | Lớp phủ để trống hoàn toàn; bàn điều khiển sẵn sàng mở vòng bình chọn mới. |
| 2 | `voting` | **Voting · 15s** | Khung Poll góc trên phải đếm ngược 15s, hiển thị đầy đủ văn bản 3 phương án `!forge` (tự co cỡ chữ nếu dài tới 160 ký tự, không cắt dòng bằng line-clamp) và chỉ nhận các ý tưởng đã qua kiểm tra `isUnsafePrompt`. |
| 3 | `compiling` | **Compiling · <2.5s** | Khung *Codex Live Compiler* trượt lên ở góc dưới trái, hiển thị mã AST và nhãn xác thực không dùng `eval()`. |
| 4 | `active` | **Active Chaos · 30–45s** | Thực thể vật lý 2D / Boss vận hành 60fps trên Canvas, phản hồi lệnh chat/emote và tôn trọng vùng an toàn 60%. Nếu chạy bằng local fallback cho prompt không chắc chắn (`uncertain: true`), hiển thị rõ nhãn `LOCAL (DEFAULT)` / `✓ AST SAFE · DEFAULT FALLBACK`. |
| 5 | `panic` | **Panic Clear · <100ms** | Phím `Space` hoặc nút `#panicBtn` xóa sạch toàn bộ thực thể trên Canvas + HUD và tắt SFX 8-bit dưới `< 100ms`. |
| 6 | `blocked` | **Blocked · Safe Fallback** | Bộ chặn ToS phát hiện prompt không an toàn, hiển thị cảnh báo đỏ và tự động chuyển sang bản vá an toàn *Rescue Rubber Ducks (`duckfallback`)*. |

## Khả năng sử dụng và accessibility

- **8 Token Màu Gốc (`styles.css`):** Void Slate `--bg: #060912`, Panel Ink `--panel: #0B111D`, Wire Line `--line: #26324D`, Twitch Violet `--purple: #9146FF → #C084FC`, Codex Emerald `--green: #10A37F → #34D399`, Hype Amber `--amber: #F59E0B → #FBBF24`, Safety Red `--red: #EF4444 → #F87171`, Signal White `--ink: #E9EEF8`, Telemetry Grey `--muted: #8B9BB6`.
- **Kiểu chữ & Hình khối:** Tiêu đề/HUD dùng `Space Grotesk`; mã AST/số liệu/log dùng `JetBrains Mono`. Không bo tròn thông thường (`--radius: 0px`), sử dụng đường cắt góc kỹ thuật (`--clip-panel: 16px cut`, `--clip-btn: 8px cut`).
- **Responsive Matrix:** Đảm bảo không tràn ngang (no horizontal scroll) trên toàn bộ 9 kích thước màn hình từ `360×800` đến `1920×1080` theo `DESIGN-MANIFEST.json`.

## Contracts hành vi cross-cutting

1. **100% Unified English UI Contract:** Toàn bộ ngôn ngữ hiển thị trong ứng dụng sản phẩm (`index.html`, `overlay.html`, `design-system.html` và các module JS) bắt buộc sử dụng tiếng Anh chuẩn xác, đồng nhất 100% (`lang="en"`).
2. **Preserving Visual Contract & Modular ≤250-Line Compliance:** Giữ nguyên hệ thống CSS variables, đường cắt góc (`clip-path`), bố cục 3 chế độ xem (`#view-stage`, `#view-overlay`, `#view-deck`) trong `index.html`, trang riêng `overlay.html` và `design-system.html`; tách module CSS/JS/DOM hợp lý để mọi file code sản phẩm đều ≤ 250 dòng vật lý.
3. **Phạm vi Ngôn ngữ/Ngữ nghĩa của Local Fallback & Xử lý Prompt Không Chắc Chắn (Quyết định PM `r3`):**
   - Khi có `OPENAI_API_KEY` + `COMPILER_ACCESS_TOKEN`, backend gọi OpenAI Structured Outputs (`json_schema` AST) để xử lý ngôn ngữ tự nhiên rộng.
   - Khi chạy ở chế độ **Local Fallback** (`shared/synthesize.js`), phạm vi hỗ trợ được định nghĩa tường minh là **bộ quy tắc từ khóa & mệnh đề hữu hạn** cho **tiếng Anh** (kèm nhóm từ khóa demo đa ngôn ngữ Việt/Tây Ban Nha/Trung đã liệt kê).
   - **Loại trừ mệnh đề phủ định (Clause-Level Negation):** Trước khi dò hiệu ứng dương tính, phải tách câu theo ranh giới mệnh đề (`[.;,!?]` hoặc từ nối `but|however|yet|though|although|while|except|and|nhưng|mà`) và loại bỏ/vô hiệu hóa mọi mệnh đề chứa từ phủ định/né tránh (`no`, `not`, `never`, `none`, `nothing`, `neither`, `nor`, `don't`, `do not`, `does not`, `doesn't`, `didn't`, `did not`, `won't`, `will not`, `can't`, `cannot`, `shouldn't`, `should not`, `wouldn't`, `would not`, `mustn't`, `must not`, `avoid`, `avoiding`, `prevent`, `preventing`, `stop`, `stopping`, `disable`, `forbid`, `ban`, `skip`, `exclude`, `without`, `against`, `refuse`, `instead of`, `rather than`, `không`, `đừng`, `chớ`, `tránh`, `ngăn`, `cấm`, `sin`, `evitar`, `不要`, `禁止`, `避免`; riêng cụm `no gravity` / `without gravity` / `gravity free` / `gravity off` / `không trọng lực` không đi sau động từ phủ định khác vẫn mang nghĩa `zeroGravity = true`). Nhờ đó các câu như `avoid any effect with gravity upside down`, `prevent reverse gravity`, `without upside down gravity` tuyệt đối không bao giờ sinh trọng lực âm (`gravity` luôn `> 0`).
   - **Tín hiệu `uncertain` & Safe Neutral Default:** Nếu sau khi loại mệnh đề phủ định mà không khớp bất kỳ từ khóa cơ chế dương tính nào trong từ điển local, `synthesize(prompt)` trả về cấu hình mặc định trung tính an toàn (`entity: 'star'` hoặc theo hash dương tính, `gravity: 0.5`, `collision: 'bounce'`, `spawn_zone: 'edge_ring'`, `sfx: 'pop'`, `duration: 30`, `tags` có chứa `'uncertain'`) và `compile()` trả thêm `uncertain: true`. Khi `uncertain: true`, UI hiển thị rõ trạng thái fallback mặc định (`#telCompile` hiện `LOCAL (DEFAULT)`, chân khung Compiler `[data-verified]` hiện `✓ AST SAFE · DEFAULT FALLBACK`) để người dùng/giám khảo biết rõ giới hạn từ điển local.
4. **Chính sách ToS Safety Guard 4 Lớp (Quyết định PM `r3`):**
   - Không tuyên bố bộ lọc regex tĩnh là hệ thống kiểm duyệt NLP toàn cầu; thay vào đó an toàn phát sóng được đảm bảo bằng 4 lớp: (1) Bộ lọc từ khóa & ký tự điều khiển tĩnh (`shared/safety.js`) chạy trên prompt gốc trước mọi bước xử lý khác, chuyển thẳng sang `6. Blocked` → `RESCUE RUBBER DUCKS` (`duckfallback`); (2) Sàng lọc `!forge` đầu vào bằng `isUnsafePrompt` trước khi đưa vào danh sách Poll công khai trên OBS (`round.addIdea`); (3) **Closed-World AST Whitelist (`shared/ast-validate.js`):** Lớp phủ vật lý chỉ vẽ 4 thực thể hình học/sprite cố định (`duck | ball | star | boss`) và 4 âm thanh synth, tuyệt đối không render văn bản tự do hay tài nguyên bên ngoài từ prompt lên màn hình Active Chaos; (4) Chế độ `MOD APPROVAL` và phím `Space` Panic Clear `< 100ms`.

## Sprint thiết kế khi có UI

- Sprint thiết kế: [phase-02 / sprint-01](roadmap/phase-02/sprints/sprint-01/SPRINT.md) (`kind: design`) — **ĐÃ DUYỆT (`done`)**.
  - [us-003 — Thiết kế Transparent OBS Browser Source Overlay (`1920×1080`)](roadmap/phase-02/sprints/sprint-01/stories/us-003.md) (`accepted`)
  - [us-004 — Thiết kế Streamer Control Deck & 2-Streamer Versus Room](roadmap/phase-02/sprints/sprint-01/stories/us-004.md) (`accepted`)
  - [us-005 — Thiết kế Virtual OBS Demo Stage & 500-Viewer Crowd Simulator](roadmap/phase-02/sprints/sprint-01/stories/us-005.md) (`accepted`)
- Sprint `delivery` triển khai code: [phase-02 / sprint-02](roadmap/phase-02/sprints/sprint-02/SPRINT.md) (`kind: delivery`, domain: `code`).
