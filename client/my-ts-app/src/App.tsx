import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Invoices from './screens/Invoices';
import Sellers from './screens/Sellers';
import Customers from './screens/Customers';
import Menu from './components/menus/Menu';
import OptionsMenu from './components/menus/OptionsMenu';
import InvoicesModal from './components/modals/InvoicesModal';
import CustomersModal from './components/modals/CustomersModal';
import SellersModal from './components/modals/SellersModal';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <OptionsMenu />
        <Routes>
          <Route path="*" element={<Navigate to="/invoices" />} />
          <Route path="/invoices" element={<Invoices />}>
            <Route path=":id" element={<InvoicesModal headerText="Edit an invoice" />} />
          </Route>
          <Route path="/sellers" element={<Sellers />}>
            <Route path=":id" element={<SellersModal headerText="Edit an seller" />} />
          </Route>
          <Route path="/customers" element={<Customers />}>
            <Route path=":id" element={<CustomersModal headerText="Edit an customer" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
