import {Link} from 'react-router-dom'

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
                <img src="../icons/facebook.png" alt="iconFacebook"/>
            </a>
            <a rel="https://www.linkedin.com/login/es" target="_blank">
                <img src="../icons/linkedin-in.png" alt="iconLikedIn"/>
            </a>
            <a rel="https://twitter.com" target="_blank">
                <img src="../icons/twitter.png" alt="iconTwitter"/>
            </a>
            <a rel="https://www.instagram.com/accounts/login/" target="_blank">
                <img src="../icons/instagram.png" alt="iconInstagram"/>
            </a>
        </div>
    </footer>
    </div>
  )
}

export default footer
