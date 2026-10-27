# Memory của role

## Đường dẫn

- Role đơn: `.agent-kit/memory/{role}/`.
- Council specialist và user: `.agent-kit/memory/{role}/{instance-id}/`. ID do council-lead giao trong brief.
- Chỉ ghi memory của mình. Nhiều phiên cùng role: chỉ một phiên được ghi.

## Ba tầng

| File | Nội dung | Ngưỡng mềm |
| --- | --- | --- |
| `context.md` | Identity, mục tiêu, trạng thái, pointers, bước tiếp | 60 dòng |
| `short-term.md` | Việc đang làm, quan sát, giả định, blocker, checkpoint | 120 dòng |
| `long-term.md` | Fact và bài học đã xác minh, dùng lại được | 200 dòng |

`refs/{task-id}/` hoặc `refs/{run-id}/` giữ plan, report, evidence đã bỏ secret. Đây không phải tầng thứ tư. Không copy code hay dump log.

## Đọc

1. `context.md` → phần liên quan của `short-term.md` → `long-term.md` → `refs/` khi cần.
2. Memory có thể cũ. Không coi memory là quyền hay bằng chứng mới.
3. Identity trong context không khớp brief: báo PM theo [CONFLICTS](CONFLICTS.md).

## Ghi và nén

- Cập nhật ở checkpoint, khi bàn giao và khi hết task.
- Hết task: đưa fact đã xác minh lên long-term, xóa việc đã xong khỏi short-term.
- Chạm ngưỡng: gộp, bỏ trùng, đẩy chi tiết sang refs, giữ pointer.
- Luôn giữ: acceptance, việc mở, quyết định, bước tiếp, ràng buộc, bằng chứng.
- Chưa nén an toàn được thì vượt ngưỡng và ghi lý do. Ngưỡng không phải lệnh xóa.

## Nơi lưu chuẩn

- Quyết định, acceptance, delivery nằm ở specs và story. Memory chỉ giữ trạng thái, bài học, pointer.
- Việc chưa xong phải có backlog item do PM ghi; memory chỉ trỏ tới.
- Fact dễ đổi (giá, chính sách, thị trường): giữ URL, ngày nguồn, ngày kiểm, điều kiện kiểm lại.
- Kit mẫu: memory và registry để trống.
