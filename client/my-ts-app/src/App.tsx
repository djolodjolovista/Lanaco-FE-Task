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
import CustomersModal from './components/modals/CustomersModal';
import SellersModal from './components/modals/SellersModal';

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
            <Route path=":id" element={<Modal type="invoice" options={modalOptions} />} />
          </Route>
          <Route path="/sellers" element={<Sellers />}>
            <Route path=":id" element={<SellersModal type="seller" />} />
          </Route>
          <Route path="/customers" element={<Customers />}>
            <Route path=":id" element={<CustomersModal type="customer" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
