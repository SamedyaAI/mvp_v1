import React from 'react';
import { CheckCircleIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface ConclusionProps {
  data?: {
    mainFinding: string;
    implications: string[];
    keyMetrics: Array<{
      label: string;
      value: number;
      unit: string;
    }>;
  };
}

export function Conclusion({ data }: ConclusionProps) {
  if (!data?.mainFinding) return null;

  return (
    <div className="bg-rose-700 text-white p-6">
      <div className="flex items-center justify-center gap-4">
        <CheckCircleIcon className="w-8 h-8" />
        <p className="text-center text-xl font-semibold">{data.mainFinding}</p>
        <ArrowTrendingUpIcon className="w-8 h-8" />
      </div>
      
      {data.keyMetrics?.length > 0 && (
        <div className="mt-3 flex justify-center gap-4 flex-wrap">
          {data.keyMetrics.map((metric, index) => (
            <span key={index} className="px-3 py-1 bg-rose-600 rounded-full text-sm">
              {metric.label}: {metric.value}{metric.unit}
            </span>
          ))}
        </div>
      )}

      {data.implications?.length > 0 && (
        <div className="mt-4 text-sm text-rose-100">
          <ul className="list-disc list-inside space-y-1">
            {data.implications.map((implication, index) => (
              <li key={index}>{implication}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}