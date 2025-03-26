export interface ParserResult {
  title: string;
  studyType: string;
}

export interface DemographicsData {
  demographics: string[];
  patientCount?: number;
}

export interface NumericalData {
  value: number;
  unit: string;
  context: string;
}

export interface MethodsData {
  protocol: string[];
}

export interface TimeSeriesData {
  liverFunction?: Array<{
    name: string;
    AST: number;
    ALT: number;
    bilirubin: number;
  }>;
  dsaLevels?: Array<{
    name: string;
    DQ4: number;
    DQ8: number;
  }>;
}

export interface StatisticData {
  label: string;
  value: number;
  unit: string;
}