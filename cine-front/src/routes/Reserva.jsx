import { Stepper, Step, StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchSearchFunction, searchMovieDetails, fetchReserve } from "../components/UseFetch";
import { useNavigate, useParams } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import moment from "moment/moment";




const schema = yup.object({
    nombre: yup.string()
        .required('Se requiere un nombre.')
        .matches(/^[a-zA-ZÀ-ÿ\s]/, 'El nombre no puede poseer caracteres especiales o números.'),
    apellido: yup.string()
        .required('Se requiere un apellido.')
        .matches(/^[a-zA-ZÀ-ÿ\s]/, 'El nombre no puede poseer caracteres especiales o números.'),
    dni: yup.number()
        .required('Se requiere un DNI.')
        .min(6, 'El DNI debe ser mayor a 6 caracteres.'),
    email: yup.string()
        .required('Se requiere un email.')
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Se requiere un email válido.'),
    confirmacionEmail: yup.string()
        .required('Se requiere este campo.')
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Se requiere un email válido.')
        .oneOf([yup.ref('email')], 'Los emails no coinciden entre si.'),

})

const Reserva = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [movie, setMovie] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [cinema, setCinema] = useState(null)
    const [funct, setFunct] = useState(null)
    const [titulo, setTitulo] = useState(null)
    const [searchFunctions, setSearchFunctions] = useState(null)
    const [seats, setSeats] = useState(1)
    const [price, setPrice] = useState(0)
    const [message, setMessage] = useState("Cargando la reserva")
    const [submessage, setSubmessage] = useState("Espere un momento mientras cargamos su reserva. Por favor no refresque ni cierre la pagina.")
    const navigate = useNavigate()
    const [contentAwait, setContentAwait] = useState(true)
    const params = useParams()



    useEffect(() => {
        window.scrollTo(0, 0);
        moment.locale('es', {
            months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
            monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
            weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
            weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
            weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
        }
        );
        setIsLoading(true)
        const fetchMovieId = async () => {
            try {
                const url = new URL(window.location.href);
                const searchParams = new URLSearchParams(url.search);

                const cinemaS = searchParams.get('cine')
                const functionS = searchParams.get('funcion')
                const tituloS = searchParams.get('titulo')
                if (cinemaS != null && functionS != null && tituloS != null) {
                    const search = await fetchSearchFunction(cinemaS, tituloS)
                    if (search) {
                        setCinema(cinemaS)
                        setTitulo(tituloS)
                        setSearchFunctions(search)
                    }
                }

                const movieForId = await searchMovieDetails(params.id)
                if (movieForId != false && movieForId) {
                    setMovie(movieForId)
                    const funcion = movieForId.funciones.filter(func => func.id == functionS)
                    setFunct(funcion[0])
                    setIsLoading(false)
                    console.log(movieForId)

                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchMovieId()

    }, [])

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (seats > 0 && seats < 55 && !isLoading) {
            if (funct.modalidad == '2D') {
                setPrice(500 * seats)
            } else if (funct.modalidad == '3D') {
                setPrice(750 * seats)
            } else if (funct.modalidad == '4D') {
                setPrice(1000 * seats)
            }
        } else if (!isLoading) {
            if (funct.modalidad == '2D') {
                setPrice(500)
            } else if (funct.modalidad == '3D') {
                setPrice(750)
            } else if (funct.modalidad == '4D') {
                setPrice(1000)
            }
        }
    }, [seats, funct])

    const onSubmit = async data => {
        setActiveStep(2)
        setContentAwait(true)
        const newData = data;
        delete newData.confirmacionEmail
        newData.usuario_id = parseInt(sessionStorage.getItem('id'));
        newData.funcion_id = funct.id;
        console.log(newData)
        try {
            const reserva = await fetchReserve(newData)
            if (reserva) {
                setTimeout(() => {
                    setTimeout(() => {
                        setContentAwait(false)
                        setMessage("RESERVA COMPLETADA")
                        setSubmessage("Su reserva fue ingresada con exito")

                    }, 3000)
                }, 4000)
            } else {
                setContentAwait(false)
                setMessage("RESERVA DENEGADA")
                setSubmessage("Ya hay una reserva activa con su email")
            }

        } catch (error) {
            setMessage("RESERVA DENEGADA")
            setSubmessage("Ya hay una reserva activa con su email")
            setContentAwait(false)
            console.error(error)
            setTimeout(() => {
                setMessage('')
                setSubmessage('')
                navigate('/')
            }, 3000)
        }
    }

    return (
        <div className="reserve-conteiner">
            <div className="reserve-stepper">
                <Stepper activeStep={activeStep} >

                    <Step >
                        <StepLabel>Información</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Pago</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Confirmación</StepLabel>
                    </Step>

                </Stepper>

            </div>


            {!isLoading && activeStep == 0 && (
                <div className="reserve-template">
                    <div className="reserve-first-information">
                        <div className="reserve-information">
                            <img src={movie.portada} />
                            <div className="reserve-information-text">
                                <h4>{movie.titulo}</h4>
                                <div className="reserve-text-elements">
                                    <div>
                                        <h5>Clasificación</h5>
                                        <p>{movie.caracteristicas.clasificacion}</p>
                                    </div>
                                    <div>
                                        <h5>Tiempo</h5>
                                        <p>{movie.caracteristicas.duracion} minutos</p>
                                    </div>
                                    <div>
                                        <h5>Modalidad</h5>
                                        <p>{funct.modalidad}</p>
                                    </div>
                                    <div>
                                        <h5>Idioma</h5>
                                        <p>{funct.opcionesIdioma}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Detalles de usuario</h3>
                            <div>
                                <div className="general-input-section">
                                    <div className="general-input-box">
                                        <label>NOMBRE</label>
                                        <div className="general-input-container">
                                            <img src="/icons/user-form.svg" />
                                            <input
                                                value={sessionStorage.getItem('nombre')}
                                                type="text"
                                                disabled
                                                className="general-input"
                                            />
                                        </div>

                                    </div>
                                    <div className="general-input-box">
                                        <label>APELLIDO</label>
                                        <div className="general-input-container">

                                            <img src="/icons/user-form.svg" />
                                            <input
                                                value={sessionStorage.getItem('apellido')}
                                                type="text"
                                                disabled
                                                className="general-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="general-input-section">
                                    <div className="general-input-box">

                                        <label>EMAIL</label>
                                        <div className="general-input-container">
                                            <img src="/icons/email-form.svg" />
                                            <input
                                                value={sessionStorage.getItem('email')}
                                                type="email"
                                                disabled
                                                className="general-input"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div>
                            <h3>Información de reserva</h3>
                            <p className="reserve-user-information">Debe completar con la infomación de la persona encargada de retirar la reserva. En caso de necesitar cambiar la persona permitida para retirar una vez efectuada la reserva, puede actualizarlo desde la sección de su perfil.</p>
                            <form onSubmit={handleSubmit(onSubmit)} id="reserve-form">
                                <div className="general-input-section">
                                    <div className="general-input-box">
                                        <label>NOMBRE *</label>
                                        <div className="general-input-container">
                                            <img src="/icons/user-form.svg" />
                                            <input
                                                placeholder="Ingresa un nombre"
                                                type='text'
                                                className={` ${errors.nombre ? 'general-error-input' : 'general-input'}`}
                                                {...register('nombre')}
                                                aria-invalid={errors.nombre ? "true" : "false"}

                                            />
                                        </div>
                                        <p>{errors.nombre?.message}</p>
                                    </div>
                                    <div className="general-input-box">
                                        <label>APELLIDO *</label>
                                        <div className="general-input-container">
                                            <img src="/icons/user-form.svg" />
                                            <input
                                                className={`${errors.apellido ? 'general-error-input' : 'general-input'}`}
                                                placeholder="Ingresa un apellido"
                                                type='text'
                                                {...register('apellido')}
                                                aria-invalid={errors.apellido ? "true" : "false"}
                                            />

                                        </div>
                                        <p>{errors.apellido?.message}</p>
                                    </div>
                                    <div className="general-input-box">
                                        <label>DNI *</label>
                                        <div className="general-input-container">
                                            <img src="/icons/dni-form.svg" />
                                            <input
                                                className={`${errors.dni ? 'general-error-input' : 'general-input'}`}
                                                placeholder="Ingresa un DNI"
                                                type='number'
                                                {...register('dni')}
                                                aria-invalid={errors.dni ? "true" : "false"}
                                            />

                                        </div>
                                        <p>{errors.dni?.message}</p>
                                    </div>

                                </div>
                                <div className="general-input-section">
                                    <div className="general-input-box">
                                        <label>E-MAIL *</label>
                                        <div className="general-input-container">
                                            <img src="/icons/email-form.svg" />
                                            <input
                                                className={`${errors.email ? 'general-error-input' : 'general-input'}`}
                                                placeholder="Ingresa un e-mail"
                                                type='email'
                                                {...register('email')}
                                                aria-invalid={errors.email ? "true" : "false"}
                                            />
                                        </div>
                                        <p>{errors.email?.message}</p>
                                    </div>
                                    <div className="general-input-box">
                                        <label>CONFIRMACION E-MAIL *</label>
                                        <div className="general-input-container">
                                            <img src="/icons/email-form.svg" />
                                            <input
                                                className={`${errors.confirmacionEmail ? 'general-error-input' : 'general-input'}`}
                                                placeholder="Confirmación e-mail"
                                                type='email'
                                                {...register('confirmacionEmail')}
                                                aria-invalid={errors.confirmacionEmail ? "true" : "false"}
                                            />
                                        </div>
                                        <p>{errors.confirmacionEmail?.message}</p>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div>

                    </div>
                    <div className="reserve-second-information">
                        <h3>Resumen de reserva</h3>
                        <div className="reserve-summary">
                            <div className="date-reserve-summary">
                                <h5>FECHA INGRESO:</h5>
                                <p>{moment(funct.fechaProyeccion).format('dddd, d MMMM YYYY')}</p>
                                <p>a las {funct.horaProyeccion} hs</p>
                            </div>

                            <div className="reserve-summary-cinema">
                                <div className="seats-amount">
                                    <label>ASIENTOS: *</label>
                                    <input
                                        type="number"
                                        className="general-input"
                                        value={seats}
                                        onChange={(event) => setSeats(event.target.value)}
                                    />
                                    {seats <= 0 && (<p>Debe seleccionar un asiento</p>)}
                                    {seats > 55 && (<p>Los asientos no deben superar 55</p>)}
                                </div>
                                <div className="reserve-summary-selection">
                                    <h5>SELECCIONASTE:</h5>
                                    <p>{titulo} en {funct.modalidad} {funct.opcionesIdioma} el {moment(funct.fechaProyeccion).format('dddd, d MMMM YYYY')} a las {funct.horaProyeccion} hs para {seats} personas</p>

                                </div>
                            </div>

                        </div>
                        <h3>Precio de reserva</h3>
                        <div>
                            <div className="reserve-price">
                                <div>
                                    <p>Entrada:</p>
                                    <p>{price}$</p>
                                </div>
                                <div>
                                    <p>IVA del 10.5%:</p>
                                    <p>{(price * 10.5) / 100}$</p>
                                </div>
                                <div>
                                    <p>Impuesto a las ganancias del 12%:</p>
                                    <p>{(price * 12) / 100}$</p>
                                </div>
                                <div>
                                    <p>TOTAL DE RESERVA</p>
                                    <p>{(price) + ((price * 10.5) / 100) + ((price * 12) / 100)}$</p>
                                </div>
                            </div>
                        </div>

                        <button disabled={seats <= 0 || seats > 55} type="submit" form="reserve-form">Completar Reserva</button>
                    </div>
                </div>
            )}

            {!isLoading && activeStep == 2 && (
                <div className="complete-reserve">

                    <h3>{message}</h3>
                    <p>{submessage}</p>
                    <div className="complete-reserve-img">
                        {contentAwait ? (<BounceLoader
                            color="#36d7b7"
                            speedMultiplier={2}
                            loading
                        />) : (message.includes("COMPLETADA") ? (<img src="/icons/accept.svg" />) : (<img src="/icons/denied.svg" />))}
                    </div>



                </div>
            )}


        </div>
    );
}

export default Reserva;