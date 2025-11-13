import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import Map from './Map/Map.jsx';
import React, { useState } from 'react';
import PopupLogin from './Popup/PopupLogin/PopupLogin.jsx';




export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
    <div className="page">
      <Header openLogin={() =>setIsPopupOpen(true)}/>
      <Main />
      </div>
      <Footer />

      <PopupLogin isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}
        />
      </>
  );
}