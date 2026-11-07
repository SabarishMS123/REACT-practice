
import Login from "./components/Login"
import Home  from "./components/Home"
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard"
import {Route,Routes,BrowserRouter} from "react-router-dom"
function App() {
  return (

    <div className="App">
     <Routes>
      <Route path ='/login' element ={<Login/>}/>
      <Route path ='/' element ={<Home/>}/>
      <Route path='/registration' element ={<Registration/>}/>
      <Route path='/dashboard' element ={<Dashboard/>}/>

     </Routes>
    </div>
  );
}

export default App;
