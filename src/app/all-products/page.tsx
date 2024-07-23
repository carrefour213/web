import { getAllCategories } from "@/actions/categories";
import ProductsByCategory from "@/components/all-products/products-by-category";
import { Suspense } from "react";


async function AllProducts() {
    const { success: categories } = await getAllCategories()
    return (
        <Suspense>
            {categories &&
                <div className="container mb-20">
                    {categories.map(category => (
                        <ProductsByCategory category={category} key={category.id}/>
                    ))}
                </div>
            }
        </Suspense>
    );
}

export default AllProducts;