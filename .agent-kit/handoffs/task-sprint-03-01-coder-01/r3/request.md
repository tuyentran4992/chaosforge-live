# Coder revision r3 — reaction layout

- Task `task-sprint-03-01-code`, handoff `task-sprint-03-01-coder-01/r3`, supersedes r2; receiver `/root/coder`, sender lead-code, project `C:/Users/ADMIN/Desktop/Projects/hackathon`; PM owner app `current` (Antigravity), session `8d7a9c53-c1b2-439b-8d6d-b4bb52b67525`.
- Reviewer cũ đều đã finished/dừng đọc; baca `.agent-kit/handoffs/task-sprint-03-01-code-review-01/r2/result.md` và `.agent-kit/handoffs/task-sprint-03-01-ux-review-01/r2/result.md`, UX evidence tương ứng.
- Snapshot input `.agent-kit/memory/lead-code/refs/task-sprint-03-01-code/freeze-r2.md` và status/hashes trong coder r2 result. Kiểm snapshot và ghi/báo ack r3 trước khi sửa. Scope/quyền như coder r1/r2, bảo toàn mọi thay đổi.
- Sửa UX P2 còn mở: stage camera che reaction; nhiều reaction chồng lên nhau/khó đọc trên stage hoặc OBS. Bố trí/giới hạn hợp lý giữ fixed text, scale/fade 1,5s, collision và panic; giữ safe zone và các HUD. Tạo regression có ý nghĩa; tránh gây thêm áp lực render. Không tự thay đổi protocol: CR-02 phần arcade hit sang OBS vẫn pending PM quyết định.
- Test/đếm dòng, freeze, ghi result r3 với HEAD/status/diff SHA256 + hash từng untracked, checks, limits; báo lead-code và dừng ghi để hai reviewer cũ recheck. Không commit/push/deploy.
