import React from 'react'

const header = () => {
  return (
    <div>
      <header>
        <div class="headerContainer">
            <img src="../icons/DH Cinema-logos_black.png" alt="logoCinema">
        </div>
        <div class="headerUsuario">
            <button class="botonCrearCuenta"> Crear Cuenta</button>
            <button class="botonInicioSesion"> Iniciar Sesión </button>
        </div>
    </header>
    </div>
  )
}

export default header
