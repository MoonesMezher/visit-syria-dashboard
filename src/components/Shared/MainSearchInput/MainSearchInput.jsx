import { VscSearch } from "react-icons/vsc"
import "./MainSearchInput.css"

const MainSearchInput = ({placeholder,onChange }) => {

        const handleChange = (event) => {
            if (onChange) {
                onChange(event);
            }
        };
    return (
        
        <div className="search-box-ay">
            <input type='text' name='search' onChange={handleChange} placeholder={placeholder}/>
            <VscSearch className='search-icon'/>
        </div>
    )
}

export default MainSearchInput

