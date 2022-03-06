import { Component } from 'react'


export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: props.card,
      openEditCardOverlay: false,
      draggedCard: false,
      expandDragZone: false
    }
  }

  openEditCardModal() {
    this.props.openEditCardModal(this.props.card)
  }

  cardDragStart() {
    this.setState({
      draggedCard: true
    })
  }

  cardDragEnd(e) {
    e.preventDefault()
    this.props.cardDragEnd(e, this.props.card)
    this.setState({
      draggedCard: false
    })
  }

  cardDragEnter(e) {
    e.preventDefault();

    if (!this.state.draggedCard) {
      this.setState({
        expandDragZone: true,
      })
    }
  }

  cardDragOver(e) {
    e.preventDefault();
  }

  cardDragLeave(e) {
    e.preventDefault();

    if (!this.state.draggedCard) {
      this.setState({
        expandDragZone: false,
      })
    }  
  }

  cardDragDrop(e) {
    e.preventDefault();

    this.setState({
      expandDragZone: false
    })

    this.props.cardDragDrop(e, this.props.card)
  }

  render() {
    return (
      <div className="card-container">
        <div
          draggable="true"
          onDragStart={() => this.cardDragStart()}
          onDragEnd={(e) => this.cardDragEnd(e)}
          className={this.state.draggedCard ? 'dragged-card' : 'task-card'}
          id="task-card"
          onClick={() => this.openEditCardModal()}
        >
          <p className="card-name">{this.state.card.name}</p>
          <div className="ellipses" onClick={() => this.openEditCardModal()}>
            <div className="dots">...</div>
          </div>
        </div>

        <div
          className={this.state.expandDragZone ? 'expand-drag-zone drag-zone' : 'drag-zone'}
          onDragEnter={(e) => this.cardDragEnter(e)}
          onDragLeave={(e) => this.cardDragLeave(e)}
          onDragOver={(e) => this.cardDragOver(e)}
          onDrop={(e) => this.cardDragDrop(e)}
        ></div>
      </div>
    )
  }
};
