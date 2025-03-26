import React from 'react';
import { DynamicChart } from '../charts/DynamicChart';
import { FlowDiagram } from './FlowDiagram';
import { KeyPoints } from './KeyPoints';
import * as Icons from '@heroicons/react/24/outline';

interface SectionProps {
  section: {
    type: string;
    content: any;
  };
}

export function DynamicSection({ section }: SectionProps) {
  const renderContent = () => {
    switch (section.type) {
      case 'header':
        return (
          <div className="bg-rose-700 text-white p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              {section.content.title}
            </h1>
            {section.content.metadata && (
              <div className="mt-3 flex justify-center gap-4 flex-wrap">
                {Object.entries(section.content.metadata).map(([key, value]) => (
                  value && (
                    <span key={key} className="px-3 py-1 bg-rose-600 rounded-full text-sm">
                      {value}
                    </span>
                  )
                ))}
              </div>
            )}
          </div>
        );

      case 'flow':
        return (
          <FlowDiagram 
            title={section.content.title} 
            steps={section.content.steps} 
          />
        );

      case 'visualization':
        return (
          <div className="bg-rose-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">{section.content.title}</h3>
            {section.content.description && (
              <p className="text-sm text-gray-600 mb-4">{section.content.description}</p>
            )}
            <DynamicChart {...section.content} />
          </div>
        );

      case 'keyPoints':
        return (
          <KeyPoints 
            title={section.content.title} 
            points={section.content.points} 
          />
        );

      case 'conclusion':
        return (
          <div className="bg-rose-700 text-white p-6">
            <p className="text-xl font-semibold text-center">
              {section.content.mainFinding}
            </p>
            {section.content.implications?.length > 0 && (
              <div className="mt-4 flex justify-center gap-4 flex-wrap">
                {section.content.implications.map((text: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-rose-600 rounded-full text-sm">
                    {text}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return renderContent();
}