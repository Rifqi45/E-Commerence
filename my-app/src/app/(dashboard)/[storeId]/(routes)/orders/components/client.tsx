"use client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";


interface OrderClientProps {
    data: OrderColumn [];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  return (
    <>
        <Heading
        tittle={`Orders (${data.length})`}
        description="Manage orders for your store"
        />
    <Separator/>
    <DataTable serachKey="products" columns={columns} data={data}/>
    </>
  );
};
