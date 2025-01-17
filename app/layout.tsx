import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mein A1',
  description: 'Mein A1 Portal',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">A¹</text></svg>'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
} 