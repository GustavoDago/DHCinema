import {Link} from 'react-router-dom'

const header = () => {
  return (
    <div>
      <header>
        <div className="headerContainer">
        <Link to="../home">
          <img src="../icons/DH Cinema-logos_black.png" alt="logoCinema"/>
          </Link>
        </div>
        <div className="headerUsuario">
            <button className="botonCrearCuenta"> Crear Cuenta</button>
            <button className="botonInicioSesion"> Iniciar Sesión </button>
        </div>
    </header>
    </div>
  )
}

export default header
