import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './routes/home.jsx'
import ShowMore from './routes/ShowMore.jsx'
import MovieDetails from './routes/MovieDetails.jsx'
import AdministrationPanel from './routes/AdministrationPanel.jsx'
import SignIn from './routes/SignIn.jsx'
import Register from './routes/Register.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='peliculas/pagina/:id' element={<ShowMore/>}/>
          <Route path='peliculas/:id' element={<MovieDetails/>}/>
          <Route path='admin/nueva-pelicula' element={<AdministrationPanel/>}/>
          <Route path='inicio-sesion' element={<SignIn/>}/>
          <Route path='registrarse' element={<Register/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
