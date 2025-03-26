import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const remissionData = [
  {
    name: 'Complete Remission',
    value: 19.0
  },
  {
    name: 'Partial Remission',
    value: 42.9
  },
  {
    name: 'CD19 Depletion',
    value: 95.2
  }
];

export function TreatmentOutcomes() {
  return (
    <div className="bg-rose-50 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-rose-800 mb-4 flex items-center gap-2">
        <ChartBarIcon className="w-6 h-6" />
        Treatment Outcomes
      </h2>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Response Rates</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={remissionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#be123c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">Total Remission: 61.9%</h3>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div className="bg-rose-600 h-6 rounded-full" style={{width: '61.9%'}}></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Complete: 19.0%</span>
            <span>Partial: 42.9%</span>
          </div>
        </div>
      </div>
    </div>
  );
}