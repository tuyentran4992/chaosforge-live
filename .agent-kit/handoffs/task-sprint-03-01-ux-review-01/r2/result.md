# UX/UI recheck r2 — us-009

- Task `task-sprint-03-01-code`; handoff `task-sprint-03-01-ux-review-01/r2`; reviewer `/root/ux_reviewer`.
- Trạng thái đọc: `finished` (đã dừng đọc); coverage `partial`; finding r1 còn mở một phần, và có thêm finding về chữ chồng nhau.
- Snapshot trước/sau khớp freeze-r2: HEAD `5ad45d22fe9a0ee98f318e6d151322e9d086ade4`, status scope 15 modified + 5 untracked, SHA256 byte diff `165655e3a792e6ad45489d0e7b362c48b08a3a1543c50d5e9f23d52e4e4391c7`. Hash untracked khớp toàn bộ ack r2: `meme-sfx.js` b46aaa6aa0e9d909d60d49bd2807bba530701481ce310f69335d3c4c7819753a; `collisions.js` 996b7d22a6b0ff2923719713f09c891550d824eeea5dec3b50c6267d6f2fd2e0; `meme-artwork.js` 95a504cc4357bbe3acc9e693f52cceae8ef844da6d02851247c0f303766e5982; `reactions.js` 704e7fc8504fc01db7b7d9e35568da30d448e0afb7986d9dddaf05e9c06e8a6b; `meme.test.js` 9eec77eea83b27fd8e897196ee46212cdd6b777acfb2f6ba4238574d6b4a84e1. Không sửa source; chỉ ghi ack/result và evidence của reviewer.

## Findings

1. **P2 — Finding r1 còn mở trên stage: ô camera che reaction.** Bước: mở stage 1920×1080, nhập `!forge bonk doge storm with boom sound`, compile và chờ nhiều va chạm ở bên phải. Mong đợi reaction đọc được đầy đủ; thực tế phần cuối `EMOTIONAL DAMAGE!` nằm sau ô `STREAMER CAM · SIMULATED`. Ảnh hưởng: người xem bản demo không thấy toàn bộ nội dung meme. Evidence `r2/stage-7.png`; cũng thấy trong `stage-6.png`, `stage-8.png`. Trong chuỗi OBS doge 1920×1080 và popcat 1280×720 không quan sát lại lỗi cắt mép/compiler của r1; đó là mẫu hữu hạn, không chứng minh mọi vị trí/trạng thái. Ô camera là lớp của stage và tiếp tục che chữ.
2. **P2 — Nhiều reaction chồng lẫn nhau khi có nhiều va chạm.** Bước: deploy cùng prompt hoặc `!forge popcat`, để các thực thể di chuyển và quan sát trong vài giây. Mong đợi người xem đọc được từng reaction; thực tế `SKILL ISSUE!`, `RIGGED!`, `EMOTIONAL DAMAGE!` xuất hiện cùng làn và đè lên nhau, có lúc cả thực thể chồng lên chữ. Ảnh hưởng: phần chữ khó hoặc không đọc được trong các đợt hỗn loạn thường gặp. Evidence `r2/obs-8.png` (OBS 1920×1080), `r2/obs-popcat-3.png` (OBS 1280×720), `r2/stage-2.png`. Đây là quan sát trình duyệt thật, không suy từ mock; đề nghị Lead-Code cân nhắc giới hạn/sắp xếp reaction.

## Thực chạy

- Node 24.22.1, server localhost cổng thử 4318; Chrome headless Playwright session riêng, local fallback không credential. Đóng browser và server sau thử. Viewport stage 1920×1080 DPR 1; OBS 1920×1080 và 1280×720. Evidence ở `.agent-kit/memory/ux-ui-reviewer/refs/task-sprint-03-01-code/r2/`, các chuỗi ảnh `stage-0..11.png` và `obs-0..11.png` cách nhau khoảng 350ms cộng thời gian chụp.
- Doge và popcat hiện trong OBS; reaction tự phát lúc thực thể vận động. Không đủ bằng chứng phân biệt từng reaction bắt nguồn từ va chạm biên hay va chạm entity/entity, vì ảnh không xác lập chính xác cặp chạm và thời điểm. Recheck entity/entity riêng vẫn `pending`.
- Đã deploy doge, bỏ focus khỏi ô nhập, nhấn Space: stage hiện Panic Clear, 0 entities, SFX OFF và một `EMOTIONAL DAMAGE!` (`panic-space-stage.png`). OBS sau đó hiện Panic Clear và không còn entities (`obs-after-space.png`); ảnh OBS chụp trễ nên không xác minh reaction panic trên OBS hoặc độ trễ <100ms.
- Console ghi hai lỗi 404 favicon; không thấy lỗi JS khác trong phiên. Không suy ra mọi runtime không lỗi.

## Còn thiếu / bước tiếp

- Không nghe âm bonk/bruh/boom hoặc kiểm mute bằng tai vì headless chạy `--mute-audio`; FPS render thực, độ trễ compile và panic chưa đo, không dùng callback để tuyên bố pass. Chưa kiểm animation đầy đủ, attribution entity/entity, phản ứng panic OBS ngay thời điểm xảy ra, error/validation, accessibility và đủ responsive matrix.
- Acceptance recheck liên quan chữ: `partial`, không đóng P2 r1 do camera; reaction chồng nhau cần xử lý. Lead-Code tổng hợp cùng code-review, giao sửa và yêu cầu recheck revision tiếp theo; tiếp tục những kiểm chứng pending trong môi trường nghe được và OBS thực.