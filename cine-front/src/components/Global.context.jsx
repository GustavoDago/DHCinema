// Clase GlobalContext preparada para recibir los datos del fetch y proveer a los hijos

import { createContext, useState } from "react";




export const UserContext = createContext([]);

export const ContextProvider = ({children}) => {
    const [userData,setUserData] = useState([])

    return (
    <UserContext.Provider value={{userData,setUserData}}>
        {children}
    </UserContext.Provider>);
} 