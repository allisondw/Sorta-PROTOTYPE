import React, { useState, useRef, useEffect } from 'react';
import ToolBar from '../ToolBar/ToolBar';
import "./CreatePage.scss";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import { useParams } from 'react-router-dom';


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
  
      sortPixels(imageData.data, sortingThreshold, colorChannel, sortingDirection);
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
  
    const sortPixels = (pixels, sortingThreshold, colorChannel, direction) => {
      const rowLength = originalImageData.width * 4;
  
      if (direction === 'horizontal') {
        for (let rowStart = 0; rowStart < pixels.length; rowStart += rowLength) {
          let rowEnd = rowStart + rowLength;
          let rowPixels = [];
  
          for (let i = rowStart; i < rowEnd; i += 4) {
            rowPixels.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]);
          }
  
          rowPixels.sort((a, b) => {
            if (colorChannel) {
              let valueA = getValueByColorChannel(a, colorChannel);
              let valueB = getValueByColorChannel(b, colorChannel);
              if (valueA > sortingThreshold && valueB > sortingThreshold) {
                return valueA - valueB;
              }
            } else {
              let brightnessA = calculateBrightness(a);
              let brightnessB = calculateBrightness(b);
              if (brightnessA > sortingThreshold && brightnessB > sortingThreshold) {
                return compareBrightness(a, b);
              }
            }
            return 0;
          });
  
  
          for (let i = rowStart, j = 0; i < rowEnd; i += 4, j++) {
            pixels[i] = rowPixels[j][0];
            pixels[i + 1] = rowPixels[j][1];
            pixels[i + 2] = rowPixels[j][2];
            pixels[i + 3] = rowPixels[j][3];
          }
        }
      } else if (direction === 'vertical') {
        for (let colStart = 0; colStart < rowLength; colStart += 4) {
          let colPixels = [];
  
  
          for (let i = colStart; i < pixels.length; i += rowLength) {
            colPixels.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]);
          }
  
    
          colPixels.sort((a, b) => {
            if (colorChannel) {
  
              let valueA = getValueByColorChannel(a, colorChannel);
              let valueB = getValueByColorChannel(b, colorChannel);
              if (valueA > sortingThreshold && valueB > sortingThreshold) {
                return valueA - valueB;
              }
            } else {
  
              let brightnessA = calculateBrightness(a);
              let brightnessB = calculateBrightness(b);
              if (brightnessA > sortingThreshold && brightnessB > sortingThreshold) {
                return compareBrightness(a, b);
              }
            }
            return 0;
          });
  
          for (let i = colStart, j = 0; i < pixels.length; i += rowLength, j++) {
            pixels[i] = colPixels[j][0];
            pixels[i + 1] = colPixels[j][1];
            pixels[i + 2] = colPixels[j][2];
            pixels[i + 3] = colPixels[j][3];
          }
        }
      }
    };
  
    const getValueByColorChannel = (pixel, channel) => {
      const channelMap = { 'red': 0, 'green': 1, 'blue': 2 };
      return pixel[channelMap[channel]];
    };
  
    const calculateBrightness = (pixel) => {
      return 0.299 * pixel[0] + 0.587 * pixel[1] + 0.114 * pixel[2];
    };
  
    const compareBrightness = (a, b) => {
      let brightnessA = 0.299 * a[0] + 0.587 * a[1] + 0.114 * a[2];
      let brightnessB = 0.299 * b[0] + 0.587 * b[1] + 0.114 * b[2];
      return brightnessA - brightnessB;
    };
  
    return (
      <div>
        <section className={`${imageIsLandscape ? 'create-page--landscape' : 'create-page--portrait'}`}>
          <div className='create-page__canvas-container'>
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

