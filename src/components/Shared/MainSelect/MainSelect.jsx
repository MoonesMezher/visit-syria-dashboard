import { useState } from "react"
import "./MainSelect.css"
import { IoIosArrowDown } from "react-icons/io";
const MainSelect = ({title,options,onSelect}) => {

    const [isOpen,setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(title);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handelOptionClick = (option) => {
        setSelectedOption(option.label ? option.label : option);
        onSelect(option.value ? option.value : option );
        setIsOpen(false);
    }

    return (
        <div className="main-select">
            <button className={`btn btn-light select-button ${isOpen? "clicked" : ""}`}   onClick={toggleDropdown}>
                {selectedOption}
                <span><IoIosArrowDown /></span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option, index) => (
                        <button key={index} className="dropdown-item" onClick={()=>handelOptionClick(option)}>
                            {option.label ? option.label : option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MainSelect