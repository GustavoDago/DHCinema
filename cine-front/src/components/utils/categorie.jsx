function Categorie(props) {
    return(
        <div className="categorie-card">
            <figure>
                <h4>{props.name}</h4>
                <img src={props.image}/>
            </figure>
        </div>
    )
}

export default Categorie