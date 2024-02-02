import React from 'react';
import "./ToolBar.scss";

const ToolBar = ({
  imageIsLandscape,
  isProcessing,
  image,
  sortingThreshold,
  colorChannel,
  sortingDirection,
  handleImageUpload,
  processImage,
  setSortingThreshold,
  setColorChannel,
  setSortingDirection,
  handleSave,
  clearSettings,
 }) => {
    const handleSliderChange = (e) => {
        const newValue = 255 - Number(e.target.value);
        setSortingThreshold(newValue);
        
        // Calculate the new background style for the slider
        const percentage = ((255 - newValue) / 255) * 100;
        e.target.style.background = `linear-gradient(to right, #D9E8B8 0%, #D9E8B8 ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
    };

  return (
    <div className={`${imageIsLandscape ? 'landscape-tool-bar' : 'portrait-tool-bar'}`} >
    <input type="file" id="upload" onChange={handleImageUpload} disabled={isProcessing} className="upload"/>
<label htmlFor="upload" className="file-upload-label"><p className='file-upload-label-text'>Upload new image&nbsp; &nbsp; &nbsp; &nbsp;+</p><input type="file" id="upload" onChange={handleImageUpload} disabled={isProcessing} className="upload"/></label>

      {/* <button onClick={processImage} disabled={!image || isProcessing} className='process-img'>Process Image</button> */}
     
            <input 
                id="thresh-slider"
                type="range" 
                min="0" 
                max="255" 
                value={255 - sortingThreshold} 
                onChange={handleSliderChange}
                className='thresh-slider'
            />
            <span className='thresh-slider-label'>STRENGTH</span>
      <div>
        <div>
        <select value={colorChannel} onChange={(event) => setColorChannel(event.target.value)} className='color-channel-dropdown' id='color-channel-dropdown'>
            <option value="">Sort by RGB Channel &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; +</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
        </select>

      </div>
      <div>
        <select value={sortingDirection} onChange={(event) => setSortingDirection(event.target.value)} className='sorting-direction-dropdown' id="sorting-direction-dropdown">
          <option value="horizontal">Sort Pixels Horizontally &nbsp; &nbsp; &nbsp; &nbsp; +</option>
          <option value="vertical">Sort Pixels Vertically &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;+</option>
        </select>
      </div>
      <button onClick={handleSave} className='save-image-btn'>Save Image</button>
      <button onClick={clearSettings} className='clear-settings-btn'>Clear Settings</button>
    </div>
    </div>
  );
};

export default ToolBar;