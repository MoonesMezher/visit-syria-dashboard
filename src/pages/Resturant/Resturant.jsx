import MainSelect from "../../components/Shared/MainSelect/MainSelect"
import MainTable from "../../components/Shared/MainTable/MainTable";
// import "./Resturant.css"
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Shared/Loading/Loading";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";

const Resturant = () => {
    const [loading , setLoading] = useState(false);

    const options = ['id','اسم المطعم','المحافظة','عروض الاسعار'];
    const headers = ["id", "اسم المطعم", "الموقع", "الوصف", "عرض الأسعار"];
    const [cities , setCities] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [resturants , setResturants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [get ,setGet] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(9); 
    const navigate = useNavigate()


    useEffect (() => {
        axios.get('http://127.0.0.1:8000/api/cities')
        .then ( res => {
            setCities(res?.data?.data);
            // Extracting city names and setting them to state
            const names = res?.data?.data?.map(city => city.name);
            setCityNames(names);
        })
    },[]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                setLoading(false)
                const response = await axios.get(`http://127.0.0.1:8000/api/restaurants/page/`+currentPage);
                setResturants(response?.data?.data?.data);
                console.log(response.data);
                setTotalPages((response?.data?.data?.total / 9) + 1);
            } catch (error) {
                setLoading(false)
                console.error("Failed to fetch resturants:", error);
            }
        };

        fetchData();
    }, [currentPage,get]);
      // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const transformedHotels = resturants?.map(e => ({
        id: e.id, // Explicitly naming the itemId
        data: [
            e.id,
            e.name, 
            e.city_id,
            e.primary_description,
            e.price,
        ]
    }));

    const [keepGoing, setKeepGoing] = useState(false);

    const handleDelete = (itemId) => {
        setKeepGoing(itemId);
    };

    const handleDeleteItemAfterAccept = async () => {
        axios.delete(`http://127.0.0.1:8000/api/resturants/${itemId}`)
            .then(res => {
                console.log(res.data);
                setGet((prev) =>!prev);
            }).catch(error => {
                console.error("Failed to delete resturant:", error);
            });
    }

    const handleEdit = (itemId) => {
        // Implement editing logic here
        // console.log(`Editing item with ID: ${itemId}`);
        setSelectedItem(itemId);
        navigate(`/resturants/edit/${itemId}`)
    };


    return (
        <section className="hotel-management">
            <div className="hotel-btn">
                <div className="filter">
                    <MainSelect title="كامل القطر" options={cityNames}/>
                    <MainSelect title="ترتيب حسب" options={options}/>
                </div>
                <div className="add-search">
                    <MainSearchInput/>
                    <MainButton text={'اضافة مطعم'} goTo="/resturants/add"/>
                </div>
            </div>
            <Loading loading={loading} style={'loading-get-all'}/>
            {!loading && <MainTable data={transformedHotels} headers={headers} totalPages={totalPages} onPageChange={handlePageChange} onDelete={handleDelete} onEdit={handleEdit} currentPage={currentPage} />}
        </section>
    )
}

export default Resturant