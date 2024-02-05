import React, { useState, useRef } from 'react';
import "./ImageDropZone.scss";

const ImageDropZone = ({ onImageDrop, image, handleImageUpload }) => {
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragOver(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            onImageDrop(event.dataTransfer.files[0]);
        }
    };

    const handleDropZoneClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div
            className={`drop-zone ${dragOver ? 'drag-over' : ''} ${image ? 'hidden' : ''}`}
            onClick={handleDropZoneClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input 
            type="file" 
            style={{ display: 'none' }} 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            onClick={(event) => event.stopPropagation()} 
            accepts="image/*"/>
            Drag and Drop Image Here
        </div>
    );
}

export default ImageDropZone;