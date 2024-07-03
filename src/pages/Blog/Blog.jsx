import MainButton from "../../components/Shared/MainButton/MainButton";
import MainSelect from "../../components/Shared/MainSelect/MainSelect";
import MainTable from "../../components/Shared/MainTable/MainTable";
import "./Blog.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MainSearchInput from "../../components/Shared/MainSearchInput/MainSearchInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmaDelete from "../../components/Shared/ConfirmDelete/ConfirmDelete";

const Blog = () => {
  const [loading , setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [get, setGet] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const sortQuery = sortBy ? `&sort_by=${sortBy}` : "";
    try {
      setLoading(true)
      axios
        .get(`http://127.0.0.1:8000/api/blogs?page=${currentPage}${sortQuery}`)
        .then((response) => {
          setBlogs(response.data.data);
          setTotalPages(response.data.pagination.total_pages);
          setLoading(false)
        });
    } catch (error) {
      setLoading(false)
      console.error("Failed to fetch blogs:", error);
    }
  }, [currentPage, get, sortBy]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const transformedBlogs =
    blogs && blogs.length > 0
      ? blogs.map((blog) => ({
          id: blog.id,
          data: [blog.id, blog.title, blog.created_at],
        }))
      : [];

  const handleDeleteClick = (blogID) => {
    setSelectedItem(blogID);
    setShowConfirm(true);
  };
  const handleDeleteCancel = () => {
    setSelectedItem(null);
    setShowConfirm(false);
  };

  //delete
  const handleDelete = (itemID) => {
    setSelectedItem(itemID);

    axios
      .delete(`http://127.0.0.1:8000/api/blog/${selectedItem}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setGet((prev) => !prev);

        toast.success("تم الحذف بنجاح");
        setShowConfirm(false);

        navigate("/blogs");
      })
      .catch((error) => {
        console.error("Failed to delete :", error);
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
      {loading && 
            <div className="d-flex justify-content-center">
                <div className="spinner-border" style={{ color:"rgb(126, 126, 126)" }} role="status">
                <span className="sr-only"></span>
                </div>
            </div>
        }
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
          onDelete={handleDeleteClick}
          onEdit={handleEdit}
        />
      </div>

      {showConfirm && (
        <ConfirmaDelete
          onDelete={handleDelete}
          onCancel={handleDeleteCancel}
          message="هل أنت متأكد من رغبتك في حذف هذاالمعلم؟"
        />
      )}
    </section>
  );
};

export default Blog;
