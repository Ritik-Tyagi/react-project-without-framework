import React,{useContext} from 'react'
import { CardContext } from './Context'
function DetailCard() {
    const {cardDetail,setCartDetail,card,setCard}=useContext(CardContext)
    function AddCart(id){
      async function card(id) {
        const res=await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if(!res.ok){
          throw new Error("card fetch error");
          }
        const data= await res.json()
        //console.log(data)
        setCard((prev)=>([
          ...prev,
          data
        ]))
        alert("Successful")
      }
      card(id)
    }
    function BuyBtn(){
      alert("Buy Successful")
    }
  return (
    <div className='container'>
      <div className='card'>
          <h1>{cardDetail.id}</h1>
          <h1>{cardDetail.title}</h1>
          <h4>{cardDetail.body}</h4>
          <button className='addcart-button' onClick={()=>AddCart(cardDetail.id)} style={{marginRight:"5px",backgroundColor:"#8CABFF",borderRadius:"5px"}} >Add to cart</button>
          <button className='addcart-button' onClick={BuyBtn} style={{marginLeft:"5px",backgroundColor:"#8CABFF",borderRadius:"5px"}} >Buy</button>
        </div>
    </div>
  )
}

export default DetailCard
