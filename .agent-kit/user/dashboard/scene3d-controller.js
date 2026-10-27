/*
 * Điều khiển tương tác 3D: camera orbit/zoom/fly-to, raycast chọn Agent/Zone và thẻ Hologram Inspector.
 */
(function () {
  "use strict";

  var L = window.DashLib;
  var R = window.DashRender3D;

  function createController(canvas, inspectorEl, onZoneSelect) {
    var ctx = canvas.getContext("2d");
    var world = null;
    var hitBoxes = [];
    var selectedAgent = null;
    var selectedZone = "all";
    var hoveredId = null;

    var cam = {
      x: 0, z: 18, yaw: 0, pitch: 0.58, zoom: 1.12,
      tx: 0, tz: 18, tYaw: 0, tPitch: 0.58, tZoom: 1.12,
      cx: 400, cy: 260
    };

    var drag = { active: false, moved: false, sx: 0, sy: 0, yaw0: 0, pitch0: 0 };

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(280, Math.floor(rect.width));
      var h = Math.max(260, Math.floor(rect.height));
      var pw = Math.round(w * dpr);
      var ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cam.cx = w * 0.5;
      cam.cy = h * 0.48;
    }

    function renderInspector() {
      inspectorEl.textContent = "";
      if (!world) return;

      if (selectedAgent) {
        var ag = world.agents.filter(function (a) { return a.id === selectedAgent; })[0];
        var st = world.agentStates[selectedAgent];
        if (ag && st) {
          var closeBtn = L.el("button", { cls: "chip inspector-close", text: "Toàn cảnh 3D", attrs: { type: "button" } });
          closeBtn.addEventListener("click", function () { resetView(); });
          inspectorEl.appendChild(L.el("div", { cls: "inspector-card" }, [
            L.el("div", { cls: "inspector-head" }, [
              L.el("strong", { text: ag.name + " — " + ag.title }),
              L.badge("agent", st.status),
              closeBtn
            ]),
            L.el("p", { cls: "muted", text: ag.duty }),
            L.field("Trạng thái hiện tại", st.task),
            st.link ? L.link("Mở nguồn chi tiết", st.link) : null
          ]));
          return;
        }
      }

      if (selectedZone && selectedZone !== "all") {
        var zn = world.zones.filter(function (z) { return z.id === selectedZone; })[0];
        var zs = world.zoneStates[selectedZone];
        if (zn && zs) {
          var members = world.agents.filter(function (a) { return a.zone === zn.id; });
          var pills = members.map(function (m) {
            var mst = world.agentStates[m.id];
            var btn = L.el("button", {
              cls: "chip",
              text: m.name + " (" + L.label("agent", mst.status) + ")",
              attrs: { type: "button" }
            });
            btn.addEventListener("click", function () { focusAgent(m.id); });
            return btn;
          });
          inspectorEl.appendChild(L.el("div", { cls: "inspector-card" }, [
            L.el("div", { cls: "inspector-head" }, [
              L.el("strong", { text: zn.name }),
              L.badge("agent", zs.status)
            ]),
            L.el("p", { cls: "muted", text: zn.desc }),
            L.el("div", { cls: "chips" }, pills)
          ]));
          return;
        }
      }

      inspectorEl.appendChild(L.el("div", { cls: "inspector-card inspector-hint" }, [
        L.el("span", { text: "Mẹo 3D: Kéo chuột để xoay góc nhìn 360°, cuộn để zoom, hoặc click trực tiếp vào từng Agent / Khu vực để xem chi tiết." })
      ]));
    }

    function focusZone(zoneId, keepAgent) {
      if (!keepAgent) selectedAgent = null;
      selectedZone = zoneId || "all";
      if (!world || selectedZone === "all") {
        cam.tx = 0;
        cam.tz = 18;
        cam.tZoom = 1.12;
      } else {
        var zn = world.zones.filter(function (z) { return z.id === selectedZone; })[0];
        if (zn) {
          cam.tx = zn.x * 0.85;
          cam.tz = zn.z * 0.85;
          cam.tZoom = 1.42;
        }
      }
      renderInspector();
      if (onZoneSelect) onZoneSelect(selectedZone);
    }

    function focusAgent(agentId) {
      if (!world) return;
      var ag = world.agents.filter(function (a) { return a.id === agentId; })[0];
      if (!ag) return;
      selectedAgent = ag.id;
      selectedZone = ag.zone;
      cam.tx = ag.x;
      cam.tz = ag.z;
      cam.tZoom = 1.72;
      renderInspector();
      if (onZoneSelect) onZoneSelect(selectedZone);
    }

    function resetView() {
      selectedAgent = null;
      cam.tYaw = 0;
      cam.tPitch = 0.58;
      focusZone("all");
    }

    function hitTest(mx, my) {
      for (var i = hitBoxes.length - 1; i >= 0; i--) {
        var h = hitBoxes[i];
        if (h.type !== "agent") continue;
        var dx = mx - h.x;
        var dy = my - h.y;
        if (dx * dx + dy * dy <= h.r * h.r) return h;
      }
      for (var j = hitBoxes.length - 1; j >= 0; j--) {
        var z = hitBoxes[j];
        if (z.type !== "zone") continue;
        var zx = mx - z.x;
        var zy = my - z.y;
        if (zx * zx + zy * zy <= z.r * z.r) return z;
      }
      return null;
    }

    canvas.addEventListener("pointerdown", function (e) {
      drag.active = true;
      drag.moved = false;
      drag.sx = e.clientX;
      drag.sy = e.clientY;
      drag.yaw0 = cam.tYaw;
      drag.pitch0 = cam.tPitch;
      if (canvas.setPointerCapture) canvas.setPointerCapture(e.pointerId);
    });

    canvas.addEventListener("pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      var mx = e.clientX - rect.left;
      var my = e.clientY - rect.top;
      if (drag.active) {
        var dx = e.clientX - drag.sx;
        var dy = e.clientY - drag.sy;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.moved = true;
        cam.tYaw = drag.yaw0 + dx * 0.0075;
        cam.tPitch = Math.max(0.36, Math.min(1.15, drag.pitch0 + dy * 0.0055));
        return;
      }
      var hit = hitTest(mx, my);
      hoveredId = hit ? hit.id : null;
      canvas.style.cursor = hit ? "pointer" : "grab";
    });

    canvas.addEventListener("pointerup", function (e) {
      var wasMoved = drag.moved;
      drag.active = false;
      if (!wasMoved) {
        var rect = canvas.getBoundingClientRect();
        var hit = hitTest(e.clientX - rect.left, e.clientY - rect.top);
        if (hit && hit.type === "agent") focusAgent(hit.id);
        else if (hit && hit.type === "zone") focusZone(hit.id);
      }
    });

    canvas.addEventListener("wheel", function (e) {
      e.preventDefault();
      var factor = e.deltaY > 0 ? 0.9 : 1.1;
      cam.tZoom = Math.max(0.62, Math.min(2.15, cam.tZoom * factor));
    }, { passive: false });

    function tick(now) {
      resize();
      var time = (now || 0) * 0.001;
      cam.x += (cam.tx - cam.x) * 0.12;
      cam.z += (cam.tz - cam.z) * 0.12;
      cam.yaw += (cam.tYaw - cam.yaw) * 0.14;
      cam.pitch += (cam.tPitch - cam.pitch) * 0.14;
      cam.zoom += (cam.tZoom - cam.zoom) * 0.14;

      var w = canvas.clientWidth || 800;
      var h = canvas.clientHeight || 500;
      ctx.clearRect(0, 0, w, h);

      if (world && L.state.viewMode === "3d") {
        R.drawCyberFloor(ctx, cam, world, time);
        hitBoxes = [];

        var zonesSorted = world.zones.slice().sort(function (a, b) {
          return R.project(cam, a.x, 0, a.z).z - R.project(cam, b.x, 0, b.z).z;
        });
        zonesSorted.forEach(function (z) {
          var zHit = R.drawZonePlatform(ctx, cam, z, world.zoneStates[z.id], selectedZone === z.id, hoveredId === z.id, time);
          hitBoxes.push(zHit);
        });

        var agentsSorted = world.agents.slice().sort(function (a, b) {
          return R.project(cam, a.x, 12, a.z).z - R.project(cam, b.x, 12, b.z).z;
        });
        agentsSorted.forEach(function (ag) {
          var aHit = R.drawAgentAvatar(ctx, cam, ag, world.agentStates[ag.id], selectedAgent === ag.id, hoveredId === ag.id, time);
          hitBoxes.push(aHit);
        });
      }
      window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);

    return {
      setWorld: function (w) { world = w; renderInspector(); },
      focusZone: focusZone,
      focusAgent: focusAgent,
      resetView: resetView
    };
  }

  window.DashScene3D = { createController: createController };
})();
