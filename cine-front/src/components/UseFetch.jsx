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
        .then((response) => {return response.json()})
        .catch((error) => {
            console.error(error)
            return false
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

export const newMovie = async (data) => {
    const url='/peliculas'

    const response = await fetch (`${API_ENDPOINT}${url}`,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        console.log(response.status)
        if (response.status == 200)
            return true;
        else {
            console.log(response.text)
            return false;}
    })
    .catch((error) => {
        console.error(error)
        return error;
    })

    return response;
}

export const showPages = async (number) => {
    const url=`/peliculas/pagina/${number}`

    const response = await fetch (`${API_ENDPOINT}${url}`)
        .then((response) => {
            return response.json()
        })
        .catch((error)=>{
            console.log(error)
            return false;
        });
    
    return response;
}

export const fetchMovieDate = async (date) => {
    const url=`/peliculas/fecha/${date}`

    const response = await fetch (`${API_ENDPOINT}${url}`)
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log(error)
            return false;
        })
    
    return response;
}