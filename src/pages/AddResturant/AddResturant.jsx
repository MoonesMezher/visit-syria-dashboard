import MainInput from "../../components/Shared/MainInput/MainInput";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import MainButton from '../../components/Shared/MainButton/MainButton'
import { useState } from "react";

const AddResturant = () => {
  const [imgs, setImgs] = useState([]);

  return (
    <>
      <section className="d-flex justify-content-end w-100 gap-5">
        <div className="d-flex flex-column gap-4 flex-fill">
          <div className="d-flex justify-content-between">
            <MainPhotoInput img={''} setImg={''}/>
            <label>الصورة الرئيسية</label>
          </div>
          <div className="d-flex justify-content-between">
            <MainPhotoInput img={''} setImg={''}/>
            <label>الصورة الفرعية</label>
          </div>
          <div className="d-flex justify-content-between">
            <MainPhotoInput img={''} setImg={''}/>
            <label>صورة المنيو</label>
          </div>
          <div className="d-flex justify-content-between">
            <MainPhotoGroupInput img={imgs} setImg={setImgs}/>
            <label>مجموعة الصور</label>
          </div>
        </div>
        <div className="w-50">
          <MainInput label={'اسم المطعم'} name={'name'} value={''} setInputValue={''} type={'text'} options={''}/>
          <MainInput label={'موقع المطعم'} name={'location'} value={''} setInputValue={''} type={'text'} options={''}/>
          <MainInput label={'سعر حجز الطاولة'} name={'price'} value={''} setInputValue={''} type={'text'} options={''}/>
          <MainInput label={'الوصف الأولي'} name={'main-desc'} setInputValue={''} type={'textarea'} options={''}/>
          <MainInput label={'الوصف الثانوي'} name={'second-desc'} value={''} setInputValue={''} type={'textarea'} options={''}/>
        </div>
      </section>
      <div className="mx-auto mt-3" style={{width: 'fit-content'}}>
        <MainButton text={'إضافة مطعم'}/>
      </div>
    </>
  );
};

export default AddResturant;
