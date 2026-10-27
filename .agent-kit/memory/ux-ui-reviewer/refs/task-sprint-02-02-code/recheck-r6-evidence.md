# UX recheck r6 — Evidence

## 1. Snapshot & Integrity Check
- **Commit HEAD:** `5f7b2d31b6d765725b32745632e63d43e55d0b97`
- **Tracked spec diff SHA-256:** `a6bc0f28c08d8afb4f6e307467c24bef4990bd4c4d8bc99b7360796ef2d8206a` across 10 spec files (`MISSION.md`, `DESIGN.md`, `TECHSTACK.md`, `ARCHITECT.md`, `design-handoff/DESIGN-HANDOFF.md`, `design-handoff/DESIGN-MANIFEST.json`, `roadmap/phase-02/sprints/sprint-02/SPRINT.md`, `us-006.md`, `us-007.md`, `us-008.md`).
- **Product untracked files:** 72 files. Tinh chỉnh CSS tại `client/styles/main.css` (SHA-256 `03cbc89ccbb069aef00caf37b033101ecb43e46802a46d7988ae6fa1915ce3f9`, 67 dòng vật lý). Toàn bộ 72/72 files đều strictly <= 250 dòng vật lý.

## 2. Review of 3 PM Policy Decisions

### Decision 1: OBS 340 × 352 px Poll (`us-006`, `us-008`)
- **Removal of Line-Clamp & Box Geometry Fine-Tuning:**
  - `client/styles/main.css` (lines 32–44) explicitly overrides `.ov-idea__text`:
    ```css
    .ov-idea__text {
      display: block;
      -webkit-line-clamp: unset;
      -webkit-box-orient: unset;
      max-height: none;
      overflow: hidden;
      min-width: 0;
      box-sizing: border-box;
      overflow-wrap: anywhere;
      word-break: break-word;
      font-size: 16px;
      line-height: 1.25;
    }
    ```
    `-webkit-line-clamp: 2` and `max-height: 2.44em` previously defined in `handoff-08.css` are completely neutralized.
- **Pseudo-Element & Box Sizing Optimization (0px Spill):**
  - Đã bổ sung `.ov-poll { box-sizing: border-box; padding: 14px 16px 12px; }` và `.ov-poll::after { right: 0; bottom: 0; }` để triệt tiêu việc tràn 1px của pseudo-element (`right: -1px; bottom: -1px`) trong môi trường rendering Chromium.
  - Tối ưu khoảng cách: `.ov-poll__meta { margin-top: 5px; }`, `.ov-poll__list { margin: 2px 0 0; }`.
- **Adaptive Typography Multi-Tier:**
  - `client/overlay/engine.js` (lines 125–130) dynamically tags both `.ov-idea__text` and `.ov-idea`:
    ```javascript
    const len = ideaStr.length;
    text.dataset.len = len <= 48 ? 'sm' : len <= 96 ? 'md' : 'lg';
    item.dataset.len = text.dataset.len;
    ```
  - `client/styles/main.css` styles each tier:
    - `sm` (<= 48 chars): `font-size: 16px; line-height: 1.25;`
    - `md` (49–96 chars): `font-size: 13.5px; line-height: 1.25;` item padding `5px 0 5px; gap: 8px;`
    - `lg` (97–160 chars): `font-size: 11.5px; line-height: 1.15;` item padding `1px 0 1px; gap: 5px;`
- **Thực nghiệm đo lường thực tế trên Chromium / Microsoft Edge (3 × 160 ký tự):**
  - Cả 3 lựa chọn x 160 ký tự hiển thị trọn vẹn, không cắt chữ:
    - `scrollHeight: 350px <= clientHeight: 350px`
    - `scrollWidth: 338px <= clientWidth: 338px`
    - Tràn khung: đúng `0px` cả chiều ngang lẫn dọc.
- **HUD Annotation:**
  - `client/ui/overlay-view.js` (line 27): `<tr><td>Minimum HUD text</td><td>16 px base (auto-scales for long poll ideas)</td></tr>` accurately reflects adaptive scaling.

### Decision 2: Compiler & Fallback UI Labels (`us-007`)
- **Telemetry `#telCompile` (`client/main.js:83-84`):**
  - Displays `LOCAL (DEFAULT)` when `result.uncertain === true` or `result.ast?.tags?.includes('uncertain')`.
  - Displays `LOCAL` or `OPENAI` when prompt matches positive lexical mechanisms.
- **Bottom Verified Badge `[data-verified]` (`client/overlay/engine.js:65-66`):**
  - Displays `✓ AST SAFE · DEFAULT FALLBACK` when `next.tags?.includes('uncertain')`.
  - Displays `✓ AST SAFE VERIFIED` when normal AST patch is deployed, and resets to `✓ AST SAFE VERIFIED` on clear.
- **Direct Local Synthesis / Fallback Verification:**
  - `compile('avoid any effect with gravity upside down')` → `uncertain: true`, `gravity: 0.5`, `tags: ['synthesized', 'star', 'uncertain']`
  - `compile('prevent reverse gravity')` → `uncertain: true`, `gravity: 0.5`, `tags: ['synthesized', 'ball', 'uncertain']`
  - `compile('without upside down gravity')` → `uncertain: true`, `gravity: 0.5`, `tags: ['synthesized', 'duck', 'uncertain']`
  - `compile('do not reverse gravity')` → `uncertain: true`, `gravity: 0.5`, `tags: ['synthesized', 'star', 'uncertain']`
  - `compile('reverse gravity')` → `uncertain: false`, `gravity: -0.75`, `tags: ['synthesized', 'duck']`
  - `compile('do not reverse gravity but no gravity')` → `uncertain: false`, `gravity: 0`, `collision: 'float'`, `tags: ['synthesized', 'duck']`
  - Clause negation isolation correctly prevents negative gravity on negated expressions, and missing positive mechanisms cleanly trigger safe neutral default with `uncertain: true`.

### Decision 3: ToS Safety Guard Pre-Filtering UX
- **Poll Ingestion Filter (`client/round/controller.js:31-37`):**
  - `round.addIdea(idea)` strictly checks `!isUnsafePrompt(idea)` before pushing into `ideas` array.
  - Tested with unsafe prompts:
    - `make a bomb` → blocked.
    - `kill the player` → blocked.
    - `suicide pact` → blocked.
    - `do not reverse gravity; make a bomb` → blocked.
    - `炸弹` → blocked.
    - `giết người` → blocked.
  - Result: 0 unsafe ideas reach the OBS poll list or audience display.

## 3. Test Suite Verification
- `node --test` executed across 13 test files (32 unit tests):
  - `test/overlay.test.js`: 2 passed, 0 failed
  - `test/round.test.js`: 4 passed, 0 failed
  - `test/compiler.test.js`: 7 passed, 0 failed
  - `test/ast.test.js`: 4 passed, 0 failed
  - `test/design-system.test.js`: 1 passed, 0 failed
  - `test/obs-link.test.js`: 1 passed, 0 failed
  - `test/access.test.js`, `test/chat-parse.test.js`, `test/combat.test.js`, `test/physics.test.js`, `test/rooms-unit.test.js`, `test/sfx.test.js`, `test/sync-poll.test.js`: all passed
  - Total: 32 tests passed, 0 failed.
