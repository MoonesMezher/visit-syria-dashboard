import { useEffect, useState } from "react";
import MainInput from "../../components/Shared/MainInput/MainInput"
import "./AddAbout.css"
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainButton from "../../components/Shared/MainButton/MainButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const AddAbout = () => {
    const options=[
      {
      id:1,
      name:"الحضارات"
    },
    {
      id:2,
      name:"التاريخ"
    },
    {
      id:3,
      name:"الآثار"
    },
    {
      id:4,
      name:"الطبيعة"
    },
    {
      id:4,
      name:"السياحة"
    },
  
  
  ]
const [title,setInputTitle]=useState('')
const [category,setInputcategory]=useState('')
const [content,setInputcontent]=useState('')
const [main_image,setImg]=useState(null)
const [images,setImages]=useState([])
const [loading , setLoading] = useState(false);

const navigate=useNavigate()
useEffect(()=>{
 

    if(!localStorage.getItem('token')){
      navigate("/login")
    }
},[])
const SendData = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("main_image", main_image);
    // formData.append("images", images);

    // if(main_image){
    //     formData.append("main_image", main_image); 

    // }
    if(images){
      for (let i = 0; i < images.length; i++) {
        formData.append(`images[${i}]`, images[i]);
      }
    }
    setLoading(true)

    try {
      setLoading(true)
      const response = await axios.post(
        "http://127.0.0.1:8000/api/about",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        }
      );
      console.log(response.data.data);
      toast.success('تمت الإضافة بنجاح')
      navigate("/about");
    } catch (error) {
      console.error(error);
      
  
     
    }
  };
    return (
      
<>
           <form onSubmit={()=>SendData(event)}  enctype="multipart/form-data">

<section className="d-flex justify-content-end w-100 gap-5">

        <div className="d-flex flex-column gap-4 flex-fill">
        <div className="d-flex justify-content-between">

        <MainPhotoInput img={main_image} setImg={setImg} name="main_image" />
            <label>الصورة الرئيسية</label>
        </div>
        
        <div className="d-flex justify-content-between">
        <MainPhotoGroupInput imgs={images} setImgs={setImages} name="images[]"/>
        <label>مجموعة الصور</label>
        </div>
        </div>
        <div className="w-50">
        <MainInput label={'عنوان المقالة'} type={'text'} setInputValue={setInputTitle} name="title"/>
        <select className=" form-select mb-3 mt-3 pt-2 pb-2" aria-label="Default select example"
            
            name='category'
            // value={value}
            onChange={(e)=>setInputcategory(e.target.value)}
            style={{
              outline: '0px solid red',
              marginTop: '10px',
              background: 'transparent',
              borderColor: 'rgba(159, 154, 154, 1)',
              cursor: 'pointer',
              padding: '10 10px',
              borderRadius: '5px'
              
            }}
          >
          <option value="none" > تصنيف المقال</option>
            {options.map((e, index) => (
              <option key={index} value={e.name} className="p-4"   >
                {e.name}
              </option>
            ))}
          </select>

        
                        <MainInput label={'محتوى المقالة'} type={'textarea'} name="content" setInputValue={setInputcontent}/>
    </div>
    </section>
    <div className="mx-auto mt-3" style={{width: 'fit-content'}} >
        <MainButton text={'إضافة مقال'}/>
    </div>
            </form>

    
          
</>
           
      
    )
}

export default AddAbout