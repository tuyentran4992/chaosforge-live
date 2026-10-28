# UX/UI recheck r3 — us-009

- Task `task-sprint-03-01-code`; handoff `task-sprint-03-01-ux-review-01/r3`; reviewer `/root/ux_reviewer`.
- Trạng thái đọc: `finished` (đã dừng đọc); coverage `partial`. Hai finding bố cục r1/r2 không tái hiện trong mẫu thực xem; acceptance toàn bộ chưa thể xác nhận do giới hạn bên dưới và tradeoff cần PM quyết.
- Snapshot đầu/cuối khớp freeze-r3: HEAD `5ad45d22fe9a0ee98f318e6d151322e9d086ade4`, status scope 15 modified và 5 untracked, SHA256 byte diff `165655e3a792e6ad45489d0e7b362c48b08a3a1543c50d5e9f23d52e4e4391c7`; năm hash untracked khớp từng giá trị trong ack r3, gồm `reactions.js` `398c8995fd59a248c54888a233240cb6b906f674cfa22666afc4757d5939043d` và `meme.test.js` `b1c9c35d23c0f34219b51148b273007680c20c7d3556031f27efebd621a8f148`. Không sửa source, chỉ ghi handoff và evidence reviewer.

## Kết quả recheck

- Finding r1/r2 về reaction bị mép, compiler hoặc camera che: **không tái hiện trong mẫu đã xem**, có thể đóng phần bố cục đã kiểm. Doge: 12 ảnh stage và 12 ảnh OBS; popcat: 6 ảnh stage và 6 ảnh OBS; các nhãn xuất hiện đầy đủ giữa compiler và camera. Evidence `r3/stage-doge-0.png`, `r3/stage-popcat-3.png`, `r3/obs-doge-2.png`, `r3/obs-popcat-3.png` và các ảnh cùng chuỗi. Đây là mẫu hữu hạn, không chứng minh mọi viewport và mọi trạng thái.
- Finding reaction chồng nhau r2: **không tái hiện trong mẫu đã xem**; khi các thực thể dày, chỉ thấy một badge cùng lúc, ví dụ `obs-doge-contact.jpg` và `stage-doge-contact.jpg`. Từng ảnh được chụp cách nhau khoảng 350ms cộng thời gian chụp.
- Space sau khi deploy popcat: stage hiện Panic Clear, 0 entities, SFX OFF và reaction đọc được (`panic-stage.png`); ảnh OBS chụp sau đổi tab hiện Panic Clear, không còn entities (`panic-obs.png`). Ảnh OBS chụp sau nên không chứng minh reaction panic ngay lúc xảy ra hay thời gian <100ms.

## Tradeoff cần PM quyết — reaction bị bỏ trong 1,5 giây

Story us-009 nói khi va chạm thì hiển thị reaction. `client/overlay/reactions.js` trong snapshot này cho thấy `add` trả ngay khi badge collision còn sống dưới 1500ms, nên va chạm tiếp theo không tạo badge riêng; panic được ưu tiên. Các chuỗi giao diện thật cho thấy chỉ một reaction xuất hiện cùng lúc, nhưng không xác định riêng từng sự kiện chạm từ screenshot, vì vậy cơ chế bỏ event được xác nhận bằng code, không tuyên bố đã đo bằng UI. Tác động: trong chuỗi va chạm dày, tính dễ đọc được cải thiện nhưng một số sự kiện không có phản hồi riêng. Reviewer không tự chấp nhận việc thay đổi ý nghĩa acceptance; Lead-Code chuyển PM quyết định và làm rõ kỳ vọng trước khi đóng.

## Phạm vi và giới hạn

- Server local Node 24.22.1, loopback 4318, local fallback không credentials; Chrome headless Playwright session riêng. Stage 1920×1080; OBS 1920×1080 (doge), 1280×720 (popcat), DPR 1. Server và browser đã đóng. Hai lỗi console 404 favicon; không thấy lỗi JS khác trong phần phiên quan sát.
- Không nghe bonk/bruh/boom hay kiểm mute bằng tai do headless `--mute-audio`; FPS canvas thực, độ trễ compile/panic, thời gian fade chính xác, reaction panic OBS tức thời, và attribution cụ thể giữa va chạm entity/entity với badge chưa được đo. Chưa kiểm đầy đủ accessibility, validation/errors hay toàn bộ responsive matrix. Không coi ảnh tĩnh hay callbacks là bằng chứng đạt FPS/animation.
- Bước tiếp: Lead-Code tổng hợp code-review, chuyển PM quyết tradeoff bị bỏ collision và xử lý protocol arcade-to-OBS còn mở; hoàn tất các kiểm chứng pending trong môi trường OBS và audio thực.