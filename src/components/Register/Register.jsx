import "./Register.css";
import { useNavigate } from "react-router-dom";
import {useState} from "react"

export default function Register() {
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setSuccessMessage("Conta criada com sucesso!");


    setTimeout(() => {
      setSuccessMessage(""); 
      navigate("/"); 
    }, 3000);
  }


  return (
    <div className="register">
      {successMessage && (
        <div className="register__success">
          {successMessage}
          </div>
      )}
      <div className="register__container">
        <h2 className="register__title">Seja um membro <span className="register__bold">Power!</span></h2>

        <form className="register__form form" onSubmit={handleSubmit} name="register-form">

          <div className="register__item">
            <label className="register__label" htmlFor="name">Nome</label>
            <input
              className="register__input"
              type="text"
              id="name"
              name="name"
              placeholder="Aqui seu Nome de Usuário"
              required
            />
          </div>

          <div className="register__item">
            <label className="register__label" htmlFor="Password">Palavra Passe</label>
            <input
              className="register__input"
              type="Password"
              id="Password"
              name="Password"
              placeholder="Aqui sua Palavra Passe"
              required
            />
          </div>

          <div className="register__item">
            <label className="register__label" htmlFor="email">Email</label>
            <input
              className="register__input"
              type="email"
              id="email"
              name="email"
              placeholder="Aqui seu Email"
              required
            />
          </div>



          <button className="register__button" type="submit">
           Tornar-se Membro
          </button>
        </form>
      </div>
    </div>
  );
}