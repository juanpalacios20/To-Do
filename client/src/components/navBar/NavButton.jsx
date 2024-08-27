import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'

function NavButton(props) {

    NavButton.propTypes = {
        children: PropTypes.node.isRequired,
        text: PropTypes.string.isRequired,
        redirectTo: PropTypes.string.isRequired,
        cerrar: PropTypes.any,
        menu: PropTypes.bool
    }

    const navigate = useNavigate()

    const PerfilNavigate = () => {
        navigate(`/${props.redirectTo}`)
    }

    return (
        <div className="NavButtonButton flex flex-col">
            <div className="flex flex-row justify-center items-center w-full pl-2 pr-12">
                <button onClick={() => { PerfilNavigate(), props.cerrar() }} className=" flex text-4xl text-center w-[90%] p-4 m-2 transition-all duration-300 rounded-lg">
                    <div className="NavButtonIcon">
                        {props.children}
                    </div>
                    {props.text}
                </button>
                {props.menu ?
                    <button className="NavButtonBorra rounded-full p-2 Transition transition-all duration-300" onClick={() => { console.log('borrar') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="NavButtonBorraIcon size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default NavButton