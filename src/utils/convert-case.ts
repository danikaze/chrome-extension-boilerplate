export type CaseType =
  | 'pascal'
  | 'snake'
  | 'uc'
  | 'kebab'
  | 'camel'
  | 'camelAsIs';

type TokenJoiner = (tokens: string[]) => string;
type Tokenizer = (text: string) => string[];

/**
 * Convert a text written with certain case styling to another
 *
 * - `pascal`: PascalCase
 * - `snake`: snake_case
 * - `uc`: UPPER_CASE
 * - `kebab`: kebab-case
 * - `camel`: camelCase
 * - `camelAsIs`: camelCase (but doesn't lowercase if already cameled)
 */
export function convertCase(
  text: string | undefined,
  from: CaseType,
  to: CaseType
): string {
  if (!text) return '';
  if (from === to) return text;
  const tokens = splitter[from](text);
  return joiner[to](tokens);
}

export function validateCase(text: string, type: CaseType): boolean {
  return validators[type](text);
}

const splitter: Record<CaseType, Tokenizer> = {
  pascal: tokenizer(/[A-Z]/, true),
  snake: tokenizer(/_/, false),
  uc: tokenizer(/_/, false),
  kebab: tokenizer(/-/, false),
  camel: tokenizer(/[A-Z]/, true),
  camelAsIs: tokenizer(/[A-Z]/, true),
};

const joiner: Record<CaseType, TokenJoiner> = {
  pascal: (tokens) => tokens.map(capitalize).join(''),
  snake: (tokens) => tokens.join('_').toLowerCase(),
  uc: (tokens) => tokens.join('_').toUpperCase(),
  kebab: (tokens) => tokens.join('-').toLowerCase(),
  camel: (tokens) =>
    tokens
      .map((tok, i) => (i === 0 ? tok.toLowerCase() : capitalize(tok)))
      .join(''),
  camelAsIs: (tokens) =>
    tokens.map((tok, i) => (i === 0 ? tok : capitalize(tok))).join(''),
};

const validators: Record<CaseType, (text: string) => boolean> = {
  pascal: (text) => /^[A-Z][A-Za-z0-9]*$/.test(text),
  snake: (text) => /^[a-z][a-z0-9_]*$/.test(text),
  uc: (text) => /^[A-Z][A-Z0-9_]*$/.test(text),
  kebab: (text) => /^[a-z][a-z0-9\-]*$/.test(text),
  camel: (text) => /^[a-z][A-Za-z0-9]*$/.test(text),
  camelAsIs: (text) => /^[a-z][A-Za-z0-9]*$/.test(text),
};

function capitalize(text: string): string {
  return text[0].toUpperCase() + text.substring(1).toLowerCase();
}

function tokenizer(separator: RegExp, includeSeparator: boolean): Tokenizer {
  return (text) => {
    const tokens: string[] = [];
    let curr = '';
    for (const char of text) {
      if (!separator.test(char)) {
        curr += char;
        continue;
      }
      curr && tokens.push(curr);
      curr = includeSeparator ? char : '';
    }
    curr && tokens.push(curr);
    return tokens;
  };
}
