
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@prisma/client";


function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="bg-[#fafafa]">
      <CardHeader >
        <div className="flex items-center gap-3 mb-2">
          <span className={`w-20 h-20 bg-cover`} style={{backgroundImage: `url(${JSON.parse(product.image as string)[0].url})`}}></span>
          <span className="flex flex-col">
            <h3 className="font-semibold">{product.name}</h3>
            <p className=" text-muted-foreground mb-2">{product.productCategorieName}</p>
            <p className="font-bold">{product.salePrice} DA</p>
          </span>
        </div>
        <div>
          <p></p>
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="m-4 p-2 border rounded-md">
        <div className={`flex justify-between mb-2`}>
          <span>Sales </span>
          <span>{product.sales}</span>
        </div>
        <hr />
        <div className={`flex justify-between mt-2`}>
          <span>Remaining Products </span>
          <span className={`flex items-center gap-6`}>
            <div className=" h-[5px] w-10 bg-[#e7e7e3] rounded-2xl"><div className={`bg-[#ffa52f]  h-full rounded-2xl`} style={{width: `${(product.stock - product.sales) * 100 / (product.stock) }%`}}></div><span></span></div>
            {product.stock - product.sales}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;