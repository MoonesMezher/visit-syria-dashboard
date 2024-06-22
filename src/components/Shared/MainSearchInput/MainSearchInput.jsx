import { VscSearch } from "react-icons/vsc"
import "./MainSearchInput.css"
const MainSearchInput = () => {
    return (
        <div className="search-box-ay">
            <input type='text' name='search' placeholder="بحث عن فندق"/>
            <VscSearch className='search-icon'/>
        </div>
    )
}

export default MainSearchInput

