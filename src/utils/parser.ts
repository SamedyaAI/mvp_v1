import { parseTitleAndType } from './parsers/titleParser';
import { parseDemographics } from './parsers/demographicsParser';
import { parseNumericalData, extractTimeSeriesData } from './parsers/numericalParser';
import { parseMethods } from './parsers/methodsParser';
import { parseConclusion } from './parsers/conclusionParser';
import type { ResearchData } from '../types/abstract';
import type { NumericalData } from '../types/parser';

function findDuration(data: NumericalData[]) {
  const durationEntry = data.find(d => d.unit.match(/years?|months?|weeks?|days?/i));
  return durationEntry ? `${durationEntry.value} ${durationEntry.unit}` : undefined;
}

export function parseResearchSummary(summary: string): ResearchData {
  const { title, studyType } = parseTitleAndType(summary);
  const { demographics, patientCount } = parseDemographics(summary);
  const numericalData = parseNumericalData(summary);
  const { protocol } = parseMethods(summary);
  const conclusion = parseConclusion(summary);
  const timeSeriesData = extractTimeSeriesData(summary);

  const statistics = numericalData.map(({ value, unit, context }) => ({
    label: context.charAt(0).toUpperCase() + context.slice(1),
    value,
    unit
  }));

  return {
    title,
    studyType,
    methods: {
      demographics,
      protocol,
      patientCount,
      duration: findDuration(numericalData)
    },
    results: {
      statistics,
      ...timeSeriesData
    },
    conclusion
  };
}