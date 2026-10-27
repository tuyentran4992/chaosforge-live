/*
 * Bộ dựng hình 3D (Perspective Projection + Depth Sort + Sci-Fi Hologram Primitives) bằng HTML5 Canvas.
 */
(function () {
  "use strict";

  var STATUS_COLORS = {
    working: "#00f0ff", review: "#f59e0b", alert: "#f59e0b",
    blocked: "#ef4444", pass: "#10b981", waiting: "#a855f7", idle: "#64748b"
  };

  function statusColor(status, fallback) {
    return STATUS_COLORS[status] || fallback || "#38bdf8";
  }

  function project(cam, wx, wy, wz) {
    var dx = wx - cam.x, dz = wz - cam.z;
    var cosY = Math.cos(cam.yaw), sinY = Math.sin(cam.yaw);
    var rx = dx * cosY - dz * sinY, rz = dx * sinY + dz * cosY;
    var cosP = Math.cos(cam.pitch), sinP = Math.sin(cam.pitch);
    var cy = wy * cosP - rz * sinP, cz = wy * sinP + rz * cosP;
    var dist = Math.max(120, 780 - cz);
    var scale = (720 / dist) * cam.zoom;
    return { x: cam.cx + rx * scale, y: cam.cy - cy * scale, z: cz, scale: scale };
  }

  function poly3D(ctx, cam, pts, fill, stroke, lineWidth) {
    ctx.beginPath();
    for (var i = 0; i < pts.length; i++) {
      var p = project(cam, pts[i][0], pts[i][1], pts[i][2]);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth || 1; ctx.stroke(); }
  }

  function drawBox3D(ctx, cam, cx, y0, cz, wx, hy, wz, rot, topCol, sideCol, edgeCol) {
    var c = Math.cos(rot || 0), s = Math.sin(rot || 0);
    var hw = wx / 2, hd = wz / 2;
    var local = [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]];
    var b = [], t = [], faces = [];
    for (var i = 0; i < 4; i++) {
      var gx = cx + local[i][0] * c - local[i][1] * s;
      var gz = cz + local[i][0] * s + local[i][1] * c;
      b.push([gx, y0, gz]);
      t.push([gx, y0 + hy, gz]);
    }
    for (var j = 0; j < 4; j++) {
      var n = (j + 1) % 4;
      var midX = (b[j][0] + b[n][0]) * 0.5;
      var midZ = (b[j][2] + b[n][2]) * 0.5;
      var depth = project(cam, midX, y0 + hy * 0.5, midZ).z;
      faces.push({ depth: depth, pts: [b[j], b[n], t[n], t[j]] });
    }
    faces.sort(function (a, b2) { return a.depth - b2.depth; });
    for (var k = 2; k < 4; k++) {
      poly3D(ctx, cam, faces[k].pts, sideCol, edgeCol, 1);
    }
    poly3D(ctx, cam, t, topCol, edgeCol, 1.2);
  }

  function drawRing3D(ctx, cam, cx, wy, cz, radius, sides, rot, fill, stroke, width) {
    var pts = [];
    var n = sides || 24;
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 + (rot || 0);
      pts.push([cx + Math.cos(a) * radius, wy, cz + Math.sin(a) * radius]);
    }
    poly3D(ctx, cam, pts, fill, stroke, width);
  }

  function drawCyberFloor(ctx, cam, world, time) {
    ctx.save();
    for (var g = -320; g <= 320; g += 40) {
      var p1 = project(cam, g, -10, -280);
      var p2 = project(cam, g, -10, 280);
      ctx.strokeStyle = g % 80 === 0 ? "rgba(0, 240, 255, 0.13)" : "rgba(56, 189, 248, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      var q1 = project(cam, -320, -10, g * 0.85);
      var q2 = project(cam, 320, -10, g * 0.85);
      ctx.beginPath();
      ctx.moveTo(q1.x, q1.y);
      ctx.lineTo(q2.x, q2.y);
      ctx.stroke();
    }

    world.zones.forEach(function (z) {
      if (z.id === "pm") return;
      var zs = world.zoneStates[z.id];
      var col = statusColor(zs.status, z.color);
      var a = project(cam, 0, -6, 0);
      var b = project(cam, z.x, -6, z.z);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.24)";
      ctx.lineWidth = 2.2 * a.scale;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      for (var k = 0; k < 2; k++) {
        var t = (time * 0.45 + k * 0.5) % 1;
        var px = z.x * t;
        var pz = z.z * t;
        var pp = project(cam, px, -4, pz);
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(pp.x, pp.y, Math.max(2.2, 4 * pp.scale), 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();
  }

  function drawZonePlatform(ctx, cam, zone, zState, selected, hovered, time) {
    var col = statusColor(zState.status, zone.color);
    var active = selected || hovered;
    drawRing3D(ctx, cam, zone.x, -8, zone.z, zone.r + 6, 8, Math.PI / 8, "rgba(7, 15, 30, 0.92)", col, active ? 2.5 : 1.3);
    drawRing3D(ctx, cam, zone.x, 0, zone.z, zone.r, 8, Math.PI / 8, "rgba(12, 25, 48, 0.84)", zone.color, active ? 2.2 : 1.2);
    drawRing3D(ctx, cam, zone.x, 1, zone.z, zone.r * 0.68, 16, time * 0.4, null, "rgba(0, 240, 255, 0.25)", 1);

    if (zone.id === "pm") {
      var coreY = 26 + Math.sin(time * 2.5) * 4;
      drawBox3D(ctx, cam, 0, 0, 12, 34, 14, 22, 0, "rgba(14, 38, 68, 0.95)", "rgba(8, 22, 42, 0.95)", col);
      drawBox3D(ctx, cam, 0, coreY, 12, 14, 14, 14, time * 1.4, "rgba(0, 240, 255, 0.35)", "rgba(0, 240, 255, 0.18)", col);
    } else if (zone.id === "code") {
      drawBox3D(ctx, cam, zone.x, 0, zone.z, 22, 42, 22, time * 0.2, "rgba(15, 35, 66, 0.92)", "rgba(9, 22, 44, 0.92)", zone.color);
      drawRing3D(ctx, cam, zone.x, 22 + Math.sin(time * 3) * 10, zone.z, 19, 12, -time, null, col, 1.6);
    } else if (zone.id === "qa") {
      var scanY = 6 + ((Math.sin(time * 2.6) + 1) * 0.5) * 32;
      drawRing3D(ctx, cam, zone.x, 38, zone.z, 30, 16, 0, "rgba(16, 185, 129, 0.08)", zone.color, 1.2);
      drawRing3D(ctx, cam, zone.x, scanY, zone.z, 32, 20, time, "rgba(16, 185, 129, 0.14)", col, 2);
    } else if (zone.id === "council") {
      drawRing3D(ctx, cam, zone.x, 12, zone.z + 8, 28, 12, time * 0.3, "rgba(168, 85, 247, 0.18)", zone.color, 1.6);
      drawBox3D(ctx, cam, zone.x, 22 + Math.cos(time * 2) * 3, zone.z + 8, 10, 12, 10, -time, "rgba(192, 132, 252, 0.4)", "rgba(168, 85, 247, 0.22)", "#e879f9");
    } else if (zone.id === "marketing") {
      drawBox3D(ctx, cam, zone.x, 0, zone.z, 18, 34, 18, 0.4, "rgba(80, 20, 56, 0.9)", "rgba(48, 12, 35, 0.9)", zone.color);
      var waveR = 16 + ((time * 22) % 34);
      drawRing3D(ctx, cam, zone.x, 38, zone.z, waveR, 16, 0, null, col, 1.3);
    }

    var lblZ = zone.z < 0 ? zone.z - zone.r - 18 : zone.z + zone.r + 12;
    var lblY = zone.z < 0 ? 58 : -4;
    var lbl = project(cam, zone.x, lblY, lblZ);
    ctx.save();
    var zFont = Math.max(10, Math.round(11 * lbl.scale));
    ctx.font = "700 " + zFont + "px system-ui, sans-serif";
    var zText = zone.short.toUpperCase() + " · " + zState.badgeText;
    var zw = ctx.measureText(zText).width + 16;
    var zh = zFont + 8;
    ctx.fillStyle = "rgba(4, 10, 22, 0.92)";
    ctx.strokeStyle = active ? "#ffffff" : zone.color;
    ctx.lineWidth = active ? 1.8 : 1.1;
    ctx.beginPath();
    ctx.rect(lbl.x - zw / 2, lbl.y - zh / 2, zw, zh);
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = active ? "#ffffff" : zone.color;
    ctx.fillText(zText, lbl.x, lbl.y);
    ctx.restore();

    var center2D = project(cam, zone.x, 6, zone.z);
    return { type: "zone", id: zone.id, x: center2D.x, y: center2D.y, r: zone.r * center2D.scale * 0.75 };
  }

  function drawAgentAvatar(ctx, cam, agent, aState, selected, hovered, time) {
    var sCol = statusColor(aState.status, agent.color);
    var busy = aState.status === "working" || aState.status === "review" || aState.status === "alert";
    var bob = busy ? Math.sin(time * 5 + agent.x) * 2.2 : Math.sin(time * 1.8 + agent.z) * 0.8;
    var baseRot = Math.atan2(-agent.x, -agent.z);

    drawRing3D(ctx, cam, agent.x, 1, agent.z, selected || hovered ? 19 : 14, 12, time, "rgba(15, 23, 42, 0.85)", sCol, selected || hovered ? 2.4 : 1.2);
    drawBox3D(ctx, cam, agent.x, 0, agent.z + 10, 18, 10, 9, baseRot, "rgba(30, 41, 59, 0.95)", "rgba(15, 23, 42, 0.95)", agent.color);
    drawBox3D(ctx, cam, agent.x, 2, agent.z, 11, 15, 9, baseRot, "rgba(15, 36, 66, 0.96)", "rgba(10, 22, 44, 0.96)", agent.color);
    drawBox3D(ctx, cam, agent.x, 18 + bob, agent.z, 9.5, 9, 9.5, baseRot + (busy ? Math.sin(time * 3) * 0.15 : 0), sCol, "rgba(14, 28, 52, 0.96)", "#ffffff");

    if (busy || selected) {
      drawRing3D(ctx, cam, agent.x, 31 + bob, agent.z, 9, 10, -time * 2, null, sCol, 1.5);
    }

    var tagPos = project(cam, agent.x, 36 + bob, agent.z);
    var bodyPos = project(cam, agent.x, 14, agent.z);
    var fontPx = Math.max(9, Math.round(10.5 * tagPos.scale));
    ctx.save();
    ctx.font = "600 " + fontPx + "px system-ui, sans-serif";
    var textW = ctx.measureText(agent.name).width;
    var padX = 6;
    var boxW = textW + padX * 2 + 8;
    var boxH = fontPx + 7;
    var bx = tagPos.x - boxW / 2;
    var by = tagPos.y - boxH;

    ctx.fillStyle = selected ? "rgba(0, 240, 255, 0.24)" : "rgba(8, 15, 30, 0.86)";
    ctx.strokeStyle = selected || hovered ? "#ffffff" : sCol;
    ctx.lineWidth = selected || hovered ? 1.6 : 1;
    ctx.beginPath();
    ctx.rect(bx, by, boxW, boxH);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = sCol;
    ctx.beginPath();
    ctx.arc(bx + 6, by + boxH / 2, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f8fafc";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(agent.name, bx + 12, by + boxH / 2);
    ctx.restore();

    return {
      type: "agent",
      id: agent.id,
      zone: agent.zone,
      x: bodyPos.x,
      y: bodyPos.y,
      r: Math.max(18, 22 * bodyPos.scale)
    };
  }

  window.DashRender3D = {
    statusColor: statusColor,
    project: project,
    drawCyberFloor: drawCyberFloor,
    drawZonePlatform: drawZonePlatform,
    drawAgentAvatar: drawAgentAvatar
  };
})();
