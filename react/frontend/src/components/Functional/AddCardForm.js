export function AddCardForm(props) {
    return (<div className={props.colDragInProgress ? 'add-card-form, pointer-none' : 'add-card-form'}>
        <input
            value={props.name}
            placeholder='Add a card'
            type="text"
            name="title"
            id="title"
            onKeyUp={(e) => props.storeCardOnKeyUp(e)}
            onChange={(e) => props.handleCardTitleInput(e)}
        />
        <div onClick={(e) => props.callStoreCard(e)}>Add</div>
        <div onClick={(e) => props.toggleAddCardForm(e)}>X</div>
        <div>...</div>
    </div>
    )
};