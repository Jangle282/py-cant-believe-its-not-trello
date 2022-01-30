import {Component} from 'react'
import {Card} from './Card'


export class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: props.column,
      showColDropZoneStyle: false,
      editTitleOpen: false
    }
    this.toggleEditTitle = this.toggleEditTitle.bind(this)
    this.saveColTitle = this.saveColTitle.bind(this)
    this.keyUp = this.keyUp.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  toggleEditTitle() {
    this.setState(prevState => ({
      editTitleOpen: !prevState.editTitleOpen
    }));
  }

  saveColTitle() {
    this.toggleEditTitle()
    // send update column request
  }

  keyUp(e) {
    if (e.keyCode === 13) {
      this.saveColTitle()
    }
  }

  onDelete() {
    console.log("In column")
    this.props.onDelete(this.state.column.id)
  }


  render() {
    const Cards = this.state.column.cards.map((card) => <Card key={card.id} card={card}/>);
    
    return (
      <div className={this.state.showColDropZoneStyle ? 'column-drop-zone, column' : 'column'}
          // draggable="true"
          // @dragstart="colDragStart"
          // @dragend="colDragEnded"
          // @dragenter="colDragEnter"
          // @dragover="colDragOver"
          // @drop="colDragDrop"
          id="column"
      >
        { !this.state.showColDropZoneStyle && 
        <div>
          {/* TODO make func component for title fields */}
          <div className={this.state.colDragInProgress ? 'pointer-none, column-header' : 'column-header'}>
            { this.state.editTitleOpen 
              ? <div className="edit-title-open, column-title-container">
                  <input v-model="column.name" onKeyUp={this.keyUp}/>
                </div>
              : <div onClick={this.toggleEditTitle} className="column-title-container">
                  <h6>{ this.state.column.name || "add a column" }</h6>
                </div>
            }
            <div className="delete-button" onClick={() => this.onDelete()}>
              <div>X</div>
            </div>
          </div>
    
            <div className={this.state.colDragInProgress ? 'pointer-none, cardList' : 'cardList'}>
              {Cards}
            </div>
    
            {/* <div
              v-if="addCardFormOpen"
              :class="[ {'pointer-none' : colDragInProgress},'add-card-form']"
            >
              <input
                v-model="newCardData.name"
                type="text"
                name="title"
                id="title"
                ref="cardTitle"
                @keyup.enter="storeCard"
              />
              <div @click="storeCard">Add</div>
              <div @click="toggleAddCardForm">X</div>
              <div>...</div>
            </div> */}
    
            {/* <div v-else:class="[ {'pointer-none' : colDragInProgress},'add-card-form']"
              @click="toggleAddCardForm"
              >Add a Card
              </div> */}
        </div>
        }
      </div>
    )
  }
};
