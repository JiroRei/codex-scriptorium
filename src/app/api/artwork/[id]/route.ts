// src/app/api/artwork/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "No id provided" },
        { status: 400 }
      );
    }

    console.log("Fetching artwork by id:", id);

    const artworks = await prisma.artwork.findMany({
      where: {
        creatorId: id,
      },
      include: {
        creator: true
      },
    });

    return NextResponse.json(artworks, { status: 200 });
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return NextResponse.json(
      { error: "Failed to fetch artwork" },
      { status: 500 }
    );
  }
}