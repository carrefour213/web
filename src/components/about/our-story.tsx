import Image from "next/image";



function OurStory() {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-20 mb-20">
        <div className="flex-1 ">
            <h1 className="text-3xl font-bold mb-8 tracking-widest">Notre histoire</h1>
            <p className="mb-4">Lancée en 2024, Carrefour est soutenue par une large gamme de solutions marketing, de données et de services personnalisés. Carrefour compte 500 vendeurs et 30 marques, et elle sert  des milliers de clients à travers la région</p>
            <p>Carrefour propose plus d'un mille de produits à offrir, en croissance rapide. Carrefour offre une gamme diversifiée de catégories incluant l'impression à la demande</p>
        </div>
        <div className="flex-1">
            <Image src={'/images/about.png'} alt="about img" width={1000} height={1000} className="w-full"/>
        </div>
    </section>
  );
}

export default OurStory;