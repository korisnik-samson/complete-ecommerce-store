import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from "next";
import { IConstructMetadata } from "@/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge (clsx (inputs))
}

export function constructMetadata({ title = 'Pirotehnika - Za sve vaše pirotehnike potrebe',
    description = 'Dobrodošli na Firevorks Pirotechnike za vašu kosu',
    image = '/thumbnail.png',
    icons = '/favicon.ico',
    noIndex = false,
}: IConstructMetadata = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [{ url: image, }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@Samson14653708',
        },
        icons,
        metadataBase: new URL ('https://fireworks-pirotehnika.vercel.app/'),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    }
}
