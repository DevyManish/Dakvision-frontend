"use client";

import { useState } from "react";
import { PersonCard } from "@/components/queue/person-card";
import { Summary } from "@/components/queue/summary";
import {
  QueueDurationChart,
  AnomalyDistributionChart,
} from "@/components/queue/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export default function QueueAnalysis() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upload");
  const [queueData, setQueueData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    const fileInput = e.target.elements.namedItem("file");

    if (!fileInput?.files?.length) {
      toast({
        title: "No file selected",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    formData.append("file", fileInput.files[0]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/process-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setQueueData(response.data);
      setActiveTab("individual");

      console.log(response.data);
      toast({
        title: "Analysis complete",
        description: "Queue data has been processed successfully.",
      });
    } catch (error) {
      const errorMessage = "Failed to analyze queue. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Failed to analyze queue:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Queue Analysis Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="individual" disabled={!queueData}>
            Individual Analysis
          </TabsTrigger>
          <TabsTrigger value="summary" disabled={!queueData}>
            Summary
          </TabsTrigger>
          
        </TabsList>
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Video for Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitHandler} className="space-y-4">
                <Input
                  type="file"
                  name="file"
                  accept="video/*"
                  disabled={loading}
                  required
                />
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Analyzing..." : "Analyze Queue"}
                </Button>
              </form>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {queueData && (
          <>
            <TabsContent value="individual" className="mt-6">
              <div className="space-y-4">
                {queueData &&
                  Object.entries(queueData.person_details).map(
                    ([id, person]) => (
                      <PersonCard key={id} id={id} person={person} />
                    )
                  )}
              </div>
            </TabsContent>

            <TabsContent value="summary" className="mt-6">
              {queueData ? (
                <Summary data={queueData} />
              ) : (
                <div>Error loading summary data</div>
              )}
            </TabsContent>
            
          </>
        )}
      </Tabs>
    </div>
  );
}
