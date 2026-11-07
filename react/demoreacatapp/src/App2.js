import Name from './Name'
import Address from './Address'
import Phone from './Phone'
//Here props is used to send the values from one file to another file
// also to import one file from another file 
function App2(props) {
  return (
    <div>
      <div>
        <p>
        hi 
        </p>
      
      </div>
      <div>
        <Name n={props.name} />
        <Address ad={props.address} />
        <Phone p={props.phone} />
      </div>
    </div>
  );
}

export default App2;
