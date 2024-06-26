import MainButton from '../../components/Shared/MainButton/MainButton'
import MainInput from '../../components/Shared/MainInput/MainInput'
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput"
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput"
import { useEffect, useState } from 'react';
import './EditLandMark.css'
import { useNavigate, useParams } from 'react-router-dom';
import * as landmarksServices from "../../constant/api/services/landmarkService"
import { mainURL } from '../../constant/api/LandMarksURLs'
import { useFetchCities } from "../../constant/api/FetchData";
import Loading from "../../components/Shared/Loading/Loading";

const EditLandMark = () => {

    const navigate = useNavigate();
    const param = useParams();
    console.log(`this is landmark with id ${param.id}`);

    const { cities, cityNames, isLoadingCities } = useFetchCities();
    const [city_id, setCityID] = useState();

    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [primary_description, setPrimaryDescription] = useState();
    const [secondary_description, setSecondaryDescription] = useState();
    const [internal_image, setInternalImage] = useState();
    const [external_image, setExternalImage] = useState();
    const [city, setCity] = useState({
        id: 4,
        name: ""
    });
    const [images, setImages] = useState([]);



    //get landmark data
    const [landmark, setLandmark] = useState({});

    const getLandmarkData = async () => {
        try {
            const response = await landmarksServices.getLandmarkById(param.id);
            const temp = response.data.images;
            const imgs = temp.map((str) => mainURL + str);
            console.log('cities', cities);
            let data = {
                id: response.data.id,
                name: response.data.name,
                location: response.data.location,
                primary_description: response.data.primary_description,
                secondary_description: response.data.secondary_description,
                internal_image: response.data.internal_image,
                external_image: response.data.external_image,
                city: response.data.city,
                images: imgs
            }
            setLandmark(data);
            
            console.log("landmark", landmark);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getLandmarkData();
    }, []);

    // useEffect(() => {
    //     // console.log("landmark", landmark);
    //     // setCity(cities.find(item => item.name === landmark.city));
    //     // console.log("city", city);

    //     if (landmark.city && cities.length > 0) {
    //         const foundCity = cities.find((item) => item.name === landmark.city);
    //         setCity(foundCity);
    //         setCityID(foundCity.id);
    //       }
    // }, [landmark, cities]);


    // useEffect(() => {
    //     console.log("hhhhhhh city", city);
    //     setCityID(city.id);

    // }, [city]);

    // useEffect(() => {
    //     console.log("hhhhhhh city", city);
    //     console.log(" idddddddddddddddd", city_id);
    // }, [city_id,city])
    



    //edit data




    const sendData = async () => {
        event.preventDefault();


        const formData = new FormData();
        (name) ? formData.append('name', name) : landmark.name;
        (location) ? formData.append('location', location) : landmark.location;
        (primary_description) ? formData.append('primary_description', primary_description) : landmark.primary_description;
        (secondary_description) ? formData.append('secondary_description', secondary_description) : landmark.secondary_description;
        (city_id) ? formData.append("city_id", city) : landmark.city_id;
        (internal_image) ? formData.append('internal_image', internal_image) : null;
        (external_image) ? formData.append('external_image', external_image) : null;
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append("images[]", images[i]);
            }
        }
        formData.append('_method', 'PUT')

        console.log("send data", formData);
        try {
            await landmarksServices.editLandmark(formData, param.id);
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
                            <MainInput label={'اسم المعلم السياحي'} type={'text'} name={'name'} setInputValue={setName} options={''} value={landmark.name} />
                            <MainInput label={'المحافظة'} name={'city'} value={city_id} setInputValue={setCity} type={'select'} options={cities && cities} />
                            <MainInput label={'الموقع بالتفصيل'} type={'text'} name={'location'} setInputValue={setLocation} options={''} value={landmark.location} />
                            <MainInput label={'الوصف الأولي'} type={'textarea'} name={'primary_description'} setInputValue={setPrimaryDescription} options={''} value={landmark.primary_description} />
                            <MainInput label={'الوصف الثانوي'} type={'textarea'} name={'secondary_description'} setInputValue={setSecondaryDescription} options={''} value={landmark.secondary_description} />
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
                // <Loading loading={true} style={'loading-get-all'} />

                <div>Loading...</div>
            )}
        </section>
    )
}

export default EditLandMark