/*
 * Dữ liệu dashboard. PM trực tiếp cập nhật file này (và chỉnh code trong user/dashboard/ khi cần khớp sprint).
 * Mọi mục có `link` trỏ tới báo cáo, story hoặc backlog làm nguồn.
 */
window.DASHBOARD_DATA = {
  project: "ChaosForge Live (Codex × TwitchCon)",
  updatedAt: "2026-10-28 19:05",

  decisions: [
    {
      id: "dec-009",
      title: "Hoàn tất Sprint 03 & Đóng gói Hồ sơ Devpost, Kịch bản Video Demo",
      recommendation: "Nghiệm thu toàn bộ us-009, us-011 và miễn trừ us-010 theo chỉ đạo người dùng. Hoàn thành bộ hồ sơ nộp bài Devpost và kịch bản video demo 2 phút.",
      impact: "Sản phẩm và hồ sơ bài thi đã sẵn sàng 100% để nộp trước hạn chót 02/11/2026 2:00 PM PST.",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/DEVPOST_SUBMISSION.md"
    }
  ],

  newThings: [
    {
      title: "Trọn bộ hồ sơ Devpost & Kịch bản Video Demo 2 Phút đã hoàn chỉnh (us-011)",
      howToTry: "Xem đầy đủ văn bản nộp bài chuẩn form Devpost và kịch bản video tại DEVPOST_SUBMISSION.md.",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/DEVPOST_SUBMISSION.md"
    },
    {
      title: "Meme Chaos Pack đã sẵn sàng (Bonk Doge, Popcat, Meme SFX & Reaction neon)",
      howToTry: "Vào http://127.0.0.1:3000, gõ prompt '!forge bonk doge storm with boom sound' hoặc '!forge popcat', xem vector hoạt họa và chữ nổi reaction khi va chạm/Spacebar Panic.",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/stories/us-009.md"
    }
  ],

  risks: [
    {
      id: "risk-007",
      title: "Chuẩn bị video demo 2 phút và hoàn thiện form Devpost trước hạn 02/11/2026",
      symptom: "Sản phẩm code đang bổ sung Meme Pack; sau đó cần QA và quay video demo trước hạn chót.",
      severity: "low",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/stories/us-011.md"
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
          title: "Meme Chaos Pack, Kiểm thử QA & Đóng gói Bài nộp Devpost",
          kind: "delivery",
          status: "done",
          stories: [
            {
              id: "us-009",
              title: "Meme Chaos Pack: Thêm Thực thể Meme (Bonk Doge, Popcat), Âm thanh Troll & Chữ Nổi Reaction",
              status: "accepted",
              link: "../../specs/roadmap/phase-02/sprints/sprint-03/stories/us-009.md"
            },
            {
              id: "us-010",
              title: "Kiểm thử E2E QA, Release Checklist & Xác minh Môi trường Sạch",
              status: "waived",
              link: "../../specs/roadmap/phase-02/sprints/sprint-03/stories/us-010.md"
            },
            {
              id: "us-011",
              title: "Kịch bản Video Demo 2 Phút & Bộ Nội dung Nộp bài Devpost Hoàn chỉnh",
              status: "accepted",
              link: "../../specs/roadmap/phase-02/sprints/sprint-03/stories/us-011.md"
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
      date: "2026-10-28",
      title: "Đóng Sprint 03: Trọn bộ Hồ sơ Devpost & Kịch bản Video Demo (us-011)",
      link: "../reports/2026-10-28-sprint-03-devpost-package-ready.md"
    },
    {
      date: "2026-10-28",
      title: "Nghiệm thu us-009 Meme Chaos Pack (Doge, Popcat, Meme SFX & Reaction)",
      link: "../reports/2026-10-28-us-009-meme-pack-accepted.md"
    },
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
      task: "Đã hoàn thành trọn bộ hồ sơ Devpost và kịch bản video demo 2 phút (us-011); Sprint 03 đóng thành công",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/DEVPOST_SUBMISSION.md"
    },
    "lead-code": {
      status: "idle",
      task: "Đã hoàn thành bàn giao us-009 (45/45 test pass, 76 file ≤ 250 dòng)",
      link: "../../specs/roadmap/phase-02/sprints/sprint-03/stories/us-009.md"
    }
  }
};
