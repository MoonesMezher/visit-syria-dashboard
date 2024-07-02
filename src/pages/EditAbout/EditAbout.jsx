import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import axios from "axios";
import MainInput from "../../components/Shared/MainInput/MainInput";
// import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput"
import MainButton from "../../components/Shared/MainButton/MainButton";
import { toast } from "react-toastify";
import addImg from "../../assets/images/input/add+.png";
import Loading from "../../components/Shared/Loading/Loading";
import {
  editItem,
  getItemInfo,
} from "../../constant/api/services/aboutService";

const EditAbout = () => {
  const options = [
    {
      id: 1,
      name: "الحضارات",
    },
    {
      id: 2,
      name: "التاريخ",
    },
    {
      id: 3,
      name: "الآثار",
    },
    {
      id: 4,
      name: "الطبيعة",
    },
    {
      id: 4,
      name: "السياحة",
    },
  ];
  const [title, setInputTitle] = useState("");
  const [category, setInputcategory] = useState("");
  const [content, setInputcontent] = useState("");
  const [main_image, setImg] = useState(null);
  const [image1group, setImage1group] = useState();
  const [image2group, setImage2group] = useState();
  const [image3group, setImage3group] = useState();
  const [image4group, setImage4group] = useState();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await getItemInfo(id);
        const temp = response.data.images;
        const imgs = temp.map((str) => "http://127.0.0.1:8000" + str);
        let data = {
          id: response.data.id,
          title: response.data.title,
          category: response.data.category,
          content: response.data.content,
          main_image: response.data.main_image,
          images: imgs,
        };
        setItem(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const updateData = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    title ? formData.append("title", title) : item.title;
    content ? formData.append("content", content) : item.content;
    category ? formData.append("category", category) : item.category;
    main_image ? formData.append("main_image", main_image) : null;
    if (image1group) {
      formData.append("images[]", image1group);
    }
    if (image2group) {
      formData.append("images[]", image2group);
    }
    if (image3group) {
      formData.append("images[]", image3group);
    }
    if (image4group) {
      formData.append("images[]", image4group);
    }

    formData.append("_method", "put");
    try {
      await editItem(formData, id);
      setLoading(false);
      navigate("/about");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <>
      {!loading && Object.keys(item).length > 0 ? (
        <form
          onSubmit={() => {
            updateData(event);
          }}
        >
          <section className="d-flex justify-content-end w-100 gap-5 position-relative">
            <div className="d-flex flex-column gap-4 flex-fill">
              <div className="d-flex justify-content-between">
                <MainPhotoInput
                  img={`http://127.0.0.1:8000${item.main_image}`}
                  setImg={setImg}
                  name="main_image"
                  value={item.main_image}
                />
                <label>الصورة الرئيسية</label>
              </div>

              <div className="d-flex justify-content-between">
                <label> مجموعة الصور </label>
                <div className="image_input">
                  <MainPhotoInput
                    img={`${item.images[0] ? item.images[0] : ""}`}
                    setImg={setImage1group}
                  />
                  <MainPhotoInput
                    img={`${item.images[1] ? item.images[1] : ""}`}
                    setImg={setImage2group}
                  />
                  <MainPhotoInput
                    img={`${item.images[2] ? item.images[2] : ""}`}
                    setImg={setImage3group}
                  />
                  <MainPhotoInput
                    img={`${item.images[3] ? item.images[3] : addImg}`}
                    setImg={setImage4group}
                  />
                </div>
              </div>
            </div>
            <div className="w-50">
              <MainInput
                label={"عنوان المقالة"}
                type={"text"}
                setInputValue={setInputTitle}
                name="title"
                value={item.title}
              />
              <select
                className=" form-select mb-3 mt-3 pt-2 pb-2"
                aria-label="Default select example"
                defaultValue={item.category}
                name="category"
                // value={value}
                onChange={(e) => setInputcategory(e.target.value)}
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
                <option value="none">{item.category}</option>
                {options.map((e, index) => (
                  <option key={index} value={e.name} className="p-4">
                    {e.name}
                  </option>
                ))}
              </select>
              <MainInput
                label={"محتوى المقالة"}
                type={"textarea"}
                name="content"
                setInputValue={setInputcontent}
                value={item.content}
              />
            </div>
          </section>
          <div className="mx-auto mt-3" style={{ width: "fit-content" }}>
            <MainButton text={"تعديل المقال"} type="submit"/>
          </div>
        </form>
      ) : (
        <Loading loading={!loading} style={"loading-get-all"} />
      )}
    </>
  );
};

export default EditAbout;
