"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, MinusCircle } from 'lucide-react'
import Link from "next/link"

const initialCounters = [
  { id: 1, queueLength: 5, jobTime: "10 min", avgWaitingTime: "15 min" },
  { id: 2, queueLength: 3, jobTime: "8 min", avgWaitingTime: "12 min" },
  { id: 3, queueLength: 7, jobTime: "15 min", avgWaitingTime: "20 min" },
  { id: 4, queueLength: 2, jobTime: "5 min", avgWaitingTime: "7 min" },
]

export default function QueueAnalysisDashboard() {
  const [counters, setCounters] = useState(initialCounters)

  const addCounter = () => {
    const newId = counters.length + 1
    setCounters([...counters, { 
      id: newId, 
      queueLength: 0, 
      jobTime: "0 min", 
      avgWaitingTime: "0 min" 
    }])
  }

  const removeCounter = () => {
    if (counters.length > 1) {
      setCounters(counters.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-col mt-16 gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Queue Analysis Dashboard</h1>
      
      {/* Add/Remove Counter Controls */}
      <div className="flex justify-end space-x-2">
        <Button onClick={addCounter}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Counter
        </Button>
        <Button onClick={removeCounter} variant="outline">
          <MinusCircle className="mr-2 h-4 w-4" />
          Remove Counter
        </Button>

        <Button variant="outline">

        <Link href={"queue/analyze"}>
          <MinusCircle className="mr-2 h-4 w-4" />
          Analyze Queue
        </Link>
        </Button>
      </div>
      
      {/* Counter Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {counters.map((counter) => (
          <Card key={counter.id}>
            <CardHeader>
              <CardTitle>Counter No. {counter.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <p>Queue Length: {counter.queueLength}</p>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <p>Job Time: {counter.jobTime}</p>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <p>Avg Waiting Time: {counter.avgWaitingTime}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Live Queue Analysis Video Section */}
      <Card>
        <CardHeader>
          <CardTitle>Live Queue Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Live video feed placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

