import MainInput from "../../components/Shared/MainInput/MainInput";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
import MainButton from '../../components/Shared/MainButton/MainButton'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from '../../components/Shared/Loading/Loading'
import { editRestaurant, getRestaurantInfo } from "../../constant/api/services/resataurantService";
import { useFetchCities } from "../../constant/api/FetchData";
import addImg from '../../assets/images/input/add+.png'


const EditResturant = () => {
  const navigate = useNavigate();
  const [cover_image, setCoverImage] = useState();
  const [logo, setLogo] = useState();
  const [menu, setMenu] = useState();
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [table_price, setTablePrice] = useState();
  const [primary_description, setPrimaryDescription] = useState();
  const [secondary_description, setSecondaryDescription] = useState();
  const [city, setCity] = useState();
  const [city_id, setCityID] = useState();
  const [image1group, setImage1group] = useState();
  const [image2group, setImage2group] = useState();
  const [image3group, setImage3group] = useState();
  const [image4group, setImage4group] = useState();
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(false);
  // const [loading1, setLoading1] = useState(false);
  const { id } = useParams();
  // const to = useNavigate();

  //fetch cities and cities name
  const { cities, cityNames, isLoadingCities } = useFetchCities();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getRestaurantInfo(id);
        const temp = response.data.images;
        const imgs = temp.map((str) => "http://127.0.0.1:8000" + str);
        let data = {
          id: response.data.id,
          name: response.data.name,
          location:response.data.location,
          table_price: response.data.table_price,
          primary_description: response.data.primary_description,
          secondary_description: response.data.secondary_description,
          cover_image: response.data.cover_image,
          images: imgs,
          logo: response.data.logo,
          menu: response.data.menu,
          city: response.data.city,
          city_id: response.data.city_id,
        }
        setRestaurant(data);
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
    (name) ? formData.append('name', name) : restaurant.name;
    (location) ? formData.append('location', location) : restaurant.location;
    (primary_description) ? formData.append('primary_description', primary_description) : restaurant.primary_description;
    (secondary_description) ? formData.append('secondary_description', secondary_description) : restaurant.secondary_description;
    (city_id) ? formData.append("city_id", city_id) : restaurant.city_id;
    (table_price) ? formData.append("table_price", table_price) : restaurant.price;
    (cover_image) ? formData.append('cover_image', cover_image) : null;
    (logo) ? formData.append('logo', logo) : null;
    (menu) ? formData.append('menu', menu) : null;
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

        await editRestaurant(formData, id);
        setLoading(false);
        navigate("/resturants");
    } catch (error) {
        setLoading(false);
        console.error('Error Updating the hotel:', error);
    }
}

  return (
    <>
      <section className="BY_EditLandMark">
          <div className="BY_container">
              {!loading && Object.keys(restaurant).length > 0 ? (
                  <form onSubmit={(event) => sendData(event)} className='form_section'>
                      <div className='inputes_section'>
                          <div className='right_section'>
                          <MainInput label={'اسم المطعم'} name={'name'} value={restaurant.name} setInputValue={setName} type={'text'} options={''}/>
                          <MainInput label={'موقع المطعم'} name={'location'} value={restaurant.location} setInputValue={setLocation} type={'text'} options={''}/>
                          <MainInput label={'المدينة'} name={'city'} value={restaurant.city_id} setInputValue={setCityID} type={'select'} options={cities && cities}/>          
                          <MainInput label={'سعر حجز الطاولة'} name={'table_price'} value={restaurant.table_price} setInputValue={setTablePrice} type={'text'} options={''}/>
                          <MainInput label={'الوصف الأولي'} name={'primary_description'} setInputValue={setPrimaryDescription} value={restaurant.primary_description} type={'textarea'} options={''}/>
                          <MainInput label={'الوصف الثانوي'} name={'secondary_description'} value={restaurant.secondary_description} setInputValue={setSecondaryDescription} type={'textarea'} options={''}/>
                          </div>
                          <div className='left_section'>
                              <div className='image_field'>
                                  <div>الصورة الرئيسية </div>
                                  <div className='image_input'>
                                      <MainPhotoInput img={`http://127.0.0.1:8000${restaurant.cover_image}`} setImg={setCoverImage} />
                                  </div>
                              </div>
                              <div className='image_field'>
                                  <label>الصورة الفرعية</label>
                                  <div className='image_input'>
                                      <MainPhotoInput img={`http://127.0.0.1:8000${restaurant.logo}`} setImg={setLogo} />
                                  </div>
                              </div>
                              <div className='image_field'>
                                  <label> صورة المنيو</label>
                                  <div className='image_input'>
                                      <MainPhotoInput img={`http://127.0.0.1:8000${restaurant.logo}`} setImg={setLogo} />
                                  </div>
                              </div>
                              <div className='image_field multi'>
                                  <label> مجموعة الصور </label>
                                  <div className='image_input'>
                                  <MainPhotoInput img={`${restaurant.images[0] ? restaurant.images[0] : ""}`} setImg={setImage1group} />
                                  <MainPhotoInput img={`${restaurant.images[1] ? restaurant.images[1] : ""}`} setImg={setImage2group} />
                                  <MainPhotoInput img={`${restaurant.images[2] ? restaurant.images[2] : ""}`} setImg={setImage3group} />
                                  <MainPhotoInput img={`${restaurant.images[3] ? restaurant.images[3] : addImg}`} setImg={setImage4group} />
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
    </>
  );
};

export default EditResturant;
