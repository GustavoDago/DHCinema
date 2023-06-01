import React, { useState, useRef, useContext } from "react"
import categories from "../components/utils/categories.json"
import Categorie from "../components/utils/Categorie"
import Billboard from "../components/home/Billboard"
import Recommended from "../components/home/Recommended"
import { useEffect } from "react"


function Home() {
    
 
    const [index, setIndex] = useState(0);
    const [showCategorie, setShowCategorie] = useState("Todos");
    const timeRef = useRef(null)
    const mod = (n, m) => {
        let result = n % m;
        return result >= 0 ? result : result + m;
    };
    
    useEffect(() => {
        window.scrollTo(0, 0);
        
    },[])

    const cards = [
        {
            id: "1",
            name: "SUPER MARIO BROS",
            generos: "Aventura",
            time: "2h 10m",
            image: "https://image.tmdb.org/t/p/original/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
        },
        {
            id: "2",
            name: "JOHN WICK 4",
            generos: "Accion",
            time: "2h 10m",
            image: "https://image.tmdb.org/t/p/original/7I6VUdPj6tQECNHdviJkUHD2u89.jpg",
        },
        {
            id: "3",
            name: "SISU",
            generos: "Accion",
            time: "2h 10m",
            image: "https://image.tmdb.org/t/p/original/7wGbeXTCW83nQAOw1sbAhA7oKiS.jpg",
        },
    ];

    useEffect(() => {
        if(timeRef.current !=null)
            clearTimeout(timeRef.current);
        const timer = setTimeout(() => {
            setIndex((prevIndex) => mod(prevIndex + 1, cards.length));
        }, 3000);

        timeRef.current = timer;

        return () => clearTimeout(timeRef.current);
    }, [index]);

    const handleClickRight = () => {
        setIndex((prevIndex) => mod(prevIndex + 1, cards.length));
    }

    const handleClickLeft = () => {
        setIndex((prevIndex) => mod(prevIndex-1,cards.length))
    }

    const handleMouseEnter = () => {
        clearTimeout(timeRef.current);
    };

    const handleMouseLeave = () => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
            timeRef.current = setTimeout(() => {
              setIndex((prevIndex) => mod(prevIndex + 1, cards.length));
            }, 3000);
        }
    };



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

    return (

        <div className="home-section">
            <div className="carousel-section">
                <div className="carousel">
                    {cards.map((item, i) => {
                        const indexLeft = mod(index - 1, cards.length);
                        const indexRight = mod(index + 1, cards.length);

                        let className = "card";

                        if (i === index) {
                            className = "card card--active";
                          } else if (i === mod(index + 1, cards.length)) {
                            className = "card card--right";
                          } else if (i === mod(index - 1, cards.length)) {
                            className = "card card--left";
                        }

                        return (
                            <div className={className}
                                onClick={() => {
                                    if (className === "card card--right") {
                                        handleClickRight();
                                      } else if (className === "card card--left") {
                                        handleClickLeft();
                                      }
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                key={item.id}>
                                <figure>
                                    <div>
                                        <h4>DESTACADOS</h4>
                                        <h1>{item.name}</h1>
                                        <h3>{item.generos} - {item.time}</h3>
                                        <button>Detalles</button>
                                        <button>Reservar Ahora</button>
                                    </div>
                                    <img
                                        src={item.image}
                                        alt="Desctacados"
                                    ></img>
                                </figure>
                            </div>

                        );
                    })}
                </div>
            </div>

            <div className="categories-section">
                <img className='first-button' src="./icons/atras.svg" onClick={btnpressprev} />
                <div className="carrousel-slider" ref={divRef}>
                    {categories.map(categorie => (
                        <Categorie
                            value={showCategorie}
                            updateFather={updateCategorie}
                            key={categorie.id}
                            name={categorie.name}
                            image={categorie.image}
                        />
                    ))}
                </div>
                <img className='last-button' src="./icons/adelante.svg" onClick={btnpressnext} />
            </div>

            <Billboard
                categorie={showCategorie}
            />
            <Recommended />


        </div>
    )
}

export default Home
