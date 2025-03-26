import { parseTitleAndType } from './titleParser';
import { parseDemographics } from './demographicsParser';
import { parseNumericalData, extractTimeSeriesData } from './numericalParser';
import { parseMethods } from './methodsParser';
import { parseConclusion } from './conclusionParser';
import type { ResearchData } from '../../types/abstract';

export function parseResearchData(llmResponse: string): ResearchData {
  try {
    // First try to parse as JSON
    const data = JSON.parse(llmResponse);
    return transformLLMResponse(data);
  } catch (error) {
    // If JSON parsing fails, use our fallback text parsers
    return parseTextResponse(llmResponse);
  }
}

function transformLLMResponse(data: any): ResearchData {
  return {
    title: data.title || 'Research Study',
    studyType: data.studyType || 'Clinical Study',
    methods: {
      demographics: Array.isArray(data.demographics) ? data.demographics : [],
      protocol: Array.isArray(data.protocol) ? data.protocol : [],
      patientCount: typeof data.patientCount === 'number' ? data.patientCount : undefined,
      duration: data.duration
    },
    results: {
      statistics: Array.isArray(data.statistics) ? data.statistics : [],
      ...(data.timeSeriesData || {})
    },
    conclusion: data.conclusion || ''
  };
}

function parseTextResponse(text: string): ResearchData {
  const { title, studyType } = parseTitleAndType(text);
  const { demographics, patientCount } = parseDemographics(text);
  const { protocol } = parseMethods(text);
  const numericalData = parseNumericalData(text);
  const timeSeriesData = extractTimeSeriesData(text);
  const conclusion = parseConclusion(text);

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
      statistics: numericalData.map(({ value, unit, context }) => ({
        label: context.charAt(0).toUpperCase() + context.slice(1),
        value,
        unit
      })),
      ...timeSeriesData
    },
    conclusion
  };
}

function findDuration(data: Array<{ value: number; unit: string; context: string }>) {
  const durationEntry = data.find(d => d.unit.match(/years?|months?|weeks?|days?/i));
  return durationEntry ? `${durationEntry.value} ${durationEntry.unit}` : undefined;
}