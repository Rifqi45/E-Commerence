import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: {storeId: string}}
    
    ) {
  try {
      if (!params.storeId) {
        return new NextResponse("Store ID is required", { status: 400 });
      }

      const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
        },
      });


    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
