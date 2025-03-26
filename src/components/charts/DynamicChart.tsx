import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';

const MEDICAL_COLORS = [
  '#0ea5e9', // Primary
  '#0891b2', // Secondary
  '#0284c7', // Accent
  '#0369a1', // Dark
  '#7dd3fc', // Light
];

const CHART_CONFIG = {
  animate: true,
  strokeWidth: 2,
  radius: 4,
};

interface ChartProps {
  type?: 'bar' | 'line' | 'pie';
  data?: Array<{
    name: string;
    value: number;
  }>;
  title?: string;
}

export function DynamicChart({ type = 'bar', data = [], title }: ChartProps) {
  // Early return if no data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-medical-100 text-center">
        <p className="text-medical-600">No data available for visualization</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-medical-200">
        <p className="font-semibold text-medical-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} className="medical-chart">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#475569' }}
              axisLine={{ stroke: '#94a3b8' }}
            />
            <YAxis
              tick={{ fill: '#475569' }}
              axisLine={{ stroke: '#94a3b8' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill={MEDICAL_COLORS[0]}
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={MEDICAL_COLORS[index % MEDICAL_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="name"
              tick={{ fill: '#475569' }}
              axisLine={{ stroke: '#94a3b8' }}
            />
            <YAxis
              tick={{ fill: '#475569' }}
              axisLine={{ stroke: '#94a3b8' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={MEDICAL_COLORS[0]}
              strokeWidth={2}
              dot={{ r: 4, fill: MEDICAL_COLORS[0] }}
              activeDot={{ r: 6 }}
              animationDuration={1500}
            />
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={MEDICAL_COLORS[index % MEDICAL_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        );

      default:
        return (
          <div className="text-center text-medical-600">
            Unsupported chart type
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-medical-100">
      {title && (
        <h3 className="text-lg font-semibold text-medical-800 mb-4">
          {title}
        </h3>
      )}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}