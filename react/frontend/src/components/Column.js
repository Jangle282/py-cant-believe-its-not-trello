import {Component} from 'react'
import {Card} from './Card'
import {ColumnHeader} from './Functional/ColumnHeader'
import { EditColumnForm } from './Functional/EditColumnForm copy';


export class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newColumnTitle: props.column.name,
      showColDropZoneStyle: false,
      editTitleOpen: false
    }
    this.toggleEditTitle = this.toggleEditTitle.bind(this)
    this.keyUp = this.keyUp.bind(this)
    this.handleColumnTitleChange = this.handleColumnTitleChange.bind(this)
  }

  toggleEditTitle() {
    this.setState(prevState => ({
      editTitleOpen: !prevState.editTitleOpen
    }));
  }

  keyUp(e) {
    if (e.keyCode === 13) {
      this.toggleEditTitle()
      this.props.onUpdate(this.props.column.id, {
        name : this.state.newColumnTitle
      })
    }
  }

  handleColumnTitleChange(e) {
    e.preventDefault();
    this.setState({
      newColumnTitle : e.target.value
    })
  }

  render() {
    const ColHeader = <ColumnHeader
      text={this.props.column.name} 
      onToggle={this.toggleEditTitle}
    />
    
    const EditCol = <EditColumnForm
      title={this.state.newColumnTitle}
      onChange={(e) => this.handleColumnTitleChange(e)}
      onKeyUp={(e) => this.keyUp(e)}
    />

    const Cards = this.props.column.cards.map((card) => <Card key={card.id} card={card}/>);
    
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
          <div className={this.state.colDragInProgress ? 'pointer-none, column-header' : 'column-header'}>
            { this.state.editTitleOpen ? EditCol : ColHeader }
            <div className="delete-button" onClick={() => this.props.onDelete(this.props.column.id)}>
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
