function ItemShowMore({ movie }) {


    return (
        <div className="item-show-more">
            <div className="item-show-more-first">
                <img src={movie.portada} />
            </div>
            <div className="item-show-more-second">
                <div>
                    <h5>Sala</h5>
                    <div>
                        <button>2D</button>
                        <button>3D</button>
                        <button>4D</button>
                    </div>
                </div>
                <div>
                    <h5>Idioma</h5>
                    <div>
                        <button>Castellano</button>
                        <button>Subtitulada</button>
                    </div>
                </div>
                <div className="options-buttons">
                    <button><img src="/icons/youtube.svg" /><p>Trailer</p></button>
                    <button><img src="/icons/ticket.svg" /><p>Reserva</p></button>
                    <button><img src="/icons/information.svg" /><p>Info</p></button>
                </div>

            </div>
        </div>
    )
}

export default ItemShowMore;