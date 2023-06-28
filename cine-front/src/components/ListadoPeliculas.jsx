import React, { useEffect, useState } from 'react'
import { deleteMovie } from './UseFetch'
import { searchMoviesForCategories } from './UseFetch'
import Modal from 'react-modal'
import { useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
//Genera una nabvar para elegir entre ver la lista de películas y el form de agregar película
//Este código muestra una tabla con todas las películas, y a la derecha un botón para eliminar. 
//También se puede agregar un botón para modificar y un form para hacer la modificación.

Modal.setAppElement('#root')

const ListadoPeliculas = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showModal,setShowModal] = useState(false)
  const [peliculas, setPeliculas] = useState([])
  const [movieId,setMovieId] = useState('')
  const [deleted, setDeleted] = useState(false)
  const [content, setContent] = useState('¿Estás seguro de que deseas eliminar los datos?')
  const params = useParams()
  const navigate = useNavigate();

  const customStyles = {
    overlay: { zIndex: 1000 }
}

  useEffect(() => {
    const fetchMovie = async () => {
      
      try {
        const movies = await searchMoviesForCategories("Ninguno");
        setPeliculas(movies);
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMovie()
  }, [])

  const handleDeleteButtonClick = (id) => {
    setMovieId(id)
    setShowModal(true)
  }

  const handleConfirm = async (res) => {
    if (res == 'yes') {
      try {
        const response = await deleteMovie(movieId)
        if (response == true) {
          setDeleted(true)
          const fila = document.querySelector(`tr[id="${id}"]`);
          fila.remove();
          setContent('La pelicula fue eliminada con éxito')
          setTimeout(() => {
            setShowConfirmation(false)
          }, 2000);
        } else {
          setContent('Hubo un problema a la hora de eliminar la película')
          setShowConfirmation(false)
        }
      } catch (error) {
        setContent('Hubo un error en la petición a la red')
        setShowConfirmation(false)
      }
    } else {
      setShowModal(false)
    }

  }

  const closeModal = () => {
    setShowModal(false)
  }



  return (
    <div>
      {/* renderizo las cards */}
      <div className='tabla' >
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Título</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && peliculas.map((pelicula) => (
              <tr id={pelicula.id} key={pelicula.id}>
                <th scope='row'>{pelicula.id}</th>
                <td scope='row'>{pelicula.titulo}</td>

                {/* 
                Esta línea permite a futuro modificar una película
                <td scope='row'><button ><Link key={dentista.id} to={"/Odontologos/" + dentista.id}>✍</Link> </button></td> 
                */}
                <td scope='row'>
                  <button onClick={() => handleDeleteButtonClick(pelicula.id)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={showModal}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Confirmación"
        className="modal-confirmation"
      >

        
          <div className="confirmation-content">
            {!deleted ? (<h2>Confirmación</h2>) : ('')}

            <p>{content}</p>
            {!deleted ? (
              <div className="modal-buttons">
                <button onClick={() => handleConfirm('yes')}>Si</button>
                <button onClick={() => handleConfirm('no')}>No</button>
              </div>) :
              ('')}

          </div>
        
      </Modal>
    </div>
  )
}

export default ListadoPeliculas