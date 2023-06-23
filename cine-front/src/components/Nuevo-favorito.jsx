import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const NuevoFavorito = (props) => {
    const [isFavorited, setIsFavorited] = useState(false);
    
    const handleFavorite = () => {
        const pelicula_id = props.id;
        const usuario_id = sessionStorage.getItem("id");
      
        const categoryData = {
          pelicula_id,
          usuario_id,
        };
      
        if (isFavorited) {
            axios
              .put("http://localhost:8080/favoritos", { data: categoryData })
              .then((response) => {
                console.log(response.data); // Handle the server response as needed
                setIsFavorited(false);
                alert("Favorito eliminado correctamente");
              })
              .catch((error) => {
                console.error(error); // Handle the error if it occurs
              });
          } else {
            axios
              .post("http://localhost:8080/favoritos", categoryData)
              .then((response) => {
                console.log(response.data); // Handle the server response as needed
                setIsFavorited(true);
                alert("Favorito añadido correctamente");
              })
              .catch((error) => {
                console.error(error); // Handle the error if it occurs
              });
          }
    };
  
    return (
      <div>
        <button onClick={handleFavorite}>Favorite</button>
        
      </div>
    );
};

export default NuevoFavorito;
