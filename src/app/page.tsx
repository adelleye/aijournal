"use client";

import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Gradient } from "whatamesh";
import React, { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef(null); // Create a ref for the canvas

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      // Wait for the next tick to ensure canvas is rendered
      setTimeout(() => {
        const gradient = new Gradient();
        gradient.initGradient("#gradient-canvas");
      }, 0);
    }
  }, []);
  return (
    <>
      {isClient && <canvas id="gradient-canvas"></canvas>}
      <div className="grainy">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-semibold text-center text-slate-100 md:text-6xl text-7xl">
            What's on your mind?
          </h1>
          <div className="mt-4"></div>
          <h2 className=" md:text-xl lg:text-xl text-center text-slate-200">
            <TypewriterTitle />
          </h2>
          <div className="mt-8"></div>
          <div className="flex justify-center">
            <Link href="/dashboard">
              <Button>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
