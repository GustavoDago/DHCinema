function Item(props){

    return (
        <div className="movie-card">
            <figure>
                <div className="opt-card">
                    <p>{props.name}</p>
                    <Link key={pros.id} to={`${props.id}`}>
                        <button >Mas detalles</button>
                    </Link>
                    <button>Comprar</button>
                </div>
                <img className="opt-image" src={props.image}/>
            </figure>
        </div>
    )
}

export default Item