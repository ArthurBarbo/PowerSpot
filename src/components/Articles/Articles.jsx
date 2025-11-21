import "./Articles.css";

export default function Articles() {
  return (
    <section className="articles__container">
      <h2 className="articles__title">Artigos</h2>

      <div className="articles__media">
        <iframe className="articles__video"
          src="https://www.youtube.com/embed/pioip4wYhHs?si=YobzV9_QK3FbGZgj"
          title="Diferença entre Carros Elétricos ou Híbridos"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          frameBorder="0"
        ></iframe>


        <iframe className="articles__video"
         src="https://www.youtube.com/embed/-HDB4IDKDiE?si=QzKDY5lN9wSJTk2C" 
         title="Posso ligar o carro elétrico em qualquer tomada?" 
         frameBorder="0" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
         referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen>

          </iframe>
      </div>
    </section>
  );
}