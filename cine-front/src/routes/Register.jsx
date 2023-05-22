import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker"
import es from 'date-fns/locale/es'
registerLocale("es", es)

function Register() {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [birthday, setBirthday] = useState(new Date())
    const [email, setEmail] = useState("")
    const [emailError,setEmailError] = useState('')
    const [confirmEmail, setConfirmEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError,setPasswordError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showAdress, setShowAdress] = useState(false)
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [number, setNumber] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [showBilling, setShowBilling] = useState(false)



    const onChangeName = (e) => setName(e.target.value)
    const onChangeLastname = (e) => setLastname(e.target.value)
    const onChangeBirthday = (date) => setBirthday(date)
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        validateEmail(e.target.value)
    }
    const onChangeEConfirmEmail = (e) => setConfirmEmail(e.target.value)
    const onChangePassword = (e) => {
        setPassword(e.target.value)
        validatePassword(e.target.value)
    }
    const onChangeConfirmPassword = (e) => setConfirmPassword(e.target.value)
    const onChangeState = (e) => setState(e.target.value)
    const onChangeCity = (e) => setCity(e.target.value)
    const onChangeStreet = (e) => setStreet(e.target.value)
    const onChangeNumber = (e) => setNumber(e.target.value)
    const onChangePostalCode = (e) => setPostalCode(e.target.value)
    const onChangeShowAdress = (e) => setShowAdress(e.target.checked)
    const onChangeShowBilling = (e) => setShowBilling(e.target.checked)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setEmailError('Ingrese un correo electrónico válido');
        } else {
          setEmailError('');
        }
    };

    const validatePassword = (value) => {
        if (value.length < 6) {
          setPasswordError('La contraseña debe tener al menos 6 caracteres');
        } else {
          setPasswordError('');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h3>Registro</h3>
                <div className="register-name">
                    <input
                        className="register-input"
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={name}
                        onChange={onChangeName}
                    />
                    <input
                        className="register-input"
                        type="text"
                        name="lastname"
                        placeholder="Apellido"
                        value={lastname}
                        onChange={onChangeLastname}
                    />
                </div>
                <div className="date-container">
                    <label>Fecha de nacimiento</label>
                    <div className="date-center">
                        <DatePicker
                            className="date-picker"
                            selected={birthday}
                            onChange={onChangeBirthday}
                            dateFormat={"dd-MM-yyyy"}
                            multiple
                            locale="es"
                        />
                    </div>
                </div>
                <div className="register-email-pass">
                    <input
                        className="register-input"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    {emailError && <p>{emailError}</p>}
                    <input
                        className="register-input"
                        type="email"
                        name="confirm-email"
                        placeholder="Confirmar e-mail"
                        value={confirmEmail}
                        onChange={onChangeEConfirmEmail}
                    />

                    <input
                        className="register-input"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={onChangePassword}
                    />
                    {passwordError && <p>{passwordError}</p>}
                    <input
                        className="register-input"
                        type="password"
                        name="cofirm-password"
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                    />
                </div>
                <label className="register-checkbox">
                    <input
                        
                        type="checkbox"
                        checked={showAdress}
                        onChange={onChangeShowAdress}
                    />
                    Ingresar una direccion de facturacion
                </label>
                {
                    showAdress ? (
                        <div className="register-adress">
                            <div>
                                <input
                                    className="register-input"
                                    type="text"
                                    name="state"
                                    placeholder="Provincia"
                                    value={state}
                                    onChange={onChangeState}
                                />
                                <input
                                    className="register-input"
                                    type="text"
                                    name="city"
                                    placeholder="Ciudad"
                                    value={city}
                                    onChange={onChangeCity}
                                />
                            </div>
                            <div>
                                <input
                                    className="register-input"
                                    type="text"
                                    name="street"
                                    placeholder="Calle"
                                    value={street}
                                    onChange={onChangeStreet}
                                />
                                <input
                                    className="register-input"
                                    type="text"
                                    name="number"
                                    placeholder="Numero"
                                    value={number}
                                    onChange={onChangeNumber}
                                />
                                <input
                                    className="register-input"
                                    type="text"
                                    name="postal-code"
                                    placeholder="Codigo postal"
                                    value={postalCode}
                                    onChange={onChangePostalCode}
                                />
                            </div>
                            <label className="register-checkbox">
                                <input
                                    
                                    type="checkbox"
                                    checked={showBilling}
                                    onChange={onChangeShowBilling}
                                />
                                Ingresar un metodo de pago
                            </label>

                        </div>
                    ) : ("")
                }

                <button className="new-button" type="submit">Registrarse</button>
            </form>
        </div>

    )
}

export default Register;