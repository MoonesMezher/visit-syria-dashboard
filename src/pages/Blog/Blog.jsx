// import MainButton from "../../components/Shared/MainButton/MainButton";
// import MainSelect from "../../components/Shared/MainSelect/MainSelect";
// import MainTable from "../../components/Shared/MainTable/MainTable";
// import "./Blog.css";
// import MainPhotoInput from "../../components/Shared/MainPhotoInput/MainPhotoInput";
// import { useEffect, useState } from "react";
// import MainPhotoGroupInput from "../../components/Shared/MainPhotoGroupInput/MainPhotoGroupInput";
// import MainInput from "../../components/Shared/MainInput/MainInput";
// import axios from "axios";
// import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
// import { useNavigate } from "react-router-dom";
// import { useFetchBlogs } from "../../constant/api/FetchData2";

// const Blog = () => {
//  const [sortBy,setSortBy] = useState('');
//  const [blogs, setBlogs] = useState([]);
//  const [totalPages, setTotalPages] = useState(0);
//  const [currentPage, setCurrentPage] = useState(1);
//  const [get, setGet] = useState(true);
//   const [mainImageFile, setMainImageFile] = useState(null);
//   const [mainImagePreview, setMainImagePreview] = useState("");
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imgs, setImgs] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:8000/api/blogs?page=${currentPage}`
//       );
//       const responseData = response.data;
//       if (responseData.pagination && responseData.pagination.total_pages) {
//         setBlogs(responseData.data);
//         setTotalPages(responseData.pagination.total_pages);
//       } else {
//         console.error("Error: total_pages not found in response data");
//         setBlogs(responseData.data);
//         setTotalPages(1);
//       }
//     } catch (error) {
//       console.error("Failed to fetch blogs:", error);
//     }
//   };

//    fetchData();
//  }, [currentPage, get]);
//  const handlePageChange = (pageNumber) => {
//    setCurrentPage(pageNumber);
//  };

//  const transformedBlogs =
//    blogs && blogs.length > 0
//      ? blogs.map((blog) => ({
//          id: blog.id,
//          data: [blog.title, blog.content, blog.created_at],
//        }))
//      : [];

//   const sendData = (event) => {
//     event.preventDefault();
//     let formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     if (mainImageFile) {
//       formData.append("main_image", mainImageFile);
//     }
//     console.log(formData);
//     axios
//       .post("http://127.0.0.1:8000/api/add", formData)
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((error) => console.log(error));
//   };

//  const handleDelete = (blog) => {
//    axios
//      .delete(`http://127.0.0.1:8000/api/blog/${blog}`, null)
//      .then((res) => {
//        setGet((prev) => !prev);
//        console.log(res.data);
//      })
//      .catch((error) => {
//        console.error("Failed to delete blog:", error);
//      });
//  };

// const handleEdit = (blog) => {
//   setSelectedItem(blog);
//   navigate(`/blogs/edit/${blog}`);
// };

// const headers = ["id", " عنوان المقالة", "تاريخ النشر"];
//   const category = ["الطبيعة", "الأثرية"];
//  const options = [
//    { label: "id", value: "id" },
//    { label: "عنوان المقالة", value: "title" },
//    { label: "تاريخ النشر", value: "created_at" },
//  ];

//   const options = [
//     { label: "id", value: "id" },
//     { label: "عنوان المقالة", value: "title" },
//     { label: "تاريخ النشر", value: "created_at" },
//   ];
//   const headers = ["id", " عنوان المقالة", "تاريخ النشر"];
//   const [currentPage, setCurrentPage] = useState(1);
//   const [getItem, setGetItem] = useState(true);
//   // const [selectedCity, setSelectedCity] = useState('');
//   const [sortBy, setSortBy] = useState("");
//   const navigate = useNavigate();

//    Fetch data (cities and hotels)
//    const { cities, cityNames, isLoadingCities } = useFetchCities();
//   const { blogs, totalPages, isLoadingBlogs } = useFetchBlogs(
//     currentPage,
//     getItem,
//     sortBy
//   );
//   const isLoading = isLoadingCities || isLoadingHotels;
//   const isLoading =  isLoadingHotels;
//   State for managing the search query
//   const [searchQuery, setSearchQuery] = useState("");

//   const transformedBlogs = blogs.map((blogs) => ({
//     id: blogs.id,
//     data: [blogs.title, blogs.content, blogs.created_at],
//   }));

//    Filter hotels based on the search query
//   const filteredBlogs = searchQuery
//     ? transformedBlogs.filter((blog) =>
//         blog.data[1].toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : transformedBlogs;

//  Function to handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   Function to handle Delete hotel
//  const handleDelete = (itemId) => {
//    deleteItem(itemId, setGetItem); // Use the deleteHotel function from the hook
//  };
//   const handleDelete = (blog) => {
//     axios
//       .delete(`http://127.0.0.1:8000/api/blog/${blog}`, null)
//       .then((res) => {
//         setGetItem((prev) => !prev);
//         console.log(res.data);
//       })
//       .catch((error) => {
//         console.error("Failed to delete blog:", error);
//       });
//   };

