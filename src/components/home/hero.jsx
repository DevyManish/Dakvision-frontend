"use client"
import React from 'react'
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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
          {/* <div className="bg-muted rounded-md aspect-square"></div> */}
          <Image
          src="https://utfs.io/f/glvA31ChFgm4Ti3WkENtAkHfucIEgaKpZdT6oliDzYS901Lx"
          alt="Image"
          width="1920"
          height="1080"
          className="rounded-md aspect-square"
        />
          <Image
          src="https://utfs.io/f/glvA31ChFgm4B1ckPk06aKSPCgdjy5bJEpmN0TIZzOqtX7Yf"
          alt="Image"
          width="1920"
          height="1080"
          className="rounded-md row-span-2 object-cover h-full"
        />
          <Image
          src="https://i.postimg.cc/gJWJP27h/dakseva-7.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="rounded-md aspect-square"
        />
          {/* <div className="bg-muted rounded-md row-span-2"></div> */}
          {/* <div className="bg-muted rounded-md aspect-square"></div> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Hero
