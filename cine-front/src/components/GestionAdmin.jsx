// import React from 'react'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const GestionAdmin = () => {
  const [panelElement, setPanelElement] = useState("")
  const [description, setDescription] = useState("Seleccione una accion a realizar.")
  const [title, setTitle] = useState("Panel de administrador")

  useEffect(() => {
    if(panelElement == "listar"){
      setTitle('Listar Peliculas')
      setDescription('Aqui podra encontrar un listado de todas las peliculas en cartelera. Puede actualizarlas como eliminarlas.')
    } else if (panelElement == "nueva-pelicula"){
      setTitle('Agregar Nueva Pelicula')
      setDescription('Aqui podra agregar una nueva pelicula. Por favor proporcione el titulo, descripcion, genero/s, fechas disponibles, tiempo de reproduccion, imagenes de portada, banner y de galeria')
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
      </div>
      <hr />
      {!panelElement == '' &&
      <Outlet />
      }
      
    </>
  )
}

export default GestionAdmin