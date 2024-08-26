import { PropTypes } from 'prop-types'

function AgregarCategoria(props) {

    AgregarCategoria.propTypes = {
        open: PropTypes.bool.isRequired
    }

    if (props.open) {
        return (
            <div className="AgregarCategoriaContainer flex max-w-full">
                <div className="AgregarCategoria flex flex-row m-auto mx-6 my-2 max-w-full content-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="AgregarCategoriaIcon size-10 m-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    <input className="rounded-xl text-4xl max-w-full p-2 pl-16" type="text" {...props} />
                </div>
            </div>
        )
    } else {
        return null

    }
}

export default AgregarCategoria