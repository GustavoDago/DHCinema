import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader"
import { fetchLogInUser } from '../components/UseFetch'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate()


    const closeModal = () => {
        setShowConfirmation(false)
    }
    const customStyles = {
        overlay: { zIndex: 1000 }
    }
    const onChangeUsername = (e) => setUsername(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeRememberMe = (e) => setRememberMe(e.target.checked)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowConfirmation(true)
        setIsLoading(true)

        if (rememberMe) {
            localStorage.setItem('savedEmail', username);
            localStorage.setItem('savedPassword', password);
            localStorage.setItem('rememberMe', rememberMe);
        } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('savedPassword')
            localStorage.removeItem('rememberMe')
        }

        try {
            const data = {
                email: username,
                password: password,
            }
            
            const response = await fetchLogInUser(data);
            if (response != false && response != null) {
                console.log(response);
                if (response.includes('valida')) {
                    setIsLoading(false);
                    setMessage(response);
                    setAccepted(true);
                    setTimeout(() => {
                        setMessage('')
                        setAccepted(false)
                        setShowConfirmation(false);
                        navigate("/");
                    }, 3500)
                } else {
                    setIsLoading(false);
                    setMessage('');
                    setAccepted(false);
                    setTimeout(() => {
                        setMessage('No se encuentra registrado o no verifico su correo.')
                        setShowConfirmation(false);
                    }, 2000)
                } 

            }else{
                setIsLoading(false);
                setMessage('Hubo un error con el servidor. Vuelve a intentarlo.')
                setAccepted(false);
                setTimeout(() => {
                    setMessage('')
                    setShowConfirmation(false);
                }, 2000)
            }
        } catch (error) {
            setIsLoading(false);
            setMessage("Hubo un error con el servidor. Vuelve a intentarlo.");
            setAccepted(false);
            setTimeout(() => {
                setShowConfirmation(false);
            }, 3500)
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0);
        const savedEmail = localStorage.getItem('savedEmail');
        const savedPassword = localStorage.getItem('savedPassword');
        const savedRememberMe = localStorage.getItem('rememberMe', rememberMe);
        if (savedEmail && savedPassword) {
            setUsername(savedEmail)
            setPassword(savedPassword)
            setRememberMe(savedRememberMe)
        }
    }, [])

    return (
        <div className="sign-in-background">
            <div className="sign-in-container">
                <div className="sign-in">
                    <div className="sign-in-first">
                        <div>
                            <h2>Bienvenido!</h2>
                            <p>Inicia sesion en tu cuenta</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="sign-in-inputs"
                                id="input-username"
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={username}
                                onChange={onChangeUsername}
                            />
                            <input
                                className="sign-in-inputs"
                                id="input-password"
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={onChangePassword}
                            />
                            <div className="remember-me">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={onChangeRememberMe}
                                    />
                                    Recordarme
                                </label>
                                <a>¿Olvidaste tu contraseña?</a>
                            </div>


                            <button className="new-button" type="submit">Iniciar Sesión</button>
                        </form>
                        <div className="register-div">
                            <p>Todavia no tienes cuenta?</p>
                            <Link to="../registrarse">
                                Registrate
                            </Link>
                        </div>
                    </div>
                    <div className="sign-in-second">
                        <h3>Bienvenido de vuelta!</h3>
                        <p>Disfruta de los estrenos y las mejores peliculas en nuestros cines. Inicia sesion para obtener ya tu reserva!</p>
                    </div>
                </div>

            </div>
            <Modal
                isOpen={showConfirmation}
                onRequestClose={closeModal}
                contentLabel="Confirmacion"
                className="modal"
                style={customStyles}
                shouldCloseOnOverlayClick={false}
            >

                <div className="modal-conteiner">
                    <div className="modal-content-register">
                        {message}
                        {isLoading ? (
                            <BounceLoader
                                color="#36d7b7"
                                speedMultiplier={2}
                                loading
                            />
                        ) : (
                            accepted ? (
                                <img src='./icons/accept.svg' />
                            ) : (
                                <img src='./icons/denied.svg' />
                            )
                        )
                        }
                    </div>
                </div>
            </Modal>
        </div>

    )
}

export default SignIn;