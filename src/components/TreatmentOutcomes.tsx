import React from 'react';

export function TreatmentOutcomes() {
  return (
    <div className="bg-rose-50 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-rose-800 mb-4">Treatment Outcomes</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Total Remission: 61.9%</h3>
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div className="bg-rose-600 h-6 rounded-full" style={{width: '61.9%'}}></div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>Complete: 19.0%</span>
          <span>Partial: 42.9%</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">CD19 Depletion Success: 95.2%</h3>
        <div className="w-full bg-gray-200 rounded-full h-6">
          <div className="bg-rose-600 h-6 rounded-full" style={{width: '95.2%'}}></div>
        </div>
      </div>
    </div>
  );
}