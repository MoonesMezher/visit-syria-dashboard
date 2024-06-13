import { useState } from "react"
import "./MainSelect.css"
import { IoIosArrowDown } from "react-icons/io";
const MainSelect = ({title,options}) => {

    const [isOpen,setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="main-select">
            <button className={`btn btn-light select-button ${isOpen? "clicked" : ""}`}   onClick={toggleDropdown}>
                {title}
                <span><IoIosArrowDown /></span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option, index) => (
                        <button key={index} className="dropdown-item" onClick={() => alert(option)}>
                            {option}
                        </button>
                    ))}
                </div>
            )}
        
        </div>
    );
};

export default MainSelect