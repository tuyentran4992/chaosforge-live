// A conservative keyword guard, not a complete content moderation system.
const blocked = [
  /\b(?:kill(?:s|ed|ing|er|ers)?|murder(?:s|ed|ing|er|ers)?|suicid(?:e|al)|rap(?:e|es|ed|ist|ists)|nazis?|terroris(?:t|ts|m)|bomb(?:s|ed|ing|er|ers)?|doxx?(?:ed|ing)?|swastikas?)\b/i,
  /\b(?:child\s+(?:sexual|porn)|sexual\s+minor)\b/i,
  /\b(?:nsfw|porn(?:ography)?|gore|swat(?:ted|ting)?)\b/i,
  /\b(?:bombas?|bombes?)\b/i,
  /(?:giết\s+người|khủng\s+bố|tự\s+tử)/i,
  /(?:炸弹|炸彈|炸药|炸藥|爆炸物|杀人|殺人|恐怖主义|恐怖主義)/,
];

export function isUnsafePrompt(prompt) {
  if (typeof prompt !== 'string') return true;
  const normalized = prompt.normalize('NFKC').replace(/[\u200b-\u200f\u202a-\u202e\u2060\ufeff]/g, '');
  return /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(normalized) ||
    blocked.some((rule) => rule.test(normalized));
}
