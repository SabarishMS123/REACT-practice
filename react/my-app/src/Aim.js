//import React,{Component} from "react";
// class Aim extends Component{
//     constructor(props){
//         super(props);
//         console.log(props);
//         this.state={
//             aim:props.val
//         }
//     }

//     render(){ 
//         //shouldnt change
//         <Aim val="Software developer"/>
//         console.log(this.state.aim);
//         return (<h1>AIM: {this.state.aim}</h1>);
//     }                                                                                                                                 


// }

// export default Aim

import React, { Component } from "react";
import Phone from './Phone';

class Aim extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            aim: props.aim
        };
    }

    render() {
        console.log(this.state.aim);
        return (
            <div>
                <h1>AIM: {this.state.aim}</h1>
                
            </div>
        );
    }
}

export default Aim;