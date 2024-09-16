"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function CardsCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    (<div className="w-full h-full py-20">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Our Features.
      </h2>
      <Carousel items={cards} />
    </div>)
  );
}

const DummyContent = () => {
  return (<>
    {[...new Array(3).fill(1)].map((_, index) => {
      return (
        (<div
          key={"dummy-content" + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <p
            className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              The first rule of Apple club is that you boast about Apple club.
            </span>{" "}
            Keep a journal, quickly jot down a grocery list, and take amazing
            class notes. Want to convert those notes to text? No problem.
            Langotiya jeetu ka mara hua yaar is ready to capture every
            thought.
          </p>
          <Image
            src="https://assets.aceternity.com/macbook.png"
            alt="Macbook mockup from Aceternity UI"
            height="500"
            width="500"
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain" />
        </div>)
      );
    })}
  </>);
};

const data = [
  {
    category: "Dynamic Queue Management",
    title: "Efficiently Manage Queue Length and Waiting Times with CCTV and AI.",
    src: "https://i.postimg.cc/jdW2svWF/card-1.jpg",
    content: <DummyContent />,
  },
  {
    category: "Real-Time Demand",
    title: "Monitor and Dynamically Allocate Counters Based on Real-time Live Data.",
    src: "https://i.postimg.cc/HWNWP5S4/card-2.jpg",
    content: <DummyContent />,
  },
  {
    category: "User Experience Feedback",
    title: "Collect and Analyze Customer Feedback through Digital Surveys.",
    src: "https://i.postimg.cc/NMfGZxqb/card-3.jpg",
    content: <DummyContent />,
  },

  {
    category: "Data Analytics",
    title: "Access Detailed Performance Metrics and Historical Data on Your Dashboard.",
    src: "https://i.postimg.cc/NjcKpmMC/card-4.jpg",
    content: <DummyContent />,
  },
  {
    category: "AI Insights",
    title: "Utilize AI for Queue Analysis, Crowd Density Detection, and Idle Counter Alerts.",
    src: "https://i.postimg.cc/02gjyDp5/card-5.jpg",
    content: <DummyContent />,
  },
];
