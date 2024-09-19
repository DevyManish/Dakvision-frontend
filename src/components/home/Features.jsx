"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
export function Features() {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [api, current]);

  // Individual card data
  const cardData = [
    {
      title: "Card 1",
      description: "Description for card 1",
      image:
        "https://utfs.io/f/EuHhRmu4rNbCv35pgtX1M6LERxkmHnJwIj5gKXolzVZqWiA2",
    },
    {
      title: "Card 2",
      description: "Description for card 2",
      image:
        "https://utfs.io/f/EuHhRmu4rNbCFRZOxkckmdncQyHZqApzVU6sNMg3hDWL5iwI",
    },
    {
      title: "Card 3",
      description: "Description for card 3",
      image:
        "https://utfs.io/f/EuHhRmu4rNbC8cL7eu30lROn1fMt4QYuGgbhBPo9wZITmA8x",
    },
    {
      title: "Card 4",
      description: "Description for card 4",
      image:
        "https://utfs.io/f/EuHhRmu4rNbCpEM7X5h8KgLJQwkYzA9ajZPduvi24WD76VBO",
    },
    {
      title: "Card 5",
      description: "Description for card 5",
      image: "https://utfs.io/f/EuHhRmu4rNbC9hbfsX5bBCVR8hfsWPgatE52jou61qSd7XMZ",
    },
    {
      title: "Card 6",
      description: "Description for card 6",
      image: "https://utfs.io/f/EuHhRmu4rNbCKHoyUorEEAoze2V5hGiHUOTK3ml1qyJkadN9",
    },
    {
      title: "Card 7",
      description: "Description for card 7",
      image: "https://utfs.io/f/EuHhRmu4rNbC0tK7FdUSK3hb6cBDtVi2qdP7gAoXJjWGYwHI",
    },
    {
      title: "Card 8",
      description: "Description for card 8",
      image: "https://utfs.io/f/EuHhRmu4rNbCKvi8X4EEAoze2V5hGiHUOTK3ml1qyJkadN97",
    },
  ];

  return (
    <div className="w-full px-2 lg:py-10">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <h2 className="text-xl md:text-5xl font-bold tracking-tighter lg:max-w-xl font-regular text-left">
            Trusted by thousands of users nationally
          </h2>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {cardData.map((card, index) => (
                <CarouselItem className="basis-1/4 lg:basis-1/6" key={index}>
                  <div className="relative w-full h-64">
                    <Image
                      src={card.image}
                      alt={card.title}
                      className="rounded-md object-cover "
                      height={1080}
                      width={1080}
                    />
                    {/* <h3 className="text-lg font-semibold">{card.title}</h3>
                                        <p className="text-sm">{card.description}</p> */}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
