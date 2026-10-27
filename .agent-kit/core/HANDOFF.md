# Nhận việc và trả kết quả

Dành cho mọi role nhận việc qua request. Người gửi việc đọc thêm [DISPATCH](../protocols/DISPATCH.md).

## Bộ file của một lượt

- Mỗi lượt có `task-id`, `handoff-id` duy nhất và `revision` (bắt đầu từ 1).
- Thư mục: `{handoff.directory}/{handoff-id}/r{revision}/`. Riêng QA: xem [QA](../flows/QA.md).
- `request.md` do người gửi viết; `ack.md` và `result.md` do người nhận viết.
- Mỗi file chỉ một người ghi. Không ghi đè revision cũ.

## Snapshot

Snapshot là dấu vân tay của input lúc giao việc, để biết nguồn có bị đổi giữa chừng không.

- Có Git: `HEAD` + `git status --porcelain -- <scope>` + sha256 của `git diff HEAD -- <scope>`.
- File untracked trong scope: thêm path và sha256 của từng file.
- Không có Git: path và sha256 của từng file trong scope.
- `<scope>` là danh sách path nguồn của task.
- `.agent-kit/handoffs/` và `.agent-kit/memory/` không thuộc scope, trừ file được liệt kê làm input.
- Flow không dùng source code (council, marketing, QA): snapshot là danh sách input của flow, kèm sha256 hoặc version.
- Request ghi lại thay đổi của người dùng đang có (`git status` lúc giao). Phần ngoài scope phải còn nguyên khi trả kết quả.

## Trước khi làm

1. Đọc request, role card và context của mình.
2. Kiểm đúng project: thư mục chứa `AGENTS.md`, repo, `HEAD`.
3. Lập lại snapshot và so với request.
4. Ghi `ack.md`: IDs, role, snapshot quan sát được, `confirmed` hoặc `blocked` kèm lý do.
5. Không khớp, thiếu scope, không truy cập được path: dừng phần bị ảnh hưởng, báo người gửi.

Ack chỉ là nhận việc, chưa phải hoàn tất.

## Khi làm

- Chỉ đọc nguồn cần thiết; chỉ ghi path được giao và memory của mình.
- Cần đổi scope, spec hay acceptance: báo người gửi, không tự đổi.
- Có revision mới: chỉ làm theo revision mới sau khi người gửi xác nhận revision cũ đã dừng.

## Trả kết quả

1. Dừng ghi nguồn (freeze).
2. Viết `result.md` theo [mẫu result](../templates/handoff-result.md): IDs, snapshot sau khi làm, file đã đổi, kết quả theo từng acceptance, kiểm tra thực chạy, findings hoặc blocker, bước tiếp.
3. Báo người gửi đường dẫn result. Không gửi được thì tạo prompt cho người dùng chuyển, báo `pending relay`.

## Retry

- Retry cùng IDs và revision: đọc ack, result có sẵn rồi làm tiếp đúng chỗ.
- Không làm lại việc đã xong, không tạo thêm agent.

## Không

- Không nhận full chat hay toàn bộ memory của role khác.
- Không coi "đã gửi" hay "đã ack" là xong.
- Không tự checkout, reset, sync khi snapshot lệch.
- Không ghi vào project khác hoặc ngoài `.agent-kit/` của project yêu cầu, trừ path nguồn được giao.
