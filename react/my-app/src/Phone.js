// import React,{Component} from "react";
// class Phone extends Component{
//     constructor(props){
//         super(props);
//         console.log(props);
//         this.state={
//             phone:props.val
//         }
//     }

//     render(){ 
//         //shouldnt change

//         console.log(this.state.phone);
//         return (<h1>phone: {this.state.phone}</h1>);
//     }

// }

// export default Phone;
import React, { Component } from "react";
// import Address from './Address';
import Work from './Work';
class Phone extends Component {
    
    constructor(props) {
        // console.log('val3',props.val3);
        super(props);
        console.log('phone props-->',props);
        
        this.state = {
            phone: props.phone,
            work:props.work,
            aim:props.aim
        };
    }

    render() {
        // console.log(this.state.phone);
        return (
            <div>
                <h1>Phone: {this.state.phone}</h1>
                <Work  work={this.state.work}
                        aim={this.state.aim}
                 />
                
            </div>
        );
    }
}

export default Phone;