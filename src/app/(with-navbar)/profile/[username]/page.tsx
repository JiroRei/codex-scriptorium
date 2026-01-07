import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProfilePageUI from "../profile-ui"

export default async function ProfilePage({params}: {params: Promise<{username: string}>}) {
  const {username} = await params;
  const { userId: viewerId } = await auth()
  const clerkUser = viewerId ? await currentUser() : null

  const profileUser = await prisma.user.findUnique({
    where: { username: username },
    include: {
      comicseries: true,
      writtenseries: true,
      artworks: true,
    },
  })

  if (viewerId) {
    await prisma.user.upsert({
      where: { id: viewerId },
      update: {},
      create: {
        id: viewerId,
        username: clerkUser?.username!,
        avatarUrl: clerkUser?.imageUrl!,
      },
    })
  }

  if (!profileUser) notFound()

  return (
    <ProfilePageUI
      dbUser={profileUser}
      viewerId={viewerId}
    />
  )
}
