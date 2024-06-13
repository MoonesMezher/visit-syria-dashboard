import MainPhotoInput from "../MainPhotoInput/MainPhotoInput";
import { useRef, useState } from "react";
const MainPhotoGroupInput = ({ imgs, setImgs }) => {
  const imgRef = useRef(null);

  const handleImgChange = (e) => {
    const file = e.target.files;
    console.log(file);
    setImgs(URL.createObjectURL(e.target.files[0]));
  };
  const HandleImgClick = () => {
    imgRef.current.click();
  };

  return (
    <div
      className="container border rounded border-dark-subtle d-flex align-items-center justify-content-center"
      style={{
        width: "284px",
        height: "267px",
        direction: "rtl",
      }}
    >
      <div
        className="container"
        style={{
          width: "221px",
          height: "224px",
        }}
      >
        <div className="row" style={{ marginBottom: "24px" }}>
          <div className="col-6 ">
            <MainPhotoInput />
          </div>
          <div className="col-6">
            <MainPhotoInput />
          </div>
        </div>
        <div className="row position-relative">
          <div className="col-6 ">
            <MainPhotoInput />
          </div>
          {/* <div className="col-6">
            <div
              className="container position-relative border rounded border-dark-subtle d-flex align-items-center justify-content-center "
              style={{ width: "100px", height: "100px" }}
            >
              <img
                src="/src/assets/images/input/addPhoto.png "
                className="img-style"
                alt="..."
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
            </div>
          </div> */}
          <div className="col-6">
            <MainPhotoInput />
          </div>

          <div
            className="col-6"
            onClick={HandleImgClick}
            style={{ cursor: "pointer" }}
          >
            <div
              className="container position-absolute border d-flex align-items-center justify-content-center "
              style={{
                backgroundColor: "rgba(217, 217, 217, 0.75)",
                width: "100px",
                height: "100px",
                bottom: "0px",
                borderRadius: "10px",
              }}
            >
              {imgs ? (
                <img
                  src={imgs}
                  alt="..."
                  style={{ height: "100px", width: "100px" }}
                />
              ) : (
                <img
                  src="/src/assets/images/input/add.png "
                  alt="......."
                  style={{ height: "50px", width: "50px" }}
                />
              )}
              {/* <img
                src={img}
                alt="..."
                // style={{ height: "100px", width: "100px" }}
              /> */}
              <input
                type="file"
                name="img"
                id="inputImg"
                ref={imgRef}
                onChange={handleImgChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPhotoGroupInput;
