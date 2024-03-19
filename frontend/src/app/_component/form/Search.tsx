import { CiSearch } from "react-icons/ci";

const Search = () => {
    return (
        <div className="search">
            <input type="text" className="input-control" placeholder="검색" />
            <button type="button" className="btn-search"><CiSearch size={18} /></button>
        </div>
    )
}

export default Search