import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategories } from "../../../../data/product-category";
import Link from "next/link";
import { Suspense } from "react";
import Header from "@/components/dashboard/header";
import { MdAddCircleOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";



async function Categories() {
  const productCategories = await getAllCategories()
  return (
    <Suspense>
      <Header title={"All Categories"}>
        <Link href={`/dashboard/categories/add-category`}>
          <Button className="bg-[#232321] text-white flex gap-3"><MdAddCircleOutline className="text-lg" /> ADD NEW CATEGORY</Button>
        </Link>
      </Header>
      {/* <Header title={"All Categories"} /> */}
      <div className={`categories-grid gap-4`}>
        {productCategories?.map((productCategorie) => (
          <Link href={`/dashboard/categories/${productCategorie.name}`} key={productCategorie.name}>
            <Card>
              <CardHeader>
                <CardTitle className={`text-center`}>{productCategorie.name.toUpperCase()}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Suspense>
  );
}

export default Categories;