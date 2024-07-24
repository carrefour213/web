import Header from "@/components/dashboard/header";
import CategoryForm from "@/components/dashboard/products/category-form";
import { Suspense } from "react";


function AddCategory() {
    return (
        <Suspense>
            <Header title={"Add New Category"} />
            <div className=" bg-white p-4 rounded-md">
                <CategoryForm />
            </div>
        </Suspense>
    );
}

export default AddCategory;