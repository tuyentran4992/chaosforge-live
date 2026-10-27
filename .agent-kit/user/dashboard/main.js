/*
 * Khởi tạo 3D Command Center Dashboard: kết nối dữ liệu, 3D Office, thanh chọn phân khu, HUD và tìm kiếm.
 */
(function () {
  "use strict";

  var L = window.DashLib;
  var S = window.DashSections;
  var W = window.DashWorld;
  var Scene = window.DashScene3D;
  var STALE_DAYS = 7;
  var sceneCtrl = null;

  function list(value) {
    return Array.isArray(value) ? value : [];
  }

  function showBanner(text, tone) {
    var banner = document.getElementById("banner");
    banner.textContent = "";
    if (text) banner.appendChild(L.el("p", { cls: "banner banner-" + tone, text: text }));
  }

  function stat(target, title, value, note, tone) {
    var attrs = { href: "#" + target };
    return L.el("a", { cls: "stat stat-" + tone, attrs: attrs }, [
      L.el("span", { cls: "stat-title", text: title }),
      L.el("span", { cls: "stat-value", text: String(value) }),
      L.el("span", { cls: "muted", text: note })
    ]);
  }

  function renderSummary(root, d, world) {
    root.textContent = "";
    var decisions = list(d.decisions).length;
    var highRisks = list(d.risks).filter(function (r) { return r.severity === "high"; }).length;
    var totals = S.storyTotals(list(d.phases));
    var releaseValue = d.release && d.release.result ? L.label("release", d.release.result) : L.label("release", "not-run");
    var activeAgents = world.agents.filter(function (a) {
      var st = world.agentStates[a.id].status;
      return st === "working" || st === "review" || st === "alert";
    }).length;
    root.appendChild(stat("decisions", "Cần anh quyết", decisions, "việc đang chờ", decisions ? "alert" : "ok"));
    root.appendChild(stat("risks", "Rủi ro mức cao", highRisks, "đang mở", highRisks ? "alert" : "ok"));
    root.appendChild(stat("progress", "Story nghiệm thu", totals.done + "/" + totals.total, "toàn dự án", "neutral"));
    root.appendChild(stat("release", "Release và QA", releaseValue, "lượt QA gần nhất", "neutral"));
    root.appendChild(stat("agents-roster", "Agents hoạt động", activeAgents + "/13", "trong văn phòng 3D", activeAgents ? "ok" : "neutral"));
  }

  function renderFreshness(d) {
    var updated = document.getElementById("updated");
    if (L.state.demo) {
      updated.textContent = "Chế độ mô phỏng 3D · " + d.updatedAt;
      showBanner("Đang hiển thị dữ liệu mô phỏng (Demo 3D) để trải nghiệm văn phòng ảo. Bấm 'Dữ liệu thật' để quay lại data.js.", "info");
      return;
    }
    if (!d.updatedAt) {
      updated.textContent = "Chưa cập nhật";
      showBanner("Chưa có dữ liệu: PM chưa cập nhật dashboard (các agent đang ở trạng thái chờ). Bấm '⚡ Xem thử Demo 3D' trên góc phải để trải nghiệm.", "warn");
      return;
    }
    updated.textContent = "Cập nhật: " + d.updatedAt;
    var age = L.ageInDays(d.updatedAt);
    if (age !== null && age >= STALE_DAYS) {
      showBanner("Dữ liệu cập nhật " + age + " ngày trước, có thể không còn đúng với hiện trạng.", "warn");
    } else {
      showBanner("", "ok");
    }
  }

  function syncZoneButtons(zoneId) {
    var nav = document.getElementById("zone-nav");
    if (!nav) return;
    nav.querySelectorAll(".zone-btn").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.zone === zoneId ? "true" : "false");
    });
  }

  function renderZoneNav(world) {
    var nav = document.getElementById("zone-nav");
    nav.textContent = "";
    var items = [{ id: "all", label: "Toàn cảnh 3D" }].concat(
      world.zones.map(function (z) {
        return { id: z.id, label: z.short + " (" + world.zoneStates[z.id].badgeText + ")" };
      })
    );
    items.forEach(function (it) {
      var btn = L.el("button", {
        cls: "chip zone-btn",
        text: it.label,
        attrs: { id: "zone-" + it.id, type: "button", "data-zone": it.id, "aria-pressed": L.state.zone === it.id ? "true" : "false" }
      });
      btn.addEventListener("click", function () {
        if (sceneCtrl) sceneCtrl.focusZone(it.id);
      });
      nav.appendChild(btn);
    });
  }

  function renderSections(root, d, world) {
    root.textContent = "";
    root.appendChild(S.decisions(list(d.decisions)));
    root.appendChild(S.newThings(list(d.newThings)));
    root.appendChild(S.risks(list(d.risks)));
    root.appendChild(S.progress(list(d.phases)));
    root.appendChild(S.release(d.release));
    root.appendChild(S.backlog(list(d.backlog)));
    root.appendChild(S.reports(list(d.reports)));
    root.appendChild(S.agentsRoster(world, function (agentId) {
      if (L.state.viewMode !== "3d") setViewMode("3d");
      if (sceneCtrl) sceneCtrl.focusAgent(agentId);
      var stage = document.getElementById("stage-3d");
      if (stage && stage.scrollIntoView) stage.scrollIntoView({ behavior: "smooth" });
    }));
  }

  function setViewMode(mode) {
    L.state.viewMode = mode;
    var stage = document.getElementById("stage-3d");
    var workspace = document.getElementById("workspace");
    var modeBtn = document.getElementById("btn-view-mode");
    stage.hidden = mode !== "3d";
    workspace.className = mode === "3d" ? "workspace mode-3d" : "workspace mode-2d";
    modeBtn.textContent = mode === "3d" ? "Chế độ 2D List" : "Chế độ 3D Office";
    modeBtn.setAttribute("aria-pressed", mode === "2d" ? "true" : "false");
  }

  function renderAll() {
    var raw = L.state.demo ? L.getDemoData() : window.DASHBOARD_DATA;
    if (!raw || typeof raw !== "object") {
      showBanner("Không đọc được data.js. Kiểm tra file nằm cùng thư mục với index.html.", "error");
      return;
    }
    var title = raw.project || "Agent Command Center";
    document.getElementById("project-title").textContent = title;
    document.title = title + " — 3D Agent Office";

    var world = W.computeWorld(raw);
    renderFreshness(raw);
    renderSummary(document.getElementById("summary"), raw, world);
    renderZoneNav(world);
    renderSections(document.getElementById("content"), raw, world);
    if (sceneCtrl) sceneCtrl.setWorld(world);
    L.refresh();
  }

  function init() {
    var canvas = document.getElementById("office-canvas");
    var inspector = document.getElementById("inspector");
    sceneCtrl = Scene.createController(canvas, inspector, function (zoneId) {
      L.state.zone = zoneId || "all";
      syncZoneButtons(L.state.zone);
      L.refresh();
    });

    if (window.location.search.indexOf("demo=1") !== -1) L.state.demo = true;

    var demoBtn = document.getElementById("btn-demo");
    demoBtn.addEventListener("click", function () {
      L.state.demo = !L.state.demo;
      demoBtn.textContent = L.state.demo ? "Dữ liệu thật (data.js)" : "⚡ Xem thử Demo 3D";
      demoBtn.setAttribute("aria-pressed", L.state.demo ? "true" : "false");
      renderAll();
    });

    document.getElementById("btn-view-mode").addEventListener("click", function () {
      setViewMode(L.state.viewMode === "3d" ? "2d" : "3d");
    });

    document.getElementById("btn-reset-3d").addEventListener("click", function () {
      if (sceneCtrl) sceneCtrl.resetView();
    });

    document.getElementById("q").addEventListener("input", function (event) {
      L.state.query = event.target.value;
      L.refresh();
    });

    renderAll();
  }

  init();
})();
