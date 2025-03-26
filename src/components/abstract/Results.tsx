import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { DynamicChart } from '../charts/DynamicChart';

interface ResultsProps {
  data?: {
    visualizations?: Array<{
      type: string;
      title: string;
      description: string;
      data: Array<{
        label: string;
        value: number;
        unit: string;
        category?: string;
      }>;
      layout: {
        xAxis: string;
        yAxis: string;
      };
    }>;
  };
}

export function Results({ data }: ResultsProps) {
  if (!data?.visualizations?.length) return null;

  return (
    <div className="bg-rose-50 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-rose-800 mb-4 flex items-center gap-2">
        <ChartBarIcon className="w-6 h-6" />
        Key Findings
      </h2>
      
      <div className="space-y-6">
        {data.visualizations.map((viz, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">{viz.title}</h3>
            {viz.description && (
              <p className="text-sm text-gray-600 mb-4">{viz.description}</p>
            )}
            <DynamicChart 
              data={viz.data}
              type={viz.type as any}
              layout={viz.layout}
              title={viz.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}