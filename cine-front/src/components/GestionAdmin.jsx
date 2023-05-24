// import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const GestionAdmin = () => {
  window.scrollTo(0, 0);
  return (
    < >
    <nav>
        <Link to="/admin/ListadoPeliculas">Listar Películas</Link>
        <Link to="/admin/nueva-pelicula">Cargar Película</Link>
    </nav>
    <hr/>
        <Outlet />
</>
  )
}

export default GestionAdmin