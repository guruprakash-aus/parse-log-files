import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TopItem } from '../../../types/log-analysis.types';

interface IPChartProps {
  data: TopItem[];
}

export const IPChart: React.FC<IPChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    ip: item.value,
    requests: item.count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ip" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="requests" fill="#48bb78" name="Requests" />
      </BarChart>
    </ResponsiveContainer>
  );
};