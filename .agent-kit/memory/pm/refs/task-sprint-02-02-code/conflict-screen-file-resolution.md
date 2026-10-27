# Giải quyết mâu thuẫn — screen-file policy (task-sprint-02-02-code)

- Nguồn báo cáo: `lead-code` tại `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/conflict-screen-file.md`.
- Nội dung mâu thuẫn:
  - Nguồn A (`SPRINT.md`, `DESIGN.md`, `us-006.md`) yêu cầu `index.html` tích hợp 3 chế độ xem chuyển qua hash route (`#/stage`, `#/overlay`, `#/deck`) cùng với 2 file riêng `overlay.html` và `design-system.html` (khớp với DOM thực tế trong `.agent-kit/specs/design-handoff/index.html`).
  - Nguồn B (`.agent-kit/specs/design-handoff/DESIGN-MANIFEST.json` và `DESIGN-HANDOFF.md`) có đoạn văn bản boilerplate tự sinh lúc export ghi `index.html` chỉ là `launcher-overview` và không được dùng làm combined UI.
- Quyết định phân xử của PM (`pm` — sở hữu `DESIGN.md`, `SPRINT.md`, `us-006.md` và `.agent-kit/specs/design-handoff/`):
  1. Bãi bỏ (`supersede`) đoạn văn bản boilerplate *"launcher-overview only"* trong `DESIGN-MANIFEST.json` và `DESIGN-HANDOFF.md`, cập nhật cả 2 file này khớp 100% với `DESIGN.md` và `us-006.md`.
  2. Chốt cấu trúc Entry/Route chuẩn duy nhất:
     - `index.html`: Ứng dụng Studio chính tích hợp `topbar`, `statebar` và 3 chế độ xem chuyển qua hash route (`#/stage` → `#view-stage`, `#/overlay` → `#view-overlay`, `#/deck` → `#view-deck`).
     - `overlay.html`: Trang nguồn OBS Browser Source trong suốt độc lập (`1920×1080`).
     - `design-system.html`: Trang tài liệu Design System v1.0 độc lập.
  3. Để tuân thủ giới hạn **≤ 250 dòng vật lý / file** trong `CODE-STANDARDS.md`, cho phép tách CSS thành `client/styles/*.css` và mount/render các view hoặc section lớn qua ES modules trong `client/ui/*.js` miễn là DOM sau khi render giữ đúng IDs, classes, tokens và bố cục thị giác.
- Trạng thái: Đã cập nhật đồng bộ tất cả các file nguồn chuẩn và phát hành handoff revision `r2` (`.agent-kit/handoffs/task-sprint-02-02-code-01/r2/request.md`).
