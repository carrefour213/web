import { getProductsByCategory, getProductsById } from "@/actions/products";
import ProductCard from "@/components/all-products/product-card";
import ProductWrapper from "@/components/all-products/product-wrapper";
import { Suspense } from "react";



async function Category({ params }: { params: { category: string } }) {
  const category = params.category
  const products = await getProductsByCategory(category)
  return (

    <Suspense>
      {products &&
        <div className="container mb-20">
          <ProductWrapper title={category.toUpperCase()} color="red" seeMore={false} subTitle={""}>
            {products.success?.map((product) => (
              <ProductCard product={product} key={product.id}/>
            ))}
          </ProductWrapper>
        </div>
      }
    </Suspense>
  );
}

export default Category;