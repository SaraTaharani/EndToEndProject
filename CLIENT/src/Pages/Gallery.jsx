import React, { useEffect, useState ,useContext} from 'react';
import { useParams } from 'react-router-dom';
import '../css/public.css';
import { UserContext } from '../App';
import { postNewObject } from '../../Fetch';

function Gallery() {
    const [file, setFile] = useState();
    const [showAdd, setShowAdd] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
    const [idDelPhoto, setIdDelPhoto] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const params = useParams();
    const userData = useContext(UserContext);

    useEffect(() => {
        fetchPhotos();
        if (userData.role === 'admin') {
            setIsAdmin(true);
        }
        console.log(userData.role);
    }, [userData]);

    const fetchPhotos = () => {
        fetch(`http://localhost:3000/gallery`, {
            headers: {
                'Content-Type': 'application/json',
            },credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setPhotos(data);
            })
            .catch((error) => console.error('Error fetching photos:', error));
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
        setShowAdd(true);
    };

    const handleUpload = () => {
        setShowAdd(false);
        const formData = new FormData();
        formData.append('image', file);

        // Send POST request to upload image
        fetch('http://localhost:3000/gallery', {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem("token"),
            },credentials: "include",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                setPhotos(data);
            })
            .catch(error => console.error('Error adding photo:', error));
    };

    const handleDeletePhoto = () => {
        fetch(`http://localhost:3000/gallery/${idDelPhoto}`, {
            method: 'DELETE',
            headers: {
                'authorization': localStorage.getItem("token"),
            },credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setPhotos(data);
                setOpenConfirmationWindow(false);
            })
            .catch((error) => console.error('Error deleting photo:', error));
    };

    const handleDoubleClickPhoto = (photoId) => {
        if (isAdmin) {
            setOpenConfirmationWindow(true);
            setIdDelPhoto(photoId);
        } 
            
        
    };

    const photoElements = photos.map((photo) => (
        <div key={photo.id} className="photo-tile">
            <div className="photo-info">
                <img src={`http://localhost:3000/images/${photo.imageUrl}`} alt="Not Found" onDoubleClick={() => handleDoubleClickPhoto(photo.id)} />
            </div>
        </div>
    ));

    return (
        <div>
            <div>
                <h1>גלריה</h1>
                {isAdmin && (
                    <>
                        <input type="file" onChange={handleFile} />
                        {showAdd && <button onClick={handleUpload}>הוספת תמונה</button>}
                    </>
                )}
            </div>
            {photoElements}
            {openConfirmationWindow && (
                <div className="modal">
                    <div className="confirmation-text">האם ברצונך למחוק את התמונה?</div>
                    <div className="button-container">
                        <button className="cancel-button" onClick={() => setOpenConfirmationWindow(false)}>ביטול</button>
                        <button className="confirmation-button" onClick={handleDeletePhoto}>מחיקה</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;
