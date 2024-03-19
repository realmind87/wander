import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/main.scss";
import { MSWComponent } from '@/app/_component/msw/MSWComponent'
import Providers from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wander",
  description: "Wander 커뮤니티",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <MSWComponent />
      </body>
    </html>
  );
}
