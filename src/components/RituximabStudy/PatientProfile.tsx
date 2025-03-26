import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { UserGroupIcon, BeakerIcon } from '@heroicons/react/24/outline';

const genderData = [
  { name: 'Female', value: 33.3 },
  { name: 'Male', value: 66.7 }
];

const COLORS = ['#be123c', '#fecdd3'];

export function PatientProfile() {
  return (
    <div className="space-y-6">
      <div className="bg-rose-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-rose-800 mb-3 flex items-center gap-2">
          <UserGroupIcon className="w-6 h-6" />
          Patient Demographics
        </h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
              <span>Mean Age: 33.3 years (SD: 12.3)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
              <span>Mean Proteinuria: 6.2 g/day</span>
            </li>
          </ul>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
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
              <span>Two doses of RTX (500 mg each)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
              <span>7 days apart</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-600 rounded-full"></span>
              <span>CD19 count check after 4 weeks</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}