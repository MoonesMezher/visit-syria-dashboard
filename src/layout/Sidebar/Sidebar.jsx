import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Sidebar.css'
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5'
import { FaHotel, FaMapMarker } from 'react-icons/fa'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { ImSpoonKnife } from 'react-icons/im'
import { MdOutlineLandscape } from 'react-icons/md'
import { PiNotePencilThin } from 'react-icons/pi'

const sidebarLinks = [
    {
        text: "لوحة تحكم",
        icon: <IoHomeOutline/>,
        url: '/'
    },
    {
        text: "عن سوريا",
        icon: <FaMapMarker/>,
        url: '/about'
    },
    {
        text: "الفنادق",
        icon: <FaHotel/>,
        details: [
            {
                text: "إدارة الفنادق",
                url: '/hotels'
            },
            {
                text: "تقارير الفنادق",
                url: '/hotels/reports'
            }            
        ]
    },
    {
        text: "المطاعم",
        icon: <ImSpoonKnife/>,
        details: [
            {
                text: "إدارة المطاعم",
                url: '/resturants'
            },
            {
                text: "تقارير المطاعم",
                url: '/resturants/reports'
            }            
        ]
    },
    {
        text: "المعالم السياحية",
        icon: <MdOutlineLandscape/>,
        details: [
            {
                text: "إدارة المعالم السياحية",
                url: '/places'
            },
            {
                text: "تقارير المعالم السياحية",
                url: '/places/reports'
            }            
        ]
    },
    {
        text: "المدونة",
        icon: <PiNotePencilThin/>,
        details: [
            {
                text: "إدارة المدونة",
                url: '/blogs'
            },
            {
                text: "تقارير المدونة",
                url: '/blogs/reports'
            }            
        ]
    },
    {
        text: "الإعدادات",
        icon: <IoSettingsOutline/>,
        url: '/settings'
    },
];

const SidebarLink = ({ link }) => {
    const [showList, setShowList] = useState();

    let { pathname } = useLocation();

    const navigate = useNavigate()

    useEffect(() => {
        setShowList(false);
    }, [pathname])

    const handleListClick = () => {
        navigate(link.details[0].url);
        return setShowList(showList == link.text? false: link.text);
    }
    
    return (
        link.details 
        ? 
        <div>
            <div onClick={handleListClick}>
                <div className={`dropdown ${(link.details.find(e => e.url == pathname) || showList == link.text)? 'active': 'normal'}`}>
                    <span>
                        {link.icon}
                    </span>
                    {link.text}
                    <div className='dropdown-icon'>
                        <RiArrowDropDownLine/>
                    </div>
                </div>
            </div>
            {
                <div className={`${((showList == link.text) || pathname == link.details[0].url || pathname == link.details[1].url) ? "details-active" : "details"}`}>
                    {link.details.map((e, i) => <Link to={e.url} key={i} className={(link.details.find(e => e.url == pathname))&& 'active ' + (pathname == e.url && 'double-active')}>{e.text}</Link>)}
                </div>
            }
        </div>
            : 
        <Link to={link.url} className={pathname == link.url ? 'active': 'normal'}>
            <span>
                {link.icon}
            </span>
            {link.text}
        </Link>
    )
}

const Sidebar = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
  
    if (isLoginPage) {
      return null;
    }
  
    if (!isLoginPage)
    return (
        <aside className='sidebar'>
            { sidebarLinks.map((e, i) => <SidebarLink link={e} key={i}/>) }
        </aside>
    )
}

export default Sidebar