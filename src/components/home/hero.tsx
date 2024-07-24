"use client"
import {
    Carousel,
    CarouselIndicator,
    CarouselMainContainer,
    CarouselThumbsContainer,
    SliderMainItem,
} from "@/components/extension/carousel";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { getProductsById } from "@/actions/products";

const menuItems = [
    { name: "All Products", link: "/all-products" },
    { name: "Tshirt", link: "/all-products/tshirt" },
    { name: "Long Sleeve", link: "/all-products/long-sleeve" },
    { name: "Pantalon", link: "/all-products/pantalon" },
    { name: "Short", link: "/all-products/short" },
    { name: "Hoodies", link: "/all-products/hoodies" },
    { name: "Casquette", link: "/all-products/casquette" },
];

const Aside = () => {
    return (
        <aside className="w-[250px] border-r-2 ml-[27px]  hidden md:block">
            <nav className="mt-10">
                <ul className="flex flex-col gap-3 py-4">
                    {menuItems.map((item, index) => (
                        <Link href={item.link} key={index}>
                            <li>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

const SliderItem = ({ product }: { product: Product }) => (
    <SliderMainItem className="bg-transparent">
        <div className="size-full flex items-center rounded-xl bg-black text-white p-5">
            <div className="flex-1 flex flex-col justify-between gap-5 md:ml-20">
                <span className="flex justify-center items-center gap-2 text-center">
                    <span className="text-2xl"><Image src={"/logo-small.png"} alt="logo" width={1000} height={1000} className="w-[20px] md:w-[30px]" /></span>
                    <span className="text-sm tracking-wide">Tshirt oversized</span>
                </span>
                <h2 className="text-xl md:text-4xl">{product.name}</h2>
                <Link href={`/all-products/tshirt/${product.id}`} className="flex items-center gap-3 relative w-fit ">
                    <span>Shop Now</span>
                    <span><FaArrowRight /></span>
                    <span className=" absolute w-full h-0.5 bg-white bottom-0"></span>
                </Link>
            </div>
            <div className="flex-1 flex justify-center">
                <img src={JSON.parse(product.image as string)[0].url} alt={product.name} width={1000} height={1000} className="w-[100px] md:w-[200px]" />
            </div>
        </div>
    </SliderMainItem>
);

const Hero = () => {
    const [products, setProducts] = useState<(Product)[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productIds = ["clyzp90e8000b8dnoowrzrxd9", "clyzwmy3p000312jf17ewt1ye", "clyzpbloj000d8dnohjryb7pr"]; // Example product names
            const fetchedProducts = await Promise.all(productIds.map(name => getProductsById(name)));
            setProducts(fetchedProducts.filter((product: (Product | null)) => product !== null) as Product[]);
        };

        fetchProducts();
    }, []);
    return (
        <section className="flex gap-5 mb-20">
            <Aside />
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
                carouselOptions={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselMainContainer className="h-64 md:h-80 mt-10">
                    {products.map((product, index) => (
                        <SliderItem key={index} product={product} />
                    ))}
                </CarouselMainContainer>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <CarouselThumbsContainer className="gap-x-1 mb-4">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <CarouselIndicator key={index} index={index} />
                        ))}
                    </CarouselThumbsContainer>
                </div>
            </Carousel>
        </section>
    );
};

export default Hero;
