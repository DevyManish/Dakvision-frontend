"use client";

import React, { useState, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-08-01", desktop: 300, mobile: 120 },
  { date: "2024-08-02", desktop: 320, mobile: 100 },
  { date: "2024-08-03", desktop: 280, mobile: 110 },
  { date: "2024-08-04", desktop: 340, mobile: 140 },
  { date: "2024-08-05", desktop: 410, mobile: 130 },
  { date: "2024-08-06", desktop: 220, mobile: 120 },
  { date: "2024-08-07", desktop: 380, mobile: 150 },
  { date: "2024-08-08", desktop: 260, mobile: 80 },
  { date: "2024-08-09", desktop: 290, mobile: 90 },
  { date: "2024-08-10", desktop: 310, mobile: 120 },
  { date: "2024-08-11", desktop: 300, mobile: 100 },
  { date: "2024-08-12", desktop: 250, mobile: 120 },
  { date: "2024-08-13", desktop: 320, mobile: 110 },
  { date: "2024-08-14", desktop: 350, mobile: 90 },
  { date: "2024-08-15", desktop: 230, mobile: 80 },
  { date: "2024-08-16", desktop: 280, mobile: 110 },
  { date: "2024-08-17", desktop: 370, mobile: 130 },
  { date: "2024-08-18", desktop: 400, mobile: 120 },
  { date: "2024-08-19", desktop: 220, mobile: 90 },
  { date: "2024-08-20", desktop: 290, mobile: 100 },
  { date: "2024-08-21", desktop: 260, mobile: 110 },
  { date: "2024-08-22", desktop: 280, mobile: 120 },
  { date: "2024-08-23", desktop: 340, mobile: 140 },
  { date: "2024-08-24", desktop: 230, mobile: 110 },
  { date: "2024-08-25", desktop: 270, mobile: 120 },
  { date: "2024-08-26", desktop: 310, mobile: 130 },
  { date: "2024-08-27", desktop: 320, mobile: 140 },
  { date: "2024-08-28", desktop: 350, mobile: 110 },
  { date: "2024-08-29", desktop: 290, mobile: 120 },
  { date: "2024-08-30", desktop: 330, mobile: 130 },
  { date: "2024-08-31", desktop: 260, mobile: 100 },
  
  { date: "2024-09-01", desktop: 240, mobile: 90 },
  { date: "2024-09-02", desktop: 320, mobile: 140 },
  { date: "2024-09-03", desktop: 300, mobile: 130 },
  { date: "2024-09-04", desktop: 310, mobile: 120 },
  { date: "2024-09-05", desktop: 280, mobile: 90 },
  { date: "2024-09-06", desktop: 260, mobile: 80 },
  { date: "2024-09-07", desktop: 350, mobile: 110 },
  { date: "2024-09-08", desktop: 400, mobile: 140 },
  { date: "2024-09-09", desktop: 330, mobile: 120 },
  { date: "2024-09-10", desktop: 270, mobile: 100 },
  { date: "2024-09-11", desktop: 320, mobile: 90 },
  { date: "2024-09-12", desktop: 310, mobile: 110 },
  { date: "2024-09-13", desktop: 290, mobile: 120 },
  { date: "2024-09-14", desktop: 260, mobile: 90 },
  { date: "2024-09-15", desktop: 240, mobile: 80 },
  { date: "2024-09-16", desktop: 280, mobile: 120 },
  { date: "2024-09-17", desktop: 350, mobile: 150 },
  { date: "2024-09-18", desktop: 290, mobile: 130 },
  { date: "2024-09-19", desktop: 310, mobile: 100 },
  { date: "2024-09-20", desktop: 250, mobile: 80 },
  { date: "2024-09-21", desktop: 330, mobile: 120 },
  { date: "2024-09-22", desktop: 280, mobile: 110 },
  { date: "2024-09-23", desktop: 310, mobile: 120 },
  { date: "2024-09-24", desktop: 300, mobile: 90 },
  { date: "2024-09-25", desktop: 320, mobile: 130 },
  { date: "2024-09-26", desktop: 270, mobile: 110 },
  { date: "2024-09-27", desktop: 340, mobile: 120 },
  { date: "2024-09-28", desktop: 250, mobile: 100 },
  { date: "2024-09-29", desktop: 280, mobile: 110 },
  { date: "2024-09-30", desktop: 290, mobile: 100 },

  { date: "2024-10-01", desktop: 300, mobile: 120 },
  { date: "2024-10-02", desktop: 310, mobile: 110 },
  { date: "2024-10-03", desktop: 290, mobile: 100 },
  { date: "2024-10-04", desktop: 320, mobile: 120 },
  { date: "2024-10-05", desktop: 270, mobile: 110 },
  { date: "2024-10-06", desktop: 330, mobile: 130 },
  { date: "2024-10-07", desktop: 350, mobile: 150 },
  { date: "2024-10-08", desktop: 240, mobile: 90 },
  { date: "2024-10-09", desktop: 260, mobile: 100 },
  { date: "2024-10-10", desktop: 310, mobile: 120 },
  { date: "2024-10-11", desktop: 320, mobile: 110 },
  { date: "2024-10-12", desktop: 280, mobile: 100 },
  { date: "2024-10-13", desktop: 250, mobile: 90 },
  { date: "2024-10-14", desktop: 340, mobile: 140 },
  { date: "2024-10-15", desktop: 310, mobile: 120 },
  { date: "2024-10-16", desktop: 290, mobile: 130 },
  { date: "2024-10-17", desktop: 350, mobile: 150 },
  { date: "2024-10-18", desktop: 280, mobile: 110 },
  { date: "2024-10-19", desktop: 300, mobile: 120 },
  { date: "2024-10-20", desktop: 310, mobile: 130 },
  { date: "2024-10-21", desktop: 250, mobile: 90 },
  { date: "2024-10-22", desktop: 320, mobile: 140 },
  { date: "2024-10-23", desktop: 300, mobile: 120 },
  { date: "2024-10-24", desktop: 310, mobile: 110 },
  { date: "2024-10-25", desktop: 260, mobile: 90 },
  { date: "2024-10-26", desktop: 290, mobile: 120 },
  { date: "2024-10-27", desktop: 320, mobile: 140 },
  { date: "2024-10-28", desktop: 350, mobile: 110 },
  { date: "2024-10-29", desktop: 290, mobile: 120 },
  { date: "2024-10-30", desktop: 330, mobile: 130 },
  { date: "2024-10-31", desktop: 260, mobile: 100 }
]

const chartConfig = {
    views: {
      label: 'Page Views'
    },
    desktop: {
      label: 'Total',
      color: 'hsl(var(--chart-1))'
    },
    mobile: {
      label: 'This Month',
      color: 'hsl(var(--chart-2))'
    }
  } 

export function BarGraph() {
    const [activeChart, setActiveChart] = useState('desktop');
  
    const total = useMemo(() => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0)
    }), []);
  
    return (
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Customer Footfall & Service Time Trends</CardTitle>
            <CardDescription>
            Show metrics like counter service time per customer .
            </CardDescription>
          </div>
          <div className="flex">
            {['desktop', 'mobile'].map((key) => {
              return (
                <button
                  key={key}
                  data-active={activeChart === key}
                  className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(key)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[key].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[280px] w-full"
          >
            <BarChart
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      });
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }
