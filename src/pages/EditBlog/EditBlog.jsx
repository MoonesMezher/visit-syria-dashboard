import { useNavigate, useParams } from "react-router-dom";
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainInput from "../../components/Shared/MainInput/MainInput";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import { useEffect, useState } from "react";
import { useFetchCities } from "../../constant/api/FetchData";
import { editBlog, getBlogInfo } from "../../constant/api/FetchBlogData";
import Loading from "../../components/Shared/Loading/Loading";
import addImg from '../../assets/images/input/add+.png'
import "./EditBlog.css"
const EditBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [main_image, setMainImage] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [city, setCity] = useState();
    const { cities } = useFetchCities();
    const [blog, setBlog] = useState({});
    const [image1group, setImage1group] = useState();
    const [image2group, setImage2group] = useState();
    const [image3group, setImage3group] = useState();
    const [image4group, setImage4group] = useState();
    const [city_id, setCityID] = useState();


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
    useEffect(() => {
        const getData = async () => {
        try {
            setLoading(true);
            const response = await getBlogInfo(id);
            const temp = response.data.images;
            const imgs = temp.map((str) => "http://127.0.0.1:8000" + str);
            let data = {
            id: response.data.id,
            title: response.data.title,
            content: response.data.content,
            category: response.data.category,
            main_image: response.data.main_image,
            city: response.data.city,
            city_id: response.data.city_id,
            images: imgs,
            };
            setBlog(data);
            setCity(response.data.city);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
        };
        getData();
    }, [id]);
    const sendData = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        title ? formData.append("title", title) : blog.title;
        content ? formData.append("content", content) : blog.content;
        category ? formData.append("category", category) : blog.category;
        main_image ? formData.append("main_image", main_image) : null;
        (city_id) ? formData.append("city_id", city_id) : blog.city_id;

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
        await editBlog(formData, id);
        setLoading(false);
        navigate("/blogs");
        } catch (error) {
        setLoading(false);
        console.error(error);
        }
    };
    return (
    <>
    {!loading && Object.keys(blog).length > 0 ? (
        <form onSubmit={(event) => sendData(event)} className="form_section">
    <section className="d-flex justify-content-end w-100 gap-5">
        <div className="d-flex flex-column gap-4 flex-fill">
        <div className='image_field multi_blog'>
            <div className='image_input_blog'>
                <MainPhotoInput img={`${blog.images[0] ? blog.images[0] : ""}`} setImg={setImage1group} />
                <MainPhotoInput img={`${blog.images[1] ? blog.images[1] : ""}`} setImg={setImage2group} />
                <MainPhotoInput img={`${blog.images[2] ? blog.images[2] : ""}`} setImg={setImage3group} />
                <MainPhotoInput img={`${blog.images[3] ? blog.images[3] : addImg}`} setImg={setImage4group} />
            </div>
            <label> مجموعة الصور </label>
        </div>
            <div style={{ marginTop: "250px" }}>
            <MainButton text={"نشر المقالة"} onClick={sendData} />
            </div>
        </div>
        <div className="w-50">
            <div style={{ display: "inline-block", marginBottom: "20px" }}>
            <label style={{ marginBottom: "20px" }}>الصورة الرئيسية</label>
            <MainPhotoInput
                img={`http://127.0.0.1:8000${blog.main_image}`}
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
                defaultValue={blog.category}
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
            value={blog.title}
            />
            <MainInput
            label={"المدينة"}
            name={"city"}
            value={blog.city_id}
            setInputValue={setCityID}
            type={"select"}
            options={cities && cities}
            />
            <MainInput
            label={"محتوى المقالة"}
            type={"textarea"}
            setInputValue={setContent}
            name="content"
            value={blog.content}
            />
        </div>
    </section>
        </form>
    ) : (
        <Loading loading={!loading} style={"loading-get-all"} />
    )}
</>
);
};

export default EditBlog;
