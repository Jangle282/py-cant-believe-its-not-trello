export function AddColumnForm(props) {
    return (
        <div className="addColForm">
            <input
                value={props.newColumnTitle}
                type="text"
                name="title"
                id="title"
                onChange={(e) => props.onChange(e)}
                onKeyUp={(e) => props.storeWithEnter(e)}
            />
            <div onClick={() => props.storeWithButton()}>Add</div>
            <div onClick={() => props.closeEdit()}>X</div>
      </div>
    )
};