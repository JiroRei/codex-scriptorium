import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: {
        createdAt: 'desc'
      },
    });

    return NextResponse.json(artworks);
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artwork' },
      { status: 500 }
    ); // ✅ Added return statement
  }
}
