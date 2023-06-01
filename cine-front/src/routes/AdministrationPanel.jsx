import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Modal from "react-modal"
import { format } from 'date-fns'
import { fetchCategorias, newMovie } from "../components/UseFetch";
import MultipleImageDrop from "../components/AdministrationPanel/multipleImageDrop";
import SingleImageDrop from "../components/AdministrationPanel/singleImageDrop";
import { useEffect } from "react";

Modal.setAppElement('#root')



function AdministrationPanel() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedDates, setSelectedDates] = useState([])
    const [image, setImage] = useState(null)
    const [banner, setBanner] = useState(null)
    const [gallery, setGallery] = useState([])
    const [multipleUrl, setMultipleUrl] = useState([])
    const [imagePreview, setImagePreview] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [sala, setSala] = useState('')
    const [duration, setDuration] = useState('')
    const [type, setType] = useState('')
    const [clasification, setClasification] = useState('')
    const [lenguage, setLenguage] = useState('')
    const [director, setDirector] = useState('')
    const [actors, setActors] = useState('')

    useEffect(() => {

        setShowConfirmation(true)
        setErrorMessage('Cargando categorias...')
        const fetchAllCategories = async () => {
            try {
                const categories = await fetchCategorias()
                if (categories) {
                    setSelectedCategories(categories);
                    setIsLoading(false);
                    setErrorMessage('')
                    setShowConfirmation(false)
                    console.log(selectedCategories)
                }

            } catch (error) {
                console.error(error)
                setIsLoading(false);
                setErrorMessage('')
                setShowConfirmation(false)
            }
        };

        fetchAllCategories()
    }, [])

    const customSyles = {
        overlay: { zIndex: 1000 }
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleCategoriesChange = (e) => {
        const options = e.target.selectedOptions;
        const selected = Array.from(options, (option) => option.value);
        setSelectedCategories(selected);
    }


    const closeModal = () => {
        setShowConfirmation(false)
    }

    const uploadCloudinary = async (image) => {
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

    const uploadMultipleCloudinary = async () => {
        return gallery.map(async (image, index) => {
            try {
                const formData = new FormData()
                formData.append('file', image.file)
                formData.append('upload_preset', 'wxfnshym')
                formData.append('api_key', '533874313672784')

                const response = await fetch('https://api.cloudinary.com/v1_1/dmnjesfeg/image/upload', {
                    method: 'POST',
                    body: formData,
                })

                const result = await response.json();
                setMultipleUrl((prevUrlList) => [...prevUrlList, result.secure_url])

                if (gallery.length - 1 == index)
                    return true;
            } catch (error) {
                console.error('Error al subir la imagen')
                return false
            }
        })
    }

    const fetchNewMovie = async (url, bannerUrl) => {

        try {
            const data = {
                titulo: title,
                imagen: url,
                descripcion: description,
                categorias: selectedCategories.map((category) => ({ categoria: category })),
                fechas: selectedDates.map((date) => ({ fecha: format(date, 'yyyy-MM-dd') }))
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
                    setSelectedDates([])
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
        selectedDates.map((date) => {
            if (date < currentDate) {
                setErrorMessage("La fechas deben ser iguales o posteriores a la fecha actual")
                setTimeout(() => {
                    setShowConfirmation(false)
                }, 2000)
                return
            }
        })


        const imageUpload = await uploadCloudinary(image)
        const bannerUpload = await uploadCloudinary(banner)
        const galleryUpload = await uploadMultipleCloudinary()

        if (imageUpload == false || bannerUpload == false || galleryUpload == false) {
            setErrorMessage("Error al subir las imagenes.")
            setTimeout(() => {
                setShowConfirmation(false)
            }, 2000)
            return
        } else {

            setTimeout(() => {
                if ((imageUpload == "" || null) || (bannerUpload == "" || null)) {
                    setErrorMessage("Error al subir las imagenes.")
                    setShowConfirmation(false)
                    return
                } else {
                    fetchNewMovie(imageUpload, bannerUpload)
                }

            }, 1000)

        }



    }

    const onChangeSala = (e) => {
        setSala(e.target.value)
    }


    return (
        <div>
            {!isLoading && (
                <div className="admin-form">
                    <form onSubmit={handleSubmit}>
                        <div className="admin-div">
                            <div className="admin-div-first">
                                <label>Titulo:</label>
                                <input
                                    className="form-title"
                                    type="text"
                                    placeholder="Titulo de pelicula"
                                    value={title}
                                    onChange={onChangeTitle}
                                />
                                <label>Generos:</label>
                                <div className="categories-form">
                                    {selectedCategories.length > 0 && selectedCategories.map((categorie) => (
                                        <label>
                                            <input type="checkbox" key={categorie.id} value={categorie.titulo} />
                                            {categorie.titulo}
                                        </label>
                                    ))}
                                </div>
                                <label>Descripcion</label>
                                <input
                                    className="form-description"
                                    type="text"
                                    placeholder="Descripcion"
                                    value={description}
                                    onChange={onChangeDescription}
                                />
                                <label>Director</label>
                                <input
                                    type="text"
                                    placeholder="Descripcion"
                                    value={description}
                                    onChange={onChangeDescription}
                                />
                                <label>Reparto</label>
                                <input
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
                                            multiple
                                            selected={selectedDates}
                                            onChange={setSelectedDates}
                                            format={"DD-MM-YYYY"}
                                            plugins={[
                                                <DatePanel />
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="admin-div-last">
                                <div>
                                    <label>Sala</label>
                                    <input
                                        type="text"
                                        placeholder="Sala"
                                        value={sala}
                                        onChange={onChangeSala}
                                    />
                                </div>
                                <div>
                                    <label>Modalidad</label>
                                    <input
                                        type="text"
                                        placeholder="Descripcion"
                                        value={description}
                                        onChange={onChangeDescription}
                                    />
                                </div>
                                <div>
                                    <label>Duracion</label>
                                    <input
                                        type="text"
                                        placeholder="Descripcion"
                                        value={description}
                                        onChange={onChangeDescription}
                                    />
                                </div>

                                <div>
                                    <label>Clasificacion</label>
                                    <input
                                        type="text"
                                        placeholder="Descripcion"
                                        value={description}
                                        onChange={onChangeDescription}
                                    />
                                </div>
                                <div>
                                    <label>Idioma</label>
                                    <input
                                        type="text"
                                        placeholder="Descripcion"
                                        value={description}
                                        onChange={onChangeDescription}
                                    /></div>

                            </div>
                        </div>



                        <label>Portada:</label>
                        <SingleImageDrop
                            image={image}
                            setImage={setImage}
                        />
                        <label>Banner:</label>
                        <SingleImageDrop
                            image={banner}
                            setImage={setBanner}
                        />
                        <label>Galeria:</label>
                        <MultipleImageDrop
                            gallery={gallery}
                            setGallery={setGallery}
                        />
                        <button type="submit">Guardar</button>



                    </form>

                    <Modal
                        isOpen={showConfirmation}
                        onRequestClose={closeModal}
                        contentLabel="Confirmacion"
                        className="modal"
                        style={customSyles}
                    >

                        <div className="modal-conteiner">
                            <div className="modal-content">
                                {errorMessage}
                            </div>
                        </div>
                    </Modal>
                </div>
            )
            }

        </div>)
}

export default AdministrationPanel;
