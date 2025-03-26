import React from 'react';
import { ChartBarIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const liverFunctionData = [
  { name: 'Initial', AST: 45, ALT: 52, Bilirubin: 1.2 },
  { name: '1 Month', AST: 38, ALT: 42, Bilirubin: 0.9 },
  { name: '6 Months', AST: 32, ALT: 37, Bilirubin: 0.8 },
  { name: 'Current', AST: 28, ALT: 33, Bilirubin: 0.7 }
];

const dsaData = [
  { name: 'Initial', DQ4: 7000, DQ8: 7000 },
  { name: '1 Year', DQ4: 6000, DQ8: 5500 },
  { name: '2 Years', DQ4: 5000, DQ8: 4000 },
  { name: 'Current', DQ4: 4000, DQ8: 3000 }
];

export function TreatmentOutcomes() {
  return (
    <div className="bg-rose-50 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-rose-800 mb-4 flex items-center gap-2">
        <ChartBarIcon className="w-6 h-6" />
        Clinical Outcomes
      </h2>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-rose-700 mb-3 flex items-center gap-2">
            <BeakerIcon className="w-5 h-5" />
            Liver Function Trends
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={liverFunctionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="AST" stroke="#be123c" />
                <Line type="monotone" dataKey="ALT" stroke="#fb7185" />
                <Line type="monotone" dataKey="Bilirubin" stroke="#fda4af" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">DSA Level Reduction</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dsaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="DQ4" fill="#be123c" name="DQ4 Levels" />
                <Bar dataKey="DQ8" fill="#fb7185" name="DQ8 Levels" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}