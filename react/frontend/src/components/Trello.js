import {Component} from 'react'
import {Column} from './Column'
import {TopBar} from './TopBar'
import {
  retrieve as retrieveColumns, 
  store as storeColumn,
  destroy as deleteColumn,
  update as updateColumn
} from '../api/columns'
import { 
  update as updateCard,
  destroy as deleteCard
} from '../api/cards'
import {AddColumnForm} from './Functional/AddColumnForm'
import {ColumnHeader} from './Functional/ColumnHeader'


export class Trello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      colFormOpen : false,
      newColumnTitle : "",
      editCardOverlayStatus: false,
      editCardTitle : false,
      editedCard: {
        name: "",
        description : ''
      }
    }
    this.callStoreColumn = this.callStoreColumn.bind(this);
    this.callRetrieveColumns = this.callRetrieveColumns.bind(this);
    this.callUpdateColumn = this.callUpdateColumn.bind(this);
    this.callDeleteColumn = this.callDeleteColumn.bind(this);

    this.onStoreColumnKeyUp = this.onKeyUpStoreColumn.bind(this);
    this.toggleColForm = this.toggleColForm.bind(this);
    this.handleNewColumnTitleChange = this.handleNewColumnTitleChange.bind(this);
  }

  // lifecycle Hooks
  componentDidMount() {
    this.callRetrieveColumns()
  }

  // Api calls - columns
  callStoreColumn() {
    this.setState({newColumnTitle : ""})
    storeColumn(this.state.newColumnTitle)
      .then(() => {this.callRetrieveColumns();})
      .catch((e) => console.log("Error", e))
  }

  callRetrieveColumns() {
    retrieveColumns()
      .then((rawColumns) => {
        const columns = this.orderColumns(rawColumns)
        this.setState({columns})
      })
      .catch((e) => console.log("Error", e))
  }
  
  callUpdateColumn(id, payload) {
    updateColumn(id, payload)
      .then(() => {this.callRetrieveColumns()})
      .catch((e) => console.log("Error", e))
  }

  callDeleteColumn(colId) {
    deleteColumn(colId)
      .then(() => {this.callRetrieveColumns()})
      .catch((e) => console.log("Error", e))
  }

  // Api calls - Cards
  callUpdateCard() {
    updateCard(this.state.editedCard)
    .then((response => {
      this.callRetrieveColumns()
      this.closeEditCardModal()
    }))
    .catch((error) => {console.log("error", error)})
  }

  callDeleteCard() {
    deleteCard(this.state.editedCard.id)
    .then((response => {
      this.callRetrieveColumns()
      this.closeEditCardModal()
    }))
    .catch((error) => {console.log("error", error)})
  }

  // Key up actions
  onKeyUpStoreColumn(e) {
    e.preventDefault()
    if (e.keyCode === 13) {
      this.callStoreColumn()
    }
  }

  // Handlechange methods
  handleNewColumnTitleChange(e) {
    this.setState({
      newColumnTitle : e.target.value
    })
  }

  handleEditCardDescription(e) {
    const newState = {...this.state.editedCard, description: e.target.value}
    this.setState({ editedCard: newState })
  }

  handleEditCardTitle(e) {
    const newState = {...this.state.editedCard, name: e.target.value}
    this.setState({ editedCard: newState })
  }

  // Toggle methods
  toggleColForm() {
    this.setState(prevState => ({
      colFormOpen: !prevState.colFormOpen,
      newColumnTitle : ""
    }));
  }

  toggleEditCardTitle() {
    this.setState(prevState => ({
      editCardTitle: !prevState.editCardTitle,
    }));
  }

  openEditCardModal(card) {
    this.setState({
      editCardOverlayStatus : true,
      editedCard : card
    })
  }

  closeEditCardModal() {
    this.setState({
      editCardOverlayStatus : false,
    })
  }

  // Helpers
  orderColumns(rawColumns) {
    return rawColumns.sort((a, b) => {
      return b.order - a.order;
    });
  }
 
  render() {
    const columns = this.state.columns.map((col) => <Column 
        key={col.id} 
        column={col} 
        onDelete={(id) => this.callDeleteColumn(id)}
        onUpdate={(id, payload) => this.callUpdateColumn(id, payload)}
        openEditCardModal={(card) => this.openEditCardModal(card)}
        refreshColumns={() => this.callRetrieveColumns()}
      />
    );

    const addColumnForm = <AddColumnForm 
        newColumnTitle={this.state.newColumnTitle} 
        onChange={(e) => this.handleNewColumnTitleChange(e)}
        storeWithEnter={(e) => this.onKeyUpStoreColumn(e)}
        storeWithButton={this.callStoreColumn}
        closeEdit={this.toggleColForm}
      />
      
    const columnHeader = <ColumnHeader 
      text="Add a column"
      onToggle={this.toggleColForm}
      />

    const editCardDetailTitle = <input
      placeholder={this.state.editedCard.name}
      value={this.state.editedCard.name}
      onChange={(e) => this.handleEditCardTitle(e)}
    />

    return (
      <div className={this.state.editCardOverlayStatus ? 'no-scroll, pageContainer' : 'pageContainer'}>
        <TopBar />
        <div className="mainContainer">
          <div className="board">
            {columns}
            <div className="column column-header">
              {this.state.colFormOpen ? addColumnForm : columnHeader}
            </div>
          </div>
        </div>
        { this.state.editCardOverlayStatus && 
        <div className="card-detail-overlay">
          <div className="edit-card" onClick={(e) => this.toggleEditCardTitle(e)}>
            <div className="card-edit-title">
              { this.state.editCardTitle ? editCardDetailTitle : <h6 onClick={(e) => this.toggleEditCardTitle(e)}>{this.state.editedCard.name}</h6>}
              <span className="" onClick={(e) => this.closeEditCardModal(e)}>X</span>
            </div>
            <div className="card-edit-description">
                <h6>Description</h6>
                <textarea
                    value={this.state.editedCard.description}
                    placeholder="Give a more detailed description..."
                    onChange={(e) => this.handleEditCardDescription(e)}
                />
            </div>
            <div className="card-edit-buttons">
                <div onClick={() => this.callUpdateCard()} className="btn save-btn">Save</div>
                <div onClick={() => this.callDeleteCard()} className="btn delete-btn">Delete</div>
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
};
