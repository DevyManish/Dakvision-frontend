"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";

export default function Page() {
  const [showCounters, setShowCounters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCounters(true);
  };

  return (
    <>
      <Header />
      <div className="py-14 mt-10">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Queue Status
        </h2>
      </div>
      <div className="container mx-auto p-4 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pinCode">Pin Code</Label>
              <Input id="pinCode" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branchName">Branch Name</Label>
              <Input id="branchName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" required />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>

        {showCounters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((counter) => (
              <Card key={counter}>
                <CardHeader>
                  <CardTitle>Counter {counter}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="font-semibold">Status</div>
                    <div className="flex space-x-2">
                      <Badge variant="success" className="bg-yellow-400 items-center">Current Queue: {Math.floor(Math.random() * 40) + 20}</Badge>
                      <Badge variant="warning" className="bg-green-400 items-center">
                        Your Position: {Math.floor(Math.random() * 20) + 1}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
