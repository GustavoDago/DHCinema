import React, { useState } from 'react'

const NuevaCategoria = () => {
  
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Crear el objeto de datos a enviar al servidor
    const categoryData = {
      titulo: title,
      descripcion: description,
      urlImagen: imageUrl,
    };
  
    // Realizar la petición POST al servidor
    fetch("http://localhost:8080/categorias/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor
        console.log(data); // Puedes mostrar la respuesta en la consola o realizar alguna acción adicional
        // Resetear los campos del formulario
        setTitle("");
        setDescription("");
        setImageUrl("");
      })
      .catch((error) => {
        console.error(error); // Manejar el error en caso de que ocurra
      });
  };

  return (
      <div>
        <h2>Crear Categoría</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>URL de la Imagen:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button type="submit">Crear</button>
        </form>
      </div>
    );
}

export default NuevaCategoria









