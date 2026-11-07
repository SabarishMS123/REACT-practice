// import React,{Component} from "react";
// class Address extends Component{
//     constructor(props){
//         super(props);
//         console.log(props);
//         this.state={
//             address:props.val
//         }
//     }

//     render(){ 
//         //shouldnt change

//         console.log(this.state.address);
//         return (<h1>ADDRESS: {this.state.address}</h1>);
//     }

// }

// export default Address;

import React, { Component } from "react";
import Phone from './Phone';

class Address extends Component  {
    constructor(props) {
        super(props);
        console.log('props address-->',props);
       
        this.state = {
            address: props.address,
            phone:props.phone,
            work:props.work,
            aim:props.aim
        };
    }
          
    render() {
        // console.log(this.state.address);
        return (
            <div>
               
                <h1>ADDRESS: {this.state.address}</h1>
                 <Phone phone={this.state.phone}
                        work={this.state.work}
                        aim={this.state.aim}
                 />
            </div>
        );
    }
}

export default Address;