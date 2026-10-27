# QA activation — {run-id}

- Kích hoạt bởi: {PM hiện hữu hoặc người dùng}; bằng chứng intent/authority: {actual request/context pointer}.
- PM owner persistent/project/repo metadata: {verified}; không nhận sender Lead-Code/team khác.
- Sprint nghiệm thu/release ID và scope: {actual-or-ad-hoc}; QA nằm ngoài dev sprint loop.
- Candidate: {deployed URL/API/binary, build/version/commit fingerprint, lệnh cài và khởi động}; môi trường/config/test data: {actual}.
- Fixed suite path/version/approval + index/case hashes: {exact manifest}; required cases: {complete baseline list}; có nhóm cài/khởi động sạch.
- Exploratory: {vùng vừa đổi, thời lượng tối đa}.
- Read-only source/specs/harness/input scope: {allowed}; quyền tương tác test product: {explicit}.
- Own QA memory root: {canonical .agent-kit/memory/qa}; ack/report/evidence: {unique paths under own refs/run-id}.
- Preconditions/access/tools và cleanup đã duyệt: {actual}; thiếu thì blocked, không sửa suite.
- Return trực tiếp PM/user existing owner và conflict route: {actual-or-pending-relay}.

Chạy đúng suite trên sản phẩm thực, không source-only review. Không writes ngoài own memory, thay scenarios, tạo agent, sửa code hoặc tự release.
