// import React from 'react'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const GestionAdmin = () => {
  window.scrollTo(0, 0);
 
  const [panelElement, setPanelElement] = useState("")
  const [description, setDescription] = useState("Seleccione una accion a realizar.")
  const [title, setTitle] = useState("Panel de administrador")

  useEffect(() => {
    if(panelElement == "listar"){
      setTitle('Listar Películas')
      setDescription('Aqui podra encontrar un listado de todas las películas en cartelera. Puede actualizarlas como eliminarlas.')
    } else if (panelElement == "nueva-pelicula"){
      setTitle('Agregar Nueva Pelicula')
      setDescription('Aqui podra agregar una nueva película. Por favor proporcione el titulo, descripcion, género/s, fechas disponibles, tiempo de reproduccion, imagenes de portada, banner y de galeria')
    } else if(panelElement == "listado-categorias"){
      setTitle('Listar Categorías')
      setDescription('Aqui podrá listar todas las categorías que se encuentran disponibles.')
    }else if(panelElement == "crear-categoria"){
      setTitle('Crear Categoría')
      setDescription('Aquí podrá crear una nueva categoría para asignarle a películas.')
    } else if(panelElement == "asignar-categoria"){
      setTitle('Asignar Categoría')
      setDescription('Aquí podrá listar todas las películas y asignarle una nueva categoría.')
    } else if(panelElement == "asignar-rol"){
      setTitle('Asignar Rol')
      setDescription('Aquí podrá listar todas los roles y asignarle un nuevo rol.')
    } else if(panelElement == "listado-ciudades"){
      setTitle('Listar Ciudades')
      setDescription('Aquí podrá listar, modificar y eliminar todas las ciudades.')
    } else if(panelElement == "crear-ciudad"){
      setTitle('Crear Ciudades')
      setDescription('Aquí podrá crear una ciudad.')
    } 
  },[panelElement])

  return (
    < >
      <div className='admin-banner'>
        <div className='admin-details'>
        <h1>{title}</h1>
        <h2>{description}</h2>
        </div>
      </div>
      <div className='admin-links'>
        <Link onClick={() => setPanelElement("listar")} to="/admin/ListadoPeliculas">LISTAR PELICULAS</Link>
        <Link onClick={() => setPanelElement("nueva-pelicula")} to="/admin/nueva-pelicula">CARGAR PELICULA</Link>
        <Link onClick={() => setPanelElement("listado-categorias")} to="/admin/ListadoCategorias">LISTAR CATEGORIAS</Link>
        <Link onClick={() => setPanelElement("crear-categoria")} to="/admin/nueva-categoria">CREAR CATEGORIA</Link>
        <Link onClick={() => setPanelElement("asignar-categoria")} to="/admin/asignar-categoria">ASIGNAR CATEGORIA</Link>
        <Link onClick={() => setPanelElement("asignar-rol")} to="/admin/asignar-rol">ASIGNAR ROL</Link>
        <Link onClick={() => setPanelElement("listado-ciudades")} to="/admin/ListadoCiudades">LISTAR CIUDADES</Link>
        <Link onClick={() => setPanelElement("crear-ciudad")} to="/admin/nueva-ciudad">CREAR CIUDAD</Link>
      </div>
      <hr />
      <Outlet />
    </>
  )
}

export default GestionAdmin