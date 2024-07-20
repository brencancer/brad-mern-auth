import { Link } from "react-router-dom"
import { FaExclamationTriangle } from 'react-icons/fa'
function NotFoundPage() {

    return (
        <section className="text-center flex flex-col justify-center items-center">
            <FaExclamationTriangle className="text-yellow-500 text-6xl mb-4" />
            <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
            <p>This page does not exist</p>
            <Link to="/" className="text-white bg-indigo-600 hover:bg-indigo-800 rounded px-3 py-2 mt-4 ">Go back</Link>
        </section>
    )
}

export default NotFoundPage