import { error } from "console";
import { notFound } from "next/navigation";

interface TeapotPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function TeapotPage({ searchParams }: TeapotPageProps) {
  // Unwrap the searchParams if it’s a Promise
  const params = await searchParams;

  console.log("searchParams:", params);

  if (params.secret === "true") {
    throw Object.assign(new Error("I'm a teapot"), { status: 418 });

  }

  notFound();
}
