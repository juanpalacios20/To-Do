import { PropTypes } from 'prop-types'

function ListCardButton(props) {

    ListCardButton.propTypes = {
        text: PropTypes.string.isRequired
    }

    return (
        <button {...props} className="ListCardButtonButton w-full h-fit text-wrap text-2xl p-2 rounded-lg Transition2 transition-all duration-300">
            {props.text}
        </button>
    )
}

export default ListCardButton