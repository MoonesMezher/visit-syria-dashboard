import { useEffect, useState } from "react"
import MainTable from "../../components/Shared/MainTable/MainTable"
import MainButton from "../../components/Shared/MainButton/MainButton";
import './About.css'
import { dataPage1, headers } from "../../constant/staticData"
import axios from "axios"
import { useNavigate, useNavigation } from "react-router-dom";
import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";

const About = () => {
    const headers = ["id", "عنوان المقال ", "التصنيفات", "نص المقال", "الصور "];

    const[abouts,setAbout]=useState([])
    const[current_page,setcurrent_page]=useState(1)
    const[total_pages,setTotal_pages]=useState(0)
const navigate=useNavigate()
    
       

  
     
   

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
      }, [current_page]);
      
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
  axios.delete(`http://127.0.0.1:8000/api/hotels/${itemId}`, null)
  .then(res => {
      console.log(res.data);
      setGet((prev) =>!prev);
  }).catch(error => {
      console.error("Failed to delete hotel:", error);
  });
};


    
    return (
        <section>
            <div className="section-search">
                <div className="div">

                </div>
                <div className="add-buuton-about">
                <MainButton text={'اضافة مقال'} goTo="/about/add" className="text-end"/>

                </div>

            </div>

                        <MainTable data={getData} headers={headers} currentPage={current_page} totalPages={total_pages} onPageChange={handlePageChange} onEdit={handleEdit} onDelete={handleDelete}  />

           </section>
    )
}

export default About