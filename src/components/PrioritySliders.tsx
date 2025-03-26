import React, { useState, useEffect } from 'react';
import { DocumentTextIcon, ChartBarIcon, CalculatorIcon } from '@heroicons/react/24/outline';

export interface PriorityValues {
  textual: number;
  graphical: number;
  symbolical: number;
}

interface PrioritySliderProps {
  onChange: (values: PriorityValues) => void;
}

export function PrioritySliders({ onChange }: PrioritySliderProps) {
  const [priorities, setPriorities] = useState<PriorityValues>({
    textual: 33,
    graphical: 33,
    symbolical: 34
  });

  const handleSliderChange = (type: keyof PriorityValues, value: number) => {
    const newPriorities = { ...priorities, [type]: value };
    const total = Object.values(newPriorities).reduce((sum, val) => sum + val, 0);
    
    // Normalize values to ensure sum equals 100
    if (total !== 100) {
      const factor = 100 / total;
      Object.keys(newPriorities).forEach(key => {
        newPriorities[key as keyof PriorityValues] = Math.round(newPriorities[key as keyof PriorityValues] * factor);
      });
      
      // Handle rounding errors
      const finalTotal = Object.values(newPriorities).reduce((sum, val) => sum + val, 0);
      if (finalTotal !== 100) {
        const diff = 100 - finalTotal;
        newPriorities[type] += diff;
      }
    }
    
    setPriorities(newPriorities);
    onChange(newPriorities);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Visualization Priorities</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Textual</span>
            </div>
            <span className="text-sm text-gray-600">{priorities.textual}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={priorities.textual}
            onChange={(e) => handleSliderChange('textual', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-sm text-gray-500 mt-1">Summaries and explanations</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-green-600" />
              <span className="font-medium">Graphical</span>
            </div>
            <span className="text-sm text-gray-600">{priorities.graphical}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={priorities.graphical}
            onChange={(e) => handleSliderChange('graphical', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <p className="text-sm text-gray-500 mt-1">Diagrams and charts</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CalculatorIcon className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Symbolical</span>
            </div>
            <span className="text-sm text-gray-600">{priorities.symbolical}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={priorities.symbolical}
            onChange={(e) => handleSliderChange('symbolical', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <p className="text-sm text-gray-500 mt-1">Equations and formulas</p>
        </div>
      </div>
    </div>
  );
}