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

  return <>
  <h1 
    className="mb-2">
     Daily Done 
  </h1>
  <p className='mb-20'>
  🟢 Make every day a done day
  </p>
  <div>
    <input 
      value={taskInput} 
      onChange={handleInput} 
      className="bg-amber-50 rounded-4xl py-4 text-gray-800 w-100 px-6 text-xl"
    />
    <button 
      className="ml-5 px-8 py-4 bg-[#27AE60] rounded-4xl" 
      onClick={handleAddTask}>
        Add
    </button>
  </div>
  
  
    <ul className='mt-10 flex flex-col bg-[#2C2C2C] px-5 pt-5 pb-3 rounded-2xl'>
    
    {tasksArray.map((task,index)=>{
       return <li key={index} className='text-2xl mb-3 flex justify-between items-center bg-[#f5f5f522] p-5 rounded-2xl'>
        
        
        <div 
          className='inline-block'
          style={
            {
              textDecoration: task.checked ? 'line-through' : 'none'
            }
          }>
            <input 
            type='checkbox' 
            onChange={()=>handleCheckbox(index)} 
            checked={task.checked} 
            className='mr-3 h-6 w-6'
            />
            {task.taskName}
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
