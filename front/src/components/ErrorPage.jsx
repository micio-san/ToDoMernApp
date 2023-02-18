import React from 'react'
import { ImSad2 } from "react-icons/im"
import { Link } from "react-router-dom"

function ErrorPage() {
    return (
        <main>
            <div className='error-page'>
                <ImSad2 className='error-page_icon' />
                <h1>404</h1>
                <h3>page not found</h3>
                <p>
                    The page you are looking for does not exists.
                    <br />
                    <Link to="/"> Go back to the home page.</Link>
                </p>
            </div>
        </main>
    )
}

export default ErrorPage