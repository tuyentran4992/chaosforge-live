import { MAX_STATE_DETAIL, MAX_IDEA_LENGTH, MAX_POLL_IDEAS } from '../../shared/sync-contract.js';

export function encodePoll(ideas, votes, seconds) {
  const snapshot = {
    ideas: ideas.slice(0, MAX_POLL_IDEAS).map((idea) => String(idea).slice(0, MAX_IDEA_LENGTH)),
    votes: votes.slice(0, MAX_POLL_IDEAS).map((vote) => Number.isSafeInteger(vote) && vote >= 0 ? vote : 0),
    seconds: Number.isFinite(seconds) ? Math.max(0, Math.min(15, seconds)) : 0,
  };
  const detail = JSON.stringify(snapshot);
  if (detail.length > MAX_STATE_DETAIL) throw new RangeError('Poll snapshot exceeds synchronization limit');
  return detail;
}
