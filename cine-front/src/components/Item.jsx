
import { Link } from "react-router-dom";
import NuevoFavorito from "./Nuevo-favorito";

function Item(props) {
  

  return (
    <div className="movie-card">
      <figure>
        <NuevoFavorito id={props.id} />
        <div className="opt-card">
          <p>{props.name}</p>
          <Link key={props.id} to={`/peliculas/${props.id}`}>
            <button id="details-button">Detalles</button>
          </Link>
        </div>
        <img className="opt-image" src={props.image} alt={props.name} />
        
      </figure>
    </div>
  );
}

export default Item;
