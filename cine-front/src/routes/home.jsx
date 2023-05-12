import React from "react"
import data from "../components/utils/data.json"
import Item from "../components/utils/item"
import categories from "../components/utils/categories.json"
import Categorie from "../components/utils/categorie"

function Home() {

    

    return(
        <div className="home-section">
            <div className="categories-section">
                <div className="carrousel-slider">
                    {categories.map(categorie => (
                        <Categorie
                            key = {categorie.id}
                            name = {categorie.name}
                            image = {categorie.image}
                        />
                    ))}
                </div>
            </div>
            <div className="billboard-section">
                <h3>Cartelera</h3>
                <div className="movie-container">
                    {data.map(data=> (
                        <Item
                            key={data.id}
                            name={data.movie.name}
                            image={data.image}
                        />
                        ))
                    }
                </div>
            </div>
            <div className="recommended-section">
                <h3>Recomendados</h3>
                <div className="movie-container">
                    {data.map(data=> (
                        <Item
                            key={data.id}
                            name={data.movie.name}
                            image={data.image}
                        />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home