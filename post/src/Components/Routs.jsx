import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Product from './Product'
import Cart from './Cart'
import DetailCard from './DetailCard'
import SearchOutput from './SearchOutput'
import Home from './Home'
import Navbar from './Navbar'
import SignUp from './SignUp'
import Login from './Login'
function Routs() {
  return (
    <div>
      <Routes>
        
        <Route path='/' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/cardDetail' element={<DetailCard/>} />
        <Route path='/SearchOutput' element={<SearchOutput/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        
        
      </Routes>
    </div>
  )
}

export default Routs
