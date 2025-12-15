"use client"

import { Eagle_Lake} from "next/font/google"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import * as ico from "lucide-react"
import { Separator } from "@/components/ui/separator";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Span } from "next/dist/trace";
import Image from "next/image";
import { useEffect, useState } from "react"
import ProfileMenu from "./profile-dropdown"

const myFont = Eagle_Lake({
  weight: "400",
  subsets: ["latin"],
  });

export default function Navbar() {
    const { isLoaded } = useUser()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
    const onScroll = () => {
        setScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return(
        <motion.main
            layout
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className={`
                flex justify-between items-center gap-2 z-50
                fixed

                ${scrolled
                ? "top-0 left-0 w-full px-6 bg-[#f3e2b1] border-b-2 shadow-md"
                : "top-4 left-1/2 -translate-x-1/2 w-10/12"
                }
            `}
            >
            <motion.div layout>
                <Image
                    src="/codexlogo.png"
                    width={scrolled ? 200 : 230}
                    height={50}
                    alt="codexlogo"
                    className="transition-all duration-300"
                />
                </motion.div>
            <div className="bg-[#f3e2b1] text-primary-foreground flex justify-between shadow shadow-red-950 mt-2 w-max border-2 h-full p-1">
                <NavigationMenu className="flex">
                    <NavigationMenuList className="flex ml-2 gap-2">
                        
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={`${myFont.className} hover:cursor-pointer text-accent`}>
                                <Link href="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <Separator orientation="vertical" className="h-5" />
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={`${myFont.className} hover:cursor-pointer text-accent`}>
                                <Link href="/series">Manuscripts</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <Separator orientation="vertical" className="h-5"/>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={`${myFont.className} hover:cursor-pointer text-accent`}>
                                <Link href="/gallery">Illustrations</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <Separator orientation="vertical" className="h-5"/>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={`${myFont.className} hover:cursor-pointer text-accent`}>
                                <Link href="/aaa">About</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>


                    </NavigationMenuList>
                <div className="relative w-[200px] ml-5 mr-2">
                    <Input type="text" placeholder="Search" className="pl-8 -shadow h-auto bg-purple-100 -ring text-black"/> <ico.Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                </div>
            </NavigationMenu> 

        
        </div>
        <div className="flex justify-center items-center gap-3 p-2">
            <SignedOut>
                <SignInButton>
                    <div className="bg-primary flex items-center p-1 mt-3 shadow text-primary-foreground border-1 hover:cursor-pointer">Sign In</div>
                </SignInButton>

                <SignUpButton>
                    <div className="bg-secondary flex items-center p-1 mt-3 shadow border-1 hover:cursor-pointer">Sign Up</div>
                </SignUpButton>
            </SignedOut>
            {!isLoaded  && <h1>...</h1>}
            <SignedIn>
                <ProfileMenu />
            </SignedIn>
        </div>
      </motion.main>
      );
}