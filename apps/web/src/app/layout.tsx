'use client';

import { ConfigProvider } from 'antd';
import './global.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fr'>
      <body>
        <ConfigProvider
          theme={{
            token: {
              fontSize: 16,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
