import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './routes/Home.jsx'
import ShowMore from './routes/ShowMore.jsx'
import MovieDetails from './routes/MovieDetails.jsx'
import AdministrationPanel from './routes/AdministrationPanel.jsx'
import SignIn from './routes/SignIn.jsx'
import SignOut from './routes/SignOut.jsx'
import Register from './routes/Register.jsx'
import ListadoPeliculas from './components/ListadoPeliculas.jsx'
import GestionAdmin from './components/GestionAdmin.jsx'
import ListadoCategorias from './components/ListadoCategorias.jsx'
import NuevaCategoria from './components/Nueva-categoria.jsx'
import AsignarCategoria from './components/AsignarCategoria.jsx'
import ConfirmAccount from './routes/ConfirmAccount.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/confirmar-cuenta' element={<ConfirmAccount />} />
      <Route path='/' element={<App />}>
        <Route path='/' element={<Home />} />
        <Route path='peliculas/pagina/:id' element={<ShowMore />} />
        <Route path='peliculas/:id' element={<MovieDetails />} />
        <Route
          path='/admin' element={<GestionAdmin />}>
          <Route path='/admin' element={<ListadoPeliculas />} />
          <Route path='/admin/ListadoPeliculas' element={<ListadoPeliculas />} />
          <Route path='/admin/nueva-pelicula' element={<AdministrationPanel />} />
          <Route path='/admin/ListadoCategorias' element={<ListadoCategorias />} />
          <Route path='/admin/nueva-categoria' element={<NuevaCategoria />} />
          <Route path='/admin/asignar-categoria' element={<AsignarCategoria />} />
        </Route>
        <Route path='inicio-sesion' element={<SignIn />} />
        <Route path='registrarse' element={<Register />} />
        <Route path='cerrar-sesion' element={<SignOut />} />  
      </Route>
    </Routes>
  </BrowserRouter>
)
