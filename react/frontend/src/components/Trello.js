import {Component} from 'react'
import {Column} from './Column'
import {TopBar} from './TopBar'
import {retrieve as retrieveColumns} from '../api/columns'


export class Trello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardEditOverlayStatus: false,
      columns: []
    }
  }

  componentDidMount() {
    retrieveColumns().then((rawColumns) => {
      const columns = this.orderColumns(rawColumns)
      this.setState({columns})
    })
  }

  orderColumns(rawColumns) {
    return rawColumns.sort((a, b) => {
      return a.order - b.order;
    });
  }

  render() {
    const Columns = this.state.columns.map((col) => <Column key={col.id} column={col}/>);

    return (
      <div className={this.state.cardEditOverlayStatus ? 'no-scroll, pageContainer' : 'pageContainer'}>
        <TopBar />
        <div className="mainContainer">
          <div className="board">
            {Columns}
            {/* <div class="column">
              <div v-if="colFormOpen" class="addColForm">
                <input
                  v-model="newColData.name"
                  type="text"
                  name="title"
                  id="title"
                  ref="colTitle"
                // @keyup.enter="storeColumn"
                />
                <div onClick="storeColumn">Add</div>
                <div onClick="toggleColForm">X</div>
              </div>
              <div v-else class="column-header">
                <div onClick="toggleColForm" class="column-title-container">
                  <h6>Add a Column</h6>
                </div>
              </div>
            </div> */}
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
