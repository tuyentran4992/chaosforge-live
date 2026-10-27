// FNV-1a over UTF-16 code units gives a stable choice across runtimes.
function hashPrompt(prompt) {
  let hash = 2166136261;
  for (let i = 0; i < prompt.length; i += 1) {
    hash = Math.imul(hash ^ prompt.charCodeAt(i), 16777619);
  }
  return hash >>> 0;
}

// Clause boundary delimiter: punctuation or conjunctions.
const CLAUSE_SPLIT = /[.;,!?]|\b(?:but|however|yet|though|although|while|except|and|nhưng|mà)\b/i;

// Standalone zero-gravity phrases: unless preceded by another negative verb, these mean zero gravity.
const ZERO_GRAV_EXPRESSION = /\b(?:no|without)\s+gravity\b|\bgravity[ -]?(?:free|off)\b|không\s+trọng\s*(?:lực|lượng)/i;

// Negation and avoidance vocabulary across supported languages.
const NEGATION_WORDS = /\b(?:no|not|never|none|nothing|neither|nor|don['’]?t|do\s+not|does\s+not|doesn['’]?t|didn['’]?t|did\s+not|won['’]?t|will\s+not|can['’]?t|cannot|shouldn['’]?t|should\s+not|wouldn['’]?t|would\s+not|mustn['’]?t|must\s+not|avoid(?:s|ed|ing)?|prevent(?:s|ed|ing)?|stop(?:s|ped|ping)?|disable(?:s|d|ing)?|forbid(?:s|den|ding)?|ban(?:s|ned|ning)?|skip(?:s|ped|ping)?|exclude(?:s|d|ing)?|without|against|refuse(?:s|d|ing)?|instead\s+of|rather\s+than)\b|không|đừng|chớ|tránh|ngăn|cấm|sin|evita(?:r)?|no\s+usar|別|不要|禁止|避免/i;

function isNegativeClause(clause) {
  let masked = clause;
  let hasNegationBefore = false;
  masked = masked.replace(ZERO_GRAV_EXPRESSION, (match, offset, str) => {
    const before = str.slice(0, offset);
    if (NEGATION_WORDS.test(before)) {
      hasNegationBefore = true;
      return match;
    }
    return ' __zero_grav__ ';
  });
  if (hasNegationBefore) return true;
  return NEGATION_WORDS.test(masked);
}

export function synthesize(prompt) {
  const text = typeof prompt === 'string' ? prompt.normalize('NFKC').trim().toLowerCase() : '';
  const hash = hashPrompt(text);
  const clauses = text.split(CLAUSE_SPLIT);
  const surviving = clauses.filter((c) => !isNegativeClause(c)).join(' ');

  const hasDuck = /duck|vịt|\bvit\b|鸭|鴨|\bpato\b/i.test(surviving);
  const hasBoss = /boss|trùm/i.test(surviving);
  const hasStar = /star|ngôi sao|星/i.test(surviving);
  const hasBall = /ball|bóng/i.test(surviving);
  const hasEntity = hasDuck || hasBoss || hasStar || hasBall;
  const entity = hasDuck ? 'duck' : hasBoss ? 'boss' : hasStar ? 'star' : hasBall ? 'ball' : ['ball', 'star', 'duck'][hash % 3];

  const hasZeroGrav = /float|zero[ -]?gravity|__zero_grav__|không\s+trọng\s*(?:lực|lượng)/i.test(surviving) || ZERO_GRAV_EXPRESSION.test(surviving);
  const hasReverseGrav = /(?:reverse|reversed|invert|inverted|anti)[ -]*(?:the[ -]+)?gravity|gravity[ -]+(?:is[ -]+)?(?:reversed|inverted|upside[ -]+down)|upside[ -]+down[ -]+gravity|đảo\s*(?:ngược)?\s*trọng\s*lực|trọng\s*lực\s*(?:bị\s*)?đảo\s*ngược|反重力|gravedad\s+invertida/i.test(surviving);
  const hasNormalGrav = /rain|falling|drop|dropping|fall|bouncing|bounce/i.test(surviving);
  const hasGravity = hasZeroGrav || hasReverseGrav || hasNormalGrav;

  const hasShield = /shield|khiên|escudo/i.test(surviving);
  const collision = hasShield ? 'shield' : hasZeroGrav ? 'float' : 'bounce';

  const hasSilent = /silent|no sound|không âm thanh/i.test(surviving);
  const hasLaser = /laser|laze/i.test(surviving);
  const hasQuack = /quack/i.test(surviving);
  const hasPop = /pop/i.test(surviving);
  const hasSfx = hasSilent || hasLaser || hasQuack || hasPop;
  const sfx = hasSilent ? 'none' : hasLaser ? 'laser' : hasQuack ? 'quack' : hasPop ? 'pop' :
    entity === 'duck' ? 'quack' : entity === 'boss' ? 'laser' : 'pop';

  const hasPositiveKeyword = hasEntity || hasGravity || hasShield || hasSfx;

  if (!hasPositiveKeyword) {
    return {
      entity,
      gravity: 0.5,
      collision: 'bounce',
      spawn_zone: 'edge_ring',
      sfx,
      duration: 30 + (hash % 16),
      tags: ['synthesized', entity, 'uncertain'],
    };
  }

  return {
    entity,
    gravity: hasZeroGrav ? 0 : hasReverseGrav ? -0.75 : 0.25 + (hash % 5) / 4,
    collision,
    spawn_zone: 'edge_ring',
    sfx,
    duration: 30 + (hash % 16),
    tags: ['synthesized', entity],
  };
}
