import MainSelect from "../../components/Shared/MainSelect/MainSelect"
import MainTable from "../../components/Shared/MainTable/MainTable";
import "./Hotel.css"
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, useFetchCities, useFetchHotels } from "../../constant/api/FetchData";

const Hotel = () => {

    const options = ['id','اسم الفندق','المحافظة','عروض الاسعار'];
    const headers = ["id", "اسم الفندق", "الموقع", "الوصف", "عرض الأسعار"];
    const [currentPage, setCurrentPage] = useState(1);
    const [getItem, setGetItem] = useState(true);
    const navigate = useNavigate()

    // Fetch data (cities and hotels)
    const { cities, cityNames, isLoadingCities } = useFetchCities();
    const { hotels, totalPages, isLoadingHotels } = useFetchHotels(currentPage,getItem);
    const isLoading = isLoadingCities || isLoadingHotels;

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
        deleteItem(itemId,setGetItem); // Use the deleteHotel function from the hook
    };

    const handleEdit = (itemId) => {
        navigate(`/hotels/edit/${itemId}`)
    };

    return (
        <section className="hotel-management">
            {isLoading && 
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" style={{ color:"rgb(126, 126, 126)" }} role="status">
                    <span className="sr-only"></span>
                    </div>
                </div>
            }
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
            <MainTable data={transformedHotels} headers={headers} totalPages={totalPages} onPageChange={handlePageChange} onDelete={handleDelete} onEdit={handleEdit} />
        </section>
    )
}

export default Hotel