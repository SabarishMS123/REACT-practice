import React,{ useState } from "react"
//Use state is like a Book

const Incremdecrem=()=>{
          //our wish variable,functionname=useState(value which we given next to : in state)
    const [count,setCount]=useState(0);

    const increment=()=>{
        setCount(count+1);
    }
    const decrement=()=>{
        if(count>0)
          setCount(count-1);
    }

    return(
        <>
        value:{count}
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        </>
    )
}

export default Incremdecrem;