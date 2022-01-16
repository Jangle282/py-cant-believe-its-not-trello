import {Component} from 'react'



export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: "world"
    }
  }


  render() {
    return (
    <div>
        Card
    </div> 
    )
  }
};
