
import React,{useState} from "react"
function App() {
  const [pass,setPassword]=useState("");
  const [cpass,setPass]=useState("");
  const[email,setEmail]=useState("");
  const[message,setMessage]=useState("");
  const[name,setName]=useState("");
  const[address,setAddress]=useState("");
  const[msg,setMessage2]=useState("");
  function handleSubmit()
  {
     if(!pass && !email){
       setMessage("Enter the password and email")
     }
     else if(pass.length<8)
     {
        setMessage("Password must be greater than or equal to eight characters")
     }
     else{ setMessage("Login successful!!")}
    
  }
 function handleRegister()
 {
   if(!name || ! address || !pass || !cpass)
   {
    setMessage2("some fields are missing")
   }
   
   else if(pass!=cpass)
   {
    setMessage2("Passwords do not match")
   }
   
   else
   {
    setMessage2("Registered successfullly!!")
   }
 }
  return (
    <div className="App<">
     <center> <h1 >LOGIN PAGE</h1></center>
     <center>
      <input type="email"  onChange={e=>setEmail(e.target.value)} placeholder="enter the email" />
       <p>{message}</p>
     <br></br><br></br>
     <input type="password" onChange={e=>setPassword(e.target.value)}  placeholder="enter the password" />
     <br></br><br></br>
     <p>{message}</p>
     <center><button onClick={handleSubmit}>Submit</button> </center>
    
     <br></br><br></br>
     <h1>REGISTER PAGE</h1><br></br>
     <input type="text" onChange={e=>setName(e.target.value)} placeholder="enter the name"/><br></br><br></br>
     <h3> {message}</h3>
     <input type="text" onChange={e=>setName(e.target.value)} placeholder="Address"/><br></br><br></br>
     <p>{msg}</p>
     <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" /><br></br><br></br>
     <p>{msg}</p>
     <input type="password" onChange={e=>setPass(e.target.value)} placeholder="Confirm Password"/><br></br><br></br>
     <p>{msg}</p>
     <button onClick={handleRegister}>Register</button>
     
     </center>
     
     
     
    </div>
  );
}

export default App;
