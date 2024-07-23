import { get2ProductsByCategory, getProductsById } from "@/actions/products";
import ProductCard from "../all-products/product-card";
import ProductWrapper from "../all-products/product-wrapper";
import { Suspense } from "react";
import { getAllCategories } from "@/actions/categories";
import { Product } from "@prisma/client";

async function AllProducts() {
    const categories = await getAllCategories();
    let products = [] as Product[];

    if (categories.success) {
        const productPromises = categories.success.map(async (category) => {
            const twoProducts = await get2ProductsByCategory(category.name);
            if (twoProducts?.success) {
                products = [...products, ...twoProducts.success];
            }
        });

        await Promise.all(productPromises);
    }


    return (
        <Suspense fallback={<div>Loading...</div>}>
            {products && (
                <section className=" mb-20">
                    <ProductWrapper title="Nos Produits" color="red" seeMore={true} subTitle="Découvrez Nos Produits" link="/all-products">
                        {products.map((prod, index) => (
                            <ProductCard key={index} product={prod} />
                        ))}
                    </ProductWrapper>
                </section>
            )}
        </Suspense>
    );
}

export default AllProducts;
