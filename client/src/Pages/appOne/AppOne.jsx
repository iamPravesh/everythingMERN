import { useEffect, useState } from 'react';
import axios from 'axios';
import AddImageModal from './addImageModal/AddImageModal';

import { MdDeleteOutline } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";

import './appOne.css';

const AppOne = () => {
  const [images, setImages] = useState([]);

  const [openImageUpload, setOpenImageUpload] = useState(false);

  const handleOpenImageUpload = () => {
    setOpenImageUpload(!openImageUpload);
  }

  const addImage = (image) => {
    setImages([...images, image ]);
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/image/delete/${id}`).then(res => {
      setImages(images.filter(image => image._id !== res.data.image._id));
    }).catch(err => {
      console.log(err);
    });
  }

  const handleDownload = async (id) => {
    const res = await axios.get(`http://localhost:5000/image/${id}`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([res.data], {
      type: res.data.type
    }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', images.find(image => image._id === id).name);
    document.body.appendChild(link);
    link.click();

    link.remove();
  }

  useEffect(() => {
    document.title = "Images"
    axios.get('http://localhost:5000/image/').then(res => {
      setImages(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div>
      <h1 className="title">
        Images
      </h1>

      <button
        className="add-image-btn"
        onClick={handleOpenImageUpload}
        autoFocus
      >Upload Image</button>

      {images.length === 0 && (
        <p className="no-images">Uh-Oh no images are upload to show.. try and add some images from the button below to see</p>
      )}

      <div className="image-view">
        {
          images && images.map((image, index) => (
            <div className="image-container" key={index}>
              <img src={`http://localhost:5000/images/${image.image}`} alt={image.name} className="image" />
              <div className="image-overlay">
                <h3>{image.name}</h3>
                <div className="image-actions">
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete(image._id)}
                  >
                    <MdDeleteOutline
                      size={30}
                      color="#f00"
                    />
                  </button>
                  <button 
                    className="action-btn download"
                    onClick={() => handleDownload(image._id)}
                  >
                    <FaDownload
                      size={30}
                      color="#0f0"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      <AddImageModal 
        openImageUpload={openImageUpload}
        handleOpenImageUpload={handleOpenImageUpload}
        addImage={addImage}
      />
    </div>
  )
}

export default AppOne