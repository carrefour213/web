import Link from "next/link";
import { Button } from "../ui/button";

function Total({ total }: { total: number }) {
    return (
        <div className="flex justify-end items-end">
            <div className="flex flex-col gap-5 border md:w-[40%] max-w-[400px] p-5">
                <h2 className="text-xl font-bold mb-2">Total du panier</h2>
                {/* <div className="flex justify-between">
                    <span>Sous-total : </span>
                    <span>{total} Dz</span>
                </div> */}
                {/* <hr /> */}
                <div className="flex justify-between">
                    <span>Total : </span>
                    <span>{total} Dz</span>
                </div>
                <div className="flex justify-center">
                    {total > 0 ?
                        <Link href={"/cart/check-out"}>
                            <Button className="bg-main-red text-white px-7 py-5">Procéder au paiement</Button>
                        </Link>
                        :
                        <Link href={"/all-products"}>
                            <Button className="bg-white text-black border border-border px-7 py-5">Retour aux produits</Button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}

export default Total;
