import React from 'react';
import type { LogAnalysisResult } from '../../types/log-analysis.types';
import { StatsCard } from '../Charts/StatsCard';
import { IPChart } from '../Charts/IPChart';
import { URLChart } from '../Charts/URLChart';
import './style.css';

interface DashboardProps {
  data: LogAnalysisResult;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onReset }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Log Analysis Results</h2>
        <button className="reset-button" onClick={onReset}>
          Analyze Another File
        </button>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Requests"
          value={data.total_requests}
          icon="📊"
        />
        <StatsCard
          title="Unique IP Addresses"
          value={data.unique_ip_count}
          icon="🌐"
        />
        <StatsCard
          title="Unique URLs"
          value={data.all_url_stats.length}
          icon="🔗"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Top 3 Most Visited URLs</h3>
          <URLChart data={data.top_urls} />
        </div>

        <div className="chart-container">
          <h3>Top 3 Most Active IP Addresses</h3>
          <IPChart data={data.top_ips} />
        </div>
      </div>

      <div className="details-section">
        <div className="detail-card">
          <h3>All Unique IP Addresses ({data.unique_ip_count})</h3>
          <div className="ip-list">
            {data.unique_ips.map((ip, index) => (
              <span key={index} className="ip-badge">
                {ip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};