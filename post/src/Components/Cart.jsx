import React, { useContext } from 'react'
import { CardContext } from './Context'
import "./Cart.css"

import './Product.css'
function Cart() {
 const {card,setCard}=useContext(CardContext)
  console.log(card)
  function Delete(id){
    setCard((prev)=>prev.filter((item)=>item.id!==id , alert("delete Successful")))
  }
  if(card.length===0){
    return (<>
    <br />
    <br />
    <div style={{justifyItems:'center',borderRadius:"5px"}} ><div style={{backgroundColor:"Highlight",width:"400px",borderRadius:"5px",height:"100px",alignItems:"center",alignContent:"center"
  
    }}><h1>Card is Empty</h1></div></div>
    </>)
  }
  return (
    <div className='container' >
     {card.map((item)=>(
      <div key={item.id} className='card' > 
      <h1 style={{ cursor: "pointer",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",width:'250px' }}>{item.title}</h1>
      <h4>{item.body}</h4>
      <div style={{display:"flex",flexDirection:"row",gap:"10px",alignItems:"center",width:"100%",justifyContent:"center"}}>
      <button className='cart-btn'  onClick={()=>Delete(item.id)}>Delete</button>
      <button className='cart-btn' onClick={()=>alert("Buy Successfully")} >Buy</button>
      </div>
      </div>
      
     ))}
    </div>
  )
}

export default Cart
