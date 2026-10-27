# Tổng hợp chi tiết Hội đồng Cố vấn — `run-us-001-01` (`task-us-001-council-01` / `r1`)

## 1. Kiểm chứng tính hợp lệ và độc lập của các thành viên
- **Snapshot Product Input (Khớp 100% ở cả 4 thành viên & `council-lead`):**
  - `.agent-kit/specs/MISSION.md` — SHA256: `7234FFBBB6008FA3FE2719A1C8AB959925E62209A8DD8FA636761ECC479E4E7B`
  - `.agent-kit/specs/roadmap/phase-01/sprints/sprint-01/stories/us-001.md` — SHA256: `EB383ED563DC3824243CD1CCCC437CE2391F731202DFE02593C9F66CA98EFCFE`
- **Danh sách Ack & Result đã thu thập:**
  1. `sp-hackathon-strategist` (`council-specialist`): [ack](../../../handoffs/task-us-001-council-01-sp1/r1/ack.md) (`confirmed`), [result](../../../handoffs/task-us-001-council-01-sp1/r1/result.md) (`completed`).
  2. `sp-twitch-product` (`council-specialist`): [ack](../../../handoffs/task-us-001-council-01-sp2/r1/ack.md) (`confirmed`), [result](../../../handoffs/task-us-001-council-01-sp2/r1/result.md) (`completed`).
  3. `sp-ai-feasibility` (`council-specialist`): [ack](../../../handoffs/task-us-001-council-01-sp3/r1/ack.md) (`confirmed`), [result](../../../handoffs/task-us-001-council-01-sp3/r1/result.md) (`completed`).
  4. `user-twitch-streamer-viewer` (`council-user` — mô phỏng): [ack](../../../handoffs/task-us-001-council-01-u1/r1/ack.md) (`confirmed`), [result](../../../handoffs/task-us-001-council-01-u1/r1/result.md) (`completed`).

## 2. Phân tích Đồng thuận, Bất đồng và Phân xử của `council-lead`

### A. Điểm đồng thuận rất cao (4/4 thành viên hội tụ độc lập)
1. **Loại bỏ ngay hướng "Chatbot Twitch / Tóm tắt Chat đơn thuần":** Cả 3 specialist và user persona mô phỏng đều chỉ ra rằng một chatbot văn bản thông thường sẽ thất bại nặng nề ở tiêu chí *Innovation*, *Design* và không thể hiện được bản sắc của **OpenAI Codex** trên sân khấu TwitchCon San Diego.
2. **Sự hội tụ độc lập vào Ý tưởng Số 1 — "Crowd-Coded Live Stream Game & Overlay Mutator" (`Codex Chaos Foundry` / `ChaosForge Live` / `Chaos Codex`):**
   - Khán giả Twitch gõ ý tưởng vào Chat (`!forge <ý tưởng>`), bình chọn nhanh, và **OpenAI Codex** đóng vai trò **Live Game/Rule Compiler** biến ý tưởng thắng cuộc thành cơ chế vật lý, Boss, luật chơi hoặc mini-game chạy trực tiếp trên **OBS Browser Source Overlay** (kèm cửa sổ *Codex Live Compiler/Patch Notes* hiển thị trực quan trên màn hình).
3. **Bắt buộc có "AI Twitch Crowd Simulator" (Giải quyết bài toán Cold-Start / Solo Judge):**
   - Cả 4 thành viên đều nhấn mạnh: Khi giám khảo chấm bài một mình hoặc khi demo nhanh, sẽ không có 500 viewers thật đang chat. Sản phẩm bắt buộc phải có nút **`[🔥 Simulate 500 Twitch Chatters / Hype Raid]`** ngay trên Dashboard để tự bơm luồng chat, emote spam, poll vote và sự kiện Twitch giả lập chạy qua đúng pipeline thật.
4. **Tuân thủ yêu cầu bắt buộc `Codex Session ID` (`/status`):**
   - Bắt buộc duy trì luồng làm việc trên OpenAI Codex chính thức và lưu lại `Codex Session ID` từ lệnh `/status` để nộp trên Devpost.

