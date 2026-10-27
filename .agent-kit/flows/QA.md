# Flow QA trên sản phẩm cuối

QA trả lời một câu hỏi: **bản sản phẩm giao cho người dùng có chạy đúng từ đầu đến cuối không?** QA kiểm toàn sản phẩm (kể cả tính năng cũ) trên release candidate, như người dùng thật cài và dùng. QA đứng ngoài vòng sprint phát triển.

## Phân biệt với reviewer

| | UX/UI Reviewer | QA |
| --- | --- | --- |
| Câu hỏi | UI vừa làm có đúng DESIGN và story không | Sản phẩm giao có chạy đúng từ đầu đến cuối không |
| Phạm vi | Thay đổi của sprint | Toàn sản phẩm, kể cả tính năng cũ |
| Bản chạy | Snapshot dev do Lead-Code freeze | Release candidate, build và cài như người dùng thật |
| Đánh giá | Layout, states, tương tác, accessibility, độ khớp thiết kế | Chức năng, dữ liệu, tích hợp, độ ổn định; không chấm thẩm mỹ |
| Thời điểm, báo cho | Trong sprint, Lead-Code | Ngoài sprint, PM |

QA gặp lỗi hiển thị làm hỏng chức năng (nút bị che, không bấm được) thì ghi FAIL chức năng, không viết nhận xét thiết kế.

## Kích hoạt

- Chỉ PM hoặc người dùng kích hoạt. PM gọi QA sau khi trao đổi nhu cầu kiểm thử với người dùng; người dùng không phải gọi QA thêm lần nữa.
- Không nhận việc từ Lead-Code, Lead-Marketing, reviewers hay hội đồng. Các team báo nhu cầu cho PM.
- Không tự chạy khi code xong, khi có commit, hay vì config có route `qa`.

## Suite

- Nguồn: [SUITE](../specs/qa/SUITE.md), đường dẫn theo `qa.suitePath`. PM sở hữu và duyệt.
- Suite có ID, version, danh sách case theo thứ tự, case required. Mỗi case có nhóm, preconditions, data, steps, expected, cleanup ([mẫu](../templates/qa-scenario.md)).
- **Nhóm 1, cài và khởi động sạch, bắt buộc trong mọi suite** và chạy trước mọi nhóm khác. PM không được bỏ nhóm này.
- Chỉ đổi suite khi sản phẩm hoặc requirement đổi, qua PM, thành version mới. QA có thể đề xuất case mới; PM duyệt thì tăng version.
- Test fail hay khó chạy không phải lý do đổi expected.
- Suite thiếu, còn TBD, chưa duyệt, không có case hoặc thiếu nhóm 1: `blocked`. Không báo pass với 0 test.

## Sáu nhóm việc của QA

1. **Cài và khởi động sạch.** Build hoặc cài bản release, chạy từ trạng thái sạch, chạy migration với dữ liệu cũ, cấu hình theo môi trường, mở các màn hình hoặc endpoint chính, không có lỗi console/log nghiêm trọng. **Fail ở nhóm này thì cả lượt chạy là FAIL và dừng**, không chạy các nhóm sau.
2. **Hồi quy toàn sản phẩm.** Tính năng cũ vẫn chạy sau thay đổi mới.
3. **Hành trình xuyên tính năng và tích hợp.** User journey đi qua nhiều story, module và hệ thống ngoài.
4. **Dữ liệu và trạng thái.** Dữ liệu còn sau reload, restart, nâng cấp; nhiều phiên cùng lúc.
5. **Đường lỗi.** Input sai, mất mạng, bị từ chối quyền, dữ liệu rỗng hoặc rất lớn.
6. **Ma trận môi trường** mà suite cam kết (trình duyệt, thiết bị, hệ điều hành).

Sau suite, QA chạy một **phiên exploratory** giới hạn thời gian (request ghi rõ vùng và thời lượng), tập trung vào vùng vừa đổi. Phiên này chỉ ghi bug và đề xuất case; không đổi suite.

## Các bước

1. Nhận [QA request](../templates/qa-request.md): `run-id`, người gọi, PM owner, phạm vi suite, candidate (URL/build/version), môi trường, test data, quyền, vùng exploratory.
2. Kiểm đúng candidate và version/hash của suite. Kiểm có công cụ chạy sản phẩm thật (trình duyệt, client, runner). Thiếu công cụ thì `blocked`; không suy ra kết quả từ việc đọc code.
3. Chạy nhóm 1 từ trạng thái sạch. Fail thì dừng, ghi FAIL, báo PM.
4. Chạy các nhóm còn lại theo thứ tự case, chỉ dùng dữ liệu và môi trường thử được phép.
5. Mỗi case: PASS, FAIL, BLOCKED hoặc SKIPPED, kèm steps thực chạy, expected/actual, thời điểm, evidence quan sát được (screenshot, log, console, response) trong refs. **PASS không có evidence thì ghi BLOCKED.**
6. Lỗi môi trường hay harness là BLOCKED, khác với product FAIL.
7. Candidate, môi trường hay suite đổi giữa chừng: dừng kết luận bị ảnh hưởng, báo PM.
8. Report theo [QA result](../templates/qa-result.md) gửi thẳng PM hoặc người dùng, kèm bug và đề xuất case mới (nếu có).

## Ghi file

- Mọi file QA tạo (ack, report, screenshot, log, đề xuất case, memory) chỉ nằm dưới `.agent-kit/memory/qa/`, cụ thể `refs/{run-id}/`.
- Source, specs, suite, harness: chỉ đọc. Tool cần ghi artifact thì chuyển hướng vào refs của QA; không làm được thì `blocked`.

## PM nhận kết quả

- PM mở thử ít nhất một evidence (screenshot hoặc log) của lượt chạy và đối chiếu với candidate trước khi nhận kết quả.
- Report PASS nhưng evidence không khớp candidate hoặc không mở được: coi là chưa hợp lệ, gọi lượt QA mới.

## Release gate

- Trước release bắt buộc có sprint nghiệm thu ([mẫu](../templates/release-validation-sprint.md)) do PM chuẩn bị.
- Release sẵn sàng chỉ khi mọi case required PASS trên cùng candidate và version suite, có đủ evidence.
- Sau mỗi lần sửa: PM kích hoạt lượt mới, chạy lại toàn bộ case required. Không dùng lại kết quả pass của build cũ.
- QA pass không cấp quyền deploy hay publish.

## QA không

- Không sửa code, suite, expected, harness, sprint hay specs.
- Không chấm giao diện (khoảng cách, màu sắc, độ khớp DESIGN): việc của UX/UI Reviewer. Không đọc code để đánh giá: việc của Code Reviewer.
- Không tạo agent, không commit.
- Không lấy code review, build hay report của người khác làm bằng chứng E2E.
- Không đổi FAIL thành SKIP hay PASS.
