import { db } from "@/lib/db";

export const getAllCategories = async () => {
    try {
        const productCategories = await db.productCategory.findMany();
        return productCategories;
    } catch {
        return null;
    }
};

export const getCategoryProductCounts = async () => {
    try {
        const categoriesWithProductCount = await db.productCategory.findMany({
            include: {
                _count: {
                    select: { products: true },
                },
            },
        })
        return categoriesWithProductCount
    } catch {
        return null;
    }
}

