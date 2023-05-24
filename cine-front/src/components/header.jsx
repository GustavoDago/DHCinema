import {Link} from 'react-router-dom'

const header = () => {
  return (
    <div>
      <header>
        <div className="headerContainer">
        <Link to="/">
          <img src="../../icons/dhcinema2-logo.png" alt="logoCinema"/>
        </Link>
        </div>
        <div className="headerUsuario">
            <Link to="/registrarse">
            <button className="botonCrearCuenta"> Crear Cuenta</button>
            </Link>
            <Link to="/inicio-sesion">
              <button className="botonInicioSesion"> Iniciar Sesión </button>
            </Link>
            
            <Link to="/admin">
              <button className="botonInicioSesion"> Panel Administrador </button>
            </Link>
            
            
        </div>
    </header>
    </div>
  )
}

export default header
