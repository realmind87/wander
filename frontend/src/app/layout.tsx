import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/main.scss";
//import Providers from './providers'
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.withCredentials = true;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wander",
  description: "Wander 커뮤니티",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <Providers>{children}</Providers> */}
      </body>
    </html>
  );
}
