import MainButton from '../../components/Shared/MainButton/MainButton'
import MainInput from '../../components/Shared/MainInput/MainInput'
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput"
import { useEffect, useState } from 'react';
import './EditLandMark.css'
import { useNavigate, useParams } from 'react-router-dom';
import * as landmarksServices from "../../constant/api/services/landmarkService"
import { mainURL } from '../../constant/api/LandMarksURLs'
import { useFetchCities } from "../../constant/api/FetchData";
import Loading from "../../components/Shared/Loading/Loading";
import addImg from '../../assets/images/input/add+.png'

const EditLandMark = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [primary_description, setPrimaryDescription] = useState();
    const [secondary_description, setSecondaryDescription] = useState();
    const [internal_image, setInternalImage] = useState();
    const [external_image, setExternalImage] = useState();
    const [city_id, setCityID] = useState();

    const [image1group, setImage1group] = useState();
    const [image2group, setImage2group] = useState();
    const [image3group, setImage3group] = useState();
    const [image4group, setImage4group] = useState();


    // loading
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    //get all cities
    const { cities, cityNames, isLoadingCities } = useFetchCities();

    //get landmark data
    const [landmark, setLandmark] = useState({});


    useEffect(() => {
        const getLandmarkData = async () => {
            try {
                setLoading(true);
                const response = await landmarksServices.getLandmarkById(id);
                const temp = response.data.images;
                const imgs = temp.map((str) => mainURL + str);
                let data = {
                    id: response.data.id,
                    name: response.data.name,
                    location: response.data.location,
                    primary_description: response.data.primary_description,
                    secondary_description: response.data.secondary_description,
                    internal_image: response.data.internal_image,
                    external_image: response.data.external_image,
                    city: response.data.city,
                    city_id: response.data.city_id,
                    images: imgs
                }
                setLandmark(data);
                console.log("landmark", landmark);
                setLoading(false);

            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        getLandmarkData();
    }, [id]);

    useEffect(() => {
        console.log("isLoading", loading);
    }, [loading, loading1]);


    //edit data
    const sendData = async () => {
        event.preventDefault();

        setLoading1(true);
        const formData = new FormData();
        (name) ? formData.append('name', name) : landmark.name;
        (location) ? formData.append('location', location) : landmark.location;
        (primary_description) ? formData.append('primary_description', primary_description) : landmark.primary_description;
        (secondary_description) ? formData.append('secondary_description', secondary_description) : landmark.secondary_description;
        (city_id) ? formData.append("city_id", city_id) : landmark.city_id;
        (internal_image) ? formData.append('internal_image', internal_image) : null;
        (external_image) ? formData.append('external_image', external_image) : null;
        if (image1group) {
            formData.append('images[]', image1group);
        }
        if (image2group) {
            formData.append('images[]', image2group);
        }
        if (image3group) {
            formData.append('images[]', image3group);
        }
        if (image4group) {
            formData.append('images[]', image4group);
        }

        formData.append('_method', 'PUT')

        console.log("send data", formData);
        try {

            await landmarksServices.editLandmark(formData, id);
            setLoading1(false);
            navigate("/places");
        } catch (error) {
            setLoading1(false);
            console.error('Error Updating the landmark:', error);
        }
    }




    return (
        <section className="BY_EditLandMark">
            <div className="BY_container">
                {!loading && Object.keys(landmark).length > 0 ? (
                    <form onSubmit={(event) => sendData(event)} className='form_section'>
                        <div className='inputes_section'>
                            <div className='right_section'>
                                <MainInput label={'اسم المعلم السياحي'} type={'text'} name={'name'} setInputValue={setName} options={''} value={landmark.name} />
                                <MainInput label={'المحافظة'} name={'city'} value={landmark.city_id} setInputValue={setCityID} type={'select'} options={cities && cities} />
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
                                        <MainPhotoInput img={`${landmark.images[0] ? landmark.images[0] : ""}`} setImg={setImage1group} />
                                        <MainPhotoInput img={`${landmark.images[1] ? landmark.images[1] : ""}`} setImg={setImage2group} />
                                        <MainPhotoInput img={`${landmark.images[2] ? landmark.images[2] : ""}`} setImg={setImage3group} />
                                        <MainPhotoInput img={`${landmark.images[3] ? landmark.images[3] : addImg}`} setImg={setImage4group} />
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
                    </form>)
                    : (

                        < Loading loading={!loading1} style={'loading-get-all'} />
                    )}
            </div>
        </section>
    )
}

export default EditLandMark