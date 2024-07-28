import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import Reg from './components/Reg'
import Login from './components/Login'
import Addprod from './components/Addprod'
import Cart from './components/Cart'
import Logout from './components/Logout'
import './App.css'
import Ct from './components/Ct'
import Detcom from './components/Detcom'

const App = () => {

let [cont,setCon]=useState({"_id":"","token":"","name":"","role":""})

  let updcont=(obj)=>{
    setCon({...cont,...obj})
  }
  let obj={"cont":cont,"updcont":updcont}
  return (
    <BrowserRouter>
    <Ct.Provider value={obj}>
    <Nav/>
    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path="/reg" element={<Reg/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/add' element={<Addprod/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path="/det" element={<Detcom/>}/>

    </Routes>
    </Ct.Provider>
    </BrowserRouter>
  )
}
export default App