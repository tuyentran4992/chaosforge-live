/*
 * Các mục cần người dùng chú ý trên HUD: việc cần quyết, điều mới dùng được, lỗi/rủi ro và đội ngũ Agent.
 */
(function () {
  "use strict";

  var L = window.DashLib;
  var S = (window.DashSections = window.DashSections || {});
  var SEVERITY_ORDER = { high: 0, medium: 1, low: 2 };

  S.decisions = function (list) {
    var kids = list.length ? list.map(function (d) {
      return L.item("article", "card card-alert", [d.id, d.title, d.recommendation, d.impact], [
        L.el("h3", { text: d.title }),
        L.field("Khuyến nghị của PM", d.recommendation),
        L.field("Tác động nếu chọn khác", d.impact),
        L.link("Xem chi tiết", d.link)
      ]);
    }) : [L.empty("Hiện không có việc cần anh quyết.")];
    return L.section("decisions", "Cần anh quyết", list.length, kids, "pm council");
  };

  S.newThings = function (list) {
    var kids = list.length ? list.map(function (n) {
      return L.item("article", "card", [n.title, n.howToTry], [
        L.el("h3", { text: n.title }),
        L.field("Cách tự thử", n.howToTry),
        L.link("Xem hướng dẫn", n.link)
      ]);
    }) : [L.empty("Chưa có điều mới để thử.")];
    return L.section("new-things", "Anh làm được gì mới", list.length, kids, "pm code marketing");
  };

  S.risks = function (list) {
    var sorted = list.slice().sort(function (a, b) {
      return (SEVERITY_ORDER[a.severity] != null ? SEVERITY_ORDER[a.severity] : 3) -
        (SEVERITY_ORDER[b.severity] != null ? SEVERITY_ORDER[b.severity] : 3);
    });
    var holder = L.el("div", { cls: "stack" });
    sorted.forEach(function (r) {
      var node = L.item("article", "card", [r.id, r.title, r.symptom], [
        L.el("h3", { text: r.title }, [" ", L.badge("severity", r.severity)]),
        L.field("Anh sẽ thấy", r.symptom),
        L.link("Xem chi tiết", r.link)
      ]);
      node.dataset.severity = r.severity;
      holder.appendChild(node);
    });
    var kids = [];
    if (sorted.length) {
      var options = [
        { value: "all", label: "Tất cả" },
        { value: "high", label: "Cao" },
        { value: "medium", label: "Trung bình" },
        { value: "low", label: "Thấp" }
      ];
      kids.push(L.chips("Lọc theo mức độ", options, L.chipFilter(holder, "severity")), holder);
    } else {
      kids.push(L.empty("Không có lỗi hay rủi ro đang mở."));
    }
    return L.section("risks", "Lỗi và rủi ro đang mở", sorted.length, kids, "pm code qa");
  };

  S.agentsRoster = function (world, onPickAgent) {
    var holder = L.el("div", { cls: "agent-grid" });
    world.agents.forEach(function (ag) {
      var st = world.agentStates[ag.id];
      var focusBtn = L.el("button", { cls: "chip chip-sm", text: "Zoom 3D", attrs: { id: "agent-zoom-" + ag.id, type: "button" } });
      focusBtn.addEventListener("click", function () {
        if (onPickAgent) onPickAgent(ag.id);
      });
      var card = L.item("article", "card agent-card", [ag.id, ag.name, ag.title, st.task, L.label("agent", st.status)], [
        L.el("div", { cls: "agent-card-head" }, [
          L.el("strong", { text: ag.name }),
          L.badge("agent", st.status)
        ]),
        L.el("p", { cls: "muted", text: ag.title }),
        L.el("p", { cls: "field", text: st.task }),
        L.el("div", { cls: "agent-card-foot" }, [focusBtn, L.link("Nguồn", st.link)])
      ]);
      card.dataset.zone = ag.zone;
      holder.appendChild(card);
    });
    var opts = [{ value: "all", label: "Tất cả (13)" }].concat(
      world.zones.map(function (z) { return { value: z.id, label: z.short }; })
    );
    var filter = L.chips("Lọc Agent theo khu vực", opts, L.chipFilter(holder, "zone"));
    return L.section("agents-roster", "Đội hình 13 Agents", world.agents.length, [filter, holder], "pm code qa council marketing");
  };
})();
