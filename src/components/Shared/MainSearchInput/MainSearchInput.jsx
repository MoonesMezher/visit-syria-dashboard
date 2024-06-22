import { VscSearch } from "react-icons/vsc"
import "./MainSearchInput.css"
const MainSearchInput = ({text}) => {
    return (
        <div className="search-box-ay">
            <input type='text' name='search' placeholder={text}/>
            <VscSearch className='search-icon'/>
        </div>
    )
}

export default MainSearchInput

