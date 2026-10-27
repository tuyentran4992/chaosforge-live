# Context — pm

Trạng thái:
- `phase-01 / sprint-01`: Đã hoàn tất (`done`, `closure pending`).
- `phase-02 / sprint-01` (`kind: design`): Đã hoàn tất nghiệm thu (`done`, `closure pending`). Bộ thiết kế do người dùng bàn giao đã được kiểm chứng và lưu tại `.agent-kit/specs/design-handoff/`, cả 3 story `us-003`, `us-004`, `us-005` đạt `accepted`.
- `phase-02 / sprint-02` (`kind: delivery`, domain: `code`): Đang mở (`in-progress`) với 3 User Stories: `us-006` (UI 3 bề mặt + Arcade + Physics Overlay + đồng bộ cửa sổ), `us-007` (OpenAI Codex Structured AST Compiler + ToS Guard + Cartridges), `us-008` (Twitch IRC/EventSub thật + 500-Viewer Simulator + Phòng Raid 2 Streamer).
Bước tiếp theo: Hỏi người dùng xác nhận gọi `lead-code` lập Technical Plan (`TECHSTACK.md`, `ARCHITECT.md`, chia module ≤250 dòng/file) và xuất prompt giao cho OpenAI Codex viết code (để lấy `Primary Codex Session ID` từ `/status`).
