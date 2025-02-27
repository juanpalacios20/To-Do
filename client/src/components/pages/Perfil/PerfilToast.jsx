import { PropTypes } from 'prop-types'

function PerfilToast(props) {

    PerfilToast.propTypes = {
        title: PropTypes.string.isRequired,
        numero: PropTypes.number.isRequired
    }

    return (
        <div className="PerfilContentStatsPendientesContainer flex flex-col py-4 px-4 size-fit rounded-xl transition-all duration-300 rounded-xl">
            <h4>{props.title}</h4>
            <h4 className="text-center">{props.numero}</h4>
        </div>
    )
}

export default PerfilToast