/*
 * Các mục theo dõi trên HUD: tiến độ phase/sprint/story, release (QA), backlog, báo cáo.
 */
(function () {
  "use strict";

  var L = window.DashLib;
  var S = (window.DashSections = window.DashSections || {});

  function storyRow(s) {
    var node = L.item("li", "story", [s.id, s.title, L.label("story", s.status)], [
      L.el("span", { cls: "story-id", text: s.id || "" }),
      L.el("span", { cls: "story-title", text: s.title || "" }),
      L.badge("story", s.status),
      L.link("Chi tiết", s.link)
    ]);
    node.dataset.status = s.status;
    return node;
  }

  function sprintBlock(sp) {
    var stories = sp.stories || [];
    var done = stories.filter(function (s) { return s.status === "accepted"; }).length;
    var head = L.el("summary", {}, [
      L.el("span", { cls: "name", text: (sp.id || "") + " — " + (sp.title || "") }),
      L.el("span", { cls: "tag", text: L.label("kind", sp.kind) }),
      L.badge("sprint", sp.status),
      L.el("span", { cls: "muted", text: done + "/" + stories.length + " story đã nghiệm thu" })
    ]);
    var attrs = sp.status === "in-progress" ? { open: "" } : {};
    return L.el("details", { cls: "sprint", attrs: attrs }, [head, L.el("ul", { cls: "stories" }, stories.map(storyRow))]);
  }

  function phaseBlock(ph) {
    var head = L.el("summary", {}, [L.el("span", { cls: "name", text: (ph.id || "") + " — " + (ph.title || "") })]);
    var sprints = (ph.sprints || []).map(sprintBlock);
    return L.el("details", { cls: "phase", attrs: { open: "" } }, [head].concat(sprints));
  }

  S.storyTotals = function (phases) {
    var total = 0;
    var done = 0;
    phases.forEach(function (ph) {
      (ph.sprints || []).forEach(function (sp) {
        (sp.stories || []).forEach(function (s) {
          total += 1;
          if (s.status === "accepted") done += 1;
        });
      });
    });
    return { done: done, total: total };
  };

  S.progress = function (phases) {
    if (!phases.length) return L.section("progress", "Tiến độ", null, [L.empty("Chưa có phase hay sprint thật.")], "pm code");
    var holder = L.el("div", { cls: "stack" }, phases.map(phaseBlock));
    var options = [{ value: "all", label: "Tất cả" }].concat(
      ["todo", "in-progress", "review", "accepted", "blocked"].map(function (v) {
        return { value: v, label: L.label("story", v) };
      })
    );
    var t = S.storyTotals(phases);
    var meter = L.el("progress", { attrs: { max: String(t.total), value: String(t.done), "aria-label": "Story đã nghiệm thu" } });
    var note = L.el("p", { cls: "muted", text: t.done + "/" + t.total + " story đã nghiệm thu" });
    var filter = L.chips("Lọc story theo trạng thái", options, L.chipFilter(holder, "status"));
    return L.section("progress", "Tiến độ", null, [meter, note, filter, holder], "pm code");
  };

  S.release = function (r) {
    if (!r || r.result === "not-run") {
      return L.section("release", "Release và QA", null, [L.empty("Chưa chạy QA nghiệm thu.")], "pm qa");
    }
    var card = L.el("article", { cls: "card" }, [
      L.el("h3", { text: "Kết quả QA gần nhất " }, [L.badge("release", r.result)]),
      L.field("Bản đã test", r.candidate),
      L.field("Suite", r.suiteVersion),
      L.field("Chạy lúc", r.checkedAt),
      L.field("Tóm tắt", r.summary),
      L.link("Xem báo cáo QA", r.link)
    ]);
    return L.section("release", "Release và QA", null, [card], "pm qa");
  };

  S.backlog = function (list) {
    var holder = L.el("div", { cls: "stack" });
    list.forEach(function (b) {
      var node = L.item("article", "card", [b.id, b.title, b.reason, L.label("backlog", b.state)], [
        L.el("h3", { text: b.title }, [" ", L.badge("backlog", b.state)]),
        L.field("Lý do", b.reason),
        L.link("Xem chi tiết", b.link)
      ]);
      node.dataset.state = b.state;
      holder.appendChild(node);
    });
    if (!list.length) return L.section("backlog", "Việc chưa xếp sprint", 0, [L.empty("Không có việc chờ.")], "pm council marketing");
    var options = [{ value: "all", label: "Tất cả" }].concat(
      ["decision", "waiting", "deferred", "rejected"].map(function (v) {
        return { value: v, label: L.label("backlog", v) };
      })
    );
    var filter = L.chips("Lọc theo trạng thái", options, L.chipFilter(holder, "state"));
    return L.section("backlog", "Việc chưa xếp sprint", list.length, [filter, holder], "pm council marketing");
  };

  S.reports = function (list) {
    if (!list.length) return L.section("reports", "Báo cáo", 0, [L.empty("Chưa có báo cáo.")], "pm");
    var rows = list.map(function (r) {
      var anchor = L.link(r.title || "Báo cáo", r.link);
      return L.item("li", "report", [r.date, r.title], [
        L.el("span", { cls: "muted", text: r.date || "" }),
        anchor || L.el("span", { text: r.title || "Báo cáo" })
      ]);
    });
    return L.section("reports", "Báo cáo", list.length, [L.el("ul", { cls: "reports" }, rows)], "pm");
  };
})();
