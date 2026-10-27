# QA regression suite

Status: TBD — mẫu chưa approved, chưa có scenarios thực.
Suite ID/version: TBD.
Product/behavior baseline và PM/owner approval: TBD.
Mục đích: một bộ kịch bản hồi quy ổn định trên sản phẩm cuối; chỉ owner cập nhật khi sản phẩm đổi, QA read-only. QA có thể đề xuất case, PM duyệt rồi tăng version.

## Ordered case index

Chưa có case thực. Tạo từ mẫu qa-scenario tại project đích khi sản phẩm/acceptance đã rõ; không tính mẫu TBD thành case/pass.

Nhóm 1 (cài và khởi động sạch) bắt buộc có và chạy trước. Các nhóm: 1 cài/khởi động, 2 hồi quy, 3 hành trình xuyên tính năng, 4 dữ liệu/trạng thái, 5 đường lỗi, 6 ma trận môi trường. Chi tiết ở [QA](../../flows/QA.md#sáu-nhóm-việc-của-qa).

| Case ID | Nhóm | Path | Required | Product acceptance pointer |
| --- | --- | --- | --- | --- |

## Điều kiện và thay đổi

Environment/test data/cleanup đã duyệt: TBD.
Lệnh cài/khởi động và URL/endpoint chính của candidate: TBD.
Change reason/product requirement trace/version history: TBD.
QA run results nằm trong own memory của QA, không ghi vào suite/cases.
