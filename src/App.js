import React, { useState, useEffect } from 'react';
import './App.css';
import Lift from './Lift';

const TOTAL_FLOORS = 5; // Assuming a building with 5 floors
const FLOOR_HEIGHT = 100; // Assuming each floor is 100px in height
const TRAVEL_TIME = 2000; // Time taken to travel between floors in milliseconds

function App() {
 

  return (
    <div className="App">
      <Lift />
    </div>
  );
}

export default App;
