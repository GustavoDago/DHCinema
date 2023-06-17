import { useEffect, useState } from "react";
import { fetchAllCinemas, fetchAllCitys, fetchAllFunction, searchMoviesForCategories, showPages } from "../components/UseFetch";
import ContentLoader from "react-content-loader";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from "react-select";
import ItemShowMore from "../components/ShowMore/ItemShowMore";


function ShowMore() {

    window.scrollTo(0, 0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedDates, setSelectedDates] = useState()
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    const [movies, setMovies] = useState()
    const [pages, setPages] = useState(1)
    const [actualPage, setActualPage] = useState(1)
    const [errorMessage, setErrorMessage] = useState("Buscando. Por favor, aguarde...")
    const [citys, setCitys] = useState([])
    const [cinemas, setCinemas] = useState([])
    const [allDates, setAllDates] = useState([])
    const [dateSelected, setDateSelected] = useState();
    const [citySelected, setCitySelected] = useState();
    const [movieSelected, setMovieSelected] = useState();
    const [cinemaSelected, setCinemaSelected] = useState();
    const [newCitys, setNewCitys] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

   

    



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
                                    <ItemShowMore
                                        key={movie.id}
                                        movie={movie}
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

    const isDateAllowed = (date) => {
        const formattedDate = date.toISOString().slice(0, 10);
        return allDates.includes(formattedDate)
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

    const handleCitys = () => {
        if (!isLoading) {
            if (Array.isArray(newCitys) && newCitys.length > 0) {

                return (
                    <Select
                        isClearable={true}
                        isSearchable={true}
                        value={citySelected}
                        onChange={setCitySelected}
                        placeholder="Selecciona una ciudad..."
                        options={newCitys.map(
                            (city) => (
                                { value: city.nombre, label: city.nombre }
                            )
                        )}

                    ></Select>
                )
            }
            else if (Array.isArray(citys) && citys.length > 0) {
                return (<Select
                    isClearable={true}
                    isSearchable={true}
                    value={citySelected}
                    onChange={setCitySelected}
                    placeholder="Selecciona una ciudad..."
                    options={citys.map(
                        (city) => (
                            { value: city.nombre, label: city.nombre }
                        )
                    )}

                ></Select>)
            }
        }
    }


    

    return (
        <div className="complete-billboard">
            {!isLoading && 
            <div className="all-movies">
                

                {renderElements()}
                {amountOfPages()}
            </div>}
        </div>
    );
}

export default ShowMore;
