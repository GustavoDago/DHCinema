import { useEffect, useState } from "react"
import { searchMovieDetails } from "../components/UseFetch"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Modal from "react-modal"
import { deleteMovie } from "../components/UseFetch";
import ContentLoader,{List} from "react-content-loader"


Modal.setAppElement('#root')

function MovieDetails() {
    const [showConfirmation, setShowConfirmation] = useState (false);
    const [content,setContent] = useState('¿Estás seguro de que deseas eliminar los datos?')
    const [movie,setMovie] = useState (null)
    const [isLoading,setIsLoading] = useState(true)
    const [deleted,setDeleted] = useState(false)
    const params = useParams()
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchMovieId = async () => {
            setIsLoading(true);
            try{
                const movieForId = await searchMovieDetails(params.id)
                if(movieForId != false){
                    setMovie(movieForId);
                    setIsLoading(false);
                }
                return
            } catch (error) {
                console.error(error)
            }
        };
        fetchMovieId()
    },[])

    const loadingImage = () => {
            return (
            
              <ContentLoader
                className="loadingImage"
                speed={2}
                width="100%"
                height="70vh"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
              </ContentLoader>
            
              )
          
    
          
    }

    const loadingTitle = () => {
        return (
        
          <ContentLoader
            className="loading-tilte"
            speed={2}
            width="40%"
            height="8vh"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
          </ContentLoader>
        
          )
      

      
}

    const descriptionLoader = () => 
        <List 
            speed={2}
            width="70vh"
            height="100%vh"
        />

    const handleDeleteButtonClick = () =>{
        setShowConfirmation(true);
    }
    
    const handleConfirm = async (res) => {
        if(res == 'yes'){
            try{
                const response = await deleteMovie(params.id)
                if (response == true){
                    setDeleted(true)
                    setContent('La pelicula fue eliminada con exito')
                    setTimeout(() => {
                        setShowConfirmation(false)
                        navigate('/');
                    },2000);
                } else {
                    setContent('Hubo un problema a la hora de eliminar la pelicula')
                    setShowConfirmation(false)
                }
            } catch (error){
                setContent('Hubo un error en la peticion a la red')
                setShowConfirmation(false)
            }
        }else{
            setShowConfirmation(false)
        }
        
    }

    const closeModal = () => {
        setShowConfirmation(false)
    }

  
    const modalClassName = showConfirmation ? 'modal-overlay' : 'modal-overlay hidden';

    return (
        <div className="movie-details-container">
            {isLoading ? 
            (<div className="movie-details">
                <div className="movie-first-div">
                    {loadingTitle()}
                    <Link to={"/"}>
                        <img id="back" src={'../../icons/atras.png'}/>
                    </Link>
                </div>    
                <div className="movie-second-div">
                    <div className="image-details">
                        {loadingImage()}
                    </div>
                    <div className="description">
                        {descriptionLoader()}
                    </div>  
                </div>
                <div className="movie-third-div">
                    <button>Eliminar</button>
                </div>
            </div>) : 
            (movie !==null ? (
                <div className="movie-details">
                    <div className="movie-first-div">
                        <h2>{movie.titulo}</h2>
                        
                        <Link to={"/"}>
                            <img id="back" src={'../../icons/atras.png'}/>
                        </Link>
                        
                    </div>
                    
                    <div className="movie-second-div">
                        <div className="image-details">
                            <img src={movie.imagen}/>
                        </div>
                        <div className="description">
                            <p>{movie.descripcion}</p>
                        </div> 
                        
                    </div>
                    <div className="movie-third-div">
                        {/* <button onClick={handleDeleteButtonClick}>Eliminar</button> */}
                    </div>
                </div>
            ) : (<div className="movie-details">
            <div className="movie-first-div">
                {loadingTitle()}
                <Link to={"/"}>
                    <img  src={'../../icons/atras.png'}/>
                </Link>
            </div>    
            <div className="movie-second-div">
                <div className="image-details">
                    {loadingImage()}
                </div>
                <div className="description">
                    {descriptionLoader()}
                </div>  
            </div>
            <div className="movie-third-div">
                <button>Eliminar</button>
            </div>
        </div>))
            }

        <Modal
            isOpen={showConfirmation}
            onRequestClose={closeModal}
            contentLabel="Confirmacion"
            className="modal"
            overlayClassName="overlay"
        >

            <div className={modalClassName}>
                <div className="modal-content">
                    {!deleted ? (<h2>Confirmacion</h2>):('')}
                    
                    <p>{content}</p>
                    {!deleted ? (
                    <div className="modal-buttons">
                        <button onClick={() => handleConfirm('yes')}>Si</button>
                        <button onClick={() => handleConfirm('no')}>No</button>
                    </div>):
                    ('')}
                    
                </div>
            </div>
        </Modal>    

        
        </div>
    )
}

export default MovieDetails;