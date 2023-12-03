import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import Create from './Create';

export default function Home() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.error(err))
  }, [])

  const handleEdit = (id) => {
    axios.put('http://localhost:3001/update/' + id)
      .then(result => {
        location.reload();
      })
      .catch(err => console.error(err))
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/delete/' + id)
      .then(result => {
        location.reload();
      })
      .catch(err => console.error(err))
  }

  return (
    <div className='main'>
      <h2>Todo List</h2>
      <Create />

      {
        todos.length === 0 ?
          <div><h2>No Record</h2></div>
          :
          todos.map(todo => (
            <div className='todo-task'>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                {todo.done ?
                  <BsFillCheckCircleFill className='icon'  />
                  : <BsCircleFill className='icon' />}
                <span className={todo.done ? "line_through" : ""}> {todo.task}</span>
              </div>
              <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
            </div>
          ))
      }
    </div>
  )
}
