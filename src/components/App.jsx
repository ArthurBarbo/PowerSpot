import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import Map from './Map/Map.jsx';
import PopupLogin from './Popup/PopupLogin/PopupLogin.jsx';
import Contacts from './Contacts/Contacts.jsx';
import Register from './Register/Register.jsx';
import Loading from './Loading/Loading.jsx';
import InfoSection from './InfoSection/InfoSection.jsx';




export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [reloadMapTrigger, setReloadMapTrigger] = useState(0);
  const [user, setUser] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  console.log("App user:", user);
  return (
    <>
      <div className="page">
        {loading && <Loading />}
        <Header onHomeClick={() => setReloadMapTrigger(prev => prev + 1)}
          openLogin={() => setIsPopupOpen(true)}
          user={user} />


        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Main reloadTrigger={reloadMapTrigger} />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<InfoSection />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div >
      <Footer />



      <PopupLogin
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onLoginSuccess={(userData) => setUser(userData)}
      />
    </>
  );
}
