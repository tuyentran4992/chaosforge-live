/*
 * Dữ liệu dashboard. PM trực tiếp cập nhật file này (và chỉnh code trong user/dashboard/ khi cần khớp sprint).
 * Mọi mục có `link` trỏ tới báo cáo, story hoặc backlog làm nguồn.
 */
window.DASHBOARD_DATA = {
  project: "ChaosForge Live (Codex × TwitchCon)",
  updatedAt: "2026-10-27 17:41",

  decisions: [
    {
      id: "dec-004",
      title: "Chọn cách điều phối Sprint 02 (Code MVP 100% English UI)",
      recommendation: "Giao Lead-Code lập Technical Plan (TECHSTACK + ARCHITECT + tách module ≤250 dòng/file) rồi dùng OpenAI Codex thực thi để lấy Primary Codex Session ID (/status).",
      impact: "Đảm bảo kiến trúc đạt chuẩn 250 dòng/file, giao diện 100% tiếng Anh đồng nhất và có Codex Session ID hợp lệ nộp Devpost.",
      link: "../reports/2026-10-27-design-approved-sprint-02-opened.md"
    }
  ],

  newThings: [
    {
      title: "Đã khóa quy chuẩn 100% Tiếng Anh (Unified English UI) & Commit đóng 2 Sprint đầu",
      howToTry: "Xem yêu cầu 100% English UI tại DESIGN.md và us-006, us-007, us-008.",
      link: "../../specs/DESIGN.md"
    },
    {
      title: "Đã nghiệm thu Bộ Thiết kế ChaosForge Live (Phase 02 / Sprint 01 Done)",
      howToTry: "Mở trực tiếp bản thiết kế chính thức (index.html, overlay.html, design-system.html) để trải nghiệm đủ 3 màn hình và 6 trạng thái vòng.",
      link: "../../specs/design-handoff/index.html"
    }
  ],

  risks: [
    {
      id: "risk-004",
      title: "Bản Design Handoff hiện đang hiển thị tiếng Việt & mô phỏng tĩnh Twitch/Cross-tab",
      symptom: "Trong Sprint 02 (us-006, us-007, us-008), cần chuyển 100% văn bản UI sang tiếng Anh và nối logic thật cho Twitch IRC, Codex AST Compiler & đồng bộ cửa sổ.",
      severity: "medium",
      link: "../../specs/roadmap/phase-02/sprints/sprint-02/SPRINT.md"
    },
    {
      id: "risk-002",
      title: "Bắt buộc lưu Primary Codex Session ID khi bắt đầu code Sprint 02",
      symptom: "Nhớ gõ /status trên luồng Codex chính dùng để build dự án để điền form nộp bài trước 02/11/2026.",
      severity: "high",
      link: "../../specs/MISSION.md"
    }
  ],

  phases: [
    {
      id: "phase-01",
      title: "Nghiên cứu Hackathon & Chốt Ý tưởng",
      sprints: [
        {
          id: "sprint-01",
          title: "Nghiên cứu đề bài & Hội đồng tìm ý tưởng",
          kind: "delivery",
          status: "done",
          stories: [
            {
              id: "us-001",
              title: "Phân tích Codex x TwitchCon Hackathon & Hội đồng đề xuất ý tưởng",
              status: "accepted",
              link: "../../specs/roadmap/phase-01/sprints/sprint-01/stories/us-001.md"
            },
            {
              id: "us-002",
              title: "Chốt ý tưởng dự thi, bề mặt UI & phạm vi MVP 6 ngày",
              status: "accepted",
              link: "../../specs/roadmap/phase-01/sprints/sprint-01/stories/us-002.md"
            }
          ]
        }
      ]
    },
    {
      id: "phase-02",
      title: "Thiết kế & Phát triển MVP ChaosForge Live",
      sprints: [
        {
          id: "sprint-01",
          title: "Thiết kế UX/UI 3 bề mặt ChaosForge Live",
          kind: "design",
          status: "done",
          stories: [
            {
              id: "us-003",
              title: "Thiết kế Transparent OBS Browser Source Overlay (1920×1080)",
              status: "accepted",
              link: "../../specs/roadmap/phase-02/sprints/sprint-01/stories/us-003.md"
            },
            {
              id: "us-004",
              title: "Thiết kế Streamer Control Deck & 2-Streamer Versus Room",
              status: "accepted",
              link: "../../specs/roadmap/phase-02/sprints/sprint-01/stories/us-004.md"
            },
            {
              id: "us-005",
              title: "Thiết kế Virtual OBS Demo Stage & 500-Viewer Crowd Simulator",
              status: "accepted",
              link: "../../specs/roadmap/phase-02/sprints/sprint-01/stories/us-005.md"
            }
          ]
        },
        {
          id: "sprint-02",
          title: "Xây dựng Core Engine, Twitch/Codex Integration & UI (100% English)",
          kind: "delivery",
          status: "in-progress",
          stories: [
            {
              id: "us-006",
              title: "Triển khai 3 Bề mặt UI (100% English), Built-in Arcade & 2D Physics Overlay",
              status: "todo",
              link: "../../specs/roadmap/phase-02/sprints/sprint-02/stories/us-006.md"
            },
            {
              id: "us-007",
              title: "Tích hợp Bộ Biên dịch OpenAI Codex Structured AST, ToS Guard & Cartridges",
              status: "todo",
              link: "../../specs/roadmap/phase-02/sprints/sprint-02/stories/us-007.md"
            },
            {
              id: "us-008",
              title: "Tích hợp Twitch Chat/EventSub, Giả lập 500 Viewers & Phòng Raid 2 Streamer",
              status: "todo",
              link: "../../specs/roadmap/phase-02/sprints/sprint-02/stories/us-008.md"
            }
          ]
        }
      ]
    }
  ],

  release: null,

  backlog: [
    {
      id: "bl-003",
      title: "Triển khai Code MVP ChaosForge Live (phase-02/sprint-02, 100% English UI) & Lưu Primary Codex Session ID",
      state: "waiting",
      reason: "Đang mở sprint-02 (us-006, us-007, us-008); chờ xác nhận điều phối Lead-Code / Codex.",
      link: "../../specs/backlog/items/bl-003.md"
    }
  ],

  reports: [
    {
      date: "2026-10-27",
      title: "Nghiệm thu Bộ Thiết kế ChaosForge Live, Commit Git & Mở Sprint Code",
      link: "../reports/2026-10-27-design-approved-sprint-02-opened.md"
    },
    {
      date: "2026-10-27",
      title: "Chốt ý tưởng Codex Chaos Foundry & Trình duyệt Thiết kế UI",
      link: "../reports/2026-10-27-sprint-01-closed-idea-locked.md"
    },
    {
      date: "2026-10-27",
      title: "Đề xuất Top 3 ý tưởng Codex x TwitchCon Hackathon (Hội đồng cố vấn)",
      link: "../reports/2026-10-27-council-ideas.md"
    }
  ],

  agents: {
    "pm": {
      status: "working",
      task: "Đã commit đóng Sprint 01 & Sprint Design, khóa yêu cầu 100% English UI cho Sprint Code",
      link: "../reports/2026-10-27-design-approved-sprint-02-opened.md"
    },
    "lead-code": {
      status: "waiting",
      task: "Sẵn sàng nhận brief phase-02 / sprint-02 (us-006, us-007, us-008 — 100% English UI)",
      link: "../../specs/roadmap/phase-02/sprints/sprint-02/SPRINT.md"
    }
  }
};
