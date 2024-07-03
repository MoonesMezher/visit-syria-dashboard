import MainInput from "../../components/Shared/MainInput/MainInput";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import MainButton from '../../components/Shared/MainButton/MainButton'
import { useState } from "react";
import axios from "axios";
// import APIS from "../../constant/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFetchCities } from "../../constant/api/FetchData";

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

const { cities } = useFetchCities();


const handleAddHotel = async () => {
    const token = localStorage.getItem('token');

    const data = {
    name : name,
    location :location,
    price: price,
    primary_description: mainDesc,
    secondary_description:secondDesc,
    cover_image: cover,
    images: imgs,
    logo: logo,
    city_id: city,
    }

    axios.post('http://127.0.0.1:8000/api/hotels', data, {
    headers: {
        Authorization: 'Bearer ' + token,
        "Content-Type": 'multipart/form-data'
    }
    })
    .then(res => {
        console.log(res);
        if(res?.status === 200) {
        toast.success('تمت الإضافة بنجاح')
        to('/hotels');
        }
    })
    .catch(err =>{
        console.log(err);
        if(err?.response?.data?.data) {
        toast.error(err?.response?.data?.data[0])          
        } else {
        toast.error(err.message)
        }
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
        <MainInput label={'المدينة'} name={'city'} value={city} setInputValue={setCity} type={'select'} options={cities && cities}/>          
        <MainInput label={'موقع الفندق'} name={'location'} value={location} setInputValue={setLocation} type={'text'} options={''}/>
        <MainInput label={'سعر الحجز '} name={'price'} value={price} setInputValue={setPrice} type={'text'} options={''}/>
        <MainInput label={'الوصف الأولي'} name={'primary_description'} setInputValue={setMainDesc} value={mainDesc} type={'textarea'} options={''}/>
        <MainInput label={'الوصف الثانوي'} name={'secondary_description'} value={secondDesc} setInputValue={setSecondDesc} type={'textarea'} options={''}/>
        </div>
    </section>
    <div className="mx-auto mt-3" style={{width: 'fit-content'}} onClick={handleAddHotel}>
        <MainButton text={'إضافة فندق'}/>
    </div>
    </>
);
};


export default AddHotel