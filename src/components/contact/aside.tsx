import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";



function Aside() {
    return (
        <section className={`md:w-1/3  border p-10`} >
            <div className="flex flex-col gap-4 mb-6">
                <h3 className="flex items-center gap-4"> <div className="w-10 h-10 bg-[#f19035] flex justify-center items-center rounded-full"><FaPhone className=" text-white text-xl  "/></div> <span className="font-semibold text-lg">Appelez-nous</span> </h3>
                <span>Nous sommes disponibles 24h/7</span>
                <span>Numéro: +213 5 62 33 21 46</span>
                <span>Numéro: +213 7 92 04 32 18</span>
            </div>
            <hr />
            <div className="flex flex-col gap-4 mt-6">
                <h3 className="flex items-center gap-4"> <div className="w-10 h-10 bg-[#f19035] flex justify-center items-center rounded-full"><IoMdMail className=" text-white text-xl  "/></div> <span className="font-semibold text-lg">Écrivez-nous</span> </h3>
                <span>Remplissez notre formulaire et nous vous contacterons dans les 24 heures</span>
                <span>Emails: carrefourlimited@gmail.com</span>
            </div>
        </section>
    );
}

export default Aside;