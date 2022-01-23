import { Component } from 'react'


export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: props.card,
      openEditCardOverlay: false
    }
    this.openEditCardOverlay = this.openEditCardOverlay.bind(this)
  }

  openEditCardOverlay() {
    console.log('open edit card overlay')
  }


  render() {
    const expandDragZone = false; // dragTargetId === card.id && cardIsOverTarget
    const draggedCard = false; // draggedCardId === this.card.id
    return (
      <div className="card-container">
        <div
          // draggable="true"
          // @dragstart="cardDragStart"
          // @dragend="cardDragEnded"
          className={draggedCard ? 'dragged-card' : 'task-card'}
          id="task-card"
          // @click="openEditCardOverlay"
        >
          <p className="card-name">{this.state.card.name}</p>

          <div className="ellipses" onClick={this.openEditCardOverlay}>
            <div className="dots">...</div>
          </div>
        </div>

        <div
          className={expandDragZone ? 'expand-drag-zone, drag-zone' : 'drag-zone'}
        // @dragenter="cardDragEnter"
        // @dragover="cardDragOver"
        // @dragleave="cardDragLeave"
        // @drop="cardDragDrop"
        ></div>
      </div>
    )
  }
};
