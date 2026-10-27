# Tài liệu cho người dùng

Người dùng cần một chỗ đọc lại thông tin quan trọng mà không phải mở chat hay memory của agent. Entrypoint: [user/README.md](../user/README.md). PM biên tập; đây không phải role hay memory.

## Lưu gì

- Kết quả sprint hoặc mốc quan trọng.
- Quyết định kèm lý do và tác động.
- Việc hoãn, rủi ro, blocker người dùng cần biết.
- Hướng dẫn dùng hoặc vận hành đã xác minh.

Không lưu mọi tin nhắn, tiến độ lặp lại hay dump kỹ thuật. Không tạo báo cáo rỗng cho đủ thủ tục.

## Lưu ở đâu

- `user/reports/`: mỗi file một kết quả hoặc chủ đề, tên có ngày và ID. Nhiều thì chia theo năm hoặc phase.
- `user/guides/`: mỗi file hướng dẫn một tác vụ.
- `user/dashboard/`: trang tổng quan (xem mục Dashboard bên dưới).
- Cập nhật mục lục trong `user/README.md` mỗi lần thêm file.

## Viết thế nào

- Mỗi file báo cáo **tối đa 50 dòng**, tính cả dòng trống. Dài hơn thì tóm tắt, link nguồn hoặc tách file. Không nhồi nhiều ý vào một dòng để lách.
- Theo [mẫu](../templates/user-report.md): ngày, phạm vi, điều cần quyết, điều mới dùng được, lỗi hoặc rủi ro, việc tiếp theo, nguồn chuẩn.
- Viết bằng ngôn ngữ của người dùng. Nội dung chính phải hiểu được ngay, không bắt người đọc mở memory.
- Link nguồn chuẩn (specs, story, backlog, Git), không chép lại toàn bộ.
- Ghi mốc thời gian để báo cáo cũ không bị hiểu thành trạng thái hiện tại.
- Không lưu secret, dữ liệu cá nhân, raw log hay full chat.

## Quyền

- Chỉ PM ghi toàn bộ `user/` (báo cáo, hướng dẫn, dữ liệu và code trong `user/dashboard/`). Không ghi đè phần người dùng tự sửa.
- Báo cáo lưu không thay cho báo cáo chat. Việc cần báo ngay thì vẫn báo ngay.
- Hội đồng không được đọc thư mục này chỉ vì nó tồn tại; chỉ nhận bản đã lọc code.

## Report chat

Viết từ góc nhìn của người dùng, không kể quy trình. Mỗi mục chỉ có khi có nội dung, theo thứ tự:

1. **Cần anh quyết:** câu hỏi, khuyến nghị của PM, hậu quả của từng lựa chọn.
2. **Anh làm được gì mới:** hành vi mới và cách tự thử.
3. **Lỗi hoặc rủi ro anh sẽ gặp:** nói bằng triệu chứng, không nói tên file.
4. **Tiếp theo:** việc kế và điều người dùng sẽ thấy ở lần báo sau.
5. **Dòng cuối:** hash đã kiểm hoặc blocker, link dashboard và báo cáo chi tiết.

Tối đa `sprint.reportMaxLines` dòng; mở rộng khi người dùng hỏi. Không để hash, ID nội bộ hay pointer ở phần chính.

## Dashboard

- `user/dashboard/index.html`: trang tổng quan tương tác 3D/2D (văn phòng ảo các agent + HUD dự án), mở trực tiếp bằng trình duyệt, không cần server hay cài đặt. Dashboard dẫn vào báo cáo, story và backlog; không chép nội dung báo cáo.
- PM trực tiếp sở hữu `user/dashboard/`: cập nhật `data.js` và tự chỉnh sửa code giao diện trong `user/dashboard/` cho khớp với dự án và kết quả từng sprint. Mỗi file trong `user/dashboard/` giữ tối đa 250 dòng.
- Cập nhật `user/dashboard/` khi đóng sprint, có việc cần quyết, có lỗi hoặc rủi ro mới, có kết quả QA, hoặc đổi backlog. Ghi `updatedAt` là thời điểm thật.
- Mỗi mục có `link` trỏ tới nguồn chuẩn (báo cáo, story, backlog). Số liệu lấy từ nguồn đó và đối soát trước khi ghi; không bịa số, không ghi trạng thái chưa xác minh.
- Dữ liệu cũ hơn 7 ngày hoặc chưa có thì dashboard tự cảnh báo.
- Bản mẫu để rỗng; field và giá trị hợp lệ ghi ở đầu `data.js`.
