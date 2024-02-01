import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./SelectedImage.scss";

const SelectedImage = () => {
    const { id } = useParams();
    const [imageSettings, setImageSettings] = useState({});

    useEffect(() => {
        const fetchImageDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/settings/${id}`);
                setImageSettings(res.data)
            } catch (error) {
                console.error("Error fetching image: ", error);
            }
        };
        if (id) {
            fetchImageDetails();
        }
    }, [id]);

    const imageSrc = `http://localhost:8080/data/${id}.png`;
    return (
        <div>
            {imageSrc && <img src={imageSrc} alt="glitch art" className='selected-image' />}
            <div className='settings-div'>
                <p>Sorting Threshold: {imageSettings.sortingThreshold}</p>
                <p>Color Channel: {imageSettings.colorChannel}</p>
                <p>Sorting Direction: {imageSettings.sortingDirection}</p>
                <p>{new Date(imageSettings.timestamp).toLocaleDateString()}</p>
            </div>
        </div>
    )
};

export default SelectedImage;