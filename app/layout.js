'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/Auth";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { Provider as ChakraUIProvider } from "@/components/ui/provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider store={store}>
          <AuthProvider>
            <ChakraUIProvider>
              {children}
            </ChakraUIProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
