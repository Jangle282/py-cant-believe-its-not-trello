import { Component } from 'react'


export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: props.card,
      openEditCardOverlay: false
    }
  }

  openEditCardModal() {
    this.props.openEditCardModal(this.props.card)
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
          onClick={() => this.openEditCardModal()}
        >
          <p className="card-name">{this.state.card.name}</p>

          <div className="ellipses" onClick={() => this.openEditCardModal()}>
            <div className="dots">...</div>
          </div>
        </div>

        <div
          className={expandDragZone ? 'expand-drag-zone drag-zone' : 'drag-zone'}
        // @dragenter="cardDragEnter"
        // @dragover="cardDragOver"
        // @dragleave="cardDragLeave"
        // @drop="cardDragDrop"
        ></div>
      </div>
    )
  }
};
