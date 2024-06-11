import { useState } from 'react';
import PropTypes from 'prop-types';
import "./MainTable.css";
import editIcon from './../../../assets/icons/PencilSimpleLine.svg';
import trashIcon from './../../../assets/icons/Trash.svg';
import next from "./../../../assets/icons/chevron-right.svg";
import previous from "./../../../assets/icons/Vector.svg";

const MainTable = ({ headers, data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust based on your preference

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Calculate the current page's data
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Corrected handlePageChange to ensure currentPage stays within bounds
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pageCount) {
            setCurrentPage(newPage);
        }
    };  
    return (
        <>
            {/* <div className="table-responsive "> */}
                <table className="table" id='myTable' style={{ maxHeight: "480px" }}>
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
                    {currentItems.map((row, rowIndex) => ( // Use currentItems instead of data
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>
                                    {cell}
                                </td>
                            ))}
                            <td><a href=""><img src={editIcon} alt="" /></a></td>
                            <td><a href=""><img src={trashIcon} alt="" /></a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            {/* </div> */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1? 'disabled' : ''}`}>
                        <a className="page-link" onClick={() => handlePageChange(currentPage - 1)}><img src={next} alt="" />السابق</a>
                    </li>
                    {[...Array.from({ length: pageCount }, (_, i) => i + 1)].map((page) => (
                        <li key={page} className={`page-item ${page === currentPage? 'active' : ''}`}>
                            <a className="page-link" onClick={() => handlePageChange(page)}>{page}</a>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === pageCount? 'disabled' : ''}`}>
                        <a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>التالي<img src={previous} alt="" /></a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
MainTable.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.array).isRequired,
};
export default MainTable;
