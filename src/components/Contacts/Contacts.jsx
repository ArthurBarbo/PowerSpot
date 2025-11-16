import "./Contacts.css";

export default function Contacts() {
  return (
    <section className="contacts">
      <div className="contacts__container _container">
        <h2 className="contacts__title">Contato</h2>

        <form className="contacts__form" name="contacts-form">

          <div className="contacts__item">
            <label className="contacts__label" htmlFor="name">Nome</label>
            <input
              className="contacts__input"
              type="text"
              id="name"
              name="name"
              placeholder="Aqui seu Nome"
              required
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
            />
          </div>

          <button className="contacts__button" type="submit">
           Enviar Solicitação
          </button>
        </form>
      </div>
    </section>
  );
}