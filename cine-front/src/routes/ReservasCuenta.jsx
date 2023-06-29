import Accordion from "../components/Accordion";
import { useState } from "react";
import { useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import moment from "moment/moment";
import * as yup from "yup"
import { fetchUserReserves } from "../components/UseFetch";




function ReservaCuenta() {
    const [reserves, setReserves] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [nameSelected, setNameSelected] = useState(null)
    const [lastNameSelected, setLastNameSelected] = useState(null)
    const [dniSelected, setDniSelected] = useState(null)
    const [emailSelected, setEmailSelected] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLoading(true)
        moment.locale('es', {
            months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
            monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
            weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
            weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
            weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
        }
        );

        const fetchAllReserves = async () => {
            try {
                const email = sessionStorage.getItem('email')
                const response = await fetchUserReserves(email)
                if (Array.isArray(response) && response.length > 0) {
                    const updateResponse = response.map(reserve => {
                        const isSelected = false;
                        return { ...reserve, isSelected };
                    })
                    console.log(updateResponse)
                    setReserves(updateResponse)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllReserves()
    }, [])

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

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async data => {

    }

    const handleActive = (id, active) => {
        const newArrayActive = reserves.map(reserve => {
            if (reserve.id == id) {
                reserve.isSelected = active;
                if (active) {
                    console.log(reserve.nombre)
                    setNameSelected(reserve.nombre)
                    setLastNameSelected(reserve.apellido)
                    setDniSelected(reserve.dni)
                    setEmailSelected(reserve.email)
                }
            }
            else reserve.isSelected = false;
            return reserve;
        })

        setReserves(newArrayActive)

    }



    return (
        <div className="reserve-user">
            {!isLoading && Array.isArray(reserves) && reserves.length > 0 && (
                <div className="amount-reserves">
                    {reserves.map(reserve => (
                        <div>
                            <h4>{reserve.peliculaNombre}</h4>
                            <div>
                                <h5>
                                    FECHA INGRESO:
                                </h5>
                                <p>{moment(reserve.fechaProyeccion).format('dddd, d MMMM YYYY')}</p>
                                <p>a las {reserve.horaProyeccion} hs</p>
                            </div>
                            <div>
                                <div>
                                    <h5>SALA</h5>
                                    <p>{reserve.sala}</p>
                                </div>
                                <div>
                                    <h5>MODALIDAD</h5>
                                    <p>{reserve.modalidad}</p>
                                </div>
                                <div>
                                    <h5>IDIOMA</h5>
                                    <p>{reserve.opcionesIdioma}</p>
                                </div>

                            </div>
                        </div>
                    ))}


                </div>




        
            )}
        </div>
    );
}

export default ReservaCuenta;