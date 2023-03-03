import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainScreen from './screens/MainScreen';
import LandingScreen from './screens/LandingScreen';
import Invoices from './screens/Invoices';
import Sellers from './screens/Sellers';
import Customers from './screens/Customers';
import Menu from './components/menus/Menu';
import OptionsMenu from './components/menus/OptionsMenu';
import Modal from './components/modals/Modal';

function App() {
  const modalOptions = [
    { text: 'Seller' },
    { text: 'Customer' },
    { text: 'Date' },
    { text: 'Amount' }
  ];
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <OptionsMenu />
        <Routes>
          <Route path="*" element={<Navigate to="/landing-screen" />} />
          <Route path="/landing-screen" element={<LandingScreen />} />
          <Route path="/home" element={<MainScreen />} />
          <Route path="/invoices" element={<Invoices />}>
            <Route path=":id" element={<Modal type="test" options={modalOptions} />} />
          </Route>
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
