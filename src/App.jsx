import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import Home from './pages/Home/Home'
import AddHotel from './pages/AddHotel/AddHotel'
import AddResturant from './pages/AddResturant/AddResturant'
import AddBlog from './pages/AddBlog/AddBlog'
import AddLandMark from './pages/AddLandMark/AddLandMark'
import EditHotel from './pages/EditHotel/EditHotel'
import EditResturant from './pages/EditResturant/EditReturand'
import EditBlog from './pages/EditBlog/EditBlog'
import EditLandMark from './pages/EditLandMark/EditLandMark'
import SatisticsHotel from './pages/SatisticsHotel/SatisticsHotel'
import SatisticsResturant from './pages/SatisticsResturant/SatisticsResturant'
import SatisticsBlog from './pages/SatisticsBlog/SatisticsBlog'
import SatisticsLandMark from './pages/SatisticsLandMark/SatisticsLandMark'
import Resturant from './pages/Resturant/Resturant'
import LandMark from './pages/LandMark/LandMark'
import About from './pages/About/About'
import Hotel from './pages/Hotel/Hotel'
import Blog from './pages/Blog/Blog'
import Login from './pages/Login/Login'
import Settings from './pages/Settings/Settings'
import EditAbout from './pages/EditAbout/EditAbout'
import AddAbout from './pages/AddAbout/AddAbout'
import { ToastContainer } from 'react-toastify'
import ErrorPage from './pages/Error/Error'

function App() {
  const token = localStorage.getItem('token') || 1;

  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/about/add" element={<AddAbout/>} />
        <Route path="/about/edit/:id" element={<EditAbout/>} />
        <Route path="/hotels" element={<Hotel/>} />
        <Route path="/hotels/add" element={<AddHotel/>} />
        <Route path="/hotels/edit/:id" element={<EditHotel/>} />
        <Route path="/hotels/reports" element={<SatisticsHotel/>} />
        <Route path="/resturants" element={token? <Resturant/>: <Navigate to={'/error'}/>} />
        <Route path="/resturants/add" element={token?<AddResturant/>: <Navigate to={'/error'}/>} />
        <Route path="/resturants/edit/:id" element={token? <EditResturant/>: <Navigate to={'/error'}/>} />
        <Route path="/resturants/reports" element={token? <SatisticsResturant/>: <Navigate to={'/error'}/>} />
        <Route path="/blogs" element={<Blog/>} />
        <Route path="/blogs/add" element={<AddBlog/>} />
        <Route path="/blogs/edit/:id" element={<EditBlog/>} />
        <Route path="/blogs/reports" element={<SatisticsBlog/>} />
        <Route path="/places" element={<LandMark/>} />
        <Route path="/places/add" element={<AddLandMark/>} />
        <Route path="/places/edit/:id" element={<EditLandMark/>} />
        <Route path="/places/reports" element={<SatisticsLandMark/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/login" element={token? <Login/>: <Navigate to='/'/>} />
        <Route path="*" element={<Navigate to="/error"/>} />
        <Route path="/error" element={<ErrorPage/>} />
      </Routes>
    </Layout>
  )
}

export default App
