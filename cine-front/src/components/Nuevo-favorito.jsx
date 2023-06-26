import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NuevoFavorito = (props) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritoId, setFavoritoId] = useState(null);

  useEffect(() => {
    const fetchFavorito = async () => {
      const pelicula_id = props.id;
      const usuario_id = sessionStorage.getItem("id");

      try {
        const response = await axios.get("http://localhost:8080/favoritos", {
          params: { pelicula_id, usuario_id },
        });

        if (response.data && response.data.id) {
          setFavoritoId(response.data.id);
          setIsFavorited(true);
        } else {
          setFavoritoId(null);
          setIsFavorited(false);
        }
      } catch (error) {
        console.error(error); // Handle the error if it occurs
      }
    };

    fetchFavorito();
  }, [props.id]);

  const handleFavorite = () => {
    const pelicula_id = props.id;
    const usuario_id = sessionStorage.getItem("id");

    const categoryData = {
      pelicula_id,
      usuario_id,
    };

    if (isFavorited) {
      axios
        .put(`http://localhost:8080/favoritos/${favoritoId}`, {
          data: categoryData,
        })
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
          setFavoritoId(response.data.id);
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
      <button onClick={handleFavorite}>
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>
    </div>
  );
};

export default NuevoFavorito;
