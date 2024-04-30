"use client";

// Global Imports
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Local Imports
import { ProductColumn, columns } from "./columns";
import { ApiList } from "@/components/ui/ApiList";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ProductClientProps {
    data: ProductColumn[]
}

// Client component that loads all our products
const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
    const router: AppRouterInstance = useRouter ();
    const params = useParams();

    return (
        <React.Fragment>
            <div className="flex items-center justify-between">
                <Heading title={`Products (${data.length})`} description="Manage products for your store" />
                <Button onClick={() => router.push (`/${params.storeId}/products/new`)}>
                    <Plus className="h-4 w-4 mr-2"/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable columns={columns} data={data} searchKey={"name"} />
            <Heading title="API" description="API calls for Products" />
            <Separator/>
            <ApiList entityName="products" entityIdName="productId" />
        </React.Fragment>
    )
}

export default ProductClient;