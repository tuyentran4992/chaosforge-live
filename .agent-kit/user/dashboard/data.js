/*
 * Dữ liệu dashboard. PM trực tiếp cập nhật file này (và chỉnh code trong user/dashboard/ khi cần khớp sprint).
 * Mọi mục có `link` trỏ tới báo cáo, story hoặc backlog làm nguồn.
 */
window.DASHBOARD_DATA = {
  project: "ChaosForge Live (Codex × TwitchCon)",
  updatedAt: "2026-10-28 00:30",

  decisions: [
    {
      id: "dec-007",
      title: "Mở Sprint 03 (Release Validation & Đóng gói Bài nộp Devpost)",
      recommendation: "Mở Sprint 03 bao gồm us-009 (Kiểm thử QA E2E & Release Checklist) và us-010 (Kịch bản Video Demo 2 phút & Bộ nội dung nộp bài Devpost). Chưa điều phối agent theo yêu cầu người dùng.",
      impact: "Chuẩn bị đầy đủ tài liệu chất lượng cao để nộp bài trước hạn 02/11/2026 2:00 PM PST.",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/SPRINT.md"
    }
  ],

  newThings: [
    {
      title: "Đã khắc phục hoàn toàn 2 feedback UX (Bypass Unikey cho WASD, chống cuộn trang, nút Disconnect)",
      howToTry: "F5 lại trang http://127.0.0.1:3000 để lái tàu bằng WASD mượt mà và thử kết nối/ngắt kết nối Twitch.",
      link: "../../specs/roadmap/phase-02/sprints/sprint-02/SPRINT.md"
    },
    {
      title: "Đã mở Sprint 03: Kiểm thử QA & Đóng gói bài nộp Devpost",
      howToTry: "Xem chi tiết mục tiêu Sprint 03 tại SPRINT.md và hai user stories us-009, us-010.",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/SPRINT.md"
    }
  ],

  risks: [
    {
      id: "risk-007",
      title: "Chuẩn bị video demo 2 phút và hoàn thiện form Devpost trước hạn 02/11/2026",
      symptom: "Sản phẩm code đã nghiệm thu hoàn tất; cần quay video demo và hoàn thiện bài viết Devpost.",
      severity: "low",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/stories/us-010.md"
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
        },
        {
          id: "sprint-03",
          title: "Kiểm thử QA E2E & Đóng gói Bài nộp Devpost",
          kind: "release-validation",
          status: "in-progress",
          stories: [
            {
              id: "us-009",
              title: "Kiểm thử E2E QA, Release Checklist & Xác minh Môi trường Sạch",
              status: "todo",
              link: "../../specs/roadmap/phase-02/sprints/sprint-03/stories/us-009.md"
            },
            {
              id: "us-010",
              title: "Kịch bản Video Demo 2 Phút & Bộ Nội dung Nộp bài Devpost Hoàn chỉnh",
              status: "todo",
              link: "../../specs/roadmap/phase-02/sprints/sprint-03/stories/us-010.md"
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
      task: "Đã mở Sprint 03 (us-009, us-010); sẵn sàng điều phối khi người dùng yêu cầu",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/SPRINT.md"
    },
    "qa": {
      status: "waiting",
      task: "Chờ kích hoạt kiểm thử us-009 (Release Checklist & Clean Environment)",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/stories/us-009.md"
    }
  }
};
