import { Routes, Route } from 'react-router-dom';
import Home from './pages/listTasks.jsx';
import CreateTask from './pages/createTask.jsx';
import EditTask from './pages/editTask.jsx';

function App() {
//Manejo de las diferentes Paginas
  return (
    <Routes>
      <Route path='/' element = {<Home />} />
      <Route path='/create' element = {<CreateTask />} />
      <Route path='/edit/:id_task' element = {<EditTask />} />
    </Routes>
  )
}

export default App
