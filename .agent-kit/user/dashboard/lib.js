/*
 * Helpers dùng chung của dashboard: dựng DOM an toàn (chỉ textContent), kiểm link, nhãn, bộ lọc và dữ liệu Demo.
 */
(function () {
  "use strict";

  var LABELS = {
    story: { todo: "Chưa làm", "in-progress": "Đang làm", review: "Đang review", accepted: "Đã nghiệm thu", blocked: "Bị chặn" },
    sprint: { planned: "Dự kiến", "in-progress": "Đang chạy", done: "Hoàn thành", blocked: "Bị chặn" },
    kind: { delivery: "Delivery", design: "Thiết kế", "release-validation": "Nghiệm thu release" },
    severity: { high: "Cao", medium: "Trung bình", low: "Thấp" },
    release: { pass: "Đạt", fail: "Không đạt", blocked: "Bị chặn", "not-run": "Chưa chạy QA" },
    backlog: { decision: "Chờ quyết định", waiting: "Chờ điều kiện", deferred: "Hoãn", rejected: "Từ chối" },
    agent: { working: "Đang chạy", review: "Đang review", alert: "Cần quyết", blocked: "Bị chặn", pass: "Đạt chuẩn", waiting: "Chờ lệnh", idle: "Sẵn sàng" }
  };

  var state = { query: "", zone: "all", viewMode: "3d", demo: false };

  function el(tag, props, kids) {
    var node = document.createElement(tag);
    var p = props || {};
    if (p.cls) node.className = p.cls;
    if (p.text != null) node.textContent = p.text;
    if (p.attrs) Object.keys(p.attrs).forEach(function (k) { node.setAttribute(k, p.attrs[k]); });
    (kids || []).forEach(function (kid) {
      if (kid == null) return;
      node.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
    });
    return node;
  }

  function safeHref(value) {
    if (typeof value !== "string") return null;
    var v = value.trim();
    if (!v || v.indexOf("//") === 0) return null;
    if (/^[a-z][a-z0-9+.\-]*:/i.test(v) && !/^https?:/i.test(v)) return null;
    return v;
  }

  function link(text, href) {
    var safe = safeHref(href);
    return safe ? el("a", { cls: "link", text: text, attrs: { href: safe } }) : null;
  }

  function label(group, value) {
    var known = LABELS[group] && LABELS[group][value];
    return known || String(value == null || value === "" ? "TBD" : value);
  }

  function badge(group, value) {
    var tone = String(value).replace(/[^a-z0-9-]/gi, "");
    return el("span", { cls: "badge badge-" + tone, text: label(group, value) });
  }

  function field(name, value) {
    if (!value) return null;
    return el("p", { cls: "field" }, [el("strong", { text: name + ": " }), String(value)]);
  }

  function empty(text) {
    return el("p", { cls: "empty", text: text });
  }

  function item(tag, cls, searchParts, kids) {
    var node = el(tag, { cls: "filterable " + cls }, kids);
    node.dataset.search = searchParts.filter(Boolean).join(" ").toLowerCase();
    return node;
  }

  function refresh() {
    var q = state.query.trim().toLowerCase();
    document.querySelectorAll(".filterable").forEach(function (n) {
      var missSearch = q && (n.dataset.search || "").indexOf(q) === -1;
      n.hidden = Boolean(missSearch) || n.dataset.chipHide === "1";
    });
    document.querySelectorAll(".zone-panel").forEach(function (panel) {
      if (state.zone === "all") {
        panel.hidden = false;
        return;
      }
      var zones = (panel.dataset.zones || "").split(" ");
      panel.hidden = zones.indexOf(state.zone) === -1;
    });
  }

  function chipFilter(container, key) {
    return function (value) {
      container.querySelectorAll(".filterable").forEach(function (n) {
        n.dataset.chipHide = value === "all" || n.dataset[key] === value ? "0" : "1";
      });
    };
  }

  function chips(groupName, options, onSelect) {
    var wrap = el("div", { cls: "chips", attrs: { role: "group", "aria-label": groupName } });
    options.forEach(function (opt, i) {
      var attrs = { type: "button", "aria-pressed": i === 0 ? "true" : "false" };
      var button = el("button", { cls: "chip", text: opt.label, attrs: attrs });
      button.addEventListener("click", function () {
        wrap.querySelectorAll(".chip").forEach(function (c) {
          c.setAttribute("aria-pressed", c === button ? "true" : "false");
        });
        onSelect(opt.value);
        refresh();
      });
      wrap.appendChild(button);
    });
    return wrap;
  }

  function section(id, title, count, kids, zones) {
    var head = el("h2", { text: title, attrs: { id: id + "-h" } });
    if (count != null) head.appendChild(el("span", { cls: "count", text: String(count) }));
    var attrs = { id: id, "aria-labelledby": id + "-h", "data-zones": zones || "all" };
    return el("section", { cls: "panel zone-panel", attrs: attrs }, [head].concat(kids));
  }

  function ageInDays(stamp) {
    var t = Date.parse(String(stamp).replace(" ", "T"));
    return isNaN(t) ? null : Math.floor((Date.now() - t) / 86400000);
  }

  function getDemoData() {
    var now = new Date().toISOString().slice(0, 16).replace("T", " ");
    return {
      project: "Nexus AI Platform (Mô phỏng 3D)",
      updatedAt: now,
      decisions: [
        { id: "DEC-01", title: "Chốt cơ chế xác thực SSO hay Passkey cho bản Beta", recommendation: "Dùng Passkey + Magic Link cho sprint đầu để ra mắt nhanh", impact: "Chọn SSO doanh nghiệp sẽ thêm 1 sprint tích hợp IdP", link: "../../specs/MISSION.md" }
      ],
      newThings: [
        { title: "Buồng điều khiển 3D Agent Office trực quan", howToTry: "Xoay/zoom góc nhìn 3D, click từng phòng hoặc từng Agent để xem nhiệm vụ và lọc bảng HUD", link: "../README.md" },
        { title: "Luồng thanh toán một chạm trên Mobile", howToTry: "Mở trang Checkout trên màn hình 375px và thử nút Thanh toán nhanh", link: "../../specs/DESIGN.md" }
      ],
      risks: [
        { id: "RSK-01", title: "Webhook cổng thanh toán đôi lúc trễ 8 giây giờ cao điểm", symptom: "Người dùng thấy trạng thái Đang xử lý lâu hơn bình thường trước khi nhận biên lai", severity: "high", link: "../../specs/backlog/BACKLOG.md" },
        { id: "RSK-02", title: "Ảnh banner chiến dịch mùa lễ chưa nén WebP", symptom: "Trang landing tải chậm hơn khoảng 1.2 giây trên mạng 4G", severity: "medium", link: "../../specs/backlog/BACKLOG.md" }
      ],
      phases: [{
        id: "phase-01", title: "Ra mắt MVP Core & Trải nghiệm 3D",
        sprints: [
          { id: "sprint-01", title: "Thiết kế UX/UI & Hệ thống Design", kind: "design", status: "done", stories: [
            { id: "us-001", title: "Khung giao diện Holo-HUD và luồng onboarding", status: "accepted", link: "../../specs/DESIGN.md" },
            { id: "us-002", title: "Thiết kế responsive trên thiết bị di động", status: "accepted", link: "../../specs/DESIGN.md" }
          ]},
          { id: "sprint-02", title: "Triển khai Core Flow & Thanh toán", kind: "delivery", status: "in-progress", stories: [
            { id: "us-003", title: "Đăng nhập không mật khẩu bằng Passkey", status: "accepted", link: "../../specs/ROADMAP.md" },
            { id: "us-004", title: "Đồng bộ trạng thái đơn hàng thời gian thực", status: "in-progress", link: "../../specs/ROADMAP.md" },
            { id: "us-005", title: "Kiểm tra giao diện thanh toán với Dual Review", status: "review", link: "../../specs/ROADMAP.md" }
          ]}
        ]
      }],
      release: { candidate: "rc-2026.10.27-01", suiteVersion: "v1.2", result: "pass", checkedAt: now, summary: "Đạt 14/14 kịch bản E2E từ bước khởi động sạch đến thanh toán hoàn tất.", link: "../../specs/qa/SUITE.md" },
      backlog: [
        { id: "BL-101", title: "Hỗ trợ đa tiền tệ Đông Nam Á", state: "decision", reason: "Chờ chốt đối tác cổng thanh toán quốc tế", link: "../../specs/backlog/BACKLOG.md" },
        { id: "BL-102", title: "Chế độ xuất báo cáo PDF tự động mỗi tuần", state: "deferred", reason: "Dời sang Phase 2 sau khi ổn định luồng core", link: "../../specs/backlog/BACKLOG.md" }
      ],
      reports: [
        { date: now.slice(0, 10), title: "Báo cáo nghiệm thu Sprint 01 & Khởi động Sprint 02", link: "../README.md" }
      ],
      agents: {
        "council-lead": { status: "working", task: "Đang tổng hợp 3 góc nhìn chuyên gia về chiến lược giá Passkey/SSO" },
        "council-specialist": { status: "working", task: "Phân tích bảo mật WebAuthn và chi phí vận hành" },
        "council-user": { status: "review", task: "Đánh giá độ mượt khi đăng nhập lần đầu trên điện thoại" },
        "lead-marketing": { status: "working", task: "Điều phối chiến dịch ra mắt bản Beta" },
        "marketing-researcher": { status: "working", task: "Kiểm chứng số liệu thị trường Q4 có trích dẫn nguồn" },
        "marketer": { status: "working", task: "Soạn nội dung Landing Page theo thông điệp đã duyệt" },
        "marketing-reviewer": { status: "review", task: "Đối chiếu claim marketing với dossier nguồn" }
      }
    };
  }

  window.DashLib = {
    state: state, el: el, safeHref: safeHref, link: link, label: label, badge: badge, field: field,
    empty: empty, item: item, refresh: refresh, chips: chips, chipFilter: chipFilter,
    section: section, ageInDays: ageInDays, getDemoData: getDemoData
  };
})();
