import { LiaShippingFastSolid } from "react-icons/lia";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GoCheckCircle } from "react-icons/go";

const values = [
    {
        title: "Livraison Rapide",
        description: "gratuite pour les commandes de plus 15000 DA",
        icon: <LiaShippingFastSolid className="text-white text-xl" />
    },
    {
        title: "Service Clientèle 24/7",
        description: "support client amical 24/7",
        icon: <TfiHeadphoneAlt  className="text-white text-xl" />
    },
    {
        title: "Garantie de Remboursement",
        description: " Dans les 10 jours",
        icon: <GoCheckCircle  className="text-white text-xl" />
    }
];

function Values() {
    return (
        <section className="mb-20 flex flex-col md:flex-row justify-evenly gap-10">
            {values.map((value, index) => (
                <div key={index} className="flex flex-col justify-center items-center text-center">
                    <div className="w-14 h-14 bg-[#c1c1c1] flex justify-center items-center rounded-full mb-5">
                        <div className="w-10 h-10 bg-[#221c5c] flex justify-center items-center rounded-full">
                            {value.icon}
                        </div>
                    </div>
                    <h3 className="font-semibold tracking-wider mb-1">{value.title}</h3>
                    <p>{value.description}</p>
                </div>
            ))}
        </section>
    );
}

export default Values;
