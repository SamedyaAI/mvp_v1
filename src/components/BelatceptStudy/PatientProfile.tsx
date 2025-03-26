import React from 'react';
import { UserGroupIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const rejectionData = [
  { name: 'Rejection Episodes', value: 7 },
  { name: 'Rejection-Free Period', value: 17 }
];

const COLORS = ['#be123c', '#fecdd3'];

export function PatientProfile() {
  return (
    <div className="space-y-6">
      <div className="bg-rose-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-rose-800 mb-3 flex items-center gap-2">
          <UserGroupIcon className="w-6 h-6" />
          Initial Presentation
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
              <span>7 rejection episodes over 18 months</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
              <span>High DSA levels (DQ4: 5000-7000 MFI)</span>
            </li>
          </ul>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rejectionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {rejectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-rose-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-rose-800 mb-3 flex items-center gap-2">
          <BeakerIcon className="w-6 h-6" />
          Treatment Protocol
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
              <span>Belatacept 5 mg/kg monthly</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
              <span>Started 3.5 years post-transplant</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
              <span>Regular liver function monitoring</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}