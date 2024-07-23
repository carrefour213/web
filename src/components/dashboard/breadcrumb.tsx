"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome } from 'react-icons/fa';

const Breadcrumb = () => {
    const pathname = usePathname();
    const pathArray = pathname.split('/').filter(path => path);

    const createBreadcrumbs = () => {
        return pathArray.map((path, index) => {
            const href = '/' + pathArray.slice(0, index + 1).join('/');
            const isLast = index === pathArray.length - 1;

            return (
                <li key={href} className="inline-flex items-center">
                    {!isLast ? (
                        <Link href={href} className="text-blue-600 hover:underline capitalize">
                            {path}
                        </Link>
                    ) : (
                        <span className="text-gray-500 capitalize">{path}</span>
                    )}
                    {!isLast && (
                        <span className="mx-2 text-gray-400">/</span>
                    )}
                </li>
            );
        });
    };

    return (
        <nav aria-label="breadcrumb" className="my-4">
            <ol className="inline-flex items-center space-x-1">
                {createBreadcrumbs()}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
