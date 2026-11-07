import React,{Component} from "react";
class Name extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={
            name:props.val
        }
    }

    render(){ 
        //shouldnt change

        console.log(this.state.name);
        return (<h1> hi {this.state.name}</h1>);
    }

}

export default  Name;