import { useEffect, useState } from "react"
import MainTable from "../components/Shared/MainTable/MainTable"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"
import { useLocation } from "react-router-dom"

const Layout = ({ children }) => {
    const [hide, setHide] = useState(false);

    const { pathname } = useLocation();

    useEffect(() => {
        setHide(pathname.includes('/error'));
    }, [pathname]);

    return (
        <div>
            {!hide && <Header/>}
            <div className={`content ${hide && 'w-100'}`}>
                { children }
            </div>
            {!hide && <Sidebar/>}
        </div>
    )
}

export default Layout