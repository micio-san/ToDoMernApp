import React, { useState } from 'react'
import { FaRegEdit, FaTrash } from "react-icons/fa"
import { MdDoneOutline } from "react-icons/md"
import { Link } from "react-router-dom"
import axios from "axios"

function TodoSmol({ item }) {
    const weekName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekDay = () => item.time.day.sort();
    const dayArray = () => weekDay().map(num => weekName[num - 1])
    const [compl, setCompl] = useState(item.completed)
    const [del, setDel] = useState(false)

    const deleteTodo = () => {
        setDel(true)
        axios.delete(`http://localhost:5000/post/${item._id}`)
    }

    const completedTodo = () => {
        setCompl(prev => !prev)
        axios.patch(`http://localhost:5000/post/${item._id}`, { "completed": item.completed })
    }

    if (!del) return (
        <article className={compl ? 'todo-smol_container completed' : 'todo-smol_container'}>
            <div className="text-article_container">
                <div className='text-icon_container'>
                    <h2>{item.title}</h2>
                    <div className="icon-article_container">
                        <button onClick={() => completedTodo()} > <MdDoneOutline /></button>
                        <Link to={`/post/${item._id}`} ><button> <FaRegEdit /></button></Link>
                        <button onClick={() => deleteTodo()}> <FaTrash /></button>
                    </div>
                </div>
                <p>{item.text}</p>
            </div>
            <div className="date-article_container">
                <h3>{item.time.hr}:{item.time.mins}</h3>
                <p>{dayArray().join("/")}</p>
            </div>
        </article>
    )
}

export default TodoSmol