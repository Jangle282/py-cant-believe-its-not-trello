import {Component} from 'react'
import {Column} from './Column'
import {TopBar} from './TopBar'
import {
  retrieve as retrieveColumns, 
  store as storeColumn,
  destroy as deleteColumn,
  update as updateColumn
} from '../api/columns'
import {AddColumnForm} from './Functional/AddColumnForm'
import {ColumnHeader} from './Functional/ColumnHeader'


export class Trello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      colFormOpen : false,
      newColumnTitle : "",
      cardEditOverlayStatus: false,
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
      colFormOpen: !prevState.colFormOpen,
      newColumnTitle : ""
    }));
  }

  orderColumns(rawColumns) {
    return rawColumns.sort((a, b) => {
      return b.order - a.order;
    });
  }

  render() {
    const Columns = this.state.columns.map((col) => <Column 
        key={col.id} 
        column={col} 
        onDelete={(id) => this.callDeleteColumn(id)}
        onUpdate={(id, payload) => this.callUpdateColumn(id, payload)}
      />
    );

    const AddColForm = <AddColumnForm 
        newColumnTitle={this.state.newColumnTitle} 
        onChange={(e) => this.handleNewColumnTitleChange(e)}
        storeWithEnter={(e) => this.onKeyUpStoreColumn(e)}
        storeWithButton={this.callStoreColumn}
        closeEdit={this.toggleColForm}
      />
      
    const ColHeader = <ColumnHeader 
      text="Add a column"
      onToggle={this.toggleColForm}
      />

    return (
      <div className={this.state.cardEditOverlayStatus ? 'no-scroll, pageContainer' : 'pageContainer'}>
        <TopBar />
        <div className="mainContainer">
          <div className="board">
            {Columns}
            <div className="column column-header">
              {this.state.colFormOpen ? AddColForm : ColHeader}
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
