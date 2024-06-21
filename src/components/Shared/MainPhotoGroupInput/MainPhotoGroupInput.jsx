import MainPhotoInput from "../MainPhotoInput/MainPhotoInput";
import { useRef, useState } from "react";
const MainPhotoGroupInput = ({ imgs, setImgs }) => {
  const imgRef = useRef(null);

  const handleImgChange = (e) => {
    const file = e.target.files;
    console.log(file);
    setImgs(e.target.files[0]);
  };
  const HandleImgClick = () => {
    imgRef.current.click();
  };
};

export default MainPhotoGroupInput;
