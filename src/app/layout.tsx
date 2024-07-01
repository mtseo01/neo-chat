import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { HOME_OG_IMAGE_URL } from '@/lib/constants';
import './globals.css';
import UserContextProvider from '@/components/user-context-provider';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'Neo Chat', template: `%s - Neo Chat` },
  description: 'Chat app on Neo Theme',

  openGraph: {
    images: [HOME_OG_IMAGE_URL],
    siteName: 'NeoChat',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <link rel="shortcut icon" href="/assets/favicon.ico" />
      <UserContextProvider>
        <body className={spaceGrotesk.className}>
          <div>{children}</div>
          <div id="_portal"></div>
        </body>
      </UserContextProvider>
    </html>
  );
}
