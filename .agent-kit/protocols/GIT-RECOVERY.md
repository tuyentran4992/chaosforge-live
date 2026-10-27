# Khôi phục sau gián đoạn khi commit

Chỉ đọc khi resume thấy `intent.md` mà không có `receipt.md`, hoặc không chắc sprint đã commit hay chưa.

1. Tìm commit có parent bằng `HEAD` ghi trong intent và diff khớp các path hoặc hunk của sprint. Không tin commit message, không chỉ nhìn `HEAD`.
2. Đúng một commit khớp và đủ bằng chứng: ghi receipt khôi phục. Không commit lại.
3. Nhiều commit khớp, commit khác intent, hoặc thiếu bằng chứng: giữ `pending verification`, báo blocker cho người dùng.
4. Không có commit khớp, worktree và index vẫn đúng intent: tiếp tục từ bước stage của [SPRINT-CLOSURE](SPRINT-CLOSURE.md).
5. Không phân biệt được đã commit hay chưa: không retry commit.

`autoCommit: false` vẫn cho phép kiểm commit thủ công của người dùng và ghi receipt bằng bằng chứng thật.
