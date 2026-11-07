import React, { Component } from "react";
class StateofButton extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
           
            newval2:props.val2
           
        };
    }
     
    stateof = () => {
        this.setState((prevState) => ({
          newval2: prevState.newval2 === "Unclicked" ? "Clicked" : "Unclicked"
        }));
      };
    
//     stateof = () => {
//     this.setState(
//     componentDidUpdate(prevState){
//         newval2: prevState.newval2 == "Unclicked" ? "Clicked" : "Unclicked"
// }
//      )  ;
//     };
    // componentDidUpdate(prevProps,prevState){
    //     console.log('prevProps-->',prevProps);
    //     console.log('prevState-->',prevState);
    // }
    
    render() {
        return (
            <div>
              
                 
                 {/* <button onClick={this.stateof} id="mybutton">ChangeButtonState</button> */}
                 <button onClick={this.stateof} >{this.state.newval2}</button>

            </div>
        );
    }
}

export default  StateofButton;

