import React from "react";
import "./ToolBar.scss";
import ToolTip from "../ToolTip/ToolTip.js";
import Glitch from "../../assets/svgs/click-to-glitch.svg";

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
  editMode,
}) => {
  const handleSliderChange = (e) => {
    const newValue = 255 - Number(e.target.value);
    setSortingThreshold(newValue);
    const percentage = ((255 - newValue) / 255) * 100;
    e.target.style.background = `linear-gradient(to right, #D9E8B8 0%, #D9E8B8 ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
  };

  return (
    <div
      className={`${
        imageIsLandscape ? "landscape-tool-bar" : "portrait-tool-bar"
      }`}
    >
      <div className="toolbar-main">
        <div className="toolbar-settings">
          <div className="tool-div slider">
            <ToolTip text="Adjust the threshold of brightness that the algorithm will use while sorting">
              <span className="thresh-slider-label">Adjust Threshold</span><br/>
              <input
                id="thresh-slider"
                type="range"
                min="0"
                max="255"
                value={255 - sortingThreshold}
                onChange={handleSliderChange}
                className="thresh-slider"
              />
            </ToolTip>
          </div>
          <div className="tool-div">
            <ToolTip text="You can select a color channel to sort by: Red, Green, or Blue">
              <select
                value={colorChannel}
                onChange={(event) => setColorChannel(event.target.value)}
                className="color-channel-dropdown"
                id="color-channel-dropdown"
              >
                <option value="">Sort by RGB Channel</option>
                <option value="red">R</option>
                <option value="green">G</option>
                <option value="blue">B</option>
              </select>
            </ToolTip>
          </div>
          <div className="tool-div">
            <ToolTip text="You can select which direction you would like the pixels sorted in: horizontal or vertical">
              <select
                value={sortingDirection}
                onChange={(event) => setSortingDirection(event.target.value)}
                className="sorting-direction-dropdown"
                id="sorting-direction-dropdown"
              >
                <option value="horizontal">Sort Pixels Horizontally</option>
                <option value="vertical">Sort Pixels Vertically</option>
              </select>
            </ToolTip>
          </div>
        </div>
        <div className="toolbar-buttons">
          <div className="tool-div">
            <ToolTip text="Clear all settings, reset to default">
              <button
                onClick={clearSettings}
                className="button clear-settings-btn"
              >
                Clear Settings
              </button>
            </ToolTip>
          </div>
          {!editMode && (
            <div className="tool-div">
              <ToolTip text="Upload a new image">
                <input
                  type="file"
                  id="upload"
                  onChange={handleImageUpload}
                  disabled={isProcessing}
                  className="button upload"
                />
              </ToolTip>
            </div>
          )}
          <div className="tool-div">
            <ToolTip text="Save your image with the current settings to the gallery">
              <button onClick={handleSave} className="button save-image-btn">
                Save Image
              </button>
            </ToolTip>
          </div>
        </div>
      </div>
      <div className="toolbar-process">
        <ToolTip text="Process Your Image to Apply the Pixel Sorting">
          <img
            src={Glitch}
            alt=""
            className="process-glitch"
            onClick={processImage}
            disabled={!image || isProcessing}
          />
        </ToolTip>
      </div>
    </div>
  );
};

export default ToolBar;
