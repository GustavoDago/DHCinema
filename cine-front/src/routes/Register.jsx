import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
    nombre: yup.string()
        .required('Se requiere un nombre.')
        .matches(/^[a-zA-ZÀ-ÿ\s]/, 'El nombre no puede poseer caracteres especiales o numeros.'),
    apellido: yup.string()
        .required('Se requiere un apellido.')
        .matches(/^[a-zA-ZÀ-ÿ\s]/, 'El nombre no puede poseer caracteres especiales o numeros.'),
    email: yup.string()
        .required('Se requiere un email.')
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Se requiere un email valido.'),
    confirmacionEmail: yup.string()
        .required('Se requiere este campo.')
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Se requiere un email valido.')
        .oneOf([yup.ref('email')], 'Los emails no coinciden entre si.'),
    contraseña: yup.string()
        .required('Se requiere una contraseña.')
        .min(6, 'La contraseña debe ser mayor a 6 caracteres.'),
    contraseñaConfirmacion: yup.string()
        .required('Se requiere este campo.')
        .min(6, 'La contraseña debe ser mayor a 6 caracteres.')
        .oneOf([yup.ref('contraseña')], 'Las contraseñas no coinciden entre si.')
})

function Register() {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => console.log(data)

    return (
        <div className='register'>
        <div className="register-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Registro</h3>
                <div className="register-seccion1">
                    <div>
                        <input
                            placeholder="Nombre"
                            type='text'
                            className={` ${errors.nombre ? 'error-input' : 'register-input'}`}
                            {...register('nombre')}
                            aria-invalid={errors.nombre ? "true" : "false"}
                        />
                        <p>{errors.nombre?.message}</p>
                    </div>
                    <div>
                        
                        <input
                            className={`${errors.apellido ? 'error-input' : 'register-input'}`}
                            placeholder="Apellido"
                            type='text'
                            {...register('apellido')}
                            aria-invalid={errors.apellido ? "true" : "false"}
                        />
                        <p>{errors.apellido?.message}</p>
                    </div>
                </div>
                <div className='register-seccion2'>
                    <div>
                        <input
                            className={`${errors.email ? 'error-input' : 'register-input'}`}
                            placeholder="E-mail"
                            type='email'
                            {...register('email')}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        <p>{errors.email?.message}</p>
                    </div>
                    <div>
                        <input
                            className={`${errors.confirmacionEmail ? 'error-input' : 'register-input'}`}
                            placeholder="Confirmacion e-mail"
                            type='email'
                            {...register('confirmacionEmail')}
                            aria-invalid={errors.confirmacionEmail ? "true" : "false"}
                        />
                        <p>{errors.confirmacionEmail?.message}</p>
                    </div>
                    <div>
                        <input
                            className={`${errors.contraseña ? 'error-input' : 'register-input'}`}
                            placeholder="Contraseña"
                            type='password'
                            {...register('contraseña')}
                            aria-invalid={errors.contraseña ? "true" : "false"}
                        />
                        <p>{errors.contraseña?.message}</p>
                    </div>
                    <div>
                        <input
                            className={`${errors.contraseñaConfirmacion ? 'error-input' : 'register-input'}`}
                            placeholder="Confirmacion contraseña"
                            type='password'
                            {...register('contraseñaConfirmacion')}
                            aria-invalid={errors.contraseñaConfirmacion ? "true" : "false"}
                        />
                        <p>{errors.contraseñaConfirmacion?.message}</p>
                    </div>
                </div>


                <button className="new-button" type="submit">Registrarse</button>
            </form>
        </div>
        </div>

    )
}

export default Register;