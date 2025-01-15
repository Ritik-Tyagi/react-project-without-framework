import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { FaCartArrowDown } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { CardContext } from './Context';
import { FaHome } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { GiCrossedSabres } from "react-icons/gi";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoLogIn } from "react-icons/io5";
function Navbar() {
  const {searchInp,setSearchInp}=useContext(CardContext)
  const navigate=useNavigate()
  const [open,SetOpen]=useState(false)
  function SearchHandler(e){
    
    setSearchInp(e.target.value)
    
  }
  function filterData(e){
    e.preventDefault()
    //console.log(searchInp)
    navigate("/SearchOutput")
  }

  return (
    <>
    <div className='navbar-container'>
      <div className='navbar-logo'>
        <img src="logo.png" alt="logo" style={{width:"100%",borderRadius:"5px"}} />
          {/* {<p  className='p-logo' style={{fontSize:"15px",fontFamily:"revert-layer"}}><strong className='str-logo' style={{ontSize:"30px" ,color:"red"}}>Ritik Tyagi</strong><br />This is my site</p>} */}
      </div>
      <div className='search-inp'>
        <input style={{width:"60%",height:"30px",borderRadius:'8px'}} type="search" name="inp" id="navbar-search" value={searchInp||""} onChange={SearchHandler} />
        <button className='search-btn' style={{height:"30px",width:"20%",fontWeight:"bold",borderRadius:"5px",cursor:"pointer"}} onClick={filterData} >Search</button>
      </div>
      <div className='parent-responsive-menu'> 
      <div className='responsive-menu' style={{color:"black",fontSize:"50px"}}  onClick={()=>SetOpen(!open) }><IoMenu/></div>
      {open && <div className='manage-response'>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end"}}>
          
        <GiCrossedSabres onClick={()=>SetOpen(!open)} style={{marginTop:"5px",marginRight:"5px",color:"black",fontSize:"20px"}} />
        </div>
      
      <Link style={{fontSize:"20px",fontWeight:'bold',fontFamily:"sans-serif"}} to='/'>< FaHome /> Home</Link>
      <Link style={{fontSize:"20px",fontWeight:'bold',fontFamily:"sans-serif"}} to='/cart'><FaCartArrowDown /> Cart</Link>
      <Link style={{fontSize:"20px",fontWeight:'bold',fontFamily:"sans-serif"}} to='/signup'><SiGnuprivacyguard /> Signup</Link>
      <Link style={{fontSize:"20px",fontWeight:'bold',fontFamily:"sans-serif"}} to='/login'><IoLogIn /> Login</Link>
        
      </div>}
      </div>
      <div className='navbar-links'>
      <Link style={{marginRight:"10px",marginLeft:"5px",fontSize:"20px",fontWeight:'bold'}} to='/'>< FaHome /> Home</Link>
      <Link style={{marginLeft:"5px" ,marginRight:"5px",fontSize:"20px",fontWeight:'bold'}} to='/cart'><FaCartArrowDown /> Cart</Link>
      <Link style={{marginRight:"5px",marginLeft:"5px",fontSize:"20px",fontWeight:'bold'}} to='/signup'><SiGnuprivacyguard />  Signup</Link>
      <Link style={{marginRight:"5px",fontSize:"20px",fontWeight:'bold'}} to='/login'><IoLogIn /> Login</Link>
      </div>  
    </div>
    </>
  )
}

export default Navbar
