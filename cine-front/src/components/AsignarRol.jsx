import { useEffect, useState } from "react";
import { fetchRolList, fetchUserList } from "./UseFetch";
import Accordion from "./Accordion";

const AsignarRol = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rolList, setRolList] = useState([]);

  useEffect(() => {
    const getUsersRolList = async () => {
      setIsLoading(true);
      try {
        const users = await fetchUserList();
        const rols = await fetchRolList();
        if (rols && users) {
          const updatedList = users
          .filter(user => user.nombre !== 'admin') // Filtrar usuarios con nombre "admin"
          .map(user => {
            const userRoles = rols.map(rol => {
              const isSelected = user.roles.some(userRol => userRol.nombre === rol.nombre);
              return { ...rol, isSelected };
            });
            return { ...user, roles: userRoles };
          })
          setUserList(updatedList);
          setIsLoading(false);
        }
        } 
    catch (error) {
      console.error(error);
    }
  }

    getUsersRolList();
  }, []);

  const handleRolChanger = (userId, rolId) => {
    const updatedUserList = userList.map(user => {
      if (user.id === userId) {
        const updatedRoles = user.roles.map(rol => {
          if (rol.id === rolId) {
            return { ...rol, isSelected: !rol.isSelected };
          }
          return rol;
        });
        return { ...user, roles: updatedRoles };
      }
      return user;
    });

    setUserList(updatedUserList);
  };

  const submitChanges = async () => {
    try {
      for (const user of userList) {
        const updatedRoles = user.roles.filter(rol => rol.isSelected).map(rol => ({ nombre: rol.nombre }));

        


        const requestBody = updatedRoles
        console.log(requestBody);
        const response = await fetch(`http://localhost:8080/usuarios/${user.email}/roles`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            alert(`Cambios guardados exitosamente para el usuario con email: ${user.email}`);
        } else {
          alert(`Error al guardar los cambios para el usuario con email: ${user.email}`);
        }
      }
    } catch (error) {
      alert('Error al enviar las solicitudes:', error);
    }
  };

  return (
    <div>
      <div>Listado Usuarios</div>
      {!isLoading && Array.isArray(userList) && userList.length > 0 ? (
        userList.filter(user => user.email !== sessionStorage.getItem('email')).map(user => (
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
                {Array.isArray(user.roles) && user.roles.length > 0 && (
                  user.roles.map(rol => (
                    <label key={rol.id}>
                      <input
                        type="checkbox"
                        value={rol.id}
                        checked={rol.isSelected}
                        onChange={() => handleRolChanger(user.id, rol.id)}
                      />
                      {rol.nombre}
                    </label>
                  ))
                )}
              </div>
            }
            active={false}
          />
        ))
      ) : 'Cargando listado'}
      <button onClick={submitChanges}>Guardar</button>
    </div>
  );
};

export default AsignarRol;