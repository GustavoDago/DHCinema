import React, { useEffect, useState } from 'react'

const ListadoCategorias = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const [Categorias, setCategorias] = useState([])
  const url = 'http://localhost:8080/categorias';

  useEffect(() => {
    const settings = {
      method: 'GET'
    }
    fetch(url, settings)
      .then(response => response.json())
      .then(data => setCategorias(data))
  }, [])

  const handleBorrarCategoria = (id) => {
      const settings = {
        method: 'DELETE'
      };
      fetch(url + id, settings)
        .then(response => {
          if (response.ok) {
  
            const fila = document.querySelector(`tr[id="${id}"]`);
            fila.remove();
  
            return response.text();
          } else {
            throw new Error(response.text());
          }
        })
        .then(data => console.log((data)))
        .catch(error => console.log((error.message)))
  
    };


  return (
    <main >
      {/* renderizo las cards */}
      <div className='tabla' >
        <table>
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Título</th>
              <th scope="col">Descripción</th>
              <th scope="col">Imagen</th>
            </tr>
          </thead>
          <tbody>
            {Categorias.map((categoria) => (
              <tr id={categoria.id} key={categoria.id}>
                <th scope='row'>{categoria.id}</th>
                <td scope='row'>{categoria.categoria}</td>
                {/* 
                <td scope='row'>{categoria.descripción}</td>
                <td scope='row'>{categoria.urlImagen}</td> 
                  Activar cuando esté agregado en la base de datos el campo urlImagen y el campo descripcion
                
                */}
                
                {/* 
                Esta línea permite a futuro modificar una película
                <td scope='row'><button ><Link key={dentista.id} to={"/Odontologos/" + dentista.id}>✍</Link> </button></td> 
                */}

                {/*
                  Esta línea permite borrar categorías
                <td scope='row'><button onClick={() => handleBorrarCategoria(categoria.id)} >🚮</button></td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default ListadoCategorias