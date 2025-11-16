import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import Map from './Map/Map.jsx';
import React, { useState, useEffect } from 'react';
import PopupLogin from './Popup/PopupLogin/PopupLogin.jsx';
import { Routes, Route, useLocation } from "react-router-dom";
import Contacts from './Contacts/Contacts.jsx';
import Register from './Register/Register.jsx';
import Loading from './Loading/Loading.jsx';




export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();


  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300); 
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <div className="page">
      {loading && <Loading />}
        <Header openLogin={() => setIsPopupOpen(true)} />

       
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Main />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/register" element={<Register />} />
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
