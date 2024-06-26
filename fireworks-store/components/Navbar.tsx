import React from 'react';
import Link from 'next/link';

import Container from '@/components/ui/Container';
import MainNav from '@/components/MainNav';
import NavbarActions from '@/components/NavbarActions';

import getCategories from '@/actions/getCategories';
import Image from "next/image";

// Revalidate the page on every request, purge cache & fetch latest data
export const revalidate: number = 0;

export default async function Navbar() {
    const categories = await getCategories();

    return (
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link className="ml-4 lg:mr-20 flex lg:ml-0 gap-x-2" href="/">
                        <Image src='/nav/fireworks-logo.png' alt='logo' width={40} height={40} />
                        <p className="mt-1 font-bold text-xl"></p>
                    </Link>
                    <MainNav data={categories} />
                    <NavbarActions />
                </div>
            </Container>
        </div>
    )
}
