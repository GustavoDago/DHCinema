import { useEffect, useState } from "react";
import { fetchRolList, fetchUserList } from "./UseFetch";
import Accordion from "./Accordion";

const AsignarRol = () => {
    const [userList, setUserList] = useState([])
    const [userSelected,setUserSelected] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [rolList, setRolList] = useState([])

    useEffect(() => {
        const getUsersRolList = async () => {
            setIsLoading(true);
            try {
                const users = await fetchUserList()
                const rols = await fetchRolList()
                if (rols && users) {
                    console.log(rols)
                    const updateList = users.map(user => {
                        const newRolList = rols.map(rol => {
                            const isSelected = user.roles.some(roles => roles.nombre == rol.nombre)
                            return {
                            ...rol,
                            isSelected: isSelected,
                            isChange: false
                        }})
                        user.roles = newRolList
                        console.log(user.roles)
                        console.log(user)
                        return user;
                    })
                    
                    setUserList(updateList)
                    setIsLoading(false)
                }
            } catch (error) {
                console.error(error)
            }
        }

        getUsersRolList()
    }, [])


    const handleRolChanger = (userId,rolId) =>{
        const updateUser = userList.map(user => {
            if(user.id === userId){
                const updateRol = user.roles.map(rol => {
                    if(rol.id === rolId){
                        return {
                            ...rol,
                            isSelected: !rol.isSelected,
                            isChange: true
                        }
                    }
                    return rol;
                })
                user.roles = updateRol;
                return user;
            }
            return user;
        })

        
        setRolList(updateUser)

        
    }

    const submitChanges = () =>{
        
    }



    return (
        <div>
            <div>
                Listado Usuarios
            </div>
            {!isLoading && Array.isArray(userList) && userList.length > 0 ? (
                userList.filter(user => user.email !== sessionStorage.getItem('email')).map((user) => (
                    <Accordion
                        key={user.id}            
                        title={
                            <div>
                                <h3>{user.id}</h3>
                                <h3>{user.email}</h3>
                            </div>
                        }
                        content={
                            <div>
                                <h4>Nombre: {user.nombre}</h4>
                                <h4>Apellido: {user.apellido}</h4>
                                <h4>Email: {user.email}</h4>
                                <h4>Esta activo: {user.activo ? 'Usuario activado' : 'Falta confirmacion del email'}</h4>
                                <label>Roles:</label>
                                {
                                    Array.isArray(user.roles) && user.roles.length > 0 && (
                                        user.roles.map((rol) => (
                                            <label key={rol.id}>
                                                <input 
                                                    type="checkbox"
                                                    value={rol.id}
                                                    checked={rol.isSelected}
                                                    onChange={()=> handleRolChanger(user.id,rol.id)}
                                                />
                                                {rol.nombre}
                                            </label>
                                        ))
                                    )
                                }

                            </div>
                        }
                        active={false}
                        
                    />
                )
                )
            ) : 'Cargando listado'}
                <button onClick={submitChanges}>
                    Guardar
                </button>
        </div>
    );
}

export default AsignarRol;