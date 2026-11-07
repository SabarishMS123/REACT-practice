import React,{ useState } from "react"
const  Buttonstatefun1= () =>{
    const[num1,setNum1]=useState("");
    const[num2,setNum2]=useState("");
    const[result,setResult]=useState(null);
   

    // const callNum1=(e)=>{
    //     setNum1(e.target.value);
    // }

    const add=()=>{
        let sum=parseInt(num1)+parseInt(num2);
        console.log("a==",num1);
        console.log("b==",num2);
        console.log("toatl==>",sum);
        setResult(sum);
        // document.getElementById('display').innerHTML=sum;
    }
 
    return(
        <>
        <h1>Add two number </h1>
        Enter a number :<input
                            type="numer"
                            value={num1}
                            placeholder="Enter number"
                            // onChange={callNum1}
                            onChange={(e)=>setNum1(e.target.value)}
                        />
                        <br/>
                        <br/>
        Enter a number :<input
                            type="numer"
                            value={num2}
                            placeholder="Enter number"
                            // onChange={callNum1}
                            onChange={(e)=>setNum2(e.target.value)}
                        />
                        <br/>
                        <br/>
        <button onClick={add}>Add</button>
        <br></br>
        <br></br>

        {/* <textarea id="display"></textarea> */}
        {
            result!==null&&(
                <h1>result:{result}</h1>
            )
        }
        </>
    )
}
export default Buttonstatefun1;