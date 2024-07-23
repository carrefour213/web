import { get4ProductsByCategory } from "@/actions/products";
import ProductWrapper from "./product-wrapper";
import ProductCard from "./product-card";



async function ProductsByCategory({ category }: { category: { id: string, name: string } }) {
    const { success: products } = await get4ProductsByCategory(category.name);

    return (
        <ProductWrapper title={category.name.toUpperCase()} color="red" seeMore={true} link={`/all-products/${category.name}`}>
            {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ProductWrapper>
    );
}

export default ProductsByCategory;