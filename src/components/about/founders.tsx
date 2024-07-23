import Image from "next/image";
import Link from "next/link";
import { CiFacebook, CiInstagram, CiLinkedin } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";

const Founder = ({ name, title, imageUrl }: { name: string, title: string, imageUrl: string }) => (
    <div className="flex flex-col md:w-1/3">
        <div className="w-full">
            <Image src={imageUrl} alt={`${name} image`} width={1000} height={1000} className="w-full rounded-sm" />
        </div>
        <div className="flex flex-col py-5">
            <h3 className="font-semibold tracking-wider text-2xl mb-1">{name}</h3>
            <span className="mb-3">{title}</span>
            <div className="flex items-center gap-6 justify-left">
                {/* <Link href={`/`}><CiFacebook className="text-2xl" /></Link> */}
                <Link href={`/`}><RiTwitterXFill className="text-xl" /></Link>
                <Link href={`/`}><CiInstagram className="text-2xl" /></Link>
                <Link href={`/`}><CiLinkedin className="text-2xl" /></Link>
            </div>
        </div>
    </div>
);

function Founders() {
    const founders = [
        { name: "Amine Boudjemaa", title: "Managing Director", imageUrl: "/images/about-founder-1.png" },
        { name: "Amine Boudjemaa", title: "Managing Director", imageUrl: "/images/about-founder-1.png" },
        { name: "Amine Boudjemaa", title: "Managing Director", imageUrl: "/images/about-founder-1.png" }
    ];

    return (
        <section className="mb-20 flex flex-col md:flex-row gap-7">
            {founders.map((founder, index) => (
                <Founder
                    key={index}
                    name={founder.name}
                    title={founder.title}
                    imageUrl={founder.imageUrl}
                />
            ))}
        </section>
    );
}

export default Founders;
