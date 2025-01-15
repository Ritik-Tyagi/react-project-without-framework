import React from 'react'
import { useContext } from 'react'
import { CardContext } from './Context'
import './Signup.css'
function Login() {
    const {user,setUser,formData,setFormData}=useContext(CardContext)
    function handler(e){
        const {name,value}=e.target
        setUser(((prev)=>({
          ...prev,
          [name]:value
        })))
        
      }
  return (
    <div className='signup-container'>
      
      <form onSubmit={((e)=>{e.preventDefault()
        if(user.name && user.email && user.password){
          setFormData(((prev)=>[...prev,user]))
          console.log("user add successfully :",user)
          setUser({})
        }else{
          alert("Plese fill all filds")
        }
      })} className='form' style={{backgroundColor:'#8D77AB'}}>
        <span>Name:</span>
        <input type="text" name="name" id="signup-inp" value={user?.name||""} onChange={handler} />
        <span>Email:</span>
        <input type="email" name="email" id="signup-inp" value={user?.email||""} onChange={handler} />
        <span>Gender:</span>
        <select name="gender" value={user?.gender||""} onChange={handler} style={{height:'35px',borderRadius:"5px"}}>
          <option  value='-'>--</option>
          <option   value="male">Male</option>
          <option   value='female'>Female</option>
        </select>
        <span>Create Password:</span>
        <input type="password" name="password" id="signup-inp" value={user?.password||""} onChange={handler} />
        <button  className='sub-btn'>Submit</button>
      </form>
      </div>
  )
}

export default Login
