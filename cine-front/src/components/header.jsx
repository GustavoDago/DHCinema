import {Link} from 'react-router-dom'

const header = () => {
  return (
    <div>
      <header>
        <div className="headerContainer">
        <Link to="/">
          <img src="../../icons/DH Cinema-logos_black.png" alt="logoCinema"/>
          </Link>
          <h2 className="slogan"> D.H. My Home</h2>
        </div>
        <div className="headerUsuario">
            <button className="botonCrearCuenta"> Crear Cuenta</button>
            <button className="botonInicioSesion"> Iniciar Sesión </button>
            <Link to="/admin/nueva-pelicula">
              <button className="botonInicioSesion"> Panel Administrador </button>
            </Link>
            
            
        </div>
    </header>
    </div>
  )
}

export default header
