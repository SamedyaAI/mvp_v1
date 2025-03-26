import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../../types/abstract';

interface StatisticsChartProps {
  data: ChartDataPoint[];
  title: string;
}

export function StatisticsChart({ data, title }: StatisticsChartProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#be123c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}