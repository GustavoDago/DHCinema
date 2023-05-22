import { useState } from "react";

function Register () {
    const [name, setName] = useState("")
    const [lastname,setLastname] = useState("")
    const [birthday, setBirthday] = useState("")

    return (
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


                        <button type="submit">Iniciar Sesión</button>
                    </form>
    )
}

export default Register;