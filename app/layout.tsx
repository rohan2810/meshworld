import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MeshWorld — A new dimension of human experience',
  description: 'Turn your life into a living digital twin. Capture, reflect, and connect through an intelligent experience graph.',
  metadataBase: new URL('https://meshworld.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://meshworld.com',
    siteName: 'MeshWorld',
    title: 'MeshWorld — A new dimension of human experience',
    description: 'Turn your life into a living digital twin. Capture, reflect, and connect through an intelligent experience graph.',
    images: [
      {
        url: '/img/og.jpg',
        width: 1200,
        height: 630,
        alt: 'MeshWorld',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MeshWorld — A new dimension of human experience',
    description: 'Turn your life into a living digital twin. Capture, reflect, and connect through an intelligent experience graph.',
    images: ['/img/og.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}

