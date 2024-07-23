import { Suspense } from "react";
import Header from "@/components/dashboard/header";
import { getProductsById } from "@/actions/products";
import ProductForm from "@/components/dashboard/products/product-form";



async function Details({ params }: { params: { productId: string, productsCategory: string } }) {
  const id = params.productId
  const category = params.productsCategory
  const product = await getProductsById(id)
  return (
    <div>
      <Suspense>
        <Header title={"Update Your Product"} />
        <div className=" bg-white p-4 rounded-md">
          <ProductForm product={product} functionality={"update"} category={category} />
        </div>
      </Suspense>
    </div>
  );
}

export default Details;