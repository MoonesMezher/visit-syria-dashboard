import MainButton from '../../components/Shared/MainButton/MainButton';
import MainSelect from '../../components/Shared/MainSelect/MainSelect';
import MainTable from "../../components/Shared/MainTable/MainTable"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as landmarksServices from "../../constant/api/services/landmarkService"
import './LandMark.css';
import ConfirmaDelete from '../../components/Shared/ConfirmDelete/ConfirmDelete';
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
import { useFetchCities } from "../../constant/api/FetchData";
import Loading from "../../components/Shared/Loading/Loading";


const LandMark = () => {
    const [loading, setLoading] = useState(false);

    const { cities, cityNames, isLoadingCities } = useFetchCities();
    const [selectedCity, setSelectedCity] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('');

    const options = [
        { label: 'الاسم', value: 'name' },
        { label: 'المحافظة', value: 'city' },
        { label: 'الموقع', value: 'location' },
        { label: 'الوصف', value: 'primary_description' }
    ];

    const [searchQuery, setSearchQuery] = useState("");


    const headers = ["id", "اسم المعلم", "المحافظة", "الموقع", "الوصف"];
    const navigate = useNavigate()
    const [landmarksRows, setlandmarksRows] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const deleteLandmarkById = async (itemId) => {
        try {
            await
                landmarksServices.deleteLandmarkById(itemId);
            getAllData();
        } catch (error) {
            console.error('Error in delete landmark:', error);
        }
    };


    const handleEdit = (itemId) => {
        navigate(`/places/edit/${itemId}`)
    };

    const getAllData = async () => {
        setLoading(true);
        try {
            setLoading(false);
            const response = await landmarksServices.getAllLandmarks(currentPage, selectedCity, sortBy);
            setlandmarksRows(response.data);
            setTotalPages(response.data.pagination.total_pages);
            setCurrentPage(response.data.pagination.currentPage);

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const landmarkHeader = landmarksRows.map(item => ({
        id: item.id,
        data: [
            item.id,
            item.name,
            item.city,
            item.location,
            item.primary_description,
        ]
    }));

    const handleDeleteClick = (itemID) => {
        setSelectedItemId(itemID);
        setShowConfirm(true);
    };

    const handleDeleteConfirm = () => {
        deleteLandmarkById(selectedItemId);
        console.log(`Delete item with ID: ${selectedItemId}`);
        setShowConfirm(false);
    };

    const handleDeleteCancel = () => {
        setSelectedItemId(null);
        setShowConfirm(false);
    };

    const filteredLandmarks = searchQuery
        ? landmarkHeader.filter(landmarksRow =>
            landmarksRow.data[1].toLowerCase().includes(searchQuery.toLowerCase())
        )
        : landmarkHeader;

    useEffect(() => {
        console.log('loading', loading);
    }, [selectedItemId, loading]);

    useEffect(() => {
        setShowConfirm(false);
        getAllData();
    }, [currentPage, selectedCity, sortBy]);



    useEffect(() => {
        setSearchQuery("");
    }, [landmarksRows]);


    return (
        <section className="BY_LandMark">
            <div className='BY_container'>
                <div className='top_section'>
                    <div className="right_section">
                        <MainButton text="إضافة معلم" goTo="./add" />
                        <MainSearchInput placeholder="بحث عن معلم " onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    <div className="left_section">
                        <MainSelect title="كامل القطر" options={['كامل القطر', ...cityNames]} onSelect={(option) => setSelectedCity(option === 'كامل القطر' ? '' : option)} />
                        <MainSelect title="ترتيب حسب" options={['ترتيب حسب', ...options]} onSelect={(option) => setSortBy(option === 'ترتيب حسب' ? '' : option)} />
                    </div>
                </div>
                <div className='content_section'>
                    {!loading && <MainTable
                        data={filteredLandmarks}
                        headers={headers}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onDelete={handleDeleteClick}
                        onEdit={handleEdit}
                    />
                    }

                </div>

                {showConfirm && (
                    <ConfirmaDelete
                        onDelete={handleDeleteConfirm}
                        onCancel={handleDeleteCancel}
                        message="هل أنت متأكد من رغبتك في حذف هذاالمعلم؟"
                    />
                )}

                <Loading loading={loading} style={'loading-get-all'} />
            </div>

        </section>
    )
}

export default LandMark
