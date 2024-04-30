"use client"

// Global Imports
import * as z from 'zod';
import axios from 'axios';
import React, { useState } from 'react';
import { Store } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

// Local Imports
import { AlertModal } from '@/components/modals/AlertModal';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiAlert } from '@/components/ui/ApiAlert';
import { useOrigin } from '@/hooks/use-origin';

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string ().min (1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();

    // Create open state to control the Alert modal
    const [open, setOpen] = useState<boolean>(false);

    // Create loading state to disable interactive elements
    const [loading, setLoading] = useState<boolean>(false);

    // Safely access the window object, only after the component is mounted
    const origin = useOrigin();

    // 1. Define form with useForm hook & zodResolver for validation
    const form = useForm<SettingsFormValues> ({
        resolver: zodResolver (formSchema),
        defaultValues: initialData
    });

    // 2. Define a submit handler
    const onSubmit = async(data: SettingsFormValues) => {
        try {
            setLoading (true);
            await axios.patch (`/api/stores/${ params.storeId }`, data);
            router.refresh ();

            toast.success ("Store updated.");

        } catch (error) {
            toast.error ("Something went wrong.");

        } finally {
            setLoading (false);
        }
    };

    // 3. Define a delete handler
    const onDelete = async() => {
        try {
            setLoading (true);
            await axios.delete (`/api/stores/${ params.storeId }`);

            router.refresh ();
            router.push ("/");

            toast.success ("Store deleted.");

        } catch (error) {
            toast.error ("Make sure you removed all products and categories first.");

        } finally {
            setLoading (false);
            setOpen (false);
        }
    };

    return (
        <React.Fragment>
            <AlertModal isOpen={open} onClose={() => setOpen (false)} onConfirm={onDelete} loading={loading}/>
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store preferences"/>
                <Button disabled={loading} variant="destructive" size="icon" onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4"/>
                </Button>
            </div>
            <Separator/>
            <Form { ...form }>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name"
                            render={ ({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store name" { ...field }/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${ origin }/api/${ params.storeId }`}
                variant="public"/>
        </React.Fragment>
    )
}

export default SettingsForm