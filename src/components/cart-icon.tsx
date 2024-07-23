"use client"
import { CartContextType, useCart } from "@/lib/cart-context";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import React from 'react';
import PropTypes from 'prop-types';

import { SheetClose } from "@/components/ui/sheet";


function CartIcon({ isMobileScreen }: { isMobileScreen: Boolean }) {

    // const context = useCart()
    // if (context) return null
    const { cart } = useCart() as CartContextType
    return (
        <Link href={"/cart"} className="relative">
            {isMobileScreen ?
                <SheetClose >
                    {cart.length > 0 ? <div className="bg-red-500 w-4 h-4 rounded-full text-xs text-white flex justify-center items-center absolute -left-2">{cart.length}</div> : <></>}
                    <IoCartOutline className="text-3xl" />
                </SheetClose > :
                <>
                    {cart.length > 0 ? <div className="bg-red-500 w-4 h-4 rounded-full text-xs text-white flex justify-center items-center absolute -top-2 -left-2">{cart.length}</div> : <></>}
                    <IoCartOutline className="text-3xl" />
                </>
            }
        </Link>
    );
}

export default CartIcon;