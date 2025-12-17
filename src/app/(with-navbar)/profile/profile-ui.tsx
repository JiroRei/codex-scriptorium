"use client"

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@clerk/nextjs";
import { Eagle_Lake, Italianno, Metamorphous, Modern_Antiqua } from "next/font/google";
import Image from "next/image";
import * as ico from "lucide-react"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ProfileBio from "./bio-modal";


const myFont = Eagle_Lake({
  weight: "400",
  subsets: ["latin"],
  });
const myFont2 = Italianno({
  weight: "400",
  subsets: ["latin"],
  });
const myFont3 = Metamorphous({
  weight: "400",
  subsets: ["latin"],
  });
const myFont4 = Modern_Antiqua({
weight: "400",
subsets: ["latin"],
});



export default function ProfilePageUI({
  dbUser,
  viewerId,
}: {
  dbUser: any
  viewerId: string | null
}){

    const isOwner = viewerId === dbUser.id

    return(
        <main className="mb-10 p-3">
            <div className="p-5 bg-background shadow shadow-red-900 border-2 border-accent">
                <h1 className={`mb-3 ${myFont2.className} text-6xl text-accent`}>Profile</h1>

                <Separator className="bg-red-800"/>

                <div className="flex gap-10 mt-3">
                    <div className="flex-shrink-0">
                        <Image src={dbUser.avatarUrl ?? "/default-avatar.png"} width={250} height={250} alt="ProfilePicture" className="object-cover border-2 border-accent"/>
                    </div>

                    <div className="flex flex-col gap-2">

                        <div className="flex flex-col gap-1.5 self-start w-fit">
                            <h1 className={`${myFont.className} text-3xl`}>{dbUser.username}</h1>
                            <Separator className="w-full" />
                            <div className="flex gap-2 mt-1">
                                <Badge className="bg-purple-800 hover:cursor-default">✠ CODEX ✠</Badge>
                                <Badge className="bg-[#856A00] hover:cursor-default"><ico.BookCheck />Librarian</Badge>
                                <Badge className="hover:cursor-default"><ico.Feather />Scribe</Badge>
                            </div>
                        </div>
                        <div className="max-w-xl">
                            <h1 className={`${myFont4.className} mt-3 text-2xl`}>About Me:</h1>
                            <div className="flex gap-3 items-end">
                                <p className={`${myFont.className} text-black whitespace-pre-wrap text-justify`}>
                                    {dbUser.bio ?? "This user has not written a bio yet."}
                                </p>
                                {isOwner && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                        <ProfileBio dbUser={dbUser} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                        <p>Edit bio</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    )}
                                
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className="p-5 bg-background shadow shadow-red-900 border-2 border-accent mt-3">
                <div>
                    <h1 className={`mb-3 ${myFont2.className} text-6xl text-accent`}>Manuscripts:</h1>
                    <Separator className="bg-red-800"/>
                </div>
                <div className="flex justify-center mt-2 gap-4">
                    <h1 className="text-muted-foreground">This scribe has no manuscripts yet.</h1>
                </div>
            </div>
            <div className="p-5 bg-background shadow shadow-red-900 border-2 border-accent mt-3">
                <div>
                    <h1 className={`mb-3 ${myFont2.className} text-6xl text-accent`}>Illustrations:</h1>
                    <Separator className="bg-red-800"/>
                </div>
                <div className="flex justify-center mt-2 gap-4">
                    <h1 className="text-muted-foreground">This scribe has no illustrated works yet.</h1>
                </div>
            </div>
        </main>
    );
}