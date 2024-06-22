import MainButton from '../../components/Shared/MainButton/MainButton'
import MainInput from '../../components/Shared/MainInput/MainInput'
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput"
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput"
import { useEffect, useState } from 'react';
import './EditLandMark.css'
import { useNavigate, useParams } from 'react-router-dom';
import * as landmarksServices from "../../constant/api/services/landmarkService"
import { mainURL } from '../../constant/api/LandMarksURLs'

const EditLandMark = () => {

    const navigate = useNavigate();
    const param = useParams();
    console.log(`this is landmark with id ${param.id}`);


    //get landmark data
    const [landmark, setLandmark] = useState({});



    const getLandmarkData = async () => {
        try {
            const response = await landmarksServices.getLandmarkById(param.id);
            console.log("response", response);
            const temp= response.data.images;
            const imgs=temp.map((str) => mainURL + str);
            console.log("temp", temp);
            console.log("response.data.images", response.data.images);

            let data = {
                id: response.data.id,
                name: response.data.name,
                location: response.data.location,
                primary_description: response.data.primary_description,
                secondary_description: response.data.secondary_description,
                internal_image: response.data.internal_image,
                external_image: response.data.external_image,
                city_id: response.data.city,
                images: imgs
            }
            setLandmark(data);
            // console.log("landmark", landmark);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getLandmarkData();
    }, []);

    useEffect(() => {
        console.log("landmark", landmark);
    }, [landmark]);



    //edit data

    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [primary_description, setPrimaryDescription] = useState();
    const [secondary_description, setSecondaryDescription] = useState();
    const [internal_image, setInternalImage] = useState({});
    const [external_image, setExternalImage] = useState({});
    const [city, setCity] = useState(2);
    const [images, setImages] = useState([]);


    const sendData = async () => {
        event.preventDefault();

        let data = {
            name: name,
            location: location,
            primary_description: primary_description,
            secondary_description: secondary_description,
            internal_image: internal_image,
            external_image: external_image,
            city_id: "2",
            images: images,
            _method:"PUT"
        }

    
        console.log("send data",data);
        try {
            await landmarksServices.editLandmark(data, param.id);
            navigate("/places");
        } catch (error) {
            console.error('Error Updating the landmark:', error);
        }
    }


    return (
        <section className="BY_EditLandMark">
            {Object.keys(landmark).length > 0 ? ( 
                <form onSubmit={(event) => sendData(event)} className='form_section'>
                    <div className='inputes_section'>
                        <div className='right_section'>
                            <MainInput label={'اسم المعلم السياحي'} type={'text'} name={'name'} setInputValue={setName} options={''} defaultValue={landmark.name} />
                            <MainInput label={'مدينة المعلم السياحي'} type={'select'} options={[1, 2, 3, 4]} />
                            <MainInput label={'الموقع بالتفصيل'} type={'text'} name={'location'} setInputValue={setLocation} options={''} defaultValue={landmark.location} />
                            <MainInput label={'الوصف الأولي'} type={'textarea'} name={'primary_description'} setInputValue={setPrimaryDescription} options={''} defaultValue={landmark.primary_description} />
                            <MainInput label={'الوصف الثانوي'} type={'textarea'} name={'secondary_description'} setInputValue={setSecondaryDescription} options={''} defaultValue={landmark.secondary_description} />
                        </div>
                        <div className='left_section'>
                            <div className='image_field'>
                                <div>الصورة الخارجية </div>
                                <div className='image_input'>
                                    <MainPhotoInput img={`${mainURL}${landmark.external_image}`} setImg={setExternalImage} />
                                </div>
                            </div>
                            <div className='image_field'>
                                <label>الصورة الداخلية</label>
                                <div className='image_input'>
                                    <MainPhotoInput img={`${mainURL}${landmark.internal_image}`} setImg={setInternalImage} />
                                </div>
                            </div>
                            <div className='image_field multi'>
                                <label> إضافة صور للموقع </label>
                                <div className='image_input'>
                                    <MainPhotoGroupInput imgs={landmark.images} setImgs={setImages} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="buttonSection">
                        <MainButton
                            text="تعديل معلم سياحي"
                            goTo=""
                            type="submit"
                        />

                    </div>
                </form>
            ) : (
                <div>Loading...</div>
            )}
        </section>
    )
}

export default EditLandMark