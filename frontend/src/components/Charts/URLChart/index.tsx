import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TopItem } from '../../../types/log-analysis.types';

interface URLChartProps {
  data: TopItem[];
}

export const URLChart: React.FC<URLChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    url: item.value.length > 30 ? item.value.substring(0, 30) + '...' : item.value,
    fullUrl: item.value,
    visits: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="url" angle={-45} textAnchor="end" height={100} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="visits" fill="#4299e1" name="Visits" />
      </BarChart>
    </ResponsiveContainer>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      fullUrl: string;
      url: string;
      visits: number;
    };
    value?: number;
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{payload[0].payload.fullUrl}</p>
        <p style={{ margin: '5px 0 0 0', color: '#4299e1' }}>
          Visits: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};