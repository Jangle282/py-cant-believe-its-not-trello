export function EditColumnForm(props) {
    return (
        <div className="edit-title-open, column-title-container">
            <input 
                value={props.title} 
                onChange={(e) => props.onChange(e)}
                onKeyUp={(e) => props.onKeyUp(e)}
            />
        </div>
    )
};