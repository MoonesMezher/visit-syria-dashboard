import { useState } from "react";
import MainInput from "../../components/Shared/MainInput/MainInput"
import "./AddAbout.css"
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainButton from "../../components/Shared/MainButton/MainButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddAbout = () => {
    const options = ['الحضارات','التاريخ','الآثار','الطبيعة','السياحة'];
const [title,setInputTitle]=useState('')
const [category,setInputcategory]=useState('')
const [content,setInputcontent]=useState('')
const [main_image,setImg]=useState(null)
const [images,setImages]=useState(null)
const navigate=useNavigate()

const SendData = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    if(main_image){
        formData.append("main_image", main_image); 

    }
    if(images){
      for (let i = 0; i < images.length; i++) {
        formData.append(`images[${i}]`, images[i]);
      }
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/about",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.data);

      navigate("/about");
    } catch (error) {
      console.error(error);
  
     
    }
    console.log(main_image);
  };
    return (
      
        <section>
        <div className="add-about">
            <form onSubmit={()=>SendData(event)}  enctype="multipart/form-data">
                <div className="container">
                    <div className="row ">
                        <div className="col-4 mt-4">
        <MainPhotoInput img={main_image} setImg={setImg} name="main_image" />
        {/* upload multiImage and send name prop */}
   <div className="col-4 b" >
   <MainPhotoGroupInput imgs={images} setImgs={setImages} name="images[]"/>

   </div>
   {/* <input
                type="file"
                name="images[]"
                id="inputImg"
                onChange={(e)=>{setImages(e.target.files)}}
                multiple
              /> */}


                        </div>
                        <div className="col-8">
                        <MainInput label={'عنوان المقالة'} type={'text'} setInputValue={setInputTitle} name="title"/>
                        <MainInput selected={'تصنيف المقال'} type={'select'} options={options} name="category" setInputValue={setInputcategory}  />

                        <MainInput label={'محتوى المقالة'} type={'textarea'} name="content" setInputValue={setInputcontent}/>

                        
                        
                    </div>
                  
                   
</div>

</div>
<MainButton text={'Add'}/>



</form>
        </div>
    </section>
    )
}

export default AddAbout