"use server"

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function createSeries(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const user = await currentUser()
  if (!user) throw new Error("User not found")

  const title = formData.get("title") as string

  if (!title || title.length < 3) {
    throw new Error("Invalid title")
  }

  await prisma.series.create({
    data: {
      title,
      creatorId: userId,
      creatorName: user.username ?? "unknown",
    },
  })

  revalidatePath("/series")
}
