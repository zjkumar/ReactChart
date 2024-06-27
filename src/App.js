import React, {useState} from 'react';

import './App.css';
import ChartComponent from './components/ChartComponent';
import TimeframeSelector from './components/TimeFrameSelector'

const App = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');

  const handleTimeframeSelect = (timeframe) => {
    setSelectedTimeframe(timeframe);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Charting Library</h1>
      </header>
      <main>
      <TimeframeSelector onSelect={handleTimeframeSelect} />
      <ChartComponent timeframe={selectedTimeframe} />
      </main>
    </div>
  );
};

export default App;


