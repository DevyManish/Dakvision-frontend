"use client"
import React from 'react'
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Hero = () => {
  return (
    <div className="w-full px-16 py-10 lg:py-8">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">Easing postal services!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
              Post Office at your fingertips
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
            Navigating post office services shouldn&apos;t be a hassle. Our solution enhances efficiency and convenience, making service management smoother and more intuitive than ever before.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button size="lg" className="gap-4 rounded-3xl" variant="outline">
              Need Assistance<PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4 rounded-3xl">
              Get Started <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-muted rounded-md aspect-square"></div>
          <div className="bg-muted rounded-md row-span-2"></div>
          <div className="bg-muted rounded-md aspect-square"></div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Hero
