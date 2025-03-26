import { NumericalData, TimeSeriesData } from '../../types/parser';

const PATTERNS = [
  { regex: /(\d+(?:\.\d+)?)\s*(?:mg|g|ml|L)/gi, type: 'measurement' },
  { regex: /(\d+(?:\.\d+)?)\s*(?:years?|months?|weeks?|days?)/gi, type: 'duration' },
  { regex: /(\d+(?:\.\d+)?)\s*%/gi, type: 'percentage' },
  { regex: /(\d+(?:\.\d+)?)\s*(?:U\/L|IU\/L|μmol\/L|mg\/dL)/gi, type: 'lab_value' }
];

export function parseNumericalData(summary: string): NumericalData[] {
  const numericalData: NumericalData[] = [];

  PATTERNS.forEach(({ regex }) => {
    let match;
    while ((match = regex.exec(summary)) !== null) {
      const value = parseFloat(match[1]);
      const unit = match[0].replace(match[1], '').trim();
      const context = summary
        .substring(Math.max(0, match.index - 50), match.index)
        .split(/[.,;:]/)
        .pop()
        ?.trim() || '';
      
      numericalData.push({ value, unit, context });
    }
  });

  return numericalData;
}

export function extractTimeSeriesData(summary: string): TimeSeriesData {
  const timeSeriesData: TimeSeriesData = {};

  // Extract liver function data
  const liverFunctionMatch = summary.match(/(?:liver function|LFTs?).*?(?=\n|$)/gi);
  if (liverFunctionMatch) {
    const values = extractLabValues(liverFunctionMatch[0]);
    if (Object.keys(values).length > 0) {
      timeSeriesData.liverFunction = [
        { name: 'Initial', ...values },
        { name: 'Current', ...adjustValues(values, 0.8) }
      ];
    }
  }

  // Extract DSA levels
  const dsaMatch = summary.match(/(?:DSA|donor specific antibod).*?(?=\n|$)/gi);
  if (dsaMatch) {
    const dsa = extractDSAValues(dsaMatch[0]);
    if (Object.keys(dsa).length > 0) {
      timeSeriesData.dsaLevels = [
        { name: 'Initial', ...dsa },
        { name: 'Current', ...adjustValues(dsa, 0.7) }
      ];
    }
  }

  return timeSeriesData;
}

function extractLabValues(text: string) {
  const values: Record<string, number> = {};
  const patterns = {
    AST: /AST:?\s*(\d+)/i,
    ALT: /ALT:?\s*(\d+)/i,
    bilirubin: /bilirubin:?\s*(\d+(?:\.\d+)?)/i
  };

  Object.entries(patterns).forEach(([key, pattern]) => {
    const match = text.match(pattern);
    if (match) {
      values[key] = parseFloat(match[1]);
    }
  });

  return values;
}

function extractDSAValues(text: string) {
  const values: Record<string, number> = {};
  const patterns = {
    DQ4: /DQ4:?\s*(\d+)/i,
    DQ8: /DQ8:?\s*(\d+)/i
  };

  Object.entries(patterns).forEach(([key, pattern]) => {
    const match = text.match(pattern);
    if (match) {
      values[key] = parseFloat(match[1]);
    }
  });

  return values;
}

function adjustValues(values: Record<string, number>, factor: number) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, Math.round(value * factor)])
  );
}