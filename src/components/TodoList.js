import React from "react";
import { dateFormat, opcaityTodo, statusTodo } from "../utility";
import { RiCloseCircleLine } from 'react-icons/ri';

const TodoList = ({ todos, completeTodo, user, handleDelete }) => {
  const userId = user?.uid;

  return todos?.map((item) => (
    <div
      className='todo-row' style={{ opacity: opcaityTodo(item.status)}}
      key={item.id}
    >
      <div key={item.id} onClick={() => completeTodo(item.id, item.status)}>
      [{dateFormat(item.dueDate)}]&emsp;{item.detail}
      </div>
      <div className='icons'>
        <div style={{ padding: '5px', fontSize: '20px', color: '#fff', backgroundColor: statusTodo(item.status), borderRadius: '5px' }}>{item.status}</div>
        &ensp;<RiCloseCircleLine
          onClick={() => handleDelete(item.id)}
          className='delete-icon'
        />
      </div>
    </div>
  ));
};

export default TodoList;