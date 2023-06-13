import { useState } from "react";

function ItemShowMore({ movie }) {
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [selectedLenguaje,setSelectedLenguaje] = useState(null)

    const handleButtonClickRoom = (option) => {
        setSelectedRoom(option);
    }

    const handleButtonClickLenguaje = (option) => {
        setSelectedLenguaje(option)
    }

    return (
        <div className="item-show-more">
            <div className="item-show-more-first">
                <img src={movie.portada} />
            </div>
            <div className="item-show-more-second">
                <div>
                    <h5>Sala</h5>
                    <div>
                        <button className={selectedRoom == 1 ? 'option-button selected' : 'option-button'}
                            onClick={()=> handleButtonClickRoom(1)}
                        >2D</button>
                        <button
                        className={selectedRoom == 2 ? 'option-button selected' : 'option-button'}
                        onClick={() => handleButtonClickRoom(2)}
                        >3D</button>
                        <button className={selectedRoom == 3 ? 'option-button selected' : 'option-button'}
                            onClick={() => handleButtonClickRoom(3)}
                        >4D</button>
                    </div>
                </div>
                <div>
                    <h5>Idioma</h5>
                    <div>
                        <button className={selectedLenguaje == 1 ? 'option-button selected' : 'option-button'}
                            onClick={() => handleButtonClickLenguaje(1)}>Castellano</button>
                        <button className={selectedLenguaje == 2 ? 'option-button selected' : 'option-button'}
                            onClick={() => handleButtonClickLenguaje(2)}>Subtitulada</button>
                    </div>
                </div>
                <div className="options-buttons">
                    <button><img src="/icons/youtube-3.svg" /><p>Trailer</p></button>
                    <button><img src="/icons/ticket.svg" /><p>Reserva</p></button>
                    <button><img src="/icons/information.svg" /><p>Info</p></button>
                </div>

            </div>
        </div>
    )
}

export default ItemShowMore;