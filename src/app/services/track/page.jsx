"use client"
import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Truck, Package, Box } from "lucide-react"
import Header from '@/components/header'

const stages = [
  { name: "Dispatched", icon: Box },
  { name: "On the Way", icon: Truck },
  { name: "Out for Delivery", icon: Package },
  { name: "Delivered", icon: CheckCircle2 }
]

const Page = () => {
  const [packageId, setPackageId] = useState("")
  const [currentStage, setCurrentStage] = useState(-1)

  const handleSubmit = e => {
    e.preventDefault()
    // Simulate tracking by setting a random stage
    setCurrentStage(Math.floor(Math.random() * 4))
  }

  return (
    <>
      <Header/>
      <div className="max-w-md mx-auto mt-32 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Package Tracker</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="space-y-2">
            <Label htmlFor="packageId">Package ID</Label>
            <Input
              id="packageId"
              value={packageId}
              onChange={e => setPackageId(e.target.value)}
              placeholder="Enter your package ID"
              required
            />
          </div>
          <Button type="submit" className="mt-4 w-full">
            Track Package
          </Button>
        </form>
        <div className="relative pt-2">
          <div className="absolute top-0 left-6 w-[2px] h-full bg-gray-200" />
          <div
            className="absolute top-0 left-6 w-[2px] bg-yellow-400 transition-all duration-500 ease-in-out"
            style={{ height: `${Math.min(currentStage + 1, 2) * 33.33}%` }}
          />
          {stages.map((stage, index) => {
            const Icon = stage.icon
            const isActive = index <= currentStage
            const isYellow = index <= 1 && index <= currentStage
            return (
              <div
                key={stage.name}
                className="flex items-center space-x-4 mb-8 last:mb-0 relative"
              >
                <div
                  className={`z-10 p-2 rounded-full ${
                    isYellow
                      ? "bg-yellow-400 text-white"
                      : isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`font-medium ${
                    isYellow
                      ? "text-yellow-500"
                      : isActive
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {stage.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
export default Page;