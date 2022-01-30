export function AddColumn(props) {
    return <div className="column-header">
                <div onClick={() => props.onToggle()} className="column-title-container">
                    <h6>Add a Column</h6>
                </div>
            </div>
}