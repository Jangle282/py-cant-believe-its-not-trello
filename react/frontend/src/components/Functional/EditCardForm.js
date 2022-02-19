export function EditCardForm(props) {
    return (<div className="card-detail-overlay">
                <div 
                    className="edit-card" 
                    onClick={(e) => props.toggleEditCardTitle(e)}
                >
                    <div className="card-edit-title">
                        { props.title 
                            ? props.editCardDetailTitle 
                            : <h6 
                                onClick={(e) => props.toggleEditCardTitle(e)}
                                >{props.card.name}</h6>}
                            <span onClick={(e) => props.closeEditCardModal(e)}>X</span>
                    </div>
                    <div className="card-edit-description">
                        <h6>Description</h6>
                        <textarea
                            value={props.card.description}
                            placeholder="Give a more detailed description..."
                            onChange={(e) => props.handleEditCardDescription(e)}
                        />
                    </div>
                    <div className="card-edit-buttons">
                        <div onClick={() => props.callUpdateCard()} className="btn save-btn">Save</div>
                        <div onClick={() => props.callDeleteCard()} className="btn delete-btn">Delete</div>
                    </div>
                </div>
            </div>
  )
};