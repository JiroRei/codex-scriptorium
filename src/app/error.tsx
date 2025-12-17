"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import * as ico from "lucide-react";
import { Eagle_Lake, Kings } from "next/font/google";
import Image from "next/image";

const myFont = Kings({ weight: "400", subsets: ["latin"] });
const myFont2 = Eagle_Lake({ weight: "400", subsets: ["latin"] });

export default function GlobalError({ error, reset }: { error: any; reset: () => void }) {
  console.log("GlobalError received error:", error);

  // Check status property or nested response
  const statusCode =
  typeof error?.status === "number"
    ? error.status
    : error instanceof Response
    ? error.status
    : typeof error?.response?.status === "number"
    ? error.response.status
    : 500; // fallback



  if (error?.status === 418 || error?.message === "I'm a teapot") {
    return (
      <main className="flex justify-center items-center h-screen">
        <div className="flex justify-center">
          <Card className="-rounded w-xl flex">
            <CardHeader className="flex justify-center">
              <span className={`${myFont.className} text-5xl text-accent`}>The 418th Fault</span>
            </CardHeader>
            <Separator />
            <CardContent className="flex justify-center items-center flex-col">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <h1 className="font-medium text-xl">Sorry, I am a Teapot</h1>
                  <h2>Therefore I cannot brew coffee, only tea.</h2>
                </div>
                <Image src="/teapot2.png" width={200} height={150} alt="teapot.png" />
              </div>

              <Link
                href="/"
                className="flex justify-center items-center gap-2 flex-row mt-5 bg-primary text-amber-100 shadow p-2"
              >
                <h2 className={`${myFont2.className} text-xl`}>Return</h2>
                <ico.SquareArrowRight />
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // fallback for other errors
  return (
    <main className="flex justify-center items-center h-screen">
        <div className="flex justify-center">
          <Card className="-rounded w-xl flex">
            <CardHeader className="flex justify-center">
              <span className={`${myFont.className} text-5xl text-accent`}>The {statusCode}th Fault</span>
            </CardHeader>
            <Separator />
            <CardContent className="flex justify-center items-center flex-col">
              <Image src="/codexlogo.png" width={200} height={150} alt="codex.png" />
                <div className="flex justify-center items-center   flex-col">
                  <h1 className="font-medium text-xl">Error sorry</h1>
                  <h2>Generic Error Test.</h2>
                </div>

              <Link
                href="/"
                className="flex justify-center items-center gap-2 flex-row mt-5 bg-primary text-amber-100 shadow p-2"
              >
                <h2 className={`${myFont2.className} text-xl`}>Return</h2>
                <ico.SquareArrowRight />
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
  );
}
