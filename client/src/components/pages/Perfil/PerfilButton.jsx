import { PropTypes } from 'prop-types'

function PerfilButton(props) {

    PerfilButton.propTypes = {
        children: PropTypes.node.isRequired
    }

    return (
        <button className="PerfilContentButton EmailButton text-3xl  py-4 px-14 Transition transition-all duration-300 rounded-xl" {...props}>
            {props.children}
        </button>
    )
}

export default PerfilButton