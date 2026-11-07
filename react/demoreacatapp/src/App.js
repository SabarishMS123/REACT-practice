// import logo from './logo.svg';
// import './App.css';
import NameDemo from './NameDemo'
//Here props is used to send the values from one file to another file
// also to import one file from another file 
function App(props) {
  return (
    <div>
      <div>
        <p>
        hi 
        </p>
      
      </div>
      <div>
        <NameDemo name={props.name} />
      </div>
    </div>
  );
}

export default App;
