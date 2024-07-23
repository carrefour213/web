import * as z from "zod";

const SizeEnum = z.enum(["S", "M", "L", "XL"]);

export const UploadResponseSchema = z.object({
    url: z.string(),
    size: z.number(),
    uploadedAt: z.date(),
    metadata: z.record(z.string(), z.never()), // Adjust according to actual metadata structure
    path: z.record(z.string(), z.never()),    // Adjust according to actual path structure
    pathOrder: z.array(z.string()),
});

export type UploadResponse = z.infer<typeof UploadResponseSchema>;

export const ProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    productCategorieName: z.string(),
    brand: z.string(),
    color: z.array(z.string()),
    size: z.array(SizeEnum).nonempty({
        message: "You have to select at least one size.",
    }),
    regularPrice: z.coerce.number().gte(1).lte(999999),
    salePrice: z.coerce.number().gte(1).lte(999999),
    image: z.string(),
    stock: z.z.coerce.number().gte(1).lte(9999),
    sales: z.z.coerce.number().gte(0).lte(9999)
});