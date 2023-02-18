import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios'
import LoadingWheel from './LoadingWheel'

function TodoPage() {
    const { id } = useParams()
    const [text, setText] = useState("")
    const [title, setTitle] = useState("")
    const [todo, setTodo] = useState()
    const [day, setDay] = useState([])
    const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const days = [1, 2, 3, 4, 5, 6, 7]
    const [hr, setHr] = useState()
    const [mins, setMins] = useState()
    const navigator = useNavigate()

    const fetchTodo = () => {
        axios.get(`http://localhost:5000/post/${id}`)
            .then(data => {
                setTodo(data.data)
                setText(data.data.text)
                setTitle(data.data.title)
                setMins(data.data.time.mins)
                setHr(data.data.time.hr)
                setDay(data.data.time.day)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchTodo()
    }, [])

    function checked(num) {
        for (let i = 0; i <= day.length; i++) {
            if (num === day[i]) return true
        }
        return false
    }

    function editTodo(e) {
        axios.patch(`http://localhost:5000/postpatch/${id}`, {
            "time": {
                "hr": hr,
                "mins": mins,
                "day": day,
            },
            "title": title,
            "text": text
        });
        navigator("/")
    }

    return (
        <main>
            <h1>Edit ToDo</h1>
            {
                todo ? <form action="">
                    <div className="text-container">
                        <input defaultValue={title} onChange={(e) => setTitle(e.target.value)} required maxLength="15" className='title' type="text" />
                        <textarea defaultValue={text} onChange={(e) => setText(e.target.value)} maxLength="268" className='text'></textarea>
                    </div>
                    <div className="num-container">
                        <input onChange={(e) => setHr(e.target.value)} defaultValue={hr} type="number" min="00" max="23" name="hours" id="hours" />
                        <input onChange={(e) => setMins(e.target.value)} defaultValue={mins} type="number" min="00" max="59" name="mins" id="mins" />
                    </div>
                    <div className="week-container">
                        {
                            days.map(num => {
                                return <div key={num} className="day-container">
                                    <input defaultChecked={checked(num)} id='inp' value={num} type="checkbox" />
                                    <label htmlFor="inp">{weekday[num - 1]}</label>
                                </div>
                            })
                        }
                    </div>
                    <button onClick={(e) => editTodo(e)} type='submit' id='main-btn'>edit todo</button>
                </form> : <LoadingWheel />
            }
        </main>
    )
}

export default TodoPage