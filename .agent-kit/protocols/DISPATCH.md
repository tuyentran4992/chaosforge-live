# Gửi việc và trả về PM

Dành cho người gửi việc: PM, Lead-Code, Lead-Marketing, council-lead. Người nhận theo [HANDOFF](../core/HANDOFF.md).

## Chuẩn bị request

1. Đọc lại [config](../config.json) và kiểm theo [CONFIG](CONFIG.md).
2. Tạo `task-id`, `handoff-id` duy nhất (ví dụ task-id + chuỗi ngẫu nhiên), revision 1.
3. Tạo thư mục `{handoff.directory}/{handoff-id}/r{revision}/` (chưa được tồn tại). Kiểm path nằm trong `.agent-kit/`.
4. Lập snapshot theo [HANDOFF](../core/HANDOFF.md#snapshot), ghi kèm `git status` hiện tại để giữ thay đổi của người dùng.
5. Điền request theo mẫu của flow. Request phải tự đủ dùng:
   - IDs, revision, người gửi và người nhận (role, app).
   - PM owner và đường trả về.
   - Project, snapshot, scope đọc và scope ghi.
   - Phase, sprint, story IDs (task ad hoc: "không áp dụng").
   - Mục tiêu, acceptance, quyền, đầu ra, đường dẫn ack và result.
6. Không để placeholder quan trọng. Request không cấp thêm quyền ngoài quyền người dùng đã cho.
7. Sau khi gửi, request không được sửa. Đổi yêu cầu thì tạo revision mới.

Mẫu theo flow: code [request](../templates/handoff-request.md); council [request](../templates/council-request.md); marketing [request](../templates/marketing-request.md); QA [request](../templates/qa-request.md).

## Gửi

| Trường hợp | Làm gì |
| --- | --- |
| `mode: prompt` | Ghi request có sẵn prompt để copy. Báo path, app và role đích, path result, trạng thái `pending relay` |
| `mode: auto`, có tool thật và có quyền | Gửi, kiểm tool trả về session đích đúng project và là context mới |
| `auto` nhưng thiếu tool, quyền, hoặc không kiểm được project hay context mới | Dùng fallback `prompt`, báo lý do |

- `target: null` khi giao việc: tạo phiên mới trong app đã cấu hình, chỉ khi kiểm chứng được.
- App đã chỉ định khác `current`: không tự chuyển về `current`.
- Không cài bridge, daemon hay dependency để gửi.
- Trạng thái theo thứ tự: chuẩn bị → `pending relay` / `dispatched` → `acknowledged` → `result received` → `validated`.

## Nhận và kiểm result

1. Đọc request, ack, result và nguồn hiện tại.
2. Kiểm IDs, revision, role, project, snapshot.
3. Diff thực nằm trong scope. Thay đổi của người dùng ngoài scope còn nguyên.
4. Xem evidence thật; không tin chữ "done" hay việc file result tồn tại.
5. Result của coordinator thiếu ack (instance ID, snapshot) của member, hoặc diff nguồn không khớp với việc member đã nhận: coi là chưa hợp lệ, báo người dùng, không nghiệm thu.
6. Nguồn đổi sau report: cần snapshot mới và kiểm lại.
7. Chỉ đánh dấu xong sau khi kiểm xong và đạt acceptance.

## Retry và revision mới

- Chưa có result chưa phải lý do gửi lại. Kiểm ack và trạng thái trước; không rõ thì báo `pending`.
- Đổi yêu cầu hoặc snapshot: tạo revision mới, ghi `supersedes`. Chỉ kích hoạt khi người nhận cũ đã dừng ghi.
- Kiểm lại (recheck) gửi cho chính member cũ.

## Trả về PM owner

- Request đầu tiên của PM ghi PM owner: app, session ID, project.
- Owner được truyền nguyên vẹn qua mọi request con.
- `roles.pm.app: current` = app của PM lúc tạo request đầu. `roles.pm.target: null` = chính phiên PM đó. Không tạo PM mới.
- Coordinator cuối result ghi một prompt resume cho PM: owner, IDs, path request và result.
- `auto` và gửi được tới owner: gửi thông báo kèm pointer. Ngược lại: báo `pending PM relay` kèm path và đích.
- Config đổi route khác owner: hỏi người dùng trước khi gửi.
- Người dùng giao thẳng cho coordinator (không có PM owner): trả kết quả cho người dùng ngay trong phiên đó.
- Thông báo chỉ là tín hiệu. PM vẫn phải tự kiểm result trước khi nghiệm thu.
