import {Component} from 'react'
import {Card} from './Card'
import {ColumnHeader} from './Functional/ColumnHeader'
import { EditColumnForm } from './Functional/EditColumnForm';
import { AddCardForm } from './Functional/AddCardForm';
import { store as storeCard } from '../api/cards'


export class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newColumnTitle: props.column.name,
      showColDropZoneStyle: false,
      editTitleOpen: false,
      newCardFormOpen : false,
      newCardData : {
        name : 'Add a card',
        description:'Add a description',
        column: this.props.column.id,
        order: -1
      }  
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
  
  toggleAddCardForm() {
    this.setState(prevState => ({
      newCardFormOpen: !prevState.newCardFormOpen
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

  storeCardOnKeyUp(e) {
    e.preventDefault()
    if (e.keyCode === 13) {
      this.callStoreCard()
    }
  }

  callStoreCard() {
    const cardsLength = this.props.column.cards.length
    const order = cardsLength ? this.props.column.cards[cardsLength -1].order + 1 : -1
    let cardData = {...this.state.newCardData, order}
    storeCard(cardData)
    .then(() => {
      this.props.refreshColumns()
    })
    .catch((e) => console.log("Error", e))
    this.resetNewCardData()
  }

  resetNewCardData() {
    this.setState({
      newCardData : {
        name: '',
        description: '',
        column: this.props.column.id,
        order: -1
      }
    })
  }

  handleCardTitleInput(e) {
    const newState = {...this.state.newCardData, name: e.target.value}
    this.setState({ newCardData: newState })
  }

  render() {
    const columnHeader = <ColumnHeader
      text={this.props.column.name} 
      onToggle={this.toggleEditTitle}
    />
    
    const editColumn = <EditColumnForm
      title={this.state.newColumnTitle}
      onChange={(e) => this.handleColumnTitleChange(e)}
      onKeyUp={(e) => this.keyUp(e)}
    />

    const cards = this.props.column.cards.map((card) => <Card 
      key={card.id} 
      card={card}
      openEditCardModal={(card) => this.props.openEditCardModal(card)}
    />);

    const addCardForm = <AddCardForm
      colDragInProgress={this.state.colDragInProgress}
      name={this.state.newCardData.name}
      storeCardOnKeyUp={(e) => this.storeCardOnKeyUp(e)}
      handleCardTitleInput={(e) => this.handleCardTitleInput(e)}
      callStoreCard={(e) => this.callStoreCard(e)}
      toggleAddCardForm={(e) => this.toggleAddCardForm(e)}
    />
  const addCard = <div 
  className={this.state.colDragInProgress ? 'add-card-form, pointer-none' : 'add-card-form'}
  onClick={() => this.toggleAddCardForm()}
>Add a Card
</div>
    
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
            { this.state.editTitleOpen ? editColumn : columnHeader }
            <div className="delete-button" onClick={() => this.props.onDelete(this.props.column.id)}>
              <div>X</div>
            </div>
          </div>
    
          <div className={this.state.colDragInProgress ? 'pointer-none, cardList' : 'cardList'}>
            {cards}
          </div>

          {this.state.newCardFormOpen ?  addCardForm : addCard}
        </div>
        }
      </div>
    )
  }
};
