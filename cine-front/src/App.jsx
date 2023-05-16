
import Navbar from './components/Header'
import Footer from './components/Footer'
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
