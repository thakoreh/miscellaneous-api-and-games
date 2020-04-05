import React, { Component } from 'react'

class JokeSection extends Component{
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state={value:'Any'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleChange=(event)=>{
        this.setState({value: event.target.value});

        
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        // console.log("handleClick :",event);
        fetch("https://sv443.net/jokeapi/category/"+String(this.state.value))
      .then(res => res.json())
      .then(
        (result) => {
            console.log("result : ",result);
            var x=result.setup||result.joke;
            var y=result.delivery||'';
            document.getElementById("jokeQShow").innerHTML = x;
            document.getElementById("jokeAShow").innerHTML = y;
            // console.log("jokeshow : ",document.getElementById('jokeShow').value);
        },
        (error) => {
            console.log("error : ",error);
        }
      )
    }
    render() {
        return (
            <div>
                <form className='jokeSection' style={{height:'300px'}}>
                    <u><span id="jokeText" style={{fontWeight:300,fontFamily:'cursive'}}>Let's Try Joke API</span></u>
                    <br />
                    <hr />
                    <label>
                    Pick your Joke category :
                    <br />
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="Programming">Programming</option>
                        <option value="Dark">Dark</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                        <option value="Any">Any</option>
                    </select>
                    </label>
                    <input type="submit" name="joke-btn" value="Submit" onClick={this.handleSubmit}></input>
                    <hr/>
                    
                    {this.state.value!='Any'?this.state.value:''} Joke: <br/><br/>
                    <span id="jokeQShow"></span>
                    <br/>
                    <span id="jokeAShow"></span>
                </form>
            </div>
        )
    }
}

export default JokeSection;