export interface VisualAbstractData {
  header: {
    title: string;
    type: string;
    badges: string[];
  };
  methods: {
    type: 'flow';
    steps: Array<{
      text: string;
      icon?: string;
    }>;
  };
  results: {
    type: 'chart';
    chartType: 'bar' | 'line' | 'pie';
    title: string;
    data: Array<{
      name: string;
      value: number;
    }>;
  };
  keyFindings: Array<{
    text: string;
    metric?: string;
    icon: string;
  }>;
  conclusion: {
    mainFinding: string;
    metrics: string[];
  };
}