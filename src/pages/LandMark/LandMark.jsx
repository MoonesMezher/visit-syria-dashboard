import MainButton from '../../components/Shared/MainButton/MainButton';
import MainSelect from '../../components/Shared/MainSelect/MainSelect';
import MainTable from "../../components/Shared/MainTable/MainTable"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as landmarksServices from "../../constant/api/services/landmarkService"
import './LandMark.css';
import ConfirmaDelete from '../../components/Shared/ConfirmDelete/ConfirmDelete';
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";


const LandMark = () => {

    const sortBy = ['id', 'اسم المعلم', 'المحافظة'];
    const headers = ["id", "اسم المعلم", "المحافظة", "الموقع", "الوصف"];
    const navigate = useNavigate()
    const [landmarksRows, setlandmarksRows] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const token = localStorage.getItem("token");

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
        try {
            const response = await landmarksServices.getAllLandmarks(currentPage);
            setlandmarksRows(response.data);
            setTotalPages(response.data.pagination.total_pages);
            setCurrentPage(response.data.pagination.currentPage);
        } catch (error) {
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


    useEffect(() => {
        setShowConfirm(false);
        getAllData();
    }, [currentPage]);

    useEffect(() => {
    }, [selectedItemId]);


    return (
        <section className="BY_LandMark">
            <div className='top_section'>
                <div className="right_section">
                    <MainButton text="إضافة معلم سياحي" goTo="./add" />
                    <MainSearchInput text="بحث عن معلم "/>
                </div>
                <div className="left_section">
                    <MainSelect title="كامل القطر" options={sortBy} />
                    <MainSelect title="ترتيب حسب" options={sortBy} />
                </div>
            </div>
            <div className='content_section'>
                <MainTable
                    data={landmarkHeader}
                    headers={headers}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onDelete={handleDeleteClick}
                    onEdit={handleEdit}
                />

            </div>
            {showConfirm && (
                    <ConfirmaDelete
                        onDelete={handleDeleteConfirm}
                        onCancel={handleDeleteCancel}
                        message="هل أنت متأكد من رغبتك في حذف هذا المعلم؟"
                    />
            )}
        </section>
    )
}

export default LandMark
