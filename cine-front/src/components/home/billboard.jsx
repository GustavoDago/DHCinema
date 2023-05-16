import { useEffect, useState } from "react";
import { searchMoviesForCategories } from "../UseFetch";
import Item from "../item"
import { Link } from "react-router-dom";



function Billboard(props) {

    const [movies,setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const titulo = () =>{
        if (props.categorie !== "Todos"){
            return (<h3>{`Peliculas de ${props.categorie.toLowerCase()}`}</h3>)
        } else {
            return (<h3>Cartelera</h3>);
        }
    }
    


    useEffect(()=>{

        
        const fetchMovieForCategorie = async () => {
            setIsLoading(true);
            try{
                const movieForCategorie = await searchMoviesForCategories(props.categorie)
                console.log(props.categorie)
                setMovies(movieForCategorie);
                console.log(movies)
                setIsLoading(false);
            } catch (error) {
                console.error(error)
                setIsLoading(false);
                
            }
        };
        
        fetchMovieForCategorie()
    },[props.categorie])
    

   

    const renderBillboard = () => {
        return (
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
          );
    }


    return (
    <div className="billboard-section">
    {titulo()}
    {renderBillboard()}
    <Link key={props.categorie} to={`${props.categorieInfo}`}>
        <button>Ver mas</button>
    </Link>
    </div>
    );
}

export default Billboard;