import MainSelect from "../../components/Shared/MainSelect/MainSelect"
import MainTable from "../../components/Shared/MainTable/MainTable";
import "./Hotel.css"
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, useFetchCities, useFetchHotels } from "../../constant/api/FetchData";

const Hotel = () => {

    const options = [
        { label: 'الاسم', value: 'name' },
        { label: 'المدينة', value: 'city_name' },
        { label: 'سعر الحجز', value: 'price' }
    ];
    const headers = ["id", "اسم الفندق", "الموقع", "الوصف", "عرض الأسعار"];
    const [currentPage, setCurrentPage] = useState(1);
    const [getItem, setGetItem] = useState(true);
    const [selectedCity, setSelectedCity] = useState('');
    const [sortBy,setSortBy] = useState('');
    const navigate = useNavigate()

    // Fetch data (cities and hotels)
    const { cities, cityNames, isLoadingCities } = useFetchCities();
    const { hotels, totalPages, isLoadingHotels } = useFetchHotels(currentPage,getItem, selectedCity, sortBy);
    const isLoading = isLoadingCities || isLoadingHotels;
    // State for managing the search query
    const [searchQuery, setSearchQuery] = useState("");


    const transformedHotels = hotels.map(hotel => ({
        id: hotel.id, // Explicitly naming the itemId
        data: [
            hotel.id,
            hotel.name, 
            hotel.city_name,
            hotel.primary_description,
            hotel.price,
        ]
    }));

    // Filter hotels based on the search query
    const filteredHotels = searchQuery
    ? transformedHotels.filter(hotel =>
            hotel.data[1].toLowerCase().includes(searchQuery.toLowerCase())
        )
    : transformedHotels;


    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    //  Function to handle Delete hotel
    const handleDelete = (itemId) => {
        deleteItem(itemId,setGetItem); // Use the deleteHotel function from the hook
    };

    //  Function to handle update hotel button
    const handleEdit = (itemId) => {
        navigate(`/hotels/edit/${itemId}`)
    };

    // Effect to watch for changes in hotels and reset search query if necessary
    useEffect(() => {
        setSearchQuery("");
    }, [hotels]);

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
                    <MainSelect title="كامل القطر" options={['كامل القطر',...cityNames]} onSelect={(option) => setSelectedCity(option === 'كامل القطر' ? '' : option)}/>
                    <MainSelect title="ترتيب حسب" options={['ترتيب حسب',...options]} onSelect={(option) => setSortBy(option === 'ترتيب حسب' ? '' : option)}/>
                </div>
                <div className="add-search">
                    <MainSearchInput placeholder = " البحث عن فندق"  onChange={(e) => setSearchQuery(e.target.value)}/>
                    <MainButton text={'اضافة فندق'} goTo="/hotels/add"/>
                </div>
            </div>
            <MainTable data={filteredHotels} headers={headers} totalPages={totalPages} onPageChange={handlePageChange} onDelete={handleDelete} onEdit={handleEdit} />

        </section>
    )
}

export default Hotel