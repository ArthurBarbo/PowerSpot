import React from 'react';
import Popup from "../Popup";
import "./PopupLogin.css";

export default function PopupLogin({ isOpen, onClose }) {

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <h2 className='popup-login__title'>Login</h2>
            <form className='popup-login__form'>
            <input type="email" placeholder="Digite seu email" required />
        <input type="password" placeholder="Digite sua senha" required />
        <button type="submit" className="popup-login__submit">
          Ver minhas Preferências
        </button>
      </form>
    </Popup>
  );
}