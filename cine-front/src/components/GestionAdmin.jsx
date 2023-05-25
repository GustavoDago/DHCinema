// import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const GestionAdmin = () => {
  window.scrollTo(0, 0);
  return (
    < >
    <nav>
        <Link to="/admin/ListadoPeliculas">Listar Películas</Link>
        <Link to="/admin/nueva-pelicula">Cargar Película</Link>
        <Link to="/admin/ListadoCategorias">Listar Categorías</Link>
        <Link to="/admin/nueva-categoria">Crear Categoría</Link>
        <Link to="/admin/asignar-categoria">Asignar Categoría</Link>
    </nav>
    <hr/>
        <Outlet />
</>
  )
}

export default GestionAdmin