"use client"
import { Product } from "@prisma/client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { MdAddCircleOutline } from "react-icons/md";
import { getProductsByCategory } from "@/actions/products";
import { DashboardError } from "@/components/dashboard/dashboard-error";
import { Loading } from "@/components/dashboard/loading";
import ProductCard from "@/components/dashboard/products/product-card";

function Products({ params }: { params: { productsCategory: string } }) {
    const category = params.productsCategory
    const [isLoading, setIsLoading] = useState<Boolean | undefined>(true);
    const [error, setError] = useState<string | undefined>("");
    const [products, setProducts] = useState<Product[] | undefined>([]);
    useEffect(() => {
        if (!category) {
            setError("Missing category")
            return
        }
        getProductsByCategory(category)
            .then((data) => {
                setIsLoading(false)
                setProducts(data.success)
                setError(data.error)
            }).catch((err) => {
                setError("Coudln't get products by category")
            })
    }, [])
    return (
        <Suspense>
            <Header title={category}>
                <Link href={`/dashboard/categories/${category}/add-product`}>
                    <Button className="bg-[#232321] text-white flex gap-3"><MdAddCircleOutline className="text-lg" /> ADD NEW PRODUCT</Button>
                </Link>
            </Header>
            {
                isLoading ?
                    <Loading />
                    :
                    <>
                        {products?.length === 0 ? <DashboardError message={error || "No Products"} /> : <></>}
                        <div className="products-grid gap-4">
                            {products?.map(product => (
                                <Link href={`/dashboard/categories/${category}/${product.id}`} key={product.id}>
                                    <ProductCard product={product} />
                                </Link>
                            ))}
                        </div>
                    </>
            }
        </Suspense>
    );
}

export default Products;