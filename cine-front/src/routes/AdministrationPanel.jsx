import { useState } from "react";

function AdministrationPanel(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }


    return (<div>
        <h3>Panel de Administrador</h3>
        <form>
            <input 
                type="text"
                placeholder="Titulo de pelicula"
                value={title}
                onChange={onChangeTitle}
            />
            <input 
                type="text"
                placeholder="Titulo de pelicula"
                value={title}
                onChange={onChangeTitle}
            />
            <input 
                type="text"
                placeholder="Descripcion"
                value={description}
                onChange={onChangeDescription}
            />
            <input 
                type="text"
                placeholder="Titulo de pelicula"
                value={title}
                onChange={onChangeTitle}
            />
            
        </form>
    </div>)
}

export default AdministrationPanel;