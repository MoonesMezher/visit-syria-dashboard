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
import { useState } from 'react'

function App() {
  // const token = localStorage.getItem('token');
  const [token,setToken] = useState("");
  return (
    <Layout  showLayout={!!token}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <Routes>
        <Route path="/" element={token?<Home/>: <Login setToken={setToken}/>} />
        <Route path="/about" element={token? <About/>: <Navigate to={'/error'}/>} />
        <Route path="/about/add" element={token?<AddAbout/>: <Navigate to={'/error'}/>} />
        <Route path="/about/edit/:id" element={token? <EditAbout/>: <Navigate to={'/error'}/>}/>
        <Route path="/hotels" element={token?<Hotel/>: <Navigate to={'/error'}/>} />
        <Route path="/hotels/add" element={token? <AddHotel/>: <Navigate to={'/error'}/>} />
        <Route path="/hotels/edit/:id" element={token? <EditHotel/>: <Navigate to={'/error'}/>} />
        <Route path="/hotels/reports" element={token? <SatisticsHotel/>: <Navigate to={'/error'}/>} />
        <Route path="/resturants" element={token? <Resturant/>: <Navigate to={'/error'}/>} />
        <Route path="/resturants/add" element={token?<AddResturant/>: <Navigate to={'/error'}/>} />
        <Route path="/resturants/edit/:id" element={token? <EditResturant/>: <Navigate to={'/error'}/>} />
        <Route path="/resturants/reports" element={token? <SatisticsResturant/>: <Navigate to={'/error'}/>} />
        <Route path="/blogs" element={token?<Blog/>: <Navigate to={'/error'}/>} />
        <Route path="/blogs/add" element={token?<AddBlog/>: <Navigate to={'/error'}/>} />
        <Route path="/blogs/edit/:id" element={token?<EditBlog/>: <Navigate to={'/error'}/>} />
        <Route path="/blogs/reports" element={token?<SatisticsBlog/>: <Navigate to={'/error'}/>} />
        <Route path="/places" element={token? <LandMark/>: <Navigate to={'/error'}/>}/>
        <Route path="/places/add" element={token? <AddLandMark/>: <Navigate to={'/error'}/>} />
        <Route path="/places/edit/:id" element={token? <EditLandMark/>: <Navigate to={'/error'}/>}/>
        <Route path="/places/reports" element={token? <SatisticsLandMark/>: <Navigate to={'/error'}/>}/>
        <Route path="/settings" element={token? <Settings/>: <Navigate to={'/error'}/>} />
        <Route path="/login" element={!token? <Login/>: <Navigate to='/'/>} />
        <Route path="*" element={<Navigate to="/error"/>} />
        <Route path="/error" element={<ErrorPage/>} />
      </Routes>
    </Layout>
  )
}

export default App
