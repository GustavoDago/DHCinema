// Clase preparada para recibir una url y hacer peticiones a traves de un parametro

/**  const API_ENDPOINT = ``;

export const useFetch = params => {
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState(false);
    const [data,setData] = useState(null);

    const fetchMovie = url => {
        setIsLoading (true);
        fetch(url)
            .then(respond => respond.json())
            .then(respondJson => {
                if (respondJson.Response === true){
                    setData(respondJson.Search);
                    setError(false);
                } else {
                    setError(true);
                }
                setIsLoading(false);
                console.log("data: ",respondJson);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchMovie(`${API_ENDPOINT}${params}`)
    }, [params])

    return {isLoading,error,data}
} */