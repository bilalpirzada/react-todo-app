import { useState, useEffect, useRef } from 'react'
import './App.css'
import {Header} from './Components/Header.jsx'
import TaskList from './Components/TaskList';

function App() {
  let [taskInput, setTaskInput] = useState(""); 
  let [tasksArray, setTasksArray] = useState([]);
  let [editingTaskName, setEditingTaskName] = useState('');

  // Timer interval ref
  const intervalRef = useRef(null);

  // Start/stop timer effect
  useEffect(() => {
    // Clear any previous interval
    if (intervalRef.current) clearInterval(intervalRef.current);
    // Start interval
    intervalRef.current = setInterval(() => {
      setTasksArray(prevTasks =>
        prevTasks.map(task =>
          !task.checked && task.timerRunning
            ? { ...task, timer: (task.timer || 0) + 1 }
            : task
        )
      );
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);


  function handleInput(event){
    setTaskInput(event.target.value);
  }

  function handleAddTask(){
    if(taskInput){
      setTasksArray((prevTasks)=>{return [...prevTasks,{'taskName':taskInput,'checked':false, 'editing':false, 'timer': 0, 'timerRunning': false}]});
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
        checked: !updatedTask[checkboxIndex].checked,
        editing: updatedTask[checkboxIndex].editing,
        timer: updatedTask[checkboxIndex].timer,
        timerRunning: updatedTask[checkboxIndex].timerRunning
      };
      return updatedTask;
    })
  }

  function handleKeyDown(event){
    if(event.key==='Enter'){
      handleAddTask();
    }
  }

  function handleOnClickEdit(index){
    setTasksArray(prevTasks => {
     let updatedTasks= [...prevTasks];

     updatedTasks[index]={
      taskName:updatedTasks[index].taskName,
      checked:updatedTasks[index].checked,
      editing:!updatedTasks[index].editing
     }

     setEditingTaskName(updatedTasks[index].taskName);

     return updatedTasks;
    })
  }

  function handleOnClickCancelEditing(index){
    setTasksArray(prevTasks => {
      let updatedTasks= [...prevTasks];
 
      updatedTasks[index]={
       taskName:updatedTasks[index].taskName,
       checked:updatedTasks[index].checked,
       editing:!updatedTasks[index].editing
      }
 
      return updatedTasks;
     })
  }

  function handleEditingTask(event){
    setEditingTaskName(event.target.value)
  }
 
  function handleUpdateTask(index){
    setTasksArray(prevTasks => {
      let updatedTasks= [...prevTasks];
 
      updatedTasks[index]={
       taskName:editingTaskName,
       checked:updatedTasks[index].checked,
       editing:!updatedTasks[index].editing
      }
 
      return updatedTasks;
     })
  }

  // Timer controls
  function handleStartTimer(index) {
    setTasksArray(prevTasks => {
      let updatedTasks = [...prevTasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        timerRunning: true
      };
      return updatedTasks;
    });
  }

  function handleStopTimer(index) {
    setTasksArray(prevTasks => {
      let updatedTasks = [...prevTasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        timerRunning: false
      };
      return updatedTasks;
    });
  }

  function handleResetTimer(index) {
    setTasksArray(prevTasks => {
      let updatedTasks = [...prevTasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        timer: 0
      };
      return updatedTasks;
    });
  }

  // Helper to format seconds as mm:ss
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  return <>
 <Header/>
  
  {/* input */}
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
  
  {/* rendering list */}
    <ul className={'mt-10 flex flex-col bg-[#2C2C2C] rounded-2xl' + tasksArray.length>0?'px-5 pt-5 pb-3':''}>
    
    {tasksArray.map((task,index)=>{
       return <li key={index} className='mb-3 flex justify-between items-center bg-[#f5f5f522] p-1 rounded-xl'>
        
        
        <div 
        className='w-full flex justify-start'
          style={
            {
              textDecoration: task.checked ? 'line-through' : 'none'
            }
          }>
            {task.editing?<input autoFocus={true} value={editingTaskName} onChange={handleEditingTask} className='bg-[#f5f5f520] p-3 rounded-xl w-full mr-5'/>:
              <label  className='flex justify-start items-center hover:bg-[#f5f5f536] w-full p-3 rounded-xl hover:cursor-pointer mr-5'>
              <input 
              type='checkbox' 
              onChange={()=>handleCheckbox(index)} 
              checked={task.checked} 
              className='mr-3 h-6 w-6 hover:cursor-pointer hover:scale-110 hover:bg-[#27AE60]'
              />
              {task.taskName}
              {/* Timer display */}
              <span className="ml-4 text-xs text-gray-500">{formatTime(task.timer || 0)}</span>
              {/* Timer controls */}
              <span className="ml-4 flex gap-1">
                <button
                  className={
                    `rounded px-2 py-1 text-xs ` +
                    (task.timerRunning || task.checked
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600')
                  }
                  onClick={e => { e.stopPropagation(); handleStartTimer(index); }}
                  disabled={task.timerRunning || task.checked}
                  title="Start"
                >▶</button>
                <button
                  className={
                    `rounded px-2 py-1 text-xs ` +
                    (!task.timerRunning || task.checked
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-yellow-400 text-white hover:bg-yellow-600')
                  }
                  onClick={e => { e.stopPropagation(); handleStopTimer(index); }}
                  disabled={!task.timerRunning || task.checked}
                  title="Stop"
                >⏸</button>
                <button
                  className="bg-gray-400 rounded px-2 py-1 text-xs hover:bg-gray-600"
                  onClick={e => { e.stopPropagation(); handleResetTimer(index); }}
                  disabled={task.timer === 0}
                  title="Reset"
                >⟲</button>
              </span>
            </label>}
    
        </div>

        <div className='flex justify-center items-center'>
          {task.editing?
          <><button className='bg-[#27AE60] rounded-xl px-3 py-2 hover:cursor-pointer hover:bg-[#27AE6090]'
          onClick={()=>handleUpdateTask(index)}>✔</button>
          <button className='bg-red-500 rounded-xl px-3 py-2 ml-2 mr-2 hover:cursor-pointer hover:bg-[#C0392B]' onClick={()=>handleOnClickCancelEditing(index)}>✖</button></>
          
          :<>
          {!task.checked?<button className='bg-blue-400 rounded-xl px-3 py-2 hover:cursor-pointer hover:bg-blue-500'
          onClick={()=>handleOnClickEdit(index)}>✎</button>:''}
          <button className='bg-red-500 rounded-xl px-3 py-2 ml-2 mr-2 hover:cursor-pointer hover:bg-[#C0392B]' onClick={()=>handleDelete(index)}>🗑</button>
          </>}
        </div>
        </li>
    })}
    </ul>

  </>
}

export default App
