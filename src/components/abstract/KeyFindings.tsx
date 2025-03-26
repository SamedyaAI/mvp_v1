import React from 'react';
import { MedicalIcon } from './MedicalIcon';

interface KeyFinding {
  text: string;
  metric?: string;
  icon: string;
}

interface KeyFindingsProps {
  findings: KeyFinding[];
}

export function KeyFindings({ findings }: KeyFindingsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {findings.map((finding, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-medical-50 to-white p-4 rounded-lg shadow-md border border-medical-100 flex items-start gap-3 transition-transform duration-200 hover:scale-102"
        >
          <MedicalIcon name={finding.icon} className="w-6 h-6 text-medical-600" />
          <div>
            <p className="text-sm text-medical-800">{finding.text}</p>
            {finding.metric && (
              <span className="mt-2 inline-block px-2 py-1 bg-gradient-to-r from-medical-600 to-medical-500 text-white rounded-full text-sm shadow-sm">
                {finding.metric}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}