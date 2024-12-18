'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { calculateTotalTime, getAnomalyTypes } from "./queue";

export function QueueDurationChart({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <p>No data available for queue duration.</p>;
  }

  const chartData = Object.entries(data).map(([id, person]) => ({
    name: id,
    duration: calculateTotalTime(person),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Queue Duration per Person</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" label={{ value: "Person ID", position: "insideBottom" }} />
            <YAxis label={{ value: "Duration (s)", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="duration" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function AnomalyDistributionChart({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <p>No data available for anomaly distribution.</p>;
  }

  const anomalyTypes = Object.values(data).flatMap(person =>
    getAnomalyTypes(person.anomalies)
  );

  const chartData = [
    {
      name: "Waiting too long",
      value: anomalyTypes.filter(type => type === "Waiting too long").length,
    },
    {
      name: "Abnormal size",
      value: anomalyTypes.filter(type => type === "Abnormal size").length,
    },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="hsl(var(--primary))"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
