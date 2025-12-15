import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { use } from "react";

export default function SeriesPage({params}: {params: Promise<{id: string}>}){
    const {id} = use(params);
    
    return(
        <main className="flex justify-center mb-10">
            <Tabs defaultValue="comics" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="comics">Illustrated Manuscripts</TabsTrigger>
                    <TabsTrigger value="novels">Written Manuscripts</TabsTrigger>
                    <TabsTrigger value="misc">Others</TabsTrigger>
                </TabsList>
                <TabsContent value="comics">
                    <div className="w-full">
                        <h1>aaaa</h1>
                    </div>
                </TabsContent>
                <TabsContent value="novels">
                    <div>

                    </div>
                </TabsContent>
            </Tabs>
        </main>
    );
}