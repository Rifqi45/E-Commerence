import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

/**
 * @swagger
 *  /api/{storeId}:
 *   get:
 *      parameters:
 *       - name: storeId
 *         in: path
 *         description: ID of store
 *         required: true
 *         schema:
 *           type: string
 *      description: Get a store by ID
 *      responses:
 *        200:
 *          description: Store found
 *        400:
 *          description: Store ID is required
 */

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
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
