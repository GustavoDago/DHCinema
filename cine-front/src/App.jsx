import { useState } from 'react'
import './App.css'
import Navbar from './components/header'
import Footer from './components/footer'
import {Outlet} from 'react-router-dom'

function App() {

  return (
    <div className='app'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
