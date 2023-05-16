import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLinkedin, faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'


const footer = () => {
return (
    <div>
    <footer>
        <div className="derechosFooter">
            <Link to="../home">
            <img src="../icons/DH Cinema-logos_black.png" alt="logoCinemaFooter"/>
            </Link>
            <ul>
                <li>2023</li>
                <li>Derechos reservados</li>
            </ul>
        </div>
            <div className="iconosFooter">
            <a rel="https://m.facebook.com" target="_blank">
                <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a rel="https://www.linkedin.com/login/es" target="_blank">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a rel="https://twitter.com" target="_blank">
                <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a rel="https://www.instagram.com/accounts/login/" target="_blank">
                <FontAwesomeIcon icon={faInstagram} />
            </a>
        </div>
    </footer>
    </div>
)
}

export default footer
