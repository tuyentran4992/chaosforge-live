# Đóng sprint và commit

Chỉ dùng cho sprint thực đã được nghiệm thu. Cập nhật kit, task ad hoc hay template không kích hoạt commit. Người dùng đã cho PM quyền commit cuối sprint thực; không hỏi lại mỗi sprint. Push, deploy, publish vẫn cần quyền riêng.

## Điều kiện trước khi đóng

| Loại sprint | Evidence bắt buộc |
| --- | --- |
| delivery / code | Lead-Code verify bản mới nhất, kèm report của Code Reviewer và UX/UI Reviewer trên cùng snapshot |
| delivery / marketing | Bản mới nhất của Lead-Marketing, dossier nguồn hiện hành, report của Marketing Reviewer |
| design | Output thiết kế và PM duyệt |
| release-validation | QA chạy suite cố định trên candidate cuối, mọi case required PASS |

- Mọi story required đã accepted, hoặc có thay đổi scope do PM duyệt rõ.
- Acceptance tích hợp của sprint đạt.
- Đã đối soát backlog: việc chưa xong có điểm đến và đã báo người dùng.
- Tài liệu người dùng cần lưu đã viết xong, mỗi báo cáo ≤ 50 dòng, và `user/dashboard/` đã được PM cập nhật khớp với sprint.
- Thiếu một điều kiện: ghi blocker, chưa đóng.

## Các bước

1. Cập nhật delivery tại từng story. Sprint, phase, roadmap chỉ tóm tắt từ story.
2. Đọc lại config. `autoCommit: false` thì báo chờ commit thủ công và dừng ở đây.
3. Tạo `intent.md` tại `.agent-kit/memory/pm/refs/{task-id}/closure/{closure-id}/`, gồm:
   - IDs, `HEAD` hiện tại (parent dự kiến).
   - Danh sách path và hunk thuộc sprint.
   - `git status` hiện có của người dùng.
   Kiểm chưa có commit nào của lần chạy trước cho sprint này.
4. Kiểm index trước khi stage. Có thay đổi đã stage không thuộc sprint: chỉ tiếp tục nếu tách chính xác được; không thì báo blocker.
5. Stage đúng path và hunk của sprint. Không `git add .`; không unstage, revert hay reset việc của người dùng.
6. Xem staged diff: đúng bản đã review và verify, không secret, không thay đổi lạ. Có code đổi sau review: trả Lead-Code kiểm lại trước.
7. Commit một lần bằng `sprint.messageTemplate`, điền IDs thật. Dùng quoting an toàn, giữ hooks.
8. Xem commit thật (hash, parent, diff) so với intent. Kiểm thay đổi ngoài sprint của người dùng còn nguyên.
9. Ghi `receipt.md` cùng thư mục: hash, kết quả đối chiếu, pointer evidence. Receipt và intent không đưa vào commit.

## Không

- Không commit rỗng, không commit trùng, không amend hay rewrite, không push.
- Không bypass hook, không đổi Git identity, không `git init`, không bịa hash.
- Không sửa code sản phẩm trong lúc đóng sprint (ngoài việc cập nhật `user/`). Cần sửa code sản phẩm thì trả Lead-Code.
- Hook hoặc commit lỗi: báo blocker, giữ evidence, closure vẫn `pending`.
- Không ghi hash của commit vào chính commit đó.

## Resume

Phiên sau đọc story, intent, receipt rồi kiểm Git thật. Thấy intent mà không có receipt: theo [GIT-RECOVERY](GIT-RECOVERY.md).

## Report

- Tối đa `sprint.reportMaxLines` dòng, theo thứ tự ở [USER-DOCS](../planning/USER-DOCS.md#report-chat): cần quyết, điều mới dùng được, lỗi và rủi ro, tiếp theo; hash đã kiểm hoặc blocker và link backlog ở dòng cuối.
- Delivery đạt nhưng chưa commit: nói rõ "closure pending".
- Report ngắn không được giấu findings.
