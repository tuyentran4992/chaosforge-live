# DESIGN — ChaosForge Live (`Codex Chaos Foundry`)

Trạng thái: **Đã chốt & Duyệt (Approved — `phase-02 / sprint-01` Done, cập nhật quy chuẩn 100% Tiếng Anh cho UI sản phẩm)**. Bộ thiết kế gốc (Source of Truth về bố cục, visual tokens & tương tác) nằm tại [`.agent-kit/specs/design-handoff/`](design-handoff/DESIGN-HANDOFF.md). Mục đích tổng thể tại [MISSION](MISSION.md); lộ trình tại [ROADMAP](ROADMAP.md).

## Hành vi và luồng dùng chung

### 1. Bộ File Thiết kế Chuẩn (Visual Contract — Screen-File-First)
- **Launcher & 3 Views (`/stage`, `/overlay`, `/deck`):** [design-handoff/index.html](design-handoff/index.html) (`SHA256: BC6084F527708B568E70A8D893F4B0CEB357E7CA264E3CC88A8474493758E954`) + [app.js](design-handoff/app.js) (`SHA256: 86585C23811A8DCE8E642A92E706218918D45428C92358DE5A8E783B5EEAD123`).
- **Standalone OBS Browser Source (`1920×1080` Transparent):** [design-handoff/overlay.html](design-handoff/overlay.html) (`SHA256: 2446E149EEF24A589AD2502C9DF406BCA6D1345A1DFACB39236105F722F8227A`) + [overlay.js](design-handoff/overlay.js) (`SHA256: 9DFFA4210EF428C8C94F3ABE20F4BC008E95A987B613247890BAEE76F3C965F4`).
- **Design System v1.0 & CSS Tokens:** [design-handoff/design-system.html](design-handoff/design-system.html) (`SHA256: 1E1F9A5E5EFB93987497419E941A06B6E666B0FDAB339A08E3769F13B8DA58DA`) + [styles.css](design-handoff/styles.css) (`SHA256: 4739351CFEE35444DEE4F9E6AD388060242314E5E841710180D6C91BD08056F6`).
- **Handoff & Manifest:** [DESIGN-HANDOFF.md](design-handoff/DESIGN-HANDOFF.md) + [DESIGN-MANIFEST.json](design-handoff/DESIGN-MANIFEST.json).

### 2. Quy hoạch Vùng An toàn OBS (`1920×1080` — Giữa 60% Trống)
- **Center 60% Safe Zone (`1152 × 648 px`):** Không thực thể nào sinh ra trong hình chữ nhật trung tâm; thực thể sinh ở vành ngoài (`edge_ring`), khi bay qua vùng tâm tự động giảm độ mờ còn `0.70` (`70%`).
- **Top-Right Poll (`340 × 352 px`, cách lề 28px):** Bảng *Live Chaos Poll* (Tím Twitch `--purple`, đếm ngược 15s, cập nhật 4Hz).
- **Bottom-Left Compiler (`420 × 272 px`, cách lề 28px):** Bảng *Codex Live Compiler* (Lục bảo `--green`, hiển thị JSON AST + huy hiệu `AST SAFE VERIFIED`).
- **Top-Center Boss + Combo (`600 × 176 px`, cách lề trên 24px):** Thanh máu Boss / thời gian hiệu lực (30–45s), tên `@Viewer` (*Chief Chaos Architect*) và thanh nhịp chat combo (Hổ phách `--amber`).

## Trạng thái và validation dùng chung (6 Trạng thái Vòng)

| # | Mã trạng thái | Nhãn hiển thị (English UI chuẩn) | Hành vi chuẩn bắt buộc |
| --- | --- | --- | --- |
| 1 | `idle` | **Idle · Ready** | Lớp phủ để trống hoàn toàn; bàn điều khiển sẵn sàng mở vòng bình chọn mới. |
| 2 | `voting` | **Voting · 15s** | Khung Poll góc trên phải đếm ngược 15s, hiển thị 3 phương án `!forge` dẫn đầu và tốc độ vote/giây. |
| 3 | `compiling` | **Compiling · <2.5s** | Khung *Codex Live Compiler* trượt lên ở góc dưới trái, hiển thị mã AST và nhãn xác thực không dùng `eval()`. |
| 4 | `active` | **Active Chaos · 30–45s** | Thực thể vật lý 2D / Boss vận hành 60fps trên Canvas, phản hồi lệnh chat/emote và tôn trọng vùng an toàn 60%. |
| 5 | `panic` | **Panic Clear · <100ms** | Phím `Space` hoặc nút `#panicBtn` xóa sạch toàn bộ thực thể trên Canvas + HUD và tắt SFX 8-bit dưới `< 100ms`. |
| 6 | `blocked` | **Blocked · Safe Fallback** | Bộ chặn ToS phát hiện prompt không an toàn, hiển thị cảnh báo đỏ và tự động chuyển sang bản vá an toàn *Rescue Rubber Ducks (`duckfallback`)*. |

## Khả năng sử dụng và accessibility

- **8 Token Màu Gốc (`styles.css`):** Void Slate `--bg: #060912`, Panel Ink `--panel: #0B111D`, Wire Line `--line: #26324D`, Twitch Violet `--purple: #9146FF → #C084FC`, Codex Emerald `--green: #10A37F → #34D399`, Hype Amber `--amber: #F59E0B → #FBBF24`, Safety Red `--red: #EF4444 → #F87171`, Signal White `--ink: #E9EEF8`, Telemetry Grey `--muted: #8B9BB6`.
- **Kiểu chữ & Hình khối:** Tiêu đề/HUD dùng `Space Grotesk`; mã AST/số liệu/log dùng `JetBrains Mono`. Không bo tròn thông thường (`--radius: 0px`), sử dụng đường cắt góc kỹ thuật (`--clip-panel: 16px cut`, `--clip-btn: 8px cut`).
- **Responsive Matrix:** Đảm bảo không tràn ngang (no horizontal scroll) trên toàn bộ 9 kích thước màn hình từ `360×800` đến `1920×1080` theo `DESIGN-MANIFEST.json`.

## Contracts hành vi cross-cutting

1. **100% Unified English UI Contract (Bắt buộc cho Ban Giám khảo Quốc tế):** Toàn bộ ngôn ngữ hiển thị trong ứng dụng sản phẩm (`index.html`, `overlay.html`, `design-system.html`, `app.js`, `overlay.js` — gồm thanh điều hướng `01 STAGE / 02 OVERLAY / 03 DECK / DS SYSTEM`, 6 trạng thái vòng, các nút bấm, HUD labels, 4 presets, tên Cartridge, tin nhắn chat giả lập và thông báo toast) **bắt buộc chuyển sang tiếng Anh chuẩn xác, đồng nhất 100%** (`lang="en"`), trong khi giữ nguyên 100% bố cục, CSS tokens và kích thước khung của bản Design Handoff.
2. **Preserving Visual Contract:** Giữ nguyên hệ thống CSS variables, đường cắt góc (`clip-path`), bố cục 3 chế độ xem (`#view-stage`, `#view-overlay`, `#view-deck`), trang riêng `overlay.html` và `design-system.html`.
3. **Zero-Eval AST Sandbox & <100ms Panic:** Không dùng `eval()`; phím `Space` (ngoài ô input) luôn kích hoạt `panic` dưới 100ms.
4. **Solo Judge Experience:** Nút `#hypeBtn` (*1-Click: Simulate 500 Twitch Viewers Hype*) và bàn gõ `#judgePrompt` + 4 nút preset (`duck`, `catBoss`, `shield`, `tug`) phải hoạt động tức thì mà không cần cấu hình phức tạp.

## Sprint thiết kế khi có UI

- Sprint thiết kế: [phase-02 / sprint-01](roadmap/phase-02/sprints/sprint-01/SPRINT.md) (`kind: design`) — **ĐÃ DUYỆT (`done`)**.
  - [us-003 — Thiết kế Transparent OBS Browser Source Overlay (`1920×1080`)](roadmap/phase-02/sprints/sprint-01/stories/us-003.md) (`accepted`)
  - [us-004 — Thiết kế Streamer Control Deck & 2-Streamer Versus Room](roadmap/phase-02/sprints/sprint-01/stories/us-004.md) (`accepted`)
  - [us-005 — Thiết kế Virtual OBS Demo Stage & 500-Viewer Crowd Simulator](roadmap/phase-02/sprints/sprint-01/stories/us-005.md) (`accepted`)
- Sprint `delivery` triển khai code: [phase-02 / sprint-02](roadmap/phase-02/sprints/sprint-02/SPRINT.md) (`kind: delivery`, domain: `code`).
