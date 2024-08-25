import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'

function NavButton(props) {

    NavButton.propTypes = {
        children: PropTypes.node.isRequired,
        text: PropTypes.string.isRequired
    }

    const navigate = useNavigate()

    const PerfilNavigate = () => {
        navigate('/profile')
    }

    return (
        <div className="NavButtonButton flex flex-col justify-center items-center w-full">
            <button onClick={PerfilNavigate} className=" flex text-4xl text-center w-full p-4 m-2 border-y-2 rounded-2xl">
                <div className="NavButtonIcon">
                    {props.children}
                </div>
                {props.text}
            </button>
        </div>
    )
}

export default NavButton