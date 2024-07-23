"use client"

import SectionTitle from "../section-title";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link";
import { IoGameControllerOutline } from "react-icons/io5";
import Tshirt from "../icons/tshirt";
import LongSleeve from "../icons/long-sleeve";
import Pantalon from "../icons/pantalon";
import Short from "../icons/short";
import Hoodies from "../icons/hoodies";
import Casquette from "../icons/casquette";


const categories = [
    { name: "Tshirt", icon: <Tshirt />, slug: "/all-products/tshirt" },
    { name: "Long Sleeve", icon: <LongSleeve />, slug: "/all-products/long-sleeve" },
    { name: "Pantalon", icon: <Pantalon  />, slug: "/all-products/pantalon" },
    { name: "Short", icon: <Short  />, slug: "/all-products/short" },
    { name: "Hoodies", icon: <Hoodies  />, slug: "/all-products/hoodies" },
    { name: "Casquette", icon: <Casquette  />, slug: "/all-products/casquette" },
];

function Categories() {
    return (
        <section className="mb-20 relative">
            <SectionTitle title="Categories" color={"red"} />
            <h1 className="text-3xl font-semibold mb-5">Parcourir Par Catégorie</h1>
            <Carousel className="w-full relative">
                <CarouselContent className="-ml-1">
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/5">
                            <Link href={category.slug}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex flex-col gap-5 aspect-square items-center justify-center p-6">
                                            <span>{category.icon}</span>
                                            <span className="text-xl">{category.name}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-[-100px] md:top-[-55px] right-[50px]" />
                <CarouselNext className="absolute top-[-100px] md:top-[-55px] right-0" />
            </Carousel>
        </section>
    );
}

export default Categories;
