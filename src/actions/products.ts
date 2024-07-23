"use server"

import { z } from "zod";
import { ProductSchema } from "@/schemas/productSchema";
import { db } from "@/lib/db";



export const getProductsByCategory = async (category: string) => {
    try {
        const products = await db.product.findMany({
            where: {
                productCategorieName: category
            }
        });
        return { success: products }
    } catch {
        return { error: "could not get the products of this category" }
    }
}

export const get5ProductsByCategory = async (category: string) => {
    try {
        const products = await db.product.findMany({
            where: {
                productCategorieName: category
            },
            take: 5
        });
        return { success: products }
    } catch {
        return { error: "could not get the products of this category" }
    }
}

export const get4ProductsByCategory = async (category: string) => {
    try {
        const products = await db.product.findMany({
            where: {
                productCategorieName: category
            },
            take: 4
        });
        return { success: products }
    } catch {
        return { error: "could not get the products of this category" }
    }
}
export const get2ProductsByCategory = async (category: string) => {
    try {
        const products = await db.product.findMany({
            where: {
                productCategorieName: category
            },
            take: 2
        });
        return { success: products }
    } catch {
        return { error: "could not get the products of this category" }
    }
}

export const getProductsById = async (id: string) => {
    try {
        const productCategories = await db.product.findUnique({
            where: {
                id
            }
        });
        return productCategories;
    } catch {
        return null;
    }
}

export const addProduct = async (values: z.infer<typeof ProductSchema>) => {
    try {
        await db.product.create({
            data: {
                ...values,
                image: values.image
            }
        });
        return { success: "product added" }
    } catch (err) {
        return { error: "could not add the product" }
    }
}


export const updateProduct = async (id: string | undefined, values: z.infer<typeof ProductSchema>) => {
    try {
        const productUptaded = await db.product.update({
            where: {
                id
            },
            data: values
        });
        if (productUptaded) return { success: "product updated", productUptaded }
    } catch (err) {
        return { error: "could not update the product" };
    }
}


export const deleteProduct = async (id: string | undefined) => {
    try {
        await db.product.delete({
            where: {
                id
            }
        });
    } catch (err) {
        return { error: "could not delete the product" };
    }
}

export const saleProduct = async (id: string) => {
    try {
        const product = await db.product.findUnique({
            where: {
                id
            }
        });

        if (!product) {
            return { error: "Product not found" };
        }

        const updatedProduct = await db.product.update({
            where: {
                id
            },
            data: {
                sales: product.sales + 1
            }
        });

        return updatedProduct;
    } catch (err) {
        console.error("Error removing product from stock:", err);
        return { error: "Could not delete the product" };
    }
}

export const getAllProducts = async ()=>{
    try {
        const products = await db.product.findMany();
        return products 
    } catch (err) {
        console.log("could find products");
    }
}