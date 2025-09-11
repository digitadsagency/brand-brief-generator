import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brand Brief - Digit Ads',
  description: 'Crea tu Brand Brief profesional con Digit Ads. Define la identidad visual y de marca de tu empresa.',
  keywords: 'brand brief, identidad visual, marketing digital, digit ads, branding',
  authors: [{ name: 'Digit Ads' }],
  openGraph: {
    title: 'Brand Brief - Digit Ads',
    description: 'Crea tu Brand Brief profesional con Digit Ads. Define la identidad visual y de marca de tu empresa.',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}