"use client";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { ProductsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ProductClientProps {
    data: ProductsColumn [];
}

export const ProductClient: React.FC<ProductClientProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
        tittle={`Products (${data.length})`}
        description="Manage products for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
            <Plus className="mr-2 h-4 w-4 "/>
            Add New
        </Button>
    </div>
    <Separator/>
    <DataTable serachKey="name" columns={columns} data={data}/>
    <Heading tittle="API" description="API calls for Products"/>
    <Separator/>
    <ApiList entityName="products" entityIdName="productId"/>
    </>
  );
};
