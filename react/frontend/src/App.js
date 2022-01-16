import React, {Component} from 'react'
import {Trello} from './components/Trello.js'
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: "world"
    }
  }


  render() {
    return (
      <div className="App">
        App.js
        <Trello></Trello>
    </div> 
    )
  }
}

export default App;
