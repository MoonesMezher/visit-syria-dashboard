// import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import { useState } from "react";
import p1 from "../../assets/images/settings/responsible1.png";
import p2 from "../../assets/images/settings/responsible2.png";
import add from "../../assets/images/settings/add.png";
import remove from "../../assets/images/settings/remove.png";
import "./Setting.css";

const Settings = () => {
  const [img, setImg] = useState(null);
  const handleImgChange = (e) => {
    const file = e.target.files;
    console.log(file);
    setImg(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <settings>
      <div className="container setting">
        <div className="row m-2">
          <div className="row m-1">
            <p className="input-label-text"> صورة الملف الشخصي </p>
            <div className="col-6">
              <div className="row p-2">
                <div className="img-box col-3 d-flex d-flex align-items-center justify-content-center justify-content-center">
                  {img ? (
                    <img src={img} alt="..." className="img-change" />
                  ) : (
                    <img
                      src="/src/assets/images/input/addPhoto.png "
                      alt="......."
                      className="img-change"
                    />
                  )}
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center justify-content-center">
                  <button
                    className="img-btn text-center"
                    style={{ backgroundColor: "var(--green_button)" }}
                  >
                    تغيير
                  </button>
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center justify-content-center">
                  <button
                    className="img-btn text-center"
                    style={{ backgroundColor: "var(--white)" }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
            <div className="col-6"></div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="input-label-text ">اسم المستخدم</p>
              <input
                type="text"
                name="user-name"
                id="user-name"
                className="form-control input-filed"
              />
            </div>
            <div className="col-6">
              <p className="input-label-text"> عنوان الإيميل </p>
              <input
                type="email"
                name="user-email"
                id="user-email"
                className="form-control  input-filed"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="input-label-text ">كلمة السر</p>
              <input
                type="password"
                name="user-password"
                id="user-password"
                className="form-control input-filed"
              />
            </div>
            <div className="col-6">
              <p className="input-label-text">سمة اللون </p>
              <div
                className="row  position-relative  justify-content-end "
                style={{ height: "50px", left: "80px" }}
              >
                <div className="col-2 theme-color"></div>
                <div className="col-2 theme-color"></div>
                <div className="col-2 theme-color"></div>
                <div className="col-2 theme-color"></div>
                <div className="col-2 theme-color"></div>
                <div className="col-2 theme-color"></div>
                <div className="col-2 theme-color add-color position-absolute"></div>
              </div>
            </div>
          </div>
          <div className="row gy-4 d-flex align-items-center justify-content-center ">
            <p className="input-label-text">المسؤولين</p>
            <div className="row responsible-box d-flex align-items-center justify-content-center text-center ">
              <div className="col-2 d-flex justify-content-center ">
                <div className="res-img">
                  <img src={p1} alt="...." />
                </div>
              </div>
            </div>

            <div className="row responsible-box justify-content-center text-center">
              <div className="col-2 ">
                <div className="res-img ">
                  <img src={p2} alt="...." />
                </div>
              </div>
              <div className="col-7">
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "21.78px",
                    fontWeight: "400",
                  }}
                >
                  مسؤول 1: مدخل بيانات
                </p>
              </div>
              <div className="col-3">
                <img src={add} alt="add" className="add-admin-icon" />
                <img src={remove} alt="remove" className="remove-admin-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </settings>
  );
};

export default Settings;
