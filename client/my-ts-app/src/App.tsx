import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainScreen from './screens/MainScreen';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path='/home' element={<MainScreen />} />
     </Routes>
     
     
     </BrowserRouter>
    </div>
  );
}

export default App;
