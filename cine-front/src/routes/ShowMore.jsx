import { useEffect, useState } from "react";
import { showPages } from "../components/UseFetch";
import ContentLoader from "react-content-loader";
import Item from "../components/Item";
import DatePicker from "react-multi-date-picker";


function ShowMore() {

    window.scrollTo(0, 0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedDates,setSelectedDates] = useState()
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    const [movies, setMovies] = useState()
    const [pages, setPages] = useState(1)
    const [actualPage, setActualPage] = useState(1)
    const [errorMessage, setErrorMessage] = useState("Buscando. Por favor, aguarde...")

    useEffect(() => {
        const fetchShowMovies = async () => {
            setIsLoading(true);
            try {
                const moviePages = await showPages(actualPage - 1);
                setMovies(moviePages.content)
                if (pages != moviePages.totalPages && moviePages.totalPages != null)
                    setPages(moviePages.totalPages)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
            }
        }

        fetchShowMovies()
    }, [actualPage])

    const handleInputChangeSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSearch = async () => {
        try {
            setShowConfirmation(true)
            const response = await fetchMovieTilte(searchTerm)
            if (response != false) {
                navigate(`/peliculas/${response.id}`)
            } else {
                setErrorMessage("No se pudo encontrar la pelicula o no existe.")
                setTimeout(() => {
                    setShowConfirmation(false)
                }, 2000)
                return
            }
        } catch (error) {
            setErrorMessage("Error al cargar la pelicula.")
            setTimeout(() => {
                setShowConfirmation(false)
            }, 2000)
        }
    }

    const handleInputChange = (e) => {
        const newPage = parseInt(e.target.value, 10);
        if (newPage >= 1 && newPage < pages) {
            setActualPage(newPage)
        }
    }

    const prevPage = () => {
        if (actualPage > 1) {
            setActualPage(actualPage - 1)
        }
    }

    const nextPage = () => {
        if (actualPage < pages) {
            setActualPage(actualPage + 1)
        }
    }

    const loadingBox = () => {
        const loaders = []
        for (let i = 0; i < 10; i++) {
            loaders.push(
                <div key={i} className="content-loader">
                    <ContentLoader
                        speed={2}
                        width="100%"
                        height="100%"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
                    </ContentLoader>
                </div>
            )
        }
        return loaders;
    }

    const renderElements = () => {
        return (
            <div className="page-div">
                <div className="page-container">
                    {isLoading ? (
                        loadingBox()
                    )
                        : (
                            Array.isArray(movies) && movies.length > 0 ? (
                                movies.map(movie => (
                                    <Item
                                        key={movie.id}
                                        id={movie.id}
                                        name={movie.titulo}
                                        image={movie.portada}
                                    />
                                ))
                            ) : (
                                loadingBox()
                            )
                        )
                    }
                </div>
            </div>
        )
    }

    const amountOfPages = () => {
        return (
            <div className="pages">
                <img className='first-button' src="/icons/atras.svg" onClick={prevPage} />
                <div className="pages-numbers">
                    <input
                        type="number"
                        readOnly
                        min="1"
                        max={pages}
                        value={actualPage}
                        onChange={handleInputChange}
                        className="input-pages"
                    />
                    <p>de</p>
                    <p>{pages}</p>
                </div>
                <img className='first-button' src="/icons/adelante.svg" onClick={nextPage} />
            </div>
        )
    }

    return (

        <div className="all-movies">
            <div className="search-movie">
                <form onSubmit={handleSearch} className='search-bar'>
                    <input
                        type="text"
                        placeholder="Buscar películas..."
                        value={searchTerm}
                        onChange={handleInputChangeSearch} />
                </form>
            </div>
            <div className="date-container">
                <div className="date-center">
                    <DatePicker
                        placeholder="Fecha"
                        className="date-picker"
                        selected={selectedDates}
                        onChange={setSelectedDates}
                        format={"DD-MM-YYYY"}
                    />
                </div>
            </div>
            {renderElements()}
            {amountOfPages()}
        </div>
    );
}

export default ShowMore;
