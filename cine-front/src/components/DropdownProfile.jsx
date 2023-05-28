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
                <img src="/icons/account-icon.svg" />
            </div>
            <div className={`drop-down-profile ${open? 'active' : 'inactive'}`}>
                <ul>
                    <Link to='/inicio-sesion'>
                        <li className="drop-down-item">Iniciar Sesion</li>
                    </Link>
                    <Link to='/registrarse'>
                        <li className="drop-down-item">Crear Cuenta</li>
                    </Link>
                    <Link to='/admin'>
                        <li className="drop-down-item">Panel de Administrador</li>
                    </Link>

                </ul>
            </div>

        </div>

    )
}

export default DropdownProfile;