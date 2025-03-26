import React from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import * as Icons from '@heroicons/react/24/outline';
import { exportToPng } from '../utils/export';
import { DynamicChart } from './charts/DynamicChart';
import { FlowDiagram } from './abstract/FlowDiagram';
import { KeyFindings } from './abstract/KeyFindings';
import type { VisualAbstractData } from '../types/abstract';

interface VisualAbstractProps {
  data: VisualAbstractData;
}

export function VisualAbstract({ data }: VisualAbstractProps) {
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[`${iconName}Icon`] || Icons.DocumentTextIcon;
    return <Icon className="w-8 h-8 text-white" />;
  };

  const handleDownload = async () => {
    await exportToPng('visual-abstract', 'visual-abstract');
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={handleDownload}
        className="ml-auto block bg-rose-100 hover:bg-rose-200 text-rose-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2"
      >
        <DocumentTextIcon className="w-5 h-5" />
        Download PNG
      </button>

      <div id="visual-abstract" className="visual-abstract">
        {/* Header */}
        <div className="visual-abstract-header">
          <div className="flex items-center justify-center gap-3 mb-4">
            {getIcon(data.header.icon)}
            <h1 className="text-2xl md:text-3xl font-bold text-center">{data.header.title}</h1>
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            {data.header.badges.map((badge, i) => (
              <span key={i} className="visual-abstract-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 grid gap-6">
          {/* Methods Flow */}
          <div className="visual-abstract-section">
            <FlowDiagram steps={data.methods.steps} />
          </div>

          {/* Visualizations */}
          {data.visualizations?.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {data.visualizations.map((viz, index) => (
                <div key={index} className="chart-container">
                  <DynamicChart 
                    type={viz.type}
                    data={viz.data}
                    title={viz.title}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Key Findings */}
          <KeyFindings findings={data.keyFindings} />

          {/* Conclusion */}
          <div className="conclusion-section">
            <div className="flex items-center justify-center gap-3 mb-4">
              {getIcon(data.conclusion.icon)}
              <p className="text-xl font-semibold text-center">{data.conclusion.mainFinding}</p>
            </div>
            <div className="flex justify-center gap-3 flex-wrap">
              {data.conclusion.metrics.map((metric, i) => (
                <span key={i} className="metric-badge">
                  {metric}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}