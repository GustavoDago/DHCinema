import { useCallback, useEffect, useState } from "react"
import { searchMovieDetails, searchRandomMovies } from "../components/UseFetch"
import { useParams, useNavigate } from "react-router-dom"
import Modal from "react-modal"
import ContentLoader, { List } from "react-content-loader"
import ReactPlayer from "react-player"
import Item from "../components/Item"
import BloquePoliticas from "../components/BloquePoliticas.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, InfoWindow, LoadScript, MarkerF } from "@react-google-maps/api"





Modal.setAppElement('#root')

function MovieDetails() {

    const [mapLoaded, setMapLoaded] = useState(false);
    const [movie, setMovie] = useState(null)
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const [showVideo, setShowVideo] = useState(false);
    const [video, setVideo] = useState('')
    const [banner, setBanner] = useState({})
    const [first, setFirst] = useState([{}])
    const [last, setLast] = useState([{}])
    const [caracteristica, setCaracteristica] = useState([{}])
    const [showGallery, setShowGallery] = useState(false)
    const [imageId, setImageId] = useState(0)
    const [location, setLocation] = useState(null)
    const [selectedMarker, setSelectedMarker] = useState(null)


    const customStyles = {
        overlay: { zIndex: 1000 }
    }


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchMovieId = async () => {

            setIsLoading(true);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        console.log(latitude)
                        setLocation({ lat: latitude, lng: longitude });
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            } else {
                setLocation({ lat: 0, lng: 0 })
            }

            try {
                const movieForId = await searchMovieDetails(params.id)
                const movieRandom = await searchRandomMovies()

                if (movieForId != false) {
                    console.log(movieForId)
                    setMovie(movieForId);
                    setBanner({
                        backgroundImage: `url(${movieForId.banner})`
                    })
                    setVideo(movieForId.trailer)
                    setFirst(movieForId.imagenes.slice(0, 1))
                    setLast(movieForId.imagenes.slice(1, 5))
                }
                if (movieRandom != false) {
                    setMovies(movieRandom)
                }
                if (movieForId != false) {
                    setCaracteristica(movieForId.caracteristicas);
                }

                setIsLoading(false);

            } catch (error) {
                console.error(error)
            }
        };
        fetchMovieId()

    }, [params.id])

    const handleCloseVideo = () => {
        setShowVideo(false)
    }

    const handleShowVideo = () => {
        if (showVideo == false)
            setShowVideo(true)
        else
            setShowVideo(false)
    }

    const handleShowGallery = () => {
        setImageId(0)
        setShowGallery(!showGallery)
    }



    const markers = [
        {
            id: 1,
            position: { lat: -34.6037444, lng: -58.3816444 },
            title: 'Cinema DH 1',
            description: 'Descripción del lugar 1',
            rating: 4.5,
        },
        {
            id: 2,
            position: { lat: -31.4167, lng: -64.1833 },
            title: 'Cinema DH 2',
            description: 'Descripción del lugar 2',
            rating: 4.5,
        },
        {
            id: 3,
            position: { lat: -24.7829, lng: -65.4124 },
            title: 'Cinema DH 3',
            description: 'Descripción del lugar 3',
            rating: 4.5,
        },
        // Agrega más marcadores aquí...
    ];



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

    const icons = {
        url: '/icons/dhcinema2-logo-tiny.png',
        scaledSize: new google.maps.Size(50, 50)
    }

    const handleMapLoad = () => {
        setMapLoaded(true);
    };

    return (
        <div className={`movie-details `}>
            <div>
                <div className="banner-video" style={!isLoading ? banner : {}}>
                    <div className="banner-details">
                        <img className="play-icon" src="/icons/play_icon.svg" onClick={handleShowVideo} />
                        <div className="movie-first-info">
                            {!isLoading &&
                                <div className="movie-first-info-details">
                                    <img src={movie.portada} />
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
                            {!isLoading && <h1>{movie.titulo.toUpperCase()}</h1>}
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
                                <div className="fechas-container">
                                    <h2>FECHAS</h2>
                                    <div>
                                        {movie.fechas.map(fechas => (
                                            <button key={fechas.id} className="dates-button">{fechas.fecha}</button>
                                        ))}
                                    </div>
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
                                            image={movie.portada}
                                        />
                                    ))
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="movie-details-features">
                    <div>
                        <div className="h2-movieDetails">
                            <h2>Que ofrece esta película?</h2>
                            <hr></hr>
                        </div>
                        <div className="caracteristicas-container">
                            {movie && movie.caracteristicas && (
                                <div className="caracteristica-item">
                                    <span> <FontAwesomeIcon icon={faClapperboard} /> Clasificacion: {movie.caracteristicas.clasificacion}</span>
                                    <span> <FontAwesomeIcon icon={faClapperboard} /> Director: {movie.caracteristicas.director}</span>
                                    <span> <FontAwesomeIcon icon={faClapperboard} /> Duracion: {movie.caracteristicas.duracion} minutos</span>
                                    <span> <FontAwesomeIcon icon={faClapperboard} /> Tipo de pantalla: {movie.caracteristicas.modalidad}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {!isLoading && (<div className="movie-second-div">
                    <div className="image-details">
                        <div className="grid-container bloque_img">
                    
                            <div className="half-left">
                                {/* <img src={first[0].imagen} alt="Movie" /> */}
                            </div>
                            <div className="half-right">
                                {last.map((mov, index) => (
                                    <div key={mov.id}>
                                        {index == last.length - 1 ? (
                                            <figure>
                                                <div>
                                                    <p onClick={handleShowGallery}>{`+ ${movie.imagenes.length - 6}`}</p>
                                                </div>
                                                <img src={mov.imagen} alt="Movie Gallery" />
                                            </figure>
                                        ) :
                                            (
                                                <img src={mov.imagen} alt="Movie" />
                                            )}

                                    </div>
                                ))}
                            
                            </div>
                            <div className="button-container">
                                <img src="/icons/show_more.svg" onClick={handleShowGallery}/>
                            </div>
                        </div>
                    </div>


                </div>)}
                <div className="map-container">

                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={location}
                        zoom={4}
                    >
                        <MarkerF
                            position={location}
                            title="Tu ubicacion actual"
                        >

                        </MarkerF>
                        {
                            markers.map((local) => (
                                <MarkerF
                                    key={local.id}
                                    position={local.position}
                                    title={local.title}
                                    icon={{
                                        url: '/icons/dhcinema2-logo-tiny.png',
                                        scaledSize: new google.maps.Size(40, 40)
                                    }}
                                    onClick={() => setSelectedMarker(local)}


                                />

                            ))
                        }
                        {
                            selectedMarker && (
                                <InfoWindow
                                    position={selectedMarker.position}
                                    onCloseClick={() => setSelectedMarker(null)}
                                >
                                    <div className="cinema-item-map">
                                        <h3>{selectedMarker.title}</h3>
                                        <h5>Calle falsa 123</h5>
                                        <p>Valoracion: {selectedMarker.rating}</p>
                                    </div>
                                </InfoWindow>
                            )
                        }


                    </GoogleMap>





                </div>
                <div>
                    <h2 className="tituloPoliticas">Qué tenés que saber</h2>
                    <BloquePoliticas/>
                </div>

            </div>

            {!isLoading && (<Modal
                style={customStyles}
                className="video-modal"
                isOpen={showVideo}
                onRequestClose={handleCloseVideo}
                shouldCloseOnOverlayClick={false}
            >
                <div className="video-details">
                    <div className="detail-video-part">
                        <img src="/icons/close.svg" onClick={handleShowVideo} />
                    </div>
                    <ReactPlayer
                        width='100%'
                        height='100%'
                        url={!isLoading ? video : {}}
                    />
                </div>
            </Modal>)}





            {!isLoading && (
                <Modal
                    style={customStyles}
                    className="show-gallery-modal"
                    isOpen={showGallery}
                    onRequestClose={handleShowGallery}
                    shouldCloseOnOverlayClick={false}
                >

                    <div className="show-gallery-conteiner">
                        <div className="close-gallery">
                            <img src="/icons/close-black.svg" onClick={handleShowGallery} />
                        </div>
                        {/* <div className="gallery-image">
                            <img src={movie.imagenes[imageId].imagen} />
                        </div> */}
                        <div className="carrousel-gallery">
                            {!isLoading && movie.imagenes.map((image, index) => (
                                <img onClick={() => {
                                    console.log(index)
                                    setImageId(index)

                                }} key={index} src={image.imagen} />
                            ))}
                        </div>
                    </div>
                </Modal>


            )}

        </div>
    )
}

export default MovieDetails;
