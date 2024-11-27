"use client";
import { CardsCarousel } from "@/components/home/CardsCarousel";
import { Features } from "@/components/home/Features";
import Hero from "@/components/home/hero";
import * as React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Testimonials } from "@/components/testimonials";


export default function Home() {
  return (
    <>
      <Header />
      <div className="container px-5 py-12 mx-auto flex flex-col">
        <Hero />
        <div className="px-10">
          <CardsCarousel />
          <Features />
          <Testimonials/>
        </div>
      </div>
      <Footer />
    </>
  );
}
