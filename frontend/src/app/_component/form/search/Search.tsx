"use client"

import { CiSearch } from "react-icons/ci";
import {useRouter} from "next/navigation";
import { FormEventHandler } from "react";

const Search: React.FC = () => {
    const router = useRouter();

    const onSumbit : FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const recentSearches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        const updatedSearches: string[] = [e.currentTarget.search.value, ...recentSearches].slice(0, 5); // 최근 5개만 저장

        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        
        router.push(`/search?q=${e.currentTarget.search.value}`)
    }
    
    return (
        <form onSubmit={onSumbit}>
            <div className="search">
                <input type="text" name="search" className="input-control" placeholder="검색" />
                <button type="submit" className="btn-search"><CiSearch size={18} /></button>
            </div>
        </form>
    )
}

export default Search