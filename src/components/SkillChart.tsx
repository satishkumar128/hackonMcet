import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';

export interface SkillDatum {
  subject: string;
  fullMark?: number;
  [key: string]: any;
}

interface SkillChartProps {
  data?: SkillDatum[];
  dataKey?: string; // which numeric key to plot (default 'A')
  height?: number; // px
}

export default function SkillChart({ data = [], dataKey = 'A', height = 350 }: SkillChartProps) {
  // Guard against empty or invalid data
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-[300px] min-h-[300px] flex items-center justify-center rounded bg-gray-50">
        <div className="text-sm text-slate-500">No chart data available</div>
      </div>
    );
  }

  const maxFullMark = Math.max(
    1,
    ...(data.map((d) => (typeof d.fullMark === 'number' ? d.fullMark : 0)) || []),
  );

  const maxValue = Math.max(
    maxFullMark,
    ...(data.map((d) => (typeof d[dataKey] === 'number' ? d[dataKey] : 0)) || []),
  );

  return (
    <div className="w-full min-h-[300px]" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <defs>
            <linearGradient id="gradRadar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6d28d9" stopOpacity={1} />
              <stop offset="100%" stopColor="#0891b2" stopOpacity={1} />
            </linearGradient>
          </defs>

          <PolarGrid stroke="rgba(124,58,237,0.12)" />
          <PolarAngleAxis dataKey="subject" stroke="#374151" tick={{ fontSize: 12, fill: '#111827' }} />
          <PolarRadiusAxis angle={30} domain={[0, Math.max(1, maxValue)]} />

          <Radar
            name="Score"
            dataKey={dataKey}
            stroke="url(#gradStroke)"
            fill="url(#gradRadar)"
            fillOpacity={0.6}
          />

          <Tooltip
            wrapperStyle={{ background: 'rgba(255,255,255,0.95)', borderRadius: 8 }}
            contentStyle={{ border: 'none', boxShadow: '0 6px 20px rgba(2,6,23,0.12)' }}
          />
          <Legend verticalAlign="top" height={36} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}