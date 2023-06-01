import { useEffect } from "react";

function CerrarSesion() {
  useEffect(() => {
    localStorage.removeItem('savedEmail');
    localStorage.removeItem('savedPassword')
    localStorage.removeItem('rememberMe')  
     
  }, []);

  return null;
}

export default CerrarSesion;