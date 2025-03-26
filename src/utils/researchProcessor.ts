import OpenAI from 'openai';
import type { VisualAbstractData } from '../types/abstract';
import type { PriorityValues } from '../components/PrioritySliders';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface ProcessedData {
  title: string;
  type: string;
  metrics: Array<{
    label: string;
    value: number;
    unit: string;
  }>;
  methods: string[];
  findings: string[];
}

function getSystemPrompt(priorities: PriorityValues) {
  return `You are a medical research visualization expert. Create visually engaging abstracts that effectively communicate research findings.

Content should be distributed according to these priorities:
- Textual (summaries, explanations): ${priorities.textual}%
- Graphical (diagrams, charts): ${priorities.graphical}%
- Symbolical (equations, formulas): ${priorities.symbolical}%

Guidelines:
1. Use appropriate medical icons (choose from: Beaker, Heart, Brain, Microscope, Dna, Virus, RectangleStack, ChartBar, ArrowTrendingUp)
2. Create data visualizations based on the data type:
   - Time series data -> Line charts
   - Comparisons -> Bar charts
   - Distributions -> Pie charts
3. Design clear information flow
4. Highlight key metrics with visual emphasis
5. Keep content concise and impactful
6. Maintain the specified distribution of content types

CRITICAL: Return ONLY a valid JSON object with this structure:
{
  "header": {
    "title": "string",
    "type": "string",
    "icon": "string (medical icon name)",
    "badges": ["string"]
  },
  "methods": {
    "type": "flow",
    "steps": [
      {
        "text": "string",
        "icon": "string (medical icon name)"
      }
    ]
  },
  "visualizations": [
    {
      "type": "bar|line|pie",
      "title": "string",
      "data": [{"name": "string", "value": number}]
    }
  ],
  "keyFindings": [
    {
      "text": "string",
      "metric": "string",
      "icon": "string (medical icon name)"
    }
  ],
  "conclusion": {
    "mainFinding": "string",
    "metrics": ["string"],
    "icon": "string (medical icon name)"
  }
}`;
}

/**
 * Extracts numerical metrics from text
 */
function extractMetrics(text: string): Array<{ label: string; value: number; unit: string }> {
  const metrics: Array<{ label: string; value: number; unit: string }> = [];
  const patterns = [
    { regex: /(\d+(?:\.\d+)?)\s*(?:mg|g|ml|L)/gi, type: 'measurement' },
    { regex: /(\d+(?:\.\d+)?)\s*%/gi, type: 'percentage' },
    { regex: /(\d+(?:\.\d+)?)\s*(?:U\/L|IU\/L|μmol\/L|mg\/dL)/gi, type: 'lab_value' }
  ];

  patterns.forEach(({ regex, type }) => {
    let match;
    while ((match = regex.exec(text)) !== null) {
      const value = parseFloat(match[1]);
      const unit = match[0].replace(match[1], '').trim();
      const context = text
        .substring(Math.max(0, match.index - 50), match.index)
        .split(/[.,;:]/)
        .pop()
        ?.trim() || type;
      
      metrics.push({
        label: context.charAt(0).toUpperCase() + context.slice(1),
        value,
        unit
      });
    }
  });

  return metrics;
}

/**
 * Processes raw research data into a structured format
 */
function processInitialData(text: string): ProcessedData {
  // Extract title and type
  const titleMatch = text.match(/(?:Title|Name)?:?\s*([^\n]+)/i);
  const title = titleMatch?.[1]?.trim() || 'Research Study';
  
  const typeMatch = text.match(/(?:study type|design):?\s*([^\n.,]+)/i);
  const type = typeMatch?.[1]?.trim() || 'Clinical Study';

  // Extract methods
  const methodsMatch = text.match(/(?:Methods?|Protocol):?\s*([^#]+?)(?=\n|$)/i);
  const methods = methodsMatch?.[1]
    ?.split(/[.;]/)
    .map(s => s.trim())
    .filter(s => s && s.length > 10) || [];

  // Extract findings
  const findingsMatch = text.match(/(?:Results?|Findings?):?\s*([^#]+?)(?=\n|$)/i);
  const findings = findingsMatch?.[1]
    ?.split(/[.;]/)
    .map(s => s.trim())
    .filter(s => s && s.length > 10) || [];

  return {
    title,
    type,
    metrics: extractMetrics(text),
    methods,
    findings
  };
}

/**
 * Selects appropriate icon based on method description
 */
function getMethodIcon(text: string): string {
  const iconMap: Record<string, string> = {
    patient: 'UserGroup',
    treatment: 'Beaker',
    analysis: 'ChartBar',
    measure: 'Scale',
    test: 'BeakerIcon',
    study: 'ClipboardDocument',
    data: 'DocumentChart',
    sample: 'ViewfinderCircle'
  };

  const matchedKey = Object.keys(iconMap).find(key => 
    text.toLowerCase().includes(key.toLowerCase())
  );

  return matchedKey ? iconMap[matchedKey] : 'ClipboardDocument';
}

/**
 * Creates initial visual abstract structure from processed data
 */
function createInitialAbstract(data: ProcessedData): VisualAbstractData {
  return {
    header: {
      title: data.title,
      type: data.type,
      badges: [data.type],
      icon: 'DocumentText'
    },
    methods: {
      type: 'flow',
      steps: data.methods.map(text => ({
        text,
        icon: getMethodIcon(text)
      }))
    },
    visualizations: data.metrics.length > 0 ? [
      {
        type: 'bar',
        title: 'Key Metrics',
        data: data.metrics.map(m => ({
          name: m.label,
          value: m.value
        }))
      }
    ] : [],
    keyFindings: data.findings.map(text => ({
      text,
      icon: 'ChartBar'
    })),
    conclusion: {
      mainFinding: data.findings[0] || 'Study demonstrates significant findings',
      metrics: data.metrics.map(m => `${m.label}: ${m.value}${m.unit}`),
      icon: 'CheckCircle'
    }
  };
}

/**
 * Main function to generate visual abstract from research text
 */
export async function generateVisualAbstract(summary: string, priorities: PriorityValues): Promise<VisualAbstractData> {
  try {
    // First, process the text to extract structured data
    const processedData = processInitialData(summary);
    const initialAbstract = createInitialAbstract(processedData);

    // Then, use LLM to refine and enhance the abstract
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: getSystemPrompt(priorities)
        },
        { 
          role: "user", 
          content: `Enhance and refine this visual abstract according to the specified priorities. Return ONLY a valid JSON object:\n\n${JSON.stringify(initialAbstract, null, 2)}\n\nOriginal text for context:\n${summary}`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('No response received');

    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON object found in response');
    }

    const parsedContent = JSON.parse(jsonMatch[0]);
    
    // Validate the structure
    if (!parsedContent.header || !parsedContent.methods || !parsedContent.conclusion) {
      throw new Error('Invalid response structure');
    }

    return parsedContent;
  } catch (error) {
    console.error('Error generating visual abstract:', error);
    throw error;
  }
}