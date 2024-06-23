import MainInput from "../../components/Shared/MainInput/MainInput";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import MainButton from '../../components/Shared/MainButton/MainButton'
import { useState } from "react";
import axios from "axios";
// import APIS from "../../constant/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
const [imgs, setImgs] = useState([]);
const [logo, setLogo] = useState();
const [cover, setCover] = useState();
const [name, setName] = useState();
const [location, setLocation] = useState();
const [city, setCity] = useState();
const [price, setPrice] = useState();
const [mainDesc, setMainDesc] = useState();
const [secondDesc, setSecondDesc] = useState();

const to = useNavigate();

const handleAddHotel = async () => {
    const data = new FormData();

    data.append('name', name)
    data.append('city_id', city)
    data.append('location', location)
    data.append('price', price)
    data.append('primary_description', mainDesc)
    data.append('secondary_description', secondDesc)
    data.append('imgs', imgs)
    data.append('cover_img', cover)
    data.append('logo', logo)

    axios.post('http://127.0.0.1:8000/api/hotels', data, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    })
    .then(res => {
        if(res.statusCode === 200) {
        toast.success('تمت الإضافة بنجاح')
        to('/resturants');
        }
    })
    .catch(err =>{
        toast.error(err.message)
    });
}

return (
    <>
    <section className="d-flex justify-content-end w-100 gap-5">
        <div className="d-flex flex-column gap-4 flex-fill">
        <div className="d-flex justify-content-between">
            <MainPhotoInput img={cover} setImg={setCover}/>
            <label>الصورة الرئيسية</label>
        </div>
        <div className="d-flex justify-content-between">
            <MainPhotoInput img={logo} setImg={setLogo}/>
            <label className="">الصورة الفرعية</label>
        </div>
        <div className="d-flex justify-content-between">
            <MainPhotoGroupInput imgs={imgs} setImgs={setImgs}/>
            <label>مجموعة الصور</label>
        </div>
        </div>
        <div className="w-50">
        <MainInput label={'اسم الفندق'} name={'name'} value={name} setInputValue={setName} type={'text'} options={''}/>
        <MainInput label={'موقع الفندق'} name={'location'} value={location} setInputValue={setLocation} type={'text'} options={''}/>
        <MainInput label={'سعر الحجز '} name={'price'} value={price} setInputValue={setPrice} type={'text'} options={''}/>
        <MainInput label={'الوصف الأولي'} name={'main-desc'} setInputValue={setMainDesc} value={mainDesc} type={'textarea'} options={''}/>
        <MainInput label={'الوصف الثانوي'} name={'second-desc'} value={secondDesc} setInputValue={setSecondDesc} type={'textarea'} options={''}/>
        </div>
    </section>
    <div className="mx-auto mt-3" style={{width: 'fit-content'}} onClick={handleAddHotel}>
        <MainButton text={'إضافة فندق'}/>
    </div>
    </>
);
};


export default AddHotel