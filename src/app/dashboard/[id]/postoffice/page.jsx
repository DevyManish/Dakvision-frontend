"use client";
import { PieGraph } from "@/components/charts/pie-graph";
import { AreaGraph } from "@/components/charts/area-graph";
import { BarGraph } from "@/components/charts/bar-graph";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import PageContainer from "@/components/layout/page-container";
import protectedRoute from "@/components/protectedRoute";
import { RecentSales } from "@/components/recent-sales";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndianRupee, Users, Clock, Printer } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PostOfficePage = () => {
  const [metrics, setMetrics] = useState({
    totalTransactions: 199708.23,
    customerServed: 2350,
    waitingTimeReduced: 12234,
    queueStatus: {
      currentQueue: 573,
      status: "normal",
      queueLength: 15,
    },
  });


  

  useEffect(() => {
    metrics.status === "overcrowded" ? alert("Queue is overcrowded") : null;
  });

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Post Office Dashboard Report",
    pageStyle: `
      @page { 
        size: A4 landscape; 
        margin: 10mm; 
      }
      @media print {
        body { 
          -webkit-print-color-adjust: exact; 
        }
      }
    `,
  });

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics((prevMetrics) => ({
        totalTransactions: +(
          prevMetrics.totalTransactions *
          (1 + (Math.random() * 0.05 - 0.025))
        ).toFixed(2),
        customerServed:
          prevMetrics.customerServed + Math.floor(Math.random() * 50),
        waitingTimeReduced:
          prevMetrics.waitingTimeReduced + Math.floor(Math.random() * 20),
        queueStatus: {
          currentQueue:
            prevMetrics.queueStatus.currentQueue +
            Math.floor(Math.random() * 50),
          status:
            prevMetrics.queueStatus.currentQueue > 600
              ? "overcrowded"
              : "normal",
          queueLength: Math.floor(Math.random() * 10) + 10,
        },
      }));
    };

    const intervalId = setInterval(updateMetrics, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <PageContainer scrollable={true}>
      <div ref={printRef} className="space-y-2 mt-16">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Post Office Inner Dashboard
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer size={16} /> Download / Print
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Transactions
                  </CardTitle>
                  <IndianRupee size={15} color="#AAA5A2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{metrics.totalTransactions.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Customer Served
                  </CardTitle>
                  <Users size={15} color="#AAA5A2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    +{metrics.customerServed}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Waiting Time Reduced
                  </CardTitle>
                  <Clock size={15} color="#AAA5A2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    +{metrics.waitingTimeReduced}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Queue Status
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    +{metrics.queueStatus.currentQueue}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Queue Condition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${
                      metrics.queueStatus.status === "overcrowded"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {metrics.queueStatus.status.charAt(0).toUpperCase() +
                      metrics.queueStatus.status.slice(1)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Queue Length: {metrics.queueStatus.queueLength} people
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph />
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    Counters are on 12% surplus in transactions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
              <div className="col-span-4">
                <AreaGraph />
              </div>
              <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default protectedRoute("branch_manager", PostOfficePage);
