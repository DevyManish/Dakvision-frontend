"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="w-full py-20 md:px-28 px-4 lg:py-40">
        <div className="container mx-auto">
          <div className="flex flex-col gap-10">
            <div className="flex gap-4 flex-col items-start">
              <div>
                <Badge>Services</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Link href="/services/info">
                <div className="flex flex-col gap-2">
                  {/* <div className="bg-orange-200 rounded-md aspect-video mb-2"></div> */}
                  <Image
                    src="https://i.postimg.cc/tg2xgcfB/service-1.jpg"
                    alt="sia"
                    height="500"
                    width="500"
                    className="bg-muted rounded-md aspect-video mb-2 object-cover"
                  />
                  <h3 className="text-xl tracking-tight">
                    Service Information Access
                  </h3>
                  <p className="text-muted-foreground text-base">
                    Our goal is to streamline SMB trade, making it easier and
                    faster than ever.
                  </p>
                </div>
              </Link>
              <Link href="/services/track">
                <div className="flex flex-col gap-2">
                  <Image
                    src="https://i.postimg.cc/k4GtRcPq/service-2.png"
                    alt="sia"
                    height="500"
                    width="500"
                    className="bg-muted rounded-md aspect-video mb-2 object-cover"
                  />
                  <h3 className="text-xl tracking-tight">Package Tracking</h3>
                  <p className="text-muted-foreground text-base">
                    Get real-time updates on your package’s status and location.
                  </p>
                </div>
              </Link>
              <Link href="/services/queue">
                <div className="flex flex-col gap-2">
                  <Image
                    src="https://i.postimg.cc/8crJtzCY/service-3.png"
                    alt="sia"
                    height="500"
                    width="500"
                    className="bg-muted rounded-md aspect-video mb-2 object-cover"
                  />
                  <h3 className="text-xl tracking-tight">Easy Queue</h3>
                  <p className="text-muted-foreground text-base">
                    Check the current queue status and reserve your place
                    online.
                  </p>
                </div>
              </Link>
              <Link href="/services/feedback">
              <div className="flex flex-col gap-2">
                <Image
                  src="https://i.postimg.cc/K87T6j5S/service-4.jpg"
                  alt="sia"
                  height="500"
                  width="500"
                  className="bg-muted rounded-md aspect-video mb-2 object-cover"
                />
                <h3 className="text-xl tracking-tight">Complaint System</h3>
                <p className="text-muted-foreground text-base">
                  Resolve your complaints easily through our state of art complaint system. 
                </p>
              </div>
              </Link>
              <Link href="/services/queue">
                <div className="flex flex-col gap-2">
                  <Image
                    src="https://i.postimg.cc/xd0mnQsk/service-5.jpg"
                    alt="sia"
                    height="500"
                    width="500"
                    className="bg-muted rounded-md aspect-video mb-2 object-cover"
                  />
                  <h3 className="text-xl tracking-tight">
                    Counter Availability
                  </h3>
                  <p className="text-muted-foreground text-base">
                    See which counters are free and which are busy.
                  </p>
                </div>
              </Link>
              <Link href="/services/chat">
                <div className="flex flex-col gap-2">
                  <Image
                    src="https://i.postimg.cc/d1fZ2yJd/service-6.jpg"
                    alt="sia"
                    height="500"
                    width="500"
                    className="bg-muted rounded-md aspect-video mb-2 object-cover"
                  />
                  <h3 className="text-xl tracking-tight">
                    Chat-Based Enquiry System
                  </h3>
                  <p className="text-muted-foreground text-base">
                    Get real-time assistance through our chat-based enquiry
                    system.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
