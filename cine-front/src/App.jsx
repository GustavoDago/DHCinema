import { ContextProvider } from './components/global.context'
import Navbar from './components/Header'
import Footer from './components/Footer'
import {Outlet} from 'react-router-dom'

function App() {

  return (
    <ContextProvider>
      <div className='app'>
        <Navbar/>
        <div className='main-content'>
          <Outlet/>
        </div>
        <Footer/>
      </div>
    </ContextProvider>
  )
}

export default App
