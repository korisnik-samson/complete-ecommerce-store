// Global Imports
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';

// Local Imports
import './globals.css'
import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import React from "react";

const inter = Inter ({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard for Fireworks Pirotehnika'
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en">
                <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ToasterProvider/>
                    <ModalProvider/>
                    {children}
                </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
