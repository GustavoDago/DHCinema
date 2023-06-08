import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"

const DropdownProfile = () => {
    const [open,setOpen] = useState(false);
    let menuRef = useRef();
    

    useEffect(() => {
        let handler = (e) => {
            if(!menuRef.current.contains(e.target)){
                setOpen(false)
            }
        }

        document.addEventListener("mousedown",handler)

        return() => {
            document.removeEventListener("mousedown",handler)
        }
    },[])

    return (
        <div className="account-container" ref={menuRef}>
            
            <div className="account-trigger" onClick={() => {setOpen(!open)}}>
            {!sessionStorage.getItem('role') ? 
            (<img src="/icons/account-icon.svg" />) 
            :
            <div>{sessionStorage.getItem('nombre').charAt(0)}{sessionStorage.getItem('apellido').charAt(0)} </div>
            }
            </div>
            <div className={`drop-down-profile ${open? 'active' : 'inactive'}`}>
                <ul>
                    {sessionStorage.getItem('role') &&
                        <Link to='/perfil'>
                            <li className="drop-down-item">Perfil {!sessionStorage.getItem('nombre')}</li>
                        </Link>
                    }
                    {!sessionStorage.getItem('role') &&
                        <Link to='/inicio-sesion'>
                            <li className="drop-down-item">Iniciar Sesion</li>
                        </Link>
                    }
                    {!sessionStorage.getItem('role')  &&
                        <Link to='/registrarse'>
                            <li className="drop-down-item">Crear Cuenta</li>
                        </Link>
                    }
                    {sessionStorage.getItem('role') == 'ADMIN' &&
                        <Link to='/admin'>
                            <li className="drop-down-item">Panel de Administrador</li>
                        </Link>
                    }
                    {sessionStorage.getItem('role') &&
                        <Link to='/cerrar-sesion'>
                            <li className="drop-down-item">Cerrar Sesion</li>
                        </Link>
                    }

                </ul>
            </div>

        </div>

    )
}

export default DropdownProfile;