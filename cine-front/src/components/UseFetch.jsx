// Clase preparada para recibir una url y hacer peticiones a traves de un parametro

const API_ENDPOINT = `http://localhost:8080`;


export const searchMoviesForCategories = async (url) => {

    if (url === 'Todos')
    {
        url = '/peliculas'
    }else {
        url = `/peliculas/categoria/${url}`
    }
    
    console.log(`${API_ENDPOINT}${url}`)

    const response = await fetch(`${API_ENDPOINT}${url}`)
        .then((response) =>{return response.json()
        } )
        .catch(error => {
            console.error(error)
        });
    console.log(response)
    return response;
};

export const searchRandomMovies = () => {
    const url =`/peliculas/random`


    return fetch(`${API_ENDPOINT}${url}`)
        .then((response) => response.json())
        .catch(error => {
            console.error(error)
        });
    
}

export const searchMovieDetails = (id) =>{
    const url=`/peliculas/${id}`

    return fetch(`${API_ENDPOINT}${url}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error)
        });
}

export const deleteMovie = async (id) => {
    const url=`/peliculas/${id}`

    const response = await fetch(`${API_ENDPOINT}${url}`,{
        method: 'DELETE'
        })
        .then((response) => {
            console.log(response.status)
            if (response.status == 200)
                return true
            else return false
        }
            
        )
        .catch((error) => {
            console.error(error)
            return error
        })

    
    return response;

}