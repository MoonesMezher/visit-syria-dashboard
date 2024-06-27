import { useState } from "react";
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainInput from "../../components/Shared/MainInput/MainInput";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import "./AddBlog.css";
import MainSelect from "../../components/Shared/MainSelect/MainSelect";

const AddBlog = () => {
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgs, setImgs] = useState([]);

  const category = [
    { label: "الطبيعة", value: "الطبيعة" },
    { label: "الأثرية", value: "الأثرية" },
  ];

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

  return (
    <section className="add-blog">
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
              <MainSelect
                title={"Category"}
                options={["Category", ...category]}
                onSelect={(category) =>
                  setSortBy(category === "Category" ? "" : category)
                }
              />
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

export default AddBlog;
