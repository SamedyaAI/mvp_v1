import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DSALevelsChartProps {
  data: Array<{
    name: string;
    DQ4: number;
    DQ8: number;
  }>;
}

export function DSALevelsChart({ data }: DSALevelsChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [`${value} MFI`]}
          />
          <Legend />
          <Line type="monotone" dataKey="DQ4" stroke="#be123c" name="DQ4 Levels" />
          <Line type="monotone" dataKey="DQ8" stroke="#fb7185" name="DQ8 Levels" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}