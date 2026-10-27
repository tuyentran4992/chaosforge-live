# Kiến trúc code và giới hạn file

Dành cho Lead-Code, Coder, Code Reviewer. Quyết định kiến trúc riêng của project nằm ở [specs/ARCHITECT](../specs/ARCHITECT.md).

## Thiết kế

- Mỗi module hoặc file một trách nhiệm (SRP), tên nói rõ mục đích.
- Contract rõ: input, output, lỗi, chiều phụ thuộc. Đổi contract thì xét bên gọi.
- Theo cấu trúc có sẵn, ưu tiên giải pháp đơn giản. Không thêm abstraction phỏng đoán, không refactor phần không liên quan.
- Thiết kế hiện tại cản yêu cầu: Lead-Code nêu tradeoff trước khi làm.

## Tối đa 250 dòng mỗi codefile

- Áp dụng cho mọi file code do project viết: source, test, script, style, migration, config có logic.
- Đếm dòng vật lý, gồm dòng trống và comment.
- Không ghép dòng, minify hay xóa comment để lách giới hạn.
- File mới hoặc file đang sửa mà vượt giới hạn: tách theo trách nhiệm, giữ hành vi.
- File cũ ngoài scope bị vượt: báo, không tự refactor.
- Markdown và JSON dữ liệu thuần không phải codefile.
- File generated hay vendor: ghi rõ nguồn sinh, không sửa tay. Không gắn nhãn generated cho code tự viết để né giới hạn.

## Ai kiểm gì

1. Lead-Code ghi boundaries, contracts và line budget từng file trong plan.
2. Coder đếm dòng mọi file mới hoặc đã sửa, ghi số thực vào result.
3. Code Reviewer tự kiểm SRP, contracts và đếm lại; không dùng số của Coder.
4. Lead-Code kiểm lại trên bản tích hợp mới nhất.
