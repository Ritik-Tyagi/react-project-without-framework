import { createContext, useState } from "react";

export const CardContext=createContext()
 const CardProvider=({children})=>{
    const [cardDetail,setCardDetail]=useState({})
    const [card,setCard]=useState([])
    const [searchInp,setSearchInp]=useState("")
    const [formData,setFormData]=useState([])
    const [user,setUser]=useState({})
    return (
        <CardContext.Provider value={{cardDetail,setCardDetail,card,setCard,searchInp,setSearchInp,formData,setFormData,user,setUser}} >
            {children}
        </CardContext.Provider>
    )
 }
 export default CardProvider;