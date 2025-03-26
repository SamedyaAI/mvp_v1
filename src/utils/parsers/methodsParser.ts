import { MethodsData } from '../../types/parser';

export function parseMethods(summary: string): MethodsData {
  const methodsMatch = summary.match(/(?:Methods?|Protocol):?\s*([^#]+?)(?=\n|$)/i);
  const protocol = methodsMatch?.[1]
    ?.split(/[.;]/)
    .map(s => s.trim())
    .filter(s => s && s.length > 10) || [];

  return { protocol };
}