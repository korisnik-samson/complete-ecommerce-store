import type { Metadata } from 'next';
import { Inter, Urbanist } from 'next/font/google';
import React from 'react';

import './globals.css';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ModalProvider from '@/providers/ModalProvider';
import ToastProvider from '@/providers/ToastProvider';
import { NextFont } from "next/dist/compiled/@next/font";

const font: NextFont = Urbanist ({ subsets: ['latin'] })
const inter: NextFont = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Store',
    description: 'Ecommerce store',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={font.className || inter.className}>
                <ModalProvider/>
                <ToastProvider/>
                <Navbar/>
                {children}
                <Footer/>
            </body>
        </html>
    )
}
