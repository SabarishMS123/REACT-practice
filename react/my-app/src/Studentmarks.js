import React,{ useState } from "react"
const Studentmarks= ()=>{
    const[mark1,setMark1]=useState("");
    const[mark2,setMark2]=useState("");
    const[mark3,setMark3]=useState("");
    const[mark4,setMark4]=useState("");
    const[mark5,setMark5]=useState("");
    const[result,setResult]=useState(null);

    const totalmarks=()=>{
        let tot=parseInt(mark1)+parseInt(mark2)+parseInt(mark3)
                +parseInt(mark4)+parseInt(mark5);
        console.log('total',tot);
        setResult(tot);
    }
    return(

        <>
           <h1>---STUDENT'S  DASHBOARD---</h1>
           MARK1:<input
                     type="number"
                     value={mark1}
                     onChange={(e)=>setMark1(e.target.value)}
                   

                  />
                 
            <br/>
            <br/>


            MARK2:<input
                     type="number"
                     value={mark2}
                     onChange={(e)=>setMark2(e.target.value)}
                        
                  />
                 
            <br/>
            <br/>

            MARK3:<input
                     type="number"
                     value={mark3}
                     onChange={(e)=>setMark3(e.target.value)}
                        
                  />
                 
            <br/>
            <br/>


            MARK4:<input
                     type="number"
                     value={mark4}
                     onChange={(e)=>setMark4(e.target.value)}
                        
                  />
                 
            <br/>
            <br/>

            MARK5:<input
                     type="number"
                     value={mark5}
                     onChange={(e)=>setMark5(e.target.value)}
                        
                  />
                 
            <br/>
            <br/>
            <button onClick={totalmarks}>TOTAL</button>
        <br></br>
        <br></br>

        {
            result!==null&&(
                <h1>result:{result}</h1>
            )
        }
            </>
    )

}
export default Studentmarks;