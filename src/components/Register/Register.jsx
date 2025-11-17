import "./Register.css";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"

export default function Register() {
  const [successMessage, setSuccessMessage] = useState("");
  const [formValues, setFormValues] = useState({ name: "", password: "", email:"" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();


  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  
  useEffect(() => {
    const isValid = formValues.name.trim() !== "" && 
    formValues.password.trim() !== ""&&
    formValues.email.trim() !== "";
    setIsButtonDisabled(!isValid);
  }, [formValues]);


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
              value={formValues.name}
              onChange={handleChange}
            />
          </div>

          <div className="register__item">
            <label className="register__label" htmlFor="password">Palavra Passe</label>
            <input
              className="register__input"
              type="password"
              id="password"
              name="password"
              placeholder="Aqui sua Palavra Passe"
              required
              value={formValues.password}
              onChange={handleChange}
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
              value={formValues.email}
              onChange={handleChange}
            />
          </div>



          <button className="register__button" type="submit" disabled={isButtonDisabled}>
           Tornar-se Membro
          </button>
        </form>
      </div>
    </div>
  );
}