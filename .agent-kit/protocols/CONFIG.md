# Cấu hình `config.json`

[config.json](../config.json) do người dùng sửa tay. Agent đọc lại trước mỗi lần gửi việc, trả kết quả, báo mâu thuẫn, retry, resume và đóng sprint. Config chỉ chọn đường gửi, không cấp quyền mới. Không chạy giá trị config như lệnh shell.

## Fields

Mọi field bắt buộc. Có field lạ, trùng key hay sai kiểu thì báo lỗi, không đoán default.

| Field | Giá trị | Dùng cho |
| --- | --- | --- |
| `projectRoot` | path tương đối, mặc định `.` | Gốc project, tính từ thư mục chứa `AGENTS.md` |
| `handoff.mode` | `auto` hoặc `prompt` | Cách gửi việc, xem [DISPATCH](DISPATCH.md) |
| `handoff.fallback` | chỉ `prompt` | Khi `auto` không dùng được |
| `handoff.directory` | path tương đối dưới `.agent-kit/`, mặc định `.agent-kit/handoffs` | Nơi chứa request, ack, result |
| `roles.<role>.app` | `current` hoặc tên/ID app | App của role. Với PM: app của PM owner |
| `roles.<role>.target` | `null` hoặc ID phiên | `null`: phiên mới khi giao việc; với PM là phiên owner hiện có |
| `council.specialistCount` | số nguyên ≥ 2, mặc định 3 | Số specialist mặc định |
| `council.userCount` | số nguyên ≥ 1, mặc định 1 | Số user persona mặc định |
| `council.instanceRoutes` | `{ id: { app, target } }`, mặc định `{}` | Route riêng cho instance đã có trong registry |
| `qa.suitePath` | path tương đối, mặc định `.agent-kit/specs/qa/SUITE.md` | Suite QA; chỉ kiểm nội dung khi QA được kích hoạt |
| `sprint.autoCommit` | boolean | PM tự commit cuối sprint thực |
| `sprint.messageTemplate` | một dòng, chứa đủ `{phase}`, `{sprint}`, `{summary}` | Commit message |
| `sprint.reportMaxLines` | số nguyên 3–5, mặc định 4 | Độ dài report chat mặc định của PM |
| `sprint.maxStories` | số nguyên ≥ 1, mặc định 6 | Số User Story tối đa mỗi sprint, tính cả optional; nguồn duy nhất của giới hạn này |

`roles` phải có đủ 13 role: pm, lead-code, coder, code-reviewer, ux-ui-reviewer, council-lead, council-specialist, council-user, lead-marketing, marketing-researcher, marketer, marketing-reviewer, qa.

## Kiểm tra

- Path: không rỗng, không tuyệt đối, không `..`, không thoát khỏi project, không đi qua symlink hay junction ra ngoài.
- ID: không có `/`, `.`, ký tự điều khiển hay tên thiết bị Windows.
- Config lỗi: dừng phần phụ thuộc, báo PM (theo [CONFLICTS](../core/CONFLICTS.md) nếu là mâu thuẫn), tạo prompt để người dùng chuyển. Không gửi bằng route đoán.
- Config hợp lệ nhưng không chứng minh được app, phiên, project hay quyền: dùng `prompt`, báo `pending`.
- `fallback: prompt` nghĩa là dừng phần cần giao, ghi request kèm prompt để người dùng chuyển, báo `pending relay`. Không có nghĩa coordinator được tự làm việc của member.
- Có route `qa` không có nghĩa được kích hoạt QA. Suite còn TBD không làm config lỗi.
- Kit mẫu giữ path tương đối và `instanceRoutes: {}`.
