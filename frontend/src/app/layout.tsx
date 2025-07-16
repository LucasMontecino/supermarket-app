import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Supermarket Shopping List - Organize Your Groceries',
  description: 'A simple and efficient shopping list app to help you organize your supermarket trips. Create lists, track prices, and never forget your groceries again.',
  keywords: 'shopping list, groceries, supermarket, grocery list, shopping app',
  authors: [{ name: 'Supermarket App' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Supermarket Shopping List - Organize Your Groceries',
    description: 'A simple and efficient shopping list app to help you organize your supermarket trips.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Supermarket Shopping List - Organize Your Groceries',
    description: 'A simple and efficient shopping list app to help you organize your supermarket trips.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/shopping.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
