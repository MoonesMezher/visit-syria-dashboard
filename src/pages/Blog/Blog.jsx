import { MdAssistantPhoto } from "react-icons/md";
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSelect from "../../components/Shared/MainSelect/MainSelect";
import MainTable from "../../components/Shared/MainTable/MainTable";
import "./Blog.css";
import { dataPage1, headers } from "./BlogStaticData";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import { useState } from "react";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainInput from "../../components/Shared/MainInput/MainInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgs, setImgs] = useState([]);

  const sendData = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (mainImageFile) {
      formData.append("main_image", mainImageFile);
    }
    console.log(formData);
    axios
      .post("http://127.0.0.1:8000/api/add", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const category = ["الطبيعة", "الأثرية"];
  const options = ["عنوان المقالة", "تاريخ النشر", "id"];

  return (
    <section>
      <div className="blog-header">
        <MainSelect title="ترتيب حسب" options={options} />
        <MainButton text={"اضافة مقال"} />
      </div>
      <div className="blog-table">
        <MainTable data={dataPage1} headers={headers} />
      </div>
      <div className="blog-body">
        <div className="blog-body-left">
          <div className="img-and-label">
            <p>صور اضافية</p>
            <MainPhotoGroupInput imgs={imgs} setImgs={setImgs} />
          </div>
          <MainButton text={"نشر المقالة"} onClick={sendData} />
        </div>
        <div className="blog-body-right">
          <div className="img-and-label">
            <p>الصورة الرئيسية</p>
            <div className="img-category">
              <MainSelect title={"Category"} options={category} />
              <MainPhotoInput
                img={mainImagePreview}
                setImgFile={setMainImageFile}
                setImgPreview={setMainImagePreview}
              />
            </div>
          </div>
          <MainInput
            label={"عنوان المقالة"}
            type={"text"}
            setInputValue={setTitle}
          />
          <MainInput
            label={"محتوى المقالة"}
            type={"textarea"}
            setInputValue={setContent}
          />
        </div>
      </div>
    </section>
  );
};

export default Blog;
