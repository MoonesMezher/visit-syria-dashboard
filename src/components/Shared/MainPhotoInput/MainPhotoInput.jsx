import { PiPencilSimpleLine } from "react-icons/pi";
import { useRef, useState } from "react";

const MainPhotoInput = () => {
  const imgRef = useRef(null);
  const [img, setImg] = useState("/src/assets/images/input/addPhoto.png ");
  const handleImgChange = (e) => {
    const file = e.target.files;
    console.log(file);
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  const HandleImgClick = () => {
    imgRef.current.click();
  };
  return (
    <div
      className="container position-relative border rounded border-dark-subtle d-flex align-items-center justify-content-center "
      style={{ width: "100px", height: "100px", cursor: "pointer" }}
      onClick={HandleImgClick}
    >
      <img
        src={img}
        alt="..."
        // style={{ height: "100px", width: "100px" }}
      />
      <div className="">
        <PiPencilSimpleLine
          className="position-absolute bottom-0"
          style={{
            width: "18.75px",
            height: "18.75px",
            left: "15px",
          }}
        />
      </div>
      <input
        type="file"
        name="img"
        id="inputImg"
        ref={imgRef}
        onChange={handleImgChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default MainPhotoInput;
