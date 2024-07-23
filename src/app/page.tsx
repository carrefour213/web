import { auth } from "@/auth";
import Values from "@/components/about/values";
import AllProducts from "@/components/home/all-products";
import Categories from "@/components/home/categories";
import Hero from "@/components/home/hero";
import NewArrival from "@/components/home/new-arrival";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if (session?.user.role === UserRole.ADMIN) {
    redirect('/dashboard')
  }
  return (
    <main className="container">
      <Hero />
      <Categories />
      <AllProducts/>
      <NewArrival />
      <Values/>
    </main>
  );
}
