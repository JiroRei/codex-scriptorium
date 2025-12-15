import { Kings, Eagle_Lake } from "next/font/google"; 
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import * as ico from "lucide-react"

const myFont = Kings({
  weight: "400",
  subsets: ["latin"],
  });
const myFont2 = Eagle_Lake({
weight: "400",
subsets: ["latin"],
});

export default function NotFound(){
    return(
        <main className="flex justify-center items-center h-screen">
            <div className="flex justify-center">
            <Card className="-rounded w-xl flex">
                <CardHeader className="flex justify-center">
                    <span className={`${myFont.className} text-5xl text-accent`}>The 404th Fault</span>
                </CardHeader>
                <Separator className="" />
                <CardContent className="flex justify-center items-center flex-col">
                    <h1 className="font-medium text-xl">O Page I seek! Wherefore art thou?</h1>
                    <h2>The link may be broken or has been removed. Fuck you.</h2>
                    <></>
                    
                    <Link href="/" className="flex justify-center items-center gap-2 flex-row mt-5 bg-primary text-amber-100 shadow p-2">
                        <h2 className={`${myFont2.className} text-xl`}>Return</h2>
                        <ico.SquareArrowRight />
                    </Link>
               
                </CardContent>
            </Card>
            </div>
        </main>
    );
}