"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button';
import useCart from '@/hooks/use-cart';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function NavbarActions() {
    // Create router object to perform client-side navigation
    const router: AppRouterInstance = useRouter();
    const cart = useCart();
    const [isMounted, setIsMounted] = useState<boolean>(false);

    // useEffect hook to set isMounted variable to true
    // Delays the execution of client-side-only code until after hydration
    useEffect (() => {
        setIsMounted (true);
    }, []); // Only run once after the initial render

    // Prevent rendering of the component before the effect has run
    // To protect from hydration errors or unwanted flashes of content
    if (!isMounted) return null;

    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button onClick={() => router.push("/cart")}
                className="flex items-center rounded-full bg-black px-4 py-2">
                <ShoppingBag size={20} color="white" />
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    )
}
