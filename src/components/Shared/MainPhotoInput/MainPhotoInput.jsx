import { PiPencilSimpleLine } from "react-icons/pi";
import { useRef, useState } from "react";

const MainPhotoInput = ( { img, setImg ,name} ) => {
  const imgRef = useRef(null);

  const handleImgChange = (e) => {
    const file = event.target.files[0];
    setImg((file));
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
      {/* <img
        src={img}
        alt="..."
        // style={{ height: "100px", width: "100px" }}
      /> */}
       {/* show img */}
      {img ? (
        <img src={URL.createObjectURL(img)} alt="..." style={{ height: "100px", width: "100px" }} />
      ) : (
        <img
          src="/src/assets/images/input/addPhoto.png "
          alt="......."
          style={{ height: "50px", width: "50px" }}
        />
      )}
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
      {/* <input
        type="file"
        name={name}
        id="inputImg"
        ref={imgRef}
        onChange={handleImgChange}
        style={{ display: "none" }}
      /> */}
             

                 <input
        type="file"
        id="file-input"
        name={name}
        onChange={handleImgChange}
        style={{ display: 'none' }}
        ref={imgRef}
      />
    <div>

            
    </div>
    </div>
  );
};

export default MainPhotoInput;
