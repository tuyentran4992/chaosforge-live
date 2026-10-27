# QA regression result — {run-id}

- Caller/PM owner/project, request/ack: {verified}.
- Candidate/build/URL/env/config/data fingerprint: {actual tested product}.
- Suite ID/version + case manifest/hash: {actual read-only baseline}.
- Actual test time/tools/viewport/device coverage: {observed-or-unavailable}. Thiếu công cụ chạy thật: BLOCKED.
- Gate cài và khởi động sạch: {PASS/FAIL + lệnh thực chạy + evidence}. FAIL thì lượt chạy FAIL và dừng.
- Summary: {PASS/FAIL/BLOCKED}; required counts: {passed/failed/blocked/skipped/total}; không pass empty/TBD suite.

| Case ID | Nhóm | Actual steps | Expected/actual | PASS/FAIL/BLOCKED/SKIPPED | Evidence trong own refs | Lý do/issue |
| --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | TBD | TBD |

PASS không có evidence quan sát được thì ghi BLOCKED.
Exploratory (vùng, thời lượng, phát hiện): {bug và đề xuất case mới, không đổi suite}.
Limits/conflicts/bugs báo PM: {issue pointers, notification hoặc pending relay}.
Suite/source preserved: {hash/checks}; file QA tạo chỉ own memory: {paths}.
Readiness: {required cases all pass same candidate/suite hoặc release blocked}; QA không tự quyết release.
Bước tiếp: {PM quyết/fix/QA rerun trên build mới}; không kế thừa pass trước fix.
