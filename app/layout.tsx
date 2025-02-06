import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NEAR Intents Faucet | Get Tokens for Product Experiments',
  description: 'Get testnet tokens for building applications on NEAR Protocol. A simple and secure way to obtain NEAR tokens for development and testing.',
  keywords: ['NEAR Protocol', 'Blockchain', 'Testnet', 'Faucet', 'Web3', 'Cryptocurrency', 'Development'],
  authors: [{ name: 'NEAR Protocol' }],
  openGraph: {
    title: 'NEAR Intents Faucet | Get Tokens for Product Experiments',
    description: 'Get testnet tokens for building applications on NEAR Protocol. A simple and secure way to obtain NEAR tokens for development and testing.',
    url: 'https://near-intents-faucet.vercel.app/',
    siteName: 'NEAR Intents Faucet',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_nomargin-RzElMAobN7bKSWJEZ4JHW18PntqBy4.png',
        width: 180,
        height: 68,
        alt: 'NEAR Protocol Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEAR Intents Faucet | Get Tokens for Product Experiments',
    description: 'Get testnet tokens for building applications on NEAR Protocol',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_nomargin-RzElMAobN7bKSWJEZ4JHW18PntqBy4.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://near-intents-faucet.vercel.app/" />
      </head>
      <body>{children}</body>
    </html>
  )
}
