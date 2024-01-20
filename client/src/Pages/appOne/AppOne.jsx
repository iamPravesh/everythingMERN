import { useEffect, useState } from 'react';
import axios from 'axios';

import './appOne.css';

const AppOne = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    document.title = "Image Upload and Retrieve"
  }, [])

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    axios.post('http://localhost:5000/image/upload', formData).
      then(res => {
        setImages([...images, res.data]);
      }).catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios.get('http://localhost:5000/image/').then(res => {
      console.log(res);
      setImages(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div>
      <h1 className="title">
        Image Upload and Retrieve
      </h1>

      <div className="upload-form-view">
        <input type="text" className="input-name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={name} />
        <input type="file" className="file-uploader" onChange={handleFileChange} />
        <button className="btn-upload" onClick={handleFileUpload}>Upload</button>
      </div>

      <div className="image-view">
        {
          images && images.map((image, index) => (
            <div className="image-container" key={index}>
              <img src={`http://localhost:5000/images/${image.image}`} alt={image.name} className="image" />
              <p className="image-name">{image.name}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AppOne