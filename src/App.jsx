import './App.css'
import {Header} from './Components/Header.jsx'
import CalendarGrid from './Components/CalenderGrid.jsx';
import { Link, Routes,Route } from 'react-router-dom';
import Contributions from './pages/Contributions.jsx';
import  Todo  from './pages/Todo.jsx';
import { Sidebar } from './Components/Sidebar.jsx';

function App() {

  return <>
 <Header/>

  
    
  <Sidebar/>
    <Routes>
      <Route path='/' element={<Todo/>}/>
      <Route path='/contributions' element={<Contributions/>}/>
    </Routes>
  </>
}

export default App
