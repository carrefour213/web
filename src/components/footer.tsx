

import Link from "next/link";
import Tab from "./tab";
import { Button } from "./ui/button";
import { CiFacebook, CiInstagram, CiLinkedin, CiLocationArrow1, CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import { PiTiktokLogoLight } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
const usefullLinks = [
    { title: "À propos", link: "about" },
    { title: "Contactez-nous", link: "contact" },
    { title: "Shop", link: "all-products" },
]


async function Footer() {
  const currentYear: number = new Date().getFullYear();
  return (
    <footer className="bg-black text-white">
      <div className="container py-10">
        
        <div className="flex flex-col md:flex-row gap-10 mb-5">
          <div className=" md:w-2/5">
            <h4  className="mb-5 font-bold text-xl">About</h4>
            <p  className="mb-5 text-gray-400">Carrefour propose plus d'un mille de produits à offrir, en croissance rapide. Carrefour offre une gamme diversifiée de catégories incluant l'impression à la demande</p>
          </div>
          <div className=" md:w-1/5">
            <h4  className="mb-5 font-bold text-xl">Contact</h4>
            <ul>
              <li className="">
                <span className="flex gap-2" >
                  <span ><CiLocationOn className="text-2xl" /></span>
                  <span>Adress : </span>
                </span>
                <span className="text-gray-400" ><Tab />Ouled Rached,Bouira</span>
              </li>
              <li className="pt-5">
                <span className="flex gap-2" >
                  <span><CiPhone className="text-2xl" /></span>
                  <span >Phone : </span>
                </span>
                <span className="text-gray-400"><Tab />+213562332146</span>
              </li>
              <li className="pt-5">
                <span className="flex gap-2" >
                  <span><CiMail className="text-2xl" /></span>
                  <span> Email :</span>
                </span>
                <span className="text-gray-400"><Tab />carrefourlimited@gmail.com</span>
              </li>
            </ul>
          </div>
          <div className=" md:w-1/5">
            <h4  className="mb-5 font-bold text-xl">Quick Link</h4>
            <ul>
              {usefullLinks.map((link, i) => (
                <Link  href={`/${link.link}`} key={link.title} className={`group w-full mb-1 flex items-center justify-between text-gray-400 relative`}>
                  {link.title}
                </Link>
              ))}
            </ul>
          </div>
          <div className=" md:w-1/5" >
            <h4 className="mb-5 font-bold text-xl">Lettre d'information</h4>
            <p className=" text-center mb-4">Contactez-nous</p>
            <Link href={`/contact`}>
              <Button className="bg-black border text-white w-full"><CiLocationArrow1 className="text-3xl" /></Button>
            </Link>

          </div>

        </div>
        <hr />
        <div className="flex flex-col md:flex-row justify-between pt-5 pr-10 text-center">
          <p><span> &copy; {currentYear} CARREFOUR.</span> <span>All right reserved</span></p>
          <div className="flex items-center gap-6 justify-center pt-5 md:pt-0">
            <Link target="_blank" href={`https://www.facebook.com/profile.php?id=61561313477643`}><CiFacebook className="text-3xl" /></Link>
            <Link target="_blank" href={`https://www.instagram.com/carrefour.dz/`}><CiInstagram className="text-3xl" /></Link>
            <Link target="_blank" href={`https://www.tiktok.com/@carreauen96`}><PiTiktokLogoLight  className="text-3xl" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;