"use client";

import React, { useEffect, useState } from 'react';

const priceFormatter = new Intl.NumberFormat ("rs-SR", {
    style: 'currency',
    currency: 'EUR'
});

interface CurrencyProps {
    value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect (() => {
        setIsMounted (true);
    }, []); // Only run once after the initial render

    if (!isMounted) return null;

    return (
        <div className="font-semibold">
            {priceFormatter.format (Number(value))}
        </div>
    )
}

export default Currency