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
  
  
    <ol className='mt-10 flex justify-start'>
    
    {tasksArray.map((task,index)=>{
       return <li key={index}>{task}</li>
    })}
    </ol>

  </>
}

export default App
