"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { ColorColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/ApiList";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import React from "react";

interface ColorsClientProps {
    data: ColorColumn[]
}

// Client component that loads all our Colors
const ColorsClient: React.FC<ColorsClientProps> = ({ data }) => {
    const router = useRouter ();
    const params = useParams();

    return (
        <React.Fragment>
            <div className="flex items-center justify-between">
                <Heading title={`Colors (${ data.length })`} description="Manage colors for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey={"name"} />
            <Heading title="API" description="API calls for Colors" />
            <Separator />
            <ApiList entityName="colors" entityIdName="colorId" />
        </React.Fragment>
    )
}

export default ColorsClient;