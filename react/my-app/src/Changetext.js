import React, { Component } from "react";
class Changetext extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            newval:"Hello Good Morning"
            
        };
    }
    change =()=>
    {
        this.setState({newval:"Hello Good Evening"})
    }
    // add =()=>{
    //     // console.log("hi");
    //     // this.setState( if(newval<10)?{newval:this.state.newval+1}:0)
    //     if(this.state.newval<10)
    //          this.setState({newval:this.state.newval+1})      
    // }
    // sub=()=>{
    //     // console.log("hi");
    //     // this.setState( if(newval<10)?{newval:this.state.newval+1}:0)
    //     if(this.state.newval>0)
    //          this.setState({newval:this.state.newval-1})      
    // }
    // componentDidMount(){
    //     console.log("component did mount is called");
    // }

    // componentDidUpdate(prevProps,prevState){
    //     console.log('prevProps-->',prevProps);
    //     console.log('prevState-->',prevState);
    // }

    // componentWillUnmount(){
    //     console.log("component will unmount");
    // }

    render() {
        return (
            <div>
                {/* <h1>{this.state.newval}</h1>
                <button onClick={this.add}>Add</button>
                <br></br>
                <br></br>
                <button onClick={this.sub}>Subtract</button> */}

                <h1>{this.state.newval}</h1>
                <button onClick={this.change}>change Name</button>
               
            </div>
        );
    }
}

export default  Changetext;