import MainButton from '../../components/Shared/MainButton/MainButton'
import MainInput from '../../components/Shared/MainInput/MainInput'
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput"
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput"
import { useState } from "react"
import * as landmarksServices from "../../constant/api/services/landmarkService"
import { useNavigate } from 'react-router-dom';

import './AddLandMark.css'
const AddLandMark = () => {
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [primary_description, setPrimaryDescription] = useState();
    const [secondary_description, setSecondaryDescription] = useState();
    const [internal_image, setInternalImage] = useState({});
    const [external_image, setExternalImage] = useState({});
    const [city, setCity] = useState(2);
    const [images, setImages] = useState([]);


    const sendData = (event) => {
        event.preventDefault();
        let data = {
            name: name,
            location: location,
            primary_description: primary_description,
            secondary_description: secondary_description,
            internal_image: internal_image,
            external_image: external_image,
            city_id: "2",
            images: images
        }
        console.log(data);
        try {
            landmarksServices.addNewLandmark(data);
            navigate("/places");
        } catch (error) {
            console.error('Error creating new landmark:', error);
        }
    }

    return (
        <section className="BY_AddLandMark">
            <form onSubmit={(event) => sendData(event)} className='form_section'>
                <div className='inputes_section'>
                    <div className='right_section'>
                        <MainInput label={'اسم المعلم السياحي'} name={'name'} value={name} setInputValue={setName} type={'text'} options={''} />
                        <MainInput label={'مدينة المعلم السياحي'} type={'select'} options={[1, 2, 3, 4]} />
                        <MainInput label={'الموقع بالتفصيل'} type={'text'} name={'location'} value={location} setInputValue={setLocation} options={''} />
                        <MainInput label={'الوصف الأولي'} type={'textarea'} name={'primary_description'} value={primary_description} setInputValue={setPrimaryDescription} options={''} />
                        <MainInput label={'الوصف الثانوي'} type={'textarea'} name={'secondary_description'} value={secondary_description} setInputValue={setSecondaryDescription} options={''} />
                    </div>
                    <div className='left_section'>
                        <div className='image_field'>
                            <div>الصورة الخارجية </div>
                            <div className='image_input'>
                                <MainPhotoInput img={external_image} setImg={setExternalImage} />
                            </div>
                        </div>
                        <div className='image_field'>
                            <label>الصورة الداخلية</label>
                            <div className='image_input'>
                                <MainPhotoInput img={internal_image} setImg={setInternalImage} />
                            </div>
                        </div>
                        <div className='image_field multi'>
                            <label> إضافة صور للموقع </label>
                            <div className='image_input'>
                                <MainPhotoGroupInput imgs={images} setImgs={setImages} />
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