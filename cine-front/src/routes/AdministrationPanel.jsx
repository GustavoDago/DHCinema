import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useDropzone } from "react-dropzone";
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import Modal from "react-modal"
import { format } from 'date-fns'
import { newMovie } from "../components/UseFetch";
registerLocale("es", es)

Modal.setAppElement('#root')



function AdministrationPanel() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedDates, setSelectedDates] = useState(new Date())
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false);

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleDateChange = (date) => {
        setSelectedDates(date)
    }

    const handleCategoriesChange = (e) => {
        const options = e.target.selectedOptions;
        const selected = Array.from(options, (option) => option.value);
        setSelectedCategories(selected);
    }

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () =>
            setImagePreview(reader.result)

        setImage(file);
        reader.readAsDataURL(file);

    }

    const closeModal = () => {
        setShowConfirmation(false)
    }

    const uploadCloudinary = async () => {
        try {
            console.log(image)
            const formData = new FormData()
            formData.append('file', image)
            formData.append('upload_preset', 'wxfnshym')
            formData.append('api_key', '533874313672784')

            const response = await fetch('https://api.cloudinary.com/v1_1/dmnjesfeg/image/upload', {
                method: 'POST',
                body: formData,
            })

            const result = await response.json();
            const imageUrl = result.secure_url;
            console.log(imageUrl)
            return imageUrl;


        } catch (error) {
            console.error('Error al subir la imagen')
            return false
        }
    }

    const fetchNewMovie = async (url) => {

        try {
            const data = {
                titulo: title,
                imagen: url,
                descripcion: description,
                categorias: selectedCategories.map((category) => ({ categoria: category })),
                fechas: ([{ fecha: format(selectedDates, 'yyyy-MM-dd') }])
            };
            const jsonData = JSON.stringify(data);
            console.log(jsonData);


            const response = await newMovie(data)
            console.log(response)
            if (response == true) {
                setErrorMessage("Se cargo la pelicula correctamente.")
                setTimeout(() => {
                    setTitle('')
                    setDescription('')
                    setSelectedCategories([])
                    setSelectedDates(new Date())
                    setShowConfirmation(false)
                    setImage(null)
                    setImagePreview(null)
                }, 2000)
            } else {
                setErrorMessage("Error al cargar la pelicula.")
                setTimeout(() => {
                    setShowConfirmation(false)
                }, 2000)
            }
        } catch (error) {
            setErrorMessage("Error al cargar la pelicula.")
            setTimeout(() => {
                setShowConfirmation(false)
            }, 2000)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("Cargando...")
        setShowConfirmation(true)

        if (!title || !selectedCategories.length || !description || !selectedDates || !imagePreview) {
            setErrorMessage("Todos los campos son requeridos.");
            setTimeout(() => {
                setShowConfirmation(false)
            }, 2000)
            return;
        }

        const currentDate = new Date();
        if (selectedDates < currentDate) {
            setErrorMessage("La fecha debe ser igual o posterior a la fecha actual")
            setTimeout(() => {
                setShowConfirmation(false)
            }, 2000)
            return
        }

        const imageUpload = await uploadCloudinary()
        if (imageUpload == false) {
            setErrorMessage("Error al subir la imagen.")
            setTimeout(() => {
                setShowConfirmation(false)
            }, 2000)
            return
        } else {

            setTimeout(() => {
                if (imageUpload == "" || null) {
                    setErrorMessage("Error al subir la imagen.")
                    setShowConfirmation(false)
                    return
                } else {
                    fetchNewMovie(imageUpload)
                }

            }, 1000)

        }



    }

    const modalClassName = showConfirmation ? 'modal-overlay' : 'modal-overlay hidden';

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop })

    return (<div className="admin-form">
        <form onSubmit={handleSubmit}>
            <label>Titulo:</label>
            <input
                className="form-title"
                type="text"
                placeholder="Titulo de pelicula"
                value={title}
                onChange={onChangeTitle}
            />
            <label>Generos: (en caso de eligir mas de una, CTRL + Click) </label>
            <select
                className="form-categories"
                multiple
                value={selectedCategories}
                onChange={handleCategoriesChange}
            >
                <option value="Accion">Accion</option>
                <option value='Aventura'>Aventura</option>
                <option value='Comedia'>Comedia</option>
                <option value='Ciencia Ficcion'>Ciencia Ficcion</option>
                <option value='Drama'>Drama</option>
                <option value='Romance'>Romance</option>
                <option value='Terror'>Terror</option>
            </select>
            <label>Descripcion</label>
            <input
                className="form-description"
                type="text"
                placeholder="Descripcion"
                value={description}
                onChange={onChangeDescription}
            />

            <div className="date-container">
                <label>Fecha:</label>
                <div className="date-center">
                    <DatePicker
                        className="date-picker"
                        selected={selectedDates}
                        onChange={handleDateChange}
                        dateFormat={"dd-MM-yyyy"}
                        multiple
                        locale="es"
                    />
                </div>
            </div>
            <div className="form-image">

                {imagePreview ? (
                    <img src={imagePreview} alt="Imagen seleccionada" />
                ) :
                    (<div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                        <input {...getInputProps()} />
                        {isDragActive ? <p>Suelta la imagen aqui...</p> : <p>Arrastra y suelta una imagen aqui, o haz click para seleccionar una imagen.</p>}
                    </div>)}
            </div>
            <button type="submit">Guardar</button>

        </form>

        <Modal
            isOpen={showConfirmation}
            onRequestClose={closeModal}
            contentLabel="Confirmacion"
            className="modal"
            overlayClassName="overlay"
        >

            <div className={modalClassName}>
                <div className="modal-content">
                    {errorMessage}
                </div>
            </div>
        </Modal>
    </div>)
}

export default AdministrationPanel;