# Specs và kế hoạch sản phẩm

PM sở hữu specs và kế hoạch. Lead-Code đề xuất phần kỹ thuật (TECHSTACK, ARCHITECT) và chỉ ghi phần được giao.

## Năm file specs

| File | Chứa | Không chứa |
| --- | --- | --- |
| [MISSION](../specs/MISSION.md) | Mục đích, vấn đề, người dùng, mục tiêu, scope, thước đo | Công nghệ, roadmap |
| [TECHSTACK](../specs/TECHSTACK.md) | Công nghệ, phiên bản, ràng buộc, lệnh đã xác minh | Kiến trúc |
| [ARCHITECT](../specs/ARCHITECT.md) | Thành phần, ranh giới, API contracts, data model, luồng dữ liệu | Stack, trải nghiệm |
| [DESIGN](../specs/DESIGN.md) | Hành vi và UX dùng chung: flows, states, validation, accessibility | Kiến trúc, acceptance riêng của story |
| [ROADMAP](../specs/ROADMAP.md) | Danh sách phase, thứ tự, pointer đang active | Chi tiết sprint, task kỹ thuật |

- Mỗi thông tin chỉ ở một nơi; file khác link tới section.
- Tách rõ: đề xuất, TBD, quyết định đã chốt. Không viết giả định thành quyết định.
- Project có sẵn tài liệu: giữ và cập nhật phần liên quan. Sửa bug nhỏ không bắt viết đủ cả bộ.
- Specs lệch code: nêu ra và xử lý trước khi dựa vào.
- Đổi spec khi task đang chạy: gửi revision mới qua coordinator, không âm thầm đổi.

## Phase → Sprint → Story

| Cấp | Path | Sở hữu |
| --- | --- | --- |
| Phase | `specs/roadmap/{phase-id}/PHASE.md` | Mục tiêu, scope, phụ thuộc, danh sách sprint |
| Sprint | `.../sprints/{sprint-id}/SPRINT.md` | Mục tiêu, timebox, danh sách story, acceptance tích hợp |
| Story | `.../stories/{story-id}.md` | "Là… tôi muốn… để…", scope, acceptance, pointer DESIGN, delivery, evidence |

- Chia theo giá trị và nghiệp vụ, không theo file hay task kỹ thuật.
- Story là nguồn chuẩn của acceptance và delivery. Sprint, phase, roadmap chỉ tóm tắt từ cấp dưới.
- ID ổn định sau khi chốt. Đổi thứ tự không đổi tên. Chuyển story phải có quyết định PM và giữ trace.
- ID mẫu (`phase-01`, `sprint-01`, `us-001`) là template TBD.
- Request và result ghi phase, sprint, story IDs. Task ad hoc ghi "không áp dụng".
- File hay evidence chưa có: ghi TBD bằng chữ, không tạo link giả. Không bịa ngày hay trạng thái.
- Plan kỹ thuật ở refs của Lead-Code; plan marketing ở refs của Lead-Marketing; lượt QA ở refs của QA.

## Ba cổng bắt buộc

1. **Tối đa `sprint.maxStories` story mỗi sprint** (mặc định 6, xem [CONFIG](../protocols/CONFIG.md)), tính cả optional. Story vượt giới hạn sang sprint mới trước khi bàn giao. Không gộp thành story khổng lồ để lách. Case QA và task kỹ thuật không phải story.
2. **Có UI phải có sprint `design`** phủ các story đó, đạt và được PM duyệt trước khi sprint `delivery` code UI ([mẫu](../templates/design-sprint.md)). Sprint `design` nằm trong phase bình thường, không phải một phase riêng. Chưa rõ có UI hay không thì PM làm rõ, không tự ghi "không UI".
3. **Trước release có sprint nghiệm thu** (`release-validation`): QA chạy suite trên release candidate thật theo [QA](../flows/QA.md). Thiếu case required PASS thì release `blocked`.

Mỗi sprint ghi loại: `delivery` (nêu domain code/marketing), `design` hoặc `release-validation`.

## Nghiệm thu

- PM nghiệm thu từng story bằng evidence đúng loại, theo bảng trong [SPRINT-CLOSURE](../protocols/SPRINT-CLOSURE.md).
- Giao việc, có plan, review sạch hay build pass đều chưa phải accepted.
- Chỉ đóng sprint khi mọi story required accepted (hoặc PM duyệt đổi scope) và acceptance tích hợp đạt.
- Finding chưa xử lý phải hiện rõ, không giấu trong tóm tắt.
