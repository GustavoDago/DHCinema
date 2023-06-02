import { useEffect } from "react";
import { useNavigate } from "react-router";

function CerrarSesion() {
  const navigate = useNavigate()
  useEffect(() => {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('apellido')
  }, []);

  return navigate('/');
}

export default CerrarSesion;