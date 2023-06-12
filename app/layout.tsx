import './globals.css'
import { Inter } from 'next/font/google'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata = {
  metadataBase: new URL('https://' + process.env.NEXT_PUBLIC_MAIN_DOMAIN),
  title: 'Solun • Privacy at its highest',
  description: 'Solun is a service that allows you to share files, text and sending emails with end-to-end encryption, without storing any user related data on our servers. Become anonymous and protect your privacy today.',
  tags: ['Solun', 'Privacy', 'Anonymous', 'Encryption', 'Files', 'Text', 'Emails', 'Share Files', 'Upload Files', 'Send Encrypted Texts'],
  openGraph: {
    title: 'Solun • Privacy at its highest',
    description: 'Solun is a service that allows you to share files, text and sending emails with end-to-end encryption, without storing any user related data on our servers. Become anonymous and protect your privacy today.',
    siteName: 'Solun',
    images: [
      {
        url: 'https://cdn.solun.pm/images/logo/solun-logo.png',
        width: 512,
        height: 512,
        alt: 'Solun Logo',
      },
    ],
  },
  locale: 'en_US',
  type: 'website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
