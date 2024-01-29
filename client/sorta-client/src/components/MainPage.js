import React, { useState, useRef, useEffect } from 'react';

const MainPage = () => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => setImage(event.target.result);
        reader.readAsDataURL(file);
    };

    const drawImageOnCanvas = (imageUrl) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
        }
        img.src = imageUrl;
    }

    useEffect(() => {
        if (image) {
            drawImageOnCanvas(image);
        }
    }, [image]);


    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            <button onClick={} >Process Image</button>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}