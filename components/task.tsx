import { observer } from 'mobx-react-lite';
import { useLocalObservable } from 'mobx-react';
import { useState } from 'react'
import { TaskStore } from './store'


const TaskApp = observer(() => {

    const store = useLocalObservable(() => TaskStore.create({ tasks: [] }));
    const [data, setData] = useState({title: '', description: ''});

    const handleSubmit = (e:any) => {
        e.preventDefault();

        // Storing the data 
        store.addTask(data.title, data.description);
        setData({title: '', description: ''});
    }

    // Getting the data on every input change
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
  
    // Calling the toggle function for changing the status
    const handleToggleTask = (task:any) => {
        task.toggle();
    };
  

    // Removing the task
    const handleRemoveTask = (task:any) => {
        store.removeTask(task);
    };
  
    return (
      <div className=''>
          <div style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className='p-[10px] w-[50%] lg:w-[30%] sm:w-[60%]  my-[30px] mx-[auto] rounded-lg'>
              <h1 className='text-center text-4xl py-[30px]'>My Task</h1>
              <form onSubmit={handleSubmit} className='p-[10px]' action="">
                  <h5 className="block text-xl py-[10px] font-medium leading-6 text-gray-900">Title <span className='text-red-500'>*</span></h5>
                  <input className='border border-solid px-[10px] outline-none border-gray-500 rounded mb-[20px] h-[40px] w-[100%]' required={true} name='title' value={data.title} onChange={handleChange} type="text" />
            
                  <label className="block text-xl py-[10px] font-medium leading-6 text-gray-900">Description <span className='text-red-500'>*</span></label>
                  <textarea required className='border border-solid outline-none border-gray-500 rounded px-[10px] pt-[5px] w-[100%] h-[100px]' name='description' value={data.description} onChange={handleChange} />
            
                  <button className='m-auto my-[20px] mt-[40px] w-[50%] rounded-md py-[10px] bg-[#129ffd] block text-xl hover:bg-[#0066ff] text-white ' type='submit'>Add Task</button>
              </form>
          </div>
          <div className=''>
            {
              store.tasks.length > 0 ? <div className='p-[30px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {store.tasks.map((task) => (
                  <div className='border border-solid border-gray-100 relative p-[10px] shadow-md rounded' key={task.id}>
                      <h3 className='text-center text-2xl mb-[10px]'>{task.title}</h3>
                      <h4 className='text-center'>{task.description}</h4>
                      <button className={task.status ? 'text-white rounded py-[5px] px-[20px] bg-[green] mt-[15px] block m-auto' : 'text-white rounded py-[5px] px-[20px] bg-[#0066ff] mt-[15px] block m-auto'} onClick={() => handleToggleTask(task)}>{task.status ? "completed":'Not completed'}</button>
                      <br />
                      <button className='rounded py-[5px] px-[20px] bg-[red] text-white mb-[10px] block m-auto' onClick={() => handleRemoveTask(task)}>Delete</button>
                  </div>
            ))}
              </div> : 
              <h2 className='text-center text-2xl my-[30px]'>No Task to show, Please add task</h2>
            }
          </div>
      </div>
    );
  });
  
  export default TaskApp;
  
  
  
  
  
  
  


