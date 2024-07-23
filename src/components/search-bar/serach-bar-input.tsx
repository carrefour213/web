"use client"

import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { UserRole } from "@prisma/client";


interface SearchBarProps {
    query: string;
    onSearch: (query: string) => void;
    setQuery: (query: string) => void;
    session: any;
}

const SearchBarInput: React.FC<SearchBarProps> = ({ query, onSearch, setQuery, session }) => {

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            className={`${session?.user.role === UserRole.ADMIN ? "" : "max-w-sm"}  focus:outline-none`}
            placeholder="Que cherchez-vous ?"
        />
    );
};

export default SearchBarInput;