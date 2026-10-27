/*
 * Mô hình 5 phân khu văn phòng tương lai và 13 role agent, tự suy diễn trạng thái từ DASHBOARD_DATA.
 */
(function () {
  "use strict";

  var ZONES = [
    { id: "pm", name: "PM Command Bridge", short: "PM Bridge", x: 0, z: 0, r: 78, color: "#00f0ff", desc: "Trung tâm điều phối, quyết định sản phẩm, lộ trình và báo cáo người dùng." },
    { id: "code", name: "Code Engineering Bay", short: "Code Bay", x: -205, z: -115, r: 102, color: "#38bdf8", desc: "Phân khu kỹ thuật: lập plan, lập trình và dual review (Code + UX/UI)." },
    { id: "qa", name: "QA Validation Lab", short: "QA Lab", x: 205, z: -115, r: 82, color: "#10b981", desc: "Buồng kiểm thử độc lập E2E và cổng chặn khởi động sạch trước release." },
    { id: "council", name: "Council Holo-Chamber", short: "Hội đồng", x: -195, z: 135, r: 92, color: "#a855f7", desc: "Bàn tròn tư vấn đa góc nhìn chuyên gia và người dùng mô phỏng." },
    { id: "marketing", name: "Marketing Comms Studio", short: "Marketing", x: 195, z: 135, r: 98, color: "#ec4899", desc: "Trạm nghiên cứu thị trường, sáng tạo nội dung và kiểm duyệt nguồn." }
  ];

  var AGENTS = [
    { id: "pm", name: "PM", title: "Product Manager", zone: "pm", x: 0, z: -28, color: "#00f0ff", duty: "Đầu mối người dùng, sở hữu scope, ưu tiên, acceptance và dashboard." },
    { id: "lead-code", name: "Lead-Code", title: "Kỹ sư trưởng điều phối", zone: "code", x: -205, z: -176, color: "#38bdf8", duty: "Lập technical plan, điều phối Coder & 2 Reviewer, verify bản tích hợp." },
    { id: "coder", name: "Coder", title: "Kỹ sư phát triển", zone: "code", x: -268, z: -115, color: "#60a5fa", duty: "Người duy nhất sửa code nguồn, chạy checks, giữ giới hạn 250 dòng." },
    { id: "code-reviewer", name: "Code Reviewer", title: "Kiểm định mã nguồn", zone: "code", x: -142, z: -115, color: "#818cf8", duty: "Đánh giá độc lập logic, contract, SRP, giới hạn dòng và tests." },
    { id: "ux-ui-reviewer", name: "UX/UI Reviewer", title: "Kiểm định trải nghiệm", zone: "code", x: -205, z: -54, color: "#2dd4bf", duty: "Chạy thật kiểm tra giao diện, luồng tương tác và responsive so với DESIGN." },
    { id: "qa", name: "QA", title: "Kiểm thử nghiệm thu E2E", zone: "qa", x: 205, z: -145, color: "#10b981", duty: "Chạy bộ kịch bản cố định trên release candidate từ bước cài đặt sạch." },
    { id: "council-lead", name: "Council Lead", title: "Điều phối Hội đồng", zone: "council", x: -195, z: 78, color: "#a855f7", duty: "Chọn góc nhìn, điều phối chuyên gia & persona, tổng hợp đồng thuận và bất đồng." },
    { id: "council-specialist", name: "Specialist", title: "Chuyên gia độc lập", zone: "council", x: -250, z: 162, color: "#c084fc", duty: "Phân tích sâu theo từng lăng kính chuyên môn độc lập, không đọc code." },
    { id: "council-user", name: "User Persona", title: "Người dùng mô phỏng", zone: "council", x: -140, z: 162, color: "#e879f9", duty: "Phản hồi trực giác sử dụng thực tế từ góc nhìn người dùng phổ thông." },
    { id: "lead-marketing", name: "Lead-Marketing", title: "Trưởng nhóm Marketing", zone: "marketing", x: 195, z: 76, color: "#ec4899", duty: "Lập kế hoạch chiến dịch, phân công nghiên cứu, nội dung và kiểm duyệt." },
    { id: "marketing-researcher", name: "Researcher", title: "Nghiên cứu thị trường", zone: "marketing", x: 134, z: 135, color: "#f472b6", duty: "Thu thập dữ liệu thị trường hiện hành kèm URL, ngày nguồn và thời điểm kiểm." },
    { id: "marketer", name: "Marketer", title: "Sáng tạo nội dung", zone: "marketing", x: 256, z: 135, color: "#fb7185", duty: "Biên soạn thông điệp và tài liệu truyền thông dựa trên fact đã duyệt." },
    { id: "marketing-reviewer", name: "Mkt Reviewer", title: "Kiểm duyệt truyền thông", zone: "marketing", x: 195, z: 192, color: "#fda4af", duty: "Đối chiếu mọi claim với nguồn chuẩn, chặn nội dung thiếu bằng chứng." }
  ];

  function scanStories(phases) {
    var s = { total: 0, done: 0, inProgress: 0, review: 0, blocked: 0, todo: 0, activeSprint: null };
    (phases || []).forEach(function (ph) {
      (ph.sprints || []).forEach(function (sp) {
        if (sp.status === "in-progress" && !s.activeSprint) s.activeSprint = sp;
        (sp.stories || []).forEach(function (st) {
          s.total += 1;
          if (st.status === "accepted") s.done += 1;
          else if (st.status === "in-progress") s.inProgress += 1;
          else if (st.status === "review") s.review += 1;
          else if (st.status === "blocked") s.blocked += 1;
          else s.todo += 1;
        });
      });
    });
    return s;
  }

  function inferAgentState(agent, m, d) {
    var custom = d.agents && d.agents[agent.id];
    var status = "idle";
    var task = "Trực chiến tại vị trí — chờ nhiệm vụ mới.";
    var link = null;

    if (agent.id === "pm") {
      if (m.decisions > 0) {
        status = "alert";
        task = "Cần anh quyết " + m.decisions + " mục quan trọng: " + (d.decisions[0].title || "");
        link = d.decisions[0].link;
      } else if (m.activeSprint) {
        status = "working";
        task = "Theo dõi " + m.activeSprint.id + " (" + m.done + "/" + m.total + " story nghiệm thu)";
      } else if (m.reports > 0) {
        status = "pass";
        task = "Đã cập nhật " + m.reports + " báo cáo cho người dùng.";
      }
    } else if (agent.zone === "code") {
      if (m.blocked > 0) {
        status = "blocked";
        task = "Có " + m.blocked + " story đang bị chặn cần gỡ.";
      } else if (agent.id === "coder" && m.inProgress > 0) {
        status = "working";
        task = "Đang triển khai " + m.inProgress + " story trong " + (m.activeSprint ? m.activeSprint.id : "sprint");
      } else if ((agent.id === "code-reviewer" || agent.id === "ux-ui-reviewer") && m.review > 0) {
        status = "review";
        task = "Đang dual-review " + m.review + " story trên cùng snapshot.";
      } else if (agent.id === "lead-code" && (m.inProgress > 0 || m.review > 0)) {
        status = "working";
        task = "Điều phối team Code (" + m.inProgress + " đang làm, " + m.review + " chờ review).";
      } else if (m.total > 0 && m.done === m.total) {
        status = "pass";
        task = "Hoàn tất nghiệm thu " + m.done + "/" + m.total + " story.";
      }
    } else if (agent.id === "qa") {
      if (m.release === "pass") {
        status = "pass";
        task = "Release candidate đạt QA (" + ((d.release && d.release.candidate) || "RC") + ").";
        link = d.release && d.release.link;
      } else if (m.release === "fail" || m.release === "blocked") {
        status = "blocked";
        task = "Cổng QA báo " + m.release + ": " + ((d.release && d.release.summary) || "Cần xử lý lỗi.");
        link = d.release && d.release.link;
      }
    } else if (agent.zone === "council" && m.decisionBacklog > 0) {
      status = "waiting";
      task = "Sẵn sàng họp tư vấn cho " + m.decisionBacklog + " mục chờ quyết định.";
    }

    if (custom && typeof custom === "object") {
      if (custom.status) status = custom.status;
      if (custom.task) task = custom.task;
      if (custom.link) link = custom.link;
    }
    return { id: agent.id, status: status, task: task, link: link };
  }

  function inferZoneSummary(zone, agentStates, m) {
    var members = AGENTS.filter(function (a) { return a.zone === zone.id; });
    var statuses = members.map(function (a) { return agentStates[a.id].status; });
    var status = "idle";
    if (statuses.indexOf("blocked") !== -1) status = "blocked";
    else if (statuses.indexOf("alert") !== -1) status = "alert";
    else if (statuses.indexOf("working") !== -1) status = "working";
    else if (statuses.indexOf("review") !== -1) status = "review";
    else if (statuses.indexOf("pass") !== -1) status = "pass";
    else if (statuses.indexOf("waiting") !== -1) status = "waiting";

    var badgeText = members.length + " roles";
    if (zone.id === "pm") badgeText = m.decisions ? m.decisions + " cần quyết" : m.reports + " báo cáo";
    else if (zone.id === "code") badgeText = m.done + "/" + m.total + " story";
    else if (zone.id === "qa") badgeText = "QA: " + m.release.toUpperCase();
    else if (zone.id === "council") badgeText = "3 ghế tư vấn";
    else if (zone.id === "marketing") badgeText = "4 vị trí Mkt";

    return { id: zone.id, status: status, badgeText: badgeText, memberCount: members.length };
  }

  function computeWorld(raw) {
    var d = raw || {};
    var st = scanStories(d.phases);
    var decisions = Array.isArray(d.decisions) ? d.decisions.length : 0;
    var risks = Array.isArray(d.risks) ? d.risks : [];
    var highRisks = risks.filter(function (r) { return r.severity === "high"; }).length;
    var backlog = Array.isArray(d.backlog) ? d.backlog : [];
    var decisionBacklog = backlog.filter(function (b) { return b.state === "decision"; }).length;
    var release = d.release && d.release.result ? d.release.result : "not-run";

    var metrics = {
      decisions: decisions,
      newThings: Array.isArray(d.newThings) ? d.newThings.length : 0,
      highRisks: highRisks,
      totalRisks: risks.length,
      done: st.done,
      total: st.total,
      inProgress: st.inProgress,
      review: st.review,
      blocked: st.blocked,
      activeSprint: st.activeSprint,
      release: release,
      backlog: backlog.length,
      decisionBacklog: decisionBacklog,
      reports: Array.isArray(d.reports) ? d.reports.length : 0
    };

    var agentStates = {};
    AGENTS.forEach(function (a) {
      agentStates[a.id] = inferAgentState(a, metrics, d);
    });

    var zoneStates = {};
    ZONES.forEach(function (z) {
      zoneStates[z.id] = inferZoneSummary(z, agentStates, metrics);
    });

    return { zones: ZONES, agents: AGENTS, metrics: metrics, agentStates: agentStates, zoneStates: zoneStates };
  }

  window.DashWorld = { ZONES: ZONES, AGENTS: AGENTS, computeWorld: computeWorld };
})();
