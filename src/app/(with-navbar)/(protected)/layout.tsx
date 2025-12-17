import { ensureUser } from "@/app/actions/ensure-user"
import type { PropsWithChildren } from "react"

export default async function ProtectedLayout({
  children,
}: PropsWithChildren) {
  await ensureUser()
  return <>{children}</>
}
