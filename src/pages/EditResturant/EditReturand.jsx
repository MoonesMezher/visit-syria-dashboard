import MainInput from "../../components/Shared/MainInput/MainInput";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import MainButton from '../../components/Shared/MainButton/MainButton'
import { useEffect, useState } from "react";
import axios from "axios";
import APIS from "../../constant/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Shared/Loading/Loading";

const EditResturant = () => {
  const [imgs, setImgs] = useState([]);
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();
  const [mainDesc, setMainDesc] = useState();
  const [secondDesc, setSecondDesc] = useState();

  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const to = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(APIS.GET.RESTURANT+id)
      .then(res => {
        if(res?.statusCode === 200) {
          setName(res.data?.resturant?.name);
          setLocation(res.data?.resturant?.location);
          setImg1(res.data?.resturant?.cover_image);
          setImg2(res.data?.resturant?.logo);
          setImg3(res.data?.resturant?.menu);
          setImgs(res.data?.resturant?.images);
          setMainDesc(res.data?.resturant?.main_description);
          setPrice(res.data?.resturant?.price);
          setSecondDesc(res.data?.resturant?.second_description);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        to('/err')
      })
  }, []);

  const handleAddResturant = async () => {
    if(loading) {
      return;
    }

    setLoading(true);
    const data = new FormData();

    data.append('name', name)
    data.append('location', location)
    data.append('price', price)
    data.append('main_description', mainDesc)
    data.append('second_description', secondDesc)
    data.append('imgs', imgs)
    data.append('cover_img', img1)
    data.append('logo', img2)
    data.append('menu', img3)

    axios.put(APIS.PUT.RESTURANT, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        if(res.statusCode === 200) {
          setLoading(false);
          toast.success('تمت التعديل بنجاح')
          to('/resturants');
        }
      })
      .catch(err =>{
        setLoading(false);
        toast.error(err.message)
      });
  }

  return (
    <> {!location ?
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
          <MainInput label={'سعر حجز الطاولة'} name={'price'} value={price} setInputValue={setPrice} type={'text'} options={''}/>
          <MainInput label={'الوصف الأولي'} name={'main-desc'} setInputValue={setMainDesc} value={mainDesc} type={'textarea'} options={''}/>
          <MainInput label={'الوصف الثانوي'} name={'second-desc'} value={secondDesc} setInputValue={setSecondDesc} type={'textarea'} options={''}/>
        </div>
      </section>: <Loading loading={loading}/>}
      <div className="mx-auto mt-3" style={{width: 'fit-content'}} onClick={handleAddResturant}>
        <MainButton text={'إضافة مطعم'}/>
      </div>
    </>
  );
};

export default EditResturant;
