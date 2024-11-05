import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Ubuntu_Sans } from 'next/font/google';


const ubuntu = Ubuntu_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Strustore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        {children}
      </body>
    </html>
  );
}
