# UX/UI Reviewer request

Bạn giữ duy nhất role `ux-ui-reviewer` trong context mới. Không nhận lịch sử chat người giao, không tạo agent, không sửa nguồn. Đọc `AGENTS.md`, role card và những file role card chỉ định; thực thi HANDOFF và CODE.

- Task `task-sprint-02-02-code`; handoff `task-sprint-02-02-ux-review-01/r1`; sender `lead-code` Codex `/root`, recipient `ux-ui-reviewer` Codex context mới; PM owner Antigravity `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `C:/Users/ADMIN/Desktop/Projects/hackathon`.
- Phase `phase-02`, sprint `sprint-02`, stories `us-006`, `us-007`, `us-008`; đọc specs/design-handoff, sprint và stories theo parent `.agent-kit/handoffs/task-sprint-02-02-code-01/r2/request.md`.
- Snapshot chung với Code Reviewer: `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/freeze-r2.md`, HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`, tracked scope diff SHA-256 `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`, 47 untracked file paths/hash theo bảng evidence được trỏ từ freeze. Tự kiểm HEAD, diff và từng untracked hash/trọn cây; ghi ack kèm instance, snapshot trước review, lệch thì dừng.
- Được đọc: AGENTS, role/flow files, parent request, freeze/hash manifest, specs/story/design, source/test/config sản phẩm. Được ghi: memory `ux-ui-reviewer` của bạn và ack/result handoff này; không sửa source, specs hay các vùng khác. Không commit, push, gửi ra ngoài hay dùng API trả phí.
- Review độc lập bằng chạy ứng dụng thật và so sánh handoff: 3 hash views, OBS, design system, layout/tokens/artwork, controls, sáu trạng thái, 100% English, 9 viewport, keyboard/panic, simulator, compiler, room, accessibility. Chỉ xác nhận những gì thực xem/đo; ghi rõ điều kiện và phần chưa xem. Findings có severity, màn hình/flow, bước tái hiện, expected/actual, tác động và evidence. Không dựa vào coder hay reviewer khác; không xem build pass là visual pass.
- Trả report `finished` hoặc `stopped`, coverage và phần chưa xem; nếu không chạy/xem được thì partial/blocked, không N/A. Nếu source đổi trong review, ngừng kết luận bị ảnh hưởng và báo lead. Chạy song song Code Reviewer trên cùng snapshot.
- Ack `.agent-kit/handoffs/task-sprint-02-02-ux-review-01/r1/ack.md`; result `.agent-kit/handoffs/task-sprint-02-02-ux-review-01/r1/result.md`; evidence `.agent-kit/memory/ux-ui-reviewer/refs/task-sprint-02-02-code/`. Gửi lead tín hiệu ack và sau report.

Prompt relay dự phòng: Bạn là `ux-ui-reviewer` context mới tại project trên, đọc và thực thi request này, kiểm snapshot và ghi ack trước review độc lập.
