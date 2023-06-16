import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ListadoCiudades = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const [Ciudades, setCiudades] = useState([])
  const url = 'http://localhost:8080/ciudades';

  useEffect(() => {
    const settings = {
      method: 'GET'
    }
    fetch(url, settings)
      .then(response => response.json())
      .then(data => setCiudades(data))
  }, [])

  const handleBorrarCiudad = (id) => {
    const settings = {
      method: 'DELETE'
    };
    fetch(url + "/" + id, settings)
      .then(response => {
        if (response.ok) {

          const fila = document.querySelector(`tr[id="${id}"]`);
          fila.remove();
          alert("ciudad borrada correctamente")
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
              <th scope="col">Nombre</th>

            </tr>
          </thead>
          <tbody>
            {Ciudades.map((ciudad) => (
              <React.Fragment key={ciudad.id}>
                <tr id={ciudad.id}>
                  <th scope='row'>{ciudad.id}</th>
                  <td scope='row'>{ciudad.nombre}</td>

                  <td scope='row'><button ><Link key={ciudad.id} to={`/admin/Ciudades/${ciudad.id}`}>✍</Link> </button></td>
                  <td scope='row'><button onClick={() => handleBorrarCiudad(ciudad.id)} >🚮</button></td>
                </tr>

              </React.Fragment>
            ))}



          </tbody>
        </table>
      </div>
    </main>
  )
}

export default ListadoCiudades