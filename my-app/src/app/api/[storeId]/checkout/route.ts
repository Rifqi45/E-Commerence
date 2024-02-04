import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    export async function OPTIONS() {
        return NextResponse.json({}, { headers: corsHeaders });
    };

    /**
 * @swagger
 *  /api/{storeId}/checkout:
 *   post:
 *      tags:
 *       - checkout
 *      summary: Post checkout by store ID
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
        { params }: {params : {storeId: string}}
    ) {
        const { productIds }= await req.json();

        if (!productIds || productIds.length === 0) {
            return new NextResponse("Product IDs are required", { status: 400 });
        }

        const products = await prismadb.product.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        });

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem [] = [];

        products.forEach((product) => {
            line_items.push({
               quantity: 1, 
               price_data: {
                currency: "USD",
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price.toNumber() * 100,
               }
            });
        });

        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                isPaid: false,
                orderItems: {
                    create: productIds.map((productId: string) => ({
                        product: {
                            connect: {
                                id: productId,
                            }
                        }
                    }))
                }
            }
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            billing_address_collection: "required",
            phone_number_collection: {
                enabled: true,
            },
            success_url: `${process.env.FRONTEND_STORE_URL}/cart?succes=1`,
            cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
            metadata: {
                orderId: order.id,
            }
        });

        return NextResponse.json({url: session.url},{
            headers: corsHeaders,
        });
    }
        
    
