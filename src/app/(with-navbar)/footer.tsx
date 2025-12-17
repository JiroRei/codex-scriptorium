import Link from "next/link";
import { teapot } from "../actions/teapot";
import { Button } from "@/components/ui/button";
import * as ico from "lucide-react"

export default function Footer(){
    return(
        <main className="flex justify-center items-center bg-white border-t-1 border-t-accent h-auto p-3">
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="p-2">FOOTER? I HARDLY KNOW HER!</h1>
                    <div>
                        <Link href="/teapot?secret=true">
                            <Button>
                                Buy me a Coffee <ico.Coffee />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}