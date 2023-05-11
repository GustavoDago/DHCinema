import React from 'react'

const header = () => {
  return (
    <div>
      <header>
        <div className="headerContainer">
          <img src="../icons/DH Cinema-logos_black.png" alt="logoCinema"/>
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
