import Breadcrumb from "./breadcrumb";



function Header({
    children,
    title
}: Readonly<{
    title: string;
    children?: React.ReactNode;
}>) {
    return (
        <header className="flex justify-between items-center mb-3">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <Breadcrumb />
            </div>
            <div>
                {children}
            </div>
        </header>
    );
}

export default Header;