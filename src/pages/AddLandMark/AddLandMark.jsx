import MainButton from '../../components/Shared/MainButton/MainButton'
import MainInput from '../../components/Shared/MainInput/MainInput'
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput"
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput"
import { useState } from "react"

import './AddLandMark.css'
const AddLandMark = () => {
    const [img, setImg] = useState(null);
    const [img1, setImg1] = useState([]);

    return (
        <section className="BY_AddLandMark">
            <form onSubmit={(event) => sendData(event)} className='form_section'>
                <div className='inputes_section'>
                    <div className='right_section'>
                        <MainInput label={'اسم المعلم السياحي'} type={'text'} />
                        <MainInput label={'مدينة المعلم السياحي'} type={'select'} options={[1, 2, 3, 4]} />
                        <MainInput label={'الموقع بالتفصيل'} type={'text'} />
                        <MainInput label={'الوصف الأولي'} type={'textarea'} />
                        <MainInput label={'الوصف الثانوي'} type={'textarea'} />
                    </div>
                    <div className='left_section'>
                        <div className='image_field'>
                            <div>الصورة الخارجية </div>
                            <div className='image_input'>
                                <MainPhotoInput img={img} setImg={setImg} />
                            </div>
                        </div>
                        <div className='image_field'>
                            <label>الصورة الداخلية</label>
                            <div className='image_input'>
                                <MainPhotoInput img={img} setImg={setImg} />
                            </div>
                        </div>
                        <div className='image_field multi'>
                            <label> إضافة صور للموقع </label>
                            <div className='image_input'>
                                <MainPhotoGroupInput imgs={img1} setImgs={setImg1} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buttonSection">
                    <MainButton
                        text="إضافة معلم سياحي"
                        goTo=""
                        type="submit"
                    />

                </div>
            </form>

        </section>
    )
}

export default AddLandMark