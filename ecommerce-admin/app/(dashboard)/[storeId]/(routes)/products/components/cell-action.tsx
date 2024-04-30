"use client";

// Global Imports
import axios from 'axios';
import React, { useState } from 'react';
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Local Imports
import { AlertModal } from '@/components/modals/AlertModal';
import { ProductColumn } from './columns';
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"

interface CellActionProps {
    data: ProductColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const onCopy = (id: string) => {
        navigator.clipboard.writeText (id);
        toast.success ("Product ID copied to clipboard.");
    }

    // Define a delete handler
    const onDelete = async() => {
        try {
            setLoading (true);
            await axios.delete (`/api/${ params.storeId }/products/${ data.id }`);
            router.refresh ();

            toast.success ("Product deleted.");

        } catch (error) {
            toast.error ("Something went wrong.");

        } finally {
            setLoading (false);
            setOpen (false);
        }
    };

    return (
        <React.Fragment>
            <AlertModal isOpen={open} onClose={() => setOpen (false)} onConfirm={(onDelete)} loading={loading} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={ () => onCopy (data.id) }>
                        <Copy className="mr-2 h-4 w-4"/>
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push (`/${params.storeId}/products/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4"/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen (true)}>
                        <Trash className="mr-2 h-4 w-4"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </React.Fragment>
    )
}
