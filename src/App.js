import React from 'react'
import Weather from './Component/Weather'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Component/Signup'

function App() {
  return (
    <div>
        <BrowserRouter>
      <Routes>
        <Route path='/Weather' element={<Weather />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
       

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App