import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';


import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import Map from './Map/Map.jsx';
import PopupLogin from './Popup/PopupLogin/PopupLogin.jsx';
import PopupName from "./Popup/PopupName/PopupName.jsx";
import Contacts from './Contacts/Contacts.jsx';
import Register from './Register/Register.jsx';
import Loading from './Loading/Loading.jsx';
import InfoSection from './InfoSection/InfoSection.jsx';
import { getUserData, updateUserName } from './Api/auth';



export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [reloadMapTrigger, setReloadMapTrigger] = useState(0);
  const [user, setUser] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  function handleEditName() {
    setIsEditPopupOpen(true);
  }

  async function handleSaveName(newName) {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await updateUserName(token, newName);

      if (!data.user) {
        console.error("Erro: usuário não retornado pelo backend");
        return;
      }

      setUser(data.user);
      setIsEditPopupOpen(false);
    } catch (err) {

      console.error("Erro ao atualizar nome:", err.message || err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserData(token)
        .then(data => setUser(data))
        .catch(err => {
          console.error(err);
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

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
          openLogin={() => setIsPopupOpen(true)}
          user={user}
          onEditName={handleEditName}
          onLogout={handleLogout} />


        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Main reloadTrigger={reloadMapTrigger} user={user} />} />
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

      <PopupName
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        onSave={handleSaveName}
        currentName={user?.name || ""}
      />
    </>
  );
}

