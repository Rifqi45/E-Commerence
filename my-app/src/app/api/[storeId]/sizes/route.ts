import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * @swagger
 *  /api/{storeId}/sizes:
 *   post:
 *      tags:
 *       - size
 *      summary: Post billboard by store ID
 *      parameters:
 *       - name: storeId
 *         in: path
 *         description: ID of store
 *         required: true
 *         schema:
 *           type: string
 *      description: Get a store by ID
 *      requestBody:
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    label:
 *                      type: string
 *                    imageUrl:
 *                      type: string
 *                required:
 *                - label
 *                - imageUrl
 *      responses:
 *        200:
 *          description: Store found
 *        400:
 *          description: Store ID is required
 */

export async function POST(
    req: Request,
    { params }: { params: {storeId: string}}
    
    ) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {name, value} = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
        return new NextResponse("Value is required", { status: 400 });
      }

      if (!params.storeId) {
        return new NextResponse("Store ID is required", { status: 400 });
      }

      const storeByUserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
      });

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId
      },
    });

    if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 403 });
      }

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * @swagger
 *  /api/{storeId}/sizes:
 *   get:
 *      tags:
 *       - size
 *      summary: Get size by store ID
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
    { params }: { params: {storeId: string}}
    
    ) {
  try {
      if (!params.storeId) {
        return new NextResponse("Store ID is required", { status: 400 });
      }

      const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId,
        },
      });


    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
