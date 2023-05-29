// Clase GlobalContext preparada para recibir los datos del fetch y proveer a los hijos

/** import { createContext, useState, useMemo } from "react";
import { useFetch } from "./UseFetch";



export const GlobalContext = createContext();

export const ContextProvider = ({children}) => {
    const [query,setQuery] = useState("movie");
    const {isLoading, error, data} = useFetch(``)

    return (<ContextProvider.Provider value={providerApi.data}>
        {children}
    </ContextProvider.Provider>);
} */