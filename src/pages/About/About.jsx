import { useEffect, useMemo, useState } from "react"
import MainTable from "../../components/Shared/MainTable/MainTable"
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSelect from "../../components/Shared/MainSelect/MainSelect"
import Loading from "../../components/Shared/Loading/Loading";

import './About.css'
import axios from "axios"
import { useNavigate, useNavigation } from "react-router-dom";
import ConfirmaDelete from "../../components/Shared/ConfirmDelete/ConfirmDelete";
import { toast } from "react-toastify";
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
const About = () => {
    const headers = ["id", "عنوان المقال ", "التصنيفات", "نص المقال", "الصور "];
    const [loading , setLoading] = useState(false);

    const[abouts,setAbout]=useState([])
    const[current_page,setcurrent_page]=useState(1)
    const[total_pages,setTotal_pages]=useState(0)
    const[get,setGet]=useState(true)
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [searchQuery,setSearchQuery] = useState('')
    const [showConfirm, setShowConfirm] = useState(false);
    const [sortBy,setSortBy] = useState('');
const navigate=useNavigate()
    
const options = [
  { label: 'التصنيف', value: 'category' },
  
];

  
     //getData
    useEffect(() => {
        const fetchAboutData = async () => {
          setLoading(true)

          try {
            setLoading(true)

            const sortQuery = sortBy ? `&sort_by=${sortBy}` : '';           
            const response = await axios.get(`http://127.0.0.1:8000/api/about?page=${current_page}${sortQuery}`)
            setLoading(false)

            setAbout(response.data.data)
            setTotal_pages(response.data.pagination.total_pages)

          } catch (error) {
            setLoading(false)

            console.error('Error fetching about data:', error);
          }
        };
      
        fetchAboutData();
      }, [current_page,get,sortBy,searchQuery]);
const handlePageChange=(pageNumber)=>{
  setcurrent_page(pageNumber)
}

      const getData =   abouts?.map(about => ({
        id: about.id, // Explicitly naming the itemId
        data: [
            about.id,
            about.title, 
            about.category,
            about.content,
            about.main_image="تم الرفع",
        ]
    }));
    const filterAbout = searchQuery
    ? getData.filter(about =>
            about.data[1].toLowerCase().includes(searchQuery.toLowerCase())
        )
    : getData;
    
   
    // edit
  const handleEdit = (itemId) => {
    // Implement editing logic here
    // console.log(`Editing item with ID: ${itemId}`);
    navigate(`/about/edit/${itemId}`)
};


//delete
const handleDelete = (itemID) => {
  setSelectedItemId(itemID)

  axios.delete(`http://127.0.0.1:8000/api/about/${selectedItemId}`, 
    {
    headers :{ 

      'Authorization': 'Bearer ' + localStorage.getItem('token'),

  }})  
  .then(res => {
      console.log(res.data);
      setGet((prev) =>!prev);

      toast.success('تم الحذف بنجاح')
      setShowConfirm(false);

      navigate('/about')
  }).catch(error => {
      console.error("Failed to delete :", error);
  });


};
const handleDeleteCancel = () => {
  setSelectedItemId(null);
  setShowConfirm(false);
};
const handleDeleteClick = (itemID) => {
  setSelectedItemId(itemID)
  setShowConfirm(true);
};

  
   
    return (
        <section className="sectionAbout">
         
  <div className="section-serarch-about ">
    <MainSelect title="ترتيب حسب" options={options} onSelect={(options)=>setSortBy(options==='ترتيب حسب'?'':options)}/>

    <div className="search-about d-flex ">
    <MainSearchInput placeholder = " البحث عن مقال"  onChange={(e) => setSearchQuery(e.target.value)}/>
                    <MainButton text={'اضافة مقال'} goTo="/about/add"/>
           
    </div>
  </div>
  
   
   <MainTable data={filterAbout} headers={headers} currentPage={current_page} totalPages={total_pages} onPageChange={handlePageChange} onEdit={handleEdit} onDelete={handleDeleteClick}  />
   <Loading loading={loading} style={'loading-get-all'}/>

                        {showConfirm && (
                    <ConfirmaDelete
                        onDelete={handleDelete}
                        onCancel={handleDeleteCancel}
                        message="هل أنت متأكد من رغبتك في حذف هذا المعلم؟"
                    />
            )}
           </section>
    )
}

export default About