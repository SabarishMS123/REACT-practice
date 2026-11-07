import React,{useState} from "react"

const Forms=() =>{
        const[name,setName]=useState("");
        const[phone,setPhone]=useState("");

        const clickSubmit=(e)=>{
            console.log(e);
            e.preventDefault();
              console.log('Name-->',name);
              console.log('Phone Number-->',phone);
        }
 
    return (
        <>
                <form onSubmit={clickSubmit}>

                   Name: <input 
                   
                            type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                          
                   
                   
                   />
                   
                   
                   
                   <br></br><br></br>

                   Phone Number: <input  type="text"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            />
                            <br></br><br></br>
                    <button  type="submit">Submit</button>
                </form>
        </>
    )
}
export default Forms;
