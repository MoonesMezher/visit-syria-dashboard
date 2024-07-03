import MainSelect from "../../components/Shared/MainSelect/MainSelect"
import MainTable from "../../components/Shared/MainTable/MainTable";
// import "./Resturant.css"
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Shared/Loading/Loading";
import {  useNavigate } from "react-router-dom";
import ConfirmaDelete from "../../components/Shared/ConfirmDelete/ConfirmDelete";
import { toast } from "react-toastify";

const Resturant = () => {
    const [loading , setLoading] = useState(false);

    const options = [
        { label: 'الاسم', value: 'name' },
        { label: 'المدينة', value: 'city_name' },
        { label: 'سعر الحجز', value: 'price' }
    ];    
    const headers = ["id", "اسم المطعم", "الموقع", "الوصف", "عرض الأسعار"];
    const [cities , setCities] = useState([]);
    const [cityNames, setCityNames] = useState([]);
    const [resturants , setResturants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [get ,setGet] = useState(true);
    const [selectedCity, setSelectedCity] = useState('');
    const [sortBy,setSortBy] = useState('');
    const [searchQuery, setSearchQuery] = useState("");

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
        setLoading(true)
        const cityQuery = selectedCity ? `&city=${selectedCity}` : '';
        const sortQuery = sortBy ? `&sort_by=${sortBy}` : '';
        axios.get(`http://127.0.0.1:8000/api/restaurants/page?page=${currentPage}${cityQuery}${sortQuery}`)
        .then(response => {
            setResturants(response?.data?.data);
            setLoading(false)
            setTotalPages(response?.data?.pagination.total_pages);
        }).catch(error => {
            setLoading(false)
            console.error("Failed to fetch resturants:", error);
        })
    }, [currentPage,get, selectedCity, sortBy]);
      // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const transformedRes = resturants?.map(e => ({
        id: e.id, // Explicitly naming the itemId
        data: [
            e.id,
            e.name, 
            e.city_name,
            e.primary_description,
            e.table_price,
        ]
    }));
    console.log(transformedRes);
    const [keepGoing, setKeepGoing] = useState(false);

    const handleDelete = (itemId) => {
        setKeepGoing(itemId);
    };

    const handleDeleteItemAfterAccept = (itemID) => {
        setSelectedItem(itemID)
        axios.delete(`http://127.0.0.1:8000/api/restaurants/delete/${selectedItem}`,{
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then(res => {
                console.log(res.data);
                setGet((prev) =>!prev);
                setKeepGoing(false)
                toast.success('تم الحذف بنجاح');
            }).catch(error => {
                console.error("Failed to delete resturant:", error);
                toast.error('لم يتم الحذف بنجاح');
            });
    }

    const handleEdit = (itemId) => {
        setSelectedItem(itemId);
        navigate(`/resturants/edit/${itemId}`)
    };

    // Filter hotels based on the search query
    const filteredResturant = searchQuery
    ? transformedRes.filter(hotel =>
            hotel.data[1].toLowerCase().includes(searchQuery.toLowerCase())
        )
    : transformedRes;




    useEffect(() => {
        setSearchQuery("");
    }, [resturants]);

    return (
        <section className="hotel-management">
            <div className="hotel-btn">
                <div className="filter">
                    <MainSelect title="كامل القطر" options={['كامل القطر',...cityNames]} onSelect={(option) => setSelectedCity(option === 'كامل القطر' ? '' : option)}/>
                    <MainSelect title="ترتيب حسب" options={['ترتيب حسب',...options]} onSelect={(option) => setSortBy(option === 'ترتيب حسب' ? '' : option)}/>
                </div>
                <div className="add-search">
                    <MainSearchInput placeholder = "البحث عن مطعم"  onChange={(e) => setSearchQuery(e.target.value)}/>
                    <MainButton text={'اضافة مطعم'} goTo="/resturants/add"/>
                </div>
            </div>
            <Loading loading={loading} style={'loading-get-all'}/>
            {keepGoing && (
                    <ConfirmaDelete
                        onDelete={() => handleDeleteItemAfterAccept(keepGoing)}
                        onCancel={() => setKeepGoing(false)}
                        message={"هل أنت متأكد من رغبتك في حذف هذا المطعم؟"}
                    />
            )}
            {!loading && <MainTable data={filteredResturant} headers={headers} totalPages={totalPages} onPageChange={handlePageChange} onDelete={handleDelete} onEdit={handleEdit} />}
        </section>
    )
}

export default Resturant