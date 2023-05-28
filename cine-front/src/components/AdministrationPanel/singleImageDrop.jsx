import { useState } from "react";
import { useDropzone } from "react-dropzone";

function SingleImageDrop() {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageExtension, setImageExtension] = useState('')

    const handleImageDrop = (acceptedFiles) => {
        const isDroppedOnDeleteButton = event.target.classList.contains('delete-button');

        if (isDroppedOnDeleteButton) {
            // Detener la propagación del evento para evitar que se abra el diálogo de selección de archivos
            event.stopPropagation();
            return;
        }
        const file = acceptedFiles[0];
        if (file.name.split('.').pop() == 'jpg') {
            setImageExtension('/icons/jpg-extension.svg')
        } else if (file.name.split('.').pop() == 'png') {
            setImageExtension('/icons/png-extension.svg')
        } else {
            setImageExtension('/icons/file-extension.svg')
        }
        const reader = new FileReader();

        reader.onload = () => {
            setImageFile(file);
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview('');
    };

    const ImageDropzone = () => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: handleImageDrop,
            accept: 'image/*',
            maxFiles: 1,
        });

        return (
            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Suelta la imagen aquí...</p>
                ) : (
                    <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen.</p>
                )}
                {imagePreview && (
                    <div className="file-preview">
                        <div>{imageFile.name}</div>
                        <img src={imageExtension} alt="Imagen seleccionada" />
                        <button>Previsualizar</button>
                        <button onClick={(e) => {
                            e.preventDefault();
                            removeImage();
                        }}>Eliminar</button>
                    </div>
                )}
            </div>
        );
    };


    return (<ImageDropzone />);
}

export default SingleImageDrop