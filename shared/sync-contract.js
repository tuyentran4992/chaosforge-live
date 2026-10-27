// A poll holds at most three 160-code-unit ideas. JSON escaping can expand
// each code unit to six characters, so 4096 accommodates the full snapshot.
export const MAX_STATE_DETAIL = 4096;
export const MAX_IDEA_LENGTH = 160;
export const MAX_POLL_IDEAS = 3;
