import Status from './Status'

function flower(props) {
  console.log('props0.1:',props);
  console.log('props:',props.f);  
  console.log('props 0.2',props.f.status);   
    return (
      <div>
       {props.f.flower}
       <Status s={props.f.status} />
      </div>
    );
  }

  export default flower;
  // export default status;