'use client';

import Providers from '../utils/providers';
import './global.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fr'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
