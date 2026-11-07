import React,{ useState } from "react"
const  Buttonstatefun=()=>{
    const[change,setChange]=useState("Unclicked");

    const change1=()=>
    {
        setChange(change==="Unclicked"?"Clicked":"Unclicked" );
    }
    return(
        <>
        
        <button onClick={change1}>{change}</button>
        
        </>
    )
}
export default Buttonstatefun;