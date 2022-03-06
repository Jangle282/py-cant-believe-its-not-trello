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

  cardDragStart(e, card) {
    console.log("start", e, card)
    // this.$store.dispatch('card/dragStart', this.card)
}

cardDragEnter(e, card) {
    console.log("enter", e, card)
    // event.preventDefault()
    // if (this.card.id !== this.draggedCardId) {
    //     this.$store.dispatch('card/dragEnter', this.card)
    // }
}

cardDragOver(event) {
    console.log("over")
    // event.preventDefault()
}
cardDragLeave() {
    console.log("leave")
    // this.$store.dispatch('card/dragLeave')
}
cardDragDrop() {
    console.log("drop")
    // this.$store.dispatch("card/dragDrop");
}
cardDragEnded() {
    console.log("end")
    // this.$store.dispatch('card/dragEnd')
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
      cardDragEnter={(e, card) => this.cardDragEnter(e, card)}
      cardDragStart={(e, card) => this.cardDragStart(e, card)}
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
      className={this.state.colDragInProgress ? 'add-card-form pointer-none' : 'add-card-form'}
      onClick={() => this.toggleAddCardForm()}
        >Add a Card
      </div>

    const showColDropZoneStyle = this.props.colDragStatus 
      && this.props.draggedCol 
      && this.props.draggedCol.id === this.props.column.id 
      && this.props.dragTargetCol

    return (
      <div className={showColDropZoneStyle ? 'column-drop-zone column' : 'column'}
          draggable="true"
          onDragStart={(e) => this.props.colDragStart(e, this.props.column)}
          onDragEnter={(e) => this.props.colDragEnter(e, this.props.column)}
          onDragEnd={(e) => this.props.colDragEnd(e)}
          onDragOver={(e) => this.props.colDragOver(e)}
          onDrop={(e) => this.props.colDrop(e)}
          id="column"
      >
        { !showColDropZoneStyle && 
        <div>
          <div className={this.props.colDragStatus ? 'pointer-none column-header' : 'column-header'}>
            { this.state.editTitleOpen ? editColumn : columnHeader }
            <div className="delete-button" onClick={() => this.props.onDelete(this.props.column.id)}>
              <div>X</div>
            </div>
          </div>
    
          <div className={this.props.colDragStatus ? 'pointer-none cardList' : 'cardList'}>
            {cards}
          </div>
          {this.state.newCardFormOpen ?  addCardForm : addCard}
        </div>
        }
      </div>
    )
  }
};
