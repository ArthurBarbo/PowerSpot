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
import InfoSection from './InfoSection/InfoSection.jsx';




export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [reloadMapTrigger, setReloadMapTrigger] = useState(0);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <div className="page">
        {loading && <Loading />}
        <Header onHomeClick={() => setReloadMapTrigger(prev => prev + 1)}
          openLogin={() => setIsPopupOpen(true)} />


        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Main reloadTrigger={reloadMapTrigger} />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<InfoSection />} />
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
