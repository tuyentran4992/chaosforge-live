# Technical plan — task-sprint-03-01-code / us-009

Trạng thái: **chốt cho r3**, PM phê duyệt hướng tiếp cận và cập nhật DESIGN theo nghị quyết `conflict-design-whitelist-resolution.md`; snapshot đầu vào tại handoff r3/ack. Plan không cấp thêm quyền hay sửa acceptance.

## Boundaries và contracts dự kiến

- `shared/ast-schema.js` và `shared/ast-validate.js`: schema là nguồn enum đóng cho validator và remote structured output; mở rộng đúng enum request. Giữ ràng buộc và từ chối trường/giá trị ngoài schema.
- `shared/synthesize.js`: nhận prompt, tách mệnh đề phủ định trước khi nhận diện từ khóa; thêm entity và SFX meme, xác định ưu tiên để `popcat` không bị hiểu nhầm là `pop`, `boom` rõ ràng thắng `bonk` trong ví dụ request, và phủ định SFX không vô tình được khôi phục bằng default. Giữ uncertainty và zero-gravity hiện hữu; tách module từ vựng/negation nếu cần để giữ SRP và line budget. `server/openai.js` dùng schema chung; xác minh prompt/contract mà không đưa key ra client.
- `client/overlay/artwork.js` cùng module vẽ meme mới nếu cần: Canvas vector thuần; truyền thời gian animation có kiểm soát, giữ entity cũ và opacity safe-zone. `client/overlay/engine.js` điều phối frame và vòng đời; `physics.js` có thể trả tín hiệu va chạm biên để kích hoạt reaction mà không đổi physics cơ bản. Reaction dùng tập text cố định, tuổi 1.5 giây, giới hạn số lượng và tránh sinh lặp mỗi frame; panic xuất hiện sau clear và phải giữ thời gian clear/đồng bộ hiện có. Kiểm cả overlay chính và standalone.
- Audio thực tế hiện ở `client/audio/sfx.js` (không phải `client/overlay/audio.js` như request mô tả): giữ `createSound`/`play`/`setEnabled`, mở rộng Web Audio và test mute/cleanup, không tài nguyên ngoài; tách module synth nếu cần. Không thay đổi cơ chế vận chuyển/signal.
- `client/cartridges/library.js` và nguồn preset thực tế: thêm hai cartridge tên đúng, AST hợp lệ, khả dụng trên deck; giữ lưu trữ cũ.
- `test/*.test.js`: kiểm schema toàn enum, unknown values, tất cả từ khóa và phủ định đa ngôn ngữ, sự kết hợp ưu tiên, SFX/mute, event panic/va chạm, presets và regressions. Thêm file mới hoặc tách theo trách nhiệm khi cần; không suy ra 100% coverage nếu chưa đo.

## Line budget và scope

Mỗi file code nguồn/test/script/style mới hoặc sửa tối đa 250 dòng vật lý, gồm blank/comment; tách theo trách nhiệm thay vì minify. Các nhóm file dự kiến trên cùng các module tách và tests: budget tối đa 250/file. Coder phải quét toàn bộ codefile do project viết, báo đường dẫn, số dòng và file ngoài scope vượt nếu có. Không sửa WebSocket Twitch IRC/signaling. Chỉ Coder sửa nguồn; lead-code không sửa product code.

## Verify và điều phối

1. Revalidate snapshot và contract PM; cập nhật TECHSTACK/ARCHITECT. Tạo request đủ snapshot/scope, giao đúng một Coder context mới và chờ ack instance/snapshot trước implementation.
2. Coder test và đếm dòng; dừng ghi, trả result. Lead kiểm diff, lập freeze HEAD/status/SHA256 diff và hash mọi untracked trong scope.
3. Hai reviewer độc lập cùng frozen snapshot: code review contract/tests/line count; UX/UI review thực chạy visual, flow, hai entity, reaction, preset và phạm vi chưa xem. Đợi cả hai xong trước khi Coder cũ sửa; reviewer cũ recheck phần chịu ảnh hưởng.
4. Lead kiểm bản tích hợp cuối từ checkout sạch có áp chính xác snapshot bao gồm untracked; chạy `npm test`, khởi động app thật, đo prompt <300ms, đo frame 1920×1080 trong điều kiện nêu rõ, nghe ba SFX và mute, quan sát panic/va chạm cùng 6 trạng thái, kiểm diff và 250 dòng. Ghi evidence và giới hạn môi trường, không suy pass từ mock.
5. Result theo mẫu, pointer ack/reports, snapshot cuối, acceptance và prompt resume PM; không commit, push, deploy hoặc kích hoạt QA.
