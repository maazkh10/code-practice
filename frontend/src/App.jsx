import React from 'react'
import {BrowserRouter , Routes , Route , Link} from "react-router-dom"
import Start from './pages/Start'
import Dashboard from './pages/Dashboard'
import Solve from './pages/Solve'
import './App.css'
function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Start />} />
       <Route path="/dashboard/:email" element={<Dashboard />} />
       <Route path="/solve/:email/:problemId" element={<Solve />} />
    
     </Routes>
   </BrowserRouter>
  )
}

export default App