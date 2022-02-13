export function ColumnHeader(props) {
    return <div onClick={() => props.onToggle()} className="column-title-container">
                <h6>{props.text}</h6>
            </div>
           
}