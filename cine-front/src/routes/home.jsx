import React, { useState,useRef } from "react"
import categories from "../components/utils/categories.json"
import Categorie from "../components/utils/categorie"

import Billboard from "../components/home/billboard"
import Recommended from "../components/home/recommended"

function Home() {


    const[showCategorie,setShowCategorie] = useState("Todos");

 


    const updateCategorie = (value) => {
        setShowCategorie(value);
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

    const categorieInformation = () =>{
        if (showCategorie === "Todos"){
            return null;
        } else {
            return showCategorie.toLowerCase()
        }
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
            <Billboard
                categorieInfo = {categorieInformation()}
                categorie = {showCategorie}
            />
            <Recommended/>
        </div>
    )
}

export default Home