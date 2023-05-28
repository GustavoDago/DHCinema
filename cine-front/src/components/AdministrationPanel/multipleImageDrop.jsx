import { useState } from "react";
import { useDropzone } from "react-dropzone";

function MultipleImageDrop() {

  const [fileList, setFileList] = useState([]);



  const handleFileDrop = (acceptedFiles) => {
    const files = acceptedFiles.map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file),
      file: file,
    }));

    setFileList((prevFileList) => [...prevFileList, ...files]);
  };


  const removeFile = (index) => {
    setFileList((prevFileList) => {
      const updatedFileList = [...prevFileList];
      updatedFileList.splice(index, 1);
      return updatedFileList;
    });
  };

  

  const FileDropzone = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleFileDrop,
      maxFiles: 10,
    });

    return (
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta los archivos aquí...</p>
        ) : (
          <p>Arrastra y suelta archivos aquí, o haz clic para seleccionar archivos.</p>
        )}
        {fileList.map((file, index) => (
          <div className="file-preview" key={index}>
            <div>{file.name}</div>
            {file.preview && <img src={file.preview} alt="Archivo seleccionado" />}
            <button onClick={() => removeFile(index)}>Eliminar</button>
          </div>
        ))}
      </div>
    );
  };

  return (
      <FileDropzone />
    );
  }
  
  export default MultipleImageDrop;