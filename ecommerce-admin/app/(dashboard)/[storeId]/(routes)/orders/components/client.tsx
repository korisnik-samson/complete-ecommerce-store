"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { OrderColumn, columns } from "./columns";
import React from "react";

interface OrderClientProps {data: OrderColumn[]}

// Client component that loads all our Orders
const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
    return (
        <React.Fragment>
            <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
            <Separator />
            <DataTable columns={columns} data={data} searchKey={"products"} />
        </React.Fragment>
    )
}

export default OrderClient;