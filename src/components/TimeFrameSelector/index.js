import React from 'react';
import ChartComponent from '../ChartComponent';

const TimeframeSelector = ({ onSelect }) => {
  const handleExportAsPNG = () => {
    ChartComponent.exportAsImage(); // Call the exportAsImage function from ChartComponent
  };

  return (
    <div className="timeframe-selector">
      <button onClick={() => onSelect('daily')}>Daily</button>
      <button onClick={() => onSelect('weekly')}>Weekly</button>
      <button onClick={() => onSelect('monthly')}>Monthly</button>
      <button onClick={handleExportAsPNG}>Export as PNG</button>
    </div>
  );
}

export default TimeframeSelector;
