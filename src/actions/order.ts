"use server"

import { OrderWithUserAndItems } from "@/components/dashboard/order/types";
import { db } from "@/lib/db";
import { Order, OrderItem, Status } from "@prisma/client";

export const addOrder = async (
    userId: string,
    totalAmount: number,
    items: Omit<OrderItem, 'id' | 'orderId'>[]
): Promise<{ success?: string; error?: string }> => {
    try {
        await db.order.create({
            data: {
                userId,
                totalAmount,
                status: Status.PROCESSING, // Include the status field
                items: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        color: item.color,
                        size: item.size,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
        });
        return { success: "order added" };
    } catch (err) {
        console.error(err);
        let errorMessage = 'could not add the order';
        if (err instanceof Error) {
            errorMessage = `${errorMessage}: ${err.message}`;
        }
        return { error: errorMessage };
    }
};

export const getOrdersByUserId = async (userId: string) => {

    try {
        const orders = await db.order.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        return orders;
    } catch (err) {
        // console.error(err);
        // let errorMessage = 'could not add the order';
        // if (err instanceof Error) {
        //     errorMessage = `${errorMessage}: ${err.message}`;
        // }
        return { error: "error" };
    }
}
export const getAllOrders = async () => {

    try {
        const orders = await db.order.findMany();
        return orders;
    } catch (err) {
        // console.error(err);
        // let errorMessage = 'could not add the order';
        // if (err instanceof Error) {
        //     errorMessage = `${errorMessage}: ${err.message}`;
        // }
        return { error: "error" };
    }
}

export async function getAllOrdersWithUserInfo() {
    const orders = await db.order.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true, // Include only if necessary
                    image: true,
                    phoneNumber: true, // Include only if necessary
                    wilaya: true,
                    adresse: true,
                    role: true,
                },
            },
            items: {
                include: {
                    product: true
                }
            }
        }
    });
    return orders;
}

export async function getOrderDetailsWithUserAndItems(orderId: string): Promise<OrderWithUserAndItems | undefined> {
    const orderDetails = await db.order.findUnique(
        {
            where: {
                id: orderId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true, // Include only if necessary
                        image: true,
                        phoneNumber: true, // Include only if necessary
                        wilaya: true,
                        adresse: true,
                        role: true,
                    },
                },
                items: {
                    include: {
                        product: true
                    }
                }
            }
        }
    )
    return orderDetails as OrderWithUserAndItems | undefined;
}

export async function deleteOrder(id: string) {
    await db.order.delete({ where: { id: id } })
}

export async function updateStatus(id: string, status: Status) {
    await db.order.update({
        where: {
            id
        },
        data: {
            status
        }
    })
}


export async function getTotalOrders() {
    try {
        const count = await db.order.count();
        return count;
    } catch (error) {
        console.error('Error retrieving orders:', error);
    }
}
export async function getTotalProcessingOrders() {
    try {
        const count = await db.order.count({
            where: {
                status: Status.PROCESSING
            }
        });
        return count;
    } catch (error) {
        console.error('Error retrieving orders:', error);
    }
}
export async function getTotalDeliveredOrders() {
    try {
        const count = await db.order.count({
            where: {
                status: Status.DELIVERED
            }
        });
        return count;
    } catch (error) {
        console.error('Error retrieving orders:', error);
    }
}
export async function getTotalCompletedOrders() {
    try {
        const count = await db.order.count({
            where: {
                status: Status.COMPLETED
            }
        });
        return count;
    } catch (error) {
        console.error('Error retrieving orders:', error);
    }
}
export async function getTotalCancelledOrders() {
    try {
        const count = await db.order.count({
            where: {
                status: Status.CANCELLED
            }
        });
        return count;
    } catch (error) {
        console.error('Error retrieving orders:', error);
    }
}