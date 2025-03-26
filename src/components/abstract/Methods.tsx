import React from 'react';
import { BeakerIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

interface MethodsProps {
  data?: {
    demographics?: string[];
    protocol?: string[];
    interventions?: string[];
  };
}

export function Methods({ data }: MethodsProps) {
  if (!data) return null;
  
  const { demographics = [], protocol = [], interventions = [] } = data;

  return (
    <div className="space-y-6">
      {demographics.length > 0 && (
        <div className="bg-rose-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-rose-800 mb-3 flex items-center gap-2">
            <UserGroupIcon className="w-6 h-6" />
            Study Population
          </h2>
          <ul className="space-y-2">
            {demographics.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {protocol.length > 0 && (
        <div className="bg-rose-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-rose-800 mb-3 flex items-center gap-2">
            <BeakerIcon className="w-6 h-6" />
            Study Protocol
          </h2>
          <ul className="space-y-2">
            {protocol.map((step, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {interventions.length > 0 && (
        <div className="bg-rose-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-rose-800 mb-3 flex items-center gap-2">
            <ClockIcon className="w-6 h-6" />
            Interventions
          </h2>
          <ul className="space-y-2">
            {interventions.map((intervention, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
                <span>{intervention}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}