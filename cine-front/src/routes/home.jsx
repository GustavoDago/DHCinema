import React, { useState, useRef, useEffect } from "react"
import categories from "../components/utils/categories.json"
import Categorie from "../components/utils/categorie"
import { useNavigate } from "react-router-dom"
import Billboard from "../components/home/billboard"
import Recommended from "../components/home/recommended"
import { fetchMovieTilte } from "../components/UseFetch"
import Modal from "react-modal"

Modal.setAppElement('#root')

function Home() {

    const [searchTerm, setSearchTerm] = useState("");
    const [showCategorie, setShowCategorie] = useState("Todos");
    const [showConfirmation,setShowConfirmation] = useState (false);
    const [errorMessage,setErrorMessage] = useState("Buscando...")
    const navigate = useNavigate();

    const handleSearch = async () => {
        try{
            setShowConfirmation(true)
            const response = await fetchMovieTilte(searchTerm)
            if (response != false){
                navigate(`/peliculas/${response.id}`)
            } else {
                setErrorMessage("No se pudo encontrar la pelicula o no existe.")
                setTimeout(() => {
                    setShowConfirmation(false)
                },2000)
                return
            }
        } catch (error){
            setErrorMessage("Error al cargar la pelicula.")
                setTimeout(() => {
                    setShowConfirmation(false)
                }, 2000)
        }
    }

    const closeModal = () => {
        setShowConfirmation(false)
    }

    const updateCategorie = (value) => {
        setShowCategorie(value);
    }



    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }


    const divRef = useRef(null);

    const btnpressprev = () => {
        let width = divRef.current.offsetWidth;
        divRef.current.scrollLeft = divRef.current.scrollLeft - width;
        console.log(width)
    }

    const btnpressnext = () => {
        let width = divRef.current.offsetWidth;
        divRef.current.scrollLeft = divRef.current.scrollLeft + width;
        console.log(width)
    }

    const modalClassName = showConfirmation ? 'modal-overlay' : 'modal-overlay hidden';


    return (

        <div className="home-section">
            <div>
                <input
                    className="search-movie"
                    type="text"
                    placeholder="Buscar películas..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            <div className="categories-section">
                <img className='first-button' src="./icons/atras.png" onClick={btnpressprev} />
                <div className="carrousel-slider" ref={divRef}>
                    {categories.map(categorie => (
                        <Categorie
                            value={showCategorie}
                            updateFather={updateCategorie}
                            key={categorie.id}
                            name={categorie.name}
                            image={categorie.image}
                        />
                    ))}
                </div>
                <img className='last-button' src="./icons/adelante.png" onClick={btnpressnext} />
            </div>

            <Billboard
                categorie={showCategorie}
            />
            <Recommended />

            <Modal
            isOpen={showConfirmation}
            onRequestClose={closeModal}
            contentLabel="Confirmacion"
            className="modal"
            overlayClassName="overlay"
        >

            <div className={modalClassName}>
                <div className="modal-content">
                    {errorMessage}
                </div>
            </div>
        </Modal>   
        </div>
    )
}

export default Home