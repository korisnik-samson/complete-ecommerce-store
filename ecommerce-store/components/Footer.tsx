"use client";

// global imports
import React, { useEffect, useState } from "react";

export default function Footer() {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect (() => {
        setIsMounted (true);
    }, []);

    if (!isMounted) return null;

    const date = new Date ();

    return (
        <footer className="bg-white border-t">
            <div className="mx-auto py-10">
                <p className="text-center text-xs text-black">
                    &copy; {date.getFullYear()} Fireworks Pirotehnika. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
