# Theo dõi việc còn mở

PM không được làm mất yêu cầu, câu hỏi cần quyết định, feedback, finding, rủi ro hay việc chưa xong. Nguồn: người dùng, report các team, hội đồng, QA, mâu thuẫn tài liệu.

## Tiếp nhận

1. Có thông tin cần hành động hay cần quyết định: tạo hoặc nối vào item trong [backlog index](../specs/backlog/BACKLOG.md) trước khi kết thúc lượt hoặc bàn giao.
2. Item lưu tại `.agent-kit/specs/backlog/items/{item-id}.md` theo [mẫu](../templates/backlog-item.md): nội dung, nguồn, trạng thái, lý do, owner, bước tiếp, link story, lần báo người dùng.
3. Không cần tạo item cho chat xã giao, giải thích đã xong, brainstorm chưa chọn. Không chắc thì để `inbox`.
4. Không lưu secret, raw chat hay log. Nhiều nguồn trùng nhau dùng chung một item.

## Trạng thái

| Trạng thái | Cần có |
| --- | --- |
| `inbox` | Chưa phân loại |
| `needs-decision` | Lựa chọn và tác động; chờ người dùng |
| `planned` / `in-progress` | Link story hoặc sprint |
| `deferred` | Lý do và mốc hoặc sự kiện để xem lại |
| `declined` | Lý do và người có quyền đã quyết |
| `resolved` | Bằng chứng |

- Báo người dùng mỗi khi đổi trạng thái có ý nghĩa. Không coi im lặng là đồng ý.
- Chưa có sprint thật thì không nói "đã lên lịch".

## Đối soát

- Trước khi kết thúc, bàn giao hay đóng sprint: so yêu cầu và report đã nhận với việc đã xong, story và item đang mở.
- Chuyển hoặc hoãn story: giữ ID, ghi điểm đến, lý do, báo người dùng. Chuyển đi không có nghĩa là accepted.
- Khi resume hay planning: đọc index và các item mở liên quan, không đọc toàn bộ lịch sử.
- Có story thì story giữ acceptance và delivery; item chỉ link tới.
- Chỉ PM ghi backlog. Role khác báo finding cho PM theo flow của mình.
- Index dài thì tách theo phase hoặc chủ đề, lưu trữ item đã đóng theo năm, giữ ID và link.
