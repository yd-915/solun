import '../../globals.css';

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_MAIN_DOMAIN as string),
  title: 'Solun • You\'ve recevied a message',
  description: 'Do you want to share encrypted messages with your friends? Solun is the right place for you. We offer end-to-end encryption for your messages, without storing any user related data on our servers. Become anonymous and protect your privacy today.',
  tags: ['Solun', 'Privacy', 'Anonymous', 'Encryption', 'Files', 'Text', 'Emails', 'Share Files', 'Upload Files', 'Send Encrypted Texts'],
  openGraph: {
    title: 'Solun • You\'ve recevied a message',
    description: 'Do you want to share encrypted messages with your friends? Solun is the right place for you. We offer end-to-end encryption for your messages, without storing any user related data on our servers. Become anonymous and protect your privacy today.',
    siteName: 'Solun',
    images: [
      {
        url: 'https://cdn.solun.pm/banner/message/standard.png',
        width: 768,
        height: 441,
        alt: 'Solun File',
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
