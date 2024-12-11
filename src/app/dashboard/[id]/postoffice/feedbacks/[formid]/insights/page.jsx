'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { useParams } from "next/navigation";
import api from '@/lib/api';

export default function Page() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { formid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/feedback/${formid}/insights`
        );
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        setError('Failed to load survey insights.');
      }
    };

    fetchData();
  }, [formid]);

  if (error) return <div className="container mx-auto p-4">{error}</div>;
  if (!data) return <div className="container mx-auto p-4">Loading...</div>;

  const averageRatingsData = (data.averageRatingsPerQuestion || []).map(
    (item, index) => ({
      question: `Q${index + 1}`,
      score: item?._avg?.score || 0,
    })
  );

  const responseDistributionData = (data.responseDistribution || []).map(
    (item) => ({
      score: item?.score || 0,
      count: item?._count?.score || 0,
    })
  );

  const responsesPerUserData = (data.responsesPerUser || []).map((item) => ({
    email: item?.email || 'Unknown',
    count: item?._count?.id || 0,
  }));

  const sentimentData = [
    { name: 'Positive', value: parseFloat(data.positivePercentage) || 0 },
    { name: 'Negative', value: parseFloat(data.negativePercentage) || 0 },
  ];

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Survey Insights</h1>

      <Card>
        <CardHeader>
          <CardTitle>Overall Average Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {(data.overallAverageRating || 0).toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Ratings Per Question</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={averageRatingsData}>
                <XAxis dataKey="question" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="score" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseDistributionData}>
                <XAxis dataKey="score" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--chart-2))"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Responses Per User</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responsesPerUserData} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="email" type="category" width={150} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-3))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="hsl(var(--chart-4))"
                  label
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
