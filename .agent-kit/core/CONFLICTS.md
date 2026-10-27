# Báo mâu thuẫn tài liệu

Mâu thuẫn là hai nội dung hiện hành, cùng phạm vi, không thể cùng đúng: fact, chỉ dẫn, scope, acceptance hoặc identity. Nội dung đã ghi rõ là lịch sử hoặc superseded không tính.

## Khi phát hiện

1. Chỉ xét file đang đọc trong quyền; không đi tìm thêm, không mở code ngoài quyền.
2. Ghi report theo [mẫu](../templates/conflict-report.md) vào refs của mình: hai nguồn (path, section), tác động.
3. Báo PM ngay, đồng thời báo coordinator của mình. QA báo thẳng PM.
4. Không gửi được: tạo prompt, báo `pending PM relay`.
5. Ảnh hưởng quyền, dữ liệu, scope, acceptance: dừng phần đó, làm tiếp phần độc lập.
6. Trong lúc chờ, theo chỉ dẫn có thẩm quyền cao hơn.

## PM xử lý

- Báo người dùng ngay ở cập nhật gần nhất: ở đâu, ảnh hưởng gì, phần nào dừng, cần quyết định gì.
- Lưu evidence ở refs của PM, tạo hoặc link [backlog item](../planning/BACKLOG.md).
- Gộp báo trùng, nhưng vẫn báo lần đầu và mỗi tác động mới.
- Vượt quyền: xin người dùng quyết định. Trong quyền: giao đúng owner sửa nguồn chuẩn.
- Chỉ đóng khi các file đã nhất quán và phần bị ảnh hưởng đã kiểm lại.

## Không

- Không tự chọn một bản hay sửa file để che mâu thuẫn.
- Không chờ report cuối mới báo.
- Coordinator không tự phân xử rồi giấu khỏi PM.
- Không coi im lặng là đồng ý.
