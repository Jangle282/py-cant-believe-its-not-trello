import {Component} from 'react'
import {Column} from './Column'
import {TopBar} from './TopBar'
import {retrieve as retrieveColumns} from '../api/columns'
import {store as storeColumn} from '../api/columns'
import {destroy as deleteColumn} from '../api/columns'
import {update as updateColumn} from '../api/columns'


export class Trello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardEditOverlayStatus: false,
      columns: [],
      colFormOpen : false,
      newColumnTitle : ""
    }
    this.callStoreColumn = this.callStoreColumn.bind(this);
    this.callRetrieveColumns = this.callRetrieveColumns.bind(this);
    this.callUpdateColumn = this.callUpdateColumn.bind(this);
    this.callDeleteColumn = this.callDeleteColumn.bind(this);

    this.onStoreColumnKeyUp = this.onKeyUpStoreColumn.bind(this);
    this.toggleColForm = this.toggleColForm.bind(this);
    this.handleNewColumnTitleChange = this.handleNewColumnTitleChange.bind(this);
  }

  componentDidMount() {
    this.callRetrieveColumns()
  }

  callStoreColumn() {
    storeColumn(this.state.newColumnTitle)
      .then(() => {this.callRetrieveColumns();})
      .catch((e) => console.log("Error", e))
  }

  callRetrieveColumns() {
    retrieveColumns().then((rawColumns) => {
      const columns = this.orderColumns(rawColumns)
      this.setState({columns})
    })
  }
  
  callUpdateColumn(id, payload) {
    updateColumn(id, payload)
      .then(() => {
        this.callRetrieveColumns()
      })
      .catch((e) => console.log("Error", e))
  }

  callDeleteColumn(colId) {
    deleteColumn(colId)
    .then(() => {this.callRetrieveColumns()})
    .catch((e) => console.log("Error", e))
  }

  onKeyUpStoreColumn(e) {
    e.preventDefault()
    if (e.keyCode === 13) {
      this.callStoreColumn()
    }
  }

  handleNewColumnTitleChange(e) {
    this.setState({
      newColumnTitle : e.target.value
    })
  }

  toggleColForm() {
    this.setState(prevState => ({
      colFormOpen: !prevState.colFormOpen
    }));
  }

  orderColumns(rawColumns) {
    return rawColumns.sort((a, b) => {
      return b.order - a.order;
    });
  }

  render() {
    const Columns = this.state.columns.map((col) => 
      <Column 
        key={col.id} 
        column={col} 
        onDelete={(id) => this.callDeleteColumn(id)}
        onUpdate={(id, payload) => this.callUpdateColumn(id, payload)}
      />
    );

    const AddColumnForm =  
      <div className="addColForm">
        <input
          value={this.state.newColumnTitle}
          type="text"
          name="title"
          id="title"
          onChange={this.handleNewColumnTitleChange}
          onKeyUp={(e) => this.onKeyUpStoreColumn(e)}
        />
        <div onClick={this.callStoreColumn}>Add</div>
        <div onClick={this.toggleColForm}>X</div>
      </div>
    const AddColumn = 
      <div className="column-header">
        <div onClick={this.toggleColForm} className="column-title-container">
        <h6>Add a Column</h6>
        </div>
      </div>

    return (
      <div className={this.state.cardEditOverlayStatus ? 'no-scroll, pageContainer' : 'pageContainer'}>
        <TopBar />
        <div className="mainContainer">
          <div className="board">
            {Columns}
            <div className="column">
              {this.state.colFormOpen ? AddColumnForm : AddColumn}
            </div>
          </div>
        </div>
      {/* <div v-if="cardEditOverlayStatus" class="card-detail-overlay" @click.stop="closeEditCardOverlay">
          <div class="edit-card" @keyup.enter="updateCard" @click.stop="closeEditTitle">
              <div class="card-edit-title">
                  <h6 v-if="!editCardTitle" @click.stop="openEditCardTitle">{{editedCard.name}}"</h6>
                  <input
                      v-if="editCardTitle"
                      :placeholder="editedCard.name"
                      v-model="editedCard.name"
                      @keyup.enter="editCardTitle = false"
                  />
                  <span class="" @click="closeEditCardOverlay">X</span>
              </div>

              <div class="card-edit-description">
                  <h6>Description</h6>
                  <textarea
                      v-model="editedCard.description"
                      placeholder="Give a more detailed description..."
                  />
              </div>
              <div class="card-edit-buttons">
                  <div @click="updateCard" class="btn save-btn">Save</div>
                  <div @click="deleteCard" class="btn delete-btn">Delete</div>
              </div>
          </div> */}
      {/* </div> */}
  </div>
    )
  }
};
