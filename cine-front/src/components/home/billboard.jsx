import { useEffect, useState } from "react";
import { searchMoviesForCategories } from "../UseFetch";
import Item from "../item"
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";

function Billboard(props) {

    const [movies,setMovies] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const titulo = () =>{
        if (props.categorie !== "Todos"){
            return (<h2>{`Peliculas de ${props.categorie.toLowerCase()}`}</h2>)
        } else {
            return (<h2>CARTELERA</h2>);
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

    const loadingBox = () => {
      const loaders = []
  
        for (let i=0;i<8;i++){
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
  
    const renderBillboard = () => {
        return (
            <div className="movie-container">
              {isLoading ? (
                  loadingBox()
                )
               : (
                Array.isArray(movies) && movies.length > 0 ? (
                  movies.slice(0,10).map(movie => (
                      <Item
                        key={movie.id}
                        id={movie.id}
                        name={movie.titulo}
                        image={movie.imagen}
                      />
                  ))
                ) : (
                  loadingBox()
                )
              )}
            </div>
          );
    }




    return (
    <div className="billboard-section">
    {titulo()}
    {renderBillboard()}
    <Link to={`/peliculas/pagina/1`}>
        <button>VER MAS</button>
    </Link>
    </div>
    );
}

export default Billboard;