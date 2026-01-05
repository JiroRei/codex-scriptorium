"use client";

import { Uncial_Antiqua } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import ArtCarousel from "./art-carousel";
import NextButton from "./buttonx";
import SpotlightCard from "./cardx";
import React from "react";
import Snowfall from "react-snowfall";


const myFont = Uncial_Antiqua({
  weight: "400",
  subsets: ["latin"],
  });
export default function Home() {
  return (
  <>
    
      <main className="h-auto mt-15 mb-20">
        <Snowfall />

        <div className="flex justify-center items-center gap-2 flex-col mb-10">
          <div className="border-2 text-center text-2xl font-extrabold p-3 mb-3 ">
            <p className={`text-4xl text-accent ${myFont.className}`}>RECENT UPDATES</p>
          </div>
          <SpotlightCard />
          <NextButton />
        </div>

        <Separator className="bg-accent" />

        <div className="flex justify-center mt-10">
          <ArtCarousel />
        </div>
      </main>
    
  </>
  );
}
