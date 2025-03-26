import React from 'react';

export function PatientData() {
  return (
    <div className="space-y-6">
      <div className="bg-rose-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-rose-800 mb-3">Patient Demographics</h2>
        <ul className="space-y-2">
          <li>• Mean Age: 33.3 years (SD: 12.3)</li>
          <li>• Female: 33.3%</li>
          <li>• Mean Proteinuria: 6.2 g/day</li>
        </ul>
      </div>

      <div className="bg-rose-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-rose-800 mb-3">Treatment Protocol</h2>
        <ul className="space-y-2">
          <li>• Two doses of RTX (500 mg each)</li>
          <li>• 7 days apart</li>
          <li>• CD19 count check after 4 weeks</li>
        </ul>
      </div>
    </div>
  );
}