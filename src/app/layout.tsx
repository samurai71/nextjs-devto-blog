import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dev.to Blog - samurai71',
  description: 'Blog posts from samurai71 on Dev.to',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}