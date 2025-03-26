import React from 'react';
import { MedicalIcon } from './MedicalIcon';

interface FlowStep {
  text: string;
  icon: string;
}

interface FlowDiagramProps {
  steps: FlowStep[];
}

export function FlowDiagram({ steps }: FlowDiagramProps) {
  return (
    <div className="bg-gradient-to-br from-medical-50 to-white p-6 rounded-xl shadow-lg border border-medical-100">
      <h2 className="text-xl font-bold text-medical-800 mb-6 flex items-center gap-2">
        <MedicalIcon name="ArrowPath" className="w-6 h-6 text-medical-600" />
        Protocol Flow
      </h2>
      
      <div className="relative">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex items-start mb-8 last:mb-0"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-medical-500 to-medical-600 text-white flex items-center justify-center font-bold shadow-md">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-10 w-0.5 h-full bg-gradient-to-b from-medical-400 to-medical-200" />
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="bg-white p-4 rounded-lg shadow-md border border-medical-100 flex items-center gap-3 transition-transform duration-200 hover:scale-102">
                <MedicalIcon name={step.icon} className="w-6 h-6 text-medical-600" />
                <p className="text-medical-800">{step.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}