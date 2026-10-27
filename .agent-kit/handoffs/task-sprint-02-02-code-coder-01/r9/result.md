# Result bàn giao — coder r9

## 1. Định danh & Phiên bản

- Task: `task-sprint-02-02-code`; handoff: `task-sprint-02-02-code-coder-01`; revision: `r9`, supersedes `r8`.
- Role: `coder`; instance: `/root/coder`; project: `c:/Users/ADMIN/Desktop/Projects/hackathon`.
- User stories: `us-006`, `us-007`, `us-008` (phase-02 / sprint-02).
- Trạng thái bàn giao: **Hoàn tất 2 chỉnh sửa UX theo feedback người dùng: chống cuộn trang & hỗ trợ gõ tiếng Việt Telex/Unikey cho game Arcade, nút CONNECT/DISCONNECT cho Twitch**; sẵn sàng bàn giao cho PM và Lead-Code.

## 2. Toàn vẹn Mã nguồn & Quy chuẩn 250 dòng

- Tổng số file sản phẩm: đúng 73 file.
- **Quy chuẩn độ dài mã nguồn:** 100% (73/73) file sản phẩm đều **≤ 250 dòng vật lý** (file dài nhất là `client/main.js` với 236 dòng, `client/game/arcade.js` 111 dòng, `client/chat/irc.js` 25 dòng, `client/ui/crowd-tabs.js` 26 dòng).
- Toàn bộ freeze inventory với mã băm SHA-256 và số dòng vật lý được lưu trữ tại `.agent-kit/memory/coder/refs/task-sprint-02-02-code/evidence-r9.md`.

## 3. Chi tiết thực hiện

### 3.1. Game Arcade (`client/game/arcade.js`)
- **Khắc phục lỗi cuộn trang:**
  + Khi ở chế độ `manual` (KEYBOARD), bắt sự kiện `keydown` trên phím mũi tên (`arrowup`, `arrowdown`, `arrowleft`, `arrowright`) và các phím di chuyển, gọi `event.preventDefault()` nếu `manual === true` và target không phải là `input`, `textarea`, `select`, `button` để trình duyệt không tự động cuộn trang.
- **Hỗ trợ bộ gõ tiếng Việt (Telex / Unikey / EVKey):**
  + Bắt song song cả `event.code.toLowerCase()` (`keyw`, `keya`, `keys`, `keyd`, `arrowup`, `arrowdown`, `arrowleft`, `arrowright`) bên cạnh `event.key.toLowerCase()`. Dù bộ gõ tiếng Việt có biến đổi ký tự `w`, `s`, `a`, `d` (thành ư, đ, v.v.), tàu vẫn nhận phím ngay lập tức từ hardware keycode.
- **Tránh kẹt phím:**
  + Đã thêm `window.addEventListener('blur', () => keys.clear())` và dọn `keys.clear()` khi tắt `manual` để đảm bảo khi người dùng chuyển cửa sổ hoặc đổi chế độ lái không bị kẹt hướng di chuyển.
- **Tốc độ phi thuyền:**
  + Tăng tốc độ từ 240 px/s lên 360 px/s giúp điều khiển phản hồi nhạy bén và mượt mà hơn.

### 3.2. Cập nhật nút CONNECT / DISCONNECT cho Twitch (`client/chat/irc.js` & `client/main.js`)
- Trong `client/chat/irc.js`:
  + Khi `socket.onopen`, phát trạng thái `onStatus('CONNECTED TO #' + name.toUpperCase())`.
- Trong `client/main.js`:
  + Khi `#connectTwitch` được click:
    - Nếu `twitch` đang kết nối, gọi `twitch.close()`, gán `twitch = null`, đổi `#connectTwitch.textContent = 'CONNECT'`, `#liveStatus.textContent = 'DISCONNECTED'` và `return` sớm.
    - Khi bắt đầu kết nối: trong callback status, nếu status bắt đầu bằng `CONNECTED TO`, đổi `#connectTwitch.textContent = 'DISCONNECT'`, ngược lại đổi thành `'CONNECT'` và gán `twitch = null` nếu không kết nối.
    - Trong khối `catch`: gán `twitch = null`, đảm bảo `#connectTwitch.textContent = 'CONNECT'` và hiển thị `#liveStatus.textContent = 'INVALID CHANNEL'`.
- Trong `client/ui/crowd-tabs.js`:
  + Tách module `wireCrowdTabs()` theo chuẩn Single Responsibility Principle (SRP) từ `client/main.js` để đảm bảo `client/main.js` luôn ở mức 236 dòng (<= 250 dòng vật lý).

## 4. Kết quả Kiểm thử

- Chạy toàn bộ test suite (`npm test` tương đương `node --test test/*.test.js`):
  - **36 passed / 0 failed / 0 skipped** (100% PASS).
- Kiểm thử unit độc lập cho:
  - Game Arcade: phím mũi tên và WASD ngăn cuộn trang ngoài ô nhập liệu, phím Telex/Unikey được xử lý trơn tru qua `event.code`, ô input/textarea gõ chữ bình thường không bị chặn.
  - Twitch connection: xác thực tên kênh không hợp lệ bắn lỗi TypeError an toàn, luồng kết nối/ngắt kết nối đồng bộ UI chính xác.
