import "./Contacts.css";

export default function Contacts() {
  return (
    <section className="contacts">
      <div className="contacts__container _container">
        <h2 className="contacts__title">Contato</h2>

        <form className="contacts__form form" name="contacts-form">

          <div className="form__item">
            <label className="form__label" htmlFor="name">Nome</label>
            <input
              className="form__input"
              type="text"
              id="name"
              name="name"
              placeholder="Aqui seu Nome"
              required
            />
          </div>

          <div className="form__item">
            <label className="form__label" htmlFor="email">Email</label>
            <input
              className="form__input"
              type="email"
              id="email"
              name="email"
              placeholder="Aqui seu Email"
              required
            />
          </div>

    
          <div className="form__item">
            <label className="form__label" htmlFor="message">Mensagem</label>
            <textarea
              className="form__input form__textarea"
              id="message"
              name="message"
              placeholder="Escreva sua mensagem..."
              required
            />
          </div>

          <button className="form__button" type="submit">
           Enviar Solicitação
          </button>
        </form>
      </div>
    </section>
  );
}