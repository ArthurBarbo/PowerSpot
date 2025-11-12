import {useState} from 'react';
import Popup from "../Popup";
import "./PopupLogin.css";

export default function PopupLogin({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      return;
    }

  setError(false);
    console.log('Login realizado:', { email, password });
    onClose(); 
  

}

    return (
        <Popup isOpen={isOpen} onClose={onClose}>
            <h2 className='popup-login__title'>Login</h2>
            <form className='popup-login__form' onSubmit={handleSubmit}>
            <input className={`popup-login__input ${error && !email ? 'error' : ''}`} 
            type="email" 
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setError(false)}
            minLength={3}
             required />


        <input className={`popup-login__input ${error && !password ? 'error' : ''}`} 
         type="password" 
         placeholder="Digite sua senha"
         minLength={6}
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         onFocus={() => setError(false)}
        required />
        <button type="submit" className="popup-login__submit">
          Ver minhas Preferências
        </button>
      </form>
    </Popup>
  );
}
