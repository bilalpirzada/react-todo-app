import { useState } from 'react'
import './App.css'

function App() {
  let [taskInput, setTaskInput] = useState("do homework"); 


  function handleInput(event){
    setTaskInput(event.target.value);
  }

  return <>
  <h1 className=" text-green-400 mb-20">React Todo App</h1>
  <input value={taskInput} onChange={handleInput} className="bg-amber-50 rounded-4xl px-10 py-5 text-gray-800 text-2xl"/>
  <button className="ml-5 px-8 py-4 bg-green-600 rounded-4xl ">Add</button>
  </>
}

export default App
