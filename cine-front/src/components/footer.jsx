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
            <a href="https://m.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.linkedin.com/login/es" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
            </a>
        </div>
    </footer>
    </div>
)
}

export default footer
