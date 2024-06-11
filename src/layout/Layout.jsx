import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"

const Layout = ({ children }) => {
    return (
        <div>
            <Header/>
            <div className="content">
                { children }
            </div>
            <Sidebar/>
        </div>
    )
}

export default Layout