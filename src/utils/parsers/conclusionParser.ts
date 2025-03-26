export function parseConclusion(summary: string): string {
  const conclusionMatch = summary.match(/(?:Conclusion|Summary):?\s*([^#]+?)(?=\n|$)/i);
  return conclusionMatch?.[1]?.trim() || 'Study results demonstrate significant findings';
}