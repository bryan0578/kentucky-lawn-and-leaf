import { Analytics } from '@vercel/analytics/next'
import type { Viewport } from 'next'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { rootMetadata } from '@/lib/seo'
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

export const metadata = rootMetadata

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
        <LocalBusinessSchema />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
