import React from 'react'
import Weather from './Component/Weather'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Component/Signup'
import Contact from './Component/Contact'

function App() {
  return (
    <div>
        <BrowserRouter>
      <Routes>
        <Route path='/' element={<Weather />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Contact' element={<Contact />}></Route>
       

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App