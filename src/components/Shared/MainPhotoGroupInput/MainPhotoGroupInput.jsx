import { PiPencilSimpleLine } from "react-icons/pi";
import MainPhotoInput from "../MainPhotoInput/MainPhotoInput";
import { IoAdd } from "react-icons/io5";

const MainPhotoGroupInput = () => {
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
        <div className="row">
          <div className="col-6 ">
            <MainPhotoInput />
          </div>
          <div
            className="col-6"
            style={{
              marginBottom: "24px",
            }}
          >
            <MainPhotoInput />
          </div>
        </div>
        <div className="row position-relative">
          <MainPhotoInput />
          <div className="col-6">
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
          </div>
          <div className="col-6">
            <div
              className="container position-absolute border d-flex align-items-center justify-content-center "
              style={{
                backgroundColor: "rgba(217, 217, 217, 0.75)",
                width: "100px",
                height: "100px",
                bottom: "0px",
                right: "0px",
                borderRadius: "10px",
              }}
            >
              <IoAdd
                style={{
                  fontSize: "60px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPhotoGroupInput;
