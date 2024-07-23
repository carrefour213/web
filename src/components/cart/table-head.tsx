function TableHead() {
    return (
        <div className="w-full flex justify-between items-center border p-4">
            <div className="w-[100px] text-center ">
                Produit
            </div>
            <div className="w-[100px] text-center hidden md:block">
                Prix
            </div>
            <div className="w-[100px] text-center hidden md:block">
                Couleur
            </div>
            <div className="w-[100px] text-center hidden md:block">
                Taille
            </div>
            <div className="w-[150px] text-center hidden md:block">
                Quantité
            </div>
            <div className="w-[100px] text-center">
                Sous-total
            </div>
            <div className="w-[100px] text-center">
                
            </div>
        </div>
    );
}

export default TableHead;
