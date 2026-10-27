# Flow team Marketing

PM → Lead-Marketing → Researcher → brief → Marketer → một Marketing Reviewer → Lead-Marketing → PM.

Chỉ làm marketing: không sửa code, không giao việc cho QA hay hội đồng. Nhu cầu khác chuyển PM.

## Ai làm gì

| Role | Làm |
| --- | --- |
| Lead-Marketing | Kế hoạch: mục tiêu, audience, kênh, câu hỏi nghiên cứu, deliverables, acceptance; điều phối; verify cuối |
| Researcher | Nghiên cứu thị trường, khách hàng, đối thủ, kênh, chính sách; lập dossier có nguồn |
| Marketer | Viết nội dung và campaign từ brief; ghi mỗi claim dẫn tới nguồn nào |
| Marketing Reviewer | Độc lập kiểm fact, nguồn, độ mới, audience, thông điệp, brand, CTA, acceptance |

## Nguồn và độ mới

- Mỗi claim ghi theo [mẫu research](../templates/marketing-research.md): ID, nội dung, URL, ngày nguồn, ngày kiểm thực tế, phạm vi, giới hạn.
- Không có ngày thì ghi `unknown`, không bịa.
- Fact dễ đổi (giá, chính sách nền tảng, thị trường, đối thủ, số liệu): tra lại nguồn hiện hành lúc dùng; ưu tiên nguồn chính thức.
- Trí nhớ model hay report cũ không phải bằng chứng mới.
- Tách fact, suy luận, giả định. Nguồn mâu thuẫn: báo theo [CONFLICTS](../core/CONFLICTS.md).
- Mỗi claim có điều kiện kiểm lại riêng. Trước campaign mới: kiểm lại fact dễ đổi.
- Không tra được nguồn mới: `partial` hoặc `blocked`, liệt kê claim còn thiếu. Không gọi là "mới nhất".

## Các bước

1. Lead nhận brief từ PM: mục tiêu, audience, kênh, acceptance, fact sản phẩm đã duyệt, quyền.
2. Lead giao Researcher theo [DISPATCH](../protocols/DISPATCH.md). Claim chưa có nguồn thì để `pending`.
3. Lead chốt brief và dossier, giao Marketer. Phần độc lập có thể làm song song nhưng không biến giả định thành fact.
4. Marketer freeze bản asset. Lead giao một Reviewer, context mới.
5. Sửa nội dung: chính Marketer. Sửa fact: Researcher tạo dossier version mới. Chỉ sửa sau khi Reviewer xong hoặc dừng.
6. Reviewer kiểm lại phần bị ảnh hưởng trên bản mới.
7. Lead verify bản mới nhất so với acceptance và nguồn, trả PM.

## Quyền

- Mặc định chỉ tạo bản nháp và report.
- Đăng bài, gửi email, chạy ads, chi tiền, liên hệ bên ngoài: cần người dùng cho phép cụ thể. Config hay review sạch không cấp quyền này.
- Mẫu: [request](../templates/marketing-request.md), [result](../templates/marketing-result.md).
