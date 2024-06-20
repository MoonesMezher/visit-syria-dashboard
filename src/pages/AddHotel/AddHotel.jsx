import { useState } from "react"
import "./AddHotel.css"
import MainInput from "../../components/Shared/MainInput/MainInput"
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput"
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";

const AddHotel = () => {
    const [img,setImg] = useState("");
    const [multiImg,setMultiImg] = useState("");
    return (
        <section className="add-hotel-ay">
            <div className="row">
                <div className="col add-img-ay">
                    <div className="main-photo-ay">
                        <label htmlFor="">الصورة الخارجية</label><MainPhotoInput img={img} setImg={setImg}/>
                    </div>
                    <div className="main-photo-ay">
                        <label htmlFor="">الصورة الداخلية</label><MainPhotoInput img={img} setImg={setImg}/>
                    </div>
                    <label htmlFor=""> اضافة صور للموقع</label>
                    <MainPhotoGroupInput imgs={multiImg} setImgs={setMultiImg}/>
                </div>
                <div className="col">
                    <MainInput label={'اسم الفندق'} type={'text'}/>
                    <div className="row location-row-ay">
                        <div className="col">
                            <MainInput label={'المحافظة'} type={'select'} options={[1, 2, 3, 4]}/>
                        </div> 
                        <div className="col">
                            <MainInput label={'موقع الفندق'} type={'text'}/>
                        </div>
                    </div>
                    <MainInput label={'عروض الاسعار'} type={'text'}/>
                    <MainInput label={'الوصف الاولي'} type={'textarea'}/>
                    <MainInput label={'الوصف الثانوي'} type={'textarea'}/>
                </div>
            </div>
        </section>
    )
}

export default AddHotel