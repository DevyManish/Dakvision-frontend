"use client";
import { useEffect } from "react";
import { CardsCarousel } from "@/components/home/CardsCarousel";
import { Features } from "@/components/home/Features";
import Hero from "@/components/home/hero";
import * as React from "react";
import Header from "@/components/header";

import { Testimonials } from "@/components/testimonials";
import { useAuthStore } from "@/store/authStore";


export default function Home() {
  const { fetchUser, user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Only fetch user data if the user is not already authenticated
    if (isAuthenticated && !user) {
      fetchUser();
    }
  }, [isAuthenticated, user, fetchUser]);


  return (
    <>
      <Header />
      <div className="container px-5 py-12 mx-auto flex flex-col">
        <Hero />
        <div className="px-10">
          <CardsCarousel />
          <Features />
          <Testimonials />
        </div>
      </div>

    </>
  );
}
