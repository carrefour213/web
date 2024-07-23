
import Header from "@/components/dashboard/header";
import ProductForm from "@/components/dashboard/products/product-form";
import { Suspense } from "react";


function AddProduct({ params }: { params: { productId: string , productsCategory: string} }) {
    const category = params.productsCategory
    return (
        <Suspense>
            <Header title={"Add New Product"} />
            <div className=" bg-white p-4 rounded-md">
                <ProductForm functionality="create" category={category}/>
            </div>
        </Suspense>
    );
}

export default AddProduct;