//    Function to handle update hotel button
//   const handleEdit = (itemId) => {
//     navigate(`/blog/edit/${blog}`);
//   };

//   const handleEdit = (blog) => {
//     setSelectedItem(blog);
//     navigate(`/blogs/edit/${blog}`);
//   };

//    Effect to watch for changes in hotels and reset search query if necessary
//   useEffect(() => {
//     setSearchQuery("");
//   }, [blogs]);

//   return (
//     <section>
//       <div className="blog-header">
//         <MainSelect
//           title="ترتيب حسب"
//           options={["ترتيب حسب", ...options]}
//           onSelect={(options) =>
//             setSortBy(options === "ترتيب حسب" ? "" : options)
//           }
//         />
//         <div className="blog-button-and-search">
//           <MainSearchInput text={"بحث عن مقال"} />
//           <MainButton text={"اضافة مقال"} goTo={"/blogs/add"} />
//         </div>
//       </div>
//       <div className="blog-table">
//         <MainTable
//           data={transformedBlogs}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//           currentPage={currentPage}
//           headers={headers}
//           onDelete={handleDelete}
//           onEdit={handleEdit}
//         />
//       </div>
//       <div className="blog-body">
//         <div className="blog-body-left">
//           <div className="img-and-label">
//             <p>صور اضافية</p>
//             <MainPhotoGroupInput imgs={imgs} setImgs={setImgs} />
//           </div>
//           <MainButton text={"نشر المقالة"} onClick={sendData} />
//         </div>
//         <div className="blog-body-right">
//           <div className="img-and-label">
//             <p>الصورة الرئيسية</p>
//             <div className="img-category">
//               <MainSelect title={"Category"} options={category} />
//               <MainPhotoInput
//                 img={mainImagePreview}
//                 setImgFile={setMainImageFile}
//                 setImgPreview={setMainImagePreview}
//               />
//             </div>
//           </div>
//           <MainInput
//             label={"عنوان المقالة"}
//             type={"text"}
//             setInputValue={setTitle}
//           />
//           <MainInput
//             label={"محتوى المقالة"}
//             type={"textarea"}
//             setInputValue={setContent}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Blog;

import MainSelect from "../../components/Shared/MainSelect/MainSelect";
import MainTable from "../../components/Shared/MainTable/MainTable";
import "./Blog.css";
import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, useFetchBlogs } from "../../constant/api/FetchBlogData";

const Blog = () => {
  const options = [
    { label: "id", value: "id" },
    { label: "عنوان المقالة", value: "title" },
    { label: "تاريخ النشر", value: "created_at" },
  ];
  const headers = ["id", " عنوان المقالة", "تاريخ النشر"];
  const [currentPage, setCurrentPage] = useState(1);
  const [getItem, setGetItem] = useState(true);
  //   const [selectedCity, setSelectedCity] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();

  // Fetch data (cities and blogs)
  //   const { cities, cityNames, isLoadingCities } = useFetchCities();
  const { blogs, totalPages, isLoadingBlogs } = useFetchBlogs(
    currentPage,
    getItem,
    // selectedCity,
    sortBy
  );
  const isLoading = isLoadingBlogs;
  // State for managing the search query
  const [searchQuery, setSearchQuery] = useState("");

  const transformedBlogs = blogs.map((blog) => ({
    id: blog.id,
    data: [blog.title, blog.created_at],
  }));

  // Filter blogs based on the search query
  const filteredBlogs = searchQuery
    ? transformedBlogs.filter((blog) =>
        blog.data[1].toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transformedBlogs;

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //  Function to handle Delete Blog
  const handleDelete = (blog) => {
    deleteItem(blog, setGetItem); // Use the deleteBlog function from the hook
  };

  //  Function to handle update Blog button
  const handleEdit = (blog) => {
    navigate(`/blogs/edit/${blog}`);
  };

  // Effect to watch for changes in blogs and reset search query if necessary
  useEffect(() => {
    setSearchQuery("");
  }, [blogs]);

  return (
    <section className="blog-management">
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border"
            style={{ color: "rgb(126, 126, 126)" }}
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      <div className="blog-btn">
        <div className="filter">
          <MainSelect
            title="ترتيب حسب"
            options={["ترتيب حسب", ...options]}
            onSelect={(options) =>
              setSortBy(options === "ترتيب حسب" ? "" : options)
            }
          />
        </div>
        <div className="add-search">
          <MainSearchInput
            text={"بحث عن مقال"}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MainButton text={"اضافة مقال"} goTo={"/blogs/add"} />
        </div>
      </div>
      <MainTable
        data={filteredBlogs}
        headers={headers}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </section>
  );
};

export default Blog;
