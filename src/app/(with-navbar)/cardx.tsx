"use client"

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import * as ico from "lucide-react"

export default function SpotlightCard() {

  const TOTAL_PAGES = 5

  const [current, setCurrent] = React.useState(0)
  const [flipping, setFlipping] = React.useState<"next" | "prev" | null>(null)

  function flipNext() {
  if (flipping) return
  setFlipping("next")

  setTimeout(() => {
    setCurrent((prev) => (prev + 1) % TOTAL_PAGES)
  }, 450) // halfway

  setTimeout(() => {
    setFlipping(null)
  }, 900)
  }

  function flipPrev() {
    if (flipping) return
    setFlipping("prev")

    setTimeout(() => {
      setCurrent((prev) =>
        prev === 0 ? TOTAL_PAGES - 1 : prev - 1
      )
    }, 450)

    setTimeout(() => {
      setFlipping(null)
    }, 900)
  }


  return(
    <main>
      <div className="relative w-full book flex justify-center gap-5 items-center">
        <Button
          onClick={flipPrev}
          className="bg-background border-1 manuscript-ribbon rounded-b-full text-accent hover:text-background">
          <ico.ArrowBigLeft />
        </Button>
        
        <div className="page-stack">

        <div className="page page-current flex justify-center flex-col">
          <div className="flex justify-center items-center gap-4 flex-col">
            <Image src="/mnt.jpg" width={250} height={150} alt="mnt" />
          
            <span className="text-2xl font-bold text-center mt-4">
              My Nigga Totoro
            </span>
          </div>
        </div>

        {flipping && (
          <div className={`page page-flip flex justify-center flex-col ${flipping === "next" ? "flip-next" : "flip-prev"}`}>
            <div className="flex justify-center items-center gap-4 flex-col">
              <Image src="/mnt.jpg" width={250} height={150} alt="mnt" />
            
              <span className="text-2xl font-bold text-center mt-4">
                My Nigga Totoro
              </span>
            </div>
          </div>
        )}
        </div>

        
        <Button
          onClick={flipNext}
          className="bg-background border-1 manuscript-ribbonL rounded-b-full text-accent hover:text-background">
          <ico.ArrowBigRight />
        </Button>
      </div>
    </main>
  );
}
