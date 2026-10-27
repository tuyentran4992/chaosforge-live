# Flow hội đồng cố vấn

PM ↔ council-lead ↔ nhiều specialist + user persona. Hội đồng tư vấn sản phẩm, không làm việc với team code, không đọc hay review code, không tự đổi specs. PM và người dùng quyết định. Chỉ gọi khi cần tư vấn.

## Input

- Được đọc: role card, memory của mình, product input đã lọc code (brief, đoạn specs, mockup, ảnh, số liệu có nguồn, demo qua giao diện người dùng).
- Không đọc: source, diff, script, log, stack trace, DevTools; không tự quét repo.
- PM chuẩn bị input sạch. Input lẫn code: dừng phần đó, báo PM xin brief sạch.
- Mỗi lượt có `run-id`, câu hỏi, danh sách product input (snapshot). Mỗi instance có profile riêng.

## Độc lập

- Mỗi instance một context mới. Trước báo cáo đầu tiên không nhận ý kiến, kết luận hay memory của instance khác.
- Specialist phải có góc nhìn thật sự khác nhau. Không nhân bản cùng lập luận rồi đếm thành đồng thuận.
- User persona là mô phỏng người dùng phổ thông, không phải dữ liệu người dùng thật.

## Registry

[registry.json](../memory/council-lead/refs/registry.json): `schemaVersion: 1`, `instances: []`. Mỗi record:

| Field | Nội dung |
| --- | --- |
| `id` | Duy nhất; chữ thường, số, gạch ngang; bắt đầu bằng chữ; ≤ 64 ký tự |
| `role` | `council-specialist` hoặc `council-user` |
| `label` | Tên dễ tìm |
| `profile` | Góc nhìn chuyên môn hoặc persona; ổn định, không chứa kết luận |
| `memoryPath` | `.agent-kit/memory/{role}/{id}` |
| `state` | `ready`, `busy` hoặc `retired` |
| `activeRunId` / `lastRunId` | Run đang chạy / run gần nhất, hoặc `null` |

1. PM nêu góc nhìn cần có, không cần nhớ ID. Lead tìm record `ready` khớp profile; mơ hồ thì hỏi PM.
2. Chưa có: tạo ID mới, ghi registry. Instance tự tạo memory từ [mẫu](../templates/council-instance/context.md).
3. Dùng lại ID nghĩa là dùng lại profile và memory, trong context mới. Đổi bản chất góc nhìn thì tạo ID mới. Record `retired` không dùng lại.
4. Chỉ council-lead ghi registry. Đặt `busy` trước khi gửi, trả `ready` sau khi có result. Instance đang `busy` thì xếp hàng chờ.
5. Registry lỗi hoặc identity lệch: báo PM theo [CONFLICTS](../core/CONFLICTS.md), không gửi việc.

## Memory

- Instance chỉ đọc và ghi memory của mình, theo [MEMORY](../core/MEMORY.md).
- Long-term giữ profile và fact có nguồn. Ý kiến của user persona luôn ghi nhãn "mô phỏng".
- Tổng hợp của lead nằm ở refs của lead, không đưa vào memory của instance.

## Điều phối và tổng hợp

1. Lead đọc config: số specialist và user mặc định khi PM chưa chỉ định. Không bịa thành viên hay report khi hết slot.
2. Gửi request riêng cho từng instance theo [DISPATCH](../protocols/DISPATCH.md), mẫu [council request](../templates/council-request.md).
3. Thu đủ report trên cùng snapshot. Chưa đủ: `partial`, không gọi là đồng thuận.
4. Hỏi thêm thì hỏi trung lập, không mớm đáp án, không gửi nguyên report của người khác.
5. Phân xử bằng lập luận và evidence, không theo đa số. Giữ ý kiến bất đồng, phương án, tradeoff, câu hỏi mở.
6. Trả PM bản ngắn theo [council result](../templates/council-result.md). Không ghi specs, không đóng story, không kết luận code đúng.
