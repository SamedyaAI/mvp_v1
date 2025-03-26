import { DemographicsData } from '../../types/parser';

export function parseDemographics(summary: string): DemographicsData {
  const patientCountMatch = summary.match(/(\d+)\s*(?:patient|subject|participant)s?/i);
  const patientCount = patientCountMatch ? parseInt(patientCountMatch[1]) : undefined;

  const demographicsMatch = summary.match(/(?:Demographics?|Population):?\s*([^#]+?)(?=\n|$)/i);
  const demographics = demographicsMatch?.[1]
    ?.split(/[.;]/)
    .map(s => s.trim())
    .filter(s => s && s.length > 5) || [];

  return { demographics, patientCount };
}