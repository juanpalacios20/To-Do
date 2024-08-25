function PerfilModal(props) {

    if (props.state === true) {
        return (
            <div>
                <div onMouseOut={() => props.toggleOff(false)}>
                <h1>Modal</h1>
                <button onClick={() => props.toggleOff(false)}>Close</button>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default PerfilModal