"use client";

import React, { useEffect, useState } from 'react';

import Container from '@/components/ui/Container';
import useCart from '@/hooks/use-cart';
import CartItem from './components/CartItem';
import Summary from './components/Summary';

const CartPage = () => {
    const cart = useCart ();

    // Declare isMounted state variable and initialize it to false
    const [isMounted, setIsMounted] = useState (false);

    // useEffect hook to set isMounted variable to true
    // Delays the execution of client-side-only code until after hydration
    useEffect (() => {
        setIsMounted (true);
    }, []); // Only run once after the initial render

    // Prevent rendering of the component before the effect has run
    // To protect from hydration errors or unwanted flashes of content
    if (!isMounted) {
        return null;
    }

    return (
        <div className='bg-white'>
            <Container>
                <div className='px-4 py-16 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
                    <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>

                        <div className='lg:col-span-7'>
                            { cart.items.length === 0 &&
                                <p className='text-neutral-500'>No items added to cart</p>
                            }
                            <ul>
                                { cart.items.map ((item) => (
                                    <CartItem key={ item.id } data={ item } />
                                )) }
                            </ul>
                        </div>
                        <Summary/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CartPage