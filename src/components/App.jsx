import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import Map from './Map/Map.jsx';
import React, { useState } from 'react';
import PopupLogin from './Popup/PopupLogin/PopupLogin.jsx';
import { Routes, Route } from "react-router-dom";
import Contacts from './Contacts/Contacts.jsx';





export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div className="page">
        <Header openLogin={() => setIsPopupOpen(true)} />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>

        </div>
        <Footer />
     

     
      <PopupLogin
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  );
}
