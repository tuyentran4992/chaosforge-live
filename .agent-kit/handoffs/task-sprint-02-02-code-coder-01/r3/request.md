# Coder request — sửa findings revision r3

Tiếp tục duy nhất role `coder`, instance `/root/coder`; revision `r3` supersedes `r2` đã freeze. Cả hai reviewer đã `finished` và xác nhận dừng đọc nguồn. Không giao agent khác. Không commit/push/deploy/gửi ngoài/chi tiền.

## Định danh, snapshot, quyền

- Task `task-sprint-02-02-code`, handoff `task-sprint-02-02-code-coder-01/r3`; sender `lead-code` `/root`; PM owner Antigravity `8ff3570f-a76a-4c25-a971-d6b9354b44c8`; project `C:/Users/ADMIN/Desktop/Projects/hackathon`, phase-02 / sprint-02 / us-006, us-007, us-008.
- Input snapshot: `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/freeze-r2.md`, HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`, tracked scope diff SHA-256 `095d984e4390280d80e6786e9fd3e012c9e33e109e29f74f08658fea215a3bd0`; 47 untracked file hashes theo bảng evidence được trỏ từ freeze. Đối chiếu toàn bộ paths/hashes, scope/status và HEAD, ghi ack confirmed kèm instance trước sửa; lệch thì dừng báo lead.
- Input và quyền như `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r2/request.md`; đọc toàn bộ hai report `.agent-kit/handoffs/task-sprint-02-02-code-review-01/r1/result.md` và `.agent-kit/handoffs/task-sprint-02-02-ux-review-01/r1/result.md`, ảnh/evidence liên quan và specs/handoff gốc. Được ghi source/tests/config/assets ngoài `.agent-kit/`, memory coder và ack/result revision này; không ghi specs/handoff gốc/PM memory.

## Sửa và verify

Sửa toàn bộ 8 code findings và 6 UX findings trong hai report; trùng nhau xử lý theo cùng nguyên nhân. Cụ thể phải tách luồng điều khiển Studio/OBS với chỉ lệnh SEND sang rival, giữ OBS sync khi room đổi, hiển thị log gửi/nhận trung thực, timer/generation đúng, Twitch forge/votes và poll đếm ngược 4Hz; thực thi AST entity/gravity/collision/sfx và có artwork duck/boss/shield theo visual handoff, không chỉ chấm thay thế. Hoàn thiện Stage/Overlay/Deck và tám mục design-system đúng geometry, DOM/tokens/tương tác, chuyển English; sửa tab semantics và validation prompt. Guard xử lý các biến thể được báo và đầu vào bất thường, chỉ công bố phạm vi guard thực; bảo vệ endpoint tính phí khỏi truy cập/burst trái phép (bảo toàn yêu cầu kết nối 2 máy có cấu hình an toàn), không lộ key.

Tái kiểm toàn bộ stories và acceptance gốc, không coi danh sách findings là trần scope; bổ sung test có ý nghĩa chứng minh lỗi đã sửa, kiểm room isolation và explicit send, OBS late join/chuyển room, timer mới, guard và rate/access, AST runtime semantics, countdown, visual. Thực chạy app và test/browser, đo những chỉ tiêu có thể (latency, safe-zone opacity và spawn), ghi điều kiện/giới hạn trung thực; giữ từng codefile ≤250 dòng vật lý, không minify. Không gọi API/OpenAI hay Twitch thật nếu chưa có quyền thích hợp; mock phù hợp. Nếu không hoàn tất phải ghi cụ thể chưa làm, không tự đóng finding.

Freeze sau sửa, report từng finding, evidence/commands/kết quả, snapshot HEAD + tracked diff + status và SHA-256 từng file untracked, số dòng mỗi codefile, hạn chế và những gì chưa test. Sau report dừng ghi để chính hai reviewer cũ recheck. Trả signal lead sau ack và sau freeze.

- Ack `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r3/ack.md`.
- Result `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r3/result.md`.
- Evidence `.agent-kit/memory/coder/refs/task-sprint-02-02-code/`.

Prompt relay dự phòng: Tiếp tục `coder` instance `/root/coder`, đọc request này, kiểm snapshot/ghi ack, sửa cả hai report rồi freeze và báo lead.
