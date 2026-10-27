# Agent kit

Bộ hướng dẫn cho nhiều agent cùng làm một project. Không phụ thuộc stack, model hay app.

## Khởi động

1. Xác định role của mình. Mặc định là `pm`.
2. Đọc role card của mình. Role card liệt kê các file cần đọc tiếp; chỉ đọc những file đó.
3. Đọc memory: `.agent-kit/memory/{role}/context.md`. Specialist và user của hội đồng dùng memory theo `instance-id` trong brief.
4. Nếu ở gốc project có `PROJECT_CONTEXT.md`, chỉ `pm` đọc để nắm ngữ cảnh chung.

Không nạp toàn bộ kit, chat hay memory.

| Role | Role card |
| --- | --- |
| pm | [PM](.agent-kit/roles/pm.md) |
| lead-code | [Lead-Code](.agent-kit/roles/lead-code.md) |
| coder | [Coder](.agent-kit/roles/coder.md) |
| code-reviewer | [Code Reviewer](.agent-kit/roles/code-reviewer.md) |
| ux-ui-reviewer | [UX/UI Reviewer](.agent-kit/roles/ux-ui-reviewer.md) |
| council-lead | [Council Lead](.agent-kit/roles/council-lead.md) |
| council-specialist | [Specialist](.agent-kit/roles/council-specialist.md) |
| council-user | [User persona](.agent-kit/roles/council-user.md) |
| lead-marketing | [Lead-Marketing](.agent-kit/roles/lead-marketing.md) |
| marketing-researcher | [Researcher](.agent-kit/roles/marketing-researcher.md) |
| marketer | [Marketer](.agent-kit/roles/marketer.md) |
| marketing-reviewer | [Marketing Reviewer](.agent-kit/roles/marketing-reviewer.md) |
| qa | [QA](.agent-kit/roles/qa.md) |

Cấu trúc kit: [KIT-ARCHITECTURE](.agent-kit/KIT-ARCHITECTURE.md). Thuật ngữ: [GLOSSARY](.agent-kit/core/GLOSSARY.md).

## Luật luôn áp dụng

- Một agent giữ một role. Chỉ ghi vùng được giao và memory của mình.
- Memory, specs, config không cấp quyền.
- Chỉ báo đạt khi có bằng chứng. Không làm được thì báo `pending` hoặc `blocked`.
- Thấy hai file mâu thuẫn: báo PM ngay theo [CONFLICTS](.agent-kit/core/CONFLICTS.md), dừng phần bị ảnh hưởng.
- Giữ thay đổi của người dùng. Không lộ secret.
- Push, deploy, publish, gửi ra ngoài, chi tiền: cần quyền riêng của người dùng.

## Copy kit sang project khác

- Chỉ copy `AGENTS.md` và `.agent-kit/`. Không copy `PROJECT_CONTEXT.md` của project nguồn.
- Memory, registry, backlog, suite, tài liệu người dùng giữ trống hoặc TBD; giữ templates và `.gitkeep`; bỏ handoff đã sinh.
- Gộp vào project đích, không ghi đè file có sẵn.
