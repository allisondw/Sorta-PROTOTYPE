import React, { useState, useRef, useEffect } from 'react';
import ToolBar from '../ToolBar/ToolBar';
import "./CreatePage.scss";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import { useParams } from 'react-router-dom';
import { sortPixels } from "../../utils/pixelSorting";
import Waiting from "../../assets/svgs/waiting for pixels....svg";

const CreatePage = () => {
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const canvasRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [sortingThreshold, setSortingThreshold] = useState(100);
    const [originalImageData, setOriginalImageData] = useState(null);
    const [colorChannel, setColorChannel] = useState(null);
    const [sortingDirection, setSortingDirection] = useState('horizontal');
    const [imageIsLandscape, setImageIsLandscape] = useState(true);
    const editMode = Boolean(id);
  
    const handleImageUpload = (fileOrEvent) => {
      let file = fileOrEvent instanceof File ? fileOrEvent : fileOrEvent.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    };
  
    const drawImageOnCanvas = (imageUrl) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.crossOrigin = "anonymous"; 
    
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setOriginalImageData(imageData);
        setImageIsLandscape(img.width > img.height);
      };
    
      img.src = imageUrl;
    };
  
    useEffect(() => {
      if (image) {
        drawImageOnCanvas(image);
      }
    }, [image]);

    useEffect(() => {
        if (id) {
          const imageUrl = `http://localhost:8080/data/${id}.png`;
          setImage(imageUrl); 
        }
    }, [id]);

    const processImage = () => {
      if (!originalImageData) return;
  
      setIsProcessing(true);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
  
      const imageData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        originalImageData.width,
        originalImageData.height
      );
  
      sortPixels(imageData.data, sortingThreshold, colorChannel, sortingDirection, originalImageData.width);
      ctx.putImageData(imageData, 0, 0);
      setIsProcessing(false);
    };
  
    const clearSettings = () => {
      setColorChannel(null);
      setSortingDirection('horizontal');
      setSortingThreshold(100);
    }
  
    const handleSave = async () => {
      const id = uuidv4();
      const canvas = canvasRef.current;
      const imageDimensions = {
        width: canvas.width,
        height: canvas.height
      };
    
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image', blob, `${id}.png`);
        formData.append('id', id);
        formData.append('settings', JSON.stringify({
          sortingThreshold,
          colorChannel,
          sortingDirection,
          dimensions: imageDimensions
        }));
       
    
        try {
          const res = await axios.post('http://localhost:8080/api/save', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Image and settings saved', res.data);
        } catch (error) {
          console.error('Error saving image and settings: ', error);
        };
      }, 'image/png');
    };
  

    return (
      <div>
        <section className={`${imageIsLandscape ? 'create-page--landscape' : 'create-page--portrait'}`}>
          <div className='create-page__canvas-container'>
            {!image && <img src={Waiting} alt="Waiting for pixels" className='waiting-svg'/>}
            <canvas ref={canvasRef} className='create-page__canvas'></canvas> 
          </div>
            <ToolBar 
                imageIsLandscape={imageIsLandscape}
                isProcessing={isProcessing}
                image={image}
                sortingThreshold={sortingThreshold}
                colorChannel={colorChannel}
                sortingDirection={sortingDirection}
                handleImageUpload={handleImageUpload}
                processImage={processImage}
                setSortingThreshold={setSortingThreshold}
                setColorChannel={setColorChannel}
                setSortingDirection={setSortingDirection}
                handleSave={handleSave}
                clearSettings={clearSettings}
                editMode={editMode}
            />
        </section>
      </div>
    );
}

export default CreatePage;

