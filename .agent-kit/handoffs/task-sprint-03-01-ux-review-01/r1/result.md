# UX/UI review — us-009

- Task `task-sprint-03-01-code`; handoff `task-sprint-03-01-ux-review-01/r1`; role `ux-ui-reviewer`; instance `/root/ux_reviewer`.
- Trạng thái đọc: `finished` (đã dừng đọc); coverage `partial`. Chưa đủ bằng chứng nghiệm thu toàn bộ UI/âm thanh.
- Snapshot trước/sau: HEAD `5ad45d22fe9a0ee98f318e6d151322e9d086ade4`; status scope đúng freeze-r1 (15 modified, 4 untracked); SHA256 byte `git diff HEAD -- <scope>` `1a0d5f3b767e66e21db6fc45fca77f384a7ddfd7cfe716aa2dce31002eb37fea`. Bốn SHA256 untracked không đổi so với ack/freeze: `b46aaa6aa0e9d909d60d49bd2807bba530701481ce310f69335d3c4c7819753a`, `95a504cc4357bbe3acc9e693f52cceae8ef844da6d02851247c0f303766e5982`, `aba7da3d1face52df2b59d2ac94f30ae82ab549b8a0bcd3a29902d23a5e9ce94`, `f14a78c449f32c6f8f6862da63e912ed08962d4a0d9a3f6633025344196f63cf` theo thứ tự `client/audio/meme-sfx.js`, `client/overlay/meme-artwork.js`, `client/overlay/reactions.js`, `test/meme.test.js`. Không sửa source. Ngoài scope không chủ ý sửa; file ghi là ack, result và evidence trong memory UX/UI reviewer.

## Finding

- **P2 — Reaction va chạm bị cắt tại biên và bị HUD che, stage và OBS standalone.** Bước: chạy local Studio, deploy `Bonk Doge Hammer Storm` hoặc nhập `!forge bonk doge storm with boom sound`, mở OBS source của Studio và chờ các va chạm. Mong đợi chữ reaction neon đọc được đầy đủ trong hiệu ứng 1,5 giây như story; thực tế reaction sinh gần biên bị cắt mất đầu/cuối, hoặc vẽ sau HUD compiler nên chỉ còn một phần chữ. Ảnh hưởng: khán giả OBS không đọc được reaction; mất ý nghĩa phần tính năng meme. Evidence: `refs/task-sprint-03-01-code/obs-1920.png` (1920×1080: `EMOTIONAL DAMAGE!` mất đầu ở mép trái, `SKILL ISSUE!` bị compiler che); `obs-doge.png` (1280×720: text mất đuôi ở mép phải và bị compiler che); `doge.png` (stage 1920×1080). Snapshot như trên. Đề nghị bố trí/clamp reaction theo kích thước chữ và tránh HUD; reviewer không quyết định thay PM về thiết kế.

## Phạm vi thực xem

- Môi trường: Node 24.22.1, `node server/index.js`, loopback cổng thử 4318, remote compiler không dùng credential; Chrome headless qua Playwright CLI, viewport stage 1920×1080, standalone OBS 1280×720 và 1920×1080 DPR 1; dữ liệu local của browser session thử riêng. Server và browser thử đã đóng.
- Stage: nhập prompt doge/boom cho AST `doge`, `boom` và 25–30 thực thể có mặt chó vàng cùng búa, reaction va chạm; `!forge popcat` cho AST `popcat`, hình mèo trắng miệng mở, reaction `SKILL ISSUE!`, `RIGGED!`, `EMOTIONAL DAMAGE!` (ảnh `doge.png`, `popcat.png`). Hình tĩnh không chứng minh toàn bộ animation/mượt.
- Deck: thấy hai cartridge, click lần lượt, `NOW PLAYING` chuyển tương ứng DOGE/POPCAT, `COMPILE` hiện `CARTRIDGE`; click mute thấy `SOUND OFF` và nút ở trạng thái pressed. Đây chỉ là evidence UI toggle, chưa xác minh thực sự không phát âm.
- OBS standalone lấy cùng studio: thấy doge và AST từ preset đồng bộ (`obs-doge.png`, `obs-1920.png`). Panic qua nút stage: chụp `panic.png` cho 0 entities và chữ `EMOTIONAL DAMAGE!`; chưa đo <100ms, chưa kiểm phím Space hoặc panic đồng bộ OBS.
- Responsive: deck ở 360×800 có document `scrollWidth=360`, `innerWidth=360`; `deck-mobile.png` chỉ chụp đầu trang, chưa kiểm toàn bộ preset hay 9 viewport. Trên ảnh thấy thực thể có alpha giảm ở vùng tâm; chưa đo chính xác 70% hay kiểm đầy đủ safe-zone spawn.
- Trong OBS standalone doge đang active ở 1920×1080, lấy 716 `requestAnimationFrame` callbacks trong 5006,6 ms (~143,0 callbacks/s). Đây là tốc độ callback của Chrome headless trong một mẫu, không đo số frame canvas thực render, dropped frames hay FPS trên máy OBS; không kết luận acceptance ≥60 FPS. Console có hai 404 favicon, không thấy lỗi JS khác trong phiên quan sát; không kết luận mọi runtime đều không lỗi.

## Chưa xem / cần tiếp tục

- Chưa nghe `bonk`, `bruh`, `boom` hoặc kiểm âm thực khi mute: Chrome headless mở với `--mute-audio`; cần nghe bằng môi trường có audio. Chưa kiểm hành vi khôi phục lỗi, validation, các trạng thái empty/loading/error, đủ accessibility và toàn bộ responsive matrix.
- Chưa xác nhận chuyển động miệng popcat/búa, thời gian fade 1,5s bằng video/đo thời gian, reaction khi Space và va chạm thực thể, hoặc OBS popcat/panic; chưa đo compile <300ms. Không suy pass các mục này từ code hay screenshot.
- Acceptance UI 2–4: `partial` do finding và evidence còn thiếu. Acceptance 1: ví dụ prompt có kết quả đúng, latency `pending`. Acceptance 5 thuộc code/test review, không đánh giá trong report này.
- Bước tiếp: Lead-Code tổng hợp cả hai review, giao sửa finding sau khi cả hai reviewer dừng đọc; sau fix gửi snapshot revision mới cho reviewer này kiểm lại, đồng thời bổ sung nghe âm và kiểm các mục pending.