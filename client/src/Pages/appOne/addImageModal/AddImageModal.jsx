import { useState } from "react";
import axios from "axios";

import { Box, Input } from "@mui/material";
import AppModal from "../../../components/appModal/AppModal";

import './addImageModal.css';

const AddImageModal = ({openImageUpload, handleOpenImageUpload, addImage}) => {

    const [name, setName] = useState("");
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleClose = () => {
        setName("");
        setFile(null);
        handleOpenImageUpload();
    }

    const handleImageUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        axios.post('http://localhost:5000/image/upload', formData).
        then(res => {
            addImage(res.data);
            handleClose();
        }).catch(err => {
            console.log(err);
        });
    }

  return (
    <AppModal
        open={openImageUpload}
        onClose={handleClose}
    >
        <Box className="upload-image-form">
            <h2>Upload Image</h2>

            <Input
                type="text"
                placeholder="Image Name"
                onChange={handleNameChange}
                value={name}
            />

            <Input
                type="file"
                onChange={handleFileChange}
            />

            <img 
                src={file ? URL.createObjectURL(file) : ""} 
                alt="" 
                className="image-preview" 
            />

            <button 
                onClick={handleImageUpload}
                disabled={!file || !name}
            >Upload</button>
        </Box>
    </AppModal>
  )
}

export default AddImageModal