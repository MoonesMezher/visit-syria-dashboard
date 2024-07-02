import { useEffect, useState } from "react";
import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
import MainInput from "../../components/Shared/MainInput/MainInput";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import { editHotel, getHotelInfo, useFetchCities } from "../../constant/api/FetchData";
import MainButton from "../../components/Shared/MainButton/MainButton";
import { useNavigate, useParams } from "react-router-dom";
import addImg from '../../assets/images/input/add+.png'
import Loading from "../../components/Shared/Loading/Loading";


const EditHotel = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [logo, setLogo] = useState();
    const [cover_image, setCoverImage] = useState();
    const [name, setName] = useState();
    const [location, setLocation] = useState();
    const [city, setCity] = useState();
    const [price, setPrice] = useState();
    const [primary_description, setPrimaryDescription] = useState();
    const [secondary_description, setSecondaryDescription] = useState();
    const [city_id, setCityID] = useState();
    const [image1group, setImage1group] = useState();
    const [image2group, setImage2group] = useState();
    const [image3group, setImage3group] = useState();
    const [image4group, setImage4group] = useState();

    const { cities, cityNames, isLoadingCities } = useFetchCities();

    const [hotel, setHotel] = useState({});

    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await getHotelInfo(id);
                const temp = response.data.images;
                const imgs = temp.map((str) => "http://127.0.0.1:8000" + str);
                let data = {
                    id: response.data.id,
                    name: response.data.name,
                    location: response.data.location,
                    price: response.data.price,
                    primary_description: response.data.primary_description,
                    secondary_description: response.data.secondary_description,
                    cover_image: response.data.cover_image,
                    logo: response.data.logo,
                    city: response.data.city,
                    city_id: response.data.city_id,
                    images: imgs
                }
                setHotel(data);
                setCity(response.data.city)
                setLoading(false);

            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        getData();
    }, [id]);

    
     //edit data
     const sendData = async () => {
        event.preventDefault();

        setLoading(true);
        const formData = new FormData();
        (name) ? formData.append('name', name) : hotel.name;
        (location) ? formData.append('location', location) : hotel.location;
        (primary_description) ? formData.append('primary_description', primary_description) : hotel.primary_description;
        (secondary_description) ? formData.append('secondary_description', secondary_description) : hotel.secondary_description;
        (city_id) ? formData.append("city_id", city_id) : hotel.city_id;
        (price) ? formData.append("price", price) : hotel.price;
        (cover_image) ? formData.append('cover_image', cover_image) : null;
        (logo) ? formData.append('logo', logo) : null;
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

            await editHotel(formData, id);
            setLoading(false);
            navigate("/hotels");
        } catch (error) {
            setLoading(false);
            console.error('Error Updating the hotel:', error);
        }
    }

    return (
        <section className="BY_EditLandMark">
            <div className="BY_container">
                {!loading && Object.keys(hotel).length > 0 ? (
                    <form onSubmit={(event) => sendData(event)} className='form_section'>
                        <div className='inputes_section'>
                            <div className='right_section'>
                                <MainInput label={'اسم الفندق'} name={'name'} value={hotel.name} setInputValue={setName} type={'text'} options={''}/>
                                <MainInput label={'المدينة'} name={'city'} value={hotel.city_id} setInputValue={setCityID} type={'select'} options={cities && cities}/>          
                                <MainInput label={'موقع الفندق'} name={'location'} value={hotel.location} setInputValue={setLocation} type={'text'} options={''}/>
                                <MainInput label={'سعر الحجز '} name={'price'} value={hotel.price} setInputValue={setPrice} type={'text'} options={''}/>
                                <MainInput label={'الوصف الأولي'} name={'primary_description'} setInputValue={setPrimaryDescription} value={hotel.primary_description} type={'textarea'} options={''}/>
                                <MainInput label={'الوصف الثانوي'} name={'secondary_description'} value={hotel.secondary_description} setInputValue={setSecondaryDescription} type={'textarea'} options={''}/>
                            </div>
                            <div className='left_section'>
                                <div className='image_field'>
                                    <div>الصورة الرئيسية </div>
                                    <div className='image_input'>
                                        <MainPhotoInput img={`http://127.0.0.1:8000${hotel.cover_image}`} setImg={setCoverImage} />
                                    </div>
                                </div>
                                <div className='image_field'>
                                    <label>الصورة الفرعية</label>
                                    <div className='image_input'>
                                        <MainPhotoInput img={`http://127.0.0.1:8000${hotel.logo}`} setImg={setLogo} />
                                    </div>
                                </div>
                                <div className='image_field multi'>
                                    <label> مجموعة الصور </label>
                                    <div className='image_input'>
                                        <MainPhotoInput img={`${hotel.images[0] ? hotel.images[0] : ""}`} setImg={setImage1group} />
                                        <MainPhotoInput img={`${hotel.images[1] ? hotel.images[1] : ""}`} setImg={setImage2group} />
                                        <MainPhotoInput img={`${hotel.images[2] ? hotel.images[2] : ""}`} setImg={setImage3group} />
                                        <MainPhotoInput img={`${hotel.images[3] ? hotel.images[3] : addImg}`} setImg={setImage4group} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="buttonSection">
                            <MainButton type="submit" text={'تعديل  فندق'}/>
                        </div>
                    </form>)
                    : (

                        < Loading loading={!loading} style={'loading-get-all'} />
                    )}
            </div>
        </section>
    )
}

export default EditHotel