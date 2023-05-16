// Clase preparada para recibir una url y hacer peticiones a traves de un parametro

const API_ENDPOINT = `http://localhost:8080`;


export const searchMoviesForCategories = (url) => {

    if (url === 'Todos')
    {
        url = '/peliculas'
    }else {
        url = `/peliculas/categoria/${url.toLowerCase()}`
    }
    
    console.log(`${API_ENDPOINT}${url}`)

    return fetch(`${API_ENDPOINT}${url}`)
        .then((response) => response.json())
        .catch(error => {
            console.error(error)
        });
};

export const searchRandomMovies = () => {
    const url =`/peliculas/random`


    return fetch(`${API_ENDPOINT}${url}`)
        .then((response) => response.json())
        .catch(error => {
            console.error(error)
        });
    
}