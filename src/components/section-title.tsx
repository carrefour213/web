


function SectionTitle({ title, color }: { title: string, color: "red" | "violet" | "orange" }) {
    return (
        <h2 className="flex items-center gap-3 mb-4">
            <span className={`bg-main-${color} inline-block w-5 h-10  rounded-sm`}></span>
            <span className={`text-main-${color} font-bold`}>{title}</span>
        </h2>
    );
}

export default SectionTitle;