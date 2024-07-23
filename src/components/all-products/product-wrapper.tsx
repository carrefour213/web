import Link from "next/link";
import SectionTitle from "../section-title";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";



function ProductWrapper({
  seeMore,
  title,
  subTitle,
  color,
  link,
  children,
}: Readonly<{
  seeMore: boolean
  title: string;
  subTitle?: string;
  color: "red" | "violet" | "orange";
  link?: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="mb-20">
      <div className="flex justify-between items-center gap-2">
        <SectionTitle title={title} color={color} />
        {seeMore && link &&
          <Link href={link}>
            <Button className="bg-transparent text-black text-lg border flex items-center gap-2 p-5 mb-5">
              Voir Tout<ArrowRight />
            </Button>
          </Link>}
      </div>
      {subTitle && <h1 className="text-lg md:text-3xl font-semibold mb-5">{subTitle}</h1>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7">
        {children}
      </div>
    </section>
  );
}

export default ProductWrapper;
