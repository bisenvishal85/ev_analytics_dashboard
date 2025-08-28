import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
  @media (min-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ChartBox = styled.div`
  background: ${(p: any) => p.theme.cardBg};
  padding: 10px;
  border-radius: 8px;
  box-shadow: var(--smooth-shadow);
`;

const COLORS = ["#1976d2", "#60a5fa", "#16a34a", "#f59e0b", "#ef4444", "#7c3aed"];

export default function EVCharts({ rows }: { rows: any[] }) {
  // By year
  const byYearMap = new Map<number, number>();
  rows.forEach((r) => {
    if (!r.modelYear) return;
    byYearMap.set(r.modelYear, (byYearMap.get(r.modelYear) ?? 0) + 1);
  });
  const byYear = Array.from(byYearMap.entries())
    .map(([year, count]) => ({ year: String(year), count }))
    .sort((a, b) => Number(a.year) - Number(b.year));

  // Top makes
  const makeMap = new Map<string, number>();
  rows.forEach((r) => {
    const m = r.make || "Unknown";
    makeMap.set(m, (makeMap.get(m) ?? 0) + 1);
  });
  const topMakes = Array.from(makeMap.entries())
    .map(([make, count]) => ({ make, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // type dist
  const typeMap = new Map<string, number>();
  rows.forEach((r) => {
    const t = r.evType || "Unknown";
    typeMap.set(t, (typeMap.get(t) ?? 0) + 1);
  });
  const byType = Array.from(typeMap.entries()).map(([name, value]) => ({ name, value }));

  return (
    <Grid>
      <ChartBox style={{ height: 280 }}>
        <h4 style={{ margin: "6px 0" }}>EV Registrations by Year</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={byYear}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line dataKey="count" stroke="#1976d2" />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <ChartBox style={{ height: 260 }}>
          <h4 style={{ margin: "6px 0" }}>Top Makes</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topMakes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="make" interval={0} angle={-30} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox style={{ height: 260 }}>
          <h4 style={{ margin: "6px 0" }}>Type Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byType} dataKey="value" nameKey="name" outerRadius={80} label>
                {byType.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
    </Grid>
  );
}
