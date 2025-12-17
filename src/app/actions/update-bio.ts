"use server"

import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateBio(newBio: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Not authenticated")
  }

  // Optional safety: limit length
  if (newBio.length > 500) {
    throw new Error("Bio too long")
  }

  await prisma.user.update({
    where: { id: userId }, // 🔒 THIS IS THE LOCK
    data: { bio: newBio },
  })

  revalidatePath("/profile")
}
