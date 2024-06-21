import MainPhotoInput from "../MainPhotoInput/MainPhotoInput";
import { useRef } from "react";
import "./MainPhotoGroupInput.css";
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
    <div className="container rounded group-photo d-flex align-items-center justify-content-center">
      <div className="container base-group-photo">
        <div className="row" style={{ marginBottom: "24px" }}>
          <div className="col-6 ">
            <MainPhotoInput img={imgs[0]} setImg={setImgs[0]} />
          </div>
          <div className="col-6">
            <MainPhotoInput img={imgs[1]} setImg={setImgs[1]} />
          </div>
        </div>
        <div className="row position-relative">
          <div className="col-6 ">
            <MainPhotoInput img={imgs[2]} setImg={setImgs[2]} />
          </div>

          <div className="col-6">
            <MainPhotoInput img={imgs[3]} setImg={setImgs[3]} />
          </div>

          <div
            className="col-6"
            onClick={HandleImgClick}
            style={{ cursor: "pointer" }}
          >
            <div
              className="container position-absolute border d-flex align-items-center justify-content-center "
              style={{
                backgroundColor: "var(--gray_wheel_9))",
                width: "100px",
                height: "100px",
                bottom: "0px",
                borderRadius: "10px",
              }}
            >
              {imgs[5] ? (
                <img
                  src={imgs[5]}
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
