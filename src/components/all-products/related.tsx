import { get5ProductsByCategory } from "@/actions/products";
import ProductWrapper from "./product-wrapper";
import ProductCard from "./product-card";



async function Related({ category, productId }: { category: string, productId: string }) {
    const { success: products } = await get5ProductsByCategory(category);

    return (
        <ProductWrapper title="Articles connexes" color="orange" seeMore={true} link={`/all-products/${category}`}>
            {products?.filter((product) => product.id !== productId).map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ProductWrapper>
    );
}

export default Related;