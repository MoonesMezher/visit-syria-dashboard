import { useEffect, useState } from "react"
import MainTable from "../../components/Shared/MainTable/MainTable"
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSelect from "../../components/Shared/MainSelect/MainSelect"

import './About.css'
import axios from "axios"
import { useNavigate, useNavigation } from "react-router-dom";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";

const About = () => {
    const headers = ["id", "عنوان المقال ", "التصنيفات", "نص المقال", "الصور "];

    const[abouts,setAbout]=useState([])
    const[current_page,setcurrent_page]=useState(1)
    const[total_pages,setTotal_pages]=useState(0)
    const[get,setGet]=useState(true)
const navigate=useNavigate()
    
const options = [
  { label: 'التصنيف', value: 'category' },
  
];

  
     
   

    // useEffect(()=>{
    //      axios.get(`http://127.0.0.1:8000/api/about?${current_page}`)
    //     .then(res=>setAbout(res.data.data)
    // )
    

    // },[current_page])
    useEffect(() => {
        const fetchAboutData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/about?page=${current_page}`);
            setAbout(response.data.data)
            setTotal_pages(response.data.pagination.total_pages)
          } catch (error) {
            console.error('Error fetching about data:', error);
          }
        };
      
        fetchAboutData();
      }, [current_page,get]);
      
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
  const handleEdit = (itemId) => {
    // Implement editing logic here
    // console.log(`Editing item with ID: ${itemId}`);
    navigate(`/about/edit/${itemId}`)
};

const handleDelete = (itemId) => {
  axios.delete(`http://127.0.0.1:8000/api/about/${itemId}`, null)
  .then(res => {
      console.log(res.data);
      setGet((prev) =>!prev);
      alert('تم الحذف')
  }).catch(error => {
      console.error("Failed to delete :", error);
  });
};


    
    return (
        <section>
            <div className="section-search">
            <MainButton text={'اضافة مقال'} goTo="/about/add" className="text-end"/>

            <div className="hotel-btn">
                <div className="filter">
                    <MainSelect title="ترتيب حسب" options={['ترتيب حسب',...options]} />
                </div>
                <div className="add-search">

                    {/* <MainSearchInput placeholder = " البحث عن فندق"  onChange={(e) => setSearchQuery(e.target.value)}/> */}
                </div>
            </div>
            {/* <MainTable data={filteredHotels} headers={headers} totalPages={totalPages} onPageChange={handlePageChange} onDelete={handleDelete} onEdit={handleEdit} /> */}
      
                <div className="add-buuton-about">

                </div>

            </div>

                        <MainTable data={getData} headers={headers} currentPage={current_page} totalPages={total_pages} onPageChange={handlePageChange} onEdit={handleEdit} onDelete={handleDelete}  />

           </section>
    )
}

export default About