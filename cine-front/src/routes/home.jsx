import React, { useState,useRef } from "react"
import data from "../components/utils/data.json"
import Item from "../components/utils/item"
import categories from "../components/utils/categories.json"
import Categorie from "../components/utils/categorie"

function Home() {


    const[showCategorie,setShowCategorie] = useState("Todos");



    const updateCategorie = (value) => {
        setShowCategorie(value);
    }

    const titulo = () =>{
        if (showCategorie !== "Todos"){
            return (<h3>{`Peliculas de ${showCategorie.toLowerCase()}`}</h3>)
        } else {
            return (<h3>Cartelera</h3>);
        }
    }

    const divRef = useRef(null);

    const btnpressprev = () => {
        let width = divRef.current.offsetWidth;
        divRef.current.scrollLeft = divRef.current.scrollLeft - width;
        console.log(width)
    }
  
    const btnpressnext = () => {
        let width = divRef.current.offsetWidth;
        divRef.current.scrollLeft = divRef.current.scrollLeft + width;
        console.log(width)
    }



    return(
        <div className="home-section">
            <div className="categories-section">
                <img className='first-button' src="./icons/atras.png"onClick={btnpressprev}/>
                <div className="carrousel-slider" ref={divRef}>
                    {categories.map(categorie => (
                        <Categorie
                            value = {showCategorie}
                            updateFather = {updateCategorie}
                            key = {categorie.id}
                            name = {categorie.name}
                            image = {categorie.image}
                        />
                    ))}
                </div>
                <img className='last-button' src="./icons/adelante.png" onClick={btnpressnext}/>
            </div>
            <div className="billboard-section">
                    {titulo()}
                    <div className="movie-container">
                    {data.filter(dataM=> {
                        if (showCategorie == "Todos")
                            return dataM;
                        else if(dataM.movie.categories.includes(showCategorie) === true){
                            return dataM.movie.categories.includes(showCategorie) === true;
                        }
                    }).map(movie =>{
                        return <Item
                        key={movie.id}
                        name={movie.movie.name}
                        image={movie.image}
                    />
                    }
                        
                    )}
                    
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