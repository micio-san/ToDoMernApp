import React, { useState } from 'react'
import TodoList from './TodoList'
import axios from "axios"

function Form() {
    const date = new Date()
    const hrNow = date.getHours() + 1
    const minNow = date.getMinutes()
    const dayNow = date.getDay()
    const days = [1, 2, 3, 4, 5, 6, 7]
    const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [hr, setHr] = useState(hrNow)
    const [mins, setMins] = useState(minNow)
    const [day, setDay] = useState([dayNow])

    function handleClick(e) {
        const current = e.target
        if (current.checked) {
            setDay(prev => [...prev, Number(current.value)])
        } else {
            setDay(prev => {
                return prev.filter(d => {
                    return d !== Number(current.value)
                })
            })
        }
    }

    function postTodo(e) {
        axios.post("http://localhost:5000/", {
            "title": title,
            "text": text,
            "time": {
                "hr": hr,
                "mins": mins,
                "day": day
            },
            "completed": false
        })

        //reset values
        setTitle("")
        setText("")
        setHr(hrNow)
        setMins(minNow)
        setDay([day])
    }

    return (
        <main>
            <form>
                <div className="text-container">
                    <input onChange={(e) => setTitle(e.target.value)} required maxLength="15" className='title' type="text" />
                    <textarea onChange={(e) => setText(e.target.value)} maxLength="268" className='text'></textarea>
                </div>
                <div className="num-container">
                    <input onChange={(e) => setHr(e.target.value)} defaultValue={hrNow} placeholder={hrNow} type="number" min="00" max="23" name="hours" id="hours" />
                    <input onChange={(e) => setMins(e.target.value)} defaultValue={minNow} placeholder={minNow} type="number" min="00" max="59" name="mins" id="mins" />
                </div>
                <div className="week-container">
                    {
                        days.map(num => {
                            return <div key={num} className="day-container">
                                <input onClick={(e) => handleClick(e)} defaultChecked={num === dayNow ? true : false} id='inp' value={num} type="checkbox" />
                                <label htmlFor="inp">{weekday[num - 1]}</label>
                            </div>
                        })
                    }
                </div>
                <button onClick={(e) => postTodo(e)} type='submit' id='main-btn'>add todo</button>
            </form>
            <TodoList />
        </main >
    )
}

export default Form