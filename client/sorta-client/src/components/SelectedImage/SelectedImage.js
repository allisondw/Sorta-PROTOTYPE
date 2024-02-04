import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./SelectedImage.scss";
import DetailsStar from "../../assets/svgs/details-star.svg";

const SelectedImage = () => {
    const { id } = useParams();
    const [imageSettings, setImageSettings] = useState({});
    const navigate = useNavigate();

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
    console.log(imageSettings.dimensions);

    const imageSrc = `http://localhost:8080/data/${id}.png`;
    return (
        <div className='selected-image-container'>
            {imageSrc && <img src={imageSrc} alt="glitch art" className='selected-image' />}
            <article className='settings-container'>
                <div className='settings-div'>
                    <div className='description-line-div'><p>Sorting Threshold</p><img src={DetailsStar} alt="" className='details-star'/><p>{imageSettings.sortingThreshold}</p></div>
                    <div className='description-line-div'><p>Color Channel</p><img src={DetailsStar} alt="" className='details-star'/><p>{imageSettings.colorChannel}</p></div>
                    <div className='description-line-div'><p>Sorting Direction</p><img src={DetailsStar} alt="" className='details-star'/><p>{imageSettings.sortingDirection}</p></div>
                    {imageSettings.dimensions && <div className='description-line-div'><p>Dimensions</p><img src={DetailsStar} alt="" className='details-star'/><p>{imageSettings.dimensions.width} · {imageSettings.dimensions.height}</p></div>}
                    <div className='description-line-div'><p>Date Created</p><img src={DetailsStar} alt="" className='details-star'/><p>{new Date(imageSettings.timestamp).toLocaleDateString()}</p></div>
                </div>
                <button onClick={() => navigate(`/edit/${id}`)} className="edit-button">Edit Image</button>
            </article>
        </div>
    )
};

export default SelectedImage;