import { getProductsById } from "@/actions/products";
import SectionTitle from "../section-title";
import { Product } from "@prisma/client";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const productIds = ["clywjm64r0006xghebtjp5n8s", "clywjm64r0006xghebtjp5n8s"];



async function NewArrival() {

    const fetchedProducts = await Promise.all(productIds.map(name => getProductsById(name)));
    const product = fetchedProducts.filter((product: (Product | null)) => product !== null) as Product[]
    return (
        <section className="mb-28 text-white">
            <SectionTitle title="Featured" color={"violet"} />
            <h1 className="text-3xl font-semibold mb-16">Nouveauté</h1>
            <div className="parent ">
                <div className="div1 bg-black flex justify-center items-center relative text-center md:text-left">
                    <img src={`${JSON.parse(product[0].image as string)[0].url}`} alt="" />
                    <div className="absolute bottom-10 md:bottom-20">
                        <h2 className="text-xl md:text-3xl mb-1 md:mb-3">David Michelangelo ”The Real”</h2>
                        <p className="md:w-2/3 mb-3 md:mb-5">Black and White version of the PS5 coming out on sale.</p>
                        <Link href={`/all-products/tshirt/${product[0].id}`} className="flex items-center justify-center gap-3 relative w-fit m-auto md:m-0">
                            <span className="">Shop Now</span>
                            <span><FaArrowRight /></span>
                            <span className=" absolute w-full h-0.5 bg-white bottom-0"></span>
                        </Link>
                    </div>
                </div>
                <div className="div2 bg-black">

                </div>
                <div className="div3 bg-black">

                </div>
                <div className="div4 bg-black">

                </div>
            </div>
        </section>
    );
}

export default NewArrival;