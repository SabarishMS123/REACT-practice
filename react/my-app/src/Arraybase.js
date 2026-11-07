import  React,{useState} from "react"

const Arraybase=()=>{
    
    // let a=['ram','arun','viki'];
    let a=[
        {id:1,name:"ram",phone:78787},
        {id:2,name:"arun",phone:3939},
        {id:3,name:"viki",phone:1212}
    ];

return (
    <>
        <h1>List demo</h1>
        {/* <ul>{   normal operation
            a.map((name,index)=>(
                // console.log(name);
                <li key={index}>{name}</li>
            ))
        }
        </ul> */}

        <ul>{ 
            a.map((a1)=>(
                // console.log(a1);
                <li key={a1.id}>{a1.name}--{a1.phone}</li>
            ))
        }
        </ul>
        
    
    </>
)
}
export default Arraybase;