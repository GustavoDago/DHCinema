import React, { useEffect, useState } from 'react'
//Genera una nabvar para elegir entre ver la lista de películas y el form de agregar película
//Este código muestra una tabla con todas las películas, y a la derecha un botón para eliminar. 
//También se puede agregar un botón para modificar y un form para hacer la modificación.


const ListadoPeliculas = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [Peliculas, setPeliculas] = useState([])
    const url = 'http://localhost:8080/peliculas/';
    useEffect(() => {
    const settings = {
      method: 'GET'
    }
      fetch(url, settings)
        .then(response => response.json())
        .then(data => setPeliculas(data))
    }, [])

    const handleBorrarPelicula = (id) => {
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
            </tr>
          </thead>
          <tbody>
            {Peliculas.map((pelicula) => (
              <tr id={pelicula.id} key={pelicula.id}>
                <th scope='row'>{pelicula.id}</th>
                <td scope='row'>{pelicula.titulo}</td>
                
                {/* 
                Esta línea permite a futuro modificar una película
                <td scope='row'><button ><Link key={dentista.id} to={"/Odontologos/" + dentista.id}>✍</Link> </button></td> 
                */}
                <td scope='row'><button onClick={() => handleBorrarPelicula(pelicula.id)} >🚮</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default ListadoPeliculas