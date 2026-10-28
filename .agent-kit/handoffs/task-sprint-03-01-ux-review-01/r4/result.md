# UX/UI recheck r4 — us-009

- Task `task-sprint-03-01-code`; handoff `task-sprint-03-01-ux-review-01/r4`; reviewer `/root/ux_reviewer`.
- Trạng thái đọc `finished` (đã dừng đọc); coverage `partial`. Bố cục trong mẫu xem không tái hiện lỗi cũ; hành vi gộp burst cần PM quyết, không tự chấp nhận.
- Snapshot đầu/cuối khớp freeze-r4: HEAD `5ad45d22fe9a0ee98f318e6d151322e9d086ade4`, status scope 15 modified + 5 untracked, SHA256 byte diff `165655e3a792e6ad45489d0e7b362c48b08a3a1543c50d5e9f23d52e4e4391c7`; cả năm hash untracked khớp ack r4, gồm `reactions.js` `f5a8cf514424f229bec092563b7d95d90c71aa67c83e1d992b5afacce64aaadc` và `meme.test.js` `86208cd56960dcb0296e47e61c884a81684a76cf04cbc7e9f3c325747f49e59f`. Không sửa source; chỉ ghi ack/result và evidence.

## Thực xem và kết quả

- Chạy Node 24.22.1, server loopback 4318, local fallback không credentials; Chrome headless Playwright, stage và OBS standalone 1920×1080 DPR 1. Đóng server/browser thử sau kiểm. Evidence dưới `.agent-kit/memory/ux-ui-reviewer/refs/task-sprint-03-01-code/r4/`.
- Deploy `!forge bonk doge storm with boom sound`: stage và OBS hiện doge, nhiều reaction lần lượt. Chuỗi 12 ảnh `stage-0..11.png` và `obs-0..11.png` chụp khoảng 350ms cộng thời gian chụp; `stage-0.png` thấy `RIGGED!`, `stage-2.png` thấy `EMOTIONAL DAMAGE!`, rồi `stage-5.png` thấy `SKILL ISSUE!`. Từ mẫu này xác nhận có reaction tiếp theo sau reaction trước, nhưng không quy được nó với một va chạm cụ thể đã xảy ra trong lúc badge cũ đang hiện: **việc pending slot thực sự được dùng ở runtime vẫn pending**.
- Không thấy chữ bị mép/ô compiler/camera che hoặc hai reaction chồng nhau trong chuỗi doge; contact sheets `stage-contact.jpg`, `obs-contact.jpg` và ảnh gốc. Thử `!forge popcat`, stage hiện popcat và reaction (`popcat-2.png`); mẫu hữu hạn không chứng minh mọi viewport, sự kiện hay trạng thái.
- Sau deploy popcat, bỏ focus input và nhấn Space: stage hiện Panic Clear, 0 entities, SFX OFF và reaction `RIGGED!` (`panic-stage.png`). OBS chụp sau chuyển tab hiện Panic Clear và không còn entities (`panic-obs.png`). Không xác minh reaction tức thời ở OBS, pending bị xóa thật hay thời gian <100ms.

## Burst và phần chưa xác minh

- `client/overlay/reactions.js` của snapshot có một biến `pending` boolean: khi badge còn sống, các va chạm tiếp theo được gộp thành một badge về sau; panic xóa pending và ưu tiên badge panic. Quan sát code cho thấy không có phản hồi riêng cho mọi va chạm trong burst, và một phản hồi có thể trễ tới sau badge đang hiển thị. Chưa kiểm thực tế chuỗi va chạm được nhận dạng riêng hoặc thời điểm chính xác; không coi test mock là UI pass. Story nói reaction khi va chạm, do đó Lead-Code cần chuyển PM quyết tradeoff gộp burst và độ trễ thay vì reviewer tự chấp nhận.
- Chưa đo chính xác fade 1,5 giây, burst timeline, FPS canvas thực, latency compile/panic; không nghe bonk/bruh/boom hay xác minh mute thực vì Chrome headless `--mute-audio`. Chưa xác minh attribution entity/entity, reaction panic OBS ngay lúc xảy ra, accessibility và toàn bộ responsive. Hai console error là 404 favicon, không thấy lỗi JS khác trong phần quan sát; không suy ra tất cả runtime sạch.
- Bước tiếp: Lead-Code tổng hợp review, chuyển PM quyết gộp burst và protocol arcade-to-OBS, đồng thời tiếp tục kiểm bằng chứng pending trên môi trường OBS/audio thật.