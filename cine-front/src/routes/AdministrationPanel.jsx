import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import Modal from "react-modal"
import { fetchCategorias, newMovie } from "../components/UseFetch";
import MultipleImageDrop from "../components/AdministrationPanel/multipleImageDrop";
import SingleImageDrop from "../components/AdministrationPanel/singleImageDrop";
import { useEffect } from "react";
import { isValid } from "date-fns";
import moment from "moment";

Modal.setAppElement('#root')



function AdministrationPanel() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedDates, setSelectedDates] = useState([new Date()])
    const [image, setImage] = useState(null)
    const [banner, setBanner] = useState(null)
    const [gallery, setGallery] = useState([])
    const [multipleUrl, setMultipleUrl] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [sala, setSala] = useState('')
    const [duration, setDuration] = useState('')
    const [type, setType] = useState('')
    const [clasification, setClasification] = useState('')
    const [lenguage, setLenguage] = useState('')
    const [director, setDirector] = useState('')
    const [actors, setActors] = useState('')
    const [trailer, setTrailer] = useState('')

    useEffect(() => {

        setShowConfirmation(true)
        setErrorMessage('Cargando categorias...')
        const fetchAllCategories = async () => {
            try {
                const categories = await fetchCategorias()
                if (categories) {

                    const updatedCategorias = categories.map(categoria => ({
                        ...categoria,
                        selected: false
                    }));
                    setSelectedCategories(updatedCategorias);
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
            console.error(error)
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
                console.log(result.secure_url)
                setMultipleUrl((prevUrlList) => [...prevUrlList, result.secure_url])

                if (gallery.length - 1 == index)
                    return true;
            } catch (error) {
                console.error(error)
                return false
            }
        })
    }

    const fetchNewMovie = async (url, bannerUrl) => {

        try {
            const data = {
                titulo: title,
                trailer: trailer,
                portada: url,
                banner: bannerUrl,
                descripcion: description,
                caracteristicas: {
                    sala: sala,
                    modalidad: type,
                    reparto: actors,
                    duracion: duration,
                    clasificacion: clasification,
                    opcionesIdioma: lenguage,
                    director: director
                },
                imagenes: multipleUrl.map((url) => ({ imagen: url })),
                categorias: selectedCategories.filter((category) => category.selected == true)
                    .map((category) => ({ titulo: category.titulo })),
                fechas: selectedDates.map((date) => ({ fecha: moment(date.toDate()).format('YYYY-MM-DD') }))
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
                    setBanner(null)
                    setSelectedCategories([])
                    setSelectedDates([])
                    setGallery([])
                    setMultipleUrl([])
                    setSala('')
                    setType('')
                    setTrailer('')
                    setDuration('')
                    setLenguage('')
                    setActors('')
                    setClasification('')
                    setDirector('')
                }, 2000)
            } else {
                setErrorMessage("Error al cargar la pelicula.")
                setTimeout(() => {
                    setShowConfirmation(false)
                }, 2000)
            }
        } catch (error) {
            console.log(error)
            setErrorMessage("Error al cargar la pelicula.")
            setTimeout(() => {
                setShowConfirmation(false)
            }, 2000)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedDates)
        setErrorMessage("Cargando...")
        setShowConfirmation(true)

        if (!title || !selectedCategories.length || !description || !selectedDates || !selectedCategories
            || !image || !gallery || !banner || !sala || !duration || !type || !clasification || !lenguage
            || !director || !actors || !trailer) {
            setErrorMessage("Todos los campos son requeridos.");
            setTimeout(() => {
                setShowConfirmation(false)
            }, 2000)
            return;
        }

        const currentDate = new Date();
        selectedDates.map((date) => {
            const newDate = new Date(date)
            if (date < currentDate) {
                setErrorMessage("La fechas deben ser iguales o posteriores a la fecha actual")
                if (isValid(newDate)) {
                    console.log('valido'); // Formatear fecha válida
                } else {
                    console.log('invalido'); // Usar fecha predeterminada para fechas inválidas
                }
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

                    setMultipleUrl([])
                    setTimeout(() => {
                        setShowConfirmation(false)
                    }, 2500)
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
    const onChangeDuration = (e) => {
        setDuration(e.target.value)
    }
    const onChangeClasification = (e) => {
        setClasification(e.target.value)
    }
    const onChangeLenguage = (e) => {
        setLenguage(e.target.value)
    }

    const onChangeActors = (e) => {
        setActors(e.target.value)
    }

    const onChangeDirector = (e) => {
        setDirector(e.target.value)
    }

    const onChangeType = (e) => {
        setType(e.target.value)
    }

    const onChangeTrailer = (e) => {
        setTrailer(e.target.value)
    }

    const handleCategoriesChange = (categoriaId) => {

        const updatedCategorias = selectedCategories.map(categoria => {
            if (categoria.id === categoriaId) {
                return {
                    ...categoria,
                    selected: !categoria.selected
                };
            }
            return categoria;
        });

        console.log(updatedCategorias)

        setSelectedCategories(updatedCategorias);
    };



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
                                    {selectedCategories.length > 0 && selectedCategories.map((categorie, index) => (
                                        <label key={categorie.id}>
                                            <input 
                                                type="checkbox"
                                                value={categorie.id}
                                                checked={categorie.selected}
                                                onChange={() => handleCategoriesChange(categorie.id)}
                                            />
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
                                    className="form-title"
                                    type="text"
                                    placeholder="Director"
                                    value={director}
                                    onChange={onChangeDirector}
                                />
                                <label>Reparto</label>
                                <input
                                    className="form-title"
                                    type="text"
                                    placeholder="Reparto"
                                    value={actors}
                                    onChange={onChangeActors}
                                />
                                <label>Trailer</label>
                                <input
                                    className="form-title"
                                    type="text"
                                    placeholder="Url del trailer"
                                    value={trailer}
                                    onChange={onChangeTrailer}
                                />

                                <div className="date-container">
                                    <label>Fecha:</label>
                                    <div className="date-center">
                                        <DatePicker
                                            className="date-picker"
                                            multiple
                                            selected={selectedDates}
                                            onChange={setSelectedDates}
                                            format={"YYYY-MM-DD"}
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
                                        placeholder="Modalidad"
                                        value={type}
                                        onChange={onChangeType}
                                    />
                                </div>
                                <div>
                                    <label>Duracion</label>
                                    <input
                                        type="text"
                                        placeholder="Duracion"
                                        value={duration}
                                        onChange={onChangeDuration}
                                    />
                                </div>

                                <div>
                                    <label>Clasificacion</label>
                                    <input
                                        type="text"
                                        placeholder="Clasificacion"
                                        value={clasification}
                                        onChange={onChangeClasification}
                                    />
                                </div>
                                <div>
                                    <label>Idioma</label>
                                    <input
                                        type="text"
                                        placeholder="Idioma"
                                        value={lenguage}
                                        onChange={onChangeLenguage}
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
