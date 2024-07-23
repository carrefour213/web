"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { ProductSchema, UploadResponse } from "@/schemas/productSchema";
import { addProduct, updateProduct, deleteProduct } from "@/actions/products";
import { Product, Size } from "@prisma/client";
import { DeleteProductDialog } from "./delete-product-dialog";
import { ImageProps, useEdgeStore } from "@/lib/edgestore";
import ImageCard from "./image-card";
import { MultiImageDropzoneUsage } from "../multi-image-dropzone-usage";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import ColorsInput from "./colors-input";
import { toast } from "sonner";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const sizes = [
    { id: Size.S, label: "S" },
    { id: Size.M, label: "M" },
    { id: Size.L, label: "L" },
    { id: Size.XL, label: "XL" },
] as const;

function ProductForm({
    product,
    functionality,
    category,
}: {
    product?: Product | null;
    functionality: "update" | "create";
    category?: string;
}) {
    const router = useRouter();
    const { edgestore } = useEdgeStore();
    const [uploadResponses, setUploadResponses] = useState<UploadResponse[]>([]);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [colors, setColors] = useState<string[]>(product?.color || [""]);

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: product?.name || "pant 123",
            description: product?.description || "Best pants",
            productCategorieName: product?.productCategorieName || category,
            brand: product?.brand || "Addidas",
            color: colors ,
            size: product?.size || [],
            regularPrice: product?.regularPrice || 1,
            salePrice: product?.salePrice || 1,
            image: product?.image
                ? (product.image as string | undefined)
                : (JSON.stringify(uploadResponses) as string), // TODO: fix this
            stock: product?.stock || 1,
            sales: product?.sales || 0,
        },
    });

    const onDelete = async () => {
        try {
            await deleteProduct(product?.id);
            await edgestore.publicFiles.delete({
                url: JSON.parse(product?.image as string)[0].url,
            });
            router.back();
        } catch (error) {
            console.log(error);
        }
    };

    const onCancel = () => {
        router.back();
    };

    const onSubmit = (values: z.infer<typeof ProductSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            if (functionality === "update") {
                updateProduct(product?.id, { ...values, color: colors })
                    .then((data) => {
                        setError(data?.error);
                        setSuccess(data?.success);
                        if (data?.success) {
                            form.reset(values);
                        }
                    });
            } else if (functionality === "create") {
                if (uploadResponses.length === 0) setError("Please Add a Picture");
                if (uploadResponses.length > 0) {
                    addProduct({ ...values, image: JSON.stringify(uploadResponses) , color: colors}).then((data) => {
                        setError(data?.error);
                        setSuccess(data?.success);
                        if (data?.success) {
                            toast("Article ajouté", {
                                className: "bg-emerald-500 text-white",
                                icon: <CheckCircledIcon className="h-4 w-4" />
                              })
                            router.back();
                        }
                    });
                }
            }
            
        });
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-2">
                    <div className="space-y-6 w-full flex gap-6">
                        <div className="space-y-4 w-1/2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} placeholder="Lorem Ipsum" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} disabled={isPending} placeholder="Lorem Ipsum Is A Dummy Text" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="productCategorieName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={true} placeholder="123456" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="brand"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} placeholder="Addidas" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <ColorsInput colors={colors} setColors={setColors} />
                                <FormMessage />
                            </FormItem>
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="size"
                                    render={() => (
                                        <FormItem className="flex-1">
                                            <div className="mb-4">
                                                <FormLabel className="text-base">Size</FormLabel>
                                            </div>
                                            <div className="flex space-x-5">
                                                {sizes.map((size) => (
                                                    <FormField
                                                        key={size.id}
                                                        control={form.control}
                                                        name="size"
                                                        render={({ field }) => (
                                                            <FormItem key={size.id} className="flex flex-row items-start space-x-2 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(size.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, size.id])
                                                                                : field.onChange(field.value?.filter((value) => value !== size.id));
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="text-sm font-normal">{size.label}</FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Stock</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} disabled={isPending} placeholder="" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="regularPrice"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Regular Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} disabled={isPending} placeholder="" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="salePrice"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Sale Price</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled={isPending} placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            {functionality === "create" ? (
                                <MultiImageDropzoneUsage setUploadResponses={setUploadResponses} />
                            ) : (
                                <div className="grid grid-cols-[repeat(1,1fr)] gap-2 sm:grid-cols-[repeat(2,1fr)]">
                                    {JSON.parse(product?.image as string).map((image: ImageProps) => (
                                        <ImageCard key={image.url} image={image} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <div className="flex justify-end gap-4 mt-10">
                        <Button disabled={isPending} type="submit" className="w-28 bg-[#232321] text-white">
                            {functionality === "update" ? "Update" : "Add"}
                        </Button>
                        {functionality === "update" && <DeleteProductDialog onDelete={onDelete} />}
                        <Button disabled={isPending} onClick={onCancel} type="button" className="w-28 bg-white border text-black">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}

export default ProductForm;
