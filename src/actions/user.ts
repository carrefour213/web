"use server"

import { db } from "@/lib/db";

export const updateUser = async (id: string, phoneNumber: string, wilaya: string, adresse: string) => {
    try {
        const productUptaded = await db.user.update({
            where: {
                id
            },
            data: {
                phoneNumber,
                wilaya,
                adresse
            }
        });
        if (productUptaded) return { success: "product updated", productUptaded }
    } catch (err) {
        return { error: "could not update the product" };
    }
}