import MainInput from "../../components/Shared/MainInput/MainInput";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import MainButton from '../../components/Shared/MainButton/MainButton'
import { useEffect, useState } from "react";
import axios from "axios";
import APIS from "../../constant/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddResturant = () => {
  const [imgs, setImgs] = useState([]);
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();
  const [mainDesc, setMainDesc] = useState();
  const [secondDesc, setSecondDesc] = useState();
  const [city, setCity] = useState();

  const to = useNavigate();

  const handleAddResturant = async () => {
    const form = new FormData();

    form.append('name', name)
    form.append('location', location)
    form.append('table_price', price)
    form.append('primary_description', mainDesc)
    form.append('secondary_description', secondDesc)
    for (let i = 0; i < imgs.length; i++) {
      form.append(`images[${i}]`, imgs[i]);
    }
    form.append('cover_image', img1)
    form.append('logo', img2)
    form.append('menu', img3)
    form.append('city_id', 1)

    const token = localStorage.getItem('token');

    axios.post(APIS.POST.RESTURANT, form, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        console.log(res);
        if(res?.status === 200) {
          toast.success('تمت الإضافة بنجاح')
          to('/resturants');
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

  const [cities, setCities] = useState([]);
  const [citiesname, setCitiesName] = useState([]);

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/cities')
      .then ( res => {
          console.log(res);
          setCities(res?.data?.data);
          // Extracting city names and setting them to state
          const names = res?.data?.data?.map(city => city.name);
          setCitiesName(names);
      })
  },[]);

  return (
    <>
      <section className="d-flex justify-content-end w-100 gap-5">
        <div className="d-flex flex-column gap-4 flex-fill">
          <div className="d-flex justify-content-between">
            <MainPhotoInput img={img1} setImg={setImg1}/>
            <label>الصورة الرئيسية</label>
          </div>
          <div className="d-flex justify-content-between">
            <MainPhotoInput img={img2} setImg={setImg2}/>
            <label className="">الصورة الفرعية</label>
          </div>
          <div className="d-flex justify-content-between">
            <MainPhotoInput img={img3} setImg={setImg3}/>
            <label>صورة المنيو</label>
          </div>
          <div className="d-flex justify-content-between">
            <MainPhotoGroupInput imgs={imgs} setImgs={setImgs}/>
            <label>مجموعة الصور</label>
          </div>
        </div>
        <div className="w-50">
          <MainInput label={'اسم المطعم'} name={'name'} value={name} setInputValue={setName} type={'text'} options={''}/>
          <MainInput label={'موقع المطعم'} name={'location'} value={location} setInputValue={setLocation} type={'text'} options={''}/>
          <MainInput label={'المدينة'} name={'city'} value={city} setInputValue={setCity} type={'select'} options={citiesname && citiesname}/>          
          <MainInput label={'سعر حجز الطاولة'} name={'price'} value={price} setInputValue={setPrice} type={'text'} options={''}/>
          <MainInput label={'الوصف الأولي'} name={'main-desc'} setInputValue={setMainDesc} value={mainDesc} type={'textarea'} options={''}/>
          <MainInput label={'الوصف الثانوي'} name={'second-desc'} value={secondDesc} setInputValue={setSecondDesc} type={'textarea'} options={''}/>
        </div>
      </section>
      <div className="mx-auto mt-3" style={{width: 'fit-content'}} onClick={handleAddResturant}>
        <MainButton text={'إضافة مطعم'}/>
      </div>
    </>
  );
};

export default AddResturant;
