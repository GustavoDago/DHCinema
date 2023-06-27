import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";


const Favorites = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [Favorites, setFavorites] = useState([])
  const email = sessionStorage.getItem("email");
  const url = `http://localhost:8080/favoritos/${encodeURIComponent(email)}`;

  
  
  useEffect(() => {
    const settings = {
      method: 'GET'
    }
    fetch(url, settings)
      .then(response => response.json())
      .then(data => setFavorites(data))
  }, [])
  return (
    <div>
      <h2>favorites</h2>
      <tbody>
            {Favorites.map((favorite) => (
              <React.Fragment key={favorite.id}>
                <tr id={favorite.id}>
                  <th scope='row'>{favorite.id}</th>
                  <td scope='row'>{favorite.nombre}</td>

                  <td scope='row'><button ><Link key={favorite.id} to={`/admin/Favorites/${favorite.id}`}>✍</Link> </button></td>
                  
                </tr>

              </React.Fragment>
            ))}



          </tbody>
    </div>

  )
}

export default Favorites