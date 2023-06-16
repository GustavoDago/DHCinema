import Modal from 'react-modal'
import {useLocation} from 'react-router-dom'
import { FacebookShareButton, LinkedinShareButton, WhatsappShareButton, TwitterShareButton} from 'react-share'
import { faLinkedin, faFacebook, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShareModal = ({ showConfirmation, closeModal, shouldClose }) => {
    const location = useLocation();
    const customStylesII = {
    overlay: { zIndex: 1000 },
    content: {
        maxWidth: '500px',
        margin: '0 auto'
    }
    };

    const shareUrl = window.location.href;
    const shareMessage = 'Mira la película que encontré en esta página!!';

    return (
    <Modal
        isOpen={showConfirmation}
        onRequestClose={closeModal}
        className="shareModal"
        style={customStylesII}
        shouldCloseOnOverlayClick={shouldClose}
    >
        <div className='shareModalhtml'>
        <div>
        <WhatsappShareButton url={shareUrl} title={shareMessage}>
            <FontAwesomeIcon icon={faWhatsapp} />
        </WhatsappShareButton>
        <FacebookShareButton url={shareUrl} quote={shareMessage}>
            <FontAwesomeIcon icon={faFacebook} />
        </FacebookShareButton>
        <LinkedinShareButton url={shareUrl} title={shareMessage}>
            <FontAwesomeIcon icon={faLinkedin} />
        </LinkedinShareButton>
        <TwitterShareButton url={shareUrl} title={shareMessage}>
            <FontAwesomeIcon icon={faTwitter} />
        </TwitterShareButton>
        </div>
        <div className=''>
            <h3>Link de la página</h3>
            <div className='urlLink'>
            <h3 className='modalCompartirLink'><a>{shareUrl}</a></h3>
            </div>
        </div>
        </div>
    </Modal>
    );
};

export default ShareModal;