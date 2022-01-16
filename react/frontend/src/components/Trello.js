import {Component} from 'react'
import {Column} from './Column'



export class Trello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: "world"
    }
  }


  render() {
    return (
    <div>
        Trello
        <Column></Column>
        <Column></Column>
        <Column></Column>
    </div> 
    )
  }
};
