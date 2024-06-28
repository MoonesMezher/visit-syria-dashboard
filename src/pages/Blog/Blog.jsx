import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSelect from "../../components/Shared/MainSelect/MainSelect";
import MainTable from "../../components/Shared/MainTable/MainTable";
import "./Blog.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Blog = () => {
  const [sortBy, setSortBy] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [get, setGet] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const sortQuery = sortBy ? `&sort_by=${sortBy}` : "";
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/blogs?page=${currentPage}${sortQuery}`
        );
        const responseData = response.data;
        console.log(responseData);
        if (responseData) {
          setBlogs(responseData);
          console.log("BLOG", blogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchData();
  }, [currentPage, get]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const transformedBlogs =
    blogs && blogs.length > 0
      ? blogs.map((blog) => ({
          id: blog.id,
          data: [
            blog.id,
            blog.title,
            moment(blog.created_at).format("YYYY-MM-DD"),
          ],
        }))
      : [];

  const handleDelete = (blog) => {
    axios
      .delete(`http://127.0.0.1:8000/api/blog/${blog}`, null)
      .then((res) => {
        setGet((prev) => !prev);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Failed to delete blog:", error);
      });
  };

  const handleEdit = (blog) => {
    setSelectedItem(blog);
    navigate(`/blogs/edit/${blog}`);
  };

  const headers = ["id", " عنوان المقالة", "تاريخ النشر"];
  const options = [
    { label: "id", value: "id" },
    { label: "عنوان المقالة", value: "title" },
    { label: "تاريخ النشر", value: "created_at" },
  ];

  const navigate = useNavigate();

  //    Filter blogs based on the search query
  const filteredBlogs = searchQuery
    ? transformedBlogs.filter((blog) =>
        blog.data[1].toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transformedBlogs;

  //    Effect to watch for changes in blogs and reset search query if necessary
  useEffect(() => {
    setSearchQuery("");
  }, [blogs]);

  return (
    <section>
      <div className="blog-header">
        <MainSelect
          title="ترتيب حسب"
          options={["ترتيب حسب", ...options]}
          onSelect={(options) =>
            setSortBy(options === "ترتيب حسب" ? "" : options)
          }
        />
        <div className="blog-button-and-search">
          <MainSearchInput
            placeholder={"بحث عن مقال"}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MainButton text={"اضافة مقال"} goTo={"/blogs/add"} />
        </div>
      </div>
      <div className="blog-table">
        <MainTable
          data={filteredBlogs}
          currentPage={currentPage}
          headers={headers}
          onPageChange={handlePageChange}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </section>
  );
};

export default Blog;
