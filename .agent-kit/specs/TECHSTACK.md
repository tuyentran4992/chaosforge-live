# TECHSTACK

Trạng thái: **đề xuất kỹ thuật cho phase-02 / sprint-02**, đã đồng bộ cấu trúc 3 HTML entries và các quyết định chính sách sản phẩm `r3` của PM tại [DESIGN.md](DESIGN.md).

## Lựa chọn và phiên bản

- JavaScript ES modules, HTML/CSS, Canvas/Web Audio; kế thừa design handoff và tách file theo trách nhiệm.
- Node.js `v24.22.1` hiện có; HTTP backend phục vụ app và compiler. WebSocket server dùng native/RFC6455 frame handler gọn nhẹ trong `server/ws.js`; không phụ thuộc gói ngoài cho runtime.
- OpenAI Structured Outputs qua backend nếu cấu hình `OPENAI_API_KEY` + `COMPILER_ACCESS_TOKEN`; bộ **Deterministic Local AST Synthesizer (`shared/synthesize.js`)** hoạt động không cần key theo phạm vi từ vựng/mệnh đề phủ định hữu hạn và trả cờ `uncertain` khi rơi về mặc định trung tính. Twitch IRC WebSocket từ browser; BroadcastChannel cùng origin và WebSocket cho nhiều máy cùng server.
- `node:test` cho domain/API và browser automation cho UI.

## Ràng buộc công nghệ

Không `eval`; validate AST và dữ liệu mạng; ≤250 dòng vật lý/codefile; không sửa các file HTML/CSS/JS mẫu trong `.agent-kit/specs/design-handoff/`. Không giả định Internet hay API key. Các máy phải truy cập cùng server; deploy không thuộc quyền.

## Môi trường và lệnh đã xác minh

`node --version` → `v24.22.1`. Lệnh chạy sản phẩm `npm start`, kiểm thử `npm test` (cần quyền bind loopback `127.0.0.1` cho `test/server.test.js` và kiểm thử trình duyệt/OBS).
