import { Component } from 'react'
import { Column } from './Column'
import { TopBar } from './TopBar'
import { AddColumnForm } from './Functional/AddColumnForm'
import { ColumnHeader } from './Functional/ColumnHeader'
import { EditCardForm } from './Functional/EditCardForm'
import {
  retrieve as retrieveColumns,
  store as storeColumn,
  destroy as deleteColumn,
  update as updateColumn,
  saveColumnOrder

} from '../api/columns'
import {
  update as updateCard,
  destroy as deleteCard
} from '../api/cards'

export class Trello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      colFormOpen: false,
      newColumnTitle: "",
      editCardOverlayStatus: false,
      editCardTitle: false,
      editedCard: {
        name: "",
        description: ''
      },
      colDragStatus: false,
      colDragged: null,
      colDragTarget: null,
      updateColumnOrderProgress: false,
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
    const lastCol = this.state.columns[this.state.columns.length - 1]
    storeColumn(this.state.newColumnTitle, lastCol.order + 1)
      .then(() => { 
        this.callRetrieveColumns(); 
      })
      .catch((e) => console.log("Error", e))
      .finally(() => {
        this.setState({ newColumnTitle: ""})
      })
  }

  callRetrieveColumns() {
    retrieveColumns()
      .then((rawColumns) => {
        const columns = this.orderColumns(rawColumns)
        this.setState({ columns })
      })
      .catch((e) => console.log("Error", e))
  }

  callUpdateColumn(id, payload) {
    updateColumn(id, payload)
      .then(() => { this.callRetrieveColumns() })
      .catch((e) => console.log("Error", e))
  }

  callDeleteColumn(colId) {
    deleteColumn(colId)
      .then(() => { this.callRetrieveColumns() })
      .catch((e) => console.log("Error", e))
  }

  // Api calls - Cards
  callUpdateCard() {
    updateCard(this.state.editedCard)
      .then((response => {
        this.callRetrieveColumns()
        this.closeEditCardModal()
      }))
      .catch((error) => { console.log("error", error) })
  }

  callDeleteCard() {
    deleteCard(this.state.editedCard.id)
      .then((response => {
        this.callRetrieveColumns()
        this.closeEditCardModal()
      }))
      .catch((error) => { console.log("error", error) })
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
      newColumnTitle: e.target.value
    })
  }

  handleEditCardDescription(e) {
    const newState = { ...this.state.editedCard, description: e.target.value }
    this.setState({ editedCard: newState })
  }

  handleEditCardTitle(e) {
    const newState = { ...this.state.editedCard, name: e.target.value }
    this.setState({ editedCard: newState })
  }

  // Toggle methods
  toggleColForm() {
    this.setState(prevState => ({
      colFormOpen: !prevState.colFormOpen,
      newColumnTitle: ""
    }));
  }

  toggleEditCardTitle() {
    this.setState(prevState => ({
      editCardTitle: !prevState.editCardTitle,
    }));
  }

  openEditCardModal(card) {
    this.setState({
      editCardOverlayStatus: true,
      editedCard: card
    })
  }

  closeEditCardModal() {
    this.setState({
      editCardOverlayStatus: false,
    })
  }

  // Helpers
  orderColumns(rawColumns) {
    return rawColumns.sort((a, b) => {
      return a.order - b.order;
    });
  }

  // Column dragging
  colDragStart(e, column) {
    console.log("drag start", column, e)
    if (e.target.id === 'column') {
      this.setState({
        colDragStatus: true,
        colDragged: column
      })
    }
  }

  colDragEnter(e, column) {
    if (this.state.colDragStatus) {
      e.preventDefault();
      this.setState({
        colDragTarget: column
      }, this.spliceColumns())
    }
  }

  colDragOver(e) {
    if (this.state.colDragStatus) {
      e.preventDefault();
    }
  }

  colDrop(e) {
    if (this.state.colDragStatus) {
      const columnOrder = this.state.columns.map((col, index) => {
        let id = col.id
        return { id, index }
      })
      console.log("ordering object", columnOrder)

      this.setState({
        updateColumnOrderProgress: true
      })

      saveColumnOrder(columnOrder)
        .then((response) => {
          this.callRetrieveColumns()
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
          this.setState({
            updateColumnOrderProgress: false
          })
        })
    }
  }

  colDragEnd(e) {
    if (e.target.id === 'column') {
      this.setState({
        colDragStatus: false,
        colDragged: null,
        colDragTarget: null
      })
      // and order columns again...?
    }
  }

  spliceColumns() {
    const targetIndex = this.state.columns.findIndex((col) => {
      return col.id === this.state.colDragTarget?.id
    })
    const draggedIndex = this.state.columns.findIndex((col) => {
      return col.id === this.state.colDragged?.id
    })
    this.state.columns.splice(targetIndex, 0, this.state.columns.splice(draggedIndex, 1)[0])

  }

  render() {
    const columns = this.state.columns.map((col) => <Column
      key={col.id}
      column={col}
      colDragStatus={this.state.colDragStatus}
      draggedCol={this.state.colDragged}
      dragTargetCol={this.state.colDragTarget}
      openEditCardModal={(card) => this.openEditCardModal(card)}
      onDelete={(id) => this.callDeleteColumn(id)}
      onUpdate={(id, payload) => this.callUpdateColumn(id, payload)}
      refreshColumns={() => this.callRetrieveColumns()}
      colDragStart={(e, column) => this.colDragStart(e, column)}
      colDragEnter={(e, column) => this.colDragEnter(e, column)}
      colDragEnd={(e) => this.colDragEnd(e)}
      colDragOver={(e) => this.colDragOver(e)}
      colDrop={(e) => this.colDrop(e)}
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

    const editCardForm = <EditCardForm
      toggleEditCardTitle={(e) => this.toggleEditCardTitle(e)}
      title={this.state.editCardTitle}
      editCardDetailTitle={editCardDetailTitle}
      card={this.state.editedCard}
      closeEditCardModal={(e) => this.closeEditCardModal(e)}
      handleEditCardDescription={(e) => this.handleEditCardDescription(e)}
      callUpdateCard={() => this.callUpdateCard()}
      callDeleteCard={() => this.callDeleteCard()}
    />

    return (
      <div className={this.state.editCardOverlayStatus ? 'no-scroll pageContainer' : 'pageContainer'}>
        <TopBar />
        <div className="mainContainer">
          <div className="board">
            {columns}
            <div className="column column-header">
              {this.state.colFormOpen ? addColumnForm : columnHeader}
            </div>
          </div>
        </div>
        {this.state.editCardOverlayStatus && editCardForm}
      </div>
    )
  }
};
