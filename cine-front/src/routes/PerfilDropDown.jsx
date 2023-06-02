

const PerfilDropdown = () => {
    return (
        <div className="h1dropdown">
            <h1>Datos de perfil</h1>
            <div className="datosDropDown">
                <div className="nombreDropDown">
                <h3>Nombre: </h3> {sessionStorage.getItem('nombre')}
                </div>
                <div>
                <h3>Apellido: </h3> {sessionStorage.getItem('apellido')}
                </div>
                <div>
                <h3>Email: </h3> {sessionStorage.getItem('email')}
                </div>
            </div>
        </div>
    )
}


export default PerfilDropdown