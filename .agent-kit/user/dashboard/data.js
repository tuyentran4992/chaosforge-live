/*
 * Dữ liệu dashboard. PM trực tiếp cập nhật file này (và chỉnh code trong user/dashboard/ khi cần khớp sprint).
 * Mọi mục có `link` trỏ tới báo cáo, story hoặc backlog làm nguồn.
 */
window.DASHBOARD_DATA = {
  project: "ChaosForge Live (Codex × TwitchCon)",
  updatedAt: "2026-10-27 23:25",

  decisions: [
    {
      id: "dec-006",
      title: "Nghiệm thu Toàn diện Sprint 02 (Code Delivery) — 100% Tiêu chí Đạt PASS",
      recommendation: "Nghiệm thu cả 3 user stories (us-006, us-007, us-008) sau khi 36/36 tests passed, 2 reviewers PASS, và Lead-Code xác minh thực chạy 95 FPS trên browser/OBS.",
      impact: "Hoàn tất trọn vẹn sản phẩm ChaosForge Live theo đúng cam kết Devpost, lưu đầy đủ Primary Codex Session ID và sẵn sàng cho giai đoạn release.",
      link: "../reports/2026-10-27-sprint-02-code-completed.md"
    }
  ],

  newThings: [
    {
      title: "Ứng dụng ChaosForge Live đã sẵn sàng chạy thật trên localhost:3000 (95 FPS, 100% English UI)",
      howToTry: "Chạy `npm start` rồi mở `http://127.0.0.1:3000` để trải nghiệm Virtual OBS Stage, 500-Viewer Crowd Simulator và Spacebar Panic Clear.",
      link: "../reports/2026-10-27-sprint-02-code-completed.md"
    },
    {
      title: "Đã lưu chính thức Primary Codex Session ID (01a17cfb-d16d-7fa3-a6e6-9b6846ea3cc2)",
      howToTry: "Xem chi tiết Session ID và 3 Chat IDs trong README.md hoặc MISSION.md.",
      link: "../../specs/MISSION.md"
    }
  ],

  risks: [
    {
      id: "risk-006",
      title: "Chuẩn bị video demo 2 phút và tài liệu nộp bài Devpost trước hạn 02/11/2026",
      symptom: "Sản phẩm code đã xong hoàn chỉnh; bước tiếp theo là đóng gói video demo và hoàn thiện form Devpost.",
      severity: "low",
      link: "../reports/2026-10-27-sprint-02-code-completed.md"
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
          status: "done",
          stories: [
            {
              id: "us-006",
              title: "Triển khai 3 Bề mặt UI (100% English), Built-in Arcade & 2D Physics Overlay",
              status: "accepted",
              link: "../../specs/roadmap/phase-02/sprints/sprint-02/stories/us-006.md"
            },
            {
              id: "us-007",
              title: "Tích hợp Bộ Biên dịch OpenAI Codex Structured AST, ToS Guard & Cartridges",
              status: "accepted",
              link: "../../specs/roadmap/phase-02/sprints/sprint-02/stories/us-007.md"
            },
            {
              id: "us-008",
              title: "Tích hợp Twitch Chat/EventSub, Giả lập 500 Viewers & Phòng Raid 2 Streamer",
              status: "accepted",
              link: "../../specs/roadmap/phase-02/sprints/sprint-02/stories/us-008.md"
            }
          ]
        }
      ]
    }
  ],

  release: null,

  backlog: [],

  reports: [
    {
      date: "2026-10-27",
      title: "Nghiệm thu Hoàn thành Sprint 02 (Code Delivery) — ChaosForge Live",
      link: "../reports/2026-10-27-sprint-02-code-completed.md"
    },
    {
      date: "2026-10-27",
      title: "Quyết định Chính sách r3: Local Fallback, ToS Guard 4 Lớp & Hiển thị Poll OBS",
      link: "../reports/2026-10-27-sprint-02-r3-policy-decisions.md"
    },
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
      status: "idle",
      task: "Đã nghiệm thu us-006, us-007, us-008 và đóng Sprint 02 (Code Delivery)",
      link: "../reports/2026-10-27-sprint-02-code-completed.md"
    },
    "lead-code": {
      status: "idle",
      task: "Đã hoàn tất task-sprint-02-02-code (36/36 tests pass, 95 FPS)",
      link: "../../handoffs/task-sprint-02-02-code-01/r3/result.md"
    }
  }
};
