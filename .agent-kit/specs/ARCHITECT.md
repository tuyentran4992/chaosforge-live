# ARCHITECT

Trạng thái: **đề xuất kỹ thuật**, đã đồng bộ cấu trúc entry/route UI và 3 quyết định chính sách sản phẩm `r3` của PM tại [DESIGN.md](DESIGN.md). Chi tiết tại [technical plan](../memory/lead-code/refs/task-sprint-02-02-code/technical-plan.md).

## Thành phần và trách nhiệm

- **3 HTML Entry Surfaces:**
  1. `index.html`: Ứng dụng Studio chính tích hợp `topbar`, `statebar` và 3 hash-switched views (`#/stage` → `#view-stage`, `#/overlay` → `#view-overlay`, `#/deck` → `#view-deck`).
  2. `overlay.html`: Trang nguồn OBS Browser Source trong suốt độc lập (`1920×1080`).
  3. `design-system.html`: Trang tài liệu Design System v1.0 độc lập.
  *(Các vùng HTML/CSS lớn được tách thành các ES modules trong `client/ui/*.js` và `client/styles/*.css` để mọi file `.html`, `.css`, `.js` đều ≤ 250 dòng vật lý nhưng vẫn giữ nguyên cấu trúc DOM, IDs, classes và visual geometry khi hiển thị).*
- UI surfaces dùng tokens, layout, trạng thái handoff (100% English UI); Canvas chỉ diễn giải AST đã validate; arcade, HUD, sound, input tách riêng. Khung Poll trên OBS (`340×352`) hiển thị đầy đủ văn bản 3 lựa chọn (tối đa 160 ký tự) bằng cỡ chữ thích ứng (`data-len="sm|md|lg"`), không dùng `-webkit-line-clamp` che mất phần phân biệt ở cuối câu.
- Round controller quản lý sáu trạng thái; lọc bỏ ý tưởng `!forge` vi phạm `isUnsafePrompt` ngay trước khi đưa vào Poll; judge, chat, cartridge và raid đi qua validation.
- Compiler backend gồm safety guard (`shared/safety.js`), local synthesizer (`shared/synthesize.js` với xử lý loại trừ mệnh đề phủ định cấp câu/vế và cờ `uncertain: boolean`), validator (`shared/ast-validate.js`), và OpenAI adapter (`server/openai.js`) có deadline/fallback; không chạy mã sinh ra.
- Chat parser tách Twitch IRC transport; simulator phát cùng event. Cartridge localStorage phải validate khi đọc/nhận.
- BroadcastChannel cùng origin và WebSocket server cho OBS, tab, raid hai máy; validate event và tránh echo.

## Contracts và giao tiếp

- AST gồm `entity`, `gravity`, `collision`, `spawn_zone`, `sfx`, `duration`, `tags`, có enum và giới hạn đóng (Closed-World Whitelist); chỉ chạy primitives cho phép, spawn ngoài center safe zone (`[384,1536] × [216,864]`).
- Compiler nhận prompt giới hạn (`1–500` ký tự), trả `{ ast, source, blocked, uncertain }`; khi `uncertain: true` (prompt không khớp từ khóa cơ chế dương tính nào sau khi bỏ mệnh đề phủ định), trả AST mặc định trung tính (`gravity: 0.5`, `collision: 'bounce'`, `tags` chứa `'uncertain'`) và hiển thị nhãn `LOCAL (DEFAULT)` / `✓ AST SAFE · DEFAULT FALLBACK` trên HUD.
- Event đồng bộ có loại, ID, nguồn, room, payload đã validate; panic áp dụng ngay tại nguồn rồi phát, đích xử lý idempotent.

## Dữ liệu và luồng dữ liệu

Cartridge lưu localStorage; dữ liệu room relay qua cùng server và không mặc định được bảo mật. Hiệu năng và an toàn cần đo trên sản phẩm chạy thật, không suy ra pass từ thiết kế hay test mock.