### B. Điểm khác biệt / Bất đồng giữa các thành viên & Cơ sở phân xử của `council-lead`
1. **Cách thực thi "Codex Live Compilation" ở Runtime (Giữa `sp-twitch-product` và `sp-ai-feasibility`):**
   - *Bất đồng:* `sp-twitch-product` đề xuất cho Codex sinh đoạn mã JS/Canvas (~40-80 dòng) chạy trong iframe sandbox kèm AST check; trong khi `sp-ai-feasibility` và `sp-hackathon-strategist` cảnh báo việc sinh JS tự do ở runtime có rủi ro trễ (5-15 giây) hoặc lỗi logic, nên đề xuất kiến trúc **Hybrid Declarative DSL / Structured JSON AST + Safe Custom Renderer** (kết hợp ~20-25 nguyên tử vật lý Matter.js, hạt, âm thanh WebAudio synth và luật xử lý lệnh chat).
   - *Phân xử của `council-lead`:* Chọn kiến trúc **Hybrid Declarative DSL + Visual Live Code Diff** của `sp-ai-feasibility` & `sp-hackathon-strategist`. Cụ thể:
     - **Ở Build-time:** Dùng **OpenAI Codex CLI/Agent** (có `/status` Session ID) để lập trình toàn bộ hệ thống Host Engine (2D Physics, Procedural Audio, Twitch EventSub/IRC Bridge, Crowd Simulator).
     - **Ở Run-time:** Khi Chat đề xuất ý tưởng, OpenAI API (Structured Outputs) vừa sinh ra **Executable Rule/Physics AST** (đảm bảo 100% không bao giờ crash, thực thi trong `< 2.5 giây`), vừa hiển thị đoạn **Readable Codex Patch Script** trên cửa sổ *Codex Live Terminal* của OBS Overlay để giám khảo và khán giả nhìn thấy rõ "phép thuật sinh code" của Codex mà vẫn an toàn tuyệt đối!
2. **Xếp hạng giữa Nhánh 2 (Streamer Collaboration — `RaidForge / Co-Stream Clash`) và Nhánh 3 (Content Enhancements — `LoreWeaver / StreamPulse`):**
   - *Khác biệt:* `sp-hackathon-strategist`, `sp-twitch-product` và `sp-ai-feasibility` đều xếp **Streamer Collaboration (`RaidForge / RaidClash`)** ở **Top 2** vì tính đối kháng sân khấu cao hơn; trong khi `council-user` (mô phỏng) xếp **Content Enhancements (`StreamPulse / Live Lore Overlay`)** ở **Top 2** và `Co-Stream Arena` ở **Top 3** vì đa số thời gian streamer ngồi live một mình (solo stream) nên ít có dịp ghép cặp với streamer khác.
   - *Phân xử của `council-lead`:* Ghi nhận cảnh báo rất thực tế của `council-user` (mô phỏng). Do đó, trong bảng xếp hạng chung:
     - **Top 1 (`Codex Chaos Foundry / ChaosForge Live`)** tích hợp luôn một chế độ tùy chọn **"Raid / 2-Streamer Versus Room"** (hoặc AI Rival Streamer khi solo) để vừa ăn trọn điểm *Audience Participation + Content Enhancements*, vừa chạm vào *Streamer Collaboration* mà không bị phụ thuộc bắt buộc vào 2 streamer thật.
     - **Top 2 (`RaidClash Arena — Co-Stream & Raid Showrunner`)** giữ vị trí số 2 cho hướng chuyên biệt về *Streamer Collaboration* (kèm bắt buộc chế độ *"AI Rival Streamer"* để giải quyết nỗi lo solo của user persona).
     - **Top 3 (`LoreWeaver Live — Autonomous Broadcast Producer & Tabletop RPG/Lore HUD`)** đại diện cho hướng *Content Enhancements* chuyên sâu.
