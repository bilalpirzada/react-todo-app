import { useState } from 'react'
import './App.css'

function App() {
  let [taskInput, setTaskInput] = useState(""); 
  let [tasksArray, setTasksArray] = useState([]);


  function handleInput(event){
    setTaskInput(event.target.value);
  }

  function handleAddTask(){
    if(taskInput){
      setTasksArray((prevTasks)=>{return [...prevTasks,taskInput]});
      setTaskInput(""); // clear task input after adding 
    }
    console.log(tasksArray);
  }

  function handleDelete(indexToDelete){
    let updatedTasks = tasksArray.filter((_,index)=>index!==indexToDelete);

    setTasksArray(updatedTasks);
  }

  return <>
  <h1 
    className=" text-green-400 mb-20">
    React Todo App
  </h1>
  <div>
    <input 
      value={taskInput} 
      onChange={handleInput} 
      className="bg-amber-50 rounded-4xl py-4 text-gray-800 w-100 px-6 text-xl"
    />
    <button 
      className="ml-5 px-8 py-4 bg-green-600 rounded-4xl" 
      onClick={handleAddTask}>
        Add
    </button>
  </div>
  
  
    <ul className='mt-10 flex flex-col'>
    
    {tasksArray.map((task,index)=>{
       return <li key={index} className='text-2xl mb-3 flex justify-between items-center bg-slate-900 p-5 rounded-2xl'>
        <div className='inline-block'>{task}</div>
        <div className='inline-block'>
          <button className='bg-blue-400 rounded-2xl px-4 py-2'>Edit</button>
          <button className='bg-red-400 rounded-2xl px-4 py-2 ml-2' onClick={()=>handleDelete(index)}>Delete</button>
        </div>
        </li>
    })}
    </ul>

  </>
}

export default App
