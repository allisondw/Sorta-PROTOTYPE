import React, { useState, useRef, useEffect } from 'react';



const MainPage = () => {
    const [image, setImage] = useState(null);
    const canvasRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [sortingThreshold, setSortingThreshold] = useState(100);
    const [originalImageData, setOriginalImageData] = useState(null);
    const [colorChannel, setColorChannel] = useState(null);

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
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        setOriginalImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
      }
      img.src = imageUrl;
    }

    useEffect(() => {
      if (image) {
        drawImageOnCanvas(image);
      }
    }, [image]);

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
      
   
      sortPixels(imageData.data, canvas.width, sortingThreshold, colorChannel);
      ctx.putImageData(imageData, 0, 0);
      setIsProcessing(false);
    };

    const sortPixels = (pixels, width, sortingThreshold, colorChannel) => {
      const rowLength = width * 4;
    
      for (let rowStart = 0; rowStart < pixels.length; rowStart += rowLength) {
        let rowEnd = rowStart + rowLength;
        let rowPixels = [];
    
        // extracts the pixels of the current row
        for (let i = rowStart; i < rowEnd; i += 4) {
          rowPixels.push([pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]]);
        }
    
        // sorts the current row based on either overall brightness or a specific color channel
        rowPixels.sort((a, b) => {
          if (colorChannel) {
            // Sorting based on a specific color channel
            let valueA = getValueByColorChannel(a, colorChannel);
            let valueB = getValueByColorChannel(b, colorChannel);
            if (valueA > sortingThreshold && valueB > sortingThreshold) {
              return valueA - valueB;
            }
          } else {
            // sorts based on overall brightness
            let brightnessA = calculateBrightness(a);
            let brightnessB = calculateBrightness(b);
            if (brightnessA > sortingThreshold && brightnessB > sortingThreshold) {
              return compareBrightness(a, b);
            }
          }
          return 0;
        });
    
        // puts the sorted pixels back into the original pixels array
        for (let i = rowStart, j = 0; i < rowEnd; i += 4, j++) {
          pixels[i] = rowPixels[j][0];
          pixels[i + 1] = rowPixels[j][1];
          pixels[i + 2] = rowPixels[j][2];
          pixels[i + 3] = rowPixels[j][3];
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
      <div className='canvas-container'>
        {/* <ImageDropZone className="drop-zone" onImageDrop={handleImageUpload} image={image}/> */}
        <input type="file" onChange={handleImageUpload} disabled={isProcessing} />
        <button onClick={processImage} disabled={!image || isProcessing}>Process Image</button>
        <input 
            type="range" 
            min="0" 
            max="255" 
            value={sortingThreshold} 
            onChange={(e) => setSortingThreshold(Number(e.target.value))}
        />
        <span>Threshold: {sortingThreshold}</span>
        <div>
  <input 
    type="radio" 
    value="red" 
    checked={colorChannel === 'red'} 
    onChange={() => setColorChannel('red')} 
  /> Red
  <input 
    type="radio" 
    value="green" 
    checked={colorChannel === 'green'} 
    onChange={() => setColorChannel('green')} 
  /> Green
  <input 
    type="radio" 
    value="blue" 
    checked={colorChannel === 'blue'} 
    onChange={() => setColorChannel('blue')} 
  /> Blue
  

</div>
        <canvas ref={canvasRef}></canvas>
    </div>
    );
}

export default MainPage;