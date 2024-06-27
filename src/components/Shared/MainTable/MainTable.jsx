import PropTypes from "prop-types";
import "./MainTable.css";
// import editIcon from './../../../assets/icons/PencilSimpleLine.svg';
// import trashIcon from './../../../assets/icons/Trash.svg';
import next from "./../../../assets/icons/chevron-right.svg";
import previous from "./../../../assets/icons/Vector.svg";
import ActionButtons from "../ActionButtons/ActionButtons";

const MainTable = ({
  headers,
  data,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  // Corrected handlePageChange to ensure currentPage stays within bounds.
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  return (
    <>
      <div
        className="table-responsive"
        style={{ justifyContent: "center", display: "flex" }}
      >
        <table className="table" id="myTable">
          <thead className="thead-light">
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
              <th>تعديل</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {item.data &&
                  item.data.map((cell, cellIndex) => (
                    <td key={cellIndex} className="truncate">
                      {cell}
                    </td>
                  ))}
                <ActionButtons
                  onDelete={onDelete}
                  onEdit={onEdit}
                  itemId={item.id}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <img src={next} alt="" />
              السابق
            </a>
          </li>
          {[...Array.from({ length: totalPages }, (_, i) => i + 1)].map(
            (page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? "active" : ""}`}
              >
                <a className="page-link" onClick={() => handlePageChange(page)}>
                  {page}
                </a>
              </li>
            )
          )}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              التالي
              <img src={previous} alt="" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

MainTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired, // Changed to PropTypes.any to allow for flexible data types
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default MainTable;
