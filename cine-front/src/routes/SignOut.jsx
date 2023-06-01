import { useState } from "react";
import { Link } from "react-router-dom";
import CerrarSesion from "../components/CerrarSesion";

function SignOut() {
  const [isSesionCerrada, setSesionCerrada] = useState(false);

  const handleSignOut = () => {
    // Clear authentication data
    // Perform additional sign-out actions
    setSesionCerrada(true);
    
  };

  return (
    <div className="signOut">
      <h2>Seguro que quieres cerrar sesión?</h2>
      <p>Tendrás que cargar tus datos de nuevo.</p> 
      <Link to="/">
        <button>NO </button>
      </Link>
      
      <a href="/"><button onClick={handleSignOut}>SI</button></a>
      {isSesionCerrada && <CerrarSesion />}
      
    </div>
  );
}

export default SignOut;