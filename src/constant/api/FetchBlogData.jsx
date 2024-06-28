import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Custom Hook for Fetching Cities
// export const useFetchCities = () => {
//     const [cities, setCities] = useState([]);
//     const [cityNames, setCityNames] = useState([]);
//     const [isLoadingCities, setIsLoadingCities] = useState(false);
//     useEffect(() => {
//         setIsLoadingCities(true);
//         axios.get('http://127.0.0.1:8000/api/cities')
//             .then(res => {
//                 setCities(res.data.data);
//                 const names = res.data.data.map(city => city.name);
//                 setCityNames(names);
//             })
//             .finally(() => setIsLoadingCities(false));
//     }, []);

//     return { cities, cityNames, isLoadingCities };
// };

// Custom Hook for Fetching Hotels
export const useFetchBlogs = (currentPage, getItem, sortBy) => {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);

  useEffect(() => {
    setIsLoadingBlogs(true);
    // const cityQuery = selectedCity ? `&city=${selectedCity}` : '';
    const sortQuery = sortBy ? `&sort_by=${sortBy}` : "";
    // axios.get(`http://127.0.0.1:8000/api/blogs?page=${currentPage}${cityQuery}${sortQuery}`)
    const fetchData = async () => {
      try {
        const response = await axios
          .get(`http://127.0.0.1:8000/api/blogs?page=${currentPage}$`)
          // .then((res) => {
          // console.log("Backend response:", res.data);
          // setBlogs(res.data.data);
          // setTotalPages(res.data.pagination.total_pages);
          // setTotalPages(res.data.pagination);
          // })
          .finally(() => setIsLoadingBlogs(false));
        const responseData = response.data;
        console.log(responseData);
        if (responseData) {
          setBlogs(responseData);
          console.log("BLOG", blogs);
          // setTotalPages(responseData.pagination.total_pages);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    // }, [currentPage, getItem, selectedCity, sortBy]);
  }, [currentPage, getItem, sortBy]);
  return { blogs, totalPages, isLoadingBlogs };
};

export const deleteItem = (blog, setGetItem) => {
  axios
    .delete(`http://127.0.0.1:8000/api/blog/${blog}`, null)
    .then((res) => {
      console.log(res.data);
      setGetItem((prev) => !prev);
      toast.success("تمت حذف العنصر بنجاح");
    })
    .catch((error) => {
      console.error("Failed to delete hotel:", error);
    });
};
