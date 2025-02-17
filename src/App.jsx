import React from 'react'
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/Sidebar/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Add from './pages/add/Add'
import List from './pages/list/List'
import Order from './pages/orders/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content' >
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Order />} /> 
          <Route path="*" element={<Navigate to="/add" replace />} />         
        </Routes>
      </div>
    </div>
  )
}

export default App
