"use client"

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';
import { Size } from '@prisma/client';
import { toast } from 'sonner';
import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';

export type AddToCart = (product: CartProps, quantity: number) => void;

export interface CartProps {
  id: string;
  color: string;
  size: Size;
  quantity: number;
  name: string;
  price: number;
}

export const sortCartByName = (a: any, b: any) => {
  if (a.name && b.name) {
    return a.name.localeCompare(b.name);
  }
  return 0;
};

export const useCart = () => useContext(CartContext);

// Define the context value type to include setCart
export interface CartContextType {
  cart: CartProps[];
  setCart: Dispatch<SetStateAction<CartProps[]>>;
  addToCart: (clientProduct: CartProps, quantity: number, size: Size, color: string, price: number) => void;
  updateCart: (clientProduct: CartProps, quantity: number, size: Size, color: string) => void;
  updateCartQuntity: (product: CartProps, quantity: number) => void;
  deleteFromCart: (product: CartProps) => void;
  checkIsInCart: (productId: string) => (CartProps | undefined);
}

// Create the context with an undefined initial value
export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProps[]>([]);

  const addToCart = (clientProduct: CartProps, quantity: number, size: Size, color: string, price: number) => {
    setCart([...cart, { ...clientProduct, quantity, size, color, price }].sort(sortCartByName));
    toast("Article ajouté", {
      className: "bg-emerald-500 text-white",
      icon: <CheckCircledIcon className="h-4 w-4" />
    })
  };

  const updateCart = (clientProduct: CartProps, quantity: number, size: Size, color: string) => {
    const newCart = cart.filter(pro => pro.id !== clientProduct.id);
    setCart([...newCart, { ...clientProduct, quantity, size, color }].sort(sortCartByName));
  };

  const updateCartQuntity = (clientProduct: CartProps, quantity: number) => {
    const newCart = cart.filter(pro => pro.id !== clientProduct.id);
    setCart([...newCart, { ...clientProduct, quantity }].sort(sortCartByName));
  };

  const deleteFromCart = (clientProduct: CartProps) => {
    const newCart = cart.filter(pro => pro.id !== clientProduct.id);
    setCart([...newCart]);
    toast("Article supprimé", {
      className: "bg-main-red text-white",
      icon: <ExclamationTriangleIcon className="h-4 w-4" />
    })
  };

  const checkIsInCart = (productId: string) => {
    return cart.find((product) => product.id === productId)
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, updateCartQuntity, deleteFromCart, checkIsInCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};