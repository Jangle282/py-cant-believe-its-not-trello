import React, {Component} from 'react'
import {Trello} from './components/Trello.js'
import './App.scss';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  render() {
    return (
      <Trello></Trello>
    )
  }
}

export default App;
