import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./GalleryPage.scss";

const GalleryPage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/gallery');
                setImages(res.data);

            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };
        fetchImages();


    }, []);


    return (
        <section>
        <div className='gallery-container'>
            {images.map((image) => (
                <div key={image.id} className='gallery-image'>
                    <Link to={`/image/${image.id}`}>
                        <img src={`http://localhost:8080${image.imageUrl}`} alt="Glitch Art" className='image' />
                    </Link>
                </div>
            ))}
        </div>
    </section>
    )

}

export default GalleryPage;