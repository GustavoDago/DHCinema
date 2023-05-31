import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmAccount } from "../components/UseFetch";



function ConfirmAccount() {
    const [activated, setActivated] = useState(false)
    const { token } = useParams();
    useEffect(() => {

        try {
            const response = confirmAccount(token)

            if (response != false && response != null) {
                console.log(response)
                if (response.include("Email verificado")) {
                    setActivated(true)
                } else {
                    setActivated(false)
                }
            }
        } catch (error) {

        }
    }, [])

    return (
        <div className="confirm-email-conteiner">
            <div className="confirm-email-content">
                <img src="./icons/dhcinema2-logo.png" />
                <div className="confirm-email">
                    <h1>Confirmación de cuenta</h1>

                    {activated ? (
                        <div>
                            <p>Tu cuenta se ha verificado correctamente. ¡Bienvenido!</p>
                        </div>
                    ) : (
                        <div>
                            <p>No se pudo verificar tu cuenta o ya se encuentra verificado. Por favor, intenta nuevamente.</p>
                        </div>
                    )}

                    <button><a href="http://localhost:5173/">VOLVER A DHCINEMA</a></button>
                </div>

            </div>

        </div>);
}

export default ConfirmAccount;q