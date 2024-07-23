
import { CiDollar, CiShop } from "react-icons/ci";
import { RiShoppingBag4Line } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";


const values = [
    {
        title: "10.5k",
        description: "Vendeur actifs sur le site",
        icon: <CiShop className="text-white text-xl group-hover:text-[#221c5c] transition duration-300 ease-in-out" />
    },
    {
        title: "10.5k ",
        description: "Vente mensuelle de produits",
        icon: <CiDollar className="text-white text-xl group-hover:text-[#221c5c] transition duration-300 ease-in-out" />
    },
    {
        title: "10.5k ",
        description: "Client actif sur le site",
        icon: <RiShoppingBag4Line  className="text-white text-xl group-hover:text-[#221c5c] transition duration-300 ease-in-out" />
    },
    {
        title: "10.5k",
        description: "Ventes brutes annuelles",
        icon: <TbMoneybag  className="text-white text-xl group-hover:text-[#221c5c] transition duration-300 ease-in-out" />
    }
];

function Statistics() {
    return (
        <section className="mb-20 flex flex-col md:flex-row justify-center gap-5">
            {values.map((value, index) => (
                <div key={index} className="flex flex-col justify-center items-center text-center border p-10 rounded-sm hover:bg-[#ecc867] hover:text-white group transition duration-300 ease-in-out statistics-box-shadow">
                    <div className="w-14 h-14 bg-[#c1c1c1] group-hover:bg-[#f2d894] flex justify-center items-center rounded-full mb-5 transition duration-300 ease-in-out">
                        <div className="w-10 h-10 bg-[#221c5c] group-hover:bg-white flex justify-center items-center rounded-full transition duration-300 ease-in-out">
                            {value.icon}
                        </div>
                    </div>
                    <h3 className="font-semibold text-3xl tracking-wider mb-1">{value.title}</h3>
                    <p>{value.description}</p>
                </div>
            ))}
        </section>
    );
}

export default Statistics;