import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput"
import axios from "axios"
import MainInput from "../../components/Shared/MainInput/MainInput"
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput"
import MainButton from "../../components/Shared/MainButton/MainButton"
import { toast } from "react-toastify"

const EditAbout = () => {
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

    const [item,setItem]= useState(
        {
    title:"",
    content:"",
    category:"",
    main_image:"",
    images:"",
    })
    useEffect(()=>{
 

      if(!localStorage.getItem('token')){
        navigate("/login")
      }
  },[])
    const params=useParams()
   
    console.log(params.id)
   console.log('http://127.0.0.1:8000'+item.main_image);
    
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/about/" + params.id)
        .then(res=>setItem(res.data.data))
    },[])
    const navigate=useNavigate()

const updateData = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    

  
      
    (title)?formData.append("title", title):item.title,
      (content)?    formData.append("content", content) :item.content,
      (category)?    formData.append("category", category) :item.category
 if(main_image){
         formData.append("main_image", main_image); 
     } 
         if(images){
     for (let i = 0; i < images.length; i++) {
      formData.append(`images[${i}]`, images[i]);
     }
    }

        formData.append('_method', 'put') 




    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/about/"+params.id ,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer ' + localStorage.getItem('token'),

            "_method": "PUT"

          },
        }
      );
      console.log(response.data.data);
      toast.success('تمت التعديل بنجاح')

      navigate("/about");
    } catch (error) {
      console.error(error);
  
     
    }
  };
    return (

      <>
                              <form onSubmit={()=>{updateData(event)}} >

      <section className="d-flex justify-content-end w-100 gap-5 position-relative">
        <div className="d-flex flex-column gap-4 flex-fill">
        <div className="d-flex justify-content-between">
          <MainPhotoInput img={main_image} setImg={setImg} name="main_image" value={item.main_image} />
          <label >الصورة الرئيسية</label>
          </div>
         
          <div className="d-flex justify-content-between">
          <MainPhotoGroupInput imgs={images} setImgs={setImages}/>
         
            <label>مجموعة الصور</label>
          </div>
        </div>
        <div className="w-50">
        <MainInput label={'عنوان المقالة'} type={'text'} setInputValue={setInputTitle} name="title" value={item.title}  />
           <select className=" form-select mb-3 mt-3 pt-2 pb-2" aria-label="Default select example"
            defaultValue={item.category}
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
          <option value="none" >{ item.category}</option>
            {options.map((e, index) => (
              <option key={index} value={e.name} className="p-4"   >
                {e.name}
              </option>
            ))}
          </select>
                        <MainInput label={'محتوى المقالة'} type={'textarea'} name="content" setInputValue={setInputcontent} value={item.content}/>

                      </div>
      </section>
      <div className="mx-auto mt-3" style={{width: 'fit-content'}}>
        <MainButton text={'تعديل المقال'}/>
      </div>
        

                        </form>
              
          
    </>
    )
}

export default EditAbout