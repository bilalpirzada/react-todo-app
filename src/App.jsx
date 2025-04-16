import { useState } from 'react'
import './App.css'
import {Header} from './Components/Header.jsx'

function App() {
  let [taskInput, setTaskInput] = useState(""); 
  let [tasksArray, setTasksArray] = useState([]);


  function handleInput(event){
    setTaskInput(event.target.value);
  }

  function handleAddTask(){
    if(taskInput){
      setTasksArray((prevTasks)=>{return [...prevTasks,{'taskName':taskInput,'checked':false}]});
    }
    

    setTaskInput(""); // clear task input after adding 
    console.log(tasksArray);
  }

  function handleDelete(indexToDelete){
    let updatedTasks = tasksArray.filter((_,index)=>index!==indexToDelete);

    setTasksArray(updatedTasks);
  }

  function handleCheckbox(checkboxIndex){
    setTasksArray(prevTasks => {
      let updatedTask = [...prevTasks]
      updatedTask[checkboxIndex]={
        taskName: updatedTask[checkboxIndex].taskName,
        checked: !updatedTask[checkboxIndex].checked
      };
      return updatedTask;
    })
  }

  function handleKeyDown(event){
    if(event.key==='Enter'){
      handleAddTask();
    }
  }

  return <>
 <Header/>
  
  <div className='mb-5'>
    <input 
      value={taskInput} 
      onChange={handleInput}
      onKeyDown={handleKeyDown} 
      className="bg-amber-50 rounded-4xl py-2 text-gray-800 w-100 px-4"
    />
    <button 
      className="ml-2 px-3.5 py-2.5 bg-[#27AE60] rounded-4xl hover:cursor-pointer hover:scale-105" 
      onClick={handleAddTask}>
        ╋
    </button>
  </div>
  
  
    <ul className={'mt-10 flex flex-col bg-[#2C2C2C] rounded-2xl' + tasksArray.length>0?'px-5 pt-5 pb-3':''}>
    
    {tasksArray.map((task,index)=>{
       return <li key={index} className='text-xl mb-3 flex justify-between items-center bg-[#f5f5f522] p-5 rounded-2xl'>
        
        
        <div 
        className='w-full flex justify-start'
          style={
            {
              textDecoration: task.checked ? 'line-through' : 'none'
            }
          }>
            <label  className='flex justify-start items-center hover:bg-[#f5f5f536] w-full p-1 rounded-xl hover:cursor-pointer'>
              <input 
              type='checkbox' 
              onChange={()=>handleCheckbox(index)} 
              checked={task.checked} 
              className='mr-3 h-6 w-6'
              />
              {task.taskName}
            </label>
        </div>
        <div className='inline-block'>
          {/* <button className='bg-blue-400 rounded-2xl px-4 py-2'>Edit</button> */}
          <button className='bg-red-400 rounded-2xl px-4 py-2 ml-2' onClick={()=>handleDelete(index)}>🗑</button>
        </div>
        </li>
    })}
    </ul>

  </>
}

export default App
