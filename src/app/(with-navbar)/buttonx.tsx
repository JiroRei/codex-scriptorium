"use client";

import { Eagle_Lake } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const myFont = Eagle_Lake({
  weight: "400",
  subsets: ["latin"],
  });


export default function NextButton() {
  return (
    <div className="group">
    <Link href="/series/">
    <Button
      className={`${myFont.className} -shadow bg-ring hover:cursor-pointer hover:text-secondary manuscript-ribbon text-3xl text-accent p-5`}>
    READ NOW
    </Button>
    </Link>
    </div>
  );
}
