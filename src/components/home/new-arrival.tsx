import { getProductsById } from "@/actions/products";
import SectionTitle from "../section-title";
import { Product } from "@prisma/client";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const productIds = ["clyzwry4y000512jf4glge21r", "clz001e3k0001h2l11xmbq0xs", "clz009msl0003h2l1198c8mwb", "clz00bje10005h2l19kbin0e4"];



async function NewArrival() {

    const fetchedProducts = await Promise.all(productIds.map(id => getProductsById(id)));
    const product = fetchedProducts.filter((product: (Product | null)) => product !== null) as Product[]
    return (
        <section className="mb-28 text-white">
            <SectionTitle title="Featured" color={"violet"} />
            <h1 className="text-3xl font-semibold mb-16 text-black">Nouveauté</h1>
            <div className="parent ">
                <div className="div1 bg-black flex justify-center items-center relative text-center md:text-left">
                    <img src={`${JSON.parse(product[0].image as string)[0].url}`} alt="" />
                    <div className="absolute bottom-10 md:bottom-20">
                        <h2 className="text-xl md:text-3xl mb-1 md:mb-3">{product[1].name}</h2>
                        <p className="md:w-2/3 mb-3 md:mb-5">{product[1].description}</p>
                        <Link href={`/all-products/tshirt/${product[0].id}`} className="flex items-center justify-center gap-3 relative w-fit m-auto md:m-0">
                            <span className="">Shop Now</span>
                            <span><FaArrowRight /></span>
                            <span className=" absolute w-full h-0.5 bg-white bottom-0"></span>
                        </Link>
                    </div>
                </div>
                <div className="div2 bg-black flex flex-col-reverse md:flex-row">
                    <div className="p-8">
                        <h2 className="text-xl md:text-3xl mb-1 md:mb-3">{product[1].name}</h2>
                        <p className="md:w-2/3 mb-3 md:mb-5">{product[1].description}.</p>
                        <Link href={`/all-products/tshirt/${product[1].id}`} className="flex items-center justify-center gap-3 relative w-fit m-auto md:m-0">
                            <span className="">Shop Now</span>
                            <span><FaArrowRight /></span>
                            <span className=" absolute w-full h-0.5 bg-white bottom-0"></span>
                        </Link>
                    </div>
                    <img src={`${JSON.parse(product[1].image as string)[0].url}`} alt="" className="md:h-[230px]" />
                </div>

                <div className="div3 bg-black relative flex justify-center items-center">
                    <Link href={`/all-products/tshirt/${product[2].id}`}>
                        <img src={`${JSON.parse(product[2].image as string)[0].url}`} alt="" className="md:h-[230px]" />
                    </Link>
                    <div className="w-full absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 p-8">
                        {/* <h2 className="">{product[2].name}</h2>
                        <p className="">{product[2].description}</p> */}
                        {/* <Link href={`/all-products/tshirt/${product[2].id}`} className="flex items-center justify-center gap-3 relative w-fit m-auto md:m-0">
                            <span className="">Shop Now</span>
                            <span><FaArrowRight /></span>
                            <span className=" absolute w-full h-0.5 bg-white bottom-0"></span>
                        </Link> */}
                    </div>
                </div>
                <div className="div4 bg-black relative flex justify-center items-center">
                    <Link href={`/all-products/tshirt/${product[2].id}`}>
                        <img src={`${JSON.parse(product[3].image as string)[0].url}`} alt="" className="md:h-[230px]" />
                    </Link>
                    <div className="w-full absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 p-8">
                        {/* <h2 className="">{product[3].name}</h2>
                        <p className="">{product[3].description}</p> */}
                        {/* <Link href={`/all-products/tshirt/${product[3].id}`} className="flex items-center justify-center gap-3 relative w-fit m-auto md:m-0">
                            <span className="">Shop Now</span>
                            <span><FaArrowRight /></span>
                            <span className=" absolute w-full h-0.5 bg-white bottom-0"></span>
                        </Link> */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewArrival;