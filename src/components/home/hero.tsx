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

const menuItems = [
    { name: "All Products", link: "/all-products" },
    { name: "Tshirt", link: "/all-products/tshirt" },
    { name: "Long Sleeve", link: "/all-products/long-sleeve" },
    { name: "Pantalon", link: "/all-products/pantalon" },
    { name: "Short", link: "/all-products/short" },
    { name: "Hoodies", link: "/all-products/hoodies" },
    { name: "Casquette", link: "/all-products/casquette" },
    { name: "Casquette", link: "/all-products/casquette" },
];

const heroCarouselProducts = [
    {
      id: "clyzp90e8000b8dnoowrzrxd9",
      name: " David Michelangelo ”The Real”",
      description: "oversized  disponible f l regular",
      productCategorieName: "tshirt",
      brand: "Carrefour",
      color: [
        "black",
        "gray"
      ],
      size: [
        "M",
        "L",
        "XL"
      ],
      regularPrice: 3000,
      salePrice: 3300,
      image: "[{\"url\":\"https://files.edgestore.dev/dpqpoujbjvg765ur/publicFiles/_public/72a270f4-79e7-4f6d-bf27-66870dfd5ae8.png\",\"thumbnailUrl\":null,\"size\":70815,\"uploadedAt\":\"2024-07-24T10:25:56.189Z\",\"path\":{},\"pathOrder\":[],\"metadata\":{}},{\"url\":\"https://files.edgestore.dev/dpqpoujbjvg765ur/publicFiles/_public/57d21438-6045-48f6-9fee-a9b7b3c849a3.png\",\"thumbnailUrl\":null,\"size\":90679,\"uploadedAt\":\"2024-07-24T10:25:56.207Z\",\"path\":{},\"pathOrder\":[],\"metadata\":{}}]",
      stock: 10,
      sales: 0,
      createdAt: "2024-07-24T10:26:12.275Z",
      updatedAt: "2024-07-24T10:26:12.275Z"
    },
    {
      id: "clyzwmy3p000312jf17ewt1ye",
      name: "TSHIRT JAWSOME",
      description: "oversize disponible f l regular b 2500",
      productCategorieName: "tshirt",
      brand: "Addidas",
      color: [
        "black",
        "white"
      ],
      size: [
        "L",
        "XL"
      ],
      regularPrice: 2900,
      salePrice: 3000,
      image: "[{\"url\":\"https://files.edgestore.dev/dpqpoujbjvg765ur/publicFiles/_public/846aca33-ee5c-42fa-825a-7d50cc6e5290.png\",\"thumbnailUrl\":null,\"size\":57179,\"uploadedAt\":\"2024-07-24T13:51:32.085Z\",\"path\":{},\"pathOrder\":[],\"metadata\":{}},{\"url\":\"https://files.edgestore.dev/dpqpoujbjvg765ur/publicFiles/_public/0e6a26f3-3a43-4ede-b474-35e8d3a23a6e.png\",\"thumbnailUrl\":null,\"size\":105471,\"uploadedAt\":\"2024-07-24T13:51:51.364Z\",\"path\":{},\"pathOrder\":[],\"metadata\":{}},{\"url\":\"https://files.edgestore.dev/dpqpoujbjvg765ur/publicFiles/_public/b4e8c76b-31ce-4f0d-a23b-3c851127f94a.png\",\"thumbnailUrl\":null,\"size\":96089,\"uploadedAt\":\"2024-07-24T13:51:51.394Z\",\"path\":{},\"pathOrder\":[],\"metadata\":{}},{\"url\":\"https://files.edgestore.dev/dpqpoujbjvg765ur/publicFiles/_public/4b4a322d-54c5-489e-833b-83b024ad225c.png\",\"thumbnailUrl\":null,\"size\":101184,\"uploadedAt\":\"2024-07-24T13:51:51.345Z\",\"path\":{},\"pathOrder\":[],\"metadata\":{}}]",
      stock: 10,
      sales: 0,
      createdAt: "2024-07-24T13:52:59.927Z",
      updatedAt: "2024-07-24T13:52:59.927Z"
    },
    {
      id: "clyzpbloj000d8dnohjryb7pr",
      name: "THE BOYS ",
      description: "”never meet your heroes”, Regular disponible f l oversize",
      productCategorieName: "tshirt",
      brand: "Carrefour",
      color: [
        "white"
      ],
      size: [
        "M",
        "L",
        "XL"
      ],
      regularPrice: 2800,
      salePrice: 2900,
      image: "[{\"url\":\"https://files.edgestore.dev/dpqpoujbjvg765ur/publicFiles/_public/9ea18539-531c-4783-be8f-6f0c70c3af37.png\",\"thumbnailUrl\":null,\"size\":58321,\"uploadedAt\":\"2024-07-24T10:27:22.877Z\",\"path\":{},\"pathOrder\":[],\"metadata\":{}},{\"url\":\"https://files.edgestore.dev/dpqpoujbjvg765ur/publicFiles/_public/0ce34783-cce3-495f-b595-ba7c5fd4ebeb.png\",\"thumbnailUrl\":null,\"size\":56490,\"uploadedAt\":\"2024-07-24T10:27:22.895Z\",\"path\":{},\"pathOrder\":[],\"metadata\":{}}]",
      stock: 10,
      sales: 0,
      createdAt: "2024-07-24T10:28:13.171Z",
      updatedAt: "2024-07-24T13:57:55.632Z"
    }
  ] 

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

const SliderItem = ({ product }: { product: any }) => (
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
                    {heroCarouselProducts.map((product, index) => (
                        <SliderItem key={index} product={product} />
                    ))}
                </CarouselMainContainer>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <CarouselThumbsContainer className="gap-x-1 mb-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <CarouselIndicator key={index} index={index} />
                        ))}
                    </CarouselThumbsContainer>
                </div>
            </Carousel>
        </section>
    );
};

export default Hero;
