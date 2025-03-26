import { ParserResult } from '../../types/parser';

export function parseTitleAndType(summary: string): ParserResult {
  const titleMatch = summary.match(/(?:Title|Name)?:?\s*([^\n]+)/i);
  const title = titleMatch?.[1]?.trim() || 'Research Study';

  const studyTypeMatch = summary.match(/(?:study type|design):?\s*([^\n.,]+)/i);
  const studyType = studyTypeMatch?.[1]?.trim() || 'Clinical Study';

  return { title, studyType };
}