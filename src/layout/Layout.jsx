import { useEffect, useState } from "react"
import MainTable from "../components/Shared/MainTable/MainTable"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"
// import { useLocation } from "react-router-dom"

const Layout = ({ children,showLayout = true }) => {
    // const [hide, setHide] = useState(false);
    const [hide, setHide] = useState(showLayout);

    // const { pathname } = useLocation();

    
    useEffect(() => {
        setHide(!showLayout);
    }, [showLayout]);

    useEffect(() => {
        // setHide(pathname.includes('/error')
        //  || pathname.includes('/login')
        // );
        setHide(!showLayout);
    }, [showLayout]);

    return (
        <div>
            {!hide && <Header/>}
            <div className={`${hide ? 'w-100': 'content'}`}>
                { children }
            </div>
            {!hide && <Sidebar/>}
        </div>
    )
}

export default Layout