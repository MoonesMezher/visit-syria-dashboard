import { PiPencilSimpleLine } from "react-icons/pi";
import { useEffect, useRef, useState } from "react";

const MainPhotoInput = ({ setImg, img }) => {
  const imgRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    console.log('img', img);
    setSelectedImage(img);
  }, []);

  const handleImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImg(file);
    }
  };

  const handleImgClick = () => {
    imgRef.current.click();
  };

  return (
    <div
      className="container position-relative border rounded border-dark-subtle d-flex align-items-center justify-content-center mx-0 overflow-hidden"
      style={{ width: "100px", height: "100px", cursor: "pointer" }}
      onClick={handleImgClick}
    >
      {selectedImage ? (
        <img src={selectedImage} alt="..." style={{ height: "99px", width: "99px", 'objectFit': 'cover' }} />
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