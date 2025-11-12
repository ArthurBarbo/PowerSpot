import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import Map from './Map/Map.jsx';
import react, { useState } from 'react';
import Popup from './Popup/Popup.jsx';



export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
    <div className="page">
      <Header openLogin={() =>setIsPopupOpen(true)}/>
      <Main />
      </div>
      <Footer />

      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2>Login</h2>
        <form className="popup__form">
          <input type="email" id="email" placeholder='Digite aqui seu Email' required />
          <input type="password" id="password" placeholder='Digite aqui sua Senha' required />
          <button type="submit" className="popup__submit">Ver minhas Preferências</button>
        </form>
      </Popup>
      </>
  );
}