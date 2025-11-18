
import "./Contacts.css";
import {useState, useEffect} from "react";


export default function Contacts() {
  const [sucessMessage, setSucessMessage] = useState("");
const [formValues,setFormValues] = useState({
  name:"",
  email:"",
  message: ""
});

const [isButtonDisabled, setIsButtonDisabled] = useState(true);

function handleChange(e) {
  const { name, value } = e.target;
  setFormValues(prev=> ({...prev, [name]: value}));
}
useEffect(()=> {
  const emailIsValid = /^[^\s@]+@[^\s@]+\.com$/.test(formValues.email);

  const isValid = formValues.name.trim() !=="" &&
  formValues.message.trim() !== "" &&
  emailIsValid;

  setIsButtonDisabled(!isValid);
}, [formValues]);

function handleSubmit(e) {
  e.preventDefault();
  setSucessMessage("Mensagem enviada com sucesso!");

  setFormValues({name:"", email:"", message:"" });

  e.target.reset("");
}
  return (
    <section className="contacts">
      <div className="contacts__container">
        {sucessMessage &&(
          <div className="contacts__success">{sucessMessage} </div>
        )}
        <h2 className="contacts__title">Contato</h2>

        <form className="contacts__form" name="contacts-form" onSubmit={handleSubmit}>

          <div className="contacts__item">
            <label className="contacts__label" htmlFor="name">Nome</label>
            <input
              className="contacts__input"
              type="text"
              id="name"
              name="name"
              placeholder="Aqui seu Nome"
              required
              value= {formValues.name}
              onChange={handleChange}
            />
          </div>

          <div className="contacts__item">
            <label className="contacts__label" htmlFor="email">Email</label>
            <input
              className="contacts__input"
              type="email"
              id="email"
              name="email"
              placeholder="Aqui seu Email"
              required
              value={formValues.email}
              onChange={handleChange}
            />
          </div>

    
          <div className="contacts__item">
            <label className="contacts__label" htmlFor="message">Mensagem</label>
            <textarea
              className="contacts__input contacts__textarea"
              id="message"
              name="message"
              placeholder="Escreva sua mensagem..."
              required
              value= {formValues.message}
              onChange={handleChange}
            />
          </div>

          <button className="contacts__button" type="submit" disabled={isButtonDisabled}>
           Enviar Solicitação
          </button>
        </form>
      </div>
    </section>
  );
}