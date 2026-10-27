# SPRINT — phase-02 / sprint-03

Trạng thái tài liệu: Đang mở (`in-progress`). ID: `sprint-03`, thuộc [phase-02](../../PHASE.md).

Sprint kind: `release-validation`. Delivery domains: `test`, `docs`. Story cap: 2 / `sprint.maxStories` (6, xem [CONFIG](../../../../../protocols/CONFIG.md)).
Pointer duyệt Sprint `code`: Đã duyệt tại [phase-02 / sprint-02](../sprint-02/SPRINT.md) (`done`).

## Mục tiêu và timebox

Mục tiêu sprint: Kiểm thử toàn diện E2E từ góc nhìn QA trên môi trường sạch độc lập, xác nhận toàn bộ 73 file mã nguồn tuân thủ tiêu chuẩn kỹ thuật (`us-009`); đồng thời chuẩn bị kịch bản quay video demo 2 phút chuẩn sân khấu TwitchCon San Diego và soạn thảo bộ tài liệu nộp bài Devpost hoàn chỉnh bằng tiếng Anh kèm **Primary Codex Session ID `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2`** (`us-010`) sẵn sàng cho việc nộp bài trước hạn chót **02/11/2026 lúc 2:00 PM PST**.
Timebox: Bắt đầu 2026-10-28; dự kiến hoàn tất trước hạn nộp bài.
Kết quả bàn giao: Báo cáo QA Release Verification Checklist, Kịch bản Video Demo 2 phút (từng giây kèm lời thoại), và Bộ nội dung nộp bài Devpost hoàn chỉnh; derive từ [us-009](stories/us-009.md) và [us-010](stories/us-010.md).

## Scope và phụ thuộc

Scope/out-of-scope cấp sprint:
- Scope: Kiểm thử cài đặt sạch, bảo mật secret, toàn vẹn 73 codefiles ≤ 250 dòng, kịch bản video demo 2 phút, và bộ tài liệu nộp bài Devpost bằng tiếng Anh.
- Out-of-scope: Không can thiệp sửa đổi các tính năng cốt lõi đã nghiệm thu ở Sprint 02 trừ khi phát hiện lỗi nghiêm trọng từ QA.
Phụ thuộc sprint/điều kiện đầu vào: Đã hoàn tất và nghiệm thu toàn bộ `phase-02 / sprint-02` ([SPRINT.md](../sprint-02/SPRINT.md) — `done`).

## Ordered story index

| Story | Thứ tự | Required trong sprint | Phụ thuộc | Trạng thái |
| --- | --- | --- | --- | --- |
| [us-009 — Kiểm thử E2E QA, Release Checklist & Xác minh Môi trường Sạch](stories/us-009.md) | 1 | Required | Đã duyệt [sprint-02](../sprint-02/SPRINT.md) | `todo` |
| [us-010 — Kịch bản Video Demo 2 Phút & Bộ Nội dung Nộp bài Devpost Hoàn chỉnh](stories/us-010.md) | 2 | Required | Phụ thuộc [us-009](stories/us-009.md) | `todo` |

## Acceptance tích hợp riêng

Tiêu chí tích hợp cấp sprint:
1. Báo cáo QA độc lập xác nhận 100% tiêu chí trong Release Checklist đạt PASS trên môi trường cài đặt sạch từ git clone/checkout mới.
2. Có kịch bản video demo 2 phút chi tiết từng giây (gồm Visual Screen Actions và Audio Voiceover tiếng Anh) bám sát tiêu chuẩn TwitchCon Stage Factor và 4 tiêu chí chấm điểm của cuộc thi.
3. Có bộ tài liệu nộp bài Devpost hoàn chỉnh 100% bằng tiếng Anh, chứa đầy đủ các phần bắt buộc, liên kết repo công khai, hướng dẫn chấm bài 1-click, và **Primary Codex Session ID `01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2`** kèm 3 Chat IDs phụ.

DESIGN contracts liên quan: [DESIGN](../../../../DESIGN.md). Mục đích tổng thể: [MISSION](../../../../MISSION.md).
Integration acceptance/evidence: TBD; chờ triển khai khi kích hoạt sprint.

## Delivery derived và evidence

Delivery summary: Đang mở (`in-progress`).
Story/findings chưa xong, limits và PM-authorized scope changes: `us-009` và `us-010` đang ở trạng thái `todo` (chưa điều phối agent làm việc theo yêu cầu của người dùng).
Đối soát yêu cầu/reports và điểm đến phần chưa xử lý: Theo dõi tại [ROADMAP](../../../../ROADMAP.md).
Tài liệu người dùng cần lưu/index pointer: Dashboard tại [user/dashboard/data.js](../../../../../user/dashboard/data.js).
Review/latest integrated verify pointers: TBD.
Git closure derived/evidence pointer: TBD.
