// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart';
// import {
//   Bar,
//   BarChart,
//   Line,
//   LineChart,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
// } from 'recharts';
// import { useParams } from "next/navigation";
// import api from '@/lib/api';

// export default function Page() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const { formid } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(
//           `/feedback/${formid}/insights`
//         );
//         const json = await response.json();
//         setData(json.data);
//       } catch (err) {
//         setError('Failed to load survey insights.');
//       }
//     };

//     fetchData();
//   }, [formid]);

//   if (error) return <div className="container mx-auto p-4">{error}</div>;
//   if (!data) return <div className="container mx-auto p-4">Loading...</div>;

//   const averageRatingsData = (data.averageRatingsPerQuestion || []).map(
//     (item, index) => ({
//       question: `Q${index + 1}`,
//       score: item?._avg?.score || 0,
//     })
//   );

//   const responseDistributionData = (data.responseDistribution || []).map(
//     (item) => ({
//       score: item?.score || 0,
//       count: item?._count?.score || 0,
//     })
//   );

//   const responsesPerUserData = (data.responsesPerUser || []).map((item) => ({
//     email: item?.email || 'Unknown',
//     count: item?._count?.id || 0,
//   }));

//   const sentimentData = [
//     { name: 'Positive', value: parseFloat(data.positivePercentage) || 0 },
//     { name: 'Negative', value: parseFloat(data.negativePercentage) || 0 },
//   ];

//   return (
//     <div className="container mx-auto p-4 space-y-8">
//       <h1 className="text-3xl font-bold mb-4">Survey Insights</h1>

//       <Card>
//         <CardHeader>
//           <CardTitle>Overall Average Rating</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-4xl font-bold">
//             {(data.overallAverageRating || 0).toFixed(2)}
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Average Ratings Per Question</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={averageRatingsData}>
//                 <XAxis dataKey="question" />
//                 <YAxis />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <Bar dataKey="score" fill="hsl(var(--chart-1))" />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Response Distribution</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={responseDistributionData}>
//                 <XAxis dataKey="score" />
//                 <YAxis />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <Line
//                   type="monotone"
//                   dataKey="count"
//                   stroke="hsl(var(--chart-2))"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Responses Per User</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={responsesPerUserData} layout="vertical">
//                 <XAxis type="number" />
//                 <YAxis dataKey="email" type="category" width={150} />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//                 <Bar dataKey="count" fill="hsl(var(--chart-3))" />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Sentiment Analysis</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={sentimentData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   fill="hsl(var(--chart-4))"
//                   label
//                 />
//                 <ChartTooltip content={<ChartTooltipContent />} />
//               </PieChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  Legend,
} from "recharts";

const barChartData = [
  { question: "Question 1", averageScore: 4.5 },
  { question: "Question 2", averageScore: 4.75 },
  { question: "Question 3", averageScore: 5.25 },
];

const pieChartData = [
  { name: "Positive", value: 75 },
  { name: "Negative", value: 25 },
];

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"];

export default function Page() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { formid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/feedback/${formid}/insights`);
        setData(response.data.data);
      } catch (err) {
        setError("Failed to load survey insights.");
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
    email: item?.email || "Unknown",
    count: item?._count?.id || 0,
  }));

  const sentimentData = [
    { name: "Positive", value: parseFloat(data.positivePercentage) || 0 },
    { name: "Negative", value: parseFloat(data.negativePercentage) || 0 },
  ];
  return (
    <div className="w-full max-w-3xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Employee Satisfaction Survey Results</CardTitle>
          <CardDescription>Average scores per question</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              averageScore: {
                label: "Average Score",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={barChartData}>
              <XAxis dataKey="question" />
              <YAxis />
              <Bar
                dataKey="averageScore"
                fill="var(--color-averageScore)"
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Sentiment Distribution</CardTitle>
          <CardDescription>Positive vs Negative Feedback Ratio</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              positive: {
                label: "Positive",
                color: "hsl(var(--chart-1))",
              },
              negative: {
                label: "Negative",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
