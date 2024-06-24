import MainSelect from "../../components/Shared/MainSelect/MainSelect"
import MainTable from "../../components/Shared/MainTable/MainTable";
import "./Hotel.css"
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";

const Hotel = () => {

    const options = ['id','اسم الفندق','المحافظة','عروض الاسعار'];
    const headers = ["id", "اسم الفندق", "الموقع", "الوصف", "عرض الأسعار"];
    const [cities , setCities] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [hotels , setHotels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [get ,setGet] = useState(true);
    // const [itemsPerPage, setItemsPerPage] = useState(9); 
    const navigate = useNavigate()


    useEffect (() => {
        axios.get('http://127.0.0.1:8000/api/cities')
        .then ( res => {
            setCities(res.data.data);
            // Extracting city names and setting them to state
            const names = res.data.data.map(city => city.name);
            setCityNames(names);
        })
    },[]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/hotels?page=${currentPage}`);
                setHotels(response.data.data);
                setTotalPages(response.data.pagination.total_pages);
            } catch (error) {
                console.error("Failed to fetch hotels:", error);
            }
        };

        fetchData();
    }, [currentPage,get]);
      // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const transformedHotels = hotels.map(hotel => ({
        id: hotel.id, // Explicitly naming the itemId
        data: [
            hotel.id,
            hotel.name, 
            hotel.city_id,
            hotel.primary_description,
            hotel.price,
        ]
    }));

    
    const handleDelete = (itemId) => {
        axios.delete(`http://127.0.0.1:8000/api/hotels/${itemId}`, null)
        .then(res => {
            console.log(res.data);
            setGet((prev) =>!prev);
        }).catch(error => {
            console.error("Failed to delete hotel:", error);
        });
    };

    const handleEdit = (itemId) => {
        // Implement editing logic here
        // console.log(`Editing item with ID: ${itemId}`);
        setSelectedItem(itemId);
        navigate(`/hotels/edit/${itemId}`)
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
                    <MainButton text={'اضافة فندق'} goTo="/hotels/add"/>
                </div>
            </div>
            <MainTable data={transformedHotels} headers={headers} totalPages={totalPages} onPageChange={handlePageChange} onDelete={handleDelete} onEdit={handleEdit} currentPage={currentPage}/>
        </section>
    )
}

export default Hotel