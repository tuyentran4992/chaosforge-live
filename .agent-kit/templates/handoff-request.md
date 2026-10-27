# Request bàn giao — điền đủ trước khi gửi

Bạn giữ duy nhất role **{recipient-role}** trong task này, với context mới. Bạn không nhận lịch sử chat của người giao. Request này không cấp thêm quyền ngoài quyền người dùng đã cho.

Đọc [AGENTS.md]({runtime-AGENTS-path}), role card của bạn, rồi làm theo [HANDOFF]({runtime-path}/.agent-kit/core/HANDOFF.md).

## Định danh

- Task-id: {task-id}. Handoff-id: {handoff-id}. Revision: {n}. Supersedes: {none hoặc revision cũ}.
- Người gửi: {role, app}. Người nhận: {role, app, target hoặc phiên mới}.
- PM owner: {app, session, project; hoặc "không áp dụng" nếu người dùng giao thẳng}.
- Phase / sprint / story: {IDs và paths; hoặc "không áp dụng" cho task ad hoc}.

## Project và snapshot

- Project root: {path}. Repo: {remote không có credentials, hoặc "không có Git"}.
- Snapshot: `HEAD` {sha}; status của scope: {output}; sha256 diff: {hash}; file untracked: {path: sha256}.
- Thay đổi của người dùng đang có (ngoài scope, phải giữ nguyên): {git status}.
- Được đọc: {paths}. Được ghi: {paths}.

## Việc cần làm

- Mục tiêu: {kết quả cụ thể}.
- Scope và ngoài scope: {ranh giới}. Câu hỏi mở: {nếu có}.
- Acceptance: {tiêu chí quan sát được hoặc pointer tới story}.
- Plan kỹ thuật: {pointer plan của Lead-Code; request của PM ghi "chưa áp dụng"}.
- Checks và evidence cần trả: {...}.
- Quyền và giới hạn: {...}. Không commit, push hay gửi ra ngoài nếu chưa được cấp quyền.

## Nơi ghi kết quả

- Request (chỉ đọc): {path}
- Ack (bạn ghi): {path}
- Result (bạn ghi, theo [mẫu]({runtime-path}/.agent-kit/templates/handoff-result.md)): {path}
- Evidence: {path trong refs của bạn}

## Chỉ dùng khi giao reviewer

- Domain: {code: đúng sai, contract, tests, 250 dòng | UX/UI: giao diện và flow chạy thật}.
- Snapshot chung của cả hai reviewer: {cùng giá trị cho cả hai}.
- Chạy: {song song hoặc lần lượt, trạng thái thực}.
- Chỉ đọc nguồn. Tự review trước, không dựa vào kết luận của Coder hay reviewer kia. Làm theo [quy tắc review]({runtime-path}/.agent-kit/flows/CODE.md#quy-tắc-review).
