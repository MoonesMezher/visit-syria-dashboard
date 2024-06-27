import React from "react";
import "./MainButton.css";
import { useNavigate } from "react-router-dom";

const MainButton = ({ text, goTo, onClick }) => {
  const navigate = useNavigate();
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    } else if (goTo) {
      navigate(`${goTo || "#"}`);
    }
  };
  return (
    <div className="BY_MainButton">
      <button onClick={handleClick}>{text}</button>
    </div>
  );
};

export default MainButton;
