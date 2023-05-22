import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)


    const onChangeUsername = (e) => setUsername(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeRememberMe = (e) => setRememberMe(e.target.checked)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (rememberMe) {
            localStorage.setItem('savedEmail', email);
            localStorage.setItem('savedPassword', password);
        } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('savedPassword')
        }
    }

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        const savedPassword = localStorage.getItem('savedPassword');
        if (savedEmail && savedPassword) {
            setUsername(savedEmail)
            setPassword(savedPassword)
            setRememberMe(false)
        }
    }, [])

    return (
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
                            <a>Registrate</a>
                        </Link>
                    </div>
                </div>
                <div className="sign-in-second">
                    <h3>Bienvenido de vuelta!</h3>
                    <p>Disfruta de los estrenos y las mejores peliculas en nuestros cines. Inicia sesion para obtener ya tu reserva!</p>
                </div>
            </div>

        </div>

    )
}

export default SignIn;