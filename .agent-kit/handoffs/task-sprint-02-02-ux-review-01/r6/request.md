# UX/UI Reviewer recheck — r6

Tiếp tục role `ux-ui-reviewer` instance `/root/ux_reviewer`; task `task-sprint-02-02-code`, handoff `task-sprint-02-02-ux-review-01/r6` supersedes `r5`. Project `c:/Users/ADMIN/Desktop/Projects/hackathon`; PM owner Antigravity `8ff3570f-a76a-4c25-a971-d6b9354b44c8`. Không sửa nguồn.

## Input Snapshot
- Tự kiểm `.agent-kit/memory/lead-code/refs/task-sprint-02-02-code/freeze-r7.md`, HEAD `5f7b2d31b6d765725b32745632e63d43e55d0b97`, tracked status/diff (`a6bc0f28c08d8afb4f6e307467c24bef4990bd4c4d8bc99b7360796ef2d8206a` trên 10 file specs) và 72 paths/hashes trong `.agent-kit/memory/coder/refs/task-sprint-02-02-code/evidence-r7.md`.
- Ghi ack tại `.agent-kit/handoffs/task-sprint-02-02-ux-review-01/r6/ack.md` trước khi review.

## Nội dung Review r6
Đọc `r3/request.md`, coder `r7/result.md` và kiểm tra giao diện / CSS / UX logic:
1. **Kiểm tra UX Poll trên OBS (`340 × 352 px` — `us-006`, `us-008`):**
   - Xác minh đã bỏ hoàn toàn `-webkit-line-clamp: 2` và `max-height: 2.44em` trên `.ov-idea__text` trong `client/styles/main.css`.
   - Kiểm tra bộ chọn thích ứng typography `data-len="sm|md|lg"` trong `client/styles/main.css` và logic gán trong `client/overlay/engine.js`:
     + `sm` (<= 48 ký tự): font 16px.
     + `md` (49–96 ký tự): font 13.5px line-height 1.25.
     + `lg` (97–160 ký tự): font 11.5px line-height 1.2, padding 3px 0 3px.
   - Kiểm tra việc hiển thị đồng thời cả 3 lựa chọn dài tối đa 160 ký tự trong khung cố định `340 × 352 px` (`scrollHeight <= clientHeight`) không bị tràn và không bị cắt chữ.
   - Kiểm tra dòng chú thích thông số HUD trong `client/ui/overlay-view.js`: `16 px base (auto-scales for long poll ideas)`.
2. **Kiểm tra UX Compiler & Fallback Labels (`us-007`):**
   - Kiểm tra hiển thị `#telCompile`: hiển thị `LOCAL (DEFAULT)` khi `uncertain: true` hoặc tag chứa `'uncertain'`.
   - Kiểm tra chân khung Codex Compiler (`[data-verified]`): hiển thị `✓ AST SAFE · DEFAULT FALLBACK` khi fallback neutral default, và `✓ AST SAFE VERIFIED` khi bình thường.
3. **Kiểm tra ToS Safety UX:**
   - Xác minh các ý tưởng không an toàn bị lọc trước khi hiển thị trên Poll OBS trong `client/round/controller.js`.
4. Ghi result tại `.agent-kit/handoffs/task-sprint-02-02-ux-review-01/r6/result.md` và thông báo cho Lead-Code khi hoàn thành.
