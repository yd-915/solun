import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Solun • Privacy at its highest',
  description: 'Solun is a service that allows you to share files, text and sending emails with end-to-end encryption, without storing any data on our servers. Become anonymous and protect your privacy today.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
