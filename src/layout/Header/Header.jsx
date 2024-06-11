import { FaRegUserCircle } from 'react-icons/fa'
import './Header.css'
import { GoBell } from 'react-icons/go'
import Img1 from '../../assets/images/Header/Visit.png'
import Img2 from '../../assets/images/Header/Syria.png'
import { TbWorld } from 'react-icons/tb'
import { VscSearch } from 'react-icons/vsc'
const Header = () => {
    return (
        <header className='mm-header sticky-top'>
            <div className='container mx-auto d-flex justify-content-between align-items-center'>
                <div className='d-flex justify-content-center align-items-center left-side'>
                    <FaRegUserCircle className='profile-icon'/>
                    <GoBell className='notefication-icon'/>
                    <div className='language'>
                        <span>العربية</span>
                        <TbWorld className='language-icon'/>
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='search-input'>
                        <input type='text' name='search'/>
                        <VscSearch className='search-icon'/>
                    </div>
                    <div className='d-flex justify-content-center align-items-center logo'>
                        <img src={Img1} alt="visit syria logo - visit word"/>
                        <img src={Img2} alt="visit syria logo - syria word"/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header