# Mâu thuẫn tài liệu — screen-file policy

- Người phát hiện: `lead-code`, task `task-sprint-02-02-code`, handoff `task-sprint-02-02-code-01/r1`.
- PM owner: Antigravity session `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `C:/Users/ADMIN/Desktop/Projects/hackathon`; coordinator: PM owner.
- Nguồn A: `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/SPRINT.md`, mục Acceptance tích hợp riêng, tại HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`: yêu cầu ba chế độ trong `index.html` (`#/stage`, `#/overlay`, `#/deck`). `DESIGN.md` cũng chỉ định ba `#view-*`.
- Nguồn B: `.agent-kit/specs/design-handoff/DESIGN-MANIFEST.json`, `screens` và `screenFilePolicy.rules`, cùng HEAD: `index.html` là launcher/overview only và không được dùng làm combined final UI khi có nhiều HTML screens. `DESIGN-HANDOFF.md`, CJX-ready UX contract, cũng nêu launcher chỉ là overview.
- Bất đồng: acceptance tích hợp yêu cầu ba view nằm trong `index.html`, trong khi visual contract được dẫn chiếu cấm dùng `index.html` làm combined final UI. Prototype gốc thực tế cũng chứa ba `#view-*` trong index; không tự chọn một nguồn để bỏ qua.
- Tác động: cấu trúc entry/route và kiểm visual của `us-006` cùng acceptance tích hợp. Dừng quyết định và triển khai phần bị ảnh hưởng; các module độc lập có thể chuẩn bị theo boundaries tạm thời.
- Điểm cần PM quyết định: làm rõ và sửa các nguồn chuẩn cho nhất quán, xác nhận cấu trúc entry/route và gửi revision nếu ảnh hưởng request/snapshot.
- Evidence: input scope sạch, diff SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`, HEAD như trên. Không sửa nguồn thiết kế gốc.
- Thông báo PM: `pending PM relay` — không có route được xác minh tới phiên Antigravity owner. Thông báo người dùng: đã nêu trong cập nhật của phiên lead-code; PM chưa xác nhận nhận.
- Resolution/revalidation: `resolved` trong revision `r2`. PM owner ghi `.agent-kit/memory/pm/refs/task-sprint-02-02-code/conflict-screen-file-resolution.md`; lead kiểm `DESIGN.md`, `DESIGN-HANDOFF.md`, `DESIGN-MANIFEST.json`, `us-006.md`, `TECHSTACK.md`, `ARCHITECT.md` và sprint: đều quy định index có 3 hash views cùng hai entry độc lập. Snapshot và hash xác nhận tại `.agent-kit/handoffs/task-sprint-02-02-code-01/r2/ack.md`.

## Prompt PM owner

Bạn là PM owner tại Antigravity session `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `C:/Users/ADMIN/Desktop/Projects/hackathon`. Trong `task-sprint-02-02-code`, hãy đọc `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/conflict-screen-file.md`: sprint acceptance yêu cầu ba view trong `index.html`, còn design manifest và handoff yêu cầu `index.html` chỉ làm launcher. Hãy báo người dùng, quyết định cấu trúc, cập nhật các nguồn chuẩn cho nhất quán và gửi revision/snapshot cần thiết cho lead-code. Không coi im lặng là chấp thuận.
