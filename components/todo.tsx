import { observer } from 'mobx-react-lite';
import { useLocalObservable } from 'mobx-react';

import { useState } from 'react'
import { TodoStore } from './store'


const TodoApp = observer(() => {
    const store = useLocalObservable(() => TodoStore.create({ todos: [] }));
    const [data, setData] = useState({title: '', description: ''});

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log(data, 'data');
        store.addTodo(data.title, data.description);

        setData({title: '', description: ''});
    }

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
  
    const handleToggleTodo = (todo:any) => {
        todo.toggle();
    };
  
    const handleRemoveTodo = (todo:any) => {
        store.removeTodo(todo);
    };
  
    return (
      <div className='border-black border-2 border-solid'>
        <h1 className='text-center text-5xl py-[30px]'>Todo App</h1>
        <div className='border-red-700 border-2 border-solid'>
          <form className='border-blue-700 border-2 border-solid' action="">
            <input className='' name='title' value={data.title} onChange={handleChange} type="text" placeholder='title' />
            <br />
            <input className='' name='description' value={data.description} onChange={handleChange} type="text" placeholder='description' />
            <br />
            <button className='' type='submit' onClick={handleSubmit}>Add Todo</button>
          </form>
        </div>

        <div>
            {store.todos.map((todo) => (
                <div key={todo.id}>
                <h3 >{todo.title}</h3>
                <h4>{todo.description}</h4>
                <button onClick={() => handleToggleTodo(todo)}>{todo.status ? "completed":'Not completed'}</button>
                <br />
                <button onClick={() => handleRemoveTodo(todo)}>Delete</button>
            </div>
            ))}
        </div>
      </div>
    );
  });
  
  export default TodoApp;
  
  
  
  
  
  
  


