import { useEffect, useState } from "react"
import { searchMovieDetails, searchRandomMovies } from "../components/UseFetch"
import { useParams, useNavigate } from "react-router-dom"
import Modal from "react-modal"
import ContentLoader, { List } from "react-content-loader"
import ReactPlayer from "react-player"
import Item from "../components/Item"

Modal.setAppElement('#root')

function MovieDetails() {
    window.scrollTo(0, 0);

    const [movie, setMovie] = useState(null)
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const [showVideo, setShowVideo] = useState(false);


    const customStyles = {
        overlay: { zIndex: 1000 }
    }

    useEffect(() => {
        const fetchMovieId = async () => {
            setIsLoading(true);
            try {
                const movieForId = await searchMovieDetails(params.id)
                const movieRandom = await searchRandomMovies()
                if (movieForId != false) {
                    setMovie(movieForId);
                }
                if (movieForId != false) {
                    setMovies(movieRandom)
                    setIsLoading(false);
                }
                return
            } catch (error) {
                console.error(error)
            }
        };
        fetchMovieId()
    }, [])

    const handleCloseVideo = () => {
        setShowVideo(false)
    }

    const handleShowVideo = () => {
        if (showVideo == false)
            setShowVideo(true)
        else
            setShowVideo(false)
    }

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




    return (
        <div className={`movie-details `}>
            <div>
                <div className="banner-video">
                    <div className="banner-details">
                        <img className="play-icon" src="/icons/play_icon.svg" onClick={handleShowVideo} />
                        <div className="movie-first-info">
                            {!isLoading &&
                                <div className="movie-first-info-details">
                                    <img src={movie.imagen} />
                                    <div>
                                        <h4>GENEROS </h4>

                                        {movie.categorias.map(categorias => (
                                            <p key={categorias.id}>{categorias.titulo}</p>
                                        ))}

                                    </div>
                                </div>
                            }
                        </div>
                        <div className="movie-details-title">
                            {!isLoading && <h1>{movie.titulo}</h1>}
                        </div>

                    </div>

                </div>
                <div className="movie-details-second">
                    <div className="movie-second-info">
                        {!isLoading && (
                            <div className="movie-details-description">
                                <div>
                                    <h2>DETALLES</h2>
                                    <p>{movie.descripcion}</p>
                                </div>
                                <div>
                                    <h2>FECHAS</h2>
                                    {movie.fechas.map(fechas => (
                                        <button key={fechas.id} className="dates-button">{fechas.fecha}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="movie-details-related">
                            <h2>PELICULAS SIMILARES</h2>
                            <div className="movie-container">
                                {Array.isArray(movies) && movies.length > 0 ? (
                                    movies.slice(0, 4).map(movie => (
                                        <Item
                                            key={movie.id}
                                            id={movie.id}
                                            name={movie.titulo}
                                            image={movie.imagen}
                                        />
                                    ))
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                {!isLoading && (<div className="movie-second-div">
                    <div className="image-details">
                        <div className="grid-container">
                            <div className="half-left">
                                <img src={movie.imagen} alt="Movie" />
                            </div>
                            <div className="half-right">
                                {[...Array(4)].map((_, index) => (
                                    <div key={index}>
                                        <img src={movie.imagen} alt="Movie" />
                                    </div>
                                ))}

                            </div>
                            <div className="button-container">
                                <button>Ver más</button>
                            </div>
                        </div>

                    </div>


                </div>)}

            </div>

            <Modal
                style={customStyles}
                className="video-modal"
                isOpen={showVideo}
                onRequestClose={handleCloseVideo}
            >
                <div className="video-details">
                    <div className="detail-video-part">
                        <img src="/icons/close.svg" onClick={handleShowVideo} />
                    </div>
                    <ReactPlayer
                        width='100%'
                        height='100%'
                        url="https://www.youtube.com/watch?v=FTGm7EexNmw&t=5s&ab_channel=MarvelEspa%C3%B1a"
                    />
                </div>
            </Modal>

        </div>
    )
}

export default MovieDetails;
