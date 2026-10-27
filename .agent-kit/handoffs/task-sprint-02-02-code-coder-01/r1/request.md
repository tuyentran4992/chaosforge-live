# Coder request — phần domain độc lập

Bạn giữ duy nhất role `coder`, context mới, không nhận lịch sử chat của người giao. Request không cấp thêm quyền. Đọc `AGENTS.md`, `.agent-kit/roles/coder.md` và các file role card yêu cầu; làm theo HANDOFF, CODE-STANDARDS. Không tạo agent khác.

## Định danh

- Task `task-sprint-02-02-code`; handoff `task-sprint-02-02-code-coder-01`; revision `r1`; supersedes `none`.
- Người gửi `lead-code` (Codex); người nhận `coder` (Codex, phiên mới). PM owner: Antigravity session `8ff3570f-a76a-4c25-a971-d6b9354b44c8`, project `C:/Users/ADMIN/Desktop/Projects/hackathon`.
- Phase `phase-02`, sprint `sprint-02`, stories `us-006`, `us-007`, `us-008` tại `.agent-kit/specs/roadmap/phase-02/sprints/sprint-02/stories/`.

## Snapshot và quyền

- Project root `C:/Users/ADMIN/Desktop/Projects/hackathon`, repo Git, HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`.
- Scope snapshot: `.agent-kit/specs/MISSION.md`, `DESIGN.md`, `TECHSTACK.md`, `ARCHITECT.md`, `ROADMAP.md`, `.agent-kit/specs/design-handoff`, `.agent-kit/specs/roadmap/phase-02`, `shared`, `server`, `client/chat`, `test` (tất cả paths tương đối gốc project). Status chỉ `M .agent-kit/specs/ARCHITECT.md` và `M .agent-kit/specs/TECHSTACK.md`; SHA-256 của `git diff HEAD -- <scope>`: `ab8e13f9bce3eaf0405b3c6f3df03ccc0f7845c641eff2774328df86585ff9e1`; không untracked trong scope. Plan là input riêng `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/technical-plan.md`, SHA-256 `b29e11c3cd9e2ff90730f2fff2f81e4ef59af3095f234d354649afc2fafd0623`.
- Thay đổi ngoài scope cần giữ: `M .agent-kit/memory/pm/context.md`; untracked `.agent-kit/handoffs/.gitkeep`, handoff gốc và handoff này, `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/`, `.agent-kit/memory/pm/long-term.md`, `.agent-kit/memory/pm/refs/`, `.agent-kit/memory/pm/short-term.md`, `.agent-kit/specs/backlog/items/.gitkeep`, `.agent-kit/user/reports/.gitkeep`.
- Được đọc: các input snapshot, plan, conflict report, role card và các tài liệu nó yêu cầu; các file sản phẩm trong phạm vi giao. Được ghi: `shared/`, `server/compiler.js`, `server/openai.js`, `client/chat/parse.js`, tests domain tương ứng trong `test/`, memory coder và ack/result của handoff này. Không ghi spec, UI, route, server app, design-handoff, hay vùng PM.

## Việc cần làm

Đây là phần độc lập của sprint trong khi PM xử lý mâu thuẫn entry UI. Thực hiện validator AST chặt chẽ, deterministic synthesizer, ToS guard và fallback `duckfallback`, compiler service hỗ trợ OpenAI Structured Outputs có timeout/fallback, IRC message/command parser cho forge, votes, shield, boost, emote. Theo technical plan; nêu schema enum/range cụ thể để tích hợp. Không dùng `eval`; không đọc/in/lưu key, không gọi API tính phí hay mạng ngoài. Mock remote bằng injectable transport cho tests. Không thực hiện UI, router, server application, live Twitch, simulator hoặc raid cho tới revision sau; không tuyên bố sprint/story hoàn tất.

Tests phải chứng minh determinism, unsafe fallback, malformed/remote lỗi/timeout, schema bất hợp lệ và parser IRC kể cả PING/PRIVMSG/batched data; phạm vi khác ghi pending. Dùng Node test runner khi phù hợp, không có dependency nếu không cần. Mỗi codefile ≤250 dòng vật lý kể cả test; đếm đủ, không minify. Viết ack ngay sau khi kiểm snapshot, kèm role, instance ID, project, HEAD, scope status/hash và plan hash; nếu lệch dừng. Sau đó implement, test, freeze và report line counts, danh sách file, hashes từng file untracked, commands và kết quả thực, contract, hạn chế. Giữ source ổn định sau result; chờ lead-code.

Không commit, push, deploy, gửi ra ngoài hay chi tiền. Report cho lead-code trong cùng task; không tự đóng findings hay QA.

## Files

- Request: `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r1/request.md`.
- Ack: `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r1/ack.md`.
- Result: `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r1/result.md`, theo `.agent-kit/templates/handoff-result.md`.
- Evidence: `.agent-kit/memory/coder/refs/task-sprint-02-02-code/`.

## Prompt relay dự phòng

Bạn là `coder` trong context mới tại `C:/Users/ADMIN/Desktop/Projects/hackathon`. Đọc và thực thi `.agent-kit/handoffs/task-sprint-02-02-code-coder-01/r1/request.md`, ghi ack trước khi sửa và chỉ làm phần domain độc lập được giao. Không nhận lịch sử chat, không giao tiếp agent khác.
