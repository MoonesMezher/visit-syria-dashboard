import { useState } from "react";
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainInput from "../../components/Shared/MainInput/MainInput";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import "./AddBlog.css";
import MainSelect from "../../components/Shared/MainSelect/MainSelect";
import axios from "axios";
import { useFetchCities } from "../../constant/api/FetchData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [main_image, setMainImage] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState();

  const navigate = useNavigate();

  const { cities } = useFetchCities();

  const options = [
    {
      id: 0,
      name: "الطبيعة",
    },
    {
      id: 1,
      name: "الاثرية",
    },
  ];

  const sendData = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const data = {
    main_image :main_image,
    title: title,
    content: content,
    category: category,
    images: images,
    city_id: city,
    }

      setLoading(true);
      await axios.post("http://127.0.0.1:8000/api/add",data,{
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: 'Bearer ' + token,
          },
        })
        .then(res => {
          console.log(res);
          if(res?.status === 200) {
          toast.success('تمت الإضافة بنجاح')
          navigate("/blogs");
        }
      }).catch(err =>{
        console.log(err);
        if(err?.response?.data?.data) {
        toast.error(err?.response?.data?.data[0])          
        } else {
        toast.error(err.message)
        }
    });
  }

  return (
      <section className="d-flex justify-content-end w-100 gap-5">
        <div className="d-flex flex-column gap-4 flex-fill">
          <div className="d-flex justify-content-between">
            <MainPhotoGroupInput imgs={images} setImgs={setImages} />
            <label>مجموعة الصور</label>
          </div>
          <div style={{marginTop:"250px"}}>
          <MainButton text={"نشر المقالة"} onClick={sendData} />

          </div>
        </div>
        <div className="w-50">
          <div style={{ display: "inline-block", marginBottom: "20px" }}>
            <label style={{ marginBottom: "20px" }}>الصورة الرئيسية</label>
            <MainPhotoInput
              img={main_image}
              setImg={setMainImage}
              name="main_image"
            />
          </div>
          <div>
            <label>الصورة الرئيسية</label>

            <select
              className=" form-select mb-3 mt-3 pt-2 pb-2"
              aria-label="Default select example"
              name="category"
              // value={value}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                outline: "0px solid red",
                marginTop: "10px",
                background: "transparent",
                borderColor: "rgba(159, 154, 154, 1)",
                cursor: "pointer",
                padding: "10 10px",
                borderRadius: "5px",
              }}
            >
              <option value="none"> تصنيف المقال</option>
              {options.map((e, index) => (
                <option key={index} value={e.name} className="p-4">
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <MainInput
            label={"عنوان المقالة"}
            type={"text"}
            setInputValue={setTitle}
            name="title"
            value={title}
          />
          <MainInput
            label={"المدينة"}
            name={"city"}
            value={city}
            setInputValue={setCity}
            type={"select"}
            options={cities && cities}
          />

          <MainInput
            label={"محتوى المقالة"}
            type={"textarea"}
            setInputValue={setContent}
            name="content"
            value={content}
          />
        </div>

      </section>
  )
};

export default AddBlog;
