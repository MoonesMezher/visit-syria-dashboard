import React from 'react'
import './MainButton.css'
import { useNavigate } from 'react-router-dom';

const MainButton = ({ text, goTo, type }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`${goTo || '#'}`);
    };
    return (
        <div className='BY_MainButton'>
            <button type={type} onClick={handleClick} >{text}</button>
        </div>
    )
}

export default MainButton