import {Component} from 'react'
import {Card} from './Card'



export class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: "world"
    }
  }


  render() {
    return (
    <div>
        Column
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
    </div> 
    )
  }
};
