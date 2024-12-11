"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, MinusCircle, User, Briefcase, Activity } from 'lucide-react'

const initialCounters = [
  { id: 1, employeeName: "John Doe", counterType: "Deposit", status: "Active" },
  { id: 2, employeeName: "Jane Smith", counterType: "Parcels", status: "Idle" },
  { id: 3, employeeName: "Mike Johnson", counterType: "Helpdesk", status: "Active" },
  { id: 4, employeeName: "Sarah Williams", counterType: "Insurances", status: "Active" },
]

const counterTypes = ["Deposit", "Parcels", "Helpdesk", "Insurances"]

export default function CounterManagementDashboard() {
  const [counters, setCounters] = useState(initialCounters)

  const addCounter = () => {
    const newId = counters.length + 1
    const randomType = counterTypes[Math.floor(Math.random() * counterTypes.length)]
    setCounters([...counters, { 
      id: newId, 
      employeeName: `Employee ${newId}`, 
      counterType: randomType, 
      status: "Idle" 
    }])
  }

  const removeCounter = () => {
    if (counters.length > 1) {
      setCounters(counters.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-col mt-16 gap-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Counter Management Dashboard</h1>
      
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
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <p>{counter.employeeName}</p>
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                <p>{counter.counterType}</p>
              </div>
              <div className="flex items-center">
                <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                <Badge variant={counter.status === "Active" ? "default" : "secondary"}>
                  {counter.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

