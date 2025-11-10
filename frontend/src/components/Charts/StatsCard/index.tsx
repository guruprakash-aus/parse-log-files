import React from 'react';
import './style.css';

interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <h4 className="stats-title">{title}</h4>
        <p className="stats-value">{value.toLocaleString()}</p>
      </div>
    </div>
  );
};