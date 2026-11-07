// import React,{Component} from "react";
// class Work extends Component{
//     constructor(props){
//         super(props);
//         console.log(props);
//         this.state={
//             work:props.val
//         }
//     }

//     render(){ 
//         //shouldnt change

//         console.log(this.state.work);
//         return (<h1>Work: {this.state.work}</h1>);
//     }

// }

// export default Work;

import React, { Component } from "react";
import Aim from './Aim'
class Work extends Component {
    constructor(props) {
       
        super(props);
        console.log('val4-->',props.work);
        this.state = {
            work: props.work,
            aim:props.aim
        };
    }

    render() {
        // console.log(this.state.work);
        return (
            <div>
            <h1>Work: {this.state.work}</h1>
           <Aim 
                                   aim={this.state.aim}
                            />
                            </div>
        );
    }
}

export default Work;