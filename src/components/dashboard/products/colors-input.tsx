"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ColorsInputProps {
    colors: string[];
    setColors: (colors: string[]) => void;
}

const ColorsInput = ({ colors, setColors }: ColorsInputProps) => {
    const handleColorChange = (index: number, value: string) => {
        const newColors = [...colors];
        newColors[index] = value;
        setColors(newColors);
    };

    const addColor = () => setColors([...colors, ""]);

    const removeColor = (index: number) => {
        const newColors = colors.filter((_, i) => i !== index);
        setColors(newColors);
    };

    return (
        <div className="flex flex-col ">
            {colors.map((color, index) => (
                <div key={index} className="flex items-center  gap-2 mb-2">
                    <Input
                        type="text"
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        placeholder="black"
                    />
                    <Button type="button" onClick={() => removeColor(index)} className="text-white bg-[#232321]">
                        Remove
                    </Button>
                </div>
            ))}
            <Button type="button" onClick={addColor} className="text-white bg-[#232321]">
                Add Color
            </Button>
        </div>
    );
};

export default ColorsInput;
