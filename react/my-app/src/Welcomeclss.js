// import React,{Component} from "react";
// import Aim from './Aim';
// class Welcomeclsss extends Component{
//     constructor(props){
//         super(props);
//         console.log('Actually-',props);
//         this.state={
//             name:props.val,
//             aim:props.val
//         }
//     }

//     render(){
        
//         console.log('Aim',this.state.aim);
//         console.log('Name:',this.state.name);
//         return (<h1> hi {this.state.name} ,Aim {this.state.aim}</h1>);
        
//     }

// }

// export default Welcomeclsss;

import React, { Component } from "react";
 
import Address from "./Address";


class Welcomeclsss extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            name: props.val1,
            address:props.val2,
            phone:props.val3,
            work:props.val4,
            aim:props.val5
            
            
        };
    }

    render() {
        return (
            <div>
                <h1>NAME: {this.state.name}</h1>
                <Address
                 address={this.state.address} 
                 phone={this.state.phone}
                 work={this.state.work}
                 aim={this.state.aim}
                 />
               
               
            </div>
        );
    }
}

export default Welcomeclsss;