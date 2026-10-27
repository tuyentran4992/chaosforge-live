# Request bàn giao — điền đủ trước khi gửi

Bạn giữ duy nhất role **`lead-code`** (điều phối thiết kế UI/prototype cho Sprint `design` thông qua `coder` và `ux-ui-reviewer`, hoặc thực thi vai trò Design Agent theo chỉ định của người dùng) trong task này, với context mới. Bạn không nhận lịch sử chat của người giao. Request này không cấp thêm quyền ngoài quyền người dùng đã cho.

Đọc [AGENTS.md](c:/Users/ADMIN/Desktop/Projects/hackathon/AGENTS.md), role card của bạn, rồi làm theo [HANDOFF](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/core/HANDOFF.md).

## Định danh

- Task-id: `task-sprint-02-01-design`. Handoff-id: `task-sprint-02-01-design`. Revision: `1` (`r1`). Supersedes: `none`.
- Người gửi: `pm`, app: `current`. Người nhận: `lead-code` (hoặc Design Agent được người dùng giao trực tiếp), app: `current` / phiên mới.
- PM owner: app `current`, session `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `c:/Users/ADMIN/Desktop/Projects/hackathon`.
- Phase / sprint / story:
  - Phase: `phase-02` (`.agent-kit/specs/roadmap/phase-02/PHASE.md`)
  - Sprint: `sprint-01` (`kind: design` — `.agent-kit/specs/roadmap/phase-02/sprints/sprint-01/SPRINT.md`)
  - Stories:
    - `us-003` (`.agent-kit/specs/roadmap/phase-02/sprints/sprint-01/stories/us-003.md`)
    - `us-004` (`.agent-kit/specs/roadmap/phase-02/sprints/sprint-01/stories/us-004.md`)
    - `us-005` (`.agent-kit/specs/roadmap/phase-02/sprints/sprint-01/stories/us-005.md`)

## Project và snapshot

- Project root: `c:/Users/ADMIN/Desktop/Projects/hackathon`. Repo: không có Git (`.git` chưa khởi tạo).
- Snapshot (SHA256 của các file nguồn trong scope):
  - `.agent-kit/specs/MISSION.md`: `B8B3C280EE4925BA75FEE726F2D04EF7E37B8ADCE9D028F08C0576E99DDC690C`
  - `.agent-kit/specs/DESIGN.md`: `0B7D63EE737A8A016399A3829E9AE4B28860D54B4A1992619A5E68832A5EE33E`
  - `.agent-kit/specs/roadmap/phase-02/sprints/sprint-01/SPRINT.md`: `7FFE7F789EF75A73ECADA2A3ED974F58DE8FC7E079FD2F3E0E6B8CA5FB4F3513`
  - `.agent-kit/specs/roadmap/phase-02/sprints/sprint-01/stories/us-003.md`: `DF23AFF42D80925A10B6910E4582A206BD2F8CC5CD7E0D3E5C09BFF107888AC5A`
  - `.agent-kit/specs/roadmap/phase-02/sprints/sprint-01/stories/us-004.md`: `F0A00166CE9F679F037D63EEB62B47BE163986A3FD6050FD7E382F8F86211368`
  - `.agent-kit/specs/roadmap/phase-02/sprints/sprint-01/stories/us-005.md`: `5D2075ABAB14C1D8F9409B4EC3FC5A60AB92B1DCF8B4404877710389F82DA1E8`
- Thay đổi của người dùng đang có (ngoài scope, phải giữ nguyên): Toàn bộ `.agent-kit/specs/MISSION.md`, `.agent-kit/specs/ROADMAP.md`, `.agent-kit/specs/backlog/`, `.agent-kit/user/`.
- Được đọc: `.agent-kit/specs/MISSION.md`, `.agent-kit/specs/DESIGN.md`, `.agent-kit/specs/roadmap/phase-02/`, `.agent-kit/user/dashboard/design-preview.html`.
- Được ghi: `.agent-kit/handoffs/task-sprint-02-01-design/r1/ack.md`, `.agent-kit/handoffs/task-sprint-02-01-design/r1/result.md`, `.agent-kit/memory/lead-code/`, và thư mục lưu design artifacts/prototype (ví dụ `design/` hoặc cập nhật chi tiết vào `.agent-kit/specs/DESIGN.md` nếu được giao).

## Việc cần làm

- Mục tiêu: Thiết kế hoàn chỉnh bộ High-Fidelity UI/UX Mockup / Interactive Prototype chuẩn Esports Broadcast (`Neon Cyber-Forge`) cho 3 bề mặt tương tác của **`Codex Chaos Foundry` (`ChaosForge Live`)** phục vụ cuộc thi **Codex x TwitchCon Hackathon**:
  1. **`us-003` — `/overlay` (Transparent OBS Browser Source Overlay `1920x1080`, 60fps):** Giữ trống `60%` vùng tâm màn hình (`Safe Zones`), bảng *Live Chaos Poll 15s* (Top-Right), cửa sổ *Codex Live Compiler Terminal* kèm nhãn `AST SAFE VERIFIED` (Bottom-Left), thanh máu Boss & vinh danh `@ViewerName` (Top-Center).
  2. **`us-004` — `/deck` (Streamer Control Deck & 2-Streamer Versus Room):** Nút khẩn cấp **`[SPACEBAR — PANIC CLEAR OVERLAY (<100ms)]`**, công tắc Auto/1-Click Approve, thanh trượt giới hạn thực thể (`Max Entities: 15-50`), kho thẻ bài *Saved Chaos Cartridges* và phòng đấu *2-Streamer Versus / Raid Room* (mã phòng 4 ký tự).
  3. **`us-005` — `/stage` (Virtual OBS Demo Stage cho Giám khảo & Sân khấu TwitchCon San Diego):** Giao diện Split-Screen kết hợp *Built-in Streamer Mini-Game Arcade* + lớp `/overlay` + khung *Twitch Chat & 500-Viewer Crowd Simulator* (`[🔥 1-CLICK: SIMULATE 500 TWITCH VIEWERS HYPE]`) + ô nhập **Judge Live Prompt** + hiển thị minh chứng `Codex Session ID`.
- Scope và ngoài scope: Chỉ thiết kế UI/UX, Design System (tokens màu sắc, typography, spacing, animations) và Interactive Prototype / Wireframes cho `phase-02 / sprint-01` (`kind: design`); chưa viết backend hay logic production của `sprint-02`.
- Acceptance: Đạt toàn bộ tiêu chí nghiệm thu quan sát được trong `us-003.md`, `us-004.md`, `us-005.md` và `DESIGN.md`.
- Plan kỹ thuật: Chưa áp dụng (Sprint `design`).
- Checks và evidence cần trả: Đường dẫn tới bộ file thiết kế / prototype chạy thử được trên trình duyệt, ảnh chụp/mô tả đầy đủ 6 trạng thái (`idle`, `voting`, `compiling`, `active`, `panic-cleared`, `unsafe-blocked`), và báo cáo kiểm tra UX/UI.
- Quyền và giới hạn: Không sửa `MISSION.md` hay `ROADMAP.md`. Không commit, push hay gửi ra ngoài nếu chưa được cấp quyền.

## Nơi ghi kết quả

- Request (chỉ đọc): `.agent-kit/handoffs/task-sprint-02-01-design/r1/request.md`
- Ack (bạn ghi): `.agent-kit/handoffs/task-sprint-02-01-design/r1/ack.md`
- Result (bạn ghi, theo [mẫu](c:/Users/ADMIN/Desktop/Projects/hackathon/.agent-kit/templates/handoff-result.md)): `.agent-kit/handoffs/task-sprint-02-01-design/r1/result.md`
- Evidence: `.agent-kit/memory/lead-code/refs/task-sprint-02-01-design/`
