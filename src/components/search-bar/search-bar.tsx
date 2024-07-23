"use client"
import { Product, UserRole } from "@prisma/client";
import {  useEffect, useState } from "react";
import { getAllProducts } from "@/actions/products";
import SearchBarInput from "./serach-bar-input";
import Link from "next/link";



function SearchBar({ session }: { session: any; }) {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getAllProducts()
            if (products) {
                setAllProducts(products);
                setFilteredProducts([]);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (query: string) => {
        if (query.length === 0) setFilteredProducts([])
        else {
            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 4); // Get only the first 4 items
            setFilteredProducts(filtered);
        }
    };

    const clearFilteredProducts = () => {
        setFilteredProducts([]);
        setQuery('');
    };

    return (
        <div className="relative">
            <SearchBarInput
                onSearch={handleSearch}
                query={query}
                setQuery={setQuery}
                session={session}
            />
            {
                filteredProducts.length > 0
                    ?
                    <div className="absolute bg-[#f5f5f5] w-full rounded-md p-3 flex flex-col gap-3">
                        {filteredProducts.map(product => (
                            <Link
                                href={
                                    session?.user.role === UserRole.ADMIN ? `/dashboard/categories/${product.productCategorieName}/${product.id}` : `/all-products/${product.productCategorieName}/${product.id}`
                                }
                                key={product.id}
                                onClick={clearFilteredProducts}
                            >
                                <div key={product.id} className="flex items-center gap-2">
                                    <img src={JSON.parse(product.image as string)[0].url} alt="" className="w-6" />
                                    <h2>{product.name}</h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                    :
                    <></>
            }

        </div >
    );
}

export default SearchBar;


