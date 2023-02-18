import axios from 'axios';
import React, { useState, useEffect } from 'react'
import TodoSmol from "./TodoSmol"
import LoadingWheel from './LoadingWheel';

function TodoList() {
    const [list, setList] = useState([]);


    const fetchData = () => {
        axios.get("http://localhost:5000/")
            .then(res => setList(res.data.todos))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className='todoList'>
            {
                list && list.length !== 0 ? list.map(item => {
                    return <TodoSmol key={item._id} item={item} />
                }) : <LoadingWheel />
            }
        </section>
    )
}

export default TodoList