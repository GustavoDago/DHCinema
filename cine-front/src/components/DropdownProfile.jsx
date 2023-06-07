import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import ModalGlobal from "./GlobalModal";

const DropdownProfile = () => {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    let menuRef = useRef();
    const navigate = useNavigate()

    const closeModal = () => {
        setShowConfirmation(false)
    }

    const handleConfirm = (confirm) => {
        setShowConfirmation(true)
        if (confirm) {
            sessionStorage.clear()
            setMessage(
                <div className="modal-content-register">
                    Cerro sesion correctamente!
                    <img src='/icons/accept.svg' />
                </div>
            )
            setTimeout(() => {
                setShowConfirmation(false)
                setMessage('')
            },3000)
        } else {
            setMessage('')
            setShowConfirmation(false)
        }
    }

    const handleShowConfirmation = () => {
        setShowConfirmation(true)
        setMessage(
            <div className="modal-content-register">
                <div className="log-out-confirmation">
                    <h3>Seguro que quieres cerrar sesion?</h3>
                </div>
                <div className="modal-buttons">
                    <button onClick={() => handleConfirm(true)}>Si</button>
                    <button onClick={() => handleConfirm(false)}>No</button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])

    return (
        <div className="account-container" ref={menuRef}>

            <div className="account-trigger" onClick={() => { setOpen(!open) }}>
                <img src="/icons/account-icon.svg" />
            </div>
            <div className={`drop-down-profile ${open ? 'active' : 'inactive'}`}>
                <ul>
                    {!sessionStorage.getItem('role') &&
                        <Link to='/inicio-sesion'>
                            <li className="drop-down-item">Iniciar Sesion</li>
                        </Link>
                    }
                    {!sessionStorage.getItem('role') &&
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
                        <li className="drop-down-item" onClick={handleShowConfirmation}>Cerrar Sesion</li>
                    }

                </ul>
            </div>

            <ModalGlobal
                showConfirmation={showConfirmation}
                closeModal={closeModal}
                message={message}
                shouldClose={false}
            />

        </div>

    )
}

export default DropdownProfile;