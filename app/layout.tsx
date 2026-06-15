import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import { createRootMetadata } from '@/lib/seo'
import { COMPANY, SITE } from '@/lib/site-data'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const fraunces = Fraunces({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Root defaults sourced from COMPANY and SITE in lib/site-data.ts
export const metadata: Metadata = {
  ...createRootMetadata(),
  metadataBase: new URL(SITE.url),
  applicationName: COMPANY.name,
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fdfaf0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
