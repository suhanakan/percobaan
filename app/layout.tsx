import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "DOBBIE",
  description: "Created with v0",
  generator: "v0.dev",
  icons: [{ rel: "icon", url: "/favicon.png", sizes: "any" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
