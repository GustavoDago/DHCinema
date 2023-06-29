import { Link } from 'react-router-dom'
import DropdownProfile from './DropdownProfile'
import { fetchMovieTilte } from './UseFetch'
import { useNavigate } from "react-router-dom"
import Modal from "react-modal"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root')

const header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Buscando. Por favor, aguarde...")
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const customStyles = {
    overlay: { zIndex: 1000 }
  }

  const closeModal = () => {
    setShowConfirmation(false)
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearch = async () => {
    try {
      setShowConfirmation(true)
      const response = await fetchMovieTilte(searchTerm)
      if (response != false) {
        navigate(`/peliculas/${response.id}`)
      } else {
        setErrorMessage("No se pudo encontrar la película o no existe.")
        setTimeout(() => {
          setShowConfirmation(false)
        }, 2000)
        return
      }
    } catch (error) {
      setErrorMessage("Error al cargar la película.")
      setTimeout(() => {
        setShowConfirmation(false)
      }, 2000)
    }
  }

  const modalClassName = showConfirmation ? 'modal-overlay' : 'modal-overlay hidden';

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="headerContainer">
        <Link to="/">
          <img src="/icons/dhcinema2-logo.png" alt="logoCinema" />
        </Link>
        <div className='header-section'>
          <Link to="/">
            <p>HOME</p>
          </Link>
          <Link to="/peliculas/pagina/1">
            <p>CARTELERA</p>
          </Link>
          <Link to="/reservas/">
            <p>RESERVAS</p>
          </Link>
          <Link to="/favoritos/">
            <p>FAVORITOS</p>
          </Link>
        </div>
      </div>
      <div className='right-header'>
        <div className="search-movie">
          <form onSubmit={handleSearch} className='search-bar'>
            <input
              
              type="text"
              placeholder="Buscar películas..."
              value={searchTerm}
              onChange={handleInputChange} />
            <button type='submit'><img src='/icons/search.svg' /></button>
          </form>
        </div>
        <DropdownProfile />
        <div className='divHambur'>
          <button className='logoHambur' onClick={handleToggle}>
          <FontAwesomeIcon icon={faBars} />
          </button>
            {isOpen && (
            <div className="dropdown-content">
              <Link to="/">HOME</Link>
              <Link to="/peliculas/pagina/1">CARTELERA</Link>
              <Link to="/categorias/">CATEGORÍAS</Link>
              <Link to="/favoritos/">FAVORITOS</Link>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showConfirmation}
        onRequestClose={closeModal}
        style={customStyles}
      >

        <div className={modalClassName}>
          <div className="modal-content">
            <h3>{errorMessage}</h3>
          </div>
        </div>
      </Modal>

    </header>
  )
}

export default header
