"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function ensureUser() {
  const { userId,  } = await auth()
  const user = await currentUser()
  
  if (!userId) return null

  if (userId) {

    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId, username: user?.username!, avatarUrl: user?.imageUrl! },
    })
  }
}
