import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'SetuAI - Bridging Human, Data, and Experiences',
  description: 'SetuAI - Bridging Human, Data, and Experiences',
  metadataBase: new URL('https://setuai.app'),
  icons: {
    icon: '/img/logo.png',
    apple: '/img/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://setuai.app',
    siteName: 'SetuAI',
    title: 'SetuAI - Bridging Human, Data, and Experiences',
    description: 'SetuAI - Bridging Human, Data, and Experiences',
    images: [
      {
        url: '/img/og.jpg',
        width: 1200,
        height: 630,
        alt: 'SetuAI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SetuAI - Bridging Human, Data, and Experiences',
    description: 'SetuAI - Bridging Human, Data, and Experiences',
    images: ['/img/og.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body>{children}</body>
    </html>
  )
}

