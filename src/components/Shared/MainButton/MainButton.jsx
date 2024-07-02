import React, { useState } from "react";
import "./MainButton.css";
import { useNavigate } from "react-router-dom";

const MainButton = ({ text, goTo, onClick }) => {
  const [isClicked, setIsClicked] = useState(false); // State to track click

  const navigate = useNavigate();
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    } else if (goTo) {
      navigate(`${goTo || "#"}`);
    }
    setIsClicked(!isClicked); // Toggle click state
  };
  return (
    <div className="BY_MainButton">
      <button onClick={handleClick} className={isClicked? 'clicked' : ''}>{text}</button>
    </div>
  );
};

export default MainButton;
