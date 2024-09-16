"use client";
import { CardsCarousel } from "@/components/home/CardsCarousel";
import { Features } from "@/components/home/Features";
import Hero from "@/components/home/hero";
import * as React from "react";


export default function Home() {

  return (
    <div className="container px-5 py-12 mx-auto flex flex-col">
      <Hero/>
      <div className="px-10">
        <CardsCarousel/>
        <Features/>
      </div>
      
    </div>
  );
}
