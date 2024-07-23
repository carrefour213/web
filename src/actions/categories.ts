"use server"

import { categoryFormSchema } from "@/schemas/categorySchema";
import { db } from "@/lib/db";
import { z } from "zod";

export const addCategory = async (values: z.infer<typeof categoryFormSchema>) => {
    try {
        await db.productCategory.create({
            data: values
        });
        return { success: "category added" }
    } catch (err) {
        return { error: "could not add the category" }
    }
}

export const getAllCategories = async () => {
    try {
        const categories = await db.productCategory.findMany();
        return { success: categories }
    } catch (err) {
        return { error: "could find the categories" }
    }
}