import React, { useState } from 'react';
import './ToolTip.scss'; // Make sure to create a corresponding Tooltip.scss file

const ToolTip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default ToolTip;