

import ProductDetails from "@/components/all-products/product-details";
import Related from "@/components/all-products/related";



function Product({ params }: { params: { productId: string, category: string } }) {
  const productId = params.productId
  const category = params.category
  return (
    <div className="container mb-20">
      <ProductDetails productId={productId} />
      <Related category={category} productId={productId} />
    </div>
  );
}

export default Product;
