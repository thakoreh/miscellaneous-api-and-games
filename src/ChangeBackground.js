import React, { Component } from 'react'

class ChangeBackground extends Component{
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state={bgcolor1:'#4880EC',bgcolor2:'#019CAD'};
        // this.handleChange = this.handleChange.bind(this);
        this.changebg = this.changebg.bind(this);
    }
    changebg=(event)=>{
        event.preventDefault();
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        var listOfcolors=[];
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        listOfcolors.push(color)
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        listOfcolors.push(color)
        this.setState({bgcolor1:listOfcolors[0],bgcolor2:listOfcolors[1]})

    }
    render() {
        return (

            <div>
                <div className='bgSection' style={{height:'100px',backgroundImage: "linear-gradient(to right,"+this.state.bgcolor1+", "+this.state.bgcolor2+")" }}>
                    <u><span id="bgText" style={{fontWeight:300,fontFamily:'cursive'}}>Try Changing your background :</span></u>
                    <br />
                    <hr />
                    
                    <input type="button" name="changebgcolor-btn" value="Change Background Color" onClick={this.changebg}></input>
                    <hr/>
                    
                </div>
            </div>
        )
    }
}

export default ChangeBackground;