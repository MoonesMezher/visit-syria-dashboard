// import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import { useState } from "react";
import p1 from "../../assets/images/settings/responsible1.png";
import p2 from "../../assets/images/settings/responsible2.png";
import add from "../../assets/images/settings/add.png";
import remove from "../../assets/images/settings/remove.png";
import "./Setting.css";
import axios from "axios";
import { toast } from "react-toastify";
const Settings = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isiImageChanging, setIsimageChanging] = useState(false);
  const notifyDeletePhoto = () => toast("Photo Deleted Successfully");
  const notifyUpdatedPhoto = () => toast("Photo Updated Successfully");
  const notifyUpdatedAdmin = () => toast("Admin Updated Successfully");
  const notifyError = (er) => toast(er);


  
  const formData = new FormData();
  const id = localStorage.getItem("id");
  const token = localStorage.getItem('token');
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setImage(URL.createObjectURL(file));
    setIsimageChanging(true);
  
    axios.put(`http://127.0.0.1:8000/api/admin-update-photo/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
    console.log(response);
    setIsimageChanging(false);
    notifyUpdatedPhoto();
  })
  .catch((error) => {
    console.error(error);
    setIsSubmitting(false); 
    setImage(null);
    notifyError(error.response.data.message);
  });
  };

  const handleDeletePohot = () => {

    axios.delete(`http://127.0.0.1:8000/api/admin-delete-photo/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
    console.log(response);
    setImage(null);
    notifyDeletePhoto();
  })
  .catch((error) => {
    console.error(error);
    notifyError(error.response.data.message);
  });
  };

  const handleSubmit = async(e) => {

    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      name : name,
      email: email,
      password: password,
  };
  console.log(data);
  await axios.put(`http://127.0.0.1:8000/api/admin-update/${id}`, data,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log(response);
    setIsSubmitting(false);
    notifyUpdatedAdmin();
    setName("");
    setEmail("");
    setPassword("");
  })
  .catch((error) => {
    console.error(error);
    setIsSubmitting(false); 
    notifyError(error.response.data.message);
  });
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
                  {image ? (
                    <img src={image} alt="..." className="img-change" />
                  ) : (
                    <img
                      src="/src/assets/images/input/addPhoto.png "
                      alt="......."
                      className="img-change"
                    />
                  )}
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center justify-content-center">
                <label htmlFor="file-input" className="img-btn text-center" style={{ backgroundColor: "var(--green_button)" }}>
                    تغيير
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImgChange}
                    style={{ display: "none" }}
                    disabled={isiImageChanging}
                  />
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center justify-content-center">
                  <button
                    className="img-btn text-center"
                    style={{ backgroundColor: "var(--white)" }}
                    onClick={handleDeletePohot}
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
                value={name}
                id="user-name"
                className="form-control input-filed"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-6">
              <p className="input-label-text"> عنوان الإيميل </p>
              <input
                type="email"
                name="user-email"
                value={email}
                id="user-email"
                className="form-control  input-filed"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="input-label-text ">كلمة السر</p>
              <input
                type="password"
                name="user-password"
                value={password}
                id="user-password"
                className="form-control input-filed"
                onChange={(e)=>setPassword(e.target.value)}
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
          <div className="row mb-2 d-flex align-items-center justify-content-center">
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال"}
            </button>
          </div>
          <div className="row gy-4 d-flex align-items-center justify-content-center mt-0">
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

