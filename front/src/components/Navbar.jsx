import React from 'react'
import { BsEmojiSunglassesFill } from "react-icons/bs"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav>
            <Link className='main-link' to="/"><BsEmojiSunglassesFill /><h1>ToDo App</h1></Link>
        </nav>
    )
}

export default Navbar