# Result bàn giao

## Định danh

- Task-id: {task-id}. Handoff-id: {handoff-id}. Revision: {n}.
- Người nhận thực tế: {role, app, session}.
- Phase / sprint / story: {IDs hoặc "không áp dụng"}.
- Trạng thái: {completed | partial | blocked}.

## Snapshot

- Lúc nhận (đã ack): {HEAD, status, sha256 diff}.
- Sau khi freeze: {HEAD, status, sha256 diff}.
- File đã đổi: {paths}.
- Thay đổi của người dùng ngoài scope: {còn nguyên / mô tả}.

## Kết quả theo acceptance

{Từng tiêu chí: đạt / chưa đạt, kèm evidence pointer.}

## Kiểm tra thực chạy

{Lệnh, kết quả, số dòng codefile mới hoặc đã sửa. Phần chưa chạy và lý do.}

## Findings hoặc giới hạn

{Reviewer: mức độ, vị trí, các bước, expected/actual, tác động, evidence. Phạm vi đã xem, chưa xem. Trạng thái `finished` hoặc `stopped`.}

## Bước tiếp

{Việc người gửi cần kiểm hoặc giao tiếp.}

## Tổng hợp review — Lead-Code điền

- Report Code Reviewer: {pointer}. Report UX/UI Reviewer: {pointer hoặc `N/A` kèm lý do}.
- Cùng snapshot: {có / không}. Findings đã xử lý hoặc được chấp nhận: {...}.
- Verify bản mới nhất: {evidence, giới hạn}.

## Prompt resume PM — coordinator điền

PM tiếp tục trong phiên owner {app, session}, project {path}. Task {IDs}. Request: {path}. Result: {path}. Hãy tự kiểm IDs, snapshot và diff hiện tại trước khi nghiệm thu. Thông báo này chưa phải bằng chứng hoàn tất.
