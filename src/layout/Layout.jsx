import MainTable from "../components/Shared/MainTable/MainTable"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"

const Layout = ({ children }) => {
//     const headers = ["id", "اسم الفندق", "الموقع", "الوصف", "الخدمات", "عرض الأسعار"];
//     const dataPage1 = [
//       [1, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [2, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [4, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [5, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [6, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [7, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [8, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [9, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [10, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [11, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [12, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [13, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [14, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [15, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [16, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [17, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [18, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [19, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [20, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
//       [21, "Hotel 1", "Location 1", "Description 1", "Services 1", "$$"],
      
//       // More data...
//   ];
    return (
        <div>
            <Header/>
            <div className="content">
                { children }
                {/* <MainTable headers={headers} data={dataPage1} /> */}
            </div>
            <Sidebar/>
        </div>
    )
}

export default Layout