import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface LiverFunctionChartProps {
  data: Array<{
    name: string;
    AST: number;
    ALT: number;
    bilirubin: number;
  }>;
}

export function LiverFunctionChart({ data }: LiverFunctionChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="AST" stroke="#be123c" name="AST" />
          <Line type="monotone" dataKey="ALT" stroke="#fb7185" name="ALT" />
          <Line type="monotone" dataKey="bilirubin" stroke="#fda4af" name="Bilirubin" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}