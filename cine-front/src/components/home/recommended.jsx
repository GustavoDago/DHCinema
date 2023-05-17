import { searchRandomMovies } from "../UseFetch";
import { Link } from "react-router-dom";
import Item from "../item";
import { useEffect, useState } from "react";

function Recommended() {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{

        
        const fetchMovieRandom = async () => {
            setIsLoading(true);
            try{
                const movieForCategorie = await searchRandomMovies()
                setMovies(movieForCategorie);
                setIsLoading(false);
            } catch (error) {
                console.error(error)
                setIsLoading(false);
                
            }
        };
        
        fetchMovieRandom()
    },[])

    return (
        <div className="recommended-section">
                <h3>Recomendados</h3>
                <div className="movie-container">
              {isLoading ? (
                <div>Cargando...</div>
              ) : (
                Array.isArray(movies) && movies.length > 0 ? (
                  movies.map(movie => (
                      <Item
                        key={movie.id}
                        id={movie.id}
                        name={movie.titulo}
                        image={movie.imagen}
                      />
                  ))
                ) : (
                  <div>No se encontraron películas</div>
                )
              )}
            </div>
        </div>
    )
}

export default Recommended;