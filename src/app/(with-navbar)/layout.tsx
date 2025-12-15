"use client"

import { neobrutalism } from "@clerk/themes"
import { ClerkProvider } from "@clerk/nextjs"
import Navbar from "./navbar"
import Footer from "./footer"

export default function WithNavbarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#7A00CC",
          colorBackground: "#FFF8DC",
          colorText: "#000000",
          borderRadius: "0px",
        },
        signIn: { theme: neobrutalism },
      }}
    >
      <Navbar />
      <main className="mt-35">
      {children}
      </main>
      <Footer />
    </ClerkProvider>
  )
}
