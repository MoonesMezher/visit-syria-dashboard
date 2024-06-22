import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput"
import axios from "axios"
import MainInput from "../../components/Shared/MainInput/MainInput"
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput"
import { ImEyeMinus } from "react-icons/im"
import { log10 } from "chart.js/helpers"
import MainButton from "../../components/Shared/MainButton/MainButton"

const EditAbout = () => {
    const options = ['الحضارات','التاريخ','الآثار','الطبيعة','السياحة'];

    const [title,setInputTitle]=useState('')
    const [category,setInputcategory]=useState('')
    const [content,setInputcontent]=useState('')
    const [main_image,setImg]=useState(null)
    const [images,setImages]=useState(null)

    const [item,setItem]= useState(
        {
    title:"",
    content:"",
    category:"",
    main_image:"",
    images:"",
    })
    console.log('item.images:', item.images);
    const params=useParams()
   
    console.log(params.id)
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
            "_method": "PUT"

          },
        }
      );
      console.log(response.data.data);

      navigate("/about");
    } catch (error) {
      console.error(error);
  
     
    }
  };
    return (

        <section>
            <div className="container">
                    <div className="row">
                        <form onSubmit={()=>{updateData(event)}} >
                        <div className="col-6">
                           
                        <MainPhotoInput img={main_image} setImg={setImg} name="main_image" defaultValue={'http://127.0.0.1:8000'+item.main_image} />
                        <MainPhotoGroupInput 
                        imgs={images} setImgs={setImages} name="images[]" 
                         defaultValue={item.images}
 />






                   </div>
                   <div className="col-6">
                   <MainInput label={'عنوان المقالة'} type={'text'} setInputValue={setInputTitle} name="title" defaultValue={item.title}  />
                        <MainInput selected={item.category} type={'select'} options={options} name="category" setInputValue={setInputcategory} defaultValue={item.category} />

                        <MainInput label={'محتوى المقالة'} type={'textarea'} name="content" setInputValue={setInputcontent} defaultValue={item.content}/>

                        
                   </div>
                   <MainButton text={'edit'}/>

                        </form>
              
            </div>
            </div>
        
        </section>
    )
}

export default EditAbout