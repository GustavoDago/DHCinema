// Clase preparada para recibir una url y hacer peticiones a traves de un parametro

const API_ENDPOINT = `http://localhost:8080`;


export const searchMoviesForCategories = async (url) => {

    if (url === 'Todos') {
        url = '/peliculas'
    } else {
        url = `/peliculas/categoria/${url}`
    }

    console.log(`${API_ENDPOINT}${url}`)

    const response = await fetch(`${API_ENDPOINT}${url}`)
        .then((response) => {
            return response.json()
        })
        .catch(error => {
            console.error(error)
        });
    console.log(response)
    return response;
};

export const searchRandomMovies = () => {
    const url = `/peliculas/random`


    return fetch(`${API_ENDPOINT}${url}`)
        .then((response) => response.json())
        .catch(error => {
            console.error(error)
        });

}

export const searchMovieDetails = (id) => {
    const url = `/peliculas/${id}`

    return fetch(`${API_ENDPOINT}${url}`)
        .then((response) => { return response.json() })
        .catch((error) => {
            console.error(error)
            return false
        });
}

export const deleteMovie = async (id) => {
    const url = `/peliculas/${id}`

    const response = await fetch(`${API_ENDPOINT}${url}`, {
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
    const url = '/peliculas'

    const response = await fetch(`${API_ENDPOINT}${url}`, {
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
                return false;
            }
        })
        .catch((error) => {
            console.error(error)
            return error;
        })

    return response;
}

export const showPages = async (number) => {
    const url = `/peliculas/pagina/${number}`

    const response = await fetch(`${API_ENDPOINT}${url}`)
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log(error)
            return false;
        });

    return response;
}

export const fetchMovieTilte = async (title) => {
    const url = `/peliculas/titulo/${encodeURIComponent(title)}`

    const response = await fetch(`${API_ENDPOINT}${url}`)
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log(error)
            return false;
        })

    return response;
}

export const fetchRegisterUser = async (user) => {
    const url = "/usuarios/register"
    console.log(user)
    const response = await fetch(`${API_ENDPOINT}${url}`,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then((response) => {
        if (response){
            console.log(response)
            return response.text();
        } else {
            throw new Error('Error en la solicitud HTTP');
        }
        
    }).then(data => {
        console.log(data)
        return data;
    })
    .catch((error) => {
        console.log(error)
        return false;
    })

    return response;
}

export const fetchLogInUser = async (user) => {
    const url = "/usuarios/login"

    const response = await fetch(`${API_ENDPOINT}${url}`,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then((response) => {
        if (response.ok){
            return response.text();
        } else {
            throw new Error('Error en la solicitud HTTP');
        }
    }).then(data => {
        console.log(data)
        return data;
    })
    .catch((error) => {
        console.log(error)
        return false;
    })

    return response;
}

export const confirmAccount = async (token) => {
    const url = `/usuarios/confirmar-cuenta?token=${token}`

    const response = await fetch(`${API_ENDPOINT}${url}`)
    .then((response) => {
        if (response){
            return response.text();
        } else {
            throw new Error('Error en la solicitud HTTP');
        }
    }).then(data => {
        console.log(data)
        return data;
    })
    .catch((error) => {
        console.log(error)
        return false;
    })

    return response;
}

export const fetchGetUsuario = async (email) => {
    const url = `/usuarios/${email}`

    console.log(`${API_ENDPOINT}${url}`)

    const response = await fetch(`${API_ENDPOINT}${url}`)
        .then((response) => {
            return response.json()
        })
        .catch(error => {
            console.error(error)
        });
    console.log(response)
    return response;
}

export const fetchCategorias = async () => {
    const url='/categorias'

    const response = await fetch(`${API_ENDPOINT}${url}`)
        .then((response) => {
            return response.json()
        })
        .catch(error => {
            console.error(error)
        });
    console.log(response)
    return response;
}