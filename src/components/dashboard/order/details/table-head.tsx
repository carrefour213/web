


function TableHead() {
    return (
        <div className="w-full flex justify-between items-center border p-4">
            <div className="w-[100px] text-center">
                Product
            </div>
            <div className="w-[100px] text-center">
                Price
            </div>
            <div className="w-[100px] text-center">
                Color
            </div>
            <div className="w-[100px] text-center">
                Size
            </div>
            <div className="w-[150px] text-center">
                Quantity
            </div>
            <div className="w-[100px] text-center">
                Subtotal
            </div>
        </div>
    );
}

export default TableHead